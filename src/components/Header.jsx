import { BookOpen, Menu, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

const headerVariant = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } }
};

export function Header({ onNavigate }) {
  return (
    <motion.header
      className="bg-white shadow-sm sticky top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={headerVariant}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">EduLearn</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cours
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Exercices
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Fiches de révision
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Quiz
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <User className="w-4 h-4" />
              Connexion
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              S'inscrire
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
