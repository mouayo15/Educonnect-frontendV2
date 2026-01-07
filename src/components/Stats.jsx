import { Award, BookOpen, Users, TrendingUp } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: '500K+',
      label: 'Élèves inscrits',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: BookOpen,
      value: '10K+',
      label: 'Cours disponibles',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      value: '50K+',
      label: 'Exercices corrigés',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Taux de réussite',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
