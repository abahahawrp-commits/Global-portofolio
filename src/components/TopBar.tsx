import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface TopBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEstimator: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenEstimator,
}) => {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, no subtitle pill) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0"
        >
          ALEXANDER V.
        </a>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-zinc-400">
          <a
            href="#disciplines"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.nav.about}
          </a>
          <a
            href="#network"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.nav.network}
          </a>
          <a
            href="#works"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.nav.work}
          </a>
          <a
            href="#estimator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.nav.estimator}
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* Zone 3: Language Selector & Primary CTA Action */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Multi-language segmented selector */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('id')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currentLang === 'id'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => onLanguageChange('ja')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currentLang === 'ja'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              JA
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenEstimator}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <span>{t.nav.cta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 px-6 py-4 space-y-3">
          <a
            href="#disciplines"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-1.5"
          >
            {t.nav.about}
          </a>
          <a
            href="#network"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-1.5"
          >
            {t.nav.network}
          </a>
          <a
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-1.5"
          >
            {t.nav.work}
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-1.5"
          >
            {t.nav.estimator}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-1.5"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </header>
  );
};
