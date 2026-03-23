import { PromptStructure } from '../../types';

export const storyMemoryRecallCOTPrompt = `【Recall Logic】
1. Analyze the context of the current Turn.
2. Search available memories for events related to current characters, locations, or plots.
3. Categorize memories into "Strong" (Direct impact) and "Weak" (Contextual/Background).
`;

export const storyMemoryRecallFormatPrompt = `【Response Format】
Output exactly two lines using the following labels:
Strong memory: [List of IDs like 【Recall001】, 【Recall002】 or "None"]
Weak memory: [List of IDs like 【Recall003】 or "None"]
`;

export const constructRecallUserPrompt = (playerInput: string, memoryCorpus: string): string => {
    return `【Current Player Input】
${playerInput}

【Available Memories】
${memoryCorpus}

Please identify relevant memories.
`.trim();
};

export const StoryRecall: PromptStructure = {
    id: 'story_recall',
    title: 'Story Memory Recall',
    content: `${storyMemoryRecallCOTPrompt}\n\n${storyMemoryRecallFormatPrompt}`,
    type: 'runtime',
    enabled: true
};
