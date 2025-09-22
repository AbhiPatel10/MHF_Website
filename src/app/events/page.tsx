import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { eventsData } from '@/lib/events';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AllEventsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Our Events
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join us in our mission to create a better world. Here are our upcoming events where you can get involved and make a difference.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event) => (
              <Card key={event.slug} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
