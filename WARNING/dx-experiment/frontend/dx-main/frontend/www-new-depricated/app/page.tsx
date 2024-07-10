"use client"
import { ColorPicker } from '#/ui/react/aa/src/components/index'
import { useState } from 'react';

export default function Home() {
  const [color, setColor] = useState('rgba(255,255,255,1)');

  return (
    <div>

      <ColorPicker value={color} onChange={setColor} />

    </div>
  );
}
