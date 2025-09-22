

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { teamData } from '@/lib/team';

export const Volunteers: FC = () => {
  return (
    <section id="volunteers" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Meet Our Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The heart of our organization is our dedicated team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamData.slice(0, 4).map((volunteer) => (
            <Card key={volunteer.name} className="text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center bg-card border shadow-lg">
              <CardHeader className="items-center p-8">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                  <AvatarImage src={volunteer.image} alt={volunteer.name} data-ai-hint={volunteer.aiHint} />
                  <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{volunteer.name}</CardTitle>
                <CardDescription className="text-sm text-primary font-medium">{volunteer.role}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow flex flex-col justify-end">
                 <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                        <Link href={volunteer.social.twitter}><Twitter className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                        <Link href={volunteer.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                    </Button>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-background/50">
                <Link href="/team">
                    View All Members <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
