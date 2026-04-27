import React from 'react';
import { motion } from 'framer-motion';
import VirtualVotingUnit from '../components/features/VotingSimulation/VirtualVotingUnit';

export default function VotingSimulationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">EVM & VVPAT Simulation</h1>
        <p className="text-democracy-light/70 text-lg max-w-3xl">
          Experience how the Electronic Voting Machine (EVM) and Voter Verifiable Paper Audit Trail (VVPAT) work. 
          Your vote is secure, standalone, and verifiable.
        </p>
      </header>

      <div className="bg-democracy-slate/20 rounded-2xl p-6 lg:p-10 border border-democracy-slate/50">
        <VirtualVotingUnit />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-democracy-dark p-6 rounded-xl border border-democracy-slate">
          <h3 className="font-bold text-democracy-gold mb-2">Standalone System</h3>
          <p className="text-sm text-democracy-light/70">EVMs are not connected to the internet, Bluetooth, or any network. They physically cannot be hacked remotely.</p>
        </div>
        <div className="bg-democracy-dark p-6 rounded-xl border border-democracy-slate">
          <h3 className="font-bold text-democracy-gold mb-2">The 7-Second Rule</h3>
          <p className="text-sm text-democracy-light/70">The VVPAT slip is visible for exactly 7 seconds behind a glass window before it falls into the sealed drop box.</p>
        </div>
        <div className="bg-democracy-dark p-6 rounded-xl border border-democracy-slate">
          <h3 className="font-bold text-democracy-gold mb-2">Audit Trail</h3>
          <p className="text-sm text-democracy-light/70">VVPAT slips from randomly selected booths are hand-counted and matched against the EVM digital count on result day.</p>
        </div>
      </div>
    </motion.div>
  );
}
