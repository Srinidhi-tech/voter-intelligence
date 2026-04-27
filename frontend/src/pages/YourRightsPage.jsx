import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Scale, ShieldOff, Accessibility, XSquare, ShieldAlert } from 'lucide-react';

export default function YourRightsPage() {
  const { t } = useTranslation();

  const RIGHTS = [
    {
      icon: ShieldOff,
      title: t('rights.right1_title'),
      desc: t('rights.right1_desc'),
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/30'
    },
    {
      icon: XSquare,
      title: t('rights.right2_title'),
      desc: t('rights.right2_desc'),
      color: 'text-red-400',
      bg: 'bg-red-400/10 border-red-400/30'
    },
    {
      icon: Scale,
      title: t('rights.right3_title'),
      desc: t('rights.right3_desc'),
      color: 'text-green-400',
      bg: 'bg-green-400/10 border-green-400/30'
    },
    {
      icon: Accessibility,
      title: t('rights.right4_title'),
      desc: t('rights.right4_desc'),
      color: 'text-purple-400',
      bg: 'bg-purple-400/10 border-purple-400/30'
    },
    {
      icon: ShieldAlert,
      title: t('rights.right5_title'),
      desc: t('rights.right5_desc'),
      color: 'text-orange-400',
      bg: 'bg-orange-400/10 border-orange-400/30'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('rights.title')}</h1>
        <p className="text-democracy-light/70 text-lg max-w-2xl mx-auto">
          {t('rights.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {RIGHTS.map((right, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border ${right.bg} flex flex-col items-center text-center transition-transform hover:-translate-y-1`}>
            <div className={`p-4 rounded-full bg-democracy-dark/50 mb-4 ${right.color}`}>
              <right.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{right.title}</h3>
            <p className="text-democracy-light/80 leading-relaxed text-sm">
              {right.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-red-400 mb-4 uppercase tracking-widest">{t('rights.warning')}</h2>
        <p className="text-democracy-light/80 text-lg">
          {t('rights.warning_desc')} 
          {' '}
          <a href="/complaints" className="text-democracy-accent hover:underline font-bold">{t('nav.complaints')}</a>
        </p>
      </div>
    </motion.div>
  );
}
