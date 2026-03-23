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
  private static async verifyWorkerHealth(url: string): Promise<boolean> {
    try {
      // Use a very small request to check if the worker is responsive and healthy
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: '1' }],
          max_tokens: 1,
          temperature: 0,
        }),
        // @ts-ignore - Support for AbortSignal.timeout
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
      });

      return response.ok;
    } catch (error) {
      console.warn(`[TextGenService] Health check failed for ${url}:`, error);
      return false;
    }
  }

  static async generateText(workerUrl: string | string[], options: TextGenOptions): Promise<string> {
    const inputUrls = parseWorkerUrls(workerUrl);
    const defaultUrls = parseWorkerUrls(DEFAULT_TEXT_GEN_WORKER_URLS);

    // Combine and remove duplicates while preserving order
    const urls = [...new Set([...inputUrls, ...defaultUrls])];

    if (urls.length === 0) {
      throw new Error("Chưa cấu hình URL cho Worker tạo văn bản.");
    }

    let lastErrorMessage = "";
    let i = 0;

    while (i < urls.length) {
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
            stream: false,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          let errorMessage = `HTTP ${response.status}: ${errorText}`;

          try {
            const errorData = JSON.parse(errorText);
            const serverError = (errorData && typeof errorData === 'object' && 'error' in errorData) ? (errorData as any).error : null;
            if (serverError) errorMessage = String(serverError);
          } catch (e) { }

          const is4006 = errorMessage.includes('4006') ||
            errorMessage.toLowerCase().includes('daily free allocation') ||
            errorMessage.toLowerCase().includes('neurons');

          // Check if this error is transient (4006, 429, 500 range)
          const isTransient = is4006 ||
            response.status === 429 ||
            response.status >= 500;

          if (isTransient && i < urls.length - 1) {
            console.warn(`[TextGenService] Worker ${normalizedUrl} lỗi (${response.status}/${errorMessage.slice(0, 50)}). Đang tìm link dự phòng hoạt động...`);

            // Search for the next healthy link
            let foundHealthy = false;
            for (let nextIdx = i + 1; nextIdx < urls.length; nextIdx++) {
              const nextUrl = urls[nextIdx];
              console.log(`[TextGenService] Kiểm tra độ khả dụng của link dự phòng (${nextIdx + 1}/${urls.length}): ${nextUrl}...`);
              if (await this.verifyWorkerHealth(nextUrl)) {
                console.log(`[TextGenService] Tìm thấy link dự phòng hoạt động: ${nextUrl}. Chuyển sang sử dụng...`);
                i = nextIdx;
                foundHealthy = true;
                break;
              }
            }

            if (foundHealthy) {
              await new Promise(r => setTimeout(r, 100));
              continue; // Re-run with updated i
            } else {
              console.error(`[TextGenService] Đã thử hết tất cả các link dự phòng nhưng không có link nào khả dụng.`);
              throw new Error(`Đã thử hết nhưng tất cả đều lỗi (Lỗi cuối: ${response.status})`);
            }
          }

          throw new Error(errorMessage);
        }

        const data = await response.json() as any;

        // Robust response parsing
        let text = "";
        if (data.response) {
          text = data.response;
        } else if (data.result) {
          text = typeof data.result === 'string' ? data.result : data.result.response || "";
        } else if (data.output) {
          text = typeof data.output === 'string' ? data.output : data.output.response || "";
        }

        if (!text) {
          if (data.error) {
            const errorStr = String(data.error);
            const is4006Inside = errorStr.includes('4006') || errorStr.toLowerCase().includes('daily free allocation');

            if (is4006Inside && i < urls.length - 1) {
              console.warn(`[TextGenService] Worker ${normalizedUrl} báo lỗi 4006 trong dữ liệu. Đang tìm link dự phòng...`);
              // Similar to above, search for next healthy link
              let foundHealthy = false;
              for (let nextIdx = i + 1; nextIdx < urls.length; nextIdx++) {
                if (await this.verifyWorkerHealth(urls[nextIdx])) {
                  i = nextIdx;
                  foundHealthy = true;
                  break;
                }
              }
              if (foundHealthy) continue;
            }
            throw new Error(`Worker API Error: ${data.error}`);
          }

          // OpenAI format check
          const openaiText = (data as any).choices?.[0]?.message?.content;
          if (openaiText) text = openaiText.trim();
        }

        // Check for refusal phrases or empty text
        const refusalPhrases = [
          "i'm sorry",
          "i can't comply",
          "i cannot comply",
          "i apologize",
          "i am unable to",
          "không thể thực hiện",
          "xin lỗi, tôi không thể"
        ];

        const isRefusal = text.length > 0 && text.length < 200 && refusalPhrases.some(p => text.toLowerCase().includes(p));
        const isEmpty = !text || text.trim() === "";

        if (isEmpty || isRefusal) {
          if (i < urls.length - 1) {
            const reason = isEmpty ? "phản hồi trống" : `phát hiện từ chối ("${text.slice(0, 30)}...")`;
            console.warn(`[TextGenService] Worker ${normalizedUrl} ${reason}. Đang tìm link dự phòng...`);

            let foundHealthy = false;
            for (let nextIdx = i + 1; nextIdx < urls.length; nextIdx++) {
              if (await this.verifyWorkerHealth(urls[nextIdx])) {
                console.log(`[TextGenService] Tìm thấy link dự phòng hoạt động: ${urls[nextIdx]}`);
                i = nextIdx;
                foundHealthy = true;
                break;
              }
            }
            if (foundHealthy) {
              await new Promise(r => setTimeout(r, 100));
              continue;
            }
          }

          if (isEmpty) {
            throw new Error("Worker trả về phản hồi trống hoặc không đúng định dạng.");
          }
          // If it was a refusal but no more workers, we'll return it anyway or throw?
          // The user said "skip and next", so if no next, we might as well throw so the UI knows it failed.
          throw new Error(`Worker từ chối thực hiện và không còn link dự phòng: ${text}`);
        }

        return text;
      } catch (error: any) {
        lastErrorMessage = error?.message || String(error);

        // Retry only on connection errors
        const isNetworkError = lastErrorMessage.includes("fetch") ||
          lastErrorMessage.includes("network") ||
          lastErrorMessage.includes("Failed to fetch");

        if (isNetworkError && i < urls.length - 1) {
          console.warn(`[TextGenService] Lỗi kết nối tới ${normalizedUrl}: ${lastErrorMessage}. Thử link dự phòng...`);
          i++;
          await new Promise(r => setTimeout(r, 100));
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
