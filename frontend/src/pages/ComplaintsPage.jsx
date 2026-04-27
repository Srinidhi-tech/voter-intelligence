import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ComplaintGenerator from '../components/features/ComplaintGenerator/ComplaintGenerator';

export default function ComplaintsPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t('complaints.title')}</h1>
        <p className="text-democracy-light/70 text-lg max-w-3xl">
          {t('complaints.subtitle')}
        </p>
      </header>

      <ComplaintGenerator />

      <div className="bg-democracy-gold/10 border border-democracy-gold/30 rounded-xl p-6 mt-8">
        <h3 className="text-democracy-gold font-bold mb-2 text-lg">{t('complaints.mcc_title')}</h3>
        <p className="text-democracy-light/80 mb-4 text-sm leading-relaxed">
          {t('complaints.mcc_desc')}
        </p>
        <ul className="list-disc pl-5 text-sm text-democracy-light/70 space-y-1">
          <li>{t('complaints.mcc_rule1')}</li>
          <li>{t('complaints.mcc_rule2')}</li>
          <li>{t('complaints.mcc_rule3')}</li>
          <li>{t('complaints.mcc_rule4')}</li>
        </ul>
      </div>
    </motion.div>
  );
}
