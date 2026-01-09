import { useState, useEffect } from 'react';
import { X, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariant, backdropVariant, confettiFall } from '../lib/motionVariants';

export default function AchievementPopup({ isOpen, onClose, achievement = null }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" initial="hidden" animate="visible" exit="exit">
          <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" variants={backdropVariant} onClick={onClose} />

          {showConfetti && [...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute pointer-events-none text-xl" style={{ left: `${Math.random()*100}%`, top: -10 }} variants={confettiFall(Math.random()*100, Math.random()*720, i*0.02)} initial="hidden" animate="visible">{['🎉','⭐','✨','🎊','🏆'][Math.floor(Math.random()*6)]}</motion.div>
          ))}

          <motion.div className="relative z-10 max-w-md w-full mx-4" variants={modalVariant} initial="hidden" animate="visible" exit="exit">
            <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl p-6 shadow-2xl border-2 border-yellow-200">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-yellow-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>

              <div className="text-center mb-4">
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50" />
                  <div className="relative text-6xl mb-3">{achievement.icon || '🏆'}</div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Nouveau Badge ! 🎉</h1>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-3 mb-4 text-center">
                  <div className="text-lg font-bold text-yellow-800">{achievement.name}</div>
                  <p className="text-sm text-yellow-700">{achievement.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500">Points Bonus</div>
                  <div className="text-xl font-bold text-purple-600">+{achievement.xp || 100}</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500">Déblocage</div>
                  <div className="text-xl font-bold text-blue-600">{achievement.reward || '🎁'}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-3 mb-4">
                <div className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-blue-600" /><p className="text-sm text-gray-700">{achievement.message || 'Tu fais du super boulot ! Continue comme ça ! 🚀'}</p></div>
              </div>

              <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold">✨ Continuer ✨</button>
              <p className="text-center text-xs text-gray-500 mt-3">Tu as {achievement.count || 1}/{achievement.total || 5} de cette catégorie</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
