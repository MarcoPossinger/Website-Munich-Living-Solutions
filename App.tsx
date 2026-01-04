
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { USER_PROFILE, TRANSLATIONS, IMAGES } from './constants';
import { generateVCard } from './utils/vCard';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const t = TRANSLATIONS[lang];

  const handleDownloadVCard = async () => {
    setIsDownloading(true);
    try {
      await generateVCard(USER_PROFILE, IMAGES.profile);
    } catch (e) {
      console.error("vCard Download Fehler:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${USER_PROFILE.firstName} ${USER_PROFILE.lastName} | ${USER_PROFILE.brand}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.debug('Teilen abgebrochen');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert("Link konnte nicht kopiert werden.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-white font-serif-custom overflow-hidden">
      
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      <main className="relative z-10 w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative bg-[#0a0a0a]/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/5 overflow-hidden">
          
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-all active:scale-90"
            aria-label="Teilen"
          >
            <svg className={`w-4 h-4 ${copySuccess ? 'text-green-400' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copySuccess ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              )}
            </svg>
          </button>

          <div className="p-8 pb-10 flex flex-col items-center text-center">
            
            {/* Profilbild */}
            <div className="relative mt-2 mb-6">
              <div className="relative w-44 h-44 rounded-full border border-white/10 p-1 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-white/5">
                  {IMAGES.profile ? (
                    <img 
                      src={IMAGES.profile} 
                      alt={USER_PROFILE.firstName} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        console.error("Fehler beim Laden von portrait.jpg");
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10">
                       <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h1 className="text-2xl tracking-tight text-white mb-1 font-bold">
              {USER_PROFILE.firstName} {USER_PROFILE.lastName}
            </h1>
            <div className="mb-8 space-y-1">
              <p className="text-zinc-500 text-[11px] tracking-[0.1em] uppercase">
                {USER_PROFILE.title[lang]}
              </p>
              <p className="text-white/90 font-bold text-[13px] tracking-[0.25em] uppercase">
                {USER_PROFILE.brand}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="w-full space-y-3">
              <button
                onClick={handleDownloadVCard}
                disabled={isDownloading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-zinc-200 transition-all active:scale-[0.97] disabled:opacity-70 group"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  {isDownloading ? '...' : t.saveContact}
                </span>
                {!isDownloading && (
                  <svg className="w-3 h-3 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </button>

              <div className="grid grid-cols-3 gap-3">
                <a href={`tel:${USER_PROFILE.phone}`} className="bg-white/[0.03] border border-white/5 py-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-white/10 transition-all active:scale-95 group">
                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80">{t.call}</span>
                </a>
                <a href={`mailto:${USER_PROFILE.email}`} className="bg-white/[0.03] border border-white/5 py-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-white/10 transition-all active:scale-95 group">
                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80">{t.email}</span>
                </a>
                <a href={USER_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/[0.03] border border-white/5 py-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-white/10 transition-all active:scale-95 group">
                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/80 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Logo / Impressum Area */}
            <div className="mt-10 w-full pt-8 border-t border-white/[0.03]">
              <div className="flex flex-col items-center">
                {IMAGES.logo && (
                  <img 
                    src={IMAGES.logo} 
                    alt="Logo" 
                    className="max-h-12 w-auto object-contain mb-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                        console.error("Fehler beim Laden von logo.svg");
                        e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="text-[9px] text-zinc-600 leading-relaxed tracking-widest uppercase">
                  <p>{USER_PROFILE.address}</p>
                  <p className="opacity-40 mt-1">{USER_PROFILE.legalEntity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-[9px] text-zinc-600 tracking-[0.5em] uppercase">
        <a href={USER_PROFILE.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          {USER_PROFILE.website.replace('https://', '').replace('www.', '')}
        </a>
      </footer>
    </div>
  );
};

export default App;
