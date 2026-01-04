
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
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  address: string;
}

export interface TranslationStrings {
  saveContact: string;
  call: string;
  email: string;
  linkedin: string;
  back: string;
  downloadVCard: string;
}
