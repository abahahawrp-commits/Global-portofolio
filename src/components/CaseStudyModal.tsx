import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudy, Language } from '../types';
import { translations } from '../data/translations';
import { X, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  currentLang: Language;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  currentLang,
}) => {
  const t = translations[currentLang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container with Smooth Spring Scaling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-200 z-10"
          >
            {/* Header Bar */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  <span>{caseStudy.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{caseStudy.clientLocation}</span>
                  <span aria-hidden="true">·</span>
                  <span>{caseStudy.year}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {caseStudy.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors cursor-pointer shrink-0"
                title={t.modal.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quantified Metrics Highlight Bar */}
            <div className="grid grid-cols-3 gap-3 my-6 p-4 bg-zinc-900/70 border border-zinc-800 rounded-xl text-center">
              {caseStudy.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep-Dive Problem & Solution */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{t.modal.problem}</span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-850">
                  {caseStudy.problem}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{t.modal.solution}</span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-850">
                  {caseStudy.solution}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{t.modal.technologies}</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  {t.modal.deliverables}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {caseStudy.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-zinc-500 font-bold">0{idx + 1}.</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-5 border-t border-zinc-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg cursor-pointer"
              >
                {t.modal.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
