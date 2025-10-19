
import type { FC } from 'react';
import Image from 'next/image';

export const President: FC = () => {
  return (
    <section id="president" className="bg-background py-20 md:py-28 lg:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-lg font-semibold text-primary font-headline">Hardiksinh Chudasama</p>
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Meet Our President
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:max-w-none md:mx-0">
            <Image
              src="/Images/Hardik.jpg"
              alt="Hardiksinh Chudasama"
              fill
              className="rounded-3xl object-cover shadow-2xl"
              data-ai-hint="indian man portrait"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-amber-600 sm:text-3xl">
              A Leader By Vision, A Social Worker By Heart, And A Change Maker By Action.
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hardiksinh Chudasama is a dynamic leader committed to spreading happiness and bringing positive change to society. With a strong background in social service, professional expertise as a Project Manager in an IT company, and a passion for writing, public speaking, and anchoring, he has dedicated his life to empowering communities. His journey is a testament to how one individual can inspire many to make a difference.
            </p>
            <div>
              <h4 className="font-headline text-xl font-bold text-foreground mb-2">President Message:</h4>
              <p className="text-lg text-muted-foreground italic">
                "Every smile we create is a step towards a better world. Join us in this mission to make a difference - together, we can change lives!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
