
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
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
      >
        <span className="text-lg">{selected?.flag}</span>
        <span className="font-medium">{selected?.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                currentLang === lang.code ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
