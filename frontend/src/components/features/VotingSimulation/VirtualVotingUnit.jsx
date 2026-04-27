import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CandidateButton from './CandidateButton';
import VVPATSlip from './VVPATSlip';
import { Volume2 } from 'lucide-react';

const CANDIDATES = [
  { id: 1, name: 'Aarav Sharma', party: 'Progressive Party', symbol: '🌞' },
  { id: 2, name: 'Priya Patel', party: 'Unity Coalition', symbol: '🌲' },
  { id: 3, name: 'Rahul Desai', party: 'Independent', symbol: '⚖️' },
  { id: 4, name: 'NOTA', party: 'None of the Above', symbol: '❌' },
];

export default function VirtualVotingUnit() {
  const { t } = useTranslation();
  const [activeVote, setActiveVote] = useState(null);
  const [showSlip, setShowSlip] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [message, setMessage] = useState(t('evm.ready_msg'));

  useEffect(() => {
    setMessage(t('evm.ready_msg'));
  }, [t]);

  const handleVote = (candidate) => {
    if (isLocked) return;
    
    setIsLocked(true);
    setActiveVote(candidate);
    setShowSlip(true);
    setMessage(t('evm.recorded_msg'));

    // Play beep sound (mock)
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // frequency in hertz
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio not supported or blocked');
    }

    // 7 seconds delay as per real VVPAT
    setTimeout(() => {
      setShowSlip(false);
      setMessage(t('evm.complete_msg'));
      
      // Reset for demo purposes after 3 seconds
      setTimeout(() => {
        setIsLocked(false);
        setActiveVote(null);
        setMessage(t('evm.ready_msg'));
      }, 3000);
      
    }, 7000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
      {/* EVM Balloting Unit */}
      <div className="bg-[#E6E6E6] rounded-xl p-6 border-8 border-gray-400 shadow-2xl relative">
        <div className="absolute top-2 right-4 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${!isLocked ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-green-900/30'}`} />
          <span className="text-xs font-bold text-gray-500 uppercase">{t('evm.ready_label')}</span>
        </div>
        
        <h2 className="text-center font-bold text-gray-800 text-xl mb-6 border-b-2 border-gray-400 pb-2">
          {t('evm.unit_title')}
        </h2>
        
        <div className="bg-white p-2 rounded border border-gray-300">
          {CANDIDATES.map((candidate) => (
            <CandidateButton 
              key={candidate.id}
              candidate={{...candidate, voted: activeVote?.id === candidate.id}}
              onVote={handleVote}
              disabled={isLocked}
            />
          ))}
        </div>
      </div>

      {/* VVPAT Unit */}
      <div className="flex flex-col gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border-4 border-gray-600 shadow-2xl">
          <h2 className="text-center font-bold text-white text-xl mb-6 tracking-widest">
            {t('evm.vvpat_header')}
          </h2>
          <VVPATSlip vote={activeVote} isVisible={showSlip} />
        </div>

        {/* Status Message */}
        <div className="bg-democracy-slate/30 border border-democracy-slate/50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${isLocked ? 'bg-green-500/20 text-green-400' : 'bg-democracy-accent/20 text-democracy-accent'}`}>
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">{t('evm.status_label')}</h3>
              <p className="text-democracy-light/80">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
