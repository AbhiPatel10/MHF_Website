"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventByIdApi, TEvent } from "@/services/events.service";
import { renderEditorHTML } from "@/utils/editorTextRenderer";
import { EventDetailsSkeleton } from "@/app/skeletons/event-details-skeleton";

export default function EventDetailsPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<TEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await getEventByIdApi(params.slug);
        if (res.status === 200 && res.data) {
          setEvent(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.slug]);

  if (loading) {
    return <>
      <Header />
      <EventDetailsSkeleton />;
      <Footer />

    </>
  }

  if (error || !event) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Section: Image + Description */}
            <div className="lg:col-span-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                {event?.image?.url && (
                  <Image
                    src={event.image.url}
                    alt={event.image.altText || event.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="mt-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                  {event.name}
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  <div
                    className="text-muted-foreground line-clamp-3 prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: renderEditorHTML(event.description),
                    }}
                  />
                </p>
              </div>
            </div>

            {/* Right Section: Details */}
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
                      {event.createdAt}
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
                      {event.category}
                    </Badge>
                  </div>
                </div>
                {/* <div className="mt-8 pt-8 border-t">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
