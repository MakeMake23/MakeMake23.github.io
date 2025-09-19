import React from "react";
import Image from "next/image";
import tokenfleetLogo from "@/assets/images/tokenfleet.svg";
import fusyfoxLogo from "@/assets/images/fusyfox.png";

interface TeamsSectionProps {
  title: string;
  dict: {
    tokenfleet: {
      name: string;
      description: string;
    };
    fusyfox: {
      name: string;
      description: string;
    };
  };
}

const TeamsSection: React.FC<TeamsSectionProps> = ({ title, dict }) => {
  const cards = [
    {
      href: "https://tokenfleet.io",
      logo: tokenfleetLogo,
      alt: "TokenFleet",
      description: dict.tokenfleet.description,
    },
    {
      href: "https://store.epicgames.com/en-US/p/fusyfox-752d01",
      logo: fusyfoxLogo,
      alt: "FusyFox",
      description: dict.fusyfox.description,
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {cards.map((card) => (
          <a
            key={card.alt}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={card.logo}
                alt={card.alt}
                fill
                style={{ objectFit: "contain" }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TeamsSection;
