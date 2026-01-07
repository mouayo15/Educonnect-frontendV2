import { useState } from 'react';
import { AppNav } from './AppNav';
import { Play, Trophy, Clock, Star, Target } from 'lucide-react';

export function QuizPage({ onNavigate, onLogout }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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

  return (
    <div className="min-h-screen">
      <AppNav currentPage="quiz" onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">🎯 Quiz interactifs</h1>
          <p className="text-gray-600">Teste tes connaissances et gagne des points !</p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl mb-1">12</div>
                <div className="text-sm text-white/80">Quiz réussis</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl mb-1">245</div>
                <div className="text-sm text-white/80">Points gagnés</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl mb-1">87%</div>
                <div className="text-sm text-white/80">Taux de réussite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="mb-6">
          <h2 className="text-xl text-gray-900 mb-4">📝 Tous les quiz</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedQuiz(quiz.id)}
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-br ${quiz.color} p-6 text-white relative`}>
                <div className="text-5xl mb-3">{quiz.emoji}</div>
                <h3 className="text-lg mb-2">{quiz.title}</h3>
                <p className="text-sm text-white/80">{quiz.subject}</p>
                
                {quiz.completed && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    ✅ Fait
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Questions</span>
                    <span className="text-gray-900">{quiz.questions} questions</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Durée</span>
                    <span className="flex items-center gap-1 text-gray-900">
                      <Clock className="w-4 h-4" />
                      {quiz.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Difficulté</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>

                {quiz.bestScore !== null && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-gray-700">
                        Meilleur score: <strong>{quiz.bestScore}/{quiz.questions}</strong>
                      </span>
                    </div>
                  </div>
                )}

                <button className={`w-full py-3 bg-gradient-to-r ${quiz.color} text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                  <Play className="w-5 h-5" />
                  {quiz.completed ? 'Refaire le quiz' : 'Commencer le quiz'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="text-lg text-gray-900 mb-2">Astuces pour réussir</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Lis bien chaque question avant de répondre</li>
                <li>✓ N'hésite pas à refaire un quiz pour améliorer ton score</li>
                <li>✓ Prends ton temps, il n'y a pas de chronomètre</li>
                <li>✓ Gagne des points et débloquer des badges !</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
