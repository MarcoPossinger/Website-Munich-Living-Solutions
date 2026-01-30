import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const selected = languages.find(l => l.code === currentLang);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] px-4 py-2 rounded-full text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        <span className="text-base">{selected?.flag}</span>
        <span className="font-bold text-xs tracking-widest text-white/80">{selected?.code.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 text-white/70 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-3 w-40 bg-[#05031A]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[110]">
          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-4 text-left transition-colors ${
                  isActive
                    ? 'bg-white/[0.06] text-white'
                    : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className={`text-xs tracking-widest uppercase ${isActive ? 'font-bold' : 'font-semibold'}`}>
                  {lang.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

