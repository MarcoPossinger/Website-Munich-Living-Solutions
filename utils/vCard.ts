
import { ProfileData } from '../types';

export const generateVCard = (profile: ProfileData, profileImageBase64?: string | null) => {
  const vcardParts = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.firstName} ${profile.lastName}`,
    `N:${profile.lastName};${profile.firstName};;;`,
    `ORG:${profile.legalEntity}`,
    `TITLE:${profile.title.de} - ${profile.brand}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `ADR;TYPE=WORK:;;${profile.address};;;`,
    `NOTE:Brand: ${profile.brand}\nLinkedIn: ${profile.linkedin}`,
  ];

  // Profilbild hinzufügen, falls vorhanden
  if (profileImageBase64 && profileImageBase64.includes('base64,')) {
    const base64Data = profileImageBase64.split('base64,')[1];
    const mimeType = profileImageBase64.split(';')[0].split(':')[1].split('/')[1].toUpperCase();
    // vCard PHOTO property (Base64)
    vcardParts.push(`PHOTO;ENCODING=b;TYPE=${mimeType}:${base64Data}`);
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
