import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FilePlus, Edit, Trash2, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

const DocumentUploadItem = ({ doc }) => {
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploaded(true);
    }
  };

  return (
    <div className="flex items-start justify-between gap-3 p-4 bg-democracy-dark/30 rounded-xl border border-democracy-slate/40 transition-colors hover:border-democracy-slate">
      <div className="flex items-start gap-3">
        {uploaded ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-democracy-slate shrink-0 mt-0.5" />
        )}
        <div>
          <h4 className={`font-medium transition-colors ${uploaded ? 'text-green-400' : 'text-white'}`}>{doc.title}</h4>
          <p className="text-sm text-democracy-light/70">{doc.desc}</p>
        </div>
      </div>
      
      <div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/*,.pdf"
        />
        <button 
          onClick={handleUploadClick}
          className={`p-2.5 rounded-full transition-all ${
            uploaded 
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
              : 'bg-democracy-accent/20 text-democracy-accent hover:bg-democracy-accent/40'
          }`}
          title={uploaded ? "Uploaded successfully" : "Upload Document"}
        >
          {uploaded ? <CheckCircle2 className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default function FormNavigator() {
  const { t } = useTranslation();

  const FORMS = [
    {
      id: 'form6',
      title: t('registration.form6'),
      icon: FilePlus,
      description: t('registration.form6_desc'),
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/30'
    },
    {
      id: 'form8',
      title: t('registration.form8'),
      icon: Edit,
      description: t('registration.form8_desc'),
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/30'
    },
    {
      id: 'form7',
      title: t('registration.form7'),
      icon: Trash2,
      description: t('registration.form7_desc'),
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      border: 'border-red-400/30'
    }
  ];

  const DOCS_MAP = {
    form6: [
      { id: 'photo', title: t('registration.photo'), desc: t('registration.photo_desc') },
      { id: 'age', title: t('registration.age_proof'), desc: t('registration.age_proof_desc') },
      { id: 'address', title: t('registration.address_proof'), desc: t('registration.address_proof_desc') }
    ],
    form7: [
      { id: 'death', title: t('registration.death_cert'), desc: t('registration.death_cert_desc') }
    ],
    form8: [
      { id: 'epic', title: t('registration.epic_card'), desc: t('registration.epic_card_desc') },
      { id: 'proof', title: t('registration.proof_change'), desc: t('registration.proof_change_desc') }
    ]
  };

  const [activeFormId, setActiveFormId] = useState('form6');
  const activeForm = FORMS.find(f => f.id === activeFormId);

  return (
    <div className="space-y-8">
      <div className="bg-democracy-slate/20 rounded-2xl p-6 border border-democracy-slate/50 shadow-lg">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
          <span className="w-8 h-8 rounded-full bg-democracy-accent/20 text-democracy-accent flex items-center justify-center text-sm font-bold">1</span>
          {t('registration.which_form')}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {FORMS.map((form) => {
            const isActive = activeFormId === form.id;
            const Icon = form.icon;
            return (
              <button
                key={form.id}
                onClick={() => setActiveFormId(form.id)}
                className={`flex-1 flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive 
                    ? `${form.border} ${form.bg} shadow-lg` 
                    : 'border-transparent hover:bg-democracy-slate/30'
                }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${isActive ? form.color : 'text-democracy-light/50'}`} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-democracy-light/70'}`}>
                  {form.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeForm.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-6 rounded-xl border ${activeForm.border} ${activeForm.bg}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-democracy-dark/50 ${activeForm.color} shadow-inner`}>
                <activeForm.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{activeForm.title}</h3>
                <p className="text-democracy-light/80 leading-relaxed">
                  {activeForm.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`docs-${activeFormId}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-democracy-slate/20 rounded-2xl p-6 border border-democracy-slate/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
              <span className="w-8 h-8 rounded-full bg-democracy-accent/20 text-democracy-accent flex items-center justify-center text-sm font-bold">2</span>
              {t('registration.required_docs')}
            </h2>
            <span className="text-sm font-mono text-democracy-light/50 bg-democracy-dark/50 px-3 py-1 rounded-full border border-democracy-slate/30">
              {t('registration.for')} {activeForm.title.split(':')[0]}
            </span>
          </div>

          <div className="space-y-3">
            {DOCS_MAP[activeFormId].map((doc) => (
              <DocumentUploadItem key={doc.id} doc={doc} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-democracy-gold/10 border border-democracy-gold/30 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-democracy-gold shrink-0 mt-0.5" />
            <p className="text-sm text-democracy-light/80">
              <strong className="text-democracy-gold">{t('registration.pro_tip')}</strong> {t('registration.pro_tip_desc')}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
