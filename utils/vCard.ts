
import { ProfileData } from '../types';

/**
 * Konvertiert eine Bild-URL oder einen Base64-String in einen reinen Base64-String für die vCard
 */
const getBase64FromUrl = async (url: string): Promise<{data: string, mime: string} | null> => {
  if (url.startsWith('data:')) {
    const [header, data] = url.split('base64,');
    const mime = header.split(':')[1].split(';')[0].split('/')[1].toUpperCase();
    return { data, mime };
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split('base64,')[1];
        const mime = blob.type.split('/')[1].toUpperCase();
        resolve({ data: base64, mime });
      };
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Fehler beim Laden des Profilbilds für vCard", e);
    return null;
  }
};

export const generateVCard = async (profile: ProfileData, profileImageUrl?: string | null) => {
  const vcardParts = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.firstName} ${profile.lastName}`,
    `N:${profile.lastName};${profile.firstName};;;`,
    `ORG:${profile.legalEntity}`,
    `TITLE:${profile.title.de} / ${profile.brand}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `ADR;TYPE=WORK:;;${profile.address};;;`,
    `NOTE:Firma: ${profile.brand}\nLinkedIn: ${profile.linkedin}`,
  ];

  if (profileImageUrl) {
    const imageData = await getBase64FromUrl(profileImageUrl);
    if (imageData) {
      vcardParts.push(`PHOTO;ENCODING=b;TYPE=${imageData.mime}:${imageData.data}`);
    }
  }

  vcardParts.push('END:VCARD');

  const vcard = vcardParts.join('\r\n');
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.firstName}_${profile.lastName}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
