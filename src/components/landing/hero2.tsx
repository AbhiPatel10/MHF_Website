import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

export const Hero2: FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 flex-grow z-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start text-left">
          <h1
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            Give a Hand <br />
            to Make a <span className="text-primary">Better World</span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            We are a non-governmental organization (NGO) dedicated to improving the lives of the
            needy through initiatives in education, healthcare, and livelihood.
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 py-7 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 group"
            >
              <Link href="/donate">
                Donate Now
                <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-10 py-7 text-lg font-semibold border-2 bg-background hover:bg-accent transition-colors shadow-sm"
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className="relative w-full h-[350px] md:h-[500px] lg:h-[550px] max-w-xl mx-auto animate-fade-in animate-delay-[200ms]"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-[4rem] blur-3xl" />
          <div className="relative w-full h-full">
            <Image
              src="/Images/heroSectionImg.jpg"
              alt="Children smiling"
              fill
              priority
              className="object-cover rounded-[4rem] shadow-2xl"
              data-ai-hint="children smiling"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
