import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { NotificationProvider } from './components/NotificationProvider';
import { GameProvider } from './contexts/GameContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { CoursePage } from './components/CoursePage';
import { ExercisePage } from './components/ExercisePage';
import { QuizPage } from './components/QuizPage';
import { ProfilePage } from './components/ProfilePage';
import { LeaderboardPage } from './components/LeaderboardPage';

function AppContent() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');

  // Check authentication status and set initial page
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // User is authenticated, show dashboard
        if (currentPage === 'landing' || currentPage === 'login' || currentPage === 'register') {
          setCurrentPage('dashboard');
        }
      } else {
        // User is not authenticated, show landing page
        if (currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'register') {
          setCurrentPage('landing');
        }
      }
    }
  }, [isAuthenticated, loading]);

  const handleLogin = (userData) => {
    setCurrentPage('dashboard');
  };

  const handleRegister = (userData) => {
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('landing');
    setAuthMode('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleStartAuth = (mode) => {
    setAuthMode(mode);
    setCurrentPage(mode);
  };

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show auth pages if not logged in
  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return <Login onLogin={handleLogin} onSwitchToRegister={() => handleStartAuth('register')} />;
    }
    if (currentPage === 'register') {
      return <Register onRegister={handleRegister} onSwitchToLogin={() => handleStartAuth('login')} />;
    }
    return <LandingPage onNavigate={handleStartAuth} />;
  }

  // Main app for logged in users
  return (
    <GameProvider>
      <NotificationProvider>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'cours' && <CoursePage onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'exercices' && <ExercisePage onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'quiz' && <QuizPage onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'leaderboard' && <LeaderboardPage onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'profil' && <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />}
        </div>
      </NotificationProvider>
    </GameProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
