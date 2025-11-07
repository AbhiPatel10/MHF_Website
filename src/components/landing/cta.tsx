
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export const Cta: FC = () => {
  return (
    <section id="donate" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="relative bg-primary text-primary-foreground rounded-3xl shadow-2xl p-8 md:p-20 text-center max-w-5xl mx-auto overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -right-10 w-64 h-64 bg-white/10 rounded-full" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-6xl">
              Join Us in Making a Difference
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80">
              Your generous contribution can change lives. Every donation, big or small, helps us continue our mission and reach more people in need.
            </p>
            <div className="mt-12">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-7 transform transition-transform duration-300 hover:scale-105 rounded-full bg-background text-primary hover:bg-white/90 group font-bold shadow-lg">
                <Link href="/donation" className='flex items-center'>
                  Donate Now
                  <MoveRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
