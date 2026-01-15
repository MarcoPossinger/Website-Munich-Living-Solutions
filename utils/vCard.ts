import { ProfileData } from '../types';

/**
 * Escapes text for vCard 3.0 according to common implementations:
 * - Backslashes, commas, semicolons and newlines must be escaped.
 */
const escapeVCardText = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');

/**
 * Converts an image URL or data URL to a base64 payload suitable for vCard PHOTO.
 */
const getBase64FromUrl = async (
  url: string
): Promise<{ data: string; mime: string } | null> => {
  // Data-URL already contains base64
  if (url.startsWith('data:')) {
    const [header, data] = url.split('base64,');
    const mimeSubtype = header.split(':')[1].split(';')[0].split('/')[1]; // jpeg/png/...
    const mime = (mimeSubtype || 'jpeg').toUpperCase();
    return { data, mime };
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string; // data:<mime>;base64,<...>
        const base64 = result.split('base64,')[1] ?? '';
        const mimeSubtype = (blob.type.split('/')[1] ?? 'jpeg').toUpperCase();
        resolve({ data: base64, mime: mimeSubtype });
      };
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Fehler beim Laden des Profilbilds für vCard', e);
    return null;
  }
};

export const generateVCard = async (
  profile: ProfileData,
  profileImageUrl?: string | null
) => {
  const firstName = (profile.firstName ?? '').trim();
  const lastName = (profile.lastName ?? '').trim();
  const fullName = `${firstName} ${lastName}`.trim();

  const vcardParts: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCardText(fullName)}`,
    `N:${escapeVCardText(lastName)};${escapeVCardText(firstName)};;;`,
  ];

  // ORG
  const org = (profile.brand ?? '').trim();
  if (org) vcardParts.push(`ORG:${escapeVCardText(org)}`);

  // TITLE (prefer DE, fallback EN)
  const title =
    (profile.title?.de ?? '').trim() ||
    (profile.title?.en ?? '').trim();
  if (title) vcardParts.push(`TITLE:${escapeVCardText(title)}`);

  // ❌ Phone intentionally removed (no TEL field)

  // EMAIL
  const email = (profile.email ?? '').trim();
  if (email) vcardParts.push(`EMAIL;TYPE=PREF,INTERNET:${escapeVCardText(email)}`);

  // LinkedIn as Social Profile (not in NOTE)
  const linkedinUrl = (profile.linkedin ?? '').trim();
  if (linkedinUrl) {
    vcardParts.push(`X-SOCIALPROFILE;type=linkedin:${escapeVCardText(linkedinUrl)}`);
  }

  // ADR
  const address = (profile.address ?? '').trim();
  if (address) {
    vcardParts.push(`ADR;TYPE=WORK:;;${escapeVCardText(address)};;;`);
  }

  // URL (only if set)
  const website = (profile.website ?? '').trim();
  if (website) {
    vcardParts.push(`URL:${escapeVCardText(website)}`);
  }

  // NOTE (only useful non-empty business context; no LinkedIn here)
  const legalEntity = (profile.legalEntity ?? '').trim();
  const noteLines = [
    org ? `Brand: ${org}` : '',
    legalEntity ? `Legal entity: ${legalEntity}` : '',
  ].filter(Boolean);

  if (noteLines.length) {
    vcardParts.push(`NOTE:${escapeVCardText(noteLines.join('\n'))}`);
  }

  // PHOTO (embedded base64) if provided
  if (profileImageUrl) {
    const imageData = await getBase64FromUrl(profileImageUrl);
    if (imageData?.data) {
      vcardParts.push(`PHOTO;ENCODING=b;TYPE=${imageData.mime}:${imageData.data}`);
    }
  }

  vcardParts.push('END:VCARD');

  const vcard = vcardParts.join('\r\n');
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${firstName || 'Marco'}_${lastName || 'Possinger'}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

