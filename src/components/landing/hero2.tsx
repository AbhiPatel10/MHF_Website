"use client";

import * as React from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export const Hero2: FC = () => {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = React.useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background text-foreground"
    >
      {/* Subtle glowing gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,99,132,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_60%)]" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/grid.svg')] bg-center bg-repeat" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center px-4 sm:px-6 md:px-12 z-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 sm:space-y-6">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Empower Lives <br />
            Build a{" "}
            <span className="bg-gradient-to-r from-primary via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Better Tomorrow
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-xl">
            We’re on a mission to create lasting impact through education,
            health, and empowerment — one step, one smile at a time.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Donate Button */}
            <Button
              size="lg"
              asChild
              className="rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-pink-500 text-white hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 group"
            >
              <Link href="/donation">
                Donate Now
                <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* ✅ Replaced “Learn More” with Volunteer Modal Button */}
            <Button variant="outline" className="ml-2 rounded-full">
              <Link href="/volunteer">
                Join us as Volunteer
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[520px] lg:h-[560px] max-w-md sm:max-w-lg md:max-w-xl mx-auto group">
          <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-primary/30 via-pink-400/20 to-transparent blur-3xl rounded-[2.5rem] sm:rounded-[4rem] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl">
            <Image
              src="/Images/heroSectionImg.jpg"
              alt="Children smiling"
              fill
              priority
              className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 flex flex-col items-center text-center text-muted-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 animate-bounce">
        <span>Scroll Down</span>
        <div className="w-[1px] sm:w-[2px] h-6 sm:h-8 bg-primary/40 rounded-full" />
      </div>
    </section>
  );
};
