
"use client";

import { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { VolunteerForm } from '../team/volunteer-form';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact Us" },
];

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 shadow-lg backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          {/* <Sprout className="h-7 w-7 text-primary" />
          <span className='font-headline tracking-tighter'>Mission Hope</span> */}
          <div className="navbar-header order-0" style={{ flex: '0 0 auto' }}>
            <Link className="navbar-brand" href="/">
              <img src="/logos/logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button key={link.href} variant={isActive ? "default" : "ghost"} asChild>
                <Link href={link.href} className="text-sm font-medium">
                  {link.label}
                </Link>
              </Button>
            )
          })}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-2 rounded-full">Apply as Volunteer</Button>
            </DialogTrigger>
            <DialogContent>
              <VolunteerForm />
            </DialogContent>
          </Dialog>
          <Button asChild className="ml-4 rounded-full shadow-lg shadow-primary/30 transform transition-transform hover:scale-105">
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-2 font-bold text-2xl" onClick={closeMobileMenu}>
                    <Sprout className="h-8 w-8 text-primary" />
                    <span className='font-headline tracking-tighter'>Mission Hope</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="flex-grow flex flex-col gap-2 p-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-secondary" onClick={closeMobileMenu}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className='p-4 border-t'>
                  <Button asChild size="lg" className="w-full rounded-full shadow-lg shadow-primary/20">
                    <Link href="/donate" onClick={closeMobileMenu}>Donate</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
