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

  const isImprint = type === 'imprint';
  const isPrivacy = type === 'privacy';
  const isAnkauf = type === 'ankaufsprofil';

  const title =
    isImprint ? t.imprint :
    isPrivacy ? t.privacy :
    t.ankaufsprofil;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-[15px] leading-7 text-zinc-300 space-y-8">

          {/* ===================== IMPRESSUM ===================== */}
          {isImprint && (
            <>
              <section>
                <h3 className="text-[11px] tracking-widest uppercase font-bold text-white mb-3">
                  Angaben gemäß § 5 TMG
                </h3>
                <p className="text-white font-medium">{profile.legalEntity}</p>
                <p>{profile.address}</p>
              </section>

              <section>
                <h3 className="text-[11px] tracking-widest uppercase font-bold text-white mb-3">
                  Vertreten durch
                </h3>
                <p>{profile.managingDirector}</p>
              </section>

              <section>
                <h3 className="text-[11px] tracking-widest uppercase font-bold text-white mb-3">
                  Kontakt
                </h3>
                <p>E-Mail: {profile.imprintEmail || profile.email}</p>
              </section>

              <section>
                <h3 className="text-[11px] tracking-widest uppercase font-bold text-white mb-3">
                  Registereintrag
                </h3>
                <p>Registergericht: {profile.registerCourt}</p>
                <p>Registernummer: {profile.registerNumber}</p>
              </section>

              <section>
                <h3 className="text-[11px] tracking-widest uppercase font-bold text-white mb-3">
                  Umsatzsteuer-ID
                </h3>
                <p>{profile.vatId}</p>
              </section>
            </>
          )}

          {/* ===================== DATENSCHUTZ ===================== */}
          {isPrivacy && (
            <>
              <section>
                <h3 className="text-white font-semibold mb-3">Datenschutzerklärung</h3>
                <p className="text-white font-medium">
                  {profile.legalEntity}<br />
                  {profile.address}
                </p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Allgemeine Hinweise</h4>
                <p>
                  Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst.
                  Personenbezogene Daten werden auf dieser Website ausschließlich
                  im technisch notwendigen Umfang verarbeitet.
                </p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Hosting</h4>
                <p>
                  Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
                  Covina, CA 91723, USA, gehostet. Beim Aufruf der Website werden
                  technische Zugriffsdaten (Server-Logfiles) verarbeitet.
                </p>
                <p className="mt-2">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einem sicheren Betrieb).
                </p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Schriftarten</h4>
                <p>
                  Die auf dieser Website verwendeten Schriftarten werden lokal
                  eingebunden. Es findet keine Verbindung zu Servern von Google statt.
                </p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Externe Inhalte</h4>
                <p>
                  Zur technischen Bereitstellung können externe Inhalte (z. B.
                  CDN-Ressourcen) geladen werden. Dabei kann Ihre IP-Adresse
                  an Drittanbieter übertragen werden.
                </p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Ihre Rechte</h4>
                <p>
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
                  Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
                  Widerspruch gemäß DSGVO.
                </p>
              </section>

              <section>
                <p className="text-zinc-400 text-sm">Stand: Januar 2026</p>
              </section>
            </>
          )}

          {/* ===================== ANKAUFSPROFIL ===================== */}
          {isAnkauf && (
            <>
              <section>
                <h3 className="text-white font-semibold mb-3">
                  Investitionsfokus
                </h3>
                <p>
                  Wohnimmobilien mit Entwicklungs- und Wertsteigerungspotenzial,
                  insbesondere:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Sanierungs- oder Modernisierungsbedarf</li>
                  <li>Unter Markt vermietete Objekte mit Mietanpassungspotenzial</li>
                  <li>Bevorzugt leerstehend, jedoch auch vermietete Bestände von Interesse</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-3">
                  Mehrwert für Vermittler
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Möglichkeit einer zweifachen Provision</li>
                  <li>Langfristige Zusammenarbeit über Ankauf & Wiederverkauf</li>
                  <li>Tippgeberprovision</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-3">
                  Ankaufs- & Abwicklungsprozess
                </h3>
                <p>
                  Diskreter, strukturierter Ankauf mit fachmännischer Prüfung,
                  schneller Kaufentscheidung und gesicherter Finanzierung.
                </p>
                <p className="mt-2">
                  Angebote bitte per E-Mail an:<br />
                  <strong>{profile.email}</strong>
                </p>
              </section>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.03]">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-widest"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};

export default LegalOverlay;
