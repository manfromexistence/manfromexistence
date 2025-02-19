import type { DependencyList } from 'react';

import type { Key } from './key';

export type FormTags =
  | 'INPUT'
  | 'input'
  | 'SELECT'
  | 'select'
  | 'TEXTAREA'
  | 'textarea';

export type Hotkey = {
  keys?: readonly string[];
  description?: string;
  scopes?: Scopes;
} & KeyboardModifiers;

export type HotkeyCallback = (
  keyboardEvent: KeyboardEvent,
  hotkeysEvent: HotkeysEvent
) => void;

export type HotkeysEvent = Hotkey;

export type KeyboardModifiers = {
  alt?: boolean;
  ctrl?: boolean;
  meta?: boolean;
  mod?: boolean;
  shift?: boolean;
  useKey?: boolean; // Custom modifier to listen to the produced key instead of the code
};

export type Keys =
  | (({} & string) | keyof typeof Key)[][]
  | readonly string[]
  | string;

export type Options = {
  // Character to separate different hotkeys. (Default: ,)
  delimiter?: string;
  // Use this option to describe what the hotkey does. (Default: undefined)
  description?: string;
  // Listen to events on the document instead of the window. (Default: false)
  document?: Document;
  // Main setting that determines if the hotkey is enabled or not. (Default: true)
  enabled?: Trigger;
  // Enable hotkeys on tags with contentEditable props. (Default: false)
  enableOnContentEditable?: boolean;
  // Enable hotkeys on a list of tags. (Default: false)
  enableOnFormTags?: readonly FormTags[] | boolean;
  // Skip running the handler if event.defaultPrevented is true (Default: true)
  ignoreEventWhenPrevented?: boolean;
  // Ignore modifiers when matching hotkeys. (Default: false)
  ignoreModifiers?: boolean;
  // Trigger on keydown event? (Default: true)
  keydown?: boolean;
  // Trigger on keyup event? (Default: undefined)
  keyup?: boolean;
  // Prevent default browser behavior? (Default: false)
  preventDefault?: Trigger;
  // Scope of the hotkey. (Default: undefined)
  scopes?: Scopes;
  // Character to split keys in hotkeys combinations. (Default: +)
  splitKey?: string;
  // Listen to the produced key instead of the code. (Default: false)
  useKey?: boolean;
  // Ignore evenets based on a condition (Default: undefined)
  ignoreEventWhen?: (e: KeyboardEvent) => boolean;
};

export type OptionsOrDependencyArray = DependencyList | Options;

export type RefType<T> = T | null;

export type Scopes = readonly string[] | string;

export type Trigger =
  | ((keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => boolean)
  | boolean;
