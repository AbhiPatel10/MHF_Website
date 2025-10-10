"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllEventsApi, TEvent } from "@/services/events.service";
import EventCardSkeleton from "../skeletons/eventCardSkeleton";
import { renderEditorHTML } from "@/utils/editorTextRenderer";

export default function AllEventsPage() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /** Fetch events */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getAllEventsApi({ offset, limit, search: "" });
      if (res.status === 200) {
        if (offset === 0) {
          setEvents(res.data.events);
        } else {
          setEvents((prev) => [...prev, ...res.data.events]);
        }
        setTotalCount(res.data.totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [offset]);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Our Events
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join us in our mission to create a better world. Here are our upcoming events where you can get involved and make a difference.
            </p>
          </div>

          {/* Event Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && events?.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
            ) : (
              events?.map((event) => (
                <Card
                  key={event._id}
                  className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={event.image?.url || "/events/placeholder.webp"}
                      alt={event.image?.altText || event.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-8 flex-grow">
                    <Badge variant="secondary" className="mb-4">Event</Badge>
                    <h3 className="text-2xl font-bold font-headline mb-3">{event.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-3">
                      <div
                        className="text-muted-foreground line-clamp-3 prose prose-sm"
                        dangerouslySetInnerHTML={{
                          __html: renderEditorHTML(event.description, 180),
                        }}
                      />
                    </p>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button
                      variant="link"
                      asChild
                      className="p-0 h-auto text-primary font-semibold"
                    >
                      <Link href={`/events/${event._id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          {/* Load More */}
          {events.length < totalCount && (
            <div className="flex justify-center mt-12">
              <Button onClick={() => setOffset((prev) => prev + limit)} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && events.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              No events available right now.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
