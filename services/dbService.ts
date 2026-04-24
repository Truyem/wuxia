
import { SaveStructure } from '../types';
import { stripFence } from '../utils/jsonRepair';
import { COT_THINKING_FIELD_KEYS, parseStoryRawText } from './aiService';

const DB_NAME = 'WuxiaGameDB';
const STORE_NAME = 'saves';
const SETTINGS_STORE = 'settings';
const VERSION = 1;
const AUTO_SAVE_MAX_KEEP = 3;
const SAVE_EXPORT_VERSION = 1;

const deepCopy = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const safeNumber = (value: unknown, fallback: number): number => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return fallback;
};

const buildSaveDedupeKey = (save: {
    type?: unknown;
    timestamp?: unknown;
    characterData?: any;
    environmentInfo?: any;
    history?: unknown;
}): string => {
    const type = save?.type === 'auto' ? 'auto' : 'manual';
    const ts = Math.max(0, Math.floor(safeNumber(save?.timestamp, 0)));
    const name = typeof save?.characterData?.name === 'string' ? save.characterData.name.trim() : '';
    const envTime = typeof save?.environmentInfo?.gameDays === 'number' ? String(save.environmentInfo.gameDays) : '';
    const historyCount = Array.isArray(save?.history) ? save.history.length : 0;
    return `${type}|${ts}|${name}|${envTime}|${historyCount}`;
};

const sanitizeImportedSave = (raw: any): Omit<SaveStructure, 'id'> | null => {
    if (!raw || typeof raw !== 'object') return null;
    if (!raw.characterData || typeof raw.characterData !== 'object') return null;
    if (!raw.environmentInfo || typeof raw.environmentInfo !== 'object') return null;

    const type: 'manual' | 'auto' = raw.type === 'auto' ? 'auto' : 'manual';
    const timestamp = Math.max(1, Math.floor(safeNumber(raw.timestamp, Date.now())));
    const history = Array.isArray(raw.history) ? raw.history : [];
    const promptSnapshot = Array.isArray(raw.promptSnapshot) ? raw.promptSnapshot : undefined;
    const metadata = raw.metadata && typeof raw.metadata === 'object' ? raw.metadata : undefined;

    const normalized: Omit<SaveStructure, 'id'> = {
        type,
        timestamp,
        description: typeof raw.description === 'string' ? raw.description : undefined,
        metadata: metadata ? deepCopy(metadata) : undefined,
        characterData: deepCopy(raw.characterData),
        environmentInfo: deepCopy(raw.environmentInfo),
        history: deepCopy(history),
        social: Array.isArray(raw.social) ? deepCopy(raw.social) : undefined,
        world: raw.world && typeof raw.world === 'object' ? deepCopy(raw.world) : undefined,
        battle: raw.battle && typeof raw.battle === 'object' ? deepCopy(raw.battle) : undefined,
        playerSect: raw.playerSect && typeof raw.playerSect === 'object' ? deepCopy(raw.playerSect) : undefined,
        taskList: Array.isArray(raw.taskList) ? deepCopy(raw.taskList) : undefined,
        appointmentList: Array.isArray(raw.appointmentList) ? deepCopy(raw.appointmentList) : undefined,
        story: raw.story && typeof raw.story === 'object' ? deepCopy(raw.story) : undefined,
        storyId: typeof raw.storyId === 'string' ? raw.storyId : undefined,
        memorySystem: raw.memorySystem && typeof raw.memorySystem === 'object' ? deepCopy(raw.memorySystem) : undefined,
        gameSettings: raw.gameSettings && typeof raw.gameSettings === 'object' ? deepCopy(raw.gameSettings) : undefined,
        memoryConfig: raw.memoryConfig && typeof raw.memoryConfig === 'object' ? deepCopy(raw.memoryConfig) : undefined,
        tavernSettings: raw.tavernSettings && typeof raw.tavernSettings === 'object' ? deepCopy(raw.tavernSettings) : undefined,
        promptSnapshot: promptSnapshot ? deepCopy(promptSnapshot) : undefined,
        openingConfig: raw.openingConfig && typeof raw.openingConfig === 'object' ? deepCopy(raw.openingConfig) : undefined
    };

    return normalized;
};

export const initDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
                db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
            }
        };
    });
};

export const maintainAutoSaves = async (db: IDBDatabase, maxKeep: number = AUTO_SAVE_MAX_KEEP): Promise<void> => {
    const keepCount = Math.max(0, Math.floor(maxKeep));
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const allSaves: SaveStructure[] = request.result;
            const autoSaves = allSaves.filter(s => s.type === 'auto');
            
            // Sort by timestamp asc (oldest first)
            autoSaves.sort((a, b) => a.timestamp - b.timestamp);

            if (autoSaves.length > keepCount) {
                const toDelete = autoSaves.slice(0, autoSaves.length - keepCount);
                toDelete.forEach(s => {
                    store.delete(s.id);
                });
            }
            resolve();
        };
        request.onerror = () => reject(request.error);
    });
};

export const saveArchive = async (saveData: Omit<SaveStructure, 'id'>): Promise<number> => {
    const db = await initDatabase();
    const normalized = sanitizeImportedSave(saveData);
    if (!normalized) {
        throw new Error('Failed to save: Incomplete save data structure');
    }
    
    if (normalized.type === 'auto') {
        await maintainAutoSaves(db, AUTO_SAVE_MAX_KEEP - 1);
    }

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(normalized);
        
        request.onsuccess = () => resolve(request.result as number);
        request.onerror = () => reject(request.error);
    });
};

export interface SaveExportStructure {
    version: number;
    exportedAt: string;
    saves: SaveStructure[];
}

export interface SaveImportResult {
    total: number;
    imported: number;
    skipped: number;
}

export const exportSaveData = async (): Promise<SaveExportStructure> => {
    const saves = await getSavesList();
    return {
        version: SAVE_EXPORT_VERSION,
        exportedAt: new Date().toISOString(),
        saves
    };
};

export const importSaveData = async (
    payload: unknown,
    options?: { overwriteExisting?: boolean }
): Promise<SaveImportResult> => {
    const rawList = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as any)?.saves)
            ? (payload as any).saves
            : [];

    if (!Array.isArray(rawList) || rawList.length === 0) {
        throw new Error('Import failed: No importable save array found');
    }

    const normalizedCandidates = rawList
        .map((item) => sanitizeImportedSave(item))
        .filter((item): item is Omit<SaveStructure, 'id'> => Boolean(item));
    if (normalizedCandidates.length === 0) {
        throw new Error('Import failed: No valid entries in save content');
    }

    const db = await initDatabase();
    const existingSaves = options?.overwriteExisting ? [] : await getSavesList();
    const dedupeKeySet = new Set(existingSaves.map((item) => buildSaveDedupeKey(item)));

    let imported = 0;
    let skipped = 0;

    await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        if (options?.overwriteExisting) {
            store.clear();
            dedupeKeySet.clear();
        }

        normalizedCandidates.forEach((item) => {
            const key = buildSaveDedupeKey(item);
            if (dedupeKeySet.has(key)) {
                skipped += 1;
                return;
            }
            dedupeKeySet.add(key);
            store.add(item);
            imported += 1;
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });

    await maintainAutoSaves(db, AUTO_SAVE_MAX_KEEP);

    return {
        total: normalizedCandidates.length,
        imported,
        skipped
    };
};

export const getSavesList = async (): Promise<SaveStructure[]> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => {
            const list = (request.result as SaveStructure[]).map(s => cleanSaveHistoryMarkers(s));
            // Sort by timestamp desc
            list.sort((a, b) => b.timestamp - a.timestamp);
            resolve(list);
        };
        request.onerror = () => reject(request.error);
    });
};

const cleanSaveHistoryMarkers = (save: SaveStructure): SaveStructure => {
    if (!save.history || !Array.isArray(save.history)) return save;
    
    save.history = save.history.map(item => {
        if (item.rawJson) {
            item.rawJson = stripFence(item.rawJson);

            // Attempt to repair broken structuredResponse
            // A response is considered "broken" if it's missing or a raw JSON fallback.
            const isFallback = item.structuredResponse?.logs?.length === 1 && 
                             (item.structuredResponse.logs[0].text === item.rawJson || 
                              item.structuredResponse.logs[0].text.includes('{"thinking_pre"') ||
                              item.structuredResponse.logs[0].text.includes('{"logs"'));
            
            const needsRepair = !item.structuredResponse || isFallback;

            if (needsRepair) {
                try {
                    const repaired = parseStoryRawText(item.rawJson);
                    // Only apply if the repair produced meaningful structured data
                    if (repaired.logs.length > 1 || !repaired.logs[0].text.includes('{"')) {
                        item.structuredResponse = repaired;
                    }
                } catch (e) {
                    console.warn('[dbService] History item repair failed:', e);
                }
            }
        }
        
        if (item.structuredResponse) {
            const fields = item.structuredResponse;
            COT_THINKING_FIELD_KEYS.forEach(key => {
                if (typeof (fields as any)[key] === 'string') {
                    (fields as any)[key] = stripFence((fields as any)[key]);
                }
            });
            if (typeof fields.thinking_pre === 'string') fields.thinking_pre = stripFence(fields.thinking_pre);
            if (typeof fields.thinking_post === 'string') fields.thinking_post = stripFence(fields.thinking_post);
            if (Array.isArray(fields.logs)) {
                fields.logs.forEach(log => {
                    if (log && typeof log.text === 'string') {
                        log.text = stripFence(log.text);
                    }
                });
            }
        }
        return item;
    });
    return save;
};

export const getSave = async (id: number): Promise<SaveStructure> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        
        request.onsuccess = () => {
            const result = request.result;
            if (result) {
                resolve(cleanSaveHistoryMarkers(result));
            } else {
                resolve(result);
            }
        };
        request.onerror = () => reject(request.error);
    });
};

export const deleteSave = async (id: number): Promise<void> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const clearSavesData = async (): Promise<void> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const saveSetting = async (key: string, value: any): Promise<void> => {
    console.log(`[dbService] Saving setting: ${key}`, value);
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([SETTINGS_STORE], 'readwrite');
        const store = transaction.objectStore(SETTINGS_STORE);
        const request = store.put({ key, value });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getSetting = async (key: string): Promise<any> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([SETTINGS_STORE], 'readonly');
        const store = transaction.objectStore(SETTINGS_STORE);
        const request = store.get(key);
        request.onsuccess = () => {
            const result = request.result;
            console.log(`[dbService] Get setting: ${key} ->`, result?.value);
            resolve(result ? result.value : null);
        };
        request.onerror = () => reject(request.error);
    });
};

export const deleteSetting = async (key: string): Promise<void> => {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([SETTINGS_STORE], 'readwrite');
        const store = transaction.objectStore(SETTINGS_STORE);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const deleteSettingsBatch = async (keys: string[]): Promise<void> => {
    if (!Array.isArray(keys) || keys.length === 0) return;
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([SETTINGS_STORE], 'readwrite');
        const store = transaction.objectStore(SETTINGS_STORE);
        keys.forEach((key) => store.delete(key));
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

const CUSTOM_TALENT_PROTECTION_KEYS = ['visual_settings', 'new_game_custom_talents', 'new_game_custom_backgrounds'] as const;

const getProtectedSettingsSnapshot = async (keys: string[]): Promise<Array<{ key: string; value: any }>> => {
    const snapshots: Array<{ key: string; value: any }> = [];
    for (const key of keys) {
        const value = await getSetting(key);
        if (value !== null && value !== undefined) {
            snapshots.push({ key, value });
        }
    }
    return snapshots;
};

const writeBackProtectedSettingsSnapshot = async (snapshots: Array<{ key: string; value: any }>): Promise<void> => {
    for (const item of snapshots) {
        await saveSetting(item.key, item.value);
    }
};

export const clearAllSettings = async (options?: { keepApiKey?: boolean; keepCustomTalents?: boolean }): Promise<void> => {
    const keepKeys = new Set<string>();
    if (options?.keepApiKey) keepKeys.add('api_settings');
    if (options?.keepCustomTalents) {
        CUSTOM_TALENT_PROTECTION_KEYS.forEach((key) => keepKeys.add(key));
    }

    const snapshots = await getProtectedSettingsSnapshot(Array.from(keepKeys));
    const db = await initDatabase();
    const transaction = db.transaction([SETTINGS_STORE], 'readwrite');
    transaction.objectStore(SETTINGS_STORE).clear();

    return new Promise((resolve, reject) => {
        transaction.oncomplete = async () => {
            try {
                await writeBackProtectedSettingsSnapshot(snapshots);
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        transaction.onerror = () => reject(transaction.error);
    });
};

export const clearCustomTalentsAndBackgrounds = async (): Promise<void> => {
    const visualSettings = await getSetting('visual_settings');
    if (visualSettings && typeof visualSettings === 'object') {
        const nextVisual = { ...visualSettings };
        if ('backgroundImage' in nextVisual) {
            (nextVisual as any).backgroundImage = '';
            await saveSetting('visual_settings', nextVisual);
        }
    }
    await deleteSettingsBatch(['new_game_custom_talents', 'new_game_custom_backgrounds']);
};

export const clearSystemCache = async (): Promise<void> => {
    const tasks: Promise<unknown>[] = [];

    if (typeof window !== 'undefined' && 'caches' in window) {
        tasks.push((async () => {
            const keys = await window.caches.keys();
            await Promise.allSettled(keys.map((key) => window.caches.delete(key)));
        })());
    }

    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
    }

    await Promise.allSettled(tasks);
};

export interface StorageBreakdown {
    usage: number;
    quota: number;
    details: {
        saves: number;
        settings: number;
        prompts: number; 
        api: number;
        cache: number; 
    }
}

export const getDetailedStorageInfo = async (): Promise<StorageBreakdown> => {
    const db = await initDatabase();
    
    // 1. Calculate Saves Size
    const savesTx = db.transaction([STORE_NAME], 'readonly');
    const savesStore = savesTx.objectStore(STORE_NAME);
    const saves = await new Promise<any[]>((resolve) => {
        savesStore.getAll().onsuccess = (e) => resolve((e.target as any).result || []);
    });
    const savesSize = new Blob([JSON.stringify(saves)]).size;

    // 2. Calculate Settings, API, and Prompts Size
    const settingsTx = db.transaction([SETTINGS_STORE], 'readonly');
    const settingsStore = settingsTx.objectStore(SETTINGS_STORE);
    const settings = await new Promise<any[]>((resolve) => {
        settingsStore.getAll().onsuccess = (e) => resolve((e.target as any).result || []);
    });
    
    let apiSize = 0;
    let promptsSize = 0;
    let otherSettingsSize = 0;

    settings.forEach(s => {
        const size = new Blob([JSON.stringify(s)]).size;
        if (s.key === 'api_settings') {
            apiSize += size;
        } else if (s.key === 'prompts') {
            promptsSize += size;
        } else {
            otherSettingsSize += size;
        }
    });

    // 3. Get Total Usage
    let usage = 0;
    let quota = 0;
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        usage = estimate.usage || 0;
        quota = estimate.quota || 0;
    }

    // 4. Calculate overhead/cache
    const knownUsage = savesSize + apiSize + promptsSize + otherSettingsSize;
    const systemCache = Math.max(0, usage - knownUsage);

    return {
        usage,
        quota,
        details: {
            saves: savesSize,
            settings: otherSettingsSize,
            prompts: promptsSize,
            api: apiSize,
            cache: systemCache
        }
    };
};

export const clearAllData = async (options?: { keepApiKey?: boolean; keepCustomTalents?: boolean }): Promise<void> => {
    const db = await initDatabase();
    const keepKeys = new Set<string>();
    if (options?.keepApiKey) keepKeys.add('api_settings');
    if (options?.keepCustomTalents) {
        CUSTOM_TALENT_PROTECTION_KEYS.forEach((key) => keepKeys.add(key));
    }
    const snapshots = await getProtectedSettingsSnapshot(Array.from(keepKeys));

    const transaction = db.transaction([STORE_NAME, SETTINGS_STORE], 'readwrite');
    transaction.objectStore(STORE_NAME).clear();
    transaction.objectStore(SETTINGS_STORE).clear();

    return new Promise((resolve, reject) => {
        transaction.oncomplete = async () => {
            try {
                await writeBackProtectedSettingsSnapshot(snapshots);
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        transaction.onerror = () => reject(transaction.error);
    });
};

export const clearDatabase = async (keepApiKey: boolean): Promise<void> => {
    await clearAllData({ keepApiKey });
};

export const repairAllSaves = async (): Promise<{ total: number; repaired: number }> => {
    const db = await initDatabase();
    const saves = await getSavesList();
    let repairedCount = 0;

    await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        saves.forEach(save => {
            let wasSaveRepaired = false;
            if (save.history && Array.isArray(save.history)) {
                save.history.forEach(item => {
                    if (item.rawJson) {
                        const isFallback = item.structuredResponse?.logs?.length === 1 && 
                                         (item.structuredResponse.logs[0].text === item.rawJson || 
                                          item.structuredResponse.logs[0].text.includes('{"thinking_pre"') ||
                                          item.structuredResponse.logs[0].text.includes('{"logs"'));
                        
                        if (!item.structuredResponse || isFallback) {
                            try {
                                const repaired = parseStoryRawText(item.rawJson);
                                if (repaired.logs.length > 1 || !repaired.logs[0].text.includes('{"')) {
                                    item.structuredResponse = repaired;
                                    wasSaveRepaired = true;
                                }
                            } catch (e) {
                                // Ignore
                            }
                        }
                    }
                });
            }

            if (wasSaveRepaired) {
                store.put(save);
                repairedCount++;
            }
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });

    return { total: saves.length, repaired: repairedCount };
};
