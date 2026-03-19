import type { StoryStyleType, NTLHaremTier } from '../../../models/system';
import { storyStylePromptHarem } from './harem';
import { storyStylePromptCultivation } from './cultivation';
import { storyStylePromptGeneral } from './general';
import { storyStylePromptShura } from './shura';
import { storyStylePromptPureLove } from './pureLove';
import { storyStylePromptNTLHaremProhibitIncest, storyStylePromptNTLHaremFakeIncest, storyStylePromptNTLHaremUnrestricted } from './ntlHarem';

const stylePromptMapping: Record<string, string> = {
    // Vietnamese style names (used by UI)
    'Hậu cung': storyStylePromptHarem,
    'Tu luyện': storyStylePromptCultivation,
    'Thông thường': storyStylePromptGeneral,
    'Tu la tràng': storyStylePromptShura,
    'Thuần ái': storyStylePromptPureLove,
    // Legacy English style names (kept for backward-compat)
    Harem: storyStylePromptHarem,
    Cultivation: storyStylePromptCultivation,
    General: storyStylePromptGeneral,
    'Asura field/Scene of intense conflict': storyStylePromptShura,
    'Pure Love': storyStylePromptPureLove,
    NTLHarem: storyStylePromptNTLHaremUnrestricted
};

export const getStoryStylePrompt = (style: StoryStyleType, ntlTier?: NTLHaremTier): string => {
    if (style === 'NTL Hậu cung' as any || (style as any) === 'NTLHarem') {
        if (ntlTier === 'Giả loạn luân' as any || (ntlTier as any) === 'Fake incest') return storyStylePromptNTLHaremFakeIncest;
        if (ntlTier === 'Không giới hạn' as any || (ntlTier as any) === 'Unrestricted') return storyStylePromptNTLHaremUnrestricted;
        if (ntlTier === 'Cấm loạn luân' as any || (ntlTier as any) === 'Prohibit incest') return storyStylePromptNTLHaremProhibitIncest;
        return storyStylePromptNTLHaremUnrestricted;
    }
    return stylePromptMapping[style as any] || stylePromptMapping['General'];
};

export const constructStorylineStyleAssistantPrompt = (style: StoryStyleType, ntlTier?: NTLHaremTier): string => {
    return `【Ưu tiên phong cách truyện】\n${getStoryStylePrompt(style, ntlTier)}`;
};
