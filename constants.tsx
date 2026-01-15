import { ProfileData, TranslationStrings } from './types';

export const USER_PROFILE: ProfileData = {
  firstName: "Marco",
  lastName: "Possinger",

  title: {
    de: "Gründer & Geschäftsführer",
    en: "Founder & Managing Director"
  },

  subtitle: {
  de: "Immobilieninvestment & Projektentwicklung",
  en: "Real Estate Investment & Project Development"
  },

  brand: "Munich Living Solutions",
  legalEntity: "BPD Briem Property Development GmbH",
  managingDirector: "Marco Possinger",

  phone: "+49 157 83698237", // lassen wir für jetzt bewusst noch drin
  email: "marco.possinger@munichlivingsolutions.de",
  imprintEmail: "info@munichlivingsolutions.de",

  linkedin: "https://www.linkedin.com/in/marco-briem-465323201/",
  address: "Bürgermeister-Schneider-Weg 163, 85579 Neubiberg",
  registerCourt: "Amtsgericht München",
  registerNumber: "HRB 283403",
  vatId: "DE360600844",

  profileImage: "/images/profile-contact.jpg",
};

export const TRANSLATIONS: Record<'de' | 'en', TranslationStrings> = {
  de: {
    saveContact: "Kontakt speichern",
    call: "Telefon",
    email: "E-Mail",
    linkedin: "LinkedIn",
    ankaufsprofil: "Ankaufsprofil",
    back: "Zurück",
    downloadVCard: "vCard laden",
    imprint: "Impressum",
    privacy: "Datenschutz",
    close: "Schließen",
    whatsapp: "WhatsApp"
  },
  en: {
    saveContact: "Save Contact",
    call: "Phone",
    email: "Email",
    linkedin: "LinkedIn",
    ankaufsprofil: "Acquisition Profile",
    back: "Back",
    downloadVCard: "Download vCard",
    imprint: "Imprint",
    privacy: "Privacy Policy",
    close: "Close",
    whatsapp: "WhatsApp"
  }
};

export const IMAGES = {
  background: "",
  logo: "/logo.svg",
  profile: "/portrait.jpg"
};

