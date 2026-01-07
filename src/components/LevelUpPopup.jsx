import { useEffect, useState } from 'react';
import { X, Zap, Trophy, Star, Sparkles } from 'lucide-react';

export default function LevelUpPopup({ isOpen, onClose, levelUpData }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowConfetti(true);
      setAnimate(true);
      
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    } else {
      document.body.style.overflow = 'auto';
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen || !levelUpData) return null;

  const { oldLevel, newLevel, leagueChanged, newLeague } = levelUpData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      />

      {showConfetti && (
        <>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none text-2xl"
              style={{
                left: Math.random() * 100 + '%',
                top: -20,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
              }}
            >
              {['⭐', '🎉', '✨', '🏆', '💫', '🌟'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </>
      )}

      <div className={`relative z-10 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-8 shadow-2xl max-w-md w-11/12 border-4 border-yellow-300 transform transition-all duration-500 ${animate ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">
            🎉
          </div>

          <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            LEVEL UP!
          </h1>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="text-6xl font-black text-white/50">
              {oldLevel}
            </div>
            <Zap className="w-12 h-12 text-white animate-pulse" />
            <div className="text-7xl font-black text-white drop-shadow-2xl animate-pulse">
              {newLevel}
            </div>
          </div>

          {leagueChanged && newLeague && (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-white/50">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Trophy className="w-8 h-8 text-yellow-200 animate-bounce" />
                <h2 className="text-2xl font-bold text-white">New League!</h2>
              </div>
              <div className="text-6xl mb-2 animate-bounce-slow">
                {newLeague.icon}
              </div>
              <p className="text-xl font-bold text-white">{newLeague.name} League</p>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-white">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span className="font-bold text-lg">New abilities unlocked!</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-white text-orange-600 rounded-xl hover:bg-yellow-50 transition-all font-black text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Star className="w-6 h-6" />
            Continue Playing!
          </button>

          <p className="text-white/80 text-sm mt-4">
            Keep going to reach {newLeague?.name || 'the next'} league! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
