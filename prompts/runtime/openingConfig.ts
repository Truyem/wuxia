import type { OpeningConfig } from '../../types';

export const buildOpeningConfigPrompt = (openingConfig?: OpeningConfig | null): string => {
    if (!openingConfig) return '';
    const relationshipFocus = Array.isArray(openingConfig.relationshipFocus) && openingConfig.relationshipFocus.length > 0
        ? openingConfig.relationshipFocus.join(', ')
        : 'None';
    return [
        '【Current Opening Config Constraints】',
        `- Relationship focus: ${relationshipFocus}. When generating initial social network, prioritize character structures and relationship emotions along these directions.`,
        `- Opening approach preference: ${openingConfig.openingApproach}. First scene lens and atmosphere should align with this approach, not drift without trace.`,
        '- If opening preference conflicts with save/hard constraints and world_prompt, save/hard constraints take precedence, but still try to preserve relationship focus and approach direction.'
    ].join('\n');
};

export const buildWorldFusionPrompt = (openingConfig?: OpeningConfig | null): string => {
    const fandom = openingConfig?.fandomFusion;
    const title = typeof fandom?.title === 'string' ? fandom.title.trim() : '';
    if (!fandom?.enabled || !title) return '';
    const rolePolicy = fandom.keepOriginalCharacters
        ? 'Allow original characters, original factions or their direct variants into world base, but ensure this project Wuxia growth system and long-term narrative can run.'
        : 'Only absorb original world themes, temperament, faction logic, geography aesthetics or value conflicts, do not directly keep original character entities.';
    return [
        '【Fandom Fusion World Requirements】',
        `- Reference source: ${title} (${fandom.sourceType}).`,
        `- Fusion strength: ${fandom.fusionStrength}.`,
        `- Character retention policy: ${rolePolicy}`,
        '- This requirement only affects world_prompt generation, do not write as fan setting list, character introductions or story outline at world building stage.',
        '- The fused result must still be an original world base that can run long-term with current save, and compatible with this project existing growth formula.'
    ].join('\n');
};