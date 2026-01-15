
export type Language = 'de' | 'en';

export interface ProfileData {
  firstName: string;
  lastName: string;
  title: {
    de: string;
    en: string;
  };
  brand: string;
  legalEntity: string;
  managingDirector: string;
  phone: string;
  email: string;
  imprintEmail?: string;
  linkedin: string;
  website?: string;
  address: string;
  registerCourt: string;
  registerNumber: string;
  vatId: string;
  profileImage?: string;
}

export interface TranslationStrings {
  saveContact: string;
  call: string;
  email: string;
  linkedin: string;
  back: string;
  downloadVCard: string;
  imprint: string;
  privacy: string;
  close: string;
  whatsapp: string;

  // NEU: Inhalte fürs LegalOverlay (DE/EN kommt automatisch über t)
  legal: {
    imprint: {
      title: string;
      content: string;
    };
    privacy: {
      title: string;
      content: string;
    };
  };
}

