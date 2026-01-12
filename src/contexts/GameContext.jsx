import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import api from '../lib/api';

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
  const { user, isAuthenticated } = useAuth();
  const [player, setPlayer] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasUpdatedStreakRef = useRef(false);

  // Fetch player data from backend when user is authenticated
  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!isAuthenticated || !user) {
        setPlayer(null);
        setLoading(false);
        return;
      }

      try {
        // Use the authenticated user data from AuthContext
        setPlayer({
          id: user.id,
          username: user.username,
          avatar: user.avatar || '👤',
          xp: user.xp || 0,
          level: user.level || 1,
          streak: user.streak || 0,
          email: user.email,
        });
      } catch (error) {
        console.error('Failed to load player data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [user, isAuthenticated]);

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
  const addXP = useCallback(async (amount, reason = '') => {
    if (!player) return;

    const newXP = player.xp + amount;
    const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
    const oldLevel = player.level;
    const leveledUp = newLevel > oldLevel;

    // Update local state immediately for responsiveness
    setPlayer(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel,
    }));

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

    // Sync with backend (fire and forget, don't block UI)
    try {
      await api.users.updateProfile({ xp: newXP, level: newLevel });
    } catch (error) {
      console.error('Failed to sync XP with backend:', error);
    }
  }, [player]);

  // Update streak
  const updateStreak = useCallback(async () => {
    if (!player) return;
    if (hasUpdatedStreakRef.current) return;
    hasUpdatedStreakRef.current = true;

    // The backend handles streak logic, so just call the endpoint
    try {
      const updatedUser = await api.users.getProfile();
      setPlayer(prev => ({
        ...prev,
        streak: updatedUser.streak,
      }));
    } catch (error) {
      console.error('Failed to update streak:', error);
    }
  }, [player]);

  // Complete lesson
  const completeLesson = useCallback(async (lessonId, subjectKey) => {
    if (!player) return;

    try {
      // Call backend to complete lesson
      const result = await api.courses.completeLesson(lessonId, {});
      
      // Update local state with backend response
      if (result.xpGained) {
        await addXP(result.xpGained, 'Lesson completed');
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    }
  }, [player, addXP]);

  // Complete quiz
  const completeQuiz = useCallback(async (quizId, answers) => {
    if (!player) return 0;

    try {
      // Submit quiz to backend
      const result = await api.quizzes.submitAttempt(quizId, { answers });
      
      // Backend returns: { score, totalQuestions, xpGained, passed, etc. }
      if (result.xpGained) {
        await addXP(result.xpGained, `Quiz completed: ${result.score}/${result.totalQuestions}`);
      }

      return result.xpGained || 0;
    } catch (error) {
      console.error('Failed to complete quiz:', error);
      return 0;
    }
  }, [player, addXP]);

  // Don't render children until we've checked authentication
  if (loading) {
    return <div>Loading game data...</div>;
  }

  // If not authenticated, provide minimal context
  if (!player) {
    const value = {
      player: null,
      league: LEAGUES.BRONZE,
      xpProgress: { current: 0, needed: XP_PER_LEVEL, percentage: 0 },
      addXP: () => {},
      updateStreak: () => {},
      completeLesson: () => {},
      completeQuiz: () => {},
      showLevelUp: false,
      levelUpData: null,
      closeLevelUp: () => {},
      XP_PER_LEVEL,
      LEAGUES,
    };
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
  }

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
