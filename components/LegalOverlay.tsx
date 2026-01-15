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

  // Helper: simple i18n for Ankaufsprofil content
  const isDE = lang === 'de';

  const AP = {
    headline: isDE ? 'Ankaufsprofil' : 'Acquisition Profile',
    locationTitle: isDE ? 'Lage' : 'Location',
    locationText: isDE
      ? 'München (Stadtgebiet, Postleitzahlenbereiche) sowie ausgewähltes Umland'
      : 'Munich (city area, postal code districts) and selected surrounding areas',
    typesTitle: isDE ? 'Objekttypen & Investitionsvolumen' : 'Asset Types & Investment Volume',
    type1: isDE ? 'Eigentumswohnungen bis ca.' : 'Apartments up to approx.',
    type2: isDE ? 'Mehrfamilienhäuser bis ca.' : 'Multi-family buildings up to approx.',
    focusTitle: isDE ? 'Investitionsfokus' : 'Investment Focus',
    focusLead: isDE
      ? 'Wohnimmobilien mit Entwicklungs- und Wertsteigerungspotenzial, insbesondere:'
      : 'Residential real estate with development and value-add potential, in particular:',
    focusSub1: isDE ? 'Sanierungs- oder Modernisierungsbedarf' : 'Refurbishment or modernization required',
    focusSub2: isDE ? 'unter Markt vermietete Objekte mit Mietanpassungspotenzial' : 'Below-market rents with rent reversion potential',
    focusLine: isDE
      ? 'Bevorzugt leerstehende Objekte, jedoch auch vermietete Bestände von Interesse'
      : 'Preferably vacant properties, however tenanted assets are also of interest',
    brokerTitle: isDE ? 'Mehrwert für Vermittler' : 'Value for Brokers / Intermediaries',
    broker1: isDE
      ? 'Möglichkeit einer zweifachen Provision durch Wiederverkauf nach Sanierung'
      : 'Potential for a second commission through resale after refurbishment',
    broker2: isDE
      ? 'Langfristige Zusammenarbeit über Ankauf und Wiederverkauf'
      : 'Long-term cooperation across acquisition and resale',
    broker3: isDE ? 'Tippgeberprovision' : 'Referral fee',
    processTitle: isDE ? 'Ankaufs- & Abwicklungsprozess' : 'Acquisition & Execution Process',
    process1: isDE ? 'Direktankauf ohne Weitervermittlung' : 'Direct acquisition without re-brokering',
    process2: isDE ? 'Zeitnahe, diskrete und unkomplizierte Abwicklung' : 'Timely, discreet and straightforward execution',
    process3: isDE ? 'Fachmännische Objektprüfung und schnelle Kaufentscheidung' : 'Professional due diligence and fast decision-making',
    process4: isDE ? 'Kurze Entscheidungswege und klare Ankaufsparameter' : 'Short decision paths and clear acquisition criteria',
    networkTitle: isDE ? 'Zusammenarbeit & Netzwerk' : 'Network & Execution Capability',
    network1: isDE
      ? 'Umfangreiches Netzwerk aus Handwerkern, Bauunternehmen und Fachplanern'
      : 'Extensive network of trades, construction companies and specialist planners',
    network2: isDE ? 'Eingespielte Zusammenarbeit mit Notaren und Projektpartnern' : 'Established cooperation with notaries and project partners',
    network3: isDE
      ? 'Finanzierung gesichert durch etabliertes Netzwerk aus Banken und Co-Investoren'
      : 'Financing secured through an established network of banks and co-investors',
    contactLead: isDE ? 'Angebote bitte per E-Mail an:' : 'Please send offers via email to:'
  };

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
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Angaben gemäß § 5 TMG</h3>
                <p className="text-white text-base">{profile.legalEntity}</p>
                <p>{profile.address}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Vertreten durch</h3>
                <p>{profile.managingDirector}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Kontakt</h3>
                {/* Telefonnummer bewusst entfernt */}
                <p>E-Mail: {profile.imprintEmail || profile.email}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Registereintrag</h3>
                <p>Registergericht: {profile.registerCourt}</p>
                <p>Registernummer: {profile.registerNumber}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Umsatzsteuer-ID</h3>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p>{profile.vatId}</p>
              </div>
            </>
          )}

          {/* ===================== DATENSCHUTZ (vollständig, wie vorher – ohne Tel.) ===================== */}
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
                  {/* Telefonnummer bewusst entfernt */}
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
                  (sogenannte Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp,
                  Betriebssystem und Referrer-URL.
                </p>
                <p className="mt-2">
                  <span className="text-white/80 font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einem sicheren und stabilen Betrieb dieser Website).
                </p>
                <p className="mt-2">
                  Eine Verarbeitung kann auch in einem Drittland (insbesondere USA) erfolgen. Die Übermittlung
                  erfolgt auf Grundlage geeigneter Garantien, insbesondere Standardvertragsklauseln gemäß Art. 46 DSGVO.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Schriftarten</h4>
                <p>
                  Auf dieser Website werden Schriftarten lokal eingebunden. Es findet keine Verbindung zu Servern von Google
                  (z. B. fonts.googleapis.com / fonts.gstatic.com) statt.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Einbindung externer Inhalte (CDNs)</h4>
                <p>
                  Zur technischen Bereitstellung können externe Inhalte geladen werden (z. B. Tailwind CSS über cdn.tailwindcss.com
                  und JavaScript-Module über esm.sh). Dabei kann Ihre IP-Adresse an die jeweiligen Anbieter übertragen werden,
                  da ohne diese Übertragung die Inhalte technisch nicht ausgeliefert werden können.
                </p>
                <p className="mt-2">
                  <span className="text-white/80 font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einer effizienten und sicheren Bereitstellung dieser Website).
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Externe Links (z. B. LinkedIn)</h4>
                <p>
                  Diese Website enthält Links zu externen Diensten (z. B. LinkedIn). Wenn Sie einen solchen Link anklicken,
                  verlassen Sie unsere Website. Für die Verarbeitung personenbezogener Daten auf den verlinkten Seiten ist ausschließlich
                  der jeweilige Anbieter verantwortlich.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cookies & Tracking</h4>
                <p>
                  Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken und setzt keine Tracking-Tools ein.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Speicherdauer</h4>
                <p>
                  Wir verarbeiten personenbezogene Daten nur so lange, wie dies zur Erreichung der genannten Zwecke erforderlich ist
                  oder gesetzliche Aufbewahrungspflichten bestehen.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Ihre Rechte</h4>
                <p>
                  Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO),
                  Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO).
                  Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Stand</h4>
                <p>Januar 2026</p>
              </div>
            </>
          )}

          {/* ===================== ANKAUFSPROFIL (DE/EN) ===================== */}
          {type === 'ankaufsprofil' && (
            <>
              {/* Kein zweites "Ankaufsprofil" als Überschrift hier – Header reicht */}

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.locationTitle}</h4>
                <p>{AP.locationText}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.typesTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.type1} <strong>1.0m €</strong></li>
                  <li>{AP.type2} <strong>5.5m €</strong></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.focusTitle}</h4>

                {/* Genau wie von dir gewünscht: Lead + eingerückte Unterpunkte */}
                <p className="text-zinc-400">{AP.focusLead}</p>
                <ul className="mt-2 ml-5 list-disc list-outside space-y-1">
                  <li>{AP.focusSub1}</li>
                  <li>{AP.focusSub2}</li>
                </ul>
                <p className="mt-3">{AP.focusLine}</p>
              </div>

              {/* Mehrwert für Vermittler: zwischen Fokus und Prozess */}
              <div>
                <h4 className="text-white font-semibold mb-1">{AP.brokerTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.broker1}</li>
                  <li>{AP.broker2}</li>
                  <li>{AP.broker3}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.processTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.process1}</li>
                  <li>{AP.process2}</li>
                  <li>{AP.process3}</li>
                  <li>{AP.process4}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.networkTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.network1}</li>
                  <li>{AP.network2}</li>
                  <li>{AP.network3}</li>
                </ul>
              </div>

              <div className="pt-2">
                <p>
                  {AP.contactLead}
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



