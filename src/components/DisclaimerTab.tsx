import { AlertTriangle, Mail, Shield, FileWarning, Scale } from 'lucide-react';

export default function DisclaimerTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">
              Clause de Non-Responsabilite
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
              L'ensemble des questions, reponses et contenus pedagogiques presentes sur cette plateforme
              ont ete generes exclusivement par l'intelligence artificielle <strong>GROK</strong>.
              Ce contenu n'a pas ete redige, verifie ou valide par des professionnels du droit,
              des enseignants ou des experts en la matiere.
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
              Cette application est un <strong>prototype en cours de developpement</strong>.
              En consequence, les questions et reponses peuvent contenir des erreurs, des inexactitudes,
              des informations obsoletes ou incompletes. Les utilisateurs sont invites a exercer
              leur propre jugement critique et a verifier toute information aupres de sources officielles
              et autorisees.
            </p>
          </section>

          <section className="border-l-4 border-amber-500 pl-6">
            <div className="flex items-center space-x-2 mb-3">
              <Scale className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                3. Exclusion de Responsabilite
              </h2>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>L'editeur de cette application decline toute responsabilite</strong> concernant :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Tout echec a un examen, concours ou evaluation professionnelle, quelle qu'en soit la nature,
                  resultant directement ou indirectement de l'utilisation de cette application
                </li>
                <li>
                  Toute consequence professionnelle, academique, financiere ou personnelle
                  decoulant de l'utilisation des informations fournies
                </li>
                <li>
                  Toute erreur, omission ou inexactitude dans le contenu genere par l'intelligence artificielle
                </li>
                <li>
                  Tout dommage direct, indirect, accessoire, special ou consecutif lie a l'utilisation
                  ou a l'impossibilite d'utiliser cette application
                </li>
                <li>
                  Toute interruption de service, perte de donnees ou dysfonctionnement technique
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
              En utilisant cette application, vous reconnaissez avoir lu, compris et accepte
              les presentes conditions. Vous acceptez d'utiliser cette application
              <strong> a vos propres risques</strong> et reconnaissez que le contenu fourni
              ne constitue en aucun cas un conseil juridique, professionnel ou academique.
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
              Cette application est destinee uniquement a des fins d'entrainement et de revision complementaires.
              Elle ne saurait se substituer a une preparation rigoureuse basee sur des sources officielles,
              des cours dispenses par des professionnels qualifies, ou des ouvrages de reference reconnus
              dans le domaine concerne.
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
              Les presentes conditions sont regies par le droit francais. Tout litige relatif
              a l'interpretation ou a l'execution des presentes sera soumis a la competence
              exclusive des tribunaux francais competents.
            </p>
          </section>

          <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-[#1e2c4f]" />
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Pour toute question, suggestion, commentaire ou reclamation concernant cette application,
              veuillez nous contacter a l'adresse suivante :
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
              <strong>Date de derniere mise a jour :</strong> {new Date().toLocaleDateString('fr-FR', {
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
