/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";

interface ImageWithLoadingProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export function ImageWithLoading({
  src,
  alt,
  className,
  fallback = <div className="animate-pulse bg-gray-200 w-full h-full" />,
  ...props
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && !error && fallback}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading || error ? "hidden" : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
