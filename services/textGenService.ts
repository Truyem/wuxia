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
    const inputUrls = parseWorkerUrls(workerUrl);
    const defaultUrls = parseWorkerUrls(DEFAULT_TEXT_GEN_WORKER_URLS);
    
    // Combine and remove duplicates while preserving order
    const urls = [...new Set([...inputUrls, ...defaultUrls])];
    
    if (urls.length === 0) {
      throw new Error("Chưa cấu hình URL cho Worker tạo văn bản.");
    }

    let lastErrorMessage = "";

    for (let i = 0; i < urls.length; i++) {
      const normalizedUrl = urls[i];
      console.log(`[TextGenService] Đang thử kết nối tới Worker: ${normalizedUrl} (${i + 1}/${urls.length})`);

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
          
          // Check if this error is the "4006: daily free allocation" error or rate limit
          const is4006 = errorMessage.includes('4006') || 
                         errorMessage.toLowerCase().includes('daily free allocation') ||
                         errorMessage.toLowerCase().includes('neurons') ||
                         response.status === 429;
          
          if (is4006 && i < urls.length - 1) {
            console.warn(`[TextGenService] Worker ${normalizedUrl} đã hết hạn mức (4006/429). Đang chuyển sang URL dự phòng tiếp theo...`);
            continue;
          }
          
          throw new Error(errorMessage);
        }

        const data = await response.json() as TextGenResponse;
        const text = data.response || data.result?.response || '';

        if (!text) {
          if (data.error) {
            const errorStr = String(data.error);
            const is4006 = errorStr.includes('4006') || errorStr.toLowerCase().includes('daily free allocation');
            
            if (is4006 && i < urls.length - 1) {
              console.warn(`[TextGenService] Worker ${normalizedUrl} báo lỗi 4006 trong dữ liệu. Đang thử URL dự phòng...`);
              continue;
            }
            throw new Error(`Worker API Error: ${data.error}`);
          }

          // OpenAI format check
          const openaiText = (data as any).choices?.[0]?.message?.content;
          if (openaiText) return openaiText.trim();

          throw new Error("Worker trả về phản hồi trống hoặc không đúng định dạng.");
        }

        return text;
      } catch (error: any) {
        lastErrorMessage = error?.message || String(error);
        
        // Retry on connection errors or 4006/429
        if (i < urls.length - 1) {
          console.warn(`[TextGenService] Lỗi khi kết nối tới ${normalizedUrl}: ${lastErrorMessage}. Thử URL tiếp theo...`);
          continue;
        }
        break;
      }
    }

    throw new Error(lastErrorMessage || "Không thể tạo văn bản sau khi đã thử tất cả các Worker URLs.");
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
