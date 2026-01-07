import { useState, useEffect } from 'react';
import { X, Award, Sparkles } from 'lucide-react';

export default function AchievementPopup({ isOpen, onClose, achievement = null }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Confetti particles */}
      {showConfetti && (
        <>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none text-xl"
              style={{
                left: Math.random() * 100 + '%',
                top: -10,
                animation: `fall ${2 + Math.random() * 1}s linear forwards`,
              }}
            >
              {['🎉', '⭐', '✨', '🎊', '🏆', '🌟', '💫'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </>
      )}

      {/* Main Popup */}
      <div className="relative z-10 bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 animate-zoomIn border-2 border-yellow-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-yellow-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative text-7xl mb-4 animate-bounce-slow">
              {achievement.icon || '🏆'}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Nouveau Badge ! 🎉
        </h1>

        {/* Achievement name */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 border-2 border-yellow-300 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-700" />
            <span className="text-2xl font-bold text-yellow-800">{achievement.name}</span>
          </div>
          <p className="text-sm text-yellow-700">{achievement.description}</p>
        </div>

        {/* Reward */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center border-2 border-purple-200 hover:border-purple-400 transition-colors">
            <div className="text-sm text-gray-600">Points Bonus</div>
            <div className="text-3xl font-bold text-purple-600">+{achievement.xp || 100}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <div className="text-sm text-gray-600">Déblocage</div>
            <div className="text-3xl font-bold text-blue-600">{achievement.reward || '🎁'}</div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-sm">
              {achievement.message || 'Tu fais du super boulot ! Continue comme ça pour débloquer d\'autres récompenses ! 🚀'}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
        >
          ✨ Continuer ✨
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Tu as {achievement.count || 1}/{achievement.total || 5} de cette catégorie
        </p>
      </div>

      <style>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.3);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-zoomIn {
          animation: zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
