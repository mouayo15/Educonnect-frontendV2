import { useEffect, useState } from 'react';
import { ChevronRight, Zap, Trophy, Target, Flame, BookOpen, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotification } from './NotificationProvider';
import { useGame } from '../contexts/GameContext';
import LevelUpPopup from './LevelUpPopup';
import { AppNav } from './AppNav';
import api from '../lib/api';

export function Dashboard({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const notification = useNotification();
  const { player, league, xpProgress, updateStreak, showLevelUp, levelUpData, closeLevelUp } = useGame();

  useEffect(() => {
    setAnimateCards(true);
    // Run once when username is known; avoid function deps to prevent loops
    if (player?.username) {
      updateStreak();
      notification.success(`Welcome back, ${player.username}!`, { description: 'Ready to level up today? 🚀' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.username]);

  // map tailwind-like color tokens to explicit CSS gradients as a reliable fallback
  const gradientMap = {
    'from-amber-400 to-orange-500': 'linear-gradient(135deg,#f59e0b,#f97316)',
    'from-sky-500 to-indigo-500': 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    'from-emerald-400 to-teal-500': 'linear-gradient(135deg,#34d399,#14b8a6)',
    'from-violet-500 to-fuchsia-500': 'linear-gradient(135deg,#8b5cf6,#f472b6)'
  };

  function AnimatedEmoji({ symbol }) {
    // return a decorated element for known symbols
    if (symbol === '🔥') return <span className="emoji-fire" aria-hidden>{symbol}</span>;
    if (symbol === '⚡') return <span className="emoji-lightning" aria-hidden>{symbol}</span>;
    if (symbol === '🎯') return <span className="emoji-target" aria-hidden>{symbol}</span>;
    if (symbol === '🏆') return <span className="emoji-trophy" aria-hidden>{symbol}</span>;
    return <span>{symbol}</span>;
  }

  const [subjects, setSubjects] = useState([
    { name: 'Mathématiques', progress: 75, color: 'bg-blue-500', emoji: '🔢', lessons: 12, exercises: 8 },
    { name: 'Français', progress: 60, color: 'bg-purple-500', emoji: '📖', lessons: 10, exercises: 5 },
  ]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [quizStats, setQuizStats] = useState({ completed: 0, totalScore: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const subs = await api.courses.getAllSubjects();
        if (mounted && Array.isArray(subs)) {
          setSubjects(subs.map(s => ({ name: s.name || s.title || 'Sujet', progress: s.progress || 0, color: 'bg-blue-500', emoji: s.emoji || '📘', lessons: s.lessons_count || 0, exercises: s.exercises_count || 0 })));
        }
      } catch (e) {
        // keep defaults on error
      }

      try {
        const act = await api.users.getActivity();
        if (mounted && act && Array.isArray(act.items)) {
          setRecentActivities(act.items);
        }
      } catch (e) {}

      try {
        const ach = await api.users.getAchievements();
        if (mounted && Array.isArray(ach)) setAchievements(ach);
      } catch (e) {}

      try {
        const stats = await api.users.getStats();
        if (mounted && stats) {
          setQuizStats({
            completed: stats.quizzes_completed || 0,
            totalScore: stats.total_score || 0
          });
        }
      } catch (e) {}
      
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <AppNav currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      {loading ? (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">Chargement...</div>
      ) : (
        <div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Player Card - Simple & Clean */}
        <div
          className={`mb-8 bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-700 ${
            animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Top Section - Player Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
              {player.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-gray-900 mb-1">
                Hey, {player.username}!
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                  Level {player.level}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">
                  {league.icon} {league.name}
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                  🔥 {player.streak} days
                </span>
              </div>
            </div>
          </div>
          
          {/* XP Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">Progress to Level {player.level + 1}</span>
              <span className="text-sm font-bold text-purple-600">{Math.round(xpProgress.current)}/{xpProgress.needed} XP</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                style={{ width: `${xpProgress.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            { emoji: '🔥', value: player.streak, label: "Day Streak", color: 'from-amber-400 to-orange-500', delay: 0 },
            { emoji: '⚡', value: player.xp, label: 'Total XP', color: 'from-sky-500 to-indigo-500', delay: 1 },
            { emoji: '🎯', value: quizStats.completed, label: 'Quizzes Won', color: 'from-emerald-400 to-teal-500', delay: 2 },
            { emoji: '🏆', value: player.level, label: 'Level', color: 'from-violet-500 to-fuchsia-500', delay: 3 },
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-110 cursor-pointer border border-white/10 ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundImage: gradientMap[stat.color], transitionDelay: `${stat.delay * 100}ms` }}
            >
              <motion.div
                className="text-3xl sm:text-4xl mb-2"
                animate={{ y: [0, -8, 0], rotate: [0, 6, -6, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
              >
                <AnimatedEmoji symbol={stat.emoji} />
              </motion.div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 text-white drop-shadow-lg">{stat.value}</div>
              <div className="text-white drop-shadow-md text-xs sm:text-sm font-bold">{stat.label}</div>
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
                <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Your Subjects
                </h2>
                <button 
                  onClick={() => onNavigate('cours')}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold transition-all hover:scale-105"
                >
                  View All →
                </button>
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
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Recent Wins
              </h2>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:translate-x-1 hover:shadow-md transform"
                  >
                    <motion.div className="text-3xl" animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.12 }}>{activity.emoji}</motion.div>
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
              <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-white drop-shadow-lg">
                <Target className="w-5 h-5 text-white" />
                Daily Challenge
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-white drop-shadow-md">Complete 3 lessons</span>
                  <span className="animate-bounce-slow text-white text-xl">2/3 ✅</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className="bg-white h-full rounded-full transition-all duration-700 shadow-lg" style={{ width: '67%' }}></div>
                </div>
                <p className="text-sm text-white drop-shadow-md font-semibold">1 more to earn your daily badge! 🌟</p>
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Your Badges
              </h3>
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
                    }}
                  >
                    <motion.div className="text-3xl mb-2" animate={{ y: [0, -7, 0], rotate: [0, 6, -6, 0], scale: [1, 1.06, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.08 }}>{achievement.emoji}</motion.div>
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
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Quick Play
              </h3>
              <div className="space-y-2">
                {[
                  { icon: <BookOpen className="w-4 h-4" />, text: 'Continue Learning', color: 'bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-400', action: 'cours' },
                  { icon: <Brain className="w-4 h-4" />, text: 'Play Quiz', color: 'bg-purple-500 text-white hover:bg-purple-600 border-2 border-purple-400', action: 'quiz' },
                  { icon: <Target className="w-4 h-4" />, text: 'Practice', color: 'bg-green-500 text-white hover:bg-green-600 border-2 border-green-400', action: 'exercices' },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      notification.info(`Loading ${action.text}...`);
                      onNavigate(action.action);
                    }}
                    className={`w-full p-3 ${action.color} rounded-xl transition-all duration-300 text-left font-black hover:shadow-lg hover:translate-x-1 hover:scale-105 transform flex items-center gap-2`}
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Up Popup */}
      <LevelUpPopup 
        isOpen={showLevelUp}
        onClose={closeLevelUp}
        levelUpData={levelUpData}
      />
      </div>
      )}
    </div>
  );
}
