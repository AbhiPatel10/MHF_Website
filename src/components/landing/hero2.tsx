"use client";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export const Hero2: FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background text-foreground"
    >
      {/* Subtle glowing gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,99,132,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_60%)]" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/grid.svg')] bg-center bg-repeat" />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6 md:px-12 z-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start text-left space-y-6">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Empower Lives <br />
            Build a{" "}
            <span className="bg-gradient-to-r from-primary via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Better Tomorrow
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            We’re on a mission to create lasting impact through education,
            health, and empowerment — one step, one smile at a time.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-pink-500 text-white hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 group"
            >
              <Link href="/donate">
                Donate Now
                <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-10 py-7 text-lg font-semibold border-2 hover:bg-accent/40 backdrop-blur-sm transition-all shadow-sm"
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full h-[380px] md:h-[520px] lg:h-[560px] max-w-xl mx-auto group">
          {/* Soft glowing background */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-pink-400/20 to-transparent blur-3xl rounded-[4rem] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-full h-full overflow-hidden rounded-[4rem] shadow-2xl">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm flex flex-col items-center space-y-2 animate-bounce">
        <span>Scroll Down</span>
        <div className="w-[2px] h-8 bg-primary/40 rounded-full" />
      </div>
    </section>
  );
};
