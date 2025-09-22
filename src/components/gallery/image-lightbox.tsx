
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}

export function ImageLightbox({ images, startIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isLoading, setIsLoading] = useState(true);

  const goToPrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        
        <div className="relative max-w-screen-lg max-h-[90vh] w-full aspect-video flex items-center justify-center">
           <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isLoading ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          </div>

          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className={cn(
              "object-contain transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          />
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-lg px-6 py-2 rounded-full">
            <p>{currentImage.alt}</p>
        </div>

      </div>
    </div>
  );
}
