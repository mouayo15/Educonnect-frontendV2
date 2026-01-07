import { BookOpen, CheckCircle, Sparkles, Target, Video, FileText } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Cours complets',
      description: 'Des cours détaillés et conformes aux programmes officiels de l\'Éducation Nationale',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: CheckCircle,
      title: 'Exercices corrigés',
      description: 'Des milliers d\'exercices avec corrections détaillées pour progresser à ton rythme',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: 'Fiches de révision',
      description: 'Des fiches synthétiques pour réviser efficacement avant les contrôles',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Target,
      title: 'Quiz interactifs',
      description: 'Teste tes connaissances avec des quiz adaptés à ton niveau',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Video,
      title: 'Vidéos pédagogiques',
      description: 'Des vidéos explicatives pour mieux comprendre les notions complexes',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Sparkles,
      title: 'Suivi personnalisé',
      description: 'Suis ta progression et identifie tes points forts et axes d\'amélioration',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Tout ce dont tu as besoin pour réussir
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour t'accompagner tout au long de l'année
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-5`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoins des milliers d'élèves qui améliorent leurs résultats scolaires avec EduLearn
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:shadow-xl transition-shadow">
              Essayer gratuitement
            </button>
            <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors">
              Découvrir les tarifs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
