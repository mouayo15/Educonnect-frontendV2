import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

// Game configuration
const XP_PER_LEVEL = 100;
const LEAGUES = {
  BRONZE: { name: 'Bronze', minLevel: 1, maxLevel: 3, color: 'from-orange-700 to-orange-900', icon: '🥉' },
  SILVER: { name: 'Silver', minLevel: 4, maxLevel: 6, color: 'from-gray-400 to-gray-600', icon: '🥈' },
  GOLD: { name: 'Gold', minLevel: 7, maxLevel: 9, color: 'from-yellow-400 to-yellow-600', icon: '🥇' },
  DIAMOND: { name: 'Diamond', minLevel: 10, maxLevel: 15, color: 'from-cyan-400 to-blue-600', icon: '💎' },
};

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('scolarix_player');
    return saved ? JSON.parse(saved) : {
      username: 'Sarah',
      avatar: '👧',
      xp: 450,
      level: 5,
      streak: 7,
      lastLoginDate: new Date().toDateString(),
      subjectsProgress: {
        math: 75,
        french: 60,
        science: 85,
        history: 45,
      },
      completedLessons: [],
      completedQuizzes: [],
    };
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);

  useEffect(() => {
    localStorage.setItem('scolarix_player', JSON.stringify(player));
  }, [player]);

  // Calculate current league based on level
  const getCurrentLeague = (level) => {
    if (level >= LEAGUES.DIAMOND.minLevel) return LEAGUES.DIAMOND;
    if (level >= LEAGUES.GOLD.minLevel) return LEAGUES.GOLD;
    if (level >= LEAGUES.SILVER.minLevel) return LEAGUES.SILVER;
    return LEAGUES.BRONZE;
  };

  // Calculate XP progress within current level
  const getXPProgress = (xp) => {
    const currentLevelXP = xp % XP_PER_LEVEL;
    return {
      current: currentLevelXP,
      needed: XP_PER_LEVEL,
      percentage: (currentLevelXP / XP_PER_LEVEL) * 100,
    };
  };

  // Add XP and check for level up
  const addXP = (amount, reason = '') => {
    setPlayer(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      const oldLevel = prev.level;
      const leveledUp = newLevel > oldLevel;

      if (leveledUp) {
        const newLeague = getCurrentLeague(newLevel);
        const oldLeague = getCurrentLeague(oldLevel);
        const leagueChanged = newLeague.name !== oldLeague.name;

        setLevelUpData({
          oldLevel,
          newLevel,
          xpGained: amount,
          reason,
          leagueChanged,
          newLeague: leagueChanged ? newLeague : null,
        });
        setShowLevelUp(true);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  // Update streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastLogin = player.lastLoginDate;
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = lastLogin === yesterday.toDateString();
      
      setPlayer(prev => ({
        ...prev,
        streak: wasYesterday ? prev.streak + 1 : 1,
        lastLoginDate: today,
      }));
    }
  };

  // Complete lesson
  const completeLesson = (lessonId, subjectKey) => {
    if (!player.completedLessons.includes(lessonId)) {
      setPlayer(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        subjectsProgress: {
          ...prev.subjectsProgress,
          [subjectKey]: Math.min(100, (prev.subjectsProgress[subjectKey] || 0) + 5),
        },
      }));
      addXP(10, 'Lesson completed');
    }
  };

  // Complete quiz
  const completeQuiz = (quizId, score, totalQuestions, difficulty = 'medium') => {
    const xpRewards = {
      easy: 10,
      medium: 20,
      hard: 40,
    };
    
    const baseXP = xpRewards[difficulty] || 20;
    const scoreMultiplier = score / totalQuestions;
    const xpGained = Math.round(baseXP * scoreMultiplier);
    
    if (!player.completedQuizzes.includes(quizId)) {
      setPlayer(prev => ({
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId],
      }));
    }
    
    addXP(xpGained, `Quiz completed: ${score}/${totalQuestions}`);
    return xpGained;
  };

  const league = getCurrentLeague(player.level);
  const xpProgress = getXPProgress(player.xp);

  const value = {
    player,
    league,
    xpProgress,
    addXP,
    updateStreak,
    completeLesson,
    completeQuiz,
    showLevelUp,
    levelUpData,
    closeLevelUp: () => setShowLevelUp(false),
    XP_PER_LEVEL,
    LEAGUES,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
