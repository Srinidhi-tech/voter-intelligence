import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function PortalLink() {
  return (
    <div className="bg-gradient-to-br from-democracy-accent/20 to-democracy-dark rounded-2xl p-6 border border-democracy-accent/30 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-democracy-accent/20 rounded-full">
          <ShieldCheck className="w-8 h-8 text-democracy-accent" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-2">Ready to Register?</h2>
      <p className="text-democracy-light/80 mb-6 max-w-sm mx-auto">
        Registration is free, fully online, and takes only 10 minutes on the official Election Commission of India portal.
      </p>

      <a 
        href="https://voters.eci.gov.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-democracy-accent hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
      >
        <span>Go to ECI Portal</span>
        <ExternalLink className="w-5 h-5" />
      </a>
      
      <p className="text-xs text-democracy-light/50 mt-4">
        Redirects to voters.eci.gov.in (Official Gov Portal)
      </p>
    </div>
  );
}
