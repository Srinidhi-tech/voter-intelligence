import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, CheckSquare, Trophy, AlertCircle } from 'lucide-react';

export default function ResultsPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t('results.title')}</h1>
        <p className="text-democracy-light/70 text-lg max-w-3xl">
          {t('results.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* VVPAT Counting Process */}
        <div className="bg-democracy-slate/20 rounded-2xl p-6 md:p-8 border border-democracy-slate/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-democracy-accent" />
            {t('results.how_counted')}
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-democracy-dark border border-democracy-slate flex items-center justify-center text-democracy-gold font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-white">{t('results.step1_title')}</h4>
                <p className="text-sm text-democracy-light/70 mt-1">{t('results.step1_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-democracy-dark border border-democracy-slate flex items-center justify-center text-democracy-gold font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-white">{t('results.step2_title')}</h4>
                <p className="text-sm text-democracy-light/70 mt-1">{t('results.step2_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-democracy-dark border border-democracy-slate flex items-center justify-center text-democracy-gold font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-white">{t('results.step3_title')}</h4>
                <p className="text-sm text-democracy-light/70 mt-1">{t('results.step3_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* First-Past-The-Post System */}
        <div className="flex flex-col gap-6">
          <div className="bg-democracy-slate/20 rounded-2xl p-6 md:p-8 border border-democracy-slate/50 flex-1">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-democracy-gold" />
              {t('results.fptp_title')}
            </h2>
            <p className="text-democracy-light/80 mb-6">
              {t('results.fptp_desc')}
            </p>
            <div className="bg-democracy-dark/50 p-4 rounded-xl border border-democracy-slate/50">
              <h4 className="font-bold text-democracy-accent mb-2">{t('results.example_title')}</h4>
              <ul className="space-y-2 text-sm text-democracy-light/70">
                <li className="flex justify-between border-b border-democracy-slate/30 pb-1"><span>{t('results.cand_a')}</span> <span>40%</span></li>
                <li className="flex justify-between border-b border-democracy-slate/30 pb-1"><span>{t('results.cand_b')}</span> <span>35%</span></li>
                <li className="flex justify-between border-b border-democracy-slate/30 pb-1"><span>{t('results.cand_c')}</span> <span>25%</span></li>
              </ul>
              <p className="text-sm text-green-400 mt-3 font-medium">
                {t('results.winner_desc')}
              </p>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200/80">
              {t('results.live_results_note')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
