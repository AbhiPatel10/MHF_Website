
import type { FC } from 'react';
import Image from 'next/image';
import { BatteryPlus, HeartPulse, BookA, Trees } from 'lucide-react';
import { AnimatedCounter } from './animated-counter';

const stats = [
  { icon: Trees, value: 10000, label: "Trees Planted", symbol: "+" },
  { icon: HeartPulse, value: 500, label: "Blood Units Collected", symbol: "+" },
  { icon: BookA, value: 20000, label: "Students Aware", symbol: "+" },
  { icon: BatteryPlus, value: 30, label: "Health Campus Program Conducted", symbol: "+" },
];

export const About: FC = () => {
  return (
    <section id="about" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:max-w-none md:mx-0">
             <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
                alt="Helping hands"
                fill
                className="rounded-3xl object-cover shadow-2xl"
                data-ai-hint="helping hands"
              />
               <div className="absolute -bottom-8 -right-8 bg-background text-foreground p-8 rounded-3xl shadow-lg w-fit border-4 border-primary/20">
                <div className="text-6xl font-extrabold font-headline text-primary">
                  <AnimatedCounter targetValue={650} />+
                </div>
                <div className="text-lg font-medium tracking-wide">Volunteers</div>
              </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Welcome to Mission Hope Foundation
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mission Hope Foundation is a Gujarat-based NGO founded in 2019. With over 650 dedicated volunteers across various cities, we are committed to spreading happiness and improving lives through impactful activities and initiatives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {stats.slice(0,4).map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 p-5 rounded-2xl bg-background/80 shadow-sm border">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      <AnimatedCounter targetValue={stat.value} />
                      {stat.symbol}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
