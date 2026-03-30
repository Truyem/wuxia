import type { PromptStructure } from '../../types';
import { Core_OutputFormat } from '../core/format';
import { Core_OutputFormat_MultiThought } from '../core/formatMulti';
import { CoreActionOptions } from '../core/actionOptions';

const getPromptContent = (promptPool: PromptStructure[], id: string): string => {
    const hit = promptPool.find((item) => item.id === id && item.enabled !== false);
    return typeof hit?.content === 'string' ? hit.content.trim() : '';
};

export const getOutputProtocolPrompt = (promptPool: PromptStructure[]): string => {
    return getPromptContent(promptPool, 'core_format')
        || getPromptContent(promptPool, 'core_format_multi')
        || (typeof Core_OutputFormat?.content === 'string' ? Core_OutputFormat.content.trim() : '')
        || (typeof Core_OutputFormat_MultiThought?.content === 'string' ? Core_OutputFormat_MultiThought.content.trim() : '');
};

export const getActionOptionsPrompt = (
    promptPool: PromptStructure[],
    enabled: boolean
): string => {
    if (!enabled) return '';
    return getPromptContent(promptPool, 'core_action_options')
        || (typeof CoreActionOptions?.content === 'string' ? CoreActionOptions.content.trim() : '');
};
