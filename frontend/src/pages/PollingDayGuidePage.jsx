import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Fingerprint, Vote, BellRing, UserCheck, Eye } from 'lucide-react';

export default function PollingDayGuidePage() {
  const { t } = useTranslation();

  const STEPS = [
    { icon: Search, title: t('polling.step1_title'), desc: t('polling.step1_desc') },
    { icon: Fingerprint, title: t('polling.step2_title'), desc: t('polling.step2_desc') },
    { icon: MapPin, title: t('polling.step3_title'), desc: t('polling.step3_desc') },
    { icon: UserCheck, title: t('polling.step4_title'), desc: t('polling.step4_desc') },
    { icon: UserCheck, title: t('polling.step5_title'), desc: t('polling.step5_desc') },
    { icon: UserCheck, title: t('polling.step6_title'), desc: t('polling.step6_desc') },
    { icon: Vote, title: t('polling.step7_title'), desc: t('polling.step7_desc') },
    { icon: Eye, title: t('polling.step8_title'), desc: t('polling.step8_desc') },
    { icon: BellRing, title: t('polling.step9_title'), desc: t('polling.step9_desc') },
    { icon: MapPin, title: t('polling.step10_title'), desc: t('polling.step10_desc') }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12 max-w-4xl mx-auto"
    >
      <header className="mb-12 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('polling.title')}</h1>
        <p className="text-democracy-light/70 text-lg">
          {t('polling.subtitle')}
        </p>
      </header>

      <div className="relative border-l-2 border-democracy-slate/50 ml-6 md:ml-12 space-y-12 pb-8">
        {STEPS.map((step, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            <div className="absolute -left-[21px] md:-left-[25px] top-1 bg-democracy-dark border-4 border-democracy-slate w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-democracy-accent font-bold">
              {idx + 1}
            </div>
            
            <div className="bg-democracy-slate/10 border border-democracy-slate/30 p-5 rounded-xl hover:bg-democracy-slate/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <step.icon className="w-5 h-5 text-democracy-gold" />
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
              </div>
              <p className="text-democracy-light/80">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
