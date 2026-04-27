import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Search, FileX, MessageCircleWarning } from 'lucide-react';

export default function FactCheckPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/factcheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setSearchQuery('');
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert(t('factcheck.submit_failed'));
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert(t('factcheck.connect_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const MYTHS = [
    {
      id: 1,
      myth: t('factcheck.myth1_q'),
      reality: t('factcheck.myth1_a'),
    },
    {
      id: 2,
      myth: t('factcheck.myth2_q'),
      reality: t('factcheck.myth2_a'),
    },
    {
      id: 3,
      myth: t('factcheck.myth3_q'),
      reality: t('factcheck.myth3_a'),
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-green-400" />
          {t('factcheck.title')}
        </h1>
        <p className="text-democracy-light/70 text-lg max-w-3xl">
          {t('factcheck.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-democracy-slate/20 rounded-2xl p-6 md:p-8 border border-democracy-slate/50">
            <h2 className="text-xl font-bold text-white mb-6">{t('factcheck.myth_vs_reality')}</h2>
            
            <div className="space-y-6">
              {MYTHS.map((item) => (
                <div key={item.id} className="bg-democracy-dark rounded-xl p-5 border border-democracy-slate">
                  <div className="flex items-start gap-3 mb-4 border-b border-democracy-slate/50 pb-3">
                    <FileX className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{t('factcheck.myth')}</span>
                      <p className="text-white mt-1">{item.myth}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{t('factcheck.reality')}</span>
                      <p className="text-democracy-light/80 mt-1">{item.reality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <MessageCircleWarning className="w-5 h-5 text-orange-400" />
              {t('factcheck.report_fake_news')}
            </h3>
            <p className="text-sm text-democracy-light/80 mb-4">
              {t('factcheck.report_desc')}
            </p>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('factcheck.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-democracy-dark border border-democracy-slate rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-400"
              />
              <Search className="w-5 h-5 text-democracy-slate absolute left-3 top-3.5" />
            </div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || submitSuccess}
              className={`w-full mt-4 font-bold py-3 rounded-xl transition-all ${
                submitSuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-orange-600 hover:bg-orange-500 text-white'
              }`}
            >
              {submitSuccess ? '✓ Submitted' : (isSubmitting ? 'Submitting...' : t('factcheck.submit_button'))}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
