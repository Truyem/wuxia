import { useState, useEffect, useCallback } from 'react';
import { ApiSettings, ApiConfig } from '../types';

const STORAGE_KEY = 'global_model_options';

export interface ModelOptions {
    all: string[];
    chatgpt: string[];
    gemini: string[];
    claud: string[]; // Keep typo claud if existing or rename claud -> claude
    deepseek: string[];
    other: string[];
}

const DEFAULT_OPTIONS: ModelOptions = {
    all: [],
    chatgpt: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'o1', 'o1-mini'],
    gemini: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    claud: ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest'],
    deepseek: ['deepseek-chat', 'deepseek-reasoner'],
    other: []
};

export const useModelOptions = (apiSettings: ApiSettings) => {
    const [options, setOptions] = useState<ModelOptions>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_OPTIONS;
    });
    const [loading, setLoading] = useState(false);

    const activeConfig = apiSettings && apiSettings.configs && apiSettings.configs.length > 0
        ? apiSettings.configs.find(cfg => cfg.id === apiSettings.activeConfigId) || apiSettings.configs[0]
        : undefined;

    const fetchModels = useCallback(async () => {
        if (activeConfig?.provider === 'worker') {
            const workerModels = ['nvidia/Llama-3.1-Nemotron-70B-Instruct-HF'];
            const newOptions: ModelOptions = {
                ...DEFAULT_OPTIONS,
                all: workerModels,
                other: workerModels
            };
            setOptions(newOptions);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newOptions));
            return workerModels;
        }

        if (!activeConfig?.apiKey || !activeConfig?.baseUrl) {
            // If activeConfig is undefined or lacks necessary properties, return null
            return null;
        }

        setLoading(true);
        try {
            const base = activeConfig.baseUrl.replace(/\/+$/, '');
            const normalized = base.replace(/\/v1$/i, '');
            const candidateUrls = Array.from(new Set([
                `${normalized}/v1/models`,
                `${normalized}/models`,
                `${base}/models`,
                ...(base.includes('generativelanguage.googleapis.com')
                    ? [`${normalized}/openai/v1/models`]
                    : [])
            ]));

            let resultModels: string[] = [];

            for (const url of candidateUrls) {
                try {
                    const res = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${activeConfig.apiKey}`
                        }
                    });
                    if (!res.ok) continue;
                    const data = await res.json();
                    if (data && Array.isArray(data.data)) {
                        resultModels = data.data.map((m: any) => m?.id).filter(Boolean);
                        break;
                    }
                } catch (err) {
                    continue;
                }
            }

            if (resultModels.length > 0) {
                const newOptions: ModelOptions = {
                    ...DEFAULT_OPTIONS,
                    all: resultModels,
                    other: resultModels.filter(m => 
                        !DEFAULT_OPTIONS.chatgpt.includes(m) && 
                        !DEFAULT_OPTIONS.gemini.includes(m) && 
                        !DEFAULT_OPTIONS.claud.includes(m) && 
                        !DEFAULT_OPTIONS.deepseek.includes(m)
                    )
                };
                setOptions(newOptions);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newOptions));
                return resultModels;
            }
            return null;
        } catch (e) {
            console.error('Failed to fetch models:', e);
            return null;
        } finally {
            setLoading(false);
        }
    }, [activeConfig]);

    return { options, loading, fetchModels };
};
