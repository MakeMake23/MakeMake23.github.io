export type Locale = "en" | "es";

export type Dictionary = {
  title: string;
  subtitle: string;
  navigation: {
    home: string;
    cv: string;
    say_hi: string;
    reviews: string;
    blog: string;
  };
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
  blog: {
    title: string;
    under_construction: string;
    coming_soon: string;
    description: string;
    expected_launch: string;
    follow_on_linkedin: string;
    return_home: string;
  };
  not_found: {
    title: string;
    text_before_url: string;
    text_after_url: string;
    report_issue: string;
  };
  footer: {
    footer_made_with: string;
    footer_in: string;
    afterDubai: string;
    rights: string;
    version: string;
    privacy_policy: string;
    contact: string;
    blog: string;
  };
  review_page: {
    title: string;
    message: string;
    go_back_home: string;
    form: {
      title: string;
      full_name: string;
      contact_method: string;
      contact_info: string;
      linkedin: string;
      email: string;
      telegram: string;
      phone: string;
      submit_button: string;
      errors: {
        invalid_email: string;
        invalid_linkedin: string;
        invalid_telegram: string;
        invalid_phone: string;
      };
      experience_label: string;
      experience_placeholder: string;
      consent_checkbox: string;
      consent_checkbox_link_text: string;
    };
  };
  language: {
    switch: string;
  };
  quote: string;
  privacy_policy: {
    title: string;
    last_updated: string;
    introduction: string;
    data_we_collect: {
      title: string;
      items: string[];
    };
    how_we_use_data: {
      title: string;
      items: string[];
    };
    data_sharing: {
      title: string;
      content: string;
    };
    your_rights: {
      title: string;
      content: string;
    };
    contact: {
      title: string;
      content: string;
    };
  };
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
