import React, { useRef, useEffect, useState } from 'react';

interface PixelatedTextProps {
  text: string;
  fontSize?: number;
  pixelSize?: number;
  textColor?: string;
}

const PixelatedText: React.FC<PixelatedTextProps> = ({
  text,
  fontSize = 30,
  pixelSize = 4,
  textColor = 'white',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parentWidth = canvas.parentElement?.clientWidth || 300;
      const parentHeight = Math.max(canvas.parentElement?.clientHeight || 100, 100);

      if (parentWidth !== canvasSize.width || parentHeight !== canvasSize.height) {
        setCanvasSize({ width: parentWidth, height: parentHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = textColor;
    ctx.fillText(text, 10, fontSize);

    const imageData = ctx.getImageData(0, 0, canvasSize.width, canvasSize.height);
    const data = imageData.data;

    for (let y = 0; y < canvasSize.height; y += pixelSize) {
      for (let x = 0; x < canvasSize.width; x += pixelSize) {
        const index = y * canvasSize.width * 4 + x * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        for (let py = 0; py < pixelSize; py++) {
          for (let px = 0; px < pixelSize; px++) {
            const blockIndex = (y + py) * canvasSize.width * 4 + (x + px) * 4;
            if (blockIndex < data.length) {
              data[blockIndex] = r;
              data[blockIndex + 1] = g;
              data[blockIndex + 2] = b;
              data[blockIndex + 3] = a;
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [text, fontSize, pixelSize, textColor, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PixelatedText;