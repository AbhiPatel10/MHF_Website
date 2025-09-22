
import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { eventsData } from '@/lib/events';

export const Events: FC = () => {
  return (
    <section id="events" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Join Our Events
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get involved and make a difference by participating in our upcoming events.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {eventsData.slice(0, 2).map((event) => (
            <Card key={event.title} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={event.aiHint}
                />
              </div>
              <CardContent className="p-8 flex-grow">
                 <Badge variant="secondary" className="mb-4">{event.tag}</Badge>
                <h3 className="text-2xl font-bold font-headline mb-3">{event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-6 mb-4">
                    <div className='flex items-center gap-2'>
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                    </div>
                </div>
                <p className="text-muted-foreground line-clamp-3">{event.description}</p>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                  <Button variant="link" asChild className="p-0 h-auto text-primary font-semibold">
                    <Link href={`/events/${event.slug}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-background/50">
                <Link href="/events">
                    View All Events <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
