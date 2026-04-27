import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { UserSearch, AlertOctagon, Landmark, CheckCircle, XCircle } from 'lucide-react';

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'Aarav Sharma',
    party: 'Progressive Party',
    education: 'M.A. Public Administration',
    criminalCases: 0,
    assets: '₹ 1.2 Crores',
    liabilities: '₹ 15 Lakhs',
    promises: [
      { text: 'Built 2 new primary schools', status: 'fulfilled' },
      { text: '24/7 Water supply in Ward 7', status: 'unfulfilled' },
      { text: 'Repaired Main Arterial Road', status: 'fulfilled' }
    ]
  },
  {
    id: 2,
    name: 'Priya Patel',
    party: 'Unity Coalition',
    education: 'B.Com, L.L.B',
    criminalCases: 2,
    assets: '₹ 4.5 Crores',
    liabilities: '₹ 2.1 Crores',
    promises: [
      { text: 'Subsidized Public Transport', status: 'unfulfilled' },
      { text: 'New Women Safety Taskforce', status: 'fulfilled' }
    ]
  }
];

export default function CandidateIntelPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <UserSearch className="w-8 h-8 text-democracy-accent" />
          {t('candidate.title')}
        </h1>
        <p className="text-democracy-light/70 text-lg max-w-3xl">
          {t('candidate.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_CANDIDATES.map(candidate => (
          <div key={candidate.id} className="bg-democracy-slate/20 rounded-2xl p-6 border border-democracy-slate/50">
            <div className="flex justify-between items-start mb-6 border-b border-democracy-slate/50 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                <p className="text-democracy-gold font-medium">{candidate.party}</p>
                <p className="text-sm text-democracy-light/60 mt-1">{t('candidate.edu')}: {candidate.education}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg font-bold flex flex-col items-center border ${candidate.criminalCases > 0 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                <AlertOctagon className="w-6 h-6 mb-1" />
                <span className="text-xs uppercase tracking-wider">{t('candidate.cases')}: {candidate.criminalCases}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-democracy-dark/50 rounded-lg p-3 border border-democracy-slate/30">
                <div className="flex items-center gap-2 mb-1">
                  <Landmark className="w-4 h-4 text-democracy-light/50" />
                  <span className="text-xs text-democracy-light/50 uppercase">{t('candidate.assets')}</span>
                </div>
                <p className="font-mono text-white">{candidate.assets}</p>
              </div>
              <div className="bg-democracy-dark/50 rounded-lg p-3 border border-democracy-slate/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-democracy-light/50 uppercase">{t('candidate.liabilities')}</span>
                </div>
                <p className="font-mono text-red-300">{candidate.liabilities}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{t('candidate.promise_tracker')}</h3>
              <ul className="space-y-2">
                {candidate.promises.map((promise, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {promise.status === 'fulfilled' ? (
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span className={promise.status === 'fulfilled' ? 'text-democracy-light/90' : 'text-democracy-light/50 line-through'}>
                      {promise.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-center">
        <a href="https://myneta.info" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold flex justify-center items-center gap-2">
          {t('candidate.verify_myneta')}
        </a>
      </div>
    </motion.div>
  );
}
