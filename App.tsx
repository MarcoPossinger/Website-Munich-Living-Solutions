
import React, { useState } from 'react';
import { Language } from './types';
import { USER_PROFILE, TRANSLATIONS, IMAGES } from './constants';
import { generateVCard } from './utils/vCard';
import LanguageSwitcher from './components/LanguageSwitcher';

// Changed to default export to match index.tsx import
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const t = TRANSLATIONS[lang];

  // Sicherere Methode zum Auflösen von Bildpfaden relativ zur Basis-URL
  const resolveImagePath = (path: string) => {
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return `./${path}`;
  };

  const handleDownloadVCard = async () => {
    setIsDownloading(true);
    try {
      await generateVCard(USER_PROFILE, resolveImagePath(IMAGES.profile));
    } catch (e) {
      console.error("vCard Fehler:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `${USER_PROFILE.firstName} ${USER_PROFILE.lastName}`,
          url: window.location.href 
        });
      } catch (error) { /* Ignore */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 text-white font-serif-custom overflow-y-auto overflow-x-hidden">
      
      {/* Language Switcher */}
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      <main className="w-full max-w-[420px] relative py-12">
        {/* Hauptkarte */}
        <div className="relative bg-[#0d0d0d] rounded-[3rem] shadow-[0_40px_150px_rgba(0,0,0,1)] border border-white/[0.05] overflow-hidden flex flex-col items-center p-8 md:p-10 text-center">
          
          {/* Share Button oben rechts */}
          <button 
            onClick={handleShare}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all active:scale-90"
          >
            <svg className={`w-4 h-4 ${copySuccess ? 'text-green-400' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* Profilbild mit elegantem kreisförmigen Rahmen */}
          <div className="relative mb-10 mt-4">
            <div className="w-48 h-48 rounded-full border border-white/10 p-1.5 bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-black/50">
                <img 
                  src="portrait.jpg"
                  alt={USER_PROFILE.firstName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback falls Bildpfad immer noch Probleme macht
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${USER_PROFILE.firstName}+${USER_PROFILE.lastName}&background=111&color=fff&size=512`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Namen & Branding */}
          <div className="mb-12">
            <h1 className="text-[32px] font-bold tracking-tight text-white mb-2 leading-tight">
              {USER_PROFILE.firstName} {USER_PROFILE.lastName}
            </h1>
            <p className="text-zinc-500 text-[10px] tracking-[0.25em] uppercase mb-1 font-semibold">
              {USER_PROFILE.title[lang]}
            </p>
            <p className="text-white font-bold text-[13px] tracking-[0.3em] uppercase pt-1 border-t border-white/5 inline-block">
              {USER_PROFILE.brand}
            </p>
          </div>

          {/* Buttons-Sektion */}
          <div className="w-full space-y-5">
            {/* Kontakt Speichern - Markanter Button */}
            <button
              onClick={handleDownloadVCard}
              disabled={isDownloading}
              className="w-full bg-white text-black font-bold py-5 rounded-[1.4rem] flex items-center justify-center space-x-3 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
            >
              <span className="text-[12px] tracking-[0.25em] uppercase pl-4">
                {isDownloading ? '...' : t.saveContact}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Grid für die restlichen Aktionen (dunkles Design wie im Screenshot) */}
            <div className="grid grid-cols-3 gap-4">
              <a href={`tel:${USER_PROFILE.phone}`} className="bg-[#141414] border border-white/[0.04] py-6 rounded-[1.4rem] flex flex-col items-center space-y-3 hover:bg-[#1c1c1c] transition-all group">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60">{t.call}</span>
              </a>
              <a href={`mailto:${USER_PROFILE.email}`} className="bg-[#141414] border border-white/[0.04] py-6 rounded-[1.4rem] flex flex-col items-center space-y-3 hover:bg-[#1c1c1c] transition-all group">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60">{t.email}</span>
              </a>
              <a href={USER_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#141414] border border-white/[0.04] py-6 rounded-[1.4rem] flex flex-col items-center space-y-3 hover:bg-[#1c1c1c] transition-all group">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60">{t.linkedin}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
