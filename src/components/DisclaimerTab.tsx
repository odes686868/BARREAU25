import { AlertTriangle, Mail, Shield, FileWarning, Scale } from 'lucide-react';

export default function DisclaimerTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">
              Clause de Non-Responsabilité
            </h1>
          </div>
          <p className="text-amber-100 mt-2">
            Veuillez lire attentivement les conditions suivantes avant d'utiliser cette application.
          </p>
        </div>

        <div className="p-8 space-y-8">
          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <FileWarning className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                1. Nature du Contenu
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              L'ensemble des questions, réponses et contenus pédagogiques présentés sur cette plateforme
              ont été générés exclusivement par l'intelligence artificielle <strong>Grok 3 de xAI</strong>.
              Ce contenu n'a pas été rédigé, vérifié ou validé par des professionnels du droit,
              des enseignants ou des experts en la matière.
            </p>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                2. Statut de Prototype
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Cette application est un <strong>prototype en cours de développement</strong>.
              En conséquence, les questions et réponses peuvent contenir des erreurs, des inexactitudes,
              des informations obsolètes ou incomplètes. Les utilisateurs sont invités à exercer
              leur propre jugement critique et à vérifier toute information auprès de sources officielles
              et autorisées.
            </p>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <Scale className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                3. Exclusion de Responsabilité
              </h2>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>L'éditeur de cette application décline toute responsabilité</strong> concernant :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Tout échec à un examen, concours ou évaluation professionnelle, quelle qu'en soit la nature,
                  résultant directement ou indirectement de l'utilisation de cette application
                </li>
                <li>
                  Toute conséquence professionnelle, académique, financière ou personnelle
                  découlant de l'utilisation des informations fournies
                </li>
                <li>
                  Toute erreur, omission ou inexactitude dans le contenu généré par l'intelligence artificielle
                </li>
                <li>
                  Tout dommage direct, indirect, accessoire, spécial ou consécutif lié à l'utilisation
                  ou à l'impossibilité d'utiliser cette application
                </li>
                <li>
                  Toute interruption de service, perte de données ou dysfonctionnement technique
                </li>
              </ul>
            </div>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                4. Acceptation des Conditions
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              En utilisant cette application, vous reconnaissez avoir lu, compris et accepté
              les présentes conditions. Vous acceptez d'utiliser cette application
              <strong> à vos propres risques</strong> et reconnaissez que le contenu fourni
              ne constitue en aucun cas un conseil juridique, professionnel ou académique.
            </p>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <FileWarning className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                5. Recommandations
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Cette application est destinée uniquement à des fins d'entraînement et de révision complémentaires.
              Elle ne saurait se substituer à une préparation rigoureuse basée sur des sources officielles,
              des cours dispensés par des professionnels qualifiés, ou des ouvrages de référence reconnus
              dans le domaine concerné.
            </p>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <Scale className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                6. Droit Applicable
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Les présentes conditions sont régies par le droit québécois. Tout litige relatif
              à l'interprétation ou à l'exécution des présentes sera soumis à la compétence
              exclusive des tribunaux québécois compétents.
            </p>
          </section>

          <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-[#1e2c4f]" />
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Pour toute question, suggestion, commentaire ou réclamation concernant cette application,
              veuillez nous contacter à l'adresse suivante :
            </p>
            <a
              href="mailto:barreauia25@gmail.com"
              className="inline-flex items-center space-x-2 text-[#1e2c4f] hover:text-[#2d4270] font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>barreauia25@gmail.com</span>
            </a>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 text-center">
              <strong>Date de dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
