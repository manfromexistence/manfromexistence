import type { Registry } from './schema';

import { siteConfig } from '../config/site';

export const uiComponents: Registry = [
  {
    dependencies: [
      '@udecode/plate-ai',
      '@udecode/plate-markdown',
      '@udecode/plate-selection',
      'ai',
      '@faker-js/faker',
    ],
    doc: {
      description: 'A menu for AI-powered content generation and insertion.',
      docs: [
        { route: '/docs/ai', title: 'AI' },
        {
          route: siteConfig.links.plateProComponent('ai-menu'),
          title: 'AI Menu',
        },
      ],
      examples: ['ai-demo', 'ai-pro'],
      label: 'New',
      title: 'AI Menu',
    },
    files: [
      { path: 'plate-ui/ai-menu.tsx', type: 'registry:ui' },
      { path: 'plate-ui/ai-menu-items.tsx', type: 'registry:ui' },
      { path: 'plate-ui/ai-chat-editor.tsx', type: 'registry:ui' },
    ],
    name: 'ai-menu',
    registryDependencies: ['use-chat', 'command', 'popover', 'editor'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A toolbar button for accessing AI features.',
      docs: [
        { route: '/docs/ai', title: 'AI' },
        { route: siteConfig.links.plateProComponent('ai-toolbar-button') },
      ],
      examples: ['ai-demo', 'floating-toolbar-demo', 'ai-pro'],
      label: 'New',
      title: 'AI Toolbar Button',
    },
    files: [{ path: 'plate-ui/ai-toolbar-button.tsx', type: 'registry:ui' }],
    name: 'ai-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-alignment', '@radix-ui/react-dropdown-menu'],
    doc: {
      description: 'A dropdown menu for text alignment controls.',
      docs: [{ route: '/docs/alignment' }],
      examples: ['align-demo'],
    },
    files: [{ path: 'plate-ui/align-dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'align-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-ai',
      '@udecode/plate-block-quote',
      '@udecode/plate-heading',
      '@udecode/plate-indent-list',
      '@udecode/plate-selection',
    ],
    doc: {
      description: 'A context menu for block-level operations.',
      docs: [
        { route: '/docs/block-menu' },
        { route: siteConfig.links.plateProComponent('block-context-menu') },
      ],
      examples: ['block-menu-demo', 'block-menu-pro'],
      label: 'New',
    },
    files: [{ path: 'plate-ui/block-context-menu.tsx', type: 'registry:ui' }],
    name: 'block-context-menu',
    registryDependencies: [
      'calendar',
      'plate-element',
      'context-menu',
      'use-is-touch-device',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-selection'],
    doc: {
      description: 'A visual overlay for selected blocks.',
      docs: [
        { route: '/docs/block-selection' },
        { route: siteConfig.links.plateProComponent('block-selection') },
      ],
      examples: ['block-selection-demo', 'block-selection-pro'],
      label: 'New',
    },
    files: [{ path: 'plate-ui/block-selection.tsx', type: 'registry:ui' }],
    name: 'block-selection',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['html2canvas', 'pdf-lib'],
    doc: {
      description: 'A toolbar button to export editor content as PDF.',
      docs: [{ route: '/docs/export', title: 'Export' }],
      examples: ['basic-nodes-demo'],
      label: 'New',
      title: 'Export Toolbar Button',
    },
    files: [
      { path: 'plate-ui/export-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'export-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-caption'],
    doc: {
      description: 'A text field for adding captions to media elements.',
      docs: [
        { route: '/docs/caption' },
        { route: siteConfig.links.plateProComponent('caption') },
      ],
      examples: [
        'media-demo',
        // 'upload-demo'
      ],
    },
    files: [{ path: 'plate-ui/caption.tsx', type: 'registry:ui' }],
    name: 'caption',
    registryDependencies: ['button'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-font', '@radix-ui/react-dropdown-menu'],
    doc: {
      description: 'A color picker with text and background color controls.',
      docs: [
        { route: '/docs/font' },
        { route: siteConfig.links.plateProComponent('color-dropdown-menu') },
      ],
      examples: ['font-demo'],
      //       1. Text color can be modified using the floating toolbar or block menu, providing more flexibility in formatting.
      // 2. An improved color picker interface with custom color options and a color input field for precise color selection.
    },
    files: [
      { path: 'plate-ui/color-constants.ts', type: 'registry:ui' },
      { path: 'plate-ui/color-dropdown-menu-items.tsx', type: 'registry:ui' },
      { path: 'plate-ui/color-dropdown-menu.tsx', type: 'registry:ui' },
      { path: 'plate-ui/color-input.tsx', type: 'registry:ui' },
      { path: 'plate-ui/color-picker.tsx', type: 'registry:ui' },
      { path: 'plate-ui/colors-custom.tsx', type: 'registry:ui' },
    ],
    name: 'color-dropdown-menu',
    registryDependencies: [
      'dropdown-menu',
      'toolbar',
      'separator',
      'button',
      'tooltip',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-comments'],
    doc: {
      description: 'A toolbar button for adding inline comments.',
      docs: [
        { route: '/docs/comments' },
        { route: siteConfig.links.plateProComponent('comment-toolbar-button') },
      ],
      examples: ['comments-demo', 'floating-toolbar-demo', 'comments-pro'],
    },
    files: [
      { path: 'plate-ui/comment-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'comment-toolbar-button',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-comments', 'date-fns'],
    doc: {
      description: 'A popover interface for managing comments and replies.',
      docs: [
        { route: '/docs/comments' },
        { route: siteConfig.links.plateProComponent('comments-popover') },
      ],
      examples: ['comments-demo', 'comments-pro'],
    },
    files: [
      { path: 'plate-ui/comment-avatar.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-create-form.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-item.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-more-dropdown.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-reply-items.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-resolve-button.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-value.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comments-popover.tsx', type: 'registry:ui' },
    ],
    name: 'comments-popover',
    registryDependencies: ['popover', 'avatar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-selection'],
    doc: {
      description: 'A visual overlay for cursors and selections.',
      docs: [
        { route: '/docs/cursor-overlay' },
        { route: siteConfig.links.plateProComponent('cursor-overlay') },
      ],
      examples: ['ai-demo'],
    },
    files: [{ path: 'plate-ui/cursor-overlay.tsx', type: 'registry:ui' }],
    name: 'cursor-overlay',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-dnd',
      '@udecode/plate-selection',
      '@udecode/plate-block-quote',
      '@udecode/plate-excalidraw',
      '@udecode/plate-heading',
      '@udecode/plate-layout',
      '@udecode/plate-table',
      '@udecode/plate-toggle',
      '@udecode/plate-media',
      'react-dnd',
      'react-dnd-html5-backend',
    ],
    doc: {
      description: 'A drag handle for moving editor blocks.',
      docs: [
        { route: '/docs/dnd', title: 'Drag & Drop' },
        { route: siteConfig.links.plateProComponent('draggable') },
      ],
      examples: ['dnd-demo', 'dnd-pro'],
      usage: [
        `import { DndPlugin } from '@udecode/plate-dnd';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';`,
        `export function MyEditor() {
  const editor = usePlateEditor({
    plugins: [
      // ...otherPlugins,
      NodeIdPlugin,
      DndPlugin.configure({ options: { enableScroller: true } }),
    ],
    override: {
      components: {
        // ...components
      },
    }
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <PlateContent />
      </Plate>
    </DndProvider>
  );
}`,
      ],
      // Click the plus button next to the drag button to insert blocks
    },
    files: [{ path: 'plate-ui/draggable.tsx', type: 'registry:ui' }],
    name: 'draggable',
    registryDependencies: ['tooltip', 'use-mounted'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A container for the editor content and styling.',
      docs: [{ route: siteConfig.links.plateProComponent('editor') }],
      examples: ['editor-default', 'editor-disabled', 'editor-full-width'],
    },
    files: [
      { path: 'plate-ui/editor.tsx', type: 'registry:ui' },
      { path: 'plate-ui/editor-static.tsx', type: 'registry:ui' },
    ],
    name: 'editor',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['fzf@0.5.2', '@udecode/plate-tag', '@udecode/cmdk'],
    doc: {
      description: 'An editor to select tags.',
      docs: [{ route: '/docs/multi-select' }],
      examples: ['select-editor-demo'],
      label: 'New',
    },
    files: [{ path: 'plate-ui/select-editor.tsx', type: 'registry:ui' }],
    name: 'select-editor',
    registryDependencies: ['editor', 'command', 'popover', 'tag-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-emoji', '@radix-ui/react-popover'],
    doc: {
      description: 'A dropdown menu for emoji selection and insertion.',
      docs: [
        { route: '/docs/emoji' },
        { route: siteConfig.links.plateProComponent('emoji-picker') },
      ],
      examples: ['emoji-demo', 'emoji-pro'],
    },
    files: [
      { path: 'plate-ui/emoji-dropdown-menu.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-icons.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-picker-content.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-picker-navigation.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-picker-preview.tsx', type: 'registry:ui' },
      {
        path: 'plate-ui/emoji-picker-search-and-clear.tsx',
        type: 'registry:ui',
      },
      { path: 'plate-ui/emoji-picker-search-bar.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-picker.tsx', type: 'registry:ui' },
      { path: 'plate-ui/emoji-toolbar-dropdown.tsx', type: 'registry:ui' },
    ],
    name: 'emoji-dropdown-menu',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-basic-marks',
      '@udecode/plate-font',
      '@udecode/plate-indent-list',
      '@udecode/plate-media',
      '@udecode/plate-highlight',
    ],
    doc: {
      description: 'A set of commonly used formatting buttons.',
      examples: ['basic-nodes-demo'],
    },
    files: [
      { path: 'plate-ui/fixed-toolbar-buttons.tsx', type: 'registry:ui' },
    ],
    name: 'fixed-toolbar-buttons',
    registryDependencies: [
      'toolbar',
      'ai-toolbar-button',
      'align-dropdown-menu',
      'color-dropdown-menu',
      'comment-toolbar-button',
      'emoji-dropdown-menu',
      'history-toolbar-button',
      'indent-list-toolbar-button',
      'indent-todo-toolbar-button',
      'indent-toolbar-button',
      'insert-dropdown-menu',
      'line-height-dropdown-menu',
      'link-toolbar-button',
      'mark-toolbar-button',
      'media-toolbar-button',
      'mode-dropdown-menu',
      'more-dropdown-menu',
      'outdent-toolbar-button',
      'table-dropdown-menu',
      'toggle-toolbar-button',
      'turn-into-dropdown-menu',
      'export-toolbar-button',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-basic-marks',
      '@udecode/plate-font',
      '@udecode/plate-list',
      '@udecode/plate-media',
    ],
    // doc: {
    //   description: 'A set of commonly used formatting buttons.',
    //   examples: ['toolbar-demo'],
    // },
    files: [
      { path: 'plate-ui/fixed-toolbar-list-buttons.tsx', type: 'registry:ui' },
    ],
    name: 'fixed-toolbar-list-buttons',
    registryDependencies: [
      'toolbar',
      'ai-toolbar-button',
      'align-dropdown-menu',
      'color-dropdown-menu',
      'comment-toolbar-button',
      'emoji-dropdown-menu',
      'insert-dropdown-menu',
      'line-height-dropdown-menu',
      'list-indent-toolbar-button',
      'link-toolbar-button',
      'mark-toolbar-button',
      'media-toolbar-button',
      'mode-dropdown-menu',
      'more-dropdown-menu',
      'table-dropdown-menu',
      'toggle-toolbar-button',
      'turn-into-dropdown-menu',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A fixed toolbar that stays at the top of the editor.',
      examples: ['basic-nodes-demo'],
    },
    files: [{ path: 'plate-ui/fixed-toolbar.tsx', type: 'registry:ui' }],
    name: 'fixed-toolbar',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-basic-marks'],
    doc: {
      description: 'A set of formatting buttons for the floating toolbar.',
      docs: [
        { route: '/docs/api/floating' },
        {
          route: siteConfig.links.plateProComponent('floating-toolbar-buttons'),
        },
      ],
      examples: ['floating-toolbar-demo', 'floating-toolbar-pro'],
    },
    files: [
      { path: 'plate-ui/floating-toolbar-buttons.tsx', type: 'registry:ui' },
    ],
    name: 'floating-toolbar-buttons',
    registryDependencies: [
      'toolbar',
      'ai-toolbar-button',
      'comment-toolbar-button',
      'link-toolbar-button',
      'mark-toolbar-button',
      'more-dropdown-menu',
      'turn-into-dropdown-menu',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-floating'],
    doc: {
      description: 'A contextual toolbar that appears over selected text.',
      docs: [
        { route: '/docs/api/floating' },
        { route: siteConfig.links.plateProComponent('floating-toolbar') },
      ],
      examples: ['floating-toolbar-demo', 'floating-toolbar-pro'],
    },
    files: [{ path: 'plate-ui/floating-toolbar.tsx', type: 'registry:ui' }],
    name: 'floating-toolbar',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-ai'],
    doc: {
      description:
        'A text suggestion system that displays AI-generated content after the cursor.',
      docs: [
        {
          route: '/docs/copilot',
        },
        { route: siteConfig.links.plateProComponent('ghost-text') },
      ],
      examples: ['copilot-demo', 'copilot-pro'],
      label: 'New',
      //       1. Hover card: a new style of hover card that is more user-friendly. You can **hover** over the ghost text to see the hover card.
      // 2. Marks: support for marks like bold, italic, underline, etc.This means you can see bold text and **links** in the ghost text
      // 3. Backend: complete backend setup.
    },
    files: [{ path: 'plate-ui/ghost-text.tsx', type: 'registry:ui' }],
    name: 'ghost-text',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent'],
    files: [{ path: 'plate-ui/indent-fire-marker.tsx', type: 'registry:ui' }],
    name: 'indent-fire-marker',
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'Toolbar buttons for undo and redo operations.',
      docs: [
        {
          route: 'https://docs.slatejs.org/libraries/slate-history',
          title: 'Slate History',
        },
      ],
      examples: ['basic-nodes-demo'],
    },
    files: [
      { path: 'plate-ui/history-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'history-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent-list'],
    doc: {
      description: 'A toolbar control for adjusting list indentation.',
      docs: [{ route: '/docs/indent-list' }],
      examples: ['list-demo'],
    },
    files: [
      { path: 'plate-ui/indent-list-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'indent-list-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent-list'],
    doc: {
      description: 'A checkbox marker for interactive todo lists.',
      docs: [
        { route: '/docs/indent-list' },
        { route: siteConfig.links.plateProComponent('indent-todo-marker') },
      ],
      examples: ['list-demo'],
    },
    files: [
      { path: 'plate-ui/indent-todo-marker.tsx', type: 'registry:ui' },
      { path: 'plate-ui/indent-todo-marker-static.tsx', type: 'registry:ui' },
    ],
    name: 'indent-todo-marker',
    registryDependencies: ['checkbox'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent-list'],
    doc: {
      description: 'A toolbar control for creating todo list items.',
      docs: [{ route: '/docs/indent-list' }],
      examples: ['list-demo'],
    },
    files: [
      { path: 'plate-ui/indent-todo-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'indent-todo-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent'],
    doc: {
      description: 'A toolbar control for block indentation.',
      docs: [{ route: '/docs/indent' }],
      examples: ['indent-demo'],
    },
    files: [
      { path: 'plate-ui/indent-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'indent-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-combobox', '@ariakit/react'],
    doc: {
      description: 'A combobox for inline suggestions.',
      docs: [
        { route: '/docs/combobox' },
        { route: siteConfig.links.plateProComponent('inline-combobox') },
      ],
      examples: ['mention-demo', 'slash-command-demo', 'emoji-demo'],
    },
    files: [{ path: 'plate-ui/inline-combobox.tsx', type: 'registry:ui' }],
    name: 'inline-combobox',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@radix-ui/react-dropdown-menu',
      '@udecode/plate-block-quote',
      '@udecode/plate-code-block',
      '@udecode/plate-date',
      '@udecode/plate-excalidraw',
      '@udecode/plate-heading',
      '@udecode/plate-horizontal-rule',
      '@udecode/plate-indent-list',
      '@udecode/plate-link',
      '@udecode/plate-media',
      '@udecode/plate-table',
      '@udecode/plate-toggle',
    ],
    doc: {
      description: 'A menu for inserting different types of blocks.',
      examples: ['basic-nodes-demo'],
    },
    files: [{ path: 'plate-ui/insert-dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'insert-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar', 'transforms'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-line-height',
      '@radix-ui/react-dropdown-menu',
    ],
    doc: {
      description: 'A menu for controlling text line spacing.',
      docs: [{ route: '/docs/line-height' }],
      examples: ['line-height-demo'],
    },
    files: [
      { path: 'plate-ui/line-height-dropdown-menu.tsx', type: 'registry:ui' },
    ],
    name: 'line-height-dropdown-menu',
    registryDependencies: ['toolbar', 'dropdown-menu'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-link', '@udecode/plate-floating'],
    doc: {
      description: 'A floating interface for link editing.',
      docs: [
        { route: '/docs/link' },
        { route: '/docs/api/floating' },
        { route: siteConfig.links.plateProComponent('link-floating-toolbar') },
      ],
      examples: ['link-demo', 'link-pro'],
    },
    files: [
      { path: 'plate-ui/link-floating-toolbar.tsx', type: 'registry:ui' },
    ],
    name: 'link-floating-toolbar',
    registryDependencies: ['button', 'input', 'popover', 'separator'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-link'],
    doc: {
      description: 'A toolbar control for link management.',
      docs: [
        { route: '/docs/link' },
        { route: siteConfig.links.plateProComponent('link-toolbar-button') },
      ],
      examples: ['link-demo', 'link-pro'],
    },
    files: [{ path: 'plate-ui/link-toolbar-button.tsx', type: 'registry:ui' }],
    name: 'link-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-list'],
    doc: {
      description: 'A toolbar control for indenting lists.',
      docs: [{ route: '/docs/list' }],
      examples: ['list-demo'],
    },
    files: [
      { path: 'plate-ui/list-indent-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'list-indent-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-list'],
    doc: {
      description: 'A toolbar control for list creation and management.',
      docs: [{ route: '/docs/list' }],
      examples: ['list-demo'],
    },
    files: [{ path: 'plate-ui/list-toolbar-button.tsx', type: 'registry:ui' }],
    name: 'list-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-basic-marks'],
    doc: {
      description: 'A toolbar control for basic text formatting.',
      docs: [{ route: '/docs/basic-marks' }],
      examples: ['basic-marks-demo', 'basic-nodes-pro'],
    },
    files: [{ path: 'plate-ui/mark-toolbar-button.tsx', type: 'registry:ui' }],
    name: 'mark-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media'],
    doc: {
      description: 'A popover interface for media settings.',
      docs: [{ route: '/docs/media' }],
      examples: ['media-demo', 'media-toolbar-pro'],
    },
    files: [{ path: 'plate-ui/media-popover.tsx', type: 'registry:ui' }],
    name: 'media-popover',
    registryDependencies: ['button', 'input', 'popover', 'separator'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', 'use-file-picker', 'sonner'],
    doc: {
      description: 'Toolbar button for inserting and managing media.',
      docs: [{ route: '/docs/media' }],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [{ path: 'plate-ui/media-toolbar-button.tsx', type: 'registry:ui' }],
    name: 'media-toolbar-button',
    registryDependencies: ['toolbar', 'input', 'dropdown-menu', 'alert-dialog'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', 'sonner'],
    doc: {
      description: 'Show toast notifications for media uploads.',
      docs: [{ route: '/docs/media' }],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [{ path: 'plate-ui/media-upload-toast.tsx', type: 'registry:ui' }],
    name: 'media-upload-toast',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-dropdown-menu'],
    doc: {
      description: 'A menu for switching between editor modes.',
      examples: ['basic-nodes-demo'],
    },
    files: [{ path: 'plate-ui/mode-dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'mode-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@radix-ui/react-dropdown-menu',
      '@udecode/plate-basic-marks',
      '@udecode/plate-kbd',
    ],
    doc: {
      description: 'A menu for additional text formatting options.',
      docs: [
        { route: siteConfig.links.plateProComponent('more-dropdown-menu') },
      ],
      examples: ['basic-marks-demo', 'basic-nodes-pro'],
    },
    files: [{ path: 'plate-ui/more-dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'more-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-indent'],
    doc: {
      description: 'A toolbar button for decreasing block indentation.',
      docs: [{ route: '/docs/indent' }],
      examples: ['indent-demo'],
    },
    files: [
      { path: 'plate-ui/outdent-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'outdent-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-heading'],
    doc: {
      description: 'A text placeholder for empty editor blocks.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('placeholder') },
      ],
      examples: ['basic-elements-demo', 'placeholder-pro'],
    },
    files: [{ path: 'plate-ui/placeholder.tsx', type: 'registry:ui' }],
    name: 'placeholder',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-selection'],
    doc: {
      description: 'A base element with block selection support.',
      docs: [{ route: '/docs/block-selection' }],
      examples: ['basic-nodes-demo'],
      label: 'New',
    },
    files: [{ path: 'plate-ui/plate-element.tsx', type: 'registry:ui' }],
    name: 'plate-element',
    registryDependencies: ['block-selection'],
    type: 'registry:ui',
  },
  {
    dependencies: ['react-resizable-panels'],
    doc: {
      description: 'A resizable wrapper with resize handles.',
      docs: [
        { route: '/docs/api/resizable' },
        { route: siteConfig.links.plateProComponent('resizable') },
      ],
      examples: ['media-demo', 'media-toolbar-pro'],
    },
    files: [{ path: 'plate-ui/resizable.tsx', type: 'registry:ui' }],
    name: 'resizable',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-table', '@radix-ui/react-dropdown-menu'],
    doc: {
      description: 'A menu for table manipulation and formatting.',
      docs: [{ route: '/docs/table' }],
      examples: ['table-demo'],
    },
    files: [{ path: 'plate-ui/table-dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'table-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-toggle'],
    doc: {
      description: 'A toolbar button for expanding and collapsing blocks.',
      docs: [{ route: '/docs/toggle' }],
      examples: ['toggle-demo'],
    },
    files: [
      { path: 'plate-ui/toggle-toolbar-button.tsx', type: 'registry:ui' },
    ],
    name: 'toggle-toolbar-button',
    registryDependencies: ['toolbar'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@radix-ui/react-dropdown-menu',
      '@udecode/plate-block-quote',
      '@udecode/plate-code-block',
      '@udecode/plate-heading',
      '@udecode/plate-indent-list',
      '@udecode/plate-toggle',
    ],
    doc: {
      description: 'A menu for converting between different block types.',
      docs: [
        {
          route: siteConfig.links.plateProComponent('turn-into-dropdown-menu'),
        },
      ],
      examples: ['basic-nodes-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/turn-into-dropdown-menu.tsx', type: 'registry:ui' },
    ],
    name: 'turn-into-dropdown-menu',
    registryDependencies: ['dropdown-menu', 'toolbar', 'transforms'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@slate-yjs/react'],
    doc: {
      description:
        'A cursor overlay to display multiplayer cursors in the yjs plugin.',
      docs: [{ route: '/docs/collaboration' }],
      examples: [],
    },
    files: [
      { path: 'plate-ui/remote-cursor-overlay.tsx', type: 'registry:ui' },
    ],
    name: 'remote-cursor-overlay',
    registryDependencies: [],
    type: 'registry:ui',
  },
];

export const uiNodes: Registry = [
  {
    dependencies: [],
    doc: {
      description: 'A text highlighter for AI-generated content.',
      docs: [
        { route: '/docs/ai', title: 'AI' },
        {
          route: siteConfig.links.plateProComponent('ai-leaf'),
          title: 'AI Leaf',
        },
      ],
      examples: ['ai-demo', 'ai-pro'],
      label: 'New',
      title: 'AI Leaf',
    },
    files: [{ path: 'plate-ui/ai-leaf.tsx', type: 'registry:ui' }],
    name: 'ai-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A quote component for block quotes.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('blockquote-element') },
      ],
      examples: ['basic-elements-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/blockquote-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/blockquote-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'blockquote-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-code-block', 'prismjs'],
    doc: {
      description:
        'A code block with syntax highlighting and language selection.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('code-block-element') },
      ],
      examples: ['basic-elements-demo'],
    },
    files: [
      { path: 'plate-ui/code-block-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/code-block-element-static.tsx', type: 'registry:ui' },
      { path: 'plate-ui/code-block-element.css', type: 'registry:ui' },
      { path: 'plate-ui/code-block-combobox.tsx', type: 'registry:ui' },
    ],
    name: 'code-block-element',
    registryDependencies: ['command', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'An inline component for code snippets.',
      docs: [
        { route: '/docs/basic-marks' },
        { route: siteConfig.links.plateProComponent('code-leaf') },
      ],
      examples: ['basic-marks-demo'],
    },
    files: [
      { path: 'plate-ui/code-leaf.tsx', type: 'registry:ui' },
      { path: 'plate-ui/code-leaf-static.tsx', type: 'registry:ui' },
    ],
    name: 'code-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A line component for code blocks.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('code-line-element') },
      ],
      examples: ['basic-elements-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/code-line-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/code-line-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'code-line-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-code-block'],
    doc: {
      description: 'A syntax highlighting component for code blocks.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('code-syntax-leaf') },
      ],
      examples: ['basic-elements-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/code-syntax-leaf.tsx', type: 'registry:ui' },
      { path: 'plate-ui/code-syntax-leaf-static.tsx', type: 'registry:ui' },
    ],
    name: 'code-syntax-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-layout', '@udecode/plate-resizable'],
    doc: {
      description: 'A resizable column component for layout.',
      docs: [
        { route: '/docs/column' },
        { route: siteConfig.links.plateProComponent('column-element') },
      ],
      examples: ['column-demo'],
    },
    files: [
      { path: 'plate-ui/column-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/column-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'column-element',
    registryDependencies: ['resizable', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-layout'],
    doc: {
      description: 'A resizable column component for layout.',
      docs: [
        { route: '/docs/column' },
        { route: siteConfig.links.plateProComponent('column-group-element') },
      ],
      examples: ['column-demo'],
    },
    files: [
      { path: 'plate-ui/column-group-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/column-group-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'column-group-element',
    registryDependencies: ['command', 'resizable', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-comments'],
    doc: {
      description:
        'A text component for displaying comments with visual indicators.',
      docs: [
        { route: '/docs/comments' },
        { route: siteConfig.links.plateProComponent('comment-leaf') },
      ],
      examples: ['comments-demo', 'comments-pro'],
    },
    files: [
      { path: 'plate-ui/comment-leaf.tsx', type: 'registry:ui' },
      { path: 'plate-ui/comment-leaf-static.tsx', type: 'registry:ui' },
    ],
    name: 'comment-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-date'],
    doc: {
      description: 'A date field component with calendar picker.',
      docs: [
        { route: '/docs/date' },
        { route: siteConfig.links.plateProComponent('date-element') },
      ],
      examples: ['date-demo'],
      label: 'New',
    },
    files: [
      { path: 'plate-ui/date-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/date-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'date-element',
    registryDependencies: ['calendar', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-emoji'],
    doc: {
      description: 'An input component for emoji search and insertion.',
      docs: [
        { route: '/docs/emoji' },
        { route: siteConfig.links.plateProComponent('emoji-input-element') },
      ],
      examples: ['emoji-demo'],
    },
    files: [{ path: 'plate-ui/emoji-input-element.tsx', type: 'registry:ui' }],
    name: 'emoji-input-element',
    registryDependencies: ['inline-combobox', 'plate-element', 'use-debounce'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-excalidraw'],
    doc: {
      description: 'A drawing component powered by Excalidraw.',
      docs: [{ route: '/docs/excalidraw' }],
      // FIXME
      // examples: ['excalidraw-demo'],
    },
    files: [{ path: 'plate-ui/excalidraw-element.tsx', type: 'registry:ui' }],
    name: 'excalidraw-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A heading with multiple level support.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('heading-element') },
      ],
      examples: ['basic-elements-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/heading-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/heading-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'heading-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A text highlighter with customizable colors.',
      docs: [{ route: '/docs/highlight' }],
      examples: ['highlight-demo'],
    },
    files: [
      { path: 'plate-ui/highlight-leaf.tsx', type: 'registry:ui' },
      { path: 'plate-ui/highlight-leaf-static.tsx', type: 'registry:ui' },
    ],
    name: 'highlight-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A horizontal rule component with focus states.',
      docs: [
        { route: '/docs/horizontal-rule' },
        { route: siteConfig.links.plateProComponent('hr-element') },
      ],
      examples: ['horizontal-rule-demo'],
      title: 'Horizontal Rule Element',
    },
    files: [
      { path: 'plate-ui/hr-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/hr-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'hr-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', '@udecode/plate-resizable'],
    doc: {
      description:
        'Image element with lazy loading, resizing capabilities, and optional caption.',
      docs: [
        { route: '/docs/media' },
        { route: '/docs/api/resizable' },
        { route: siteConfig.links.plateProComponent('image-element') },
      ],
      examples: ['media-demo', 'media-toolbar-pro'],
    },
    files: [
      { path: 'plate-ui/image-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/image-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'image-element',
    registryDependencies: [
      'media-popover',
      'caption',
      'resizable',
      'plate-element',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media'],
    doc: {
      description: 'A modal component for previewing and manipulating images.',
      docs: [
        { route: '/docs/media' },
        { route: siteConfig.links.plateProComponent('image-preview') },
      ],
      examples: ['media-demo', 'media-toolbar-pro'],
    },
    files: [{ path: 'plate-ui/image-preview.tsx', type: 'registry:ui' }],
    name: 'image-preview',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-kbd'],
    doc: {
      description: 'A component for styling keyboard shortcuts.',
      docs: [{ route: '/docs/kbd', title: 'Keyboard Input' }],
      examples: ['kbd-demo'],
    },
    files: [
      { path: 'plate-ui/kbd-leaf.tsx', type: 'registry:ui' },
      { path: 'plate-ui/kbd-leaf-static.tsx', type: 'registry:ui' },
    ],
    name: 'kbd-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-link'],
    doc: {
      description: 'A component for rendering hyperlinks with hover states.',
      docs: [
        { route: '/docs/link' },
        { route: siteConfig.links.plateProComponent('link-element') },
      ],
      examples: ['link-demo'],
    },
    files: [
      { path: 'plate-ui/link-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/link-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'link-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-list'],
    doc: {
      description: 'A list element for ordered and unordered items.',
      docs: [{ route: '/docs/list' }],
      examples: ['list-demo'],
    },
    files: [{ path: 'plate-ui/list-element.tsx', type: 'registry:ui' }],
    name: 'list-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', '@udecode/plate-resizable'],
    doc: {
      description: 'An audio player component with caption support.',
      docs: [
        { route: '/docs/media' },
        { route: siteConfig.links.plateProComponent('media-audio-element') },
      ],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [
      { path: 'plate-ui/media-audio-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/media-audio-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'media-audio-element',
    registryDependencies: ['caption', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-media',
      '@udecode/plate-resizable',
      'react-tweet',
      'react-lite-youtube-embed',
    ],
    doc: {
      description:
        'A component for embedded media content with resizing and caption support.',
      docs: [
        { route: '/docs/media' },
        { route: '/docs/api/resizable' },
        { route: siteConfig.links.plateProComponent('media-embed-element') },
      ],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [{ path: 'plate-ui/media-embed-element.tsx', type: 'registry:ui' }],
    name: 'media-embed-element',
    registryDependencies: [
      'media-popover',
      'caption',
      'resizable',
      'plate-element',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', '@udecode/plate-resizable'],
    doc: {
      description:
        'A file attachment component with download capability and caption.',
      docs: [
        { route: '/docs/media' },
        { route: siteConfig.links.plateProComponent('media-file-element') },
      ],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [
      { path: 'plate-ui/media-file-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/media-file-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'media-file-element',
    registryDependencies: ['caption', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-media', 'use-file-picker'],
    doc: {
      description: 'A placeholder for media upload progress indication.',
      docs: [
        { route: '/docs/media' },
        {
          route: siteConfig.links.plateProComponent(
            'media-placeholder-element'
          ),
        },
      ],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [
      { path: 'plate-ui/media-placeholder-element.tsx', type: 'registry:ui' },
    ],
    name: 'media-placeholder-element',
    registryDependencies: ['plate-element', 'spinner', 'uploadthing'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-media',
      '@udecode/plate-resizable',
      'react-player',
      'react-lite-youtube-embed',
    ],
    doc: {
      description:
        'A video player component with YouTube and file upload support.',
      docs: [
        { route: '/docs/media' },
        { route: '/docs/api/resizable' },
        { route: siteConfig.links.plateProComponent('media-video-element') },
      ],
      examples: ['media-demo', 'upload-pro'],
    },
    files: [
      { path: 'plate-ui/media-video-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/media-video-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'media-video-element',
    registryDependencies: [
      'media-popover',
      'caption',
      'resizable',
      'plate-element',
    ],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-mention'],
    doc: {
      description: 'A mention element with customizable prefix and label.',
      docs: [
        { route: '/docs/mention' },
        { route: siteConfig.links.plateProComponent('mention-element') },
      ],
      examples: ['mention-demo'],
    },
    files: [
      { path: 'plate-ui/mention-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/mention-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'mention-element',
    registryDependencies: ['plate-element', 'use-mounted'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-mention'],
    doc: {
      description: 'An input component for user mentions with autocomplete.',
      docs: [
        { route: '/docs/mention' },
        { route: siteConfig.links.plateProComponent('mention-input-element') },
      ],
      examples: ['mention-demo'],
    },
    files: [
      { path: 'plate-ui/mention-input-element.tsx', type: 'registry:ui' },
    ],
    name: 'mention-input-element',
    registryDependencies: ['inline-combobox', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A paragraph block with background color support.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('paragraph-element') },
      ],
      examples: ['basic-elements-demo', 'basic-nodes-pro'],
    },
    files: [
      { path: 'plate-ui/paragraph-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/paragraph-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'paragraph-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A component that highlights search results in text.',
      // examples: ['find-replace-demo'],
      docs: [{ route: '/docs/highlight' }],
    },
    files: [
      { path: 'plate-ui/search-highlight-leaf.tsx', type: 'registry:ui' },
    ],
    name: 'search-highlight-leaf',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-ai',
      '@udecode/plate-block-quote',
      '@udecode/plate-code-block',
      '@udecode/plate-date',
      '@udecode/plate-heading',
      '@udecode/plate-indent-list',
      '@udecode/plate-table',
      '@udecode/plate-toggle',
    ],
    doc: {
      description: 'A command input component for inserting various elements.',
      docs: [
        { route: '/docs/slash-command', title: 'Slash' },
        { route: siteConfig.links.plateProComponent('slash-input-element') },
      ],
      examples: ['slash-command-demo', 'slash-menu-pro'],
      label: 'New',
    },
    files: [{ path: 'plate-ui/slash-input-element.tsx', type: 'registry:ui' }],
    name: 'slash-input-element',
    registryDependencies: ['inline-combobox', 'plate-element', 'transforms'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-table'],
    doc: {
      description: 'A table cell with resizable borders and selection.',
      docs: [
        { route: '/docs/table' },
        { route: siteConfig.links.plateProComponent('table-cell-element') },
      ],
      examples: ['table-demo'],
    },
    files: [
      { path: 'plate-ui/table-cell-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/table-cell-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'table-cell-element',
    registryDependencies: ['resizable', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [
      '@udecode/plate-table',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
    ],
    doc: {
      description:
        'A table component with floating toolbar and border customization.',
      docs: [
        { route: '/docs/table' },
        { route: siteConfig.links.plateProComponent('table-element') },
      ],
      examples: ['table-demo'],
    },
    files: [
      { path: 'plate-ui/table-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/table-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'table-element',
    registryDependencies: ['dropdown-menu', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A table row component with optional border hiding.',
      docs: [
        { route: '/docs/table' },
        { route: siteConfig.links.plateProComponent('table-row-element') },
      ],
      examples: ['table-demo'],
    },
    files: [
      { path: 'plate-ui/table-row-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/table-row-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'table-row-element',
    registryDependencies: ['plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description: 'A tag element component with selection states and styling.',
      docs: [
        { route: '/docs/multi-select' },
        // { route: siteConfig.links.plateProComponent('tag-element') },
      ],
      examples: [`select-editor-demo`],
    },
    files: [{ path: 'plate-ui/tag-element.tsx', type: 'registry:ui' }],
    name: 'tag-element',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-heading'],
    doc: {
      description:
        'A table of contents component with links to document headings.',
      docs: [
        { route: '/docs/basic-elements' },
        { route: siteConfig.links.plateProComponent('toc-element') },
      ],
      examples: ['toc-demo', 'toc-pro'],
      label: 'New',
      //       - Responsive design that adapts to different screen sizes
      // - Dynamic highlighting of the corresponding thumbnail on the right side based on the current section
      // - Hover thumbnail to see the preview of the section with smooth animation
      // - Elegant transition effects when navigating between sections
      // - Animated highlighting of the current section in the sidebar
      title: 'TOC Element',
    },
    files: [
      { path: 'plate-ui/toc-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/toc-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'toc-element',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-list'],
    doc: {
      description: 'A checkbox list element with interactive todo items.',
      docs: [{ route: '/docs/list' }],
      examples: ['list-demo'],
    },
    files: [{ path: 'plate-ui/todo-list-element.tsx', type: 'registry:ui' }],
    name: 'todo-list-element',
    registryDependencies: ['checkbox', 'plate-element'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@udecode/plate-toggle'],
    doc: {
      description: 'A collapsible component for toggling content visibility.',
      docs: [{ route: '/docs/toggle' }],
      examples: ['toggle-demo'],
    },
    files: [
      { path: 'plate-ui/toggle-element.tsx', type: 'registry:ui' },
      { path: 'plate-ui/toggle-element-static.tsx', type: 'registry:ui' },
    ],
    name: 'toggle-element',
    registryDependencies: ['button', 'plate-element'],
    type: 'registry:ui',
  },
];

export const uiPrimitives: Registry = [
  {
    dependencies: ['@radix-ui/react-alert-dialog'],
    doc: {
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/alert-dialog',
      },
    },
    files: [{ path: 'plate-ui/alert-dialog.tsx', type: 'registry:ui' }],
    name: 'alert-dialog',
    registryDependencies: ['button'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-avatar'],
    doc: {
      description:
        'An image element with a fallback for representing the user.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/avatar',
      },
    },
    files: [{ path: 'plate-ui/avatar.tsx', type: 'registry:ui' }],
    name: 'avatar',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-slot'],
    doc: {
      description: 'Displays a button or a component that looks like a button.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/button',
      },
    },
    files: [{ path: 'plate-ui/button.tsx', type: 'registry:ui' }],
    name: 'button',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['react-day-picker@8.10.1'],
    doc: {
      description:
        'A date field component that allows users to enter and edit date.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/calendar',
      },
    },
    files: [{ path: 'plate-ui/calendar.tsx', type: 'registry:ui' }],
    name: 'calendar',
    registryDependencies: ['button'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-checkbox'],
    doc: {
      description:
        'A control that allows the user to toggle between checked and not checked.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/checkbox',
      },
    },
    files: [
      { path: 'plate-ui/checkbox.tsx', type: 'registry:ui' },
      { path: 'plate-ui/checkbox-static.tsx', type: 'registry:ui' },
    ],
    name: 'checkbox',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-dialog', '@udecode/cmdk'],
    doc: {
      description: 'Fast, composable, unstyled command menu for React.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/command',
      },
    },
    files: [{ path: 'plate-ui/command.tsx', type: 'registry:ui' }],
    name: 'command',
    registryDependencies: ['dialog', 'input'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-context-menu'],
    doc: {
      description:
        'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/context-menu',
      },
    },
    files: [{ path: 'plate-ui/context-menu.tsx', type: 'registry:ui' }],
    name: 'context-menu',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-dialog'],
    doc: {
      description:
        'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/dialog',
      },
    },
    files: [{ path: 'plate-ui/dialog.tsx', type: 'registry:ui' }],
    name: 'dialog',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-dropdown-menu'],
    doc: {
      description:
        'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/dropdown-menu',
      },
    },
    files: [{ path: 'plate-ui/dropdown-menu.tsx', type: 'registry:ui' }],
    name: 'dropdown-menu',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: [
      'react-hook-form',
      'zod',
      '@hookform/resolvers',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
    ],
    doc: {
      description: 'Building forms with React Hook Form and Zod.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/form',
      },
    },
    files: [{ path: 'plate-ui/form.tsx', type: 'registry:ui' }],
    name: 'form',
    registryDependencies: ['label'],
    type: 'registry:ui',
  },
  {
    dependencies: [],
    doc: {
      description:
        'Displays a form input field or a component that looks like an input field.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/input',
      },
    },
    files: [{ path: 'plate-ui/input.tsx', type: 'registry:ui' }],
    name: 'input',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-label'],
    doc: {
      description: 'Renders an accessible label associated with controls.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/label',
      },
    },
    files: [{ path: 'plate-ui/label.tsx', type: 'registry:ui' }],
    name: 'label',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-popover'],
    doc: {
      description: 'Displays rich content in a portal, triggered by a button.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/popover',
      },
    },
    files: [{ path: 'plate-ui/popover.tsx', type: 'registry:ui' }],
    name: 'popover',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-separator'],
    doc: {
      description: 'Visually or semantically separates content.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/separator',
      },
    },
    files: [{ path: 'plate-ui/separator.tsx', type: 'registry:ui' }],
    name: 'separator',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-toolbar'],
    doc: {
      description:
        'A customizable toolbar component with various button styles and group',
    },
    files: [{ path: 'plate-ui/toolbar.tsx', type: 'registry:ui' }],
    name: 'toolbar',
    registryDependencies: ['tooltip', 'separator'],
    type: 'registry:ui',
  },
  {
    dependencies: ['@radix-ui/react-tooltip'],
    doc: {
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      links: {
        doc: 'https://ui.shadcn.com/docs/components/tooltip',
      },
    },
    files: [{ path: 'plate-ui/tooltip.tsx', type: 'registry:ui' }],
    name: 'tooltip',
    registryDependencies: [],
    type: 'registry:ui',
  },
  {
    doc: {
      description: 'A loading spinner component with size variants.',
    },
    files: [{ path: 'plate-ui/spinner.tsx', type: 'registry:ui' }],
    name: 'spinner',
    registryDependencies: [],
    type: 'registry:ui',
  },
];

export const ui: Registry = [...uiNodes, ...uiPrimitives, ...uiComponents];