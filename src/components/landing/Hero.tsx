import { GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1e2c4f] to-[#2a3f6f] pt-32 pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Préparez-vous efficacement à l'examen du Barreau
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Maîtrisez les 12 examens du Barreau du Québec avec notre plateforme complète de questions-réponses.
              Préparation ciblée, suivi de progression et explications détaillées pour maximiser votre réussite.
            </p>
            <div className="mt-10 flex items-center gap-x-8">
              <Link
                to="/auth"
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#1e2c4f] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center group"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4">
                <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-lg"></div>
              </div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
                <div className="space-y-6">
                  {[
                    'Questions couvrant les 12 sections du secteur Droit appliqué',
                    'Suivi détaillé de votre progression par catégorie',
                    'Explications complètes pour chaque réponse',
                    'Préparation structurée pour un examen difficile',
                    'Historique complet de vos résultats',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-400/30">
                    <p className="text-white text-sm leading-relaxed">
                      <span className="font-bold text-red-300 text-lg">"Seuls 59 % des candidats</span> de la cohorte 2024-2025 ont réussi l'examen de Droit appliqué à la première tentative."
                    </p>
                    <p className="mt-3 text-white font-semibold">
                      Préparez-vous avec nous pour garantir votre succès!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}