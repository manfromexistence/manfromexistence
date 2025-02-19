import { Suspense } from 'react';

import type { Metadata } from 'next';

import { EditorDescription } from './editor-description';

// SYNC

export const metadata: Metadata = {
  description:
    'Beautifully designed. Copy and paste into your apps. Open Source.',
  title: 'Building Editors.',
};

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative container">
      <Suspense fallback={null}>
        <EditorDescription />
      </Suspense>
      <section id="blocks" className="scroll-mt-24">
        {children}
      </section>
    </div>
  );
}
