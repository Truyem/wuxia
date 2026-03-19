/**
 * Service for handling text generation via Cloudflare Workers AI (Nemotron)
 * This provides a free, zero-config text generation fallback using a Cloudflare Worker
 * running @cf/nvidia/nemotron-3-120b-a12b
 */

export interface TextGenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface TextGenOptions {
  messages: TextGenMessage[];
  max_tokens?: number;
  temperature?: number;
}

export interface TextGenResponse {
  response?: string;
  result?: { response?: string };
  error?: string;
}

export class TextGenService {
  /**
   * Generates text via a Cloudflare Worker running Nemotron model
   * @param workerUrl - The Cloudflare Worker URL
   * @param options - Messages and generation parameters
   * @returns The generated text response
   */
  static async generateText(workerUrl: string, options: TextGenOptions): Promise<string> {
    if (!workerUrl) {
      throw new Error("Text generation Worker URL is not configured.");
    }

    let normalizedUrl = workerUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      const response = await fetch(normalizedUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: options.messages,
          max_tokens: options.max_tokens || 131000,
          temperature: options.temperature || 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const serverError = (errorData && typeof errorData === 'object' && 'error' in errorData) ? (errorData as any).error : null;
        throw new Error(serverError || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as TextGenResponse;

      // Handle both direct response format and nested result format
      const text = data.response || data.result?.response || '';

      if (!text) {
        if (data.error) {
          throw new Error(`Worker API Error: ${data.error}`);
        }

        // Check for OpenAI-style response format just in case the worker shifted formats
        const openaiText = (data as any).choices?.[0]?.message?.content;
        if (openaiText) return openaiText.trim();

        console.error("Cloudflare Worker Unexpected Response Structure:", data);
        throw new Error("Cloudflare Worker trả về phản hồi trống. Có thể do giới hạn nội dung hoặc model gặp lỗi.");
      }

      return text;
    } catch (error) {
      console.error("Error generating text via worker:", error);
      throw error;
    }
  }

  /**
   * Tests the connection to a text generation worker
   * @param workerUrl - The Cloudflare Worker URL to test
   * @returns Connection test result
   */
  static async testConnection(workerUrl: string): Promise<{ ok: boolean; detail: string }> {
    const startedAt = Date.now();
    try {
      const text = await this.generateText(workerUrl, {
        messages: [
          { role: 'system', content: 'You are a connection test. Please only answer OK.' },
          { role: 'user', content: 'ping' }
        ],
        max_tokens: 50,
        temperature: 0,
      });
      const elapsed = Date.now() - startedAt;
      return { ok: true, detail: `Duration: ${elapsed}ms\n\n${text}` };
    } catch (error: any) {
      return { ok: false, detail: error?.message || 'Unknown error' };
    }
  }
}
