import { useState } from 'react';
import { AppNav } from './AppNav';
import { Check, X, ArrowRight, Star, Trophy, RotateCcw } from 'lucide-react';

export function ExercisePage({ onNavigate, onLogout }) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const exercises = [
    {
      question: 'Combien font 1/2 + 1/4 ?',
      emoji: '🔢',
      options: ['1/6', '2/6', '3/4', '1/3'],
      correct: 2,
      explanation: 'Pour additionner des fractions, il faut avoir le même dénominateur. 1/2 = 2/4, donc 2/4 + 1/4 = 3/4',
    },
    {
      question: 'Dans un triangle rectangle, quel est le nom du côté le plus long ?',
      emoji: '📐',
      options: ['Le côté adjacent', 'L\'hypoténuse', 'Le côté opposé', 'La base'],
      correct: 1,
      explanation: 'L\'hypoténuse est toujours le côté le plus long d\'un triangle rectangle. C\'est le côté opposé à l\'angle droit.',
    },
    {
      question: 'Combien font 25% de 80 ?',
      emoji: '💯',
      options: ['15', '20', '25', '30'],
      correct: 1,
      explanation: '25% = 1/4, donc 80 ÷ 4 = 20',
    },
  ];

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === exercises[currentExercise].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <div className="min-h-screen">
        <AppNav currentPage="exercices" onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-8xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            
            <h1 className="text-3xl text-gray-900 mb-4">
              {percentage >= 80 ? 'Excellent travail !' : percentage >= 60 ? 'Bien joué !' : 'Continue comme ça !'}
            </h1>
            
            <div className="text-6xl mb-6">
              <span className="text-blue-600">{score}</span>
              <span className="text-gray-400"> / {exercises.length}</span>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              Tu as eu {percentage}% de bonnes réponses !
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-12 ${
                    percentage >= star * 33 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-shadow"
              >
                <RotateCcw className="w-5 h-5" />
                Recommencer
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour au tableau de bord
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const exercise = exercises[currentExercise];

  return (
    <div className="min-h-screen">
      <AppNav currentPage="exercices" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">✏️ Exercices de Mathématiques</h1>
          <p className="text-gray-600">Réponds aux questions pour progresser !</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Question {currentExercise + 1} sur {exercises.length}</span>
            <span className="text-sm text-gray-600">Score: {score}/{exercises.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          {/* Question */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">{exercise.emoji}</div>
            <h2 className="text-2xl text-gray-900 mb-4">{exercise.question}</h2>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {exercise.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === exercise.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`p-6 rounded-2xl border-2 text-lg transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : showWrong
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <Check className="w-6 h-6 text-green-600" />}
                    {showWrong && <X className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-6 rounded-2xl mb-6 ${
              selectedAnswer === exercise.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="text-gray-900 mb-2">
                    {selectedAnswer === exercise.correct ? 'Bravo ! 🎉' : 'Explication'}
                  </h3>
                  <p className="text-gray-700">{exercise.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              {currentExercise < exercises.length - 1 ? (
                <>
                  Question suivante
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Voir mes résultats
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Help Box */}
        <div className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-gray-900 mb-1">Conseil</h3>
              <p className="text-gray-700 text-sm">
                Prends ton temps pour réfléchir avant de répondre. Il n'y a pas de limite de temps !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
