import { useEffect, useState } from 'react';
import { X, Zap, Trophy, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariant, backdropVariant, confettiFall } from '../lib/motionVariants';

export default function LevelUpPopup({ isOpen, onClose, levelUpData }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1800);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  if (!levelUpData) return null;

  const { oldLevel, newLevel, leagueChanged, newLeague } = levelUpData;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial="hidden" animate="visible" exit="exit">
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md" variants={backdropVariant} onClick={onClose} />

          {showConfetti && [...Array(24)].map((_, i) => {
            const left = Math.random() * 100;
            const rot = Math.random() * 640;
            return (
              <motion.div key={i} className="absolute text-2xl pointer-events-none" style={{ left: `${left}%`, top: -20 }} variants={confettiFall(left, rot, i * 0.02)} initial="hidden" animate="visible">{['⭐','🎉','✨','🏆'][Math.floor(Math.random()*4)]}</motion.div>
            );
          })}

          <motion.div className="relative z-50 max-w-md w-11/12" variants={modalVariant} initial="hidden" animate="visible" exit="exit">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-6 shadow-2xl border-4 border-yellow-300">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"><X className="w-5 h-5 text-white" /></button>
              <div className="text-center">
                <div className="text-7xl mb-3">🎉</div>
                <h1 className="text-3xl font-extrabold text-white mb-2">LEVEL UP!</h1>

                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="text-4xl text-white/60">{oldLevel}</div>
                  <Zap className="w-10 h-10 text-white" />
                  <div className="text-5xl font-extrabold text-white">{newLevel}</div>
                </div>

                {leagueChanged && newLeague && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-200" />
                      <h2 className="text-xl font-bold text-white">{newLeague.name} League</h2>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="bg-white/20 rounded-xl p-3 flex items-center justify-center gap-2 text-white font-bold"> <Sparkles className="w-4 h-4" /> New abilities unlocked!</div>
                </div>

                <button onClick={onClose} className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold">Continue Playing!</button>
                <p className="text-white/80 text-sm mt-3">Keep going to reach the next league 🚀</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
