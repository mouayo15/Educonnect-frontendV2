import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { CoursePage } from './components/CoursePage';
import { ExercisePage } from './components/ExercisePage';
import { QuizPage } from './components/QuizPage';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('landing');
    setAuthMode('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Show landing page if not logged in and on landing page
  if (!isLoggedIn && currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
  }

  // Show authentication if not logged in
  if (!isLoggedIn) {
    return (
      <div>
        {authMode === 'login' ? (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  // Main app for logged in users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentPage === 'cours' && <CoursePage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentPage === 'exercices' && <ExercisePage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentPage === 'quiz' && <QuizPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentPage === 'profil' && <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />}
    </div>
  );
}
