import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';
import { ESTIMATOR_SERVICES, CURRENCY_RATES } from '../data/caseStudies';
import { Check, ArrowRight, Zap, Clock } from 'lucide-react';

interface ProjectEstimatorProps {
  currentLang: Language;
  onExportToContact: (scopeText: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  currentLang,
  onExportToContact,
}) => {
  const t = translations[currentLang];
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'web-api',
    'uiux-system',
    'frontend-spa',
  ]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isExpedited, setIsExpedited] = useState<boolean>(false);
  const [showCopiedNotice, setShowCopiedNotice] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const selectedItems = ESTIMATOR_SERVICES.filter((s) => selectedServices.includes(s.id));
  const baseHours = selectedItems.reduce((acc, curr) => acc + curr.baseHours, 0);
  const baseCostUSD = selectedItems.reduce((acc, curr) => acc + curr.baseCostUSD, 0);

  // Speed multiplier
  const multiplier = isExpedited ? 1.3 : 1.0;
  const finalCostUSD = Math.round(baseCostUSD * multiplier);
  const minCostUSD = Math.round(finalCostUSD * 0.9);
  const maxCostUSD = Math.round(finalCostUSD * 1.15);

  const currConfig = CURRENCY_RATES[currency];
  const minFormatted = currConfig.format(minCostUSD);
  const maxFormatted = currConfig.format(maxCostUSD);

  // Estimated Duration
  const estimatedWeeks = isExpedited
    ? Math.max(2, Math.ceil(baseHours / 35))
    : Math.max(3, Math.ceil(baseHours / 22));

  const handleExport = () => {
    const serviceNames = selectedItems.map((s) => s.title).join(', ');
    const summary = `Selected Scope: [${serviceNames}] | Est. Hours: ${baseHours}h | Timeline: ~${estimatedWeeks} weeks (${isExpedited ? 'Accelerated Priority' : 'Standard Delivery'}) | Budget Range: ${minFormatted} - ${maxFormatted}`;
    onExportToContact(summary);
    setShowCopiedNotice(true);
    setTimeout(() => setShowCopiedNotice(false), 4000);

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header with Scroll Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12"
      >
        <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {t.estimator.kicker}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {t.estimator.title}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {t.estimator.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive Scope Selection (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Step 1: Services Selector */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-7">
            <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase mb-4">
              {t.estimator.selectServices}
            </h3>

            <div className="space-y-3">
              {ESTIMATOR_SERVICES.map((srv, sIdx) => {
                const isChecked = selectedServices.includes(srv.id);
                return (
                  <motion.button
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    whileHover={{ scale: 1.005, transition: { duration: 0.15 } }}
                    className={`w-full p-4 rounded-xl border text-left transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-zinc-950 border-zinc-400 text-white'
                        : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-white border-white text-zinc-950'
                            : 'border-zinc-700 bg-zinc-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {srv.title}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">
                          ~{srv.baseHours} Engineering Hours
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-medium text-zinc-300 tabular-nums">
                      {currConfig.format(srv.baseCostUSD)}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Delivery Speed Option */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-7">
            <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase mb-4">
              {t.estimator.deliverySpeed}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setIsExpedited(false)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  !isExpedited
                    ? 'bg-zinc-950 border-zinc-400 text-white'
                    : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-zinc-300" />
                  <span className="text-sm font-bold text-white">Standard Delivery</span>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  {t.estimator.standardDelivery}
                </div>
              </button>

              <button
                onClick={() => setIsExpedited(true)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isExpedited
                    ? 'bg-zinc-950 border-zinc-400 text-white'
                    : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-zinc-200" />
                  <span className="text-sm font-bold text-white">Accelerated Priority</span>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  {t.estimator.expeditedDelivery}
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Dynamic Financial & Timeline Summary (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 sticky top-24 bg-zinc-950 border border-zinc-800 rounded-2xl p-7 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase">
              {t.estimator.summaryTitle}
            </h3>

            {/* Currency Switcher */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
              {(['USD', 'EUR', 'IDR', 'JPY'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    currency === c
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{t.estimator.estimatedHours}</span>
              <span className="text-base font-mono font-bold text-white tabular-nums">
                {baseHours} hrs
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{t.estimator.estimatedDuration}</span>
              <span className="text-base font-mono font-bold text-white tabular-nums">
                ~{estimatedWeeks} Weeks ({isExpedited ? 'Priority' : 'Standard'})
              </span>
            </div>

            <div className="pt-4 border-t border-zinc-900">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-1">
                {t.estimator.investmentEstimate}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
                {minFormatted} — {maxFormatted}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                *Includes architecture design, development sprints, automated tests, and 30-day post-launch support.
              </div>
            </div>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExport}
            disabled={selectedServices.length === 0}
            className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{t.estimator.exportBrief}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {showCopiedNotice && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 p-2.5 bg-zinc-900 border border-zinc-700 text-emerald-400 text-xs font-mono text-center rounded-lg"
              >
                {t.estimator.copiedBrief}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
