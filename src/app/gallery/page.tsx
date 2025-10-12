
"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { ImageLightbox } from '@/components/gallery/image-lightbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GalleryImage, getAllGalleryImagesApi } from '@/services/galleryService';
import { ImageCardSkeleton } from '../skeletons/image-card-skeleton';

export default function GalleryPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<GalleryImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const res = await getAllGalleryImagesApi(offset, limit);
      if (res.status === 200) {
        setGalleryImages((prev) => [...prev, ...res.data.galleryImages]);
        setTotalCount(res.data.totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const openLightbox = (
    index: number,
    gallery: GalleryImage[]
  ) => {
    setCurrentImageIndex(index);
    setActiveGallery(gallery);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Gallery
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A glimpse into the moments that define our mission and the impact
              we've made.
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mt-20">
            {loading && galleryImages.length === 0 ? (
              // 🔹 Initial skeleton grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: limit }).map((_, index) => (
                  <ImageCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : galleryImages.length === 0 ? (
              // 🔹 No images found
              <p className="text-center text-muted-foreground">
                No images found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <Card
                    key={image._id}
                    className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 relative cursor-pointer"
                    onClick={() => openLightbox(index, galleryImages)}
                  >
                    <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                      <Image
                        src={image.image.url}
                        alt={image.altText || "Gallery image"}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <Camera className="w-8 h-8 text-white mb-2" />
                        <p className="text-white font-semibold">
                          {image.altText}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {galleryImages.length < totalCount && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={() => setOffset((prev) => prev + limit)}
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </div>

          {/* Awards Section */}
          {/* <div className="mt-24">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Certificates &amp; Awards
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We are honored to be recognized for our dedication and impact.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {awardsData.map((award, index) => (
                <Card
                  key={index}
                  className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 flex flex-col md:flex-row shadow-lg"
                >
                  <div
                    className="md:w-1/2 w-full aspect-video md:aspect-auto relative cursor-pointer"
                    onClick={() => openLightbox(index, awardsData)}
                  >
                    <Image
                      src={award.src}
                      alt={award.alt}
                      fill
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105 p-4"
                    />
                  </div>
                  <div className="md:w-1/2 w-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">
                        {award.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Issued by{" "}
                        <span className="font-semibold text-primary">
                          {award.issuer}
                        </span>
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">
                        {award.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{award.date}</span>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div> */}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          images={activeGallery.map((item) => ({ src: item?.image.url, alt: item.altText || 'Gallery image' }))}
          startIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}