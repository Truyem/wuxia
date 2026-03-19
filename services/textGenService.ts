import { parseWorkerUrls, DEFAULT_TEXT_GEN_WORKER_URLS } from '../utils/apiConfig';

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
   * Generates text via one or more Cloudflare Workers running Nemotron model
   * @param workerUrl - Single URL or array of fallback URLs
   * @param options - Messages and generation parameters
   * @returns The generated text response
   */
  static async generateText(workerUrl: string | string[], options: TextGenOptions): Promise<string> {
    let urls = parseWorkerUrls(workerUrl);
    
    // Always append hardcoded fallbacks if they are not already in the list
    const defaults = parseWorkerUrls(DEFAULT_TEXT_GEN_WORKER_URLS);
    for (const d of defaults) {
      if (!urls.includes(d)) {
        urls.push(d);
      }
    }
    
    if (urls.length === 0) {
      throw new Error("Text generation Worker URL is not configured.");
    }

    let lastError: Error | null = null;

    for (let i = 0; i < urls.length; i++) {
      let normalizedUrl = urls[i].trim();
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
          const errorMessage = String(serverError || `HTTP error! status: ${response.status}`);
          
          // Check if this error is the "4006: daily free allocation" error
          const is4006 = errorMessage.includes('4006') || 
                         errorMessage.toLowerCase().includes('daily free allocation') ||
                         errorMessage.toLowerCase().includes('neurons');
          
          if (is4006 && i < urls.length - 1) {
            console.warn(`Worker ${normalizedUrl} reached limit (4006). Trying next fallback...`);
            continue; // Try the next URL
          }
          
          throw new Error(errorMessage);
        }

        const data = await response.json() as TextGenResponse;

        // Handle both direct response format and nested result format
        const text = data.response || data.result?.response || '';

        if (!text) {
          if (data.error) {
            const is4006 = String(data.error).includes('4006') || 
                           String(data.error).toLowerCase().includes('daily free allocation');
            
            if (is4006 && i < urls.length - 1) {
              console.warn(`Worker ${normalizedUrl} reported error 4006 in data. Trying next fallback...`);
              continue;
            }
            throw new Error(`Worker API Error: ${data.error}`);
          }

          // Check for OpenAI-style response format
          const openaiText = (data as any).choices?.[0]?.message?.content;
          if (openaiText) return openaiText.trim();

          console.error("Cloudflare Worker Unexpected Response Structure:", data);
          throw new Error("Cloudflare Worker trả về phản hồi trống.");
        }

        return text;
      } catch (error: any) {
        lastError = error;
        // If it's a network error and we have more URLs, try them
        if (i < urls.length - 1) {
          console.warn(`Connection to ${normalizedUrl} failed. Trying next fallback...`, error);
          continue;
        }
        break;
      }
    }

    throw lastError || new Error("Failed to generate text after trying all worker URLs.");
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
