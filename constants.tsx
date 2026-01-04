
import { ProfileData, TranslationStrings } from './types';

// Wir betten das Logo direkt als Data-URI ein, damit es IMMER funktioniert, 
// selbst wenn die SVG-Datei nicht korrekt vom Server ausgeliefert wird.
const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPgogIDx0ZXh0IHg9IjEwMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJMaWJyZSBCYXNrZXJ2aWxsZSwgc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMyI+TVVOSUNIIExJVklORzwvdGV4dD4KICA8cGF0aCBkPSJNNDAgNDUgTDE2MCA0NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4=';

// Falls du deine eigene portrait.jpg hast, lade sie hoch und ändere den Wert unten auf 'portrait.jpg'
// Aktuell nutzen wir ein Platzhalterbild, damit die Vorschau gut aussieht.
const portraitUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';

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
  logo: logoBase64,
  profile: portraitUrl
};
