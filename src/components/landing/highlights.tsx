
import type { FC } from 'react';

export const Highlights: FC = () => {
  return (
    <section id="highlights" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Our Highlights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A quick look at our journey and the impact we're making.
          </p>
        </div>
        <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/gCNEnKbOMjA?autoplay=1&mute=1&loop=1&playlist=gCNEnKbOMjA&controls=0&modestbranding=1&showinfo=0&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
