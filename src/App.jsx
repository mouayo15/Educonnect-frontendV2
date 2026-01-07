import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { NotificationProvider } from './components/NotificationProvider';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { CoursePage } from './components/CoursePage';
import { ExercisePage } from './components/ExercisePage';
import { QuizPage } from './components/QuizPage';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: 'Guest User', email: 'guest@example.com' });

  // Check for existing authentication on app load
  useEffect(() => {
    // Authentication disabled - allowing direct access
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

  // Main app for logged in users
  return (
    <NotificationProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
        {currentPage === 'cours' && <CoursePage onNavigate={handleNavigate} onLogout={handleLogout} />}
        {currentPage === 'exercices' && <ExercisePage onNavigate={handleNavigate} onLogout={handleLogout} />}
        {currentPage === 'quiz' && <QuizPage onNavigate={handleNavigate} onLogout={handleLogout} />}
        {currentPage === 'profil' && <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />}
      </div>
    </NotificationProvider>
  );
}
