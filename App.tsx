
import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import { USER_PROFILE, TRANSLATIONS, IMAGES } from './constants';
import { generateVCard } from './utils/vCard';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [profileImg, setProfileImg] = useState<string | null>(IMAGES.profile || null);
  const [logoImg, setLogoImg] = useState<string | null>(IMAGES.logo || null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>(USER_PROFILE.linkedin);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!IMAGES.profile) {
      const savedProfile = localStorage.getItem('profile_image_marco');
      if (savedProfile) setProfileImg(savedProfile);
    }
    if (!IMAGES.logo) {
      const savedLogo = localStorage.getItem('logo_image_mls');
      if (savedLogo) setLogoImg(savedLogo);
    }
    const savedLinkedin = localStorage.getItem('linkedin_url_marco');
    if (savedLinkedin) setLinkedinUrl(savedLinkedin);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'logo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'profile') {
          setProfileImg(base64String);
          localStorage.setItem('profile_image_marco', base64String);
        } else {
          setLogoImg(base64String);
          localStorage.setItem('logo_image_mls', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${USER_PROFILE.firstName} ${USER_PROFILE.lastName} | ${USER_PROFILE.brand}`;
    const text = `Hier ist die digitale Visitenkarte von ${USER_PROFILE.firstName} ${USER_PROFILE.lastName}.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        // Falls der Nutzer abbricht oder ein technischer Fehler auftritt
        console.debug('Teilen abgebrochen oder fehlgeschlagen', error);
      }
    } else {
      // Absoluter Fallback für Browser ohne Share-API (Desktop Chrome/Firefox)
      try {
        await navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert("Link konnte nicht geteilt werden. Bitte kopieren Sie die URL manuell.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white overflow-hidden font-serif-custom">
      
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      {/* Hidden Inputs for Customization */}
      <input type="file" ref={profileInputRef} onChange={(e) => handleImageUpload(e, 'profile')} className="hidden" accept="image/*" />
      <input type="file" ref={logoInputRef} onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" accept="image/*" />

      <main className="relative z-10 w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-700">
        {/* Main Card */}
        <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
          
          {/* Share Button (Top Right of Card) */}
          <div className="absolute top-8 right-8 z-20 flex flex-col items-end">
            <button 
              onClick={handleShare}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-all active:scale-95 group"
              aria-label="Visitenkarte teilen"
            >
              <svg 
                className={`w-6 h-6 transition-colors ${copySuccess ? 'text-green-400' : 'text-white/70 group-hover:text-white'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {copySuccess ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                )}
              </svg>
            </button>
            {copySuccess && (
              <span className="mt-1 text-[8px] text-white/50 uppercase tracking-widest font-bold animate-pulse">
                {lang === 'de' ? 'Link kopiert' : 'Link copied'}
              </span>
            )}
          </div>

          <div className="p-8 pb-12 flex flex-col items-center text-center">
            
            {/* Profile Picture Section */}
            <div className="relative mt-4 mb-10 cursor-pointer group" onClick={() => profileInputRef.current?.click()}>
              <div className="relative w-52 h-52 rounded-full border-2 border-white/10 p-2 transition-all duration-500 group-hover:border-white/40 group-hover:scale-[1.02]">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center shadow-2xl">
                  {profileImg ? (
                    <img src={profileImg} alt={USER_PROFILE.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-zinc-600 flex flex-col items-center">
                       <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z" />
                       </svg>
                       <p className="text-[10px] uppercase tracking-widest font-bold">Foto wählen</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 right-4 bg-white text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
            </div>

            {/* Identity Info */}
            <h1 className="text-3xl tracking-tight text-white mb-2 font-bold drop-shadow-sm">
              {USER_PROFILE.firstName} {USER_PROFILE.lastName}
            </h1>
            <div className="mb-12 space-y-1 px-4">
              <p className="text-zinc-400 font-normal text-[13px] tracking-wide">
                {USER_PROFILE.title[lang]}
              </p>
              <p className="text-white font-bold text-[15px] tracking-widest whitespace-nowrap">
                {USER_PROFILE.brand}
              </p>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-4">
              <button
                onClick={() => generateVCard({...USER_PROFILE, linkedin: linkedinUrl}, profileImg)}
                className="w-full bg-white text-black font-bold py-5 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-200 transition-all active:scale-[0.97] shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm tracking-[0.15em] uppercase font-bold">{t.saveContact}</span>
              </button>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href={`tel:${USER_PROFILE.phone}`}
                  className="bg-white/10 backdrop-blur-md border border-white/10 py-4 rounded-3xl flex flex-col items-center justify-center space-y-2 hover:bg-white/20 transition-all active:scale-[0.95]"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{t.call}</span>
                </a>

                <a
                  href={`mailto:${USER_PROFILE.email}`}
                  className="bg-white/10 backdrop-blur-md border border-white/10 py-4 rounded-3xl flex flex-col items-center justify-center space-y-2 hover:bg-white/20 transition-all active:scale-[0.95]"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{t.email}</span>
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md border border-white/10 py-4 rounded-3xl flex flex-col items-center justify-center space-y-2 hover:bg-white/20 transition-all active:scale-[0.95]"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{t.linkedin}</span>
                </a>
              </div>
            </div>

            {/* Footer Branding Area - Larger Logo */}
            <div className="mt-14 w-full space-y-8">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div 
                className="flex flex-col items-center cursor-pointer group" 
                onClick={() => logoInputRef.current?.click()}
              >
                {logoImg ? (
                  <img src={logoImg} alt="Branding" className="max-h-24 w-auto object-contain transition-all hover:scale-105 mb-4" />
                ) : (
                  <div className="flex flex-col items-center mb-4">
                    <p className="text-[11px] text-white font-bold tracking-[0.5em] uppercase mb-1">Logo hochladen</p>
                  </div>
                )}
                
                <div className="text-[10px] text-zinc-500 font-normal leading-relaxed max-w-[280px] normal-case tracking-widest">
                  <p className="mb-1">{USER_PROFILE.address}</p>
                  <p className="text-[8px] opacity-60">{USER_PROFILE.legalEntity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-12 mb-8 text-[11px] text-zinc-600 tracking-[0.5em] uppercase font-normal">
        <a href={USER_PROFILE.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
          {USER_PROFILE.website.replace('https://', '')}
        </a>
      </footer>
    </div>
  );
};

export default App;
