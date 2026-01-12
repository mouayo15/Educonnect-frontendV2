import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Register({ onRegister, onSwitchToLogin }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '👤'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setIsLoading(false);
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        // Call parent onRegister handler if provided
        if (onRegister) {
          onRegister(result.data.user);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="hidden md:block px-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Rejoins EduLearn</h2>
              <p className="text-gray-600">Crée ton compte pour accéder à des cours, des exercices corrigés et des quiz interactifs.</p>
            </div>
          </div>

          <div>
            <div className="text-center md:text-left mb-6 md:mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Inscription</h1>
              <p className="text-gray-600">Créez votre compte EduConnect</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full">
                <User className="w-4 h-4 text-gray-600" aria-hidden="true" />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="jean_dupont"
                required
                minLength={3}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Au moins 3 caractères</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full">
                <Mail className="w-4 h-4 text-gray-600" aria-hidden="true" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="jean.dupont@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full">
                <Lock className="w-4 h-4 text-gray-600" aria-hidden="true" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-14 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-white p-1 rounded-md"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Au moins 8 caractères (1 majuscule, 1 minuscule, 1 chiffre)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar
            </label>
            <select
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="👤">👤 Par défaut</option>
              <option value="👧">👧 Fille</option>
              <option value="👦">👦 Garçon</option>
              <option value="👨">👨 Homme</option>
              <option value="👩">👩 Femme</option>
              <option value="🧑">🧑 Personne</option>
              <option value="🦊">🦊 Renard</option>
              <option value="🐼">🐼 Panda</option>
              <option value="🦁">🦁 Lion</option>
              <option value="🐨">🐨 Koala</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Inscription...' : 'S\'inscrire'}
          </button>
            </form>

            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-600">
                Déjà un compte ?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}