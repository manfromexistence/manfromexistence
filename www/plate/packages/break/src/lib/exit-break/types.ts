import type { QueryNodeOptions } from '@udecode/plate';

export interface ExitBreakRule {
  /** Hotkey to trigger exit break. */
  hotkey: string;

  /** @see {@link QueryNodeOptions} */
  query?: {
    /** When the selection is at the end of the block above. */
    end?: boolean;
    /** When the selection is at the start of the block above. */
    start?: boolean;
  } & QueryNodeOptions;

  /** Exit before the selected block if true. */
  before?: boolean;

  defaultType?: string;

  /** Path level where to exit. Default is 0. */
  level?: number;

  /**
   * If true, exit relative to current level. Otherwise, exit at the given
   * level. Default is false.
   */
  relative?: boolean;
}
