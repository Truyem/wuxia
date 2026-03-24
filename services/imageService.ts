import { parseWorkerUrls, DEFAULT_IMAGE_GEN_WORKER_URLS } from '../utils/apiConfig';

export interface ImageGenOptions {
  prompt: string;
  num_steps?: number;
}


export type ImageCachePrefix = 'npc' | 'map' | 'main' | 'item' | 'global';

export class ImageCacheService {
  private static dbName = 'WuxiaImageCache';
  private static storeName = 'images';
  private static db: IDBDatabase | null = null;

  private static async sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async generateCacheKey(prompt: string, prefix: ImageCachePrefix = 'global', storyId?: string): Promise<string> {
    const salt = storyId || 'global';
    const combined = `${salt}:${prompt}`;
    const hash = await this.sha256(combined);
    return `${prefix}${hash}`;
  }

  private static async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(this.db!);
      };
      request.onerror = (event: any) => reject(event.target.error);
    });
  }

  static async get(key: string): Promise<string | null> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error('ImageCache get error:', e);
      return null;
    }
  }

  static async set(key: string, dataUrl: string): Promise<void> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(dataUrl, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error('ImageCache set error:', e);
    }
  }
}

export class ImageService {
  /**
   * Checks if an image exists at the given path (cache or server)
   */
  static async checkImageExists(path: string, cacheKey?: string): Promise<string | null> {
    // 1. Check browser cache first
    if (cacheKey) {
      const cached = await ImageCacheService.get(cacheKey);
      if (cached) return cached;
    }

    // 2. Check public folder (server)
    if (!path) return null;
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          return path;
        }
      }
    } catch (error) {
      console.warn(`Error checking image existence at ${path}:`, error);
    }
    
    return null;
  }

  /**
   * Generates an image and automatically caches it in the browser
   */
  static async generateAndCache(workerUrl: string | string[], options: ImageGenOptions, cacheKey: string): Promise<string> {
    const dataUrl = await this.generateImage(workerUrl, options);
    await ImageCacheService.set(cacheKey, dataUrl);
    return dataUrl;
  }

  /**
   * Generates an image from a prompt and returns it as a Base64 string
   */
  static async generateImage(workerUrl: string | string[], options: ImageGenOptions): Promise<string> {
    const inputUrls = parseWorkerUrls(workerUrl);
    const defaultUrls = parseWorkerUrls(DEFAULT_IMAGE_GEN_WORKER_URLS);
    
    // Combine and remove duplicates while preserving order
    const urls = [...new Set([...inputUrls, ...defaultUrls])];

    if (urls.length === 0) {
      throw new Error("Chưa cấu hình URL cho Worker tạo ảnh.");
    }

    let lastErrorMessage = "";
    
    for (let i = 0; i < urls.length; i++) {
        const normalizedUrl = urls[i];
        console.log(`[ImageService] Đang thử kết nối tới Worker tạo ảnh: ${normalizedUrl} (${i + 1}/${urls.length})`);

        try {
          const formData = new FormData();
          formData.append('prompt', options.prompt);
          
          const response = await fetch(normalizedUrl, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = String(errorData.error || `HTTP error! status: ${response.status}`);
            
            // Check if this error is the "4006: daily free allocation" error or rate limit
            const is4006 = errorMessage.includes('4006') || 
                           errorMessage.toLowerCase().includes('daily free allocation') ||
                           errorMessage.toLowerCase().includes('neurons') ||
                           response.status === 429;
            
            if (is4006 && i < urls.length - 1) {
              console.warn(`[ImageService] Worker ${normalizedUrl} đã hết hạn mức (4006/429). Đang chuyển sang URL dự phòng...`);
              continue;
            }
            
            throw new Error(errorMessage);
          }

          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error: any) {
          lastErrorMessage = error?.message || String(error);
          
          // Retry on connection errors or 4006/429
          if (i < urls.length - 1) {
             console.warn(`[ImageService] Lỗi khi kết nối tới ${normalizedUrl}: ${lastErrorMessage}. Thử URL tiếp theo...`);
             continue;
          }
          break;
        }
    }

    throw new Error(lastErrorMessage || "Không thể tạo ảnh sau khi đã thử tất cả các Worker URLs.");
  }

  /**
   * Helper to construct a character prompt
   */
  static constructCharacterPrompt(character: { 
    name: string, 
    gender?: string, 
    title?: string, 
    realm?: string, 
    appearanceDescription?: string, 
    appearance?: string, 
    sectId?: string, 
    isPlayer?: boolean,
    favorability?: number
  }): string {
    const isNPC = !character.isPlayer;
    const qualityKeywords = "16:9 aspect ratio, 4K resolution, ultra-detailed, cinematic lighting";
    const basePrompt = `Wuxia style, traditional Chinese painting combined with modern digital art, ${qualityKeywords}`;
    
    // Gender-specific base
    let genderTerm = "";
    const gender = (character.gender || "").toLowerCase();
    if (gender === 'nam' || gender === 'male') {
        genderTerm = "handsome male martial artist, heroic features, tall stature, dignified posture";
    } else if (gender === 'nữ' || gender === 'female') {
        genderTerm = "stunningly beautiful female, elegant features, flowing silk robes, graceful demeanor";
    }

    let details = `${character.name}`;
    if (genderTerm) details += `, ${genderTerm}`;
    if (character.title) details += `, ${character.title}`;
    if (character.realm) details += `, cultivation realm: ${character.realm}`;
    
    // Support both NPC and Player appearance fields
    const desc = character.appearanceDescription || character.appearance;
    if (desc) details += `, appearance: ${desc}`;
    
    // Affection/Favorability based mood for NPCs
    if (isNPC && character.favorability !== undefined) {
        const fav = character.favorability;
        if (fav >= 80) {
            details += ", deeply in love, intimate expression, looking at viewer with devotion, soft blush, romantic atmosphere";
        } else if (fav >= 40) {
            details += ", affectionate gaze, gentle smile, warm and caring expression, slight blush";
        } else if (fav >= 20) {
            details += ", friendly and slightly bashful, pleasant expression, approachable aura";
        } else if (fav >= 10) {
            details += ", polite but reserved, modest smile, calm demeanor";
        } else {
            details += ", neutral expression, dignified and distant, mysterious aura";
        }
    }
    
    // Sect-based outfit logic
    if (character.sectId) {
       const isEvil = character.sectId.toLowerCase().includes('ma') || character.sectId.toLowerCase().includes('tà') || character.sectId.toLowerCase().includes('cốt');
       if (isEvil) {
           details += ", wearing dark sinister robes with intricate patterns, evil demonic sect attire, sharp aura";
       } else if (character.sectId !== 'none') {
           details += ", wearing elegant orthodox sect robes in white or blue, righteous and pure aura";
       } else {
           details += ", wearing wandering martial artist clothes, travel-worn but stylish";
       }
    }

    return `${basePrompt}, ${details}, vibrant colors, mystical atmosphere, looking at camera, full body or hip-up view`;
  }

  /**
   * Helper to construct an item prompt
   */
  static constructItemPrompt(item: { name: string, description?: string, type?: string, quality?: string }): string {
    const basePrompt = "Wuxia style item, traditional Chinese artifact painting, highly detailed, central focus, transparent background styling";
    let details = `${item.name}`;
    if (item.type) details += `, a ${item.type}`;
    if (item.quality) details += `, quality: ${item.quality}`;
    if (item.description) details += `, ${item.description}`;
    
    return `${basePrompt}, ${details}, vibrant colors, glowing aura, isolated item`;
  }

  /**
   * Helper to construct a background prompt
   */
  static constructBackgroundPrompt(environment: { name: string, description?: string }): string {
    const basePrompt = "Wuxia landscape, epic scale, traditional Chinese artistic style, beautiful scenery";
    let details = `${environment.name}`;
    if (environment.description) details += `, ${environment.description}`;
    
    return `${basePrompt}, ${details}, serene, high resolution, cinematic light`;
  }

  /**
   * Helper to construct a map prompt
   */
  static constructMapPrompt(map: { name: string, description?: string }): string {
    return this.constructBackgroundPrompt(map);
  }
}
