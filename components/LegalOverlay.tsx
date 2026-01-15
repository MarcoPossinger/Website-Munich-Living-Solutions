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
                  Personenbezogene Daten werden auf dieser Website ausschließlich im technisch
                  notwendigen Umfang verarbeitet.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Hosting</h4>
                <p>
                  Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
                  Beim Aufruf der Website verarbeitet der Hosting-Anbieter technische Zugriffsdaten
                  (sogenannte Server-Logfiles).
                </p>
                <p className="mt-2">
                  <span className="text-white/80 font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                </p>
                <p className="mt-2">
                  Eine Verarbeitung kann auch in einem Drittland erfolgen.
                  Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln gemäß Art. 46 DSGVO.
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
                  Ankaufsprofil
                </h3>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Lage</h4>
                <p>München (Stadtgebiet, Postleitzahlenbereiche) sowie ausgewähltes Umland</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Objekttypen & Investitionsvolumen</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Eigentumswohnungen bis ca. <strong>1,0 Mio. €</strong></li>
                  <li>Mehrfamilienhäuser bis ca. <strong>5,5 Mio. €</strong></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Investitionsfokus</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Wohnimmobilien mit Entwicklungs- und Wertsteigerungspotenzial</li>
                  <li>Sanierungs- oder Modernisierungsbedarf</li>
                  <li>Unter Markt vermietete Objekte mit Mietanpassungspotenzial</li>
                  <li>Bevorzugt leerstehende Objekte, jedoch auch vermietete Bestände von Interesse</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Ankaufs- & Abwicklungsprozess</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Direktankauf ohne Weitervermittlung</li>
                  <li>Zeitnahe, diskrete und unkomplizierte Abwicklung</li>
                  <li>Fachmännische Objektprüfung und schnelle Kaufentscheidung</li>
                  <li>Kurze Entscheidungswege und klare Ankaufsparameter</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Zusammenarbeit & Netzwerk</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Umfangreiches Netzwerk aus Handwerkern, Bauunternehmen und Fachplanern</li>
                  <li>Eingespielte Zusammenarbeit mit Notaren und Projektpartnern</li>
                  <li>Finanzierung gesichert durch etabliertes Netzwerk aus Banken und Co-Investoren</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">Mehrwert für Vermittler</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Möglichkeit einer zweifachen Provision</li>
                  <li>Langfristige Zusammenarbeit über Ankauf und Wiederverkauf</li>
                </ul>
              </div>

              <div className="pt-2">
                <p>
                  Angebote bitte ausschließlich per E-Mail an:<br />
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



