'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SafeImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
  width,
  height,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback gradient background
  const fallbackGradient = 'linear-gradient(135deg, #1A5F7A 0%, #159895 100%)';

  if (error) {
    // Show fallback with gradient and alt text
    return (
      <div
        className={`${className} flex items-center justify-center text-white font-semibold text-center p-4`}
        style={{
          background: fallbackGradient,
        }}
      >
        <div className="max-w-[80%]">
          <div className="text-sm opacity-75 mb-2">Light Gauge Steel Construction</div>
          <div className="text-xs opacity-60 line-clamp-2">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          className={`${className} absolute inset-0 animate-pulse`}
          style={{
            background: fallbackGradient,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={className}
        width={width}
        height={height}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
        unoptimized={true} // Skip Next.js optimization for external images to avoid timeouts
      />
    </>
  );
}
