import { AppNav } from './AppNav';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trophy, Star, Flame, Target, TrendingUp, Award, ChevronRight } from 'lucide-react';

export function Dashboard({ onNavigate, onLogout }) {
  const subjects = [
    { name: 'Mathématiques', progress: 75, color: 'bg-blue-500', emoji: '🔢', lessons: 12, exercises: 8 },
    { name: 'Français', progress: 60, color: 'bg-purple-500', emoji: '📖', lessons: 10, exercises: 5 },
    { name: 'Sciences', progress: 85, color: 'bg-green-500', emoji: '🔬', lessons: 15, exercises: 12 },
    { name: 'Histoire', progress: 45, color: 'bg-orange-500', emoji: '🏛️', lessons: 8, exercises: 3 },
  ];

  const recentActivities = [
    { title: 'Théorème de Pythagore', subject: 'Mathématiques', type: 'Cours terminé', time: "Il y a 2h", emoji: '✅' },
    { title: 'Quiz sur les fractions', subject: 'Mathématiques', type: 'Quiz réussi', time: "Hier", emoji: '🎯' },
    { title: 'La photosynthèse', subject: 'Sciences', type: 'Exercices terminés', time: "Hier", emoji: '✏️' },
  ];

  const achievements = [
    { title: '7 jours consécutifs', emoji: '🔥', unlocked: true },
    { title: 'Premier quiz parfait', emoji: '🌟', unlocked: true },
    { title: '50 exercices réussis', emoji: '🏆', unlocked: true },
    { title: 'Maître des maths', emoji: '🎓', unlocked: false },
  ];

  return (
    <div className="min-h-screen">
      <AppNav currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Salut Sarah ! 👋</h1>
          <p className="text-gray-600">Prête à apprendre de nouvelles choses aujourd'hui ?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl mb-1">7</div>
            <div className="text-blue-100 text-sm">Jours d'affilée</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl mb-1">245</div>
            <div className="text-purple-100 text-sm">Points cette semaine</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl mb-1">12</div>
            <div className="text-green-100 text-sm">Quiz réussis</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl mb-1">Level 8</div>
            <div className="text-orange-100 text-sm">Ton niveau</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress by Subject */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">📚 Tes matières</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">Voir tout</button>
              </div>
              
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => onNavigate('cours')}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                          {subject.emoji}
                        </div>
                        <div>
                          <div className="text-gray-900">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.lessons} cours • {subject.exercises} exercices</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{subject.progress}%</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${subject.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6">🕐 Activités récentes</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="text-3xl">{activity.emoji}</div>
                    <div className="flex-1">
                      <div className="text-gray-900">{activity.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{activity.subject} • {activity.type}</div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Goal */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg mb-4">🎯 Objectif du jour</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>3 cours à terminer</span>
                  <span>2/3 ✅</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '67%' }}></div>
                </div>
                <p className="text-sm text-pink-100">Encore 1 cours et tu auras ton badge du jour ! 🌟</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg text-gray-900 mb-4">🏆 Tes badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg scale-100'
                        : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.emoji}</div>
                    <div className="text-xs">{achievement.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg text-gray-900 mb-4">⚡ Actions rapides</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('cours')}
                  className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left"
                >
                  📚 Reprendre là où j'étais
                </button>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-left"
                >
                  🎯 Faire un quiz
                </button>
                <button
                  onClick={() => onNavigate('exercices')}
                  className="w-full p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left"
                >
                  ✏️ Faire des exercices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
