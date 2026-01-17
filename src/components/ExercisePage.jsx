import { useState, useEffect } from 'react';
import { AppNav } from './AppNav';
import { useNotification } from './NotificationProvider';
import { Check, X, ArrowRight, Star, Trophy, RotateCcw } from 'lucide-react';
import api from '../lib/api';
import StreakPopup from './StreakPopup';
import logger from '../lib/logger';

export function ExercisePage({ onNavigate, onLogout }) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const notification = useNotification();
  const [streakData, setStreakData] = useState({
    streak: 0,
    score: 0,
    totalQuestions: 0,
    newAchievement: null,
  });

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.exercises.getAll();
        if (mounted && Array.isArray(data)) setExercises(data);
      } catch (e) {
        // keep sample UI when API fails
      }
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === exercises[currentExercise].correct) {
      setScore(score + 1);
      notification.success('Correct! 🎉', { duration: 2000 });
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // submit attempt to backend when we have an exercise id
      (async () => {
        try {
          const possibleId = exercises?.id || exercises?.exerciseId || exercises[currentExercise]?.exerciseId || exercises[currentExercise]?.id;
          let response = null;
          if (possibleId) {
            response = await api.exercises.submitAttempt(possibleId, { score, totalQuestions: exercises.length });
          }
          notification.success(`Exercices terminés! Score: ${score}/${exercises.length} 🏆`, { duration: 3000 });
          // Use backend-provided streak/achievement if available, otherwise fallback to player data
          const backendStreak = response?.streak || response?.data?.streak || 0;
          const backendAchievement = response?.achievement || response?.data?.achievement || null;
          setStreakData({
            streak: backendStreak || 0,
            score: score + (selectedAnswer === exercises[currentExercise].correct ? 1 : 0),
            totalQuestions: exercises.length,
            newAchievement: backendAchievement,
          });
          setShowPopup(true);
        } catch (e) {
          logger.error('Exercise submit error', e);
          notification.success(`Exercices terminés! Score: ${score}/${exercises.length} 🏆`, { duration: 3000 });
          setStreakData({
            streak: 0,
            score,
            totalQuestions: exercises.length,
            newAchievement: null,
          });
          setShowPopup(true);
        }
      })();
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowPopup(false);
  };

  const hasExercises = Array.isArray(exercises) && exercises.length > 0;
  const exercise = hasExercises ? exercises[currentExercise] : null;

  return (
    <div className={`min-h-screen ${showPopup ? 'blur-sm' : ''}`}>
      <AppNav currentPage="exercices" onNavigate={onNavigate} onLogout={onLogout} />

      {loading ? (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">Chargement des exercices...</div>
      ) : (
        <div>
          <StreakPopup 
            isOpen={showPopup}
            onClose={() => {
              setShowPopup(false);
              setCurrentExercise(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              onNavigate('dashboard');
            }}
            streakCount={streakData.streak}
            score={streakData.score}
            totalQuestions={streakData.totalQuestions}
            newAchievement={streakData.newAchievement}
          />

          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {!hasExercises ? (
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">Aucun exercice disponible pour le moment.</div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8 md:mb-10 animate-fadeInDown">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 flex items-center gap-3">
                    <Check className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                    Practice Arena
                  </h1>
                  <p className="text-gray-700 text-lg font-bold">Train your skills!</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 animate-fadeInDown" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 font-semibold">Question {currentExercise + 1} sur {exercises.length}</span>
                    <span className="text-sm text-gray-700 font-semibold">Score: {score}/{exercises.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden hover:h-4 transition-all duration-300">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-700 shadow-lg"
                      style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Exercise Card */}
                <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slideInUp`}>
                  {/* Question */}
                  <div className="text-center mb-12">
                    <div className="text-6xl mb-6 animate-bounce-slow hover:scale-110 transition-transform duration-300">{exercise?.emoji || '📝'}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>{exercise?.question || 'Question indisponible'}</h2>
                  </div>

                  {/* Options */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {(exercise?.options ?? []).map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === exercise?.correct;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={showResult}
                          className={`p-6 rounded-2xl border-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                            showCorrect
                              ? 'border-green-500 bg-green-50 text-green-700 scale-105'
                              : showWrong
                              ? 'border-red-500 bg-red-50 text-red-700 scale-95'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 scale-105'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          style={{
                            animation: 'fadeInUp 0.5s ease-out',
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showCorrect && <Check className="w-6 h-6 text-green-600 animate-bounce-slow" />}
                            {showWrong && <X className="w-6 h-6 text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showResult && (
                    <div className={`p-6 rounded-2xl mb-6 animate-scaleIn ${
                      selectedAnswer === exercise?.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className="text-2xl animate-float">💡</div>
                        <div>
                          <h3 className="text-gray-900 font-bold mb-2">
                            {selectedAnswer === exercise?.correct ? '✅ Bravo ! 🎉' : '📚 Explication'}
                          </h3>
                          <p className="text-gray-700 font-semibold">{exercise?.explanation || 'Aucune explication fournie.'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  {showResult && (
                    <button
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold transform hover:scale-105 animate-fadeInUp"
                    >
                      {currentExercise < exercises.length - 1 ? (
                        <>
                          Question suivante
                          <ArrowRight className="w-5 h-5 hover:translate-x-2 transition-transform duration-300" />
                        </>
                      ) : (
                        <>
                          Voir mes résultats
                          <Trophy className="w-5 h-5 animate-bounce-slow" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Help Box */}
                <div className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-102 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce-slow">💡</span>
                    <div>
                      <h3 className="text-gray-900 font-bold mb-1">Conseil</h3>
                      <p className="text-gray-700 text-sm font-semibold">
                        Prends ton temps pour réfléchir avant de répondre. Il n'y a pas de limite de temps !
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

