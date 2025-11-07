"use client";

import type { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import { Twitter, Facebook, Instagram, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletterApi } from "@/services/newsletter.service";
import { useToast } from "@/hooks/use-toast"; // ✅ shadcn toast

const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/people/Mission-Hope/100066634966106" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/mission_hope_foundation/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/mission-hope-foundation-a98938312/" },
];

export const Footer: FC = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast(); // ✅ useToast hook

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Email required",
                description: "Please enter a valid email address.",
                duration: 3000,
            });
            return;
        }

        try {
            setLoading(true);
            const res = await subscribeNewsletterApi(email);

            toast({
                title: "Subscribed!",
                description: res.message || "You’ve successfully subscribed to our newsletter.",
                duration: 4000,
            });

            setEmail("");
        } catch (error) {
            console.error("Newsletter subscribe error:", error);
            toast({
                title: "Something went wrong",
                description: "Unable to subscribe. Please try again later.",
                duration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer id="contact" className="bg-secondary/50 border-t">
            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Logo Section */}
                    <div className="lg:col-span-4">
                        <div className="navbar-header order-0 m-auto" style={{ flex: "0 0 auto" }}>
                            <Link className="navbar-brand" href="/">
                                <img src="/logos/logo.png" alt="logo" width={100} height={100} />
                            </Link>
                        </div>
                        <p className="text-muted-foreground mt-4 max-w-xs">
                            A ray of hope for the needy.
                        </p>
                        <div className="flex items-center gap-2 mt-6">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.name}
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="text-muted-foreground hover:text-primary hover:bg-background rounded-full bg-background border-2"
                                >
                                    <Link
                                        href={social.href}
                                        aria-label={social.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-semibold font-headline text-lg text-foreground">Quick Links</h4>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
                            <li><Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors">Blogs</Link></li>
                            <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/donation" className="text-muted-foreground hover:text-primary transition-colors">Donate</Link></li>
                        </ul>
                    </div>

                    {/* Get Involved */}
                    <div className="lg:col-span-2">
                        <h4 className="font-semibold font-headline text-lg text-foreground">Get Involved</h4>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">Volunteer</Link></li>
                            <li><Link href="/donation" className="text-muted-foreground hover:text-primary transition-colors">Donate</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="lg:col-span-4">
                        <h4 className="font-semibold font-headline text-lg text-foreground">
                            Subscribe to our Newsletter
                        </h4>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Stay up to date with our latest news and initiatives.
                        </p>
                        <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-background"
                                required
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1.5">
                        Made with <Heart className="w-4 h-4 text-red-500" /> by Mission Hope Foundation &copy; {currentYear}.
                    </p>
                    <div className="mt-4 space-x-4">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <span>&middot;</span>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
