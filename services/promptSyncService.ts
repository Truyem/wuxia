import * as dbService from './dbService';
import { DefaultPrompts } from '../prompts';
import { PromptStructure } from '../models/system';

export class PromptSyncService {
    /**
     * Synchronizes prompts from local defaults in the application bundle.
     * This ensures that when the web app is rebuilt and redeployed with new prompts,
     * the user's local database is automatically updated.
     * Returns the updated prompts array.
     */
    static async syncPrompts(currentPrompts: PromptStructure[]): Promise<PromptStructure[]> {
        let synced = [...currentPrompts];
        let hasChanges = false;

        // Sync with local defaults in the application code
        for (const defaultPrompt of DefaultPrompts) {
            const index = synced.findIndex(p => p.id === defaultPrompt.id);
            if (index === -1) {
                // New prompt added to the code
                console.log(`[PromptSyncService] Adding new prompt: ${defaultPrompt.id}`);
                synced.push({ ...defaultPrompt });
                hasChanges = true;
            } else if (synced[index].content !== defaultPrompt.content || synced[index].title !== defaultPrompt.title) {
                // Existing prompt updated in the code
                console.log(`[PromptSyncService] Updating prompt content: ${defaultPrompt.id}`);
                synced[index] = { 
                    ...synced[index], 
                    content: defaultPrompt.content, 
                    title: defaultPrompt.title 
                };
                hasChanges = true;
            }
        }

        if (hasChanges) {
            await dbService.saveSetting('prompts', synced);
            console.log('[PromptSyncService] Prompt synchronization complete with changes.');
        }

        return synced;
    }
}
