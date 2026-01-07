import { useState, useEffect } from 'react';
import { AppNav } from './AppNav';
import { useNotification } from './NotificationProvider';
import { useGame } from '../contexts/GameContext';
import { Play, Trophy, Clock, Star, Target, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import StreakPopup from './StreakPopup';

export function QuizPage({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const notification = useNotification();
  const { player, completeQuiz } = useGame();
  const [streakData, setStreakData] = useState({
    streak: 5,
    score: 0,
    totalQuestions: 0,
    newAchievement: null,
  });

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [quizTakenBefore, setQuizTakenBefore] = useState(false);

  const startQuiz = (quiz) => {
    const alreadyDone = player.completedQuizzes?.includes(quiz.id) || player.completedQuizzes?.includes(String(quiz.id)) || quiz.completed;
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizCompleted(false);
    setEarnedXp(0);
    setQuizTakenBefore(alreadyDone);
    setShowPopup(false);
  };

  useEffect(() => {
    setAnimateCards(true);
    notification.info('Quiz section loaded', { duration: 2000 });
  }, [notification]);

  useEffect(() => {
    if (selectedQuiz) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedQuiz]);

  const quizzes = [
    {
      id: 1,
      title: 'Les fractions - Niveau débutant',
      subject: 'Mathématiques',
      emoji: '🔢',
      questions: 10,
      questionSet: [
        { question: 'Combien font 1/2 + 1/4 ?', options: ['1/6', '2/6', '3/4', '1/3'], correct: 2 },
        { question: 'Quelle fraction est la plus grande ?', options: ['1/3', '1/2', '2/5', '3/8'], correct: 1 },
        { question: 'Combien font 3/4 - 1/4 ?', options: ['1/2', '1/4', '2/4', '3/8'], correct: 0 },
      ],
      duration: '15 min',
      difficulty: 'Facile',
      color: 'from-blue-500 to-blue-600',
      bestScore: 8,
      completed: true,
    },
    {
      id: 2,
      title: 'Grammaire française',
      subject: 'Français',
      emoji: '📖',
      questions: 12,
      questionSet: [
        { question: 'Quel est le sujet dans "Pierre mange une pomme" ?', options: ['Pierre', 'mange', 'pomme', 'une'], correct: 0 },
        { question: 'Quel temps est utilisé : "Elle ira" ?', options: ['Passé', 'Présent', 'Futur', 'Conditionnel'], correct: 2 },
        { question: 'Quel est le féminin de "acteur" ?', options: ['acteuse', 'actrice', 'acteur', 'actée'], correct: 1 },
      ],
      duration: '20 min',
      difficulty: 'Moyen',
      color: 'from-purple-500 to-purple-600',
      bestScore: 10,
      completed: true,
    },
    {
      id: 3,
      title: 'La photosynthèse',
      subject: 'Sciences',
      emoji: '🌱',
      questions: 8,
      questionSet: [
        { question: 'Où se produit la photosynthèse ?', options: ['Racines', 'Feuilles', 'Fleurs', 'Tronc'], correct: 1 },
        { question: 'Quel gaz est absorbé ?', options: ['Oxygène', 'Azote', 'Dioxyde de carbone', 'Argon'], correct: 2 },
        { question: 'Quel gaz est rejeté ?', options: ['Oxygène', 'Dioxyde de carbone', 'Helium', 'Hydrogène'], correct: 0 },
      ],
      duration: '10 min',
      difficulty: 'Facile',
      color: 'from-green-500 to-green-600',
      bestScore: null,
      completed: false,
    },
    {
      id: 4,
      title: 'Le théorème de Pythagore',
      subject: 'Mathématiques',
      emoji: '📐',
      questions: 15,
      questionSet: [
        { question: 'a² + b² = ?', options: ['c²', '2ab', 'a+b', 'ab'], correct: 0 },
        { question: 'Triangle requis ?', options: ['Isocèle', 'Equilatéral', 'Rectangle', 'Quelconque'], correct: 2 },
        { question: 'Si a=3, b=4 alors c=?', options: ['5', '6', '7', '4'], correct: 0 },
      ],
      duration: '25 min',
      difficulty: 'Difficile',
      color: 'from-orange-500 to-orange-600',
      bestScore: null,
      completed: false,
    },
    {
      id: 5,
      title: 'Les rois de France',
      subject: 'Histoire',
      emoji: '👑',
      questions: 10,
      duration: '15 min',
      difficulty: 'Moyen',
      color: 'from-red-500 to-red-600',
      bestScore: 6,
      completed: true,
    },
    {
      id: 6,
      title: 'Les cellules',
      subject: 'Sciences',
      emoji: '🔬',
      questions: 12,
      duration: '20 min',
      difficulty: 'Moyen',
      color: 'from-teal-500 to-teal-600',
      bestScore: null,
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-100 text-green-700';
      case 'Moyen':
        return 'bg-orange-100 text-orange-700';
      case 'Difficile':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const normalizeDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Facile':
        return 'easy';
      case 'Moyen':
        return 'medium';
      case 'Difficile':
        return 'hard';
      default:
        return 'medium';
    }
  };

  const currentQuestions = selectedQuiz?.questionSet || [];
  const totalQuestions = currentQuestions.length;
  const currentItem = currentQuestions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progressValue = totalQuestions ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      notification.info('Choisis une réponse avant de continuer');
      return;
    }
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;
    if (Object.keys(answers).length < totalQuestions) {
      notification.info('Réponds à toutes les questions');
      return;
    }

    const alreadyCompleted =
      player.completedQuizzes?.includes(selectedQuiz.id) ||
      player.completedQuizzes?.includes(String(selectedQuiz.id)) ||
      quizTakenBefore;
    const score = currentQuestions.reduce((acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0), 0);
    const difficulty = normalizeDifficulty(selectedQuiz.difficulty);

    if (!alreadyCompleted) {
      const xp = completeQuiz(selectedQuiz.id, score, totalQuestions, difficulty);
      setEarnedXp(xp);
      setQuizTakenBefore(true);
      notification.success(`Quiz terminé ! +${xp} XP`, { duration: 3000 });
    } else {
      setEarnedXp(0);
      notification.info('Quiz blanc : XP déjà obtenu');
    }

    setStreakData({
      streak: player.streak,
      score,
      totalQuestions,
      newAchievement: null,
    });

    setQuizCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowPopup(true);
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b from-white to-gray-50 ${showPopup ? 'blur-sm' : ''}`}>
      <AppNav currentPage="quiz" onNavigate={onNavigate} onLogout={onLogout} />

      <StreakPopup 
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          onNavigate('dashboard');
        }}
        streakCount={streakData.streak}
        score={streakData.score}
        totalQuestions={streakData.totalQuestions}
        newAchievement={streakData.newAchievement}
      />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className={`mb-8 md:mb-10 transform transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 flex items-center gap-3">
            <Target className="w-10 h-10 md:w-12 md:h-12 text-purple-600" />
            Battle Quizzes
          </h1>
          <p className="text-gray-700 text-sm md:text-base lg:text-lg font-bold">Test your skills and earn XP!</p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {[
            { icon: Trophy, value: '12', label: 'Quiz réussis', color: 'from-yellow-400 to-orange-400', delay: 0 },
            { icon: Star, value: '245', label: 'Points gagnés', color: 'from-blue-500 to-purple-600', delay: 1 },
            { icon: Target, value: '87%', label: 'Taux de réussite', color: 'from-pink-500 to-rose-600', delay: 2 },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                  animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${stat.delay * 100}ms` }}
              >
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                    <IconComponent className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 animate-bounce-slow" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/80 font-semibold">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!selectedQuiz && (
          <>
            {/* Quizzes Grid */}
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 md:mb-4">📝 Tous les quiz</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {quizzes.map((quiz, index) => {
                const isCompleted = player.completedQuizzes?.includes(quiz.id) || player.completedQuizzes?.includes(String(quiz.id)) || quiz.completed;
                const ctaLabel = isCompleted ? 'Refaire (quiz blanc)' : 'Commencer le quiz';
                return (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer transform ${
                    animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  onClick={() => startQuiz(quiz)}
                  style={{
                    animation: animateCards ? 'scaleIn 0.5s ease-out' : 'none',
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${quiz.color} p-5 sm:p-6 text-white relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 group-hover:scale-125 transition-transform duration-300 origin-left">{quiz.emoji}</div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{quiz.title}</h3>
                      <p className="text-xs sm:text-sm text-white/80">{quiz.subject}</p>
                    </div>
                    
                    {isCompleted && (
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold animate-bounce-slow">
                        ✅ Fait
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="space-y-3 mb-4">
                      {[
                        { label: 'Questions', value: `${quiz.questions} questions` },
                        { label: 'Durée', value: quiz.duration, icon: Clock },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                          <span className="text-gray-600 font-semibold">{item.label}</span>
                          <span className="text-gray-900 font-bold">{item.value}</span>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                        <span className="text-gray-600 font-semibold">Difficulté</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                    </div>

                    {quiz.bestScore !== null && (
                      <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors duration-200">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 animate-float" />
                          <span className="text-sm text-gray-700">
                            Meilleur score: <strong>{quiz.bestScore}/{quiz.questions}</strong>
                          </span>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        startQuiz(quiz);
                      }}
                      className={`w-full py-3 bg-gradient-to-r ${quiz.color} text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-black transform hover:scale-105 border-2 border-white/20`}>
                      <Play className="w-5 h-5" />
                      {ctaLabel}
                    </button>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Tips Section */}
            <div className={`mt-6 md:mt-8 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl border-2 border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 ${
              animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl animate-bounce-slow">💡</div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2 drop-shadow-lg">Pro Tips</h3>
                  <ul className="space-y-2 text-white text-sm drop-shadow-md">
                    <li className="hover:translate-x-2 transition-transform duration-300 font-semibold">✓ Read questions carefully</li>
                    <li className="hover:translate-x-2 transition-transform duration-300 font-semibold">✓ Replay to improve your score</li>
                    <li className="hover:translate-x-2 transition-transform duration-300 font-semibold">✓ Hard quizzes give more XP</li>
                    <li className="hover:translate-x-2 transition-transform duration-300 font-semibold">✓ Unlock badges and achievements!</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedQuiz && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Header */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
                <div className="text-6xl mb-4">{selectedQuiz.emoji}</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedQuiz.title}</h2>
                <p className="text-gray-600 text-sm font-semibold">{selectedQuiz.subject}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-semibold">Question {currentQuestion + 1} sur {totalQuestions}</span>
                  <div className="flex items-center gap-2">
                    {quizTakenBefore && (
                      <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                        Quiz blanc
                      </span>
                    )}
                    <span className="text-sm text-gray-700 font-semibold">Score: {Object.values(answers).filter((ans, idx) => ans === currentQuestions[idx]?.correct).length}/{totalQuestions}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden hover:h-4 transition-all duration-300">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-700 shadow-lg"
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>
              </div>

              {totalQuestions === 0 ? (
                <div className="p-4 bg-gray-50 rounded-xl text-gray-600 text-sm font-semibold">
                  Pas encore de questions pour ce quiz.
                </div>
              ) : (
                <>
                  {/* Question */}
                  <div className="text-center mb-12">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-8">{currentItem?.question}</h3>
                  </div>

                  {/* Options */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {currentItem?.options.map((option, idx) => {
                      const selected = answers[currentQuestion] === idx;
                      const isCorrect = idx === currentItem.correct;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className={`p-6 rounded-2xl border-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                            selected
                              ? 'border-purple-500 bg-purple-50 text-purple-900 scale-105'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Précédente
                    </button>

                    <button
                      onClick={isLastQuestion ? handleSubmitQuiz : handleNext}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      {isLastQuestion ? 'Voir mes résultats' : 'Suivante'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Help Box */}
            <div className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1">Conseil</h3>
                  <p className="text-gray-700 text-sm font-semibold">
                    {quizTakenBefore ? 'Refais le quiz sans limites pour améliorer ton score !' : 'Réponds à toutes les questions pour soumettre le quiz.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
