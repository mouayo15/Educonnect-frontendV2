import { useState, useEffect } from 'react';
import { AppNav } from './AppNav';
import { useGame } from '../contexts/GameContext';

export function LeaderboardPage({ onNavigate, onLogout }) {
  const [animateCards, setAnimateCards] = useState(false);
  const { player, league } = useGame();

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, username: 'DragonMaster', level: 12, xp: 1250, league: 'Diamond', avatar: '🐉', isCurrentUser: false },
    { rank: 2, username: 'StarGazer', level: 11, xp: 1180, league: 'Diamond', avatar: '⭐', isCurrentUser: false },
    { rank: 3, username: 'MathWizard', level: 10, xp: 1050, league: 'Diamond', avatar: '🧙', isCurrentUser: false },
    { rank: 4, username: 'BookWorm', level: 9, xp: 920, league: 'Gold', avatar: '📚', isCurrentUser: false },
    { rank: 5, username: player.username, level: player.level, xp: player.xp, league: league.name, avatar: player.avatar, isCurrentUser: true },
    { rank: 6, username: 'ScienceKid', level: 5, xp: 430, league: 'Silver', avatar: '🔬', isCurrentUser: false },
    { rank: 7, username: 'HistoryBuff', level: 4, xp: 380, league: 'Silver', avatar: '🏛️', isCurrentUser: false },
    { rank: 8, username: 'ArtLover', level: 3, xp: 280, league: 'Bronze', avatar: '🎨', isCurrentUser: false },
    { rank: 9, username: 'MusicNote', level: 3, xp: 260, league: 'Bronze', avatar: '🎵', isCurrentUser: false },
    { rank: 10, username: 'SportsFan', level: 2, xp: 180, league: 'Bronze', avatar: '⚽', isCurrentUser: false },
  ];

  const getLeagueEmoji = (leagueName) => {
    switch (leagueName) {
      case 'Diamond': return '💎';
      case 'Gold': return '🥇';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '🏅';
    }
  };

  const getLeagueColor = (leagueName) => {
    switch (leagueName) {
      case 'Diamond': return 'bg-gradient-to-r from-cyan-500 to-blue-600';
      case 'Gold': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Silver': return 'bg-gradient-to-r from-gray-600 to-gray-800';
      case 'Bronze': return 'bg-gradient-to-r from-orange-600 to-red-700';
      default: return 'bg-gray-500';
    }
  };

  const getRankDisplay = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <AppNav currentPage="leaderboard" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className={`mb-8 text-center transform transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600 text-base font-semibold">Top players this week</p>
        </div>

        {/* Your Rank Progress Card */}
        <div className={`mb-8 bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 transform transition-all duration-700 ${animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Your Rank</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{player.avatar}</span>
                <div>
                  <p className="text-gray-900 font-black text-2xl">{player.username}</p>
                  <p className="text-gray-600 text-sm font-bold">#{leaderboardData.find(p => p.isCurrentUser)?.rank || '?'} in the world</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`${getLeagueColor(league.name)} px-4 py-3 rounded-xl inline-block shadow-lg border-2 border-white`}>
                <p className="text-gray-900 text-[10px] font-bold uppercase tracking-wider drop-shadow-lg">Current League</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl drop-shadow-lg">{getLeagueEmoji(league.name)}</span>
                  <span className="text-gray-900 font-black text-xl drop-shadow-lg">{league.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress to Next Rank */}
          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getLeagueEmoji(league.name)}</span>
                <span className="text-gray-900 font-black text-sm">{league.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-black text-sm">Next:</span>
                <span className="text-2xl">{getLeagueEmoji(player.level >= 10 ? 'Diamond' : player.level >= 7 ? 'Gold' : player.level >= 4 ? 'Silver' : 'Bronze')}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-3 shadow-inner">
              <div
                className="h-full transition-all duration-1000 relative shadow-lg"
                style={{ 
                  width: `${(player.xp % 100)}%`,
                  background: 'linear-gradient(to right, #eab308, #f97316, #ef4444)'
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-700 font-bold">{player.xp} XP</span>
              <span className="text-gray-900 font-black bg-gray-200 px-3 py-1 rounded-full">
                {100 - (player.xp % 100)} XP to rank up
              </span>
              <span className="text-gray-700 font-bold">{Math.ceil(player.xp / 100) * 100} XP</span>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className={`mb-10 transform transition-all duration-700 ${animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex items-end justify-center gap-4">
            {/* 2nd Place */}
            {leaderboardData[1] && (
              <div className="flex-1 max-w-[140px]">
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center border-4 border-gray-300 hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">🥈</div>
                  <div className="text-4xl mb-2">{leaderboardData[1].avatar}</div>
                  <p className="font-black text-sm text-gray-900 truncate">{leaderboardData[1].username}</p>
                  <p className="text-xs text-gray-600 font-bold">Level {leaderboardData[1].level}</p>
                  <div className="mt-2 bg-gray-100 rounded-lg px-2 py-1">
                    <p className="text-xs font-bold text-gray-700">{leaderboardData[1].xp} XP</p>
                  </div>
                </div>
                <div className="h-20 bg-gray-300 rounded-t-xl mt-2"></div>
              </div>
            )}

            {/* 1st Place */}
            {leaderboardData[0] && (
              <div className="flex-1 max-w-[160px]">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl text-center border-4 border-yellow-300 hover:scale-105 transition-transform animate-pulse">
                  <div className="text-3xl mb-2 animate-bounce">👑</div>
                  <div className="text-5xl mb-2">{leaderboardData[0].avatar}</div>
                  <p className="font-black text-sm text-white drop-shadow-lg truncate">{leaderboardData[0].username}</p>
                  <p className="text-xs text-white/90 font-bold drop-shadow">Level {leaderboardData[0].level}</p>
                  <div className="mt-2 bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-xs font-black text-white drop-shadow">{leaderboardData[0].xp} XP</p>
                  </div>
                </div>
                <div className="h-32 bg-yellow-400 rounded-t-xl mt-2"></div>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboardData[2] && (
              <div className="flex-1 max-w-[140px]">
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center border-4 border-orange-400 hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">🥉</div>
                  <div className="text-4xl mb-2">{leaderboardData[2].avatar}</div>
                  <p className="font-black text-sm text-gray-900 truncate">{leaderboardData[2].username}</p>
                  <p className="text-xs text-gray-600 font-bold">Level {leaderboardData[2].level}</p>
                  <div className="mt-2 bg-orange-100 rounded-lg px-2 py-1">
                    <p className="text-xs font-bold text-orange-700">{leaderboardData[2].xp} XP</p>
                  </div>
                </div>
                <div className="h-16 bg-orange-400 rounded-t-xl mt-2"></div>
              </div>
            )}
          </div>
        </div>

        {/* Full Rankings */}
        <div className="space-y-2">
          {leaderboardData.map((entry, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} ${
                entry.isCurrentUser
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl scale-105 border-2 border-white'
                  : 'bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              } rounded-xl p-4`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className="w-10 text-center">
                  <span className={`text-xl font-black ${entry.isCurrentUser ? 'text-white' : 'text-gray-700'}`}>
                    {getRankDisplay(entry.rank)}
                  </span>
                </div>

                {/* Avatar */}
                <div className="text-3xl">{entry.avatar}</div>

                {/* Info */}
                <div className="flex-1">
                  <p className={`font-black text-base ${entry.isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                    {entry.username}
                    {entry.isCurrentUser && <span className="ml-1 text-sm font-bold">(You)</span>}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold ${entry.isCurrentUser ? 'text-white/90' : 'text-gray-600'}`}>
                      Level {entry.level}
                    </span>
                    <span className={`text-xs ${entry.isCurrentUser ? 'text-white/70' : 'text-gray-400'}`}>•</span>
                    <span className={`text-xs font-bold ${entry.isCurrentUser ? 'text-white/90' : 'text-gray-600'}`}>
                      {entry.xp} XP
                    </span>
                  </div>
                </div>

                {/* League */}
                <div className={`${entry.isCurrentUser ? 'bg-white/20 border-2 border-white' : getLeagueColor(entry.league)} px-3 py-1.5 rounded-lg`}>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{getLeagueEmoji(entry.league)}</span>
                    <span className={`text-xs font-bold ${entry.isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                      {entry.league}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
