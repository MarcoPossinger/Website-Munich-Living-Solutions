
import { ProfileData, TranslationStrings } from './types';

// Wir importieren die Bilder direkt, damit Vite sie korrekt verarbeitet.
// Die @ts-ignore Kommentare verhindern, dass TypeScript sich über die fehlenden Typ-Definitionen der Bilddateien beschwert.
// @ts-ignore
import logoUrl from './logo.svg';
// @ts-ignore
import portraitUrl from './portrait.jpg';

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

export const IMAGES = {
  background: "",
  logo: logoUrl,
  profile: portraitUrl
};
