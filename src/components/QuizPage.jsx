import { useState, useEffect } from 'react';
import { AppNav } from './AppNav';
import { useNotification } from './NotificationProvider';
import { Play, Trophy, Clock, Star, Target } from 'lucide-react';
import StreakPopup from './StreakPopup';

export function QuizPage({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const notification = useNotification();
  const [streakData, setStreakData] = useState({
    streak: 5,
    score: 0,
    totalQuestions: 0,
    newAchievement: null,
  });

  useEffect(() => {
    setAnimateCards(true);
    notification.info('Quiz section loaded', { duration: 2000 });
  }, [notification]);

  const quizzes = [
    {
      id: 1,
      title: 'Les fractions - Niveau débutant',
      subject: 'Mathématiques',
      emoji: '🔢',
      questions: 10,
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

  const handleQuizComplete = (score, total) => {
    const newStreak = Math.floor(Math.random() * 15) + 1;
    const achievements = ['Génération Z ! (100% à 3 quiz)', 'Maître des Mathématiques (10 quiz complétés)', 'Parleur de Français (5 quiz de français)'];
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
    
    setStreakData({
      streak: newStreak,
      score: score,
      totalQuestions: total,
      newAchievement: randomAchievement,
    });
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">🎯 Quiz interactifs</h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">Teste tes connaissances et gagne des points !</p>
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

        {/* Quizzes Grid */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 md:mb-4">📝 Tous les quiz</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer transform ${
                animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onClick={() => handleQuizComplete(Math.floor(Math.random() * quiz.questions + 5), quiz.questions)}
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
                
                {quiz.completed && (
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
                    handleQuizComplete(Math.floor(Math.random() * quiz.questions + 5), quiz.questions);
                  }}
                  className={`w-full py-3 bg-gradient-to-r ${quiz.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold transform hover:scale-105`}>
                  <Play className="w-5 h-5" />
                  {quiz.completed ? 'Refaire le quiz' : 'Commencer le quiz'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className={`mt-6 md:mt-8 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.4s' }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-2xl sm:text-3xl animate-bounce-slow">💡</div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Astuces pour réussir</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="hover:translate-x-2 transition-transform duration-300">✓ Lis bien chaque question avant de répondre</li>
                <li className="hover:translate-x-2 transition-transform duration-300">✓ N'hésite pas à refaire un quiz pour améliorer ton score</li>
                <li className="hover:translate-x-2 transition-transform duration-300">✓ Prends ton temps, il n'y a pas de chronomètre</li>
                <li className="hover:translate-x-2 transition-transform duration-300">✓ Gagne des points et débloquer des badges !</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
