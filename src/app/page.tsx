import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { Mission } from '@/components/landing/mission';
import { Events } from '@/components/landing/events';
import { Volunteers } from '@/components/landing/volunteers';
import { Gallery } from '@/components/landing/gallery';
import { Partners } from '@/components/landing/partners';
import { Awards } from '@/components/landing/awards';
import { Cta } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { President } from '@/components/landing/president';
import { Blogs } from '@/components/landing/blogs';
import { Highlights } from '@/components/landing/highlights';
import { Hero2 } from '@/components/landing/hero2';
import { Hero3 } from '@/components/landing/hero3';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        {/* <Hero /> */}
        <Hero2 />
        <Partners />
        <About />
        <Mission />
        <Events />
        <Volunteers />
        <President />
        <Highlights />
        <Blogs />
        <Gallery />
        <Awards />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
