
import { ProfileData, TranslationStrings } from './types';

export const USER_PROFILE: ProfileData = {
  firstName: "Marco",
  lastName: "Possinger",
  title: {
    de: "Gründer und Geschäftsführer",
    en: "Founder & Managing Director"
  },
  brand: "Munich Living Solutions",
  legalEntity: "BPD Briem Property Development GmbH",
  phone: "+4915783698237",
  email: "marco.possinger@munichlivingsolutions.de",
  linkedin: "https://www.linkedin.com/in/marco-briem-465323201/?originalSubdomain=de", 
  website: "https://www.munichlivingsolutions.de",
  address: "Bürgermeister-Schneider-Weg 163, 85579 Neubiberg"
};

export const TRANSLATIONS: Record<'de' | 'en', TranslationStrings> = {
  de: {
    saveContact: "Kontakt speichern",
    call: "Anrufen",
    email: "E-Mail",
    linkedin: "LinkedIn",
    back: "Zurück",
    downloadVCard: "vCard laden"
  },
  en: {
    saveContact: "Save Contact",
    call: "Call",
    email: "Email",
    linkedin: "LinkedIn",
    back: "Back",
    downloadVCard: "Download vCard"
  }
};

// Hier definieren wir die festen Dateinamen
export const IMAGES = {
  background: "",
  logo: "/logo.svg", // Stelle sicher, dass die Datei so heißt
  profile: "/portrait.jpg" // Stelle sicher, dass die Datei so heißt
};
