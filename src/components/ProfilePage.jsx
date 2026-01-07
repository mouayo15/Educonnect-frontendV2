import { AppNav } from './AppNav';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, Mail, Calendar, Award, Star, Trophy, TrendingUp, Settings, Bell } from 'lucide-react';

export function ProfilePage({ onNavigate }) {
  const achievements = [
    { emoji: '🔥', title: 'Série de 7 jours', description: 'Connecté 7 jours d\'affilée', unlocked: true, date: '5 janvier 2026' },
    { emoji: '⭐', title: 'Premier quiz parfait', description: '100% de bonnes réponses', unlocked: true, date: '3 janvier 2026' },
    { emoji: '🏆', title: '50 exercices réussis', description: 'Compléter 50 exercices', unlocked: true, date: '1 janvier 2026' },
    { emoji: '📚', title: 'Maître des maths', description: 'Finir tous les chapitres de maths', unlocked: false, progress: 75 },
    { emoji: '🎯', title: 'Quiz master', description: 'Réussir 20 quiz', unlocked: false, progress: 60 },
    { emoji: '🌟', title: 'Élève modèle', description: 'Atteindre le niveau 10', unlocked: false, progress: 80 },
  ];

  const stats = [
    { label: 'Cours terminés', value: 45, icon: '📚', color: 'bg-blue-500' },
    { label: 'Exercices réussis', value: 123, icon: '✏️', color: 'bg-green-500' },
    { label: 'Quiz complétés', value: 12, icon: '🎯', color: 'bg-purple-500' },
    { label: 'Points totaux', value: 2450, icon: '⭐', color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { date: 'Aujourd\'hui', activities: ['Cours: Les fractions', 'Exercice: Pythagore', 'Quiz: Grammaire'] },
    { date: 'Hier', activities: ['Cours: La photosynthèse', 'Quiz: Les fractions'] },
    { date: '3 janvier', activities: ['Cours: Histoire de France', 'Exercice: Pourcentages'] },
  ];

  return (
    <div className="min-h-screen">
      <AppNav currentPage="profil" onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">👤 Mon profil</h1>
          <p className="text-gray-600">Consulte tes statistiques et tes badges</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                👧
              </div>
              
              <h2 className="text-xl text-gray-900 mb-1">Sarah Martin</h2>
              <p className="text-gray-600 mb-4">Classe de 5ème</p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm">
                  ⭐ Level 8
                </div>
              </div>

              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>sarah.martin@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Inscrit depuis octobre 2025</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Paramètres
                </button>
                <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg">Progression</h3>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span>Level 8</span>
                  <span>Level 9</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <p className="text-sm text-white/80">
                Plus que 200 points pour passer au niveau 9 ! 🎯
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">🏆 Mes badges</h2>
                <span className="text-sm text-gray-600">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} débloqués
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50'
                        : 'border-gray-200 bg-gray-50 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl ${!achievement.unlocked && 'grayscale'}`}>
                        {achievement.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        
                        {achievement.unlocked ? (
                          <div className="flex items-center gap-2 text-xs text-green-600">
                            <Award className="w-3 h-3" />
                            Débloqué le {achievement.date}
                          </div>
                        ) : (
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-1">
                              <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{achievement.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6">📊 Activité récente</h2>
              
              <div className="space-y-6">
                {recentActivity.map((day, index) => (
                  <div key={index}>
                    <h3 className="text-sm text-gray-500 mb-3">{day.date}</h3>
                    <div className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
