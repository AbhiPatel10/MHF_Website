import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';

const eventsData = [
  {
    tag: "Fundraising",
    title: 'Annual Charity Gala',
    description: 'Join us for a night of elegance and philanthropy to support our ongoing projects. Enjoy dinner, entertainment, and a silent auction.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop',
    aiHint: 'charity gala dinner',
    date: 'December 15, 2024',
    location: 'Grand Ballroom, City Center'
  },
  {
    tag: "Health",
    title: 'Community Health Camp',
    description: 'Free health check-ups, consultations, and medicine distribution for underprivileged families in the community.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    aiHint: 'medical camp health',
    date: 'November 5, 2024',
    location: 'Community Hall, Delhi'
  },
  {
    tag: "Education",
    title: 'Educational Workshop for Children',
    description: 'An interactive workshop focused on creative learning, storytelling, and fun educational activities for children aged 6-12.',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop',
    aiHint: 'children workshop classroom',
    date: 'October 20, 2024',
    location: 'Mission Hope Center'
  },
  {
    tag: "Environment",
    title: 'Tree Plantation Drive',
    description: 'Be a part of our green initiative to plant over 1,000 saplings across the city. Let\'s make our world a greener place together.',
    image: 'https://images.unsplash.com/photo-1618475932210-73c88c7a9501?q=80&w=1920&auto=format&fit=crop',
    aiHint: 'tree plantation environment',
    date: 'September 30, 2024',
    location: 'City Park, Delhi NCR'
  },
];

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
          {eventsData.map((event) => (
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
                    <Link href="#">View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
