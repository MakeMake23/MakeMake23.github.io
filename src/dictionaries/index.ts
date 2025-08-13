export type Locale = "en" | "es";

export type Dictionary = {
  title: string;
  subtitle: string;
  sections: {
    resume: string;
    contact: string;
    profiles: string;
    teams: string;
    review_title: string;
    review_button: string;
  };
  resume: {
    title: string;
    action: string;
    contact_cta: string;
    availability: string;
    summary: string;
  };
  contact: {
    whatsapp: string;
    telegram: string;
    email: string;
    message: string;
  };
  profiles: {
    linkedin: string;
    linkedin_desc: string;
    github: string;
    github_desc: string;
  };
  stats: {
    experience: string;
    loc: string;
    projects: string;
    organizations: string;
  };
  blockchain: {
    title: string;
    blocks: {
      data: string;
    }[];
    miningMessage: string;
  };
  teams: {
    tokenfleet: {
      name: string;
      description: string;
    };
    fusyfox: {
      name: string;
      description: string;
    };
  };
  footer: {
    beforeDubai: string;
    afterDubai: string;
    rights: string;
  };
  language: {
    switch: string;
  };
  quote: string;
};

import en from "./en.json";
import es from "./es.json";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale];
};
