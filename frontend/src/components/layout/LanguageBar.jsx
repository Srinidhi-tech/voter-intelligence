import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' }
];

export default function LanguageBar() {
  const { i18n } = useTranslation();

  return (
    <div className="bg-democracy-slate/10 border-b border-democracy-slate/30 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-8 h-12">
        <div className="flex items-center gap-2 text-democracy-light/50">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Select Language</span>
        </div>
        
        <div className="flex h-full">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`px-4 lg:px-6 h-full text-sm font-bold transition-all relative group ${
                i18n.language === lang.code 
                  ? 'text-democracy-accent' 
                  : 'text-democracy-light/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.label}
              {i18n.language === lang.code && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-democracy-accent shadow-[0_0_10px_#fbbf24]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
