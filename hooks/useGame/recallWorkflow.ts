import * as aiService from '../../services/aiService';
import { ApiSettings, MemorySystem } from '../../models/system';
import { getRecallApiConfig, isApiConfigUsable, isWorkerUrlAvailable } from '../../utils/apiConfig';
import {
    storyMemoryRecallCOTPrompt,
    storyMemoryRecallFormatPrompt,
    constructRecallUserPrompt
} from '../../prompts/runtime/recall';
import {
    constructRecallContext,
    parseStoryMemoryOutput,
    constructRecallTags
} from './memoryRecall';

export type StoryMemoryRecallResult = {
    tagContent: string;
    previewText: string;
} | null;

export const executeStoryMemoryRecall = async (
    playerInput: string,
    mem: MemorySystem,
    apiSettings: ApiSettings,
    options?: {
        signal?: AbortSignal;
        onDelta?: (delta: string, accumulated: string) => void;
        workerUrl?: string;
    }
): Promise<StoryMemoryRecallResult> => {
    const recallApi = getRecallApiConfig(apiSettings);
    const workerUrl = options?.workerUrl;
    
    // Allow worker fallback when no recall API is configured
    if (!isApiConfigUsable(recallApi) && !isWorkerUrlAvailable(workerUrl)) {
        return null;
    }

    const recallConfig = apiSettings.featureModelPlaceholder || ({} as any);
    const fullN = Math.max(1, Number(recallConfig.recallFullContextLimitN) || 20);
    const memoryCorpus = constructRecallContext(mem, fullN);

    const systemPrompt = `${storyMemoryRecallCOTPrompt}\n\n${storyMemoryRecallFormatPrompt}`;
    const userPrompt = constructRecallUserPrompt(playerInput, memoryCorpus);

    const raw = await aiService.generateMemoryRecall(
        systemPrompt,
        userPrompt,
        recallApi,
        options?.signal,
        options?.onDelta
            ? {
                stream: true,
                onDelta: options.onDelta
            }
            : undefined,
        workerUrl
    );
    const parsed = parseStoryMemoryOutput(raw);
    const tagContent = constructRecallTags(mem, parsed);

    return {
        tagContent,
        previewText: parsed.normalizedText || 'Ký ức mạnh:Không\nKý ức yếu:Không'
    };
};
