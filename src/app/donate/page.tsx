import { Header } from '@/components/landing/header';
import { DonateForm } from '@/components/donate/donate-form';
import { RecentDonors } from '@/components/donate/recent-donors';
import { Footer } from '@/components/landing/footer';

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                    Support Our Cause
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Your contribution helps us continue our mission to empower communities. Every donation makes a difference.
                </p>
            </div>

            <div className="mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="order-2 lg:order-1">
                        <RecentDonors />
                    </div>
                    <div className="order-1 lg:order-2">
                        <DonateForm />
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
