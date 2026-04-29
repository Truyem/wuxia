// Cloudflare Worker with REAL Streaming - No timeout
// Giải quyết vấn đề 3046 bằng cách stream từng phần thay vì chờ full response

var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key, x-model, x-session-affinity, x-continuation-id",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

// Fetch active nodes from Supabase
async function fetchActiveNodes(table, env) {
  try {
    const anonKey = env.SUPABASE_ANON_KEY || env.SUPABASE_KEY;
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/${table}?status=eq.active&select=url`,
      { headers: { "apikey": anonKey, "Authorization": `Bearer ${anonKey}` } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

// Stream response with proper SSE format - FIX for timeout 3046
async function streamWithSSE(nodeUrl, payload, requestHeaders) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  const allowedHeaders = ["authorization", "x-api-key", "accept", "user-agent", "x-model", "x-session-affinity"];
  const fwdHeaders = new Headers({ "content-type": "application/json" });
  
  for (const [k, v] of requestHeaders.entries()) {
    if (allowedHeaders.includes(k.toLowerCase())) fwdHeaders.set(k, v);
  }
  fwdHeaders.set("host", new URL(nodeUrl).host);
  fwdHeaders.set("x-model", payload._model);

  // Prepare body
  const body = JSON.stringify({
    messages: payload.messages,
    max_tokens: payload.max_tokens,
    temperature: payload.temperature,
    stream: true, // Enable streaming on upstream
    id: payload.id,
  });

  const chunkId = `chatcmpl-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);

  // Create streaming response
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  // Start the fetch in background
  fetch(nodeUrl, { method: "POST", headers: fwdHeaders, body })
    .then(async (upstream) => {
      if (!upstream.ok) {
        const err = await upstream.text();
        const errorMsg = `data: ${JSON.stringify({ error: "Upstream error", status: upstream.status, details: err })}\n\n`;
        await writer.write(encoder.encode(errorMsg));
        await writer.close();
        return;
      }

      const reader = upstream.body.getReader();
      let buffer = "";
      let sentFirstChunk = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data:')) continue;

            let dataStr = trimmed.slice(5).trim();
            if (dataStr === '[DONE]') {
              // Send final chunk
              const finalChunk = `data: ${JSON.stringify({
                id: chunkId, object: "chat.completion.chunk", created,
                choices: [{ index: 0, delta: {}, finish_reason: "stop" }]
              })}\n\ndata: [DONE]\n\n`;
              await writer.write(encoder.encode(finalChunk));
              await writer.close();
              return;
            }

            // Forward the chunk directly
            if (!sentFirstChunk) {
              sentFirstChunk = true;
            }
            await writer.write(encoder.encode(trimmed + '\n'));
          }
        }
      } catch (e) {
        console.error("Stream error:", e);
      }
      
      // Close if not already closed
      try { await writer.close(); } catch {}
    })
    .catch(async (err) => {
      console.error("Fetch error:", err);
      const errorMsg = `data: ${JSON.stringify({ error: err.message })}\n\n`;
      await writer.write(encoder.encode(errorMsg));
      await writer.close();
    });

  // Return streaming response immediately
  const headers = new Headers(corsHeaders);
  headers.set("content-type", "text/event-stream; charset=utf-8");
  headers.set("cache-control", "no-cache");
  headers.set("x-content-type-options", "nosniff");

  return new Response(readable, { status: 200, headers });
}

// Non-streaming fallback with timeout handling
async function callWithTimeout(nodes, payload, requestHeaders, timeoutMs = 25000) {
  const shuffled = [...nodes].sort(() => Math.random() - 0.5);
  
  for (const nodeUrl of shuffled) {
    const allowedHeaders = ["authorization", "x-api-key", "accept", "user-agent", "x-model", "x-session-affinity"];
    const fwdHeaders = new Headers({ "content-type": "application/json" });
    
    for (const [k, v] of requestHeaders.entries()) {
      if (allowedHeaders.includes(k.toLowerCase())) fwdHeaders.set(k, v);
    }
    fwdHeaders.set("host", new URL(nodeUrl).host);
    fwdHeaders.set("x-model", payload._model);

    const body = JSON.stringify({
      messages: payload.messages,
      max_tokens: payload.max_tokens,
      temperature: payload.temperature,
      stream: false,
      id: payload.id,
    });

    try {
      // Race between fetch and timeout
      const upstream = await Promise.race([
        fetch(nodeUrl, { method: "POST", headers: fwdHeaders, body }),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), timeoutMs))
      ]);

      if (upstream.ok) {
        const text = await upstream.text();
        return { ok: true, text, node: nodeUrl };
      }
    } catch (e) {
      console.warn(`Node ${nodeUrl} error: ${e.message}`);
    }
  }
  return { ok: false };
}

// Main chat handler
async function handleChatCompletions(request, env) {
  const nodes = await fetchActiveNodes("nemotron_nodes", env);
  if (!nodes?.length) {
    return new Response(JSON.stringify({ error: "No active nodes" }),
      { status: 503, headers: { ...corsHeaders, "content-type": "application/json" } });
  }

  let json = {};
  try { json = await request.json(); } catch {}

  const model = request.headers.get("x-model") || json.model || env.DEFAULT_MODEL || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
  const wantStream = json.stream === true;
  
  const maxTokens = Math.min(json.max_tokens || 131000, 131000);

  const payload = {
    messages: json.messages || [],
    max_tokens: maxTokens,
    temperature: json.temperature || 0.7,
    id: json.id || request.headers.get("x-session-affinity"),
    _model: model,
  };

  // Use streaming for long outputs - prevents timeout!
  if (wantStream) {
    const nodeUrl = nodes[Math.floor(Math.random() * nodes.length)].url;
    return streamWithSSE(nodeUrl, payload, request.headers);
  }

  // Non-streaming with timeout
  const result = await callWithTimeout(nodes, payload, request.headers, 25000);

  if (!result.ok) {
    return new Response(JSON.stringify({ error: "All nodes failed or timed out", code: 3046 }),
      { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } });
  }

  // Parse response
  let content = result.text.trim();
  
  // Try to extract JSON if wrapped
  try {
    const parsed = JSON.parse(content);
    if (parsed.choices?.[0]?.message?.content) {
      content = parsed.choices[0].message.content;
    }
  } catch {}

  const headers = new Headers(corsHeaders);
  headers.set("content-type", "application/json");
  
  return new Response(JSON.stringify({
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
  }), { status: 200, headers });
}

// Proxy handler
async function handleProxy(request, env, table) {
  const nodes = await fetchActiveNodes(table, env);
  if (!nodes?.length) {
    return new Response(JSON.stringify({ error: `No active nodes in ${table}` }),
      { status: 503, headers: { ...corsHeaders, "content-type": "application/json" } });
  }

  const nodeUrl = nodes[Math.floor(Math.random() * nodes.length)].url;
  
  const allowedHeaders = ["content-type", "authorization", "x-api-key", "accept", "user-agent", "x-model", "x-session-affinity"];
  const fwdHeaders = new Headers();
  for (const [k, v] of request.headers.entries()) {
    if (allowedHeaders.includes(k.toLowerCase())) fwdHeaders.set(k, v);
  }
  fwdHeaders.set("host", new URL(nodeUrl).host);

  let body = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.arrayBuffer();
  }

  try {
    const upstream = await Promise.race([
      fetch(nodeUrl, { method: request.method, headers: fwdHeaders, body, redirect: "follow" }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 30000))
    ]);

    if (!upstream.ok) {
      const errBody = await upstream.text();
      return new Response(JSON.stringify({ error: "Upstream error", status: upstream.status, details: errBody }),
        { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } });
    }

    const resHeaders = new Headers(corsHeaders);
    const skip = ["content-encoding", "content-length", "transfer-encoding", "connection"];
    upstream.headers.forEach((v, k) => { if (!skip.includes(k.toLowerCase())) resHeaders.set(k, v); });
    
    return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Proxy failed", details: err.message }),
      { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } });
  }
}

// Router
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api/, "").replace(/^\/v1/, "");

    if (request.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
    
    if (path === "/nemotron") return handleProxy(request, env, "nemotron_nodes");
    if (path === "/chat/completions") return handleChatCompletions(request, env);
    if (path === "/image-gen") return handleProxy(request, env, "image_gen_nodes");

    if (path === "/models" && request.method === "GET") {
      return new Response(JSON.stringify({ 
        object: "list", 
        data: [{ id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", object: "model", created: 0, owned_by: "meta" }]
      }), { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } });
    }

    if (path === "/health") return new Response(JSON.stringify({ status: "ok" }),
      { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } });

    return new Response(JSON.stringify({ error: `Not Found: ${path}` }),
      { status: 404, headers: { ...corsHeaders, "content-type": "application/json" } });
  }
};

export { index_default as default };
