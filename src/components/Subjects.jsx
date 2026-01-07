import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calculator, FlaskConical, Globe, BookText, Music, Palette, Users, Code } from 'lucide-react';

export function Subjects() {
  const subjects = [
    {
      name: 'Mathématiques',
      icon: Calculator,
      courses: 1247,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1613563696485-f64240817218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3Njc2MzAwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Sciences (SVT)',
      icon: FlaskConical,
      courses: 892,
      color: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3Njc2MTEwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Français',
      icon: BookText,
      courses: 1134,
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NTk2Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Histoire-Géo',
      icon: Globe,
      courses: 756,
      color: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NTk2Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Anglais',
      icon: Users,
      courses: 623,
      color: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NTk2Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Physique-Chimie',
      icon: FlaskConical,
      courses: 543,
      color: 'bg-indigo-500',
      image: 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3Njc2MTEwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Arts Plastiques',
      icon: Palette,
      courses: 234,
      color: 'bg-pink-500',
      image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NTk2Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Technologie',
      icon: Code,
      courses: 387,
      color: 'bg-teal-500',
      image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NTk2Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">
            Toutes les matières
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des milliers de cours, exercices et fiches de révision pour chaque matière
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <button
              key={index}
              className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image background */}
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Icon */}
                <div className={`absolute top-4 left-4 w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <subject.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-left">
                <h3 className="text-gray-900 mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-600">{subject.courses} cours disponibles</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
