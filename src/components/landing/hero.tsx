
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight, Star, Users, ShieldCheck } from 'lucide-react';

export const Hero: FC = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 container mx-auto flex flex-col items-center text-center px-4 flex-grow justify-center">
        <div className="max-w-4xl">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Give a Hand <br />
            to Make a <span className="text-primary">Better World</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a non-governmental organization (NGO) dedicated to improving the lives of the needy through initiatives in education, healthcare, and livelihood.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
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

      <div className="relative z-10 container mx-auto pb-12 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Community Focused</h3>
              <p className="text-muted-foreground text-sm mt-1">Dedicated to empowering local communities through direct support.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Transparent Operations</h3>
              <p className="text-muted-foreground text-sm mt-1">Ensuring every donation is accounted for and makes a real impact.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Trusted by Donors</h3>
              <p className="text-muted-foreground text-sm mt-1">Join thousands of supporters who believe in our mission.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
