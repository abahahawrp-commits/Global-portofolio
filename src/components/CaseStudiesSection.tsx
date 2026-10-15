import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudy, Language } from '../types';
import { translations } from '../data/translations';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudiesSectionProps {
  currentLang: Language;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const filteredStudies =
    selectedFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="works" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header with Scroll Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
            {t.works.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.works.title}
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            {t.works.subtitle}
          </p>
        </div>

        {/* Filter Tabs / Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.works.all}
          </button>
          <button
            onClick={() => setSelectedFilter('Full-Stack')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'Full-Stack'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.works.fullstack}
          </button>
          <button
            onClick={() => setSelectedFilter('UI/UX')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'UI/UX'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.works.uiux}
          </button>
          <button
            onClick={() => setSelectedFilter('Networking')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'Networking'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.works.networking}
          </button>
          <button
            onClick={() => setSelectedFilter('Frontend')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'Frontend'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.works.frontend}
          </button>
        </div>
      </motion.div>

      {/* Bento Grid Layout of Case Studies with Motion */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredStudies.map((study, idx) => {
            const isSpanWide = study.featured && idx === 0;

            return (
              <motion.div
                layout
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setActiveModalStudy(study)}
                className={`group bg-zinc-900/80 border border-zinc-800 hover:border-zinc-500 rounded-2xl p-7 transition-colors duration-200 cursor-pointer flex flex-col justify-between ${
                  isSpanWide ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Quiet unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-300 font-semibold uppercase">{study.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.clientLocation}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.year}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 group-hover:text-white transition-colors">
                      <span className="text-[11px] font-mono">INSPECT</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                    {study.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    {study.summary}
                  </p>
                </div>

                <div>
                  {/* Quantified Metrics Box */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl mb-6">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="text-left">
                        <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-zinc-400 pt-3 border-t border-zinc-800">
                    {study.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tech}>
                        {tech}
                        {tIdx < Math.min(study.technologies.length, 4) - 1 && (
                          <span aria-hidden="true" className="ml-3 text-zinc-700">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Case Study Modal */}
      <CaseStudyModal
        caseStudy={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        currentLang={currentLang}
      />
    </section>
  );
};
