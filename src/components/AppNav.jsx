import { Home, BookOpen, FileEdit, Brain, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export function AppNav({ currentPage, onNavigate, onLogout }) {
  const [hoverItem, setHoverItem] = useState(null);

  const navItems = [
    { id: 'dashboard', icon: Home, label: '🏠 Tableau de bord', color: 'bg-blue-500' },
    { id: 'cours', icon: BookOpen, label: '📚 Mes cours', color: 'bg-purple-500' },
    { id: 'exercices', icon: FileEdit, label: '✏️ Exercices', color: 'bg-green-500' },
    { id: 'quiz', icon: Brain, label: '🎯 Quiz', color: 'bg-orange-500' },
    { id: 'profil', icon: User, label: '👤 Mon profil', color: 'bg-pink-500' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer group">
            <div className="bg-gray-900 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduLearn</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoverItem(item.id)}
                onMouseLeave={() => setHoverItem(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                  currentPage === item.id
                    ? 'bg-gray-100 text-gray-900 shadow-inner scale-105 border border-gray-200'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
                style={{
                  animation: currentPage === item.id ? 'none' : 'none'
                }}
              >
                <item.icon className={`w-4 h-4 transition-transform duration-300 ${hoverItem === item.id ? 'scale-125' : ''}`} />
                <span className="hidden lg:inline font-medium">{item.label}</span>
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium hover:shadow-md"
          >
            <LogOut className="w-4 h-4 transition-transform duration-300 hover:rotate-180" />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto scroll-smooth">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300 font-semibold whitespace-nowrap ${
                currentPage === item.id
                  ? 'bg-gray-200 text-gray-900 shadow-inner scale-105 border border-gray-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
