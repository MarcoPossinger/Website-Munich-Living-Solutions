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
                  {profile.legalEntity}
                  <br />
                  {profile.address}
                </p>
                <p className="mt-2">
                  Vertreten durch: {profile.managingDirector}
                  <br />
                  E-Mail: {profile.imprintEmail || profile.email}
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Allgemeine Hinweise</h4>
                <p>
                  Personenbezogene Daten werden auf dieser Website ausschließlich im technisch
                  notwendigen Umfang verarbeitet.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Hosting</h4>
                <p>
                  Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
                  Dabei werden technisch notwendige Zugriffsdaten verarbeitet.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cookies & Tracking</h4>
                <p>
                  Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken.
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

              <div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Bestandswohnungen und Mehrfamilienhäuser</li>
                  <li>Sanierungsbedürftige Objekte</li>
                  <li>Leerstand oder teilweiser Leerstand</li>
                  <li>Direktankauf ohne Maklerzwang</li>
                  <li>Diskrete, schnelle Abwicklung</li>
                </ul>
              </div>

              <div>
                <p className="mt-4">
                  Angebote bitte ausschließlich per E-Mail an:
                  <br />
                  <span className="text-white font-semibold">
                    {profile.email}
                  </span>
                </p>
              </div>
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

