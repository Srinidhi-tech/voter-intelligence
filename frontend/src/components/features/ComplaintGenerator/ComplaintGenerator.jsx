import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Send, AlertTriangle, Copy, Check } from 'lucide-react';
import { VIOLATION_TYPES, generateComplaintLetter } from '../../../services/complaintTemplateService';

export default function ComplaintGenerator() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    violationType: VIOLATION_TYPES[0].id,
    candidateName: '',
    constituency: '',
    location: '',
    userName: '',
    contactInfo: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [letterContent, setLetterContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const letter = generateComplaintLetter(
      formData.violationType,
      formData.candidateName,
      formData.constituency,
      formData.date,
      formData.location,
      formData.userName,
      formData.contactInfo
    );
    setLetterContent(letter);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          letterContent
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert('Failed to save complaint to database.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error connecting to backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-democracy-slate/20 rounded-2xl p-6 border border-democracy-slate/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-democracy-gold" />
          Report MCC Violation
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-democracy-light/80 mb-1">Violation Type</label>
            <select
              name="violationType"
              value={formData.violationType}
              onChange={handleChange}
              className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent"
            >
              {VIOLATION_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-democracy-light/80 mb-1">Candidate/Party Name</label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="e.g. John Doe, ABC Party"
              className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent placeholder-democracy-light/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-democracy-light/80 mb-1">Constituency</label>
              <input
                type="text"
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                placeholder="e.g. South Bangalore"
                className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent placeholder-democracy-light/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-democracy-light/80 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-democracy-light/80 mb-1">Specific Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Near Main Square, Ward 7"
              className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent placeholder-democracy-light/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-democracy-light/80 mb-1">{t('complaints.reporter_name')}</label>
              <input
                type="text"
                name="userName"
                value={formData.userName || ''}
                onChange={handleChange}
                placeholder={t('complaints.reporter_name_placeholder')}
                className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent placeholder-democracy-light/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-democracy-light/80 mb-1">{t('complaints.reporter_contact')}</label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo || ''}
                onChange={handleChange}
                placeholder={t('complaints.reporter_contact_placeholder')}
                className="w-full bg-democracy-dark border border-democracy-slate rounded-lg p-3 text-white focus:outline-none focus:border-democracy-accent placeholder-democracy-light/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-democracy-accent" />
            Letter Preview
          </h2>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm bg-democracy-slate hover:bg-democracy-slate/80 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 flex-1 shadow-lg border border-gray-200 overflow-y-auto min-h-[400px]">
          <pre className="font-sans text-black whitespace-pre-wrap text-sm leading-relaxed">
            {letterContent}
          </pre>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || submitSuccess}
          className={`mt-4 w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-colors shadow-lg ${
            submitSuccess 
              ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20'
          }`}
        >
          {submitSuccess ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          {submitSuccess ? 'Complaint Saved to Database' : (isSubmitting ? 'Submitting...' : 'Save & Send to cVIGIL')}
        </button>
      </div>
    </div>
  );
}
