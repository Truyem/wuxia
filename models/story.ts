export interface StoryEndCondition {
    type: 'Thời gian' | 'Sự kiện' | 'Biến số';
    description: string;
    targetValue?: string | number | boolean;
    correspondingVariableKey?: string;
}

export interface PendingEventStructure {
    name: string;
    description: string;
    triggerConditionOrTime: string;
    expirationTime: string;
}

export interface StoryChapter {
    id: string;
    index: number;
    title: string;
    summary: string;
    backgroundStory: string;
    mainConflict: string;
    endConditions: StoryEndCondition[];
    foreshadowingList: string[];
}

export interface StorySystemStructure {
    currentChapter: StoryChapter;
    nextChapterPreview: {
        title: string;
        outline: string;
    };
    historicalArchives: {
        title: string;
        summary: string;
        backgroundStory: string;
        epilogue: string;
    }[];
    shortTermPlanning: string;
    mediumTermPlanning: string;
    longTermPlanning: string;
    pendingEvents: PendingEventStructure[];
    worldQuestList: any[];
    promiseList: any[];
    storyVariables: Record<string, boolean | number | string>;
    actionCountSinceLastChapter: number;
}
