
"use client";

import { FC, useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Users, Eye, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Heart,
    title: 'Our Mission',
    description: 'To bring a ray of hope into the lives of the needy by providing them with education, healthcare, and livelihood opportunities.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To create a society where every individual has the opportunity to live a healthy, educated, and dignified life.',
  },
  {
    icon: Users,
    title: 'Our Objective',
    description: 'To empower underprivileged communities, especially children and women, through sustainable development initiatives.',
  },
  {
    icon: Lightbulb,
    title: 'Our Values',
    description: 'We are guided by compassion, integrity, transparency, and a commitment to making a lasting impact.',
  },
];

export const Mission: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

  return (
    <section id="mission" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Our Purpose
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Guided by our core principles, we are dedicated to creating a better world for everyone.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className={cn(
                "text-left transition-all duration-700 ease-out transform hover:-translate-y-2 hover:shadow-2xl",
                "border shadow-lg",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="p-8">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
