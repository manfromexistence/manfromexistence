import type { Node } from 'unist';

export interface NpmCommands {
  __bunCommand__?: string;
  __npmCommand__?: string;
  __pnpmCommand__?: string;
  __yarnCommand__?: string;
}

export interface UnistNode extends Node {
  type: string;
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
  name?: string;
  properties?: {
    [key: string]: unknown;
    __className__?: string;
    __event__?: string;
    __rawString__?: string;
  } & NpmCommands;
  tagName?: string;
  value?: string;
}

export interface UnistTree extends Node {
  children: UnistNode[];
}
