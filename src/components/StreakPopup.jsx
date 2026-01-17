import React from 'react';
import { Flame, Trophy, Star, Award } from 'lucide-react';

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.8);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.5s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s ease-out 0.2s both;
  }
  
  .animate-spin-slow {
    animation: spinSlow 3s linear infinite;
  }
`;

export default function StreakPopup({ 
  isOpen, 
  onClose, 
  streakCount = 0, 
  score = 0, 
  totalQuestions = 0, 
  earnedXp = 0,
  newAchievement = null 
}) {
  if (!isOpen) return null;

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <>
      <style>{styles}</style>
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 animate-scaleIn">
          <div className="text-center">
            {/* Main Icon */}
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center animate-bounce">
                <Trophy className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800 mb-2 animate-slideDown">
              Quiz Terminé! 🎉
            </h2>
            <p className="text-gray-600 mb-6 text-lg animate-slideUp">
              Tu as répondu correctement à {score}/{totalQuestions} questions
            </p>

            {/* Score Display */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 mb-6 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">{percentage}%</div>
                  <div className="text-sm text-gray-600 font-semibold">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-700">+{earnedXp}</div>
                  <div className="text-sm text-gray-600 font-semibold">XP Gagnés</div>
                </div>
              </div>
            </div>

            {/* Streak Section */}
            {streakCount > 0 && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 mb-6 animate-fadeIn">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                  <div>
                    <p className="text-2xl font-bold text-orange-800">{streakCount} Jours</p>
                    <p className="text-sm text-orange-600">Série Actuelle</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">7 jours</span>
                    <span className={streakCount >= 7 ? "text-green-600 font-bold" : "text-gray-400"}>
                      {streakCount >= 7 ? "✓ Débloqué!" : `${7 - streakCount} jours`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">30 jours</span>
                    <span className={streakCount >= 30 ? "text-green-600 font-bold" : "text-gray-400"}>
                      {streakCount >= 30 ? "✓ Débloqué!" : `${30 - streakCount} jours`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">100 jours</span>
                    <span className={streakCount >= 100 ? "text-green-600 font-bold" : "text-gray-400"}>
                      {streakCount >= 100 ? "✓ Débloqué!" : `${100 - streakCount} jours`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* New Achievement Badge */}
            {newAchievement && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 mb-6 animate-fadeIn border-2 border-yellow-300">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-yellow-600" />
                  <div className="text-left">
                    <p className="text-sm text-yellow-800 font-semibold">Nouveau Badge!</p>
                    <p className="text-lg font-bold text-yellow-900">{newAchievement}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Message */}
            <div className="mb-6">
              {percentage >= 80 && (
                <p className="text-green-600 font-bold text-lg">🌟 Excellent travail!</p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-blue-600 font-bold text-lg">👍 Bien joué!</p>
              )}
              {percentage < 60 && (
                <p className="text-orange-600 font-bold text-lg">💪 Continue tes efforts!</p>
              )}
            </div>
            
            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
            >
              CONTINUER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}