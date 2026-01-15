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

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {type === 'imprint' ? t.imprint : type === 'privacy' ? t.privacy : t.ankaufsprofil}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content – NUR Schriftgröße + line-height erhöht */}
        <div className="p-8 overflow-y-auto text-[15px] leading-7 text-zinc-400 space-y-6">

          {type === 'imprint' && (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">{isDE ? 'Angaben gemäß § 5 TMG' : 'Information pursuant to Section 5 German Telemedia Act (TMG)'}</h3>
                <p className="text-white">{profile.legalEntity}</p>
                <p>{profile.address}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">{isDE ? 'Vertreten durch' : 'Represented by'}</h3>
                <p>{profile.managingDirector}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">{isDE ? 'Kontakt' : 'Contact'}</h3>
                <p>{isDE ? 'E-Mail: ' : 'Email: '}{profile.imprintEmail || profile.email}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">{isDE ? 'Registereintrag' : 'Commercial Register'}</h3>
                <p>{isDE ? 'Registergericht: ' : 'Register court: '}{profile.registerCourt}</p>
                <p>{isDE ? 'Registernummer: ' : 'Registration number: '}{profile.registerNumber}</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">{isDE ? 'Umsatzsteuer-ID' : 'VAT ID'}</h3>
                <p>{profile.vatId}</p>
              </div>
            </>
          )}

          {type === 'privacy' && (
  <>
    <div>
      <h3 className="text-white font-bold mb-2 uppercase text-[11px] tracking-widest">
        {isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
      </h3>
      <p className="text-white">
        {profile.legalEntity}
        <br />
        {profile.address}
      </p>
      <p className="mt-2">
        {isDE ? 'Vertreten durch: ' : 'Represented by: '}{profile.managingDirector}
        <br />
        {isDE ? 'E-Mail: ' : 'Email: '}{profile.imprintEmail || profile.email}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Allgemeine Hinweise' : 'General information'}</h4>
      <p>
        {isDE
          ? 'Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Personenbezogene Daten werden auf dieser Website nur im technisch notwendigen Umfang verarbeitet.'
          : 'We take the protection of your personal data seriously. Personal data is processed on this website only to the extent technically necessary.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Hosting' : 'Hosting'}</h4>
      <p>
        {isDE
          ? 'Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Website verarbeitet der Hosting-Anbieter technische Zugriffsdaten (sogenannte Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp, Betriebssystem und Referrer-URL.'
          : 'This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you access the website, the hosting provider processes technical access data (so-called server log files), e.g., IP address, date and time of access, browser type, operating system and referrer URL.'}
      </p>
      <p className="mt-2">
        <span className="text-white/80 font-semibold">{isDE ? 'Rechtsgrundlage:' : 'Legal basis:'}</span>{' '}
        {isDE
          ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb dieser Website).'
          : 'Art. 6(1)(f) GDPR (legitimate interest in the secure and stable operation of this website).'}
      </p>
      <p className="mt-2">
        {isDE
          ? 'Eine Verarbeitung kann auch in einem Drittland (insbesondere USA) erfolgen. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien, insbesondere Standardvertragsklauseln gemäß Art. 46 DSGVO.'
          : 'Processing may also take place in a third country (in particular the USA). The transfer is based on appropriate safeguards, in particular standard contractual clauses pursuant to Art. 46 GDPR.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Schriftarten' : 'Fonts'}</h4>
      <p>
        {isDE
          ? 'Auf dieser Website werden Schriftarten lokal eingebunden. Es findet keine Verbindung zu Servern von Google (z. B. fonts.googleapis.com / fonts.gstatic.com) statt.'
          : 'Fonts are embedded locally on this website. No connection is made to Google servers (e.g., fonts.googleapis.com / fonts.gstatic.com).'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Einbindung externer Inhalte (CDNs)' : 'Loading external content (CDNs)'}</h4>
      <p>
        {isDE
          ? 'Zur technischen Bereitstellung können externe Inhalte geladen werden (z. B. Tailwind CSS über cdn.tailwindcss.com und JavaScript-Module über esm.sh). Dabei kann Ihre IP-Adresse an die jeweiligen Anbieter übertragen werden, da ohne diese Übertragung die Inhalte technisch nicht ausgeliefert werden können.'
          : 'For technical delivery, external content may be loaded (e.g., Tailwind CSS via cdn.tailwindcss.com and JavaScript modules via esm.sh). Your IP address may be transmitted to the respective providers, as the content cannot be delivered technically without this transmission.'}
      </p>
      <p className="mt-2">
        <span className="text-white/80 font-semibold">{isDE ? 'Rechtsgrundlage:' : 'Legal basis:'}</span>{' '}
        {isDE
          ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten und sicheren Bereitstellung dieser Website).'
          : 'Art. 6(1)(f) GDPR (legitimate interest in efficient and secure delivery of this website).'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Externe Links (z. B. LinkedIn)' : 'External links (e.g., LinkedIn)'}</h4>
      <p>
        {isDE
          ? 'Diese Website enthält Links zu externen Diensten (z. B. LinkedIn). Wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website. Für die Verarbeitung personenbezogener Daten auf den verlinkten Seiten ist ausschließlich der jeweilige Anbieter verantwortlich.'
          : 'This website contains links to external services (e.g., LinkedIn). If you click such a link, you leave our website. The respective provider is solely responsible for processing personal data on the linked pages.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Cookies & Tracking' : 'Cookies & tracking'}</h4>
      <p>
        {isDE
          ? 'Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken und setzt keine Tracking-Tools ein.'
          : 'This website does not use cookies for analytics or marketing purposes and does not use tracking tools.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Speicherdauer' : 'Retention period'}</h4>
      <p>
        {isDE
          ? 'Wir verarbeiten personenbezogene Daten nur so lange, wie dies zur Erreichung der genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.'
          : 'We process personal data only for as long as necessary to achieve the stated purposes or as required by statutory retention obligations.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Ihre Rechte' : 'Your rights'}</h4>
      <p>
        {isDE
          ? 'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.'
          : 'You have the right to access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR) and to object (Art. 21 GDPR). You also have the right to lodge a complaint with a data protection supervisory authority.'}
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2">{isDE ? 'Stand' : 'Status'}</h4>
      <p>{isDE ? 'Januar 2026' : 'January 2026'}</p>
    </div>
  </>
)}


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
