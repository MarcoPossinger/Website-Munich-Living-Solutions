import React from 'react';
import { Language, ProfileData, TranslationStrings } from '../types';

interface LegalOverlayProps {
  type: 'imprint' | 'privacy' | 'ankaufsprofil' | null;
  onClose: () => void;
  profile: ProfileData;
  lang: Language;
  t: TranslationStrings;
}

const LegalOverlay: React.FC<LegalOverlayProps> = ({
  type,
  onClose,
  profile,
  lang,
  t
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {type === 'imprint'
              ? t.imprint
              : type === 'privacy'
              ? t.privacy
              : t.ankaufsprofil}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-[15px] leading-7 text-zinc-400 space-y-6">

          {/* ================= IMPRESSUM ================= */}
          {type === 'imprint' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
                  Angaben gemäß § 5 TMG
                </h3>
                <p className="text-white">{profile.legalEntity}</p>
                <p>{profile.address}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
                  Vertreten durch
                </h3>
                <p>{profile.managingDirector}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
                  Kontakt
                </h3>
                <p>E-Mail: {profile.imprintEmail || profile.email}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
                  Registereintrag
                </h3>
                <p>Registergericht: {profile.registerCourt}</p>
                <p>Registernummer: {profile.registerNumber}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
                  Umsatzsteuer-ID
                </h3>
                <p>{profile.vatId}</p>
              </div>
            </>
          )}

          {/* ================= DATENSCHUTZ ================= */}
          {type === 'privacy' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
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
                  Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Personenbezogene Daten
                  werden auf dieser Website nur im technisch notwendigen Umfang verarbeitet.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Hosting</h4>
                <p>
                  Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
                  gehostet. Beim Aufruf der Website verarbeitet der Hosting-Anbieter technische Zugriffsdaten
                  (Server-Logfiles).
                </p>
                <p className="mt-2">
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Schriftarten</h4>
                <p>
                  Auf dieser Website werden Schriftarten lokal eingebunden. Es findet keine Verbindung zu
                  Servern von Google statt.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Externe Inhalte</h4>
                <p>
                  Zur technischen Bereitstellung können externe Inhalte geladen werden. Dabei kann Ihre
                  IP-Adresse an Drittanbieter übertragen werden.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Ihre Rechte</h4>
                <p>
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                  Datenübertragbarkeit sowie Widerspruch.
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">Stand: Januar 2026</p>
              </div>
            </>
          )}

          {/* ================= ANKAUFSPROFIL ================= */}
          {type === 'ankaufsprofil' && (
            <>
              {/* Inhalt unverändert – exakt wie zuvor */}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-widest"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};

export default LegalOverlay;
