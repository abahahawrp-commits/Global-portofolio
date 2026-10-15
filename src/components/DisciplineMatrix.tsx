import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { DISCIPLINES_DATA } from '../data/caseStudies';
import { Code2, Palette, Network, Monitor, CheckCircle2, ChevronRight } from 'lucide-react';

interface DisciplineMatrixProps {
  currentLang: Language;
}

export const DisciplineMatrix: React.FC<DisciplineMatrixProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'web' | 'uiux' | 'networking' | 'frontend'>('web');

  const icons = {
    web: Code2,
    uiux: Palette,
    networking: Network,
    frontend: Monitor,
  };

  const activeData = DISCIPLINES_DATA.find((d) => d.id === activeTab) || DISCIPLINES_DATA[0];

  return (
    <section id="disciplines" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Scroll-triggered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12"
      >
        <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {t.disciplines.sectionKicker}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {t.disciplines.sectionTitle}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {t.disciplines.sectionSubtitle}
        </p>
      </motion.div>

      {/* 4 Staggered Discipline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {DISCIPLINES_DATA.map((disc, idx) => {
          const Icon = icons[disc.id];
          const isActive = activeTab === disc.id;
          const numStr = `0${idx + 1}.`;

          return (
            <motion.button
              key={disc.id}
              onClick={() => setActiveTab(disc.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-6 rounded-2xl border text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-zinc-900 border-zinc-400 shadow-lg text-white'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-500 font-medium">
                    {numStr}
                  </span>
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-1 tracking-tight">
                  {t.disciplines[disc.id]?.title || disc.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {t.disciplines[disc.id]?.subtitle || disc.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono font-medium pt-2 border-t border-zinc-800">
                <span className={isActive ? 'text-white font-semibold' : 'text-zinc-400'}>
                  {isActive ? 'Active Inspection' : 'Inspect Discipline'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'translate-x-0.5' : ''}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel with Animated Presence */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-7 lg:p-9 shadow-xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Description & Verified Metrics */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <span>DEEP-DIVE CAPABILITY</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-300 font-semibold">{activeData.id.toUpperCase()} ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {t.disciplines[activeData.id]?.title || activeData.title}
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                {t.disciplines[activeData.id]?.description || activeData.description}
              </p>

              <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-xl mb-6">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  Engineering Architecture Focus
                </div>
                <div className="text-sm text-zinc-200 leading-relaxed">
                  {activeData.architectureFocus}
                </div>
              </div>

              {/* Unboxed Metadata Skills List */}
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Core Technology Stack & Protocols
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-300">
                  {activeData.skills.map((skill, sIdx) => (
                    <span key={skill} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{skill}</span>
                      {sIdx < activeData.skills.length - 1 && (
                        <span aria-hidden="true" className="text-zinc-700 ml-2">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quantitative SLAs & Benchmark Box */}
            <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-6">
              <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase pb-3 border-b border-zinc-800 mb-6">
                VERIFIED SLA & PERFORMANCE BENCHMARKS
              </div>

              <div className="space-y-5">
                {activeData.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <span className="text-xs text-zinc-400">{m.label}</span>
                    <span className="text-base font-mono font-bold text-white tabular-nums">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 text-xs font-mono text-zinc-400 leading-relaxed">
                Audited in automated CI/CD load testing pipelines with simulated multi-region latency.
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
