import type { FC } from 'react';
import Image from 'next/image';

const partners = [
  { name: 'Bank Of Baroda', logo: '/Images/Partners/BOB.png', aiHint: 'Bank Of Baroda' },
  { name: 'RAATech', logo: '/Images/Partners/RAATech.png', aiHint: 'RAATech' },
  { name: 'Vibe Positivity', logo: '/Images/Partners/VibePositivity.png', aiHint: 'Vibe Positivity' },
  { name: 'Ryuva', logo: '/Images/Partners/Ryuva.png', aiHint: 'Ryuva' },
  { name: 'The One Technologies', logo: '/Images/Partners/TheOneTechnologies.png', aiHint: 'The One Technologies' },
  { name: 'Indian Red Cross Society', logo: '/Images/Partners/IndianRedCrossSociety.png', aiHint: 'Indian Red Cross Society' },
  { name: 'KSV', logo: '/Images/Partners/KSV.png', aiHint: 'KSV' },
  { name: 'LeaderShip', logo: '/Images/Partners/LeaderShip.png', aiHint: 'LeaderShip' },
  { name: 'Swastik Engineering', logo: '/Images/Partners/SwastikEngineeringBG.png', aiHint: 'Swastik Engineering' },
  { name: 'vLPO', logo: '/Images/Partners/vLPO.png', aiHint: 'vLPO' },
  { name: 'RIL', logo: '/Images/Partners/RIL.jpeg', aiHint: 'RIL' },
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
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center mx-6"
                style={{ width: '180px', height: '100px' }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain grayscale transition duration-300 hover:grayscale-0 opacity-60 hover:opacity-100"
                    data-ai-hint={partner.aiHint}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
