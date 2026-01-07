import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNotification } from './NotificationProvider';
import { AppNav } from './AppNav';

export function Dashboard({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const notification = useNotification();

  useEffect(() => {
    setAnimateCards(true);
    // Show welcome notification
    notification.success('Welcome to EduLearn!', { description: 'Ready to learn today?' });
  }, [notification]);

  const subjects = [
    { name: 'Mathématiques', progress: 75, color: 'bg-blue-500', emoji: '🔢', lessons: 12, exercises: 8 },
    { name: 'Français', progress: 60, color: 'bg-purple-500', emoji: '📖', lessons: 10, exercises: 5 },
    { name: 'Sciences', progress: 85, color: 'bg-green-500', emoji: '🔬', lessons: 15, exercises: 12 },
    { name: 'Histoire', progress: 45, color: 'bg-orange-500', emoji: '🏛️', lessons: 8, exercises: 3 },
  ];

  const recentActivities = [
    { title: 'Théorème de Pythagore', subject: 'Mathématiques', type: 'Cours terminé', time: 'Il y a 2h', emoji: '✅' },
    { title: 'Quiz sur les fractions', subject: 'Mathématiques', type: 'Quiz réussi', time: 'Hier', emoji: '🎯' },
    { title: 'La photosynthèse', subject: 'Sciences', type: 'Exercices terminés', time: 'Hier', emoji: '✏️' },
  ];

  const achievements = [
    { title: '7 jours consécutifs', emoji: '🔥', unlocked: true },
    { title: 'Premier quiz parfait', emoji: '🌟', unlocked: true },
    { title: '50 exercices réussis', emoji: '🏆', unlocked: true },
    { title: 'Maître des maths', emoji: '🎓', unlocked: false },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <AppNav currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div
          className={`mb-8 md:mb-10 transform transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Salut Sarah ! 👋
          </h1>
          <p className="text-gray-600 text-base md:text-lg">Prête à apprendre de nouvelles choses aujourd'hui ?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            { icon: '🔥', value: '7', label: "Jours d'affilée", color: 'from-blue-500 to-blue-600', delay: 0 },
            { icon: '⭐', value: '245', label: 'Points cette semaine', color: 'from-purple-500 to-purple-600', delay: 1 },
            { icon: '🎯', value: '12', label: 'Quiz réussis', color: 'from-green-500 to-green-600', delay: 2 },
            { icon: '🏆', value: 'Level 8', label: 'Ton niveau', color: 'from-orange-500 to-orange-600', delay: 3 },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 cursor-pointer ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${stat.delay * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 md:mb-2 animate-bounce-slow">{stat.icon}</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">{stat.value}</div>
              <div className="text-opacity-80 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div
              className={`bg-white rounded-xl sm:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">📚 Tes matières</h2>
                <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:font-semibold transition-all">Voir tout</button>
              </div>

              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transition-all duration-300 hover:bg-blue-50 p-3 rounded-xl"
                    onClick={() => onNavigate('cours')}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-125 transition-transform duration-300 group-hover:animate-rotate-slow`}
                        >
                          {subject.emoji}
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.lessons} cours • {subject.exercises} exercices</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-bold">{subject.progress}%</span>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300 ${
                            hoveredIndex === index ? 'translate-x-2' : ''
                          }`}
                        />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${subject.color} h-full rounded-full transition-all duration-700 ${
                          hoveredIndex === index ? 'scale-y-125' : ''
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">🕐 Activités récentes</h2>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:translate-x-1 hover:shadow-md transform"
                  >
                    <div className="text-3xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                      {activity.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold">{activity.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{activity.subject} • {activity.type}</div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div
              className={`bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <h3 className="text-lg font-bold mb-4">🎯 Objectif du jour</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">3 cours à terminer</span>
                  <span className="animate-bounce-slow">2/3 ✅</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                  <div className="bg-white h-full rounded-full transition-all duration-700" style={{ width: '67%' }}></div>
                </div>
                <p className="text-sm text-pink-100">Encore 1 cours et tu auras ton badge du jour ! 🌟</p>
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Tes badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg scale-100 hover:shadow-2xl'
                        : 'bg-gray-100 opacity-50'
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      animation: achievement.unlocked ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                      animationDelay: `${0.5 + index * 0.1}s`,
                    }}
                  >
                    <div className="text-3xl mb-2 animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                      {achievement.emoji}
                    </div>
                    <div className="text-xs font-semibold">{achievement.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Actions rapides</h3>
              <div className="space-y-2">
                {[
                  { icon: '📚', text: "Reprendre là où j'étais", color: 'bg-blue-50 text-blue-700 hover:bg-blue-100', action: 'cours' },
                  { icon: '🎯', text: 'Faire un quiz', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100', action: 'quiz' },
                  { icon: '✏️', text: 'Faire des exercices', color: 'bg-green-50 text-green-700 hover:bg-green-100', action: 'exercices' },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      notification.info(`Navigating to ${action.action}...`);
                      onNavigate(action.action);
                    }}
                    className={`w-full p-3 ${action.color} rounded-xl transition-all duration-300 text-left font-semibold hover:shadow-md hover:translate-x-1 transform`}
                  >
                    {action.icon} {action.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
