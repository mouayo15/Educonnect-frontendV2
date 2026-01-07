import { GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Levels() {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const levels = [
    { name: '6ème', category: 'Collège', color: 'from-blue-500 to-blue-600' },
    { name: '5ème', category: 'Collège', color: 'from-blue-500 to-blue-600' },
    { name: '4ème', category: 'Collège', color: 'from-blue-500 to-blue-600' },
    { name: '3ème', category: 'Collège', color: 'from-blue-500 to-blue-600' },
    { name: '2nde', category: 'Lycée', color: 'from-purple-500 to-purple-600' },
    { name: '1ère', category: 'Lycée', color: 'from-purple-500 to-purple-600' },
    { name: 'Terminale', category: 'Lycée', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transform transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-gray-900 mb-4 animate-fadeInUp">
            Choisis ton niveau
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Accède à tous les cours et exercices de ton niveau scolaire
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {levels.map((level, index) => (
            <button
              key={index}
              className={`group relative bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 hover:border-blue-300 transform ${
                animateCards ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                animation: animateCards ? 'scaleIn 0.5s ease-out' : 'none',
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 rounded-xl transition-all duration-300"></div>
              <div className="relative space-y-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-lg flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{level.name}</div>
                  <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">{level.category}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
