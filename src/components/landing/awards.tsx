import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Medal, Star } from 'lucide-react';
import { Button } from '../ui/button';

const awardsData = [
  {
    icon: Award,
    title: 'Humanitarian Award 2023',
    issuer: 'Global Charity Org',
    description: "For outstanding contribution to community health programs.",
  },
  {
    icon: Medal,
    title: 'Community Impact Prize',
    issuer: 'National Philanthropy',
    description: "Recognizing our sustainable livelihood projects.",
  },
  {
    icon: Star,
    title: 'Excellence in Service',
    issuer: 'Volunteer Action Group',
    description: "Honoring our dedicated volunteer network.",
  },
];

export const Awards: FC = () => {
  return (
    <section id="awards" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Recognition & Awards
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We are honored to be recognized for our dedication and impact.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {awardsData.map((award) => (
            <Card key={award.title} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 flex flex-col items-center text-center p-8 bg-card shadow-lg">
              <div className="p-5 rounded-full bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
                <award.icon className="w-12 h-12" />
              </div>
              <CardContent className="p-0">
                <h3 className="text-xl font-bold font-headline mb-2">{award.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">Issued by <span className="font-semibold text-foreground">{award.issuer}</span></p>
                <p className="text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
