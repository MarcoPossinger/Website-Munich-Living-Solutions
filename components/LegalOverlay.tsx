import React from 'react';
import { Language, ProfileData, TranslationStrings } from '../types';

interface LegalOverlayProps {
  type: 'imprint' | 'privacy' | 'ankaufsprofil' | null;
  onClose: () => void;
  profile: ProfileData;
  lang: Language;
  t: TranslationStrings;
}

const LegalOverlay: React.FC<LegalOverlayProps> = ({ type, onClose, profile, lang, t }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">
            {type === 'imprint'
              ? t.imprint
              : type === 'privacy'
              ? t.privacy
              : t.ankaufsprofil}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-zinc-400 text-sm leading-relaxed space-y-6">

          {/* ===================== IMPRESSUM ===================== */}
          {type === 'imprint' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Angaben gemäß § 5 TMG
                </h3>
                <p className="text-white text-base">{profile.legalEntity}</p>
                <p>{profile.address}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Vertreten durch
                </h3>
                <p>{profile.managingDirector}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Kontakt
                </h3>
                <p>E-Mail: {profile.imprintEmail || profile.email}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Registereintrag
                </h3>
                <p>Registergericht: {profile.registerCourt}</p>
                <p>Registernummer: {profile.registerNumber}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Umsatzsteuer-ID
                </h3>
                <p>{profile.vatId}</p>
              </div>
            </>
          )}

          {/* ===================== DATENSCHUTZ ===================== */}
          {type === 'privacy' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Datenschutzerklärung
                </h3>
                <p className="text-white">
                  {profile.legalEntity}<br />
                  {profile.address}
                </p>
                <p className="mt-2">
                  Vertreten durch: {profile.managingDirector}<br />
                  E-Mail: {profile.imprintEmail || profile.email}
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Allgemeine Hinweise</h4>
                <p>
                  Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Personenbezogene Daten
                  werden auf dieser Website nur im technisch notwendigen Umfang verarbeitet.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Hosting</h4>
                <p>
                  Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
                  Beim Aufruf der Website verarbeitet der Hosting-Anbieter technische Zugriffsdaten
                  (sogenannte Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs,
                  Browsertyp, Betriebssystem und Referrer-URL.
                </p>
                <p className="mt-2">
                  <span className="text-white/80 font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einem sicheren und stabilen Betrieb dieser Website).
                </p>
                <p className="mt-2">
                  Eine Verarbeitung kann auch in einem Drittland (insbesondere USA) erfolgen.
                  Die Übermittlung erfolgt auf Grundlage geeigneter Garantien, insbesondere
                  Standardvertragsklauseln gemäß Art. 46 DSGVO.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Schriftarten</h4>
                <p>
                  Auf dieser Website werden Schriftarten lokal eingebunden.
                  Es findet keine Verbindung zu Servern von Google
                  (z. B. fonts.googleapis.com / fonts.gstatic.com) statt.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Einbindung externer Inhalte (CDNs)</h4>
                <p>
                  Zur technischen Bereitstellung können externe Inhalte geladen werden
                  (z. B. Tailwind CSS über cdn.tailwindcss.com und JavaScript-Module über esm.sh).
                  Dabei kann Ihre IP-Adresse an die jeweiligen Anbieter übertragen werden,
                  da ohne diese Übertragung die Inhalte technisch nicht ausgeliefert werden können.
                </p>
                <p className="mt-2">
                  <span className="text-white/80 font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einer effizienten und sicheren Bereitstellung dieser Website).
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Externe Links</h4>
                <p>
                  Diese Website enthält Links zu externen Diensten (z. B. LinkedIn).
                  Wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website.
                  Für die Verarbeitung personenbezogener Daten auf den verlinkten Seiten
                  ist ausschließlich der jeweilige Anbieter verantwortlich.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cookies & Tracking</h4>
                <p>
                  Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken
                  und setzt keine Tracking-Tools ein.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Speicherdauer</h4>
                <p>
                  Personenbezogene Daten werden nur so lange verarbeitet,
                  wie dies zur Erreichung der genannten Zwecke erforderlich ist
                  oder gesetzliche Aufbewahrungspflichten bestehen.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Ihre Rechte</h4>
                <p>
                  Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
                  Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
                  Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO).
                  Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Stand</h4>
                <p>Januar 2026</p>
              </div>
            </>
          )}

          {/* ===================== ANKAUFSPROFIL ===================== */}
          {type === 'ankaufsprofil' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                  Investitionsprofil
                </h3>
                <p className="text-white text-base mb-4">
                  Ankauf von Wohnimmobilien in München und Umgebung
                </p>
              </div>

              <ul className="list-disc list-inside space-y-2">
                <li>Bestandswohnungen und Mehrfamilienhäuser</li>
                <li>Sanierungsbedürftige Objekte</li>
                <li>Leerstand oder teilweiser Leerstand</li>
                <li>Direktankauf ohne Maklerzwang</li>
                <li>Diskrete, schnelle Abwicklung</li>
              </ul>

              <p className="mt-4">
                Angebote bitte ausschließlich per E-Mail an:<br />
                <span className="text-white font-semibold">{profile.email}</span>
              </p>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all uppercase text-xs tracking-widest"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalOverlay;


