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

  // ✅ Automatic Month + Year (DE/EN)
  const legalDate = new Date().toLocaleDateString(
    isDE ? 'de-DE' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  const AP = {
    headline: isDE ? 'Ankaufsprofil' : 'Acquisition Profile',

    locationTitle: isDE ? 'Lage' : 'Location',
    locationText: isDE
      ? 'Stadtgebiet München sowie angrenzende Landkreise'
      : 'City of Munich as well as adjacent districts',

    typesTitle: isDE ? 'Objekttypen & Investitionsvolumen' : 'Asset Types & Investment Volume',
    type1: isDE ? 'Eigentumswohnungen bis ca.' : 'Condominiums (apartments) up to approx.',
    type2: isDE ? 'Mehrfamilienhäuser bis ca.' : 'Multi-family buildings up to approx.',
    type1Value: isDE ? '1,0 Mio €' : '€1.0m',
    type2Value: isDE ? '5,5 Mio €' : '€5.5m',

    focusTitle: isDE ? 'Investitionsfokus' : 'Investment Focus',
    focusLead: isDE
      ? 'Wohnimmobilien mit Entwicklungs- und Wertsteigerungspotenzial, d.h.:'
      : 'Residential real estate with development and value-add potential, i.e.:',
    focusSub1: isDE ? 'Sanierungs- oder modernisierungsbedürftige Objekte' : 'Properties requiring refurbishment or modernization',
    focusSub2: isDE ? 'unter aktuellem Marktniveau vermietete Objekte' : 'Properties let below current market levels',

    redesignTitle: isDE ? 'Objekte mit Umgestaltungspotential:' : 'Properties with reconfiguration potential:',
    redesignEtw: isDE ? 'ETW: Grundrissoptimierung (z. B. WG-Konzept)' : 'Condominiums: layout optimisation (e.g., shared-living/WG concept)',
    redesignMfh: isDE
      ? 'MFH: Aufteilung, Flächenerweiterung durch Aufstockung, An-, Um- oder Neubau'
      : 'Multi-family buildings: subdivision, area expansion via additional floors, extensions, conversions or new builds',

    focusLine: isDE
      ? 'Bevorzugt leerstehende Objekte, jedoch auch vermietete Bestände von Interesse'
      : 'Preferably vacant assets, however tenanted portfolios are also of interest',

    brokerTitle: isDE ? 'Mehrwert für Vermittler' : 'Value for Brokers / Intermediaries',
    broker1: isDE
      ? 'Möglichkeit einer zweifachen Provision durch Wiederverkauf nach Sanierung'
      : 'Potential for a second commission through resale after refurbishment',
    broker2: isDE
      ? 'Langfristige Zusammenarbeit über Ankauf und Wiederverkauf größerer Stückzahlen'
      : 'Long-term cooperation across acquisition and resale of larger volumes',

    processTitle: isDE ? 'Ankaufs- & Abwicklungsprozess' : 'Acquisition & Execution Process',
    process1: isDE ? 'Fachmännische Objektprüfung' : 'Professional property review / due diligence',
    process2: isDE ? 'Kurze Entscheidungswege' : 'Short decision-making paths',
    process3: isDE ? 'Schnelle Angebotsabgabe' : 'Fast offer submission',
    process4: isDE
      ? 'Schnelle Kaufentscheidung aufgrund klar definierter Ankaufsparameter'
      : 'Fast purchase decision based on clearly defined acquisition criteria',
    process5: isDE ? 'Schnelle Finanzierungszusage' : 'Fast financing confirmation',
    process6: isDE ? 'Zeitnahe und unkomplizierte Abwicklung' : 'Timely and straightforward execution',

    networkTitle: isDE ? 'Netzwerk & Partnerschaften' : 'Network & Partnerships',
    network1: isDE
      ? 'Umfangreiches Netzwerk aus Handwerkern, Bauunternehmen und Fachplanern'
      : 'Extensive network of trades, construction companies and specialist planners',
    network2: isDE ? 'Eingespielte Zusammenarbeit mit Notaren und Projektpartnern' : 'Established cooperation with notaries and project partners',
    network3: isDE
      ? 'Finanzierung gesichert durch etabliertes Netzwerk aus Banken und Co-Investoren'
      : 'Financing secured through an established network of banks and co-investors',

    contactLead: isDE ? 'Angebote bitte per E-Mail an:' : 'Please send offers via email to:',
    contactEmail: 'akquise@munichlivingsolutions.de',
  };

  return (
    <div
      className="
        fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4
        bg-[#04031A]/55 backdrop-blur-[10px]
      "
    >
      {/* Subtle ink-navy gradient + vignette (matches main page vibe) */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(1200px_800px_at_50%_20%,rgba(68,46,155,0.20),transparent_60%),
              radial-gradient(900px_600px_at_20%_80%,rgba(16,82,165,0.14),transparent_60%),
              radial-gradient(1000px_700px_at_80%_85%,rgba(120,66,190,0.12),transparent_62%)]
        "
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Modal Card */}
      <div
        className="
          relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col
          rounded-t-[2rem] sm:rounded-[2rem]
          border-t sm:border border-white/[0.07]
          bg-[#070628]/82 backdrop-blur-xl
          shadow-[0_60px_140px_-40px_rgba(0,0,0,0.88)]
        "
      >
        {/* Halo behind card (like main page) */}
        <div
          className="
            pointer-events-none absolute -inset-10 opacity-90
            bg-[radial-gradient(600px_420px_at_50%_10%,rgba(16,82,165,0.26),transparent_58%),
                radial-gradient(520px_380px_at_85%_30%,rgba(120,66,190,0.22),transparent_60%),
                radial-gradient(520px_420px_at_15%_35%,rgba(68,46,155,0.20),transparent_62%)]
          "
        />

        {/* Header */}
        <div className="relative p-6 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.025]">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {type === 'imprint' ? t.legal.imprint.title : type === 'privacy' ? t.legal.privacy.title : t.ankaufsprofil}
          </h2>
          <button
            onClick={onClose}
            className="
              p-2 rounded-full
              bg-white/[0.035] border border-white/[0.09]
              text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.13]
              transition-colors
            "
            aria-label={t.close}
          >
            ✕
          </button>
        </div>

        {/* Content – nur Design: Farben/Spacing/Typo, Inhalt unverändert */}
        <div className="relative p-8 overflow-y-auto text-[15px] leading-7 text-white/70 space-y-6">
          {type === 'imprint' && (
            <>
              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Angaben gemäß § 5 TMG' : 'Information pursuant to Section 5 German Telemedia Act (TMG)'}
                </h3>
                <p className="text-white">{profile.legalEntity}</p>
                <p className="text-white/70">{profile.address}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Vertreten durch' : 'Represented by'}
                </h3>
                <p className="text-white/70">{profile.managingDirector}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Kontakt' : 'Contact'}
                </h3>
                <p className="text-white/70">{isDE ? 'E-Mail: ' : 'Email: '}{profile.imprintEmail || profile.email}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Registereintrag' : 'Commercial Register'}
                </h3>
                <p className="text-white/70">{isDE ? 'Registergericht: ' : 'Register court: '}{profile.registerCourt}</p>
                <p className="text-white/70">{isDE ? 'Registernummer: ' : 'Registration number: '}{profile.registerNumber}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Umsatzsteuer-ID' : 'VAT ID'}
                </h3>
                <p className="text-white/70">{profile.vatId}</p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div>
                <h3 className="text-white/90 font-bold mb-2 uppercase text-[11px] tracking-widest">
                  {isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </h3>
                <p className="text-white">
                  {profile.legalEntity}
                  <br />
                  {profile.address}
                </p>
                <p className="mt-2 text-white/70">
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
                  <span className="text-white/85 font-semibold">{isDE ? 'Rechtsgrundlage:' : 'Legal basis:'}</span>{' '}
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
                  <span className="text-white/85 font-semibold">{isDE ? 'Rechtsgrundlage:' : 'Legal basis:'}</span>{' '}
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
                <p>{legalDate}</p>
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
                  <li>{AP.type1} <strong className="text-white">{AP.type1Value}</strong></li>
                  <li>{AP.type2} <strong className="text-white">{AP.type2Value}</strong></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.focusTitle}</h4>
                <p>{AP.focusLead}</p>

                {/* ✅ Struktur-Fix (einzige inhaltliche Änderung): 
                    "Objekte mit Umgestaltungspotential:" als gleichrangiger Punkt,
                    ETW/MFH als Unterpunkte */}
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>{AP.focusSub1}</li>
                  <li>{AP.focusSub2}</li>
                  <li>
                    {/* ✅ Styling-Fix: gleiche Hierarchie-Optik wie andere Bulletpoints */}
                    <span className="text-white/70 font-normal">{AP.redesignTitle}</span>
                    <ul className="mt-2 ml-5 list-disc space-y-1">
                      <li>{AP.redesignEtw}</li>
                      <li>{AP.redesignMfh}</li>
                    </ul>
                  </li>
                </ul>

                <p className="mt-3">{AP.focusLine}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.brokerTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.broker1}</li>
                  <li>{AP.broker2}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-1">{AP.processTitle}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{AP.process1}</li>
                  <li>{AP.process2}</li>
                  <li>{AP.process3}</li>
                  <li>{AP.process4}</li>
                  <li>{AP.process5}</li>
                  <li>{AP.process6}</li>
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
                <span className="text-white font-semibold">{AP.contactEmail}</span>
              </p>
            </>
          )}
        </div>

        {/* Footer (match main glass buttons) */}
        <div className="relative p-6 border-t border-white/[0.07] bg-white/[0.025]">
          <button
            onClick={onClose}
            className="
              w-full py-4 rounded-xl uppercase text-[11px] tracking-widest font-bold text-white
              bg-white/[0.04] hover:bg-white/[0.065]
              border border-white/[0.07] hover:border-white/[0.12]
              shadow-[0_18px_50px_-24px_rgba(0,0,0,0.85)]
              transition-colors
            "
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalOverlay;

