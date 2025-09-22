
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { galleryImages } from '@/data/gallery';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import { ImageLightbox } from '../gallery/image-lightbox';

export const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const displayedImages = galleryImages.slice(0, 6);

  return (
    <section id="gallery" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Our Work in Pictures
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into the moments that define our mission and impact.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {displayedImages.map((image, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card 
                    className="overflow-hidden rounded-2xl group border-2 shadow-lg relative cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                       <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={image.aiHint}
                      />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <Camera className="w-8 h-8 text-white mb-2" />
                        <p className="text-white font-semibold">{image.alt}</p>
                    </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
         <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-background/50">
                <Link href="/gallery">
                    View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
      {isLightboxOpen && (
        <ImageLightbox
          images={displayedImages}
          startIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};
