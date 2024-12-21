'use client';

import { AspectRatio } from './ui/aspect-ratio';

export function PromoVideo() {
  return (
    <AspectRatio
      className="overflow-hidden rounded-lg border bg-white shadow"
      ratio={16 / 9}
    >
      <video autoPlay muted playsInline>
        <source
          src="https://ui-shadcn.s3.amazonaws.com/ui-promo-hd.mp4"
          type="video/mp4"
        />
      </video>
    </AspectRatio>
  );
}
