
import type { FC } from 'react';
import Image from 'next/image';

const partners = [
  { name: 'Global Fund', logo: 'https://missionhopefoundation.in/imgs/partners/BOB.png', aiHint: 'company logo' },
  { name: 'Charity Foundation', logo: 'https://missionhopefoundation.in/imgs/partners/RAATech.png', aiHint: 'company logo' },
  { name: 'Community Trust', logo: 'https://missionhopefoundation.in/imgs/partners/VibePositivity.png', aiHint: 'company logo' },
  { name: 'United Support', logo: 'https://missionhopefoundation.in/imgs/partners/Ryuva.png', aiHint: 'company logo' },
  { name: 'Hope Givers', logo: 'https://missionhopefoundation.in/imgs/partners/TheOneTechnologies.png', aiHint: 'company logo' },
];

export const Partners: FC = () => {
  return (
    <section id="partners" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-headline text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by organizations worldwide
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {partners.map((partner) => (
            <div key={partner.name} className="grayscale transition hover:grayscale-0 opacity-50 hover:opacity-100 transform hover:scale-110">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={140}
                height={70}
                className="object-contain"
                data-ai-hint={partner.aiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
