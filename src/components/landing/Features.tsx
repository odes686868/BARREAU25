import { Brain, BarChart as ChartBar, Clock, BookOpen, Target, Users } from 'lucide-react';

const features = [
  {
    name: 'Apprentissage adaptatif',
    description: 'Notre système s\'adapte à votre niveau et à vos besoins pour optimiser votre préparation.',
    icon: Brain,
  },
  {
    name: 'Suivi de progression',
    description: 'Visualisez votre évolution et identifiez les domaines nécessitant plus d\'attention.',
    icon: ChartBar,
  },
  {
    name: 'Tests chronométrés',
    description: 'Préparez-vous aux conditions réelles de l\'examen avec nos tests minutés.',
    icon: Clock,
  },
  {
    name: 'Contenu à jour',
    description: 'Accédez à du contenu régulièrement mis à jour reflétant les dernières exigences du Barreau.',
    icon: BookOpen,
  },
  {
    name: 'Objectifs personnalisés',
    description: 'Définissez vos objectifs et suivez votre progression vers leur réalisation.',
    icon: Target,
  },
  {
    name: 'Communauté d\'entraide',
    description: 'Rejoignez une communauté d\'étudiants partageant le même objectif.',
    icon: Users,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#1e2c4f]">Fonctionnalités</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour réussir
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une suite complète d'outils conçus pour maximiser vos chances de réussite à l'examen du Barreau.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-6 w-6 text-[#1e2c4f]" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}