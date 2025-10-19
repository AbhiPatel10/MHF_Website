
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Cta } from '@/components/landing/cta';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/landing/animated-counter';
import { Users, HandCoins, GraduationCap, Stethoscope, Eye, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { president, teamData, vicePresident } from '@/lib/team';

const stats = [
    { icon: GraduationCap, value: 10000, label: "Trees Planted", symbol: "+" },
    { icon: Stethoscope, value: 500, label: "Blood Units Collected", symbol: "+" },
    { icon: HandCoins, value: 20000, label: "Students Aware", symbol: "+" },
    { icon: Users, value: 650, label: "Volunteers", symbol: "+" },
];

export default function AboutPage() {
    const founder = teamData.find(member => member.role.toLowerCase().includes('founder'));

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="pt-32 pb-20 lg:pt-48 lg:pb-28 bg-secondary/20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl font-headline">
                            A Ray of Hope for the Needy
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
                            Mission Hope Foundation is a non-governmental organization dedicated to creating lasting change in the lives of the underprivileged through education, healthcare, and livelihood support.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <div className="relative aspect-square max-w-md mx-auto md:max-w-none md:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Our Story"
                                    fill
                                    className="object-cover"
                                    data-ai-hint="volunteer teaching child"
                                />
                            </div>
                            <div>
                                <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                    Our Story
                                </h2>
                                <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                                    Mission Hope Foundation is a Gujarat-based NGO founded in 2019. With over 650 dedicated volunteers across various cities, we are committed to spreading happiness and improving lives through impactful activities and initiatives.
                                </p>
                                {/* <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                    Over the years, we have expanded our focus to address the root causes of poverty and inequality. Our journey has been one of collaboration, perseverance, and an unwavering commitment to our mission.
                                </p> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission / Vision Section */}
                <section className="py-24 sm:py-32 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="text-center md:text-left">
                                <Heart className="w-12 h-12 text-primary mx-auto md:mx-0 mb-4" />
                                <h2 className="font-headline text-4xl font-bold mb-4">Our Mission</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">To bring a ray of hope into the lives of the needy by providing them with education, healthcare, and livelihood opportunities.</p>
                            </div>
                            <div className="text-center md:text-left">
                                <Eye className="w-12 h-12 text-primary mx-auto md:mx-0 mb-4" />
                                <h2 className="font-headline text-4xl font-bold mb-4">Our Vision</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">To create a society where every individual has the opportunity to live a healthy, educated, and dignified life.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Impact Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                                Our Impact in Numbers
                            </h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                                We measure our success by the lives we touch and the communities we empower.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {stats.map((stat) => (
                                <Card key={stat.label} className="flex flex-col items-center justify-center p-8 text-center bg-secondary/20 border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                                        <stat.icon className="w-10 h-10" />
                                    </div>
                                    <div className="text-4xl font-bold font-headline text-primary">
                                        <AnimatedCounter targetValue={stat.value} />
                                        {stat.symbol}
                                    </div>
                                    <p className="text-md text-muted-foreground mt-2">{stat.label}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <div className='container'>
                    {/* Meet the Founder */}
                    {president && (
                        <div className="mt-20">
                            <Card className="grid md:grid-cols-4 gap-8 p-8 border-0 shadow-none">
                                <div className="md:col-span-1 relative aspect-[4/5]">
                                    <Image
                                        src={president.image}
                                        alt={president.name}
                                        fill
                                        className="rounded-3xl object-cover shadow-2xl"
                                        data-ai-hint={president.aiHint}
                                    />
                                </div>
                                <div className="md:col-span-3 flex flex-col justify-center">
                                    <h2 className="text-3xl font-bold font-headline">
                                        {president.name}
                                    </h2>
                                    <p className="text-primary font-semibold mt-1">
                                        {president.role}
                                    </p>
                                    <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-justify">
                                        {president.description}
                                    </p>
                                    {/* <div className="flex gap-2 mt-6">
                                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                                      <Link href={president.social.twitter}><Twitter className="h-5 w-5" /></Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                                      <Link href={president.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                                    </Button>
                                  </div> */}
                                </div>
                            </Card>
                        </div>
                    )}

                    {vicePresident && (
                        <div className="mt-20">
                            <Card className="grid md:grid-cols-4 gap-8 p-8 border-0 shadow-none">
                                <div className="md:col-span-3 flex flex-col justify-center text-right">
                                    <h2 className="text-3xl font-bold font-headline">
                                        {vicePresident.name}
                                    </h2>
                                    <p className="text-primary font-semibold mt-1">
                                        {vicePresident.role}
                                    </p>
                                    <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-justify">
                                        {vicePresident.description}
                                    </p>
                                    {/* <div className="flex gap-2 mt-6 justify-end">
                                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                                      <Link href={vicePresident.social.twitter}><Twitter className="h-5 w-5" /></Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                                      <Link href={vicePresident.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                                    </Button>
                                  </div> */}
                                </div>
                                <div className="md:col-span-1 relative aspect-[4/5]">
                                    <Image
                                        src={vicePresident.image}
                                        alt={vicePresident.name}
                                        fill
                                        className="rounded-3xl object-cover shadow-2xl"
                                        data-ai-hint={vicePresident.aiHint}
                                    />
                                </div>
                            </Card>
                        </div>
                    )}
                </div>


                {/* CTA */}
                <Cta />

            </main>
            <Footer />
        </div>
    );
}
