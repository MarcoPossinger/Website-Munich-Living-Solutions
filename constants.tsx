import { ProfileData, TranslationStrings } from './types';

/* =========================
   USER PROFILE
========================= */

export const USER_PROFILE: ProfileData = {
  firstName: "Marco",
  lastName: "Possinger",

  title: {
    de: "Geschäftsführer",
    en: "Managing Director",
  },

  subtitle: {
    de: "Immobilieninvestment & Projektentwicklung",
    en: "Real Estate Investment & Project Development",
  },

  brand: "Munich Living Solutions",
  legalEntity: "BPD Briem Property Development GmbH",
  managingDirector: "Marco Possinger",

  // bewusst noch vorhanden (wird nicht angezeigt)
  phone: "+49 157 83698237",
  email: "marco.possinger@munichlivingsolutions.de",
  imprintEmail: "info@munichlivingsolutions.de",

  linkedin: "https://www.linkedin.com/in/marco-briem-465323201/",
  address: "Bürgermeister-Schneider-Weg 163, 85579 Neubiberg",
  registerCourt: "Amtsgericht München",
  registerNumber: "HRB 283403",
  vatId: "DE360600844",

  profileImage: "/images/profile-contact.jpg",
};

/* =========================
   TRANSLATIONS
========================= */

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
    whatsapp: "WhatsApp",

    legal: {
      imprint: {
        title: "Impressum",
        content: `
Angaben gemäß § 5 TMG

BPD Briem Property Development GmbH
Bürgermeister-Schneider-Weg 163
85579 Neubiberg

Vertreten durch:
Marco Possinger

Registergericht: Amtsgericht München
Registernummer: HRB 283403
Umsatzsteuer-ID: DE360600844

E-Mail: info@munichlivingsolutions.de
        `,
      },
      privacy: {
        title: "Datenschutzerklärung",
        content: `
Dies ist eine Beispiel-Datenschutzerklärung.
Hier kommt dein vollständiger deutscher Datenschutztext rein.
        `,
      },
    },
  },

  en: {
    saveContact: "Save Contact",
    call: "Phone",
    email: "Email",
    linkedin: "LinkedIn",
    ankaufsprofil: "Acquisition Profile",
    back: "Back",
    downloadVCard: "Download vCard",
    imprint: "Legal Notice",
    privacy: "Privacy Policy",
    close: "Close",
    whatsapp: "WhatsApp",

    legal: {
      imprint: {
        title: "Legal Notice (Imprint according to German law)",
        content: `
Information pursuant to Section 5 German Telemedia Act (TMG)

BPD Briem Property Development GmbH
Bürgermeister-Schneider-Weg 163
85579 Neubiberg, Germany

Represented by:
Marco Possinger

Commercial Register: Munich District Court
Registration Number: HRB 283403
VAT ID: DE360600844

Email: info@munichlivingsolutions.de
        `,
      },
      privacy: {
        title: "Privacy Policy",
        content: `
This is a sample privacy policy.
Your full English privacy policy text goes here.
        `,
      },
    },
  },
};

/* =========================
   IMAGES
========================= */

export const IMAGES = {
  background: "",
  logo: "/logo.svg",
  profile: "/portrait.jpg",
};
