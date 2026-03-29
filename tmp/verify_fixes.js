
// Mock the PromptStructure type
const mockPrompts = [
    { id: 'p1', content: 'hello' },
    { id: 'p2', content: undefined },
    { id: 'p3', content: null }
];

// Test the new hash function
const hash = (plist) => plist.map(p => `${p.id}-${(p.content || '').length}`).join('|');
console.log('Testing hash function:');
console.log('Result:', hash(mockPrompts));
console.log('Expected: p1-5|p2-0|p3-0');

// Test music settings normalization
const defaultMusicSettings = {
    volume: 0.5,
    shuffle: false,
    loopPlaylist: true,
    singleLoop: false,
    playlist: [],
    currentSongId: null
};

const normalizeMusicSettings = (raw) => {
    const result = {
        ...defaultMusicSettings,
        ...(raw || {}),
        playlist: Array.isArray(raw?.playlist) ? raw.playlist : defaultMusicSettings.playlist,
    };

    if (typeof result.volume === 'number' && result.volume > 1) {
        result.volume = result.volume / 100;
    }

    return result;
};

console.log('\nTesting music normalization:');
console.log('Raw 50 ->', normalizeMusicSettings({ volume: 50 }).volume);
console.log('Raw 0.8 ->', normalizeMusicSettings({ volume: 0.8 }).volume);
console.log('Null ->', normalizeMusicSettings(null).volume);
