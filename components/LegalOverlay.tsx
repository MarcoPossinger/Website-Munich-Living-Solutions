
import React from 'react';
import { Language, ProfileData, TranslationStrings } from '../types';

interface LegalOverlayProps {
  type: 'imprint' | 'privacy' | null;
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
            {type === 'imprint' ? t.imprint : t.privacy}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-zinc-400 text-sm leading-relaxed space-y-6">
          {type === 'imprint' ? (
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
                <p>Telefon: {profile.phone}</p>
                <p>E-Mail: {profile.email}</p>
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
          ) : (
            <>
              <div>
                <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Datenschutzerklärung</h3>
                <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:</p>
                <p className="text-white">{profile.legalEntity}<br/>{profile.address}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Erfassung allgemeiner Informationen</h4>
                <p>Wenn Sie auf diese Website zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches. Dies ist technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fällt bei Nutzung des Internets zwingend an.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Google Fonts & CDNs</h4>
                <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts von Google. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen. Wir nutzen zudem CDNs (Content Delivery Networks) wie esm.sh, um Programmcode effizient bereitzustellen. Hierbei kann Ihre IP-Adresse an Server der Anbieter übertragen werden.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Ihre Betroffenenrechte</h4>
                <p>Unter den angegebenen Kontaktdaten können Sie jederzeit folgende Rechte ausüben: Auskunft über Ihre bei uns gespeicherten Daten, Berichtigung, Löschung oder Einschränkung der Datenverarbeitung.</p>
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
