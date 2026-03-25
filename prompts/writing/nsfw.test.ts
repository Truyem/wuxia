import { expect, test } from 'vitest';
import { WritingNsfw } from './nsfw';

test('NSFW prompt should be disabled by default', () => {
    expect(WritingNsfw.enabled).toBe(false);
});
