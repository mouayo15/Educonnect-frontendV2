import { GraduationCap } from 'lucide-react';

export function Levels() {
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
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">
            Choisis ton niveau
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accède à tous les cours et exercices de ton niveau scolaire
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {levels.map((level, index) => (
            <button
              key={index}
              className="group relative bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900">{level.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{level.category}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
