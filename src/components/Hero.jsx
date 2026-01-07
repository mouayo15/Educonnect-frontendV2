import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Play } from 'lucide-react';

export function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                Plateforme éducative #1 en France
              </span>
            </div>
            
            <h1 className="text-gray-900">
              Réussis ton année scolaire avec confiance
            </h1>
            
            <p className="text-gray-600 text-lg">
              Des cours détaillés, des exercices corrigés et des quiz interactifs pour tous les niveaux du collège au lycée. Révise efficacement avec nos milliers de ressources pédagogiques.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onGetStarted}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-shadow"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Play className="w-5 h-5" />
                Voir la démo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl text-gray-900">500K+</div>
                <div className="text-sm text-gray-600">Élèves actifs</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Cours disponibles</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nfGVufDF8fHx8MTc2NzYwMzkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Étudiants en train d'étudier"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Progression cette semaine</div>
                    <div className="text-gray-900">+47% en Mathématiques</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
