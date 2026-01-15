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
    type1Value: isDE ? '1,0 Mio €' : '€1.0m',
    type2Value: isDE ? '5,5 Mio €' : '€5.5m',
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

  const headerTitle =
    type === 'imprint'
      ? t.legal.imprint.title
      : type === 'privacy'
      ? t.legal.privacy.title
      : t.ankaufsprofil;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {headerTitle}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content – NUR Schriftgröße + line-height erhöht */}
        <div className="p-8 overflow-y-auto text-[15px] leading-7 text-zinc-400 space-y-6">

          {/* ✅ Imprint + Privacy now fully language-driven via translations (no content changes here) */}
          {(type === 'imprint' || type === 'privacy') && (
            <div className="whitespace-pre-line">
              {type === 'imprint' ? t.legal.imprint.content : t.legal.privacy.content}
            </div>
          )}

          {/* ✅ Acquisition profile stays exactly as before */}
          {type === 'ankaufsprofil' && (
            <>
              <div>
                <h4 className="text-white font-semibold mb-1">{AP.locationTitle}</h4>
                <p>{AP.locationText}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.typesTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.type1} <strong>{AP.type1Value}</strong></li>
                  <li>{AP.type2} <strong>{AP.type2Value}</strong></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.focusTitle}</h4>
                <p>{AP.focusLead}</p>
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>{AP.focusSub1}</li>
                  <li>{AP.focusSub2}</li>
                </ul>
                <p className="mt-3">{AP.focusLine}</p>
              </div>

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

              <p className="pt-2">
                {AP.contactLead}<br />
                <span className="text-white font-semibold">{profile.email}</span>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl uppercase text-[11px] tracking-widest"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalOverlay;

