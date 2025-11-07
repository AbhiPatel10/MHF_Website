
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop',
    alt: 'Happy children receiving help',
    aiHint: 'happy children',
  },
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    alt: 'Volunteer teaching a child',
    aiHint: 'volunteer teaching',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    alt: 'Food distribution event',
    aiHint: 'food distribution',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    alt: 'Medical checkup for community',
    aiHint: 'medical checkup',
  },
];


export const Hero3: FC = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-4">
          <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" data-ai-hint={images[0].aiHint} />
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Image src={images[1].src} alt={images[1].alt} fill className="object-cover" data-ai-hint={images[1].aiHint} />
          </div>
          <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Image src={images[2].src} alt={images[2].alt} fill className="object-cover" data-ai-hint={images[2].aiHint} />
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Image src={images[3].src} alt={images[3].alt} fill className="object-cover" data-ai-hint={images[3].aiHint} />
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center px-4 flex-grow z-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Give a Hand <br />
            to Make a <span className="text-primary">Better World</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            We are a non-governmental organization (NGO) dedicated to improving the lives of the needy through initiatives in education, healthcare, and livelihood.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild className="rounded-full px-10 py-7 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 group">
              <Link href="/donation">
                Donate Now
                <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-10 py-7 text-lg font-semibold border-2 bg-background hover:bg-accent transition-colors shadow-sm">
              <Link href="#about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
