import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { USER_PROFILE, TRANSLATIONS, IMAGES } from './constants';
import { generateVCard } from './utils/vCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import LegalOverlay from './components/LegalOverlay';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // ⬇️ erweitert um 'ankaufsprofil'
  const [activeLegal, setActiveLegal] = useState<'imprint' | 'privacy' | 'ankaufsprofil' | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const resolveImagePath = (path: string) => {
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/')) return path;
    return `/${path.replace(/^\.?\//, '')}`;
  };

  const handleDownloadVCard = async () => {
    setIsDownloading(true);
    try {
      await generateVCard(USER_PROFILE, resolveImagePath(USER_PROFILE.profileImage), lang);
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
    <div className={`relative min-h-screen bg-[#050505] flex flex-col items-center justify-start p-4 text-white font-serif-custom overflow-y-auto overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Language Switcher */}
      <div className="fixed top-4 left-4 z-[100] sm:top-6 sm:left-6">
        <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
      </div>

      <main className="w-full max-w-[440px] relative pt-16 pb-20">
        {/* Hauptkarte */}
        <div className={`relative bg-[#0d0d0d] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/[0.06] overflow-hidden flex flex-col items-center p-8 md:p-10 text-center transition-all duration-1000 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="absolute top-[8rem] right-8 p-2.5 rounded-full
                   bg-white/[0.04] backdrop-blur-md
                   border border-white/15
                   hover:bg-white/15 transition-all
                   active:scale-90 z-10"
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${copySuccess ? 'text-green-400' : 'text-white/40 hover:text-white/70'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>

          {/* 1. Logo Header */}
          <div className="w-full flex justify-center mb-10 pt-4">
            <div className="relative w-full h-12 flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(196,140,33,0.00) 0%, rgba(196,140,33,0.07) 5%, rgba(196,140,33,0.16) 10%, rgba(196,140,33,0.3) 15%, rgba(196,140,33,0.40) 20%, rgba(196,140,33,0.50) 25%, rgba(196,140,33,0.65) 30%, rgba(196,140,33,0.80) 35%, rgba(196,140,33,1) 43%, rgba(196,140,33,1) 57%, rgba(196,140,33,0.80) 65%, rgba(196,140,33,0.65) 70%, rgba(196,140,33,0.50) 75%, rgba(196,140,33,0.40) 80%, rgba(196,140,33,0.30) 85%, rgba(196,140,33,0.16) 90%, rgba(196,140,33,0.07) 95%, rgba(196,140,33,0.00) 100%)",
                }}
              />

              {/* Logo */}
              <div className="relative z-10 h-12 px-6 flex items-center justify-center">
                <img
                  src={resolveImagePath(IMAGES.logo)}
                  alt={USER_PROFILE.brand}
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `
                      <div class="border-y border-white/20 py-2 px-4">
                        <span class="text-[10px] tracking-[0.4em] text-white/60 uppercase font-bold">${USER_PROFILE.brand}</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Profilbild */}
          <div className="relative mb-8 group">
            <div className="w-40 h-40 rounded-full border border-white/10 p-1.5 bg-gradient-to-b from-white/10 to-transparent shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black/50">
                <img
                  src={resolveImagePath(IMAGES.profile)}
                  alt={USER_PROFILE.firstName}
                  className="w-full h-full object-cover object-[center_30%] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${USER_PROFILE.firstName}+${USER_PROFILE.lastName}&background=111&color=fff&size=512`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3. Name & Titel */}
          <div className="mb-10 w-full px-4">
            <h1 className="text-[28px] md:text-[32px] font-bold tracking-[0.02em] text-white mb-2 leading-tight">
              {USER_PROFILE.firstName} {USER_PROFILE.lastName}
            </h1>

            <p className="text-zinc-300 text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
              {USER_PROFILE.title[lang]}
            </p>

            <p className="text-zinc-400 text-[9px] tracking-[0.22em] uppercase font-medium mb-6">
              {USER_PROFILE.subtitle[lang]}
            </p>

            <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
          </div>

          {/* 4. Action Buttons */}
          <div className="w-full space-y-4 mb-10">
            {/* Save Contact Button */}
            <button
              onClick={handleDownloadVCard}
              disabled={isDownloading}
              className="w-full bg-white text-black font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-[11px] tracking-[0.25em] uppercase pl-4 relative z-10">
                {isDownloading ? '...' : t.saveContact}
              </span>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Email */}
              <a
                href={`mailto:${USER_PROFILE.email}`}
                className="bg-[#141414] border border-white/[0.08] py-5 rounded-2xl flex flex-col items-center space-y-2 hover:bg-[#1a1a1a] transition-all group"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-white/65 group-hover:text-white/90">{t.email}</span>
              </a>

              {/* LinkedIn */}
              <a
                href={USER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#141414] border border-white/[0.08] py-5 rounded-2xl flex flex-col items-center space-y-2 hover:bg-[#1a1a1a] transition-all group"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-white/65 group-hover:text-white/90">{t.linkedin}</span>
              </a>

              {/* Ankaufsprofil (öffnet Overlay wie Impressum/Datenschutz) */}
              <button
                onClick={() => setActiveLegal('ankaufsprofil')}
                className="bg-[#141414] border border-white/[0.08] py-5 rounded-2xl flex flex-col items-center space-y-2 hover:bg-[#1a1a1a] transition-all group"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H9l-2 2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-white/65 group-hover:text-white/90">
                  {t.ankaufsprofil ?? 'Ankaufsprofil'}
                </span>
              </button>
            </div>
          </div>

          {/* 5. Footer */}
          <div className="mt-auto pt-8 border-t border-white/10 w-full">
            <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-300 font-bold mb-1">
              {USER_PROFILE.legalEntity}
            </p>
            <p className="text-[7px] tracking-[0.15em] uppercase text-zinc-400 font-medium">
              {USER_PROFILE.address}
            </p>
          </div>

        </div>

        {/* Legal Links */}
        <div className={`mt-10 flex justify-center space-x-8 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={() => setActiveLegal('imprint')}
            className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            {t.imprint}
          </button>
          <button
            onClick={() => setActiveLegal('privacy')}
            className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            {t.privacy}
          </button>
        </div>
      </main>

      <LegalOverlay
        type={activeLegal}
        onClose={() => setActiveLegal(null)}
        profile={USER_PROFILE}
        lang={lang}
        t={t}
      />
    </div>
  );
};

export default App;

