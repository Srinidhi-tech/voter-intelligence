import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VVPATSlip({ vote, isVisible }) {
  return (
    <div className="w-full h-64 bg-black/80 rounded-lg border-4 border-gray-700 relative overflow-hidden flex flex-col">
      <div className="text-center py-2 bg-gray-800 border-b border-gray-600">
        <h3 className="text-sm font-bold text-gray-300">VVPAT PRINTER WINDOW</h3>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10" />
        
        <AnimatePresence>
          {isVisible && vote && (
            <motion.div
              initial={{ y: -150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 150, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-100 w-48 h-36 p-4 flex flex-col shadow-lg z-0 border border-gray-300"
            >
              <div className="border-b-2 border-black pb-2 mb-2 flex justify-between items-center">
                <span className="font-mono text-xs text-black font-bold">SLNO: 0042</span>
                <span className="font-mono text-xs text-black">Ward 7</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-3xl text-black border border-gray-400">
                  {vote.symbol}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-black text-sm uppercase">{vote.name}</h4>
                  <p className="text-xs text-gray-700 font-mono">{vote.party}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center py-1 bg-gray-800 border-t border-gray-600">
        <p className="text-[10px] text-red-400 font-mono">SEALED DROP BOX BELOW</p>
      </div>
    </div>
  );
}
