import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, ShieldAlert, TrendingUp } from 'lucide-react';
import { API_URL, speak } from '../App';

export default function HeatmapPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/integrity-heatmap`)
      .then(res => res.json())
      .then(json => {
        setData(json.heatmap || []);
        setLoading(false);
      })
      .catch(err => console.error('Heatmap error:', err));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8 pb-12"
      role="main"
      aria-label="Election Integrity Heatmap"
    >
      <header className="mb-8">
        <h1 
          className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3"
          tabIndex={0}
          onFocus={() => speak("Election Integrity and Misinformation Heatmap")}
        >
          <Map className="w-8 h-8 text-democracy-gold" />
          Integrity Heatmap
        </h1>
        <p className="text-democracy-light/70 text-lg">
          Real-time analysis of election sentiment and integrity scores powered by Gemini 1.5 Pro.
        </p>
      </header>

      {loading ? (
        <div className="text-white text-center py-20">Analyzing current voter sentiment...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-democracy-slate/20 border border-democracy-slate/50 rounded-2xl p-6"
              tabIndex={0}
              onFocus={() => speak(`${item.location}: Integrity score ${item.score} percent. Sentiment is ${item.sentiment}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{item.location}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.score > 70 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.score}% Integrity
                </span>
              </div>
              
              <div className="w-full bg-democracy-dark h-2 rounded-full mb-4">
                <div 
                  className={`h-full rounded-full ${item.score > 70 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <div className="flex items-center gap-2 text-democracy-light/80 text-sm">
                <TrendingUp className="w-4 h-4" />
                Sentiment: <span className="font-semibold text-white">{item.sentiment}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="bg-democracy-gold/10 border border-democracy-gold/30 rounded-xl p-6 mt-8">
        <h3 className="text-democracy-gold font-bold mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          How it works
        </h3>
        <p className="text-sm text-democracy-light/80">
          This heatmap uses Vertex AI Gemini 1.5 Pro to process anonymous voter complaints from the last 24 hours. 
          It performs sentiment analysis and cross-references reports to identify hotspots for potential misinformation or MCC violations.
        </p>
      </div>
    </motion.div>
  );
}
