
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Get In Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We would love to hear from you! Whether you have a question, a suggestion, or want to get involved, feel free to reach out to us.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <ContactForm />
              </div>
              <div className="space-y-8">
                 <Card className="p-8 shadow-lg border-l-4 border-primary">
                    <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
                        <MapPin className="w-7 h-7 text-primary" />
                        Our Address
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        Mission Hope Foundation, <br/>
                        Ahmedabad
                    </p>
                 </Card>
                 <Card className="p-8 shadow-lg border-l-4 border-primary">
                    <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
                        <Mail className="w-7 h-7 text-primary" />
                        Email Us
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        missionhope07@gmail.com
                    </p>
                 </Card>
                 <Card className="p-8 shadow-lg border-l-4 border-primary">
                    <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
                        <Phone className="w-7 h-7 text-primary" />
                        Call Us
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        +91 70464 78909
                    </p>
                 </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
