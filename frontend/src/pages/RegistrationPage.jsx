import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FormNavigator from '../components/features/SmartRegistration/FormNavigator';
import PortalLink from '../components/features/SmartRegistration/PortalLink';

export default function RegistrationPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t('registration.title')}</h1>
        <p className="text-democracy-light/70 text-lg">
          {t('registration.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FormNavigator />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PortalLink />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
