import type { Emoji, EmojiMartData } from '@emoji-mart/data';
/**
 * Emoji: type Emoji = { id: string; name: string; keywords: string[]; skins: [
 * { unified: '1f389'; native: '🎉'; shortcodes: ':tada:'; } ]; version: 1; };
 */

export type EmojiLibrary = EmojiMartData;

export type Emojis = Record<string, Emoji>;

export interface IEmojiLibrary {
  keys: string[];
  getEmoji: (key: string) => Emoji;
  getEmojiId: (key: string) => string;
}

export { type Emoji } from '@emoji-mart/data';
