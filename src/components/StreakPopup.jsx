import { useState, useEffect } from 'react';
import { X, Zap, Trophy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariant, backdropVariant, confettiFall, popSmall } from '../lib/motionVariants';

export default function StreakPopup({ isOpen, onClose, streakCount = 5, newAchievement = null, score = 0, totalQuestions = 0 }) {
  const [xpProgress, setXpProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setXpProgress(0);
      const timer = setTimeout(() => setXpProgress(100), 320);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPerfect = percentage === 100;
  const isGreat = percentage >= 80;

  const getStreakIcon = () => {
    if (streakCount >= 10) return '🔥🔥🔥';
    if (streakCount >= 5) return '🔥🔥';
    return '🔥';
  };

  const getMotivationalMessage = () => {
    if (isPerfect) return 'Parfait ! Tu es un génie ! 🧠';
    if (isGreat) return 'Excellent travail ! 🌟';
    return 'Bravo d\'avoir essayé ! 🎯';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden" initial="hidden" animate="visible" exit="exit">
          <motion.div className="fixed inset-0 bg-black/60" variants={backdropVariant} onClick={onClose} />

          {/* Confetti - animated with framer */}
          {[...Array(22)].map((_, i) => {
            const left = Math.random() * 100;
            const rot = Math.random() * 720;
            const delay = Math.random() * 0.6;
            const emoji = ['🎉', '⭐', '✨', '🎊', '🏆'][Math.floor(Math.random() * 5)];
            return (
              <motion.div
                key={i}
                className="absolute text-2xl pointer-events-none"
                style={{ left: `${left}%`, top: -20 }}
                variants={confettiFall(left, rot, delay)}
                initial="hidden"
                animate="visible"
              >
                {emoji}
              </motion.div>
            );
          })}

          {/* Streak badge */}
          <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-50" variants={popSmall} initial="hidden" animate="visible">
            <div className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-3xl p-6 shadow-2xl border-4 border-white/50 text-center max-w-xs w-80">
              <div className="text-6xl mb-2 drop-shadow-lg">{getStreakIcon()}</div>
              <div className="text-4xl font-black text-white mb-1">{streakCount}</div>
              <div className="text-sm text-white/90 font-semibold">JOURS CONSÉCUTIFS</div>
            </div>
          </motion.div>

          {/* Main modal */}
          <motion.div className="relative z-50 max-w-xl w-11/12" variants={modalVariant} initial="hidden" animate="visible" exit="exit">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-4">
                <div className="text-6xl mb-2 animate-bounce-slow">{isPerfect ? '🎉' : isGreat ? '🌟' : '💫'}</div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Quiz terminé !</h2>
                <p className="text-gray-600">{getMotivationalMessage()}</p>
              </div>

              {/* Score / Progress */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-semibold">Score</span>
                  <span className="text-2xl font-bold text-indigo-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-700" style={{ width: `${percentage}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-500">{score} correctes — {totalQuestions - score} incorrectes</div>
              </div>

              {/* Rewards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500">XP Gagnés</div>
                  <div className="text-xl font-bold text-indigo-600">+{percentage * 2}</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500">Bonus</div>
                  <div className="text-xl font-bold text-pink-600">+{streakCount * 10}</div>
                </div>
              </div>

              {/* XP progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    XP Progress
                  </div>
                  <div className="text-sm font-bold text-yellow-600">{xpProgress}%</div>
                </div>
                <div className="w-full h-6 bg-yellow-50 rounded-full overflow-hidden border border-yellow-100">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1200" style={{ width: `${xpProgress}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-bold shadow hover:shadow-lg transition-transform transform hover:scale-105">Continuer</button>
                <button onClick={() => { onClose(); }} className="w-full py-3 bg-gray-100 rounded-xl font-semibold">Retour au tableau de bord</button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">✨ Reviens demain pour augmenter ton streak ! ✨</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
