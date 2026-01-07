import { useState, useEffect } from 'react';
import { X, Flame, Star, Trophy, Zap, Sparkles } from 'lucide-react';

export default function StreakPopup({ isOpen, onClose, streakCount = 5, newAchievement = null, score = 0, totalQuestions = 0 }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpProgress, setXpProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body
      document.body.style.overflow = 'hidden';
      
      setShowConfetti(true);
      setXpProgress(0);
      // Animate XP bar fill
      const timer = setTimeout(() => {
        setXpProgress(100);
      }, 300);
      const confettiTimer = setTimeout(() => setShowConfetti(false), 1500);
      return () => {
        clearTimeout(timer);
        clearTimeout(confettiTimer);
      };
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPerfect = percentage === 100;
  const isGreat = percentage >= 80;
  const isGood = percentage >= 60;

  const getStreakIcon = () => {
    if (streakCount >= 10) return '🔥🔥🔥';
    if (streakCount >= 5) return '🔥🔥';
    return '🔥';
  };

  const getMotivationalMessage = () => {
    if (isPerfect) return 'Parfait ! Tu es un génie ! 🧠';
    if (isGreat) return 'Excellent travail ! 🌟';
    if (isGood) return 'Bien joué ! Continue comme ça ! 💪';
    return 'Bravo d\'avoir essayé ! 🎯';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden">
      {/* Backdrop - Full screen blur effect */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-lg animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Confetti particles */}
      {showConfetti && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: Math.random() * 100 + '%',
                top: -10,
                animation: `fall ${2 + Math.random() * 1}s linear forwards`,
              }}
            >
              {['🎉', '⭐', '✨', '🎊', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </>
      )}

      {/* Streak Celebration - Toast style at center */}
      {streakCount > 0 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-streakZoom bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-3xl p-8 shadow-2xl border-4 border-white/50 backdrop-blur-sm max-w-sm w-10/12 text-center">
            <div className="text-8xl mb-4 drop-shadow-lg">{getStreakIcon()}</div>
            <div className="text-6xl font-black text-white drop-shadow-xl mb-2">
              {streakCount}
            </div>
            <p className="text-2xl font-bold text-white drop-shadow-lg">
              JOURS CONSÉCUTIFS !
            </p>
          </div>
        </div>
      )}

      {/* Main Popup - Centered modal window */}
      <div className="relative z-10 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl max-w-md w-11/12 animate-zoomIn border border-white/50 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {/* Celebrate emoji */}
        <div className="text-center mb-6">
          <div className="inline-block">
            <div className="text-7xl mb-4 animate-bounce-slow">
              {isPerfect ? '🎉' : isGreat ? '🌟' : '💫'}
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Quiz Complété !
        </h1>
        <p className="text-center text-gray-600 mb-6 text-lg">
          {getMotivationalMessage()}
        </p>

        {/* Score display */}
        {totalQuestions > 0 && (
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border-2 border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-semibold">Score</span>
              <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span className="font-medium">{score} correctes</span>
              <span className="font-medium">{totalQuestions - score} incorrectes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Achievement unlock */}
        {newAchievement && (
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 mb-6 border-2 border-yellow-300 animate-pulse-glow">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-gray-900">Nouveau Badge Débloqué ! 🏆</span>
            </div>
            <p className="text-sm text-gray-700">{newAchievement}</p>
          </div>
        )}

        {/* Bonus stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center border border-blue-100">
            <div className="text-sm text-gray-600">XP Gagnés</div>
            <div className="text-2xl font-bold text-blue-600">+{percentage * 2}</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-purple-100">
            <div className="text-sm text-gray-600">Bonus</div>
            <div className="text-2xl font-bold text-purple-600">+{streakCount * 10}</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-600 animate-spin" />
              <span className="font-bold text-gray-900">XP Progress</span>
            </div>
            <span className="text-sm font-semibold text-yellow-700">{xpProgress}%</span>
          </div>
          <div className="w-full h-6 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-1500 ease-out relative"
              style={{ width: `${xpProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              {xpProgress > 0 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold text-sm animate-bounce-slow">
                  ⚡
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600 font-medium">
            Total XP Earned: <span className="font-bold text-yellow-700">{percentage * 2 + streakCount * 10} XP</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Continuer
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
          >
            Retour au tableau de bord
          </button>
        </div>

        {/* Motivational footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          ✨ Reviens demain pour augmenter ton streak ! ✨
        </p>
      </div>

      <style>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.3) rotateX(-20deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes streakZoom {
          0% {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-zoomIn {
          animation: zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-streakZoom {
          animation: streakZoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
