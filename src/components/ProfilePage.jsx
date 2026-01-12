import { useEffect, useState } from 'react';
import { AppNav } from './AppNav';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, Mail, Calendar, Award, Star, Trophy, TrendingUp, Settings, Bell } from 'lucide-react';
import api from '../lib/api';

export function ProfilePage({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    async function load() {
      try {
        const profile = await api.users.getProfile();
        if (mounted && profile) {
          // Optionally sync displayed user information from profile
        }
      } catch (e) {}

      try {
        const s = await api.users.getStats();
        if (mounted && s) {
          setStats([
            { label: 'Cours terminés', value: s.coursesCompleted || 0, icon: '📚', color: 'bg-blue-500' },
            { label: 'Exercices réussis', value: s.exercisesPassed || 0, icon: '✏️', color: 'bg-green-500' },
            { label: 'Quiz complétés', value: s.quizzesCompleted || 0, icon: '🎯', color: 'bg-purple-500' },
            { label: 'Points totaux', value: s.totalXp || 0, icon: '⭐', color: 'bg-yellow-500' },
          ]);
        }
      } catch (e) {}

      try {
        const ach = await api.users.getAchievements();
        if (mounted && Array.isArray(ach)) setAchievements(ach);
      } catch (e) {}

      try {
        const act = await api.users.getActivity();
        if (mounted && act && Array.isArray(act.items)) setRecentActivity(act.items);
      } catch (e) {}
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      <AppNav currentPage="profil" onNavigate={onNavigate} />
      {loading ? (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">Chargement...</div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className={`mb-8 md:mb-10 transform transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 flex items-center gap-3">
            <User className="w-10 h-10 md:w-12 md:h-12 text-purple-600" />
            My Profile
          </h1>
          <p className="text-gray-700 text-lg font-bold">View your stats and badges</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 ${
              animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '0.1s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 hover:scale-110 transition-transform duration-300 animate-float">
                👧
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-1">Sarah Martin</h2>
              <p className="text-gray-600 mb-4 font-semibold">Classe de 5ème</p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-110 animate-bounce-slow">
                  ⭐ Level 8
                </div>
              </div>

              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 font-semibold">
                  <Mail className="w-4 h-4" />
                  <span>sarah.martin@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-300 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Inscrit depuis octobre 2025</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 font-semibold transform hover:scale-105 hover:shadow-md">
                  <Settings className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
                  Paramètres
                </button>
                <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 font-semibold transform hover:scale-105 hover:shadow-md">
                  <Bell className="w-4 h-4 hover:scale-125 transition-transform duration-300" />
                  Notifications
                </button>
              </div>
            </div>

            {/* Level Progress */}
            <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 animate-bounce-slow" />
                <h3 className="text-lg font-bold">Progression</h3>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2 font-semibold">
                  <span>Level 8</span>
                  <span>Level 9</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden hover:h-4 transition-all duration-300">
                  <div className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full transition-all duration-700 shadow-lg" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <p className="text-sm text-white/80 font-semibold">
                Plus que 200 points pour passer au niveau 9 ! 🎯
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl p-5 shadow-sm text-center hover:shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer ${
                    animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    animation: animateCards ? 'scaleIn 0.5s ease-out' : 'none',
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="text-3xl mb-2 hover:scale-125 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.1}s` }}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
              animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">🏆 Mes badges</h2>
                <span className="text-sm text-gray-600 font-bold bg-purple-100 px-3 py-1 rounded-full">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} débloqués
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      achievement.unlocked
                        ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-400'
                        : 'border-gray-200 bg-gray-50 opacity-70'
                    }`}
                    style={{
                      animation: 'fadeInUp 0.6s ease-out',
                      animationDelay: `${0.3 + index * 50}ms`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl transition-transform duration-300 hover:scale-125 hover:rotate-12 ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                        {achievement.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-bold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">{achievement.description}</p>
                        
                        {achievement.unlocked ? (
                          <div className="flex items-center gap-2 text-xs text-green-600 font-bold animate-bounce-slow">
                            <Award className="w-3 h-3" />
                            Débloqué le {achievement.date}
                          </div>
                        ) : (
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-1 hover:h-3 transition-all duration-300">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-700 shadow-sm"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 font-semibold">{achievement.progress}% complété</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
              animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">📊 Activité récente</h2>
              
              <div className="space-y-6">
                {recentActivity.map((day, index) => (
                  <div key={index} className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-300">
                    <h3 className="text-sm text-gray-500 mb-3 font-bold">{day.date}</h3>
                    <div className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <div 
                          key={actIndex} 
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:translate-x-2 cursor-pointer"
                          style={{
                            animation: 'fadeInLeft 0.5s ease-out',
                            animationDelay: `${0.4 + (index * 3 + actIndex) * 50}ms`,
                          }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 font-semibold">{activity}</span>
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
      )}
    </div>
  );
}
