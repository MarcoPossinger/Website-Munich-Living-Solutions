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
    // header example: data:image/jpeg;
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
  // Basic required fields
  const firstName = profile.firstName ?? '';
  const lastName = profile.lastName ?? '';

  const vcardParts: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCardText(`${firstName} ${lastName}`.trim())}`,
    `N:${escapeVCardText(lastName)};${escapeVCardText(firstName)};;;`,
    `ORG:${escapeVCardText(profile.legalEntity ?? '')}`,
    `TITLE:${escapeVCardText(`${profile.title?.de ?? ''} / ${profile.brand ?? ''}`.trim())}`,
    `TEL;TYPE=CELL,VOICE:${escapeVCardText(profile.phone ?? '')}`,
    `EMAIL;TYPE=PREF,INTERNET:${escapeVCardText(profile.email ?? '')}`,
    // ADR in one-line form (kept as you had it)
    `ADR;TYPE=WORK:;;${escapeVCardText(profile.address ?? '')};;;`,
  ];

  // ✅ Website only if set (prevents "http://undefined")
  const website = (profile.website ?? '').trim();
  if (website) {
    vcardParts.push(`URL:${escapeVCardText(website)}`);
  }

  // NOTE: must use escaped newlines (\\n) in vCard 3.0
  const brand = profile.brand ?? '';
  const linkedin = profile.linkedin ?? '';
  const noteLines = [
    `Firma: ${brand}`,
    linkedin ? `LinkedIn: ${linkedin}` : '',
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

