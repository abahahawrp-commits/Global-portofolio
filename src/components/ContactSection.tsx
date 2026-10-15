import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Mail, MessageCircle, Copy, Check, Globe, Clock } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  injectedScope?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  injectedScope = '',
}) => {
  const t = translations[currentLang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState('');
  const [scope, setScope] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('$5,000 - $15,000 USD');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const contactEmailAddress = 'abahahawrp@gmail.com';
  const whatsappNumber = '6281234567890';

  useEffect(() => {
    if (injectedScope) {
      setScope(injectedScope);
    }
  }, [injectedScope]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Alexander,\n\nI would like to discuss a project.\nName/Company: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nTimezone: ${timezone || 'N/A'}\nBudget: ${budget}\nScope: ${scope || 'Full-Stack / UI/UX / Networking'}\nDetails: ${message || 'Looking forward to scheduling an intro call.'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${name || 'Client Engagement'}`);
    const body = encodeURIComponent(
      `Name / Company: ${name}\nEmail: ${email}\nTimezone: ${timezone}\nBudget Range: ${budget}\nScope: ${scope}\n\nProject Overview:\n${message}\n`
    );
    window.location.href = `mailto:${contactEmailAddress}?subject=${subject}&body=${body}`;
    setSubmittedStatus('Inquiry prepared in your default email client.');
    setTimeout(() => setSubmittedStatus(null), 5000);
  };

  return (
    <section id="contact" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header with Scroll Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12"
      >
        <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {t.contact.kicker}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {t.contact.title}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {t.contact.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Communication Hub & Office Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7">
            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
              DIRECT REACH CHANNELS
            </h3>

            <div className="space-y-4">
              {/* Copy Email Card */}
              <div className="p-4 bg-zinc-950/70 border border-zinc-850 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Primary Email</div>
                  <div className="text-sm font-mono font-medium text-white mt-0.5">
                    {contactEmailAddress}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Working Hours & SLA */}
              <div className="p-4 bg-zinc-950/70 border border-zinc-850 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Availability Schedule</span>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  {t.contact.officeHours}
                </div>
              </div>

              {/* Geographic Footprint */}
              <div className="p-4 bg-zinc-950/70 border border-zinc-850 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase mb-1">
                  <Globe className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Cross-Border Collaboration</span>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  Seamless contract execution, NDAs, and payment via Wire Transfer, Wise, Stripe, or Crypto (USDC/USDT).
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Structured Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7 sm:p-8"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                  {t.contact.formName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova / Veloce Labs"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                  {t.contact.formEmail} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                  {t.contact.formTimezone}
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. San Francisco (PST) or Berlin (CET)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                  {t.contact.formBudget}
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400"
                >
                  <option value="<$5,000 USD">&lt; $5,000 USD (Advisory / Audit)</option>
                  <option value="$5,000 - $15,000 USD">$5,000 - $15,000 USD (MVP / Sprint)</option>
                  <option value="$15,000 - $35,000 USD">$15,000 - $35,000 USD (Full Architecture)</option>
                  <option value=">$35,000 USD">&gt; $35,000 USD (Enterprise Scale)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                {t.contact.formServices}
              </label>
              <input
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Full-Stack Web, UI/UX Design System, Edge Infrastructure..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                {t.contact.formMessage}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe what you're building, target milestones, and key technical criteria..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <AnimatePresence>
              {submittedStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="p-3 bg-zinc-950 border border-zinc-700 text-emerald-400 text-xs font-mono rounded-lg"
                >
                  {submittedStatus}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{t.contact.submitEmail}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.contact.submitWhatsApp}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
