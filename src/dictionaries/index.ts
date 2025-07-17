export type Locale = 'en' | 'es';

export type Dictionary = {
  title: string;
  subtitle: string;
  sections: {
    resume: string;
    contact: string;
    profiles: string;
  };
  resume: {
    english: {
      title: string;
      action: string;
    };
    spanish: {
      title: string;
      action: string;
    };
  };
  contact: {
    whatsapp: string;
    telegram: string;
    email: string;
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
    rights: string;
  };
  language: {
    switch: string;
  };
};

import en from './en.json';
import es from './es.json';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale];
};
