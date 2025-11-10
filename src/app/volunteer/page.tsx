
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { VolunteerUpdatedForm } from '@/components/team/volunteer-updated-form';

export default function VolunteerPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 py-24 sm:py-32">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                                Become a Volunteer
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                Join our team and make a difference. We are always looking for passionate individuals to help us in our mission.
                            </p>
                        </div>
                        <VolunteerUpdatedForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
