import React from 'react';

export default function CandidateButton({ candidate, onVote, disabled }) {
  return (
    <div className={`flex items-center justify-between p-4 mb-3 rounded-lg border ${disabled ? 'border-democracy-slate/30 opacity-60' : 'border-democracy-slate bg-democracy-dark/50 hover:bg-democracy-slate/20 transition-colors'}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded flex items-center justify-center font-bold text-2xl text-democracy-dark shadow-inner">
          {candidate.symbol}
        </div>
        <div>
          <h3 className="font-bold text-white">{candidate.name}</h3>
          <p className="text-sm text-democracy-light/60">{candidate.party}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Red light indicator that glows when voted */}
        <div className={`w-4 h-4 rounded-full border-2 border-red-900 shadow-inner ${candidate.voted ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-red-900/30'}`} />
        
        {/* The actual blue button like on Indian EVMs */}
        <button
          onClick={() => onVote(candidate)}
          disabled={disabled}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_0_rgb(30,58,138)] active:shadow-none active:translate-y-1 transition-all
            ${disabled && !candidate.voted ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 cursor-pointer'}
          `}
        >
          <div className="w-8 h-8 rounded-full border-2 border-blue-400/30" />
        </button>
      </div>
    </div>
  );
}
