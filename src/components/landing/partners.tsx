
import type { FC } from 'react';
import Image from 'next/image';

const partners = [
  { name: 'Global Fund', logo: 'https://missionhopefoundation.in/imgs/partners/BOB.png', aiHint: 'company logo' },
  { name: 'Charity Foundation', logo: 'https://missionhopefoundation.in/imgs/partners/RAATech.png', aiHint: 'company logo' },
  { name: 'Community Trust', logo: 'https://missionhopefoundation.in/imgs/partners/VibePositivity.png', aiHint: 'company logo' },
  { name: 'United Support', logo: 'https://missionhopefoundation.in/imgs/partners/Ryuva.png', aiHint: 'company logo' },
  { name: 'Hope Givers', logo: 'https://missionhopefoundation.in/imgs/partners/TheOneTechnologies.png', aiHint: 'company logo' },
];

const allPartners = [...partners, ...partners];

export const Partners: FC = () => {
  return (
    <section id="partners" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-headline text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by organizations worldwide
          </h3>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-scroll-horizontal hover:[animation-play-state:paused]">
            {allPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 w-52 h-24 flex items-center justify-center mx-6">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={140}
                  height={70}
                  className="object-contain grayscale transition duration-300 hover:grayscale-0 opacity-60 hover:opacity-100"
                  data-ai-hint={partner.aiHint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
