import { PromptStructure } from '../../types';

export const Core_OutputFormat: PromptStructure = {
  id: 'core_format',
  title: 'Output Format',
  content: `
<OUTPUT FORMAT>
# Mandatory Format Rules

## 1. Root Tags (Required)
Output must contain these tags:
- <main>: Story narrative and dialogue.
- <shortTerm>: Brief summary of this turn's events.
- <commands>: System state update commands.

## 2. Content Structure (<main>)
Use these prefixes to differentiate content:
- "Background": For setting descriptions, actions, character inner thoughts.
- "Character Name": For direct dialogue. Put dialogue in quotes " ".
- "[Result]": For announcing results of risky actions (dice roll).

## 3. Command Rules (<commands>)
- Each command on its own line.
- Syntax: SET/ADD/PUSH [variable path] [value].
- Example: ADD gameState.Character.currentEnergy -10.

## 4. Short Term Memory (<shortTerm>)
- Write as objective event summary.
- Focus on the most important changes just occurred.

## 5. Length Rules (Distribution)
- Total output must be at least 4000 Vietnamese characters.
- Distribution ratio (example: 15 = 7+1+2+3+3+1 = 7000+1000+2000+3000+3000+1000):
  - Background/Environment: 7 parts (~7000 chars)
  - Dialogue/Action: 8 parts (~8000 chars, remaining)
- Fully describe senses, space, inner thoughts, emotions.
    `.trim(),
  type: 'core',
  enabled: true
};
