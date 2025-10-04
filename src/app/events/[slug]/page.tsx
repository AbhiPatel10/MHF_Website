import { notFound } from "next/navigation";
import { eventsData } from "@/lib/events";
import Image from "next/image";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Directly await params
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                  {event.title}
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  {event.longDescription}
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="sticky top-28 bg-card p-8 rounded-3xl shadow-xl border">
                <h2 className="text-2xl font-bold font-headline mb-6">
                  Event Details
                </h2>
                <div className="space-y-5 text-lg">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Tag className="w-6 h-6 text-primary" />
                    <Badge variant="secondary" className="text-base">
                      {event.tag}
                    </Badge>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-bold font-headline mb-4">
                    Join Us
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Be a part of this event and help us make a difference. Your
                    participation is valuable.
                  </p>
                  <Button size="lg" className="w-full text-lg">
                    Register for Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
