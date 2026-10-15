import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { WORLD_CLOCKS } from '../data/caseStudies';
import { Clock, ShieldCheck, Zap, Globe2 } from 'lucide-react';

interface HeroSectionProps {
  currentLang: Language;
  onExploreWork: () => void;
  onOpenEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onExploreWork,
  onOpenEstimator,
}) => {
  const t = translations[currentLang];
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const updated: { [key: string]: string } = {};

      WORLD_CLOCKS.forEach((clock) => {
        try {
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          updated[clock.code] = formatter.format(now);
        } catch {
          updated[clock.code] = '12:00:00';
        }
      });

      setTimes(updated);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 pt-16 md:pt-24 pb-16 px-6 max-w-7xl mx-auto">
      {/* 2-Column Split Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
        {/* Left Column: Typographic Hierarchy & Action with Staggered Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div>
            {/* Clean unboxed kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4"
            >
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">EST. 2018</span>
            </motion.div>

            {/* Oversized Architectural Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance"
            >
              <span>{t.hero.headlinePart1}</span>{' '}
              <span className="text-zinc-400 font-light italic">
                {t.hero.headlinePart2}
              </span>
            </motion.h1>

            {/* Lead Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mb-8"
            >
              {t.hero.description}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <button
                onClick={onOpenEstimator}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={onExploreWork}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-colors rounded-lg whitespace-nowrap cursor-pointer"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>
          </div>

          {/* Clean Static Availability Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-medium text-zinc-300">{t.hero.liveAvailability}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="font-mono text-zinc-400">Response &lt; 4 Hours</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Architectural Engineering Matrix Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7 lg:h-full"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                ENGINEERING SPECIFICATION
              </span>
              <span className="text-xs font-mono text-zinc-400">P99.9% RELIABILITY</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                <Zap className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    Sub-Millisecond Edge Architecture
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Anycast routing nodes deployed across Europe, North America, and Asia.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    Resilient Zero-Trust Topologies
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    End-to-end encrypted micro-segmentation with WireGuard & automated failover.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                <Globe2 className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    Human-Centric High-Conversion UI/UX
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Design systems built on cognitive research, responsive math, and 60 FPS animation.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick SLA Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-zinc-800/80 text-center">
            <div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">99.999%</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Uptime SLA</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">100/100</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Web Vitals</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">&lt; 18ms</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Edge Latency</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-Width Row Below the Split: Real-Time World Clocks & Timezone Availability */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 pt-8 border-t border-zinc-800/80"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{t.hero.worldClocksTitle}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {WORLD_CLOCKS.map((clock, cIdx) => {
            const timeStr = times[clock.code] || '--:--:--';
            const hour = parseInt(timeStr.split(':')[0], 10) || 12;
            const isWorkingHour = hour >= 8 && hour <= 21;

            return (
              <motion.div
                key={clock.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + cIdx * 0.08 }}
                className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{clock.city}</div>
                  <div className="text-[11px] text-zinc-400">{clock.country}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-zinc-200 tabular-nums">
                    {timeStr}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isWorkingHour ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-zinc-400">
                      {isWorkingHour ? 'Active' : 'Standby'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
