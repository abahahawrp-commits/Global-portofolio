import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-zinc-800/80 bg-zinc-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
        <div>
          <div className="text-white font-bold tracking-tight text-sm mb-1">
            ALEXANDER V.
          </div>
          <p className="max-w-md leading-relaxed text-zinc-400">
            {t.footer.builtWith}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <span>© {new Date().getFullYear()} ALEXANDER V.</span>
          <span aria-hidden="true" className="hidden sm:inline text-zinc-700">·</span>
          <span>{t.footer.allRights}</span>
          <span aria-hidden="true" className="hidden sm:inline text-zinc-700">·</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
