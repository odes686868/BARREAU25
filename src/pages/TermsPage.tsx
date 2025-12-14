import { Link } from 'react-router-dom';
import { AlertTriangle, Mail, Shield, FileWarning, Scale, ArrowLeft, Lock } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-[#1e2c4f] hover:text-[#2d4270] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour a l'accueil</span>
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Conditions d'utilisation
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
                ont ete generes exclusivement par l'intelligence artificielle <strong>Grok 3 de xAI</strong>.
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
                <Lock className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  6. Protection des Renseignements Personnels
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  La présente politique de protection des renseignements personnels décrit les pratiques de Barreau IA
                  (ci-après le « Site », « l'Application », « nous ») en matière de collecte, d'utilisation, de conservation,
                  de communication et de protection des renseignements personnels des utilisateurs. Cette politique est conforme
                  aux lois applicables en matière de protection des renseignements personnels, notamment la Loi sur la protection
                  des renseignements personnels dans le secteur privé (Québec), telle que modifiée par la Loi 25, ainsi que la Loi
                  sur la protection des renseignements personnels et les documents électroniques (LPRPDE) au Canada.
                </p>
                <p>
                  En utilisant le Site <strong>barreauia.com</strong>, l'utilisateur reconnaît avoir pris connaissance de la présente
                  politique et consent aux pratiques qui y sont décrites.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.1 Responsable de la protection des données</h3>
                <p>
                  Le responsable de la protection des renseignements personnels est le développeur de l'Application, qui peut être
                  joint à l'adresse suivante : <a href="mailto:barreauia25@gmail.com" className="text-[#1e2c4f] hover:underline font-medium">barreauia25@gmail.com</a>.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.2 Renseignements collectés</h3>
                <p>
                  Barreau IA collecte uniquement les renseignements personnels nécessaires à la prestation de ses services éducatifs.
                  Les renseignements personnels pouvant être collectés incluent notamment :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>L'adresse courriel</li>
                  <li>Le mot de passe (stocké sous forme chiffrée)</li>
                  <li>Les informations liées au compte utilisateur</li>
                  <li>Les réponses fournies aux questions</li>
                  <li>Les résultats de tests</li>
                  <li>La progression académique</li>
                  <li>Toute communication transmise volontairement par l'utilisateur</li>
                </ul>
                <p className="mt-2">
                  Certains renseignements techniques peuvent également être collectés automatiquement, tels que l'adresse IP,
                  le type d'appareil, le navigateur utilisé, les données de connexion et d'utilisation, ainsi que des données
                  analytiques anonymisées. Le Site peut utiliser des cookies ou technologies similaires afin d'assurer son bon
                  fonctionnement et d'améliorer l'expérience utilisateur.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.3 Finalités de la collecte</h3>
                <p>Les renseignements personnels sont collectés et utilisés aux fins suivantes :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Création et gestion des comptes utilisateurs</li>
                  <li>Fourniture de services d'étude et de préparation aux examens du Barreau</li>
                  <li>Personnalisation du contenu pédagogique</li>
                  <li>Suivi de la progression académique</li>
                  <li>Amélioration du Site et de ses fonctionnalités</li>
                  <li>Communication avec les utilisateurs</li>
                  <li>Gestion de l'accès aux services</li>
                  <li>Respect des obligations légales et prévention des incidents de sécurité</li>
                </ul>

                <h3 className="font-semibold text-gray-900 mt-4">6.4 Consentement</h3>
                <p>
                  Le consentement de l'utilisateur est obtenu lors de la création du compte et par l'utilisation continue du Site.
                  L'utilisateur peut retirer son consentement en tout temps, sous réserve des obligations légales ou contractuelles
                  applicables. Le retrait du consentement peut entraîner l'impossibilité d'utiliser certaines fonctionnalités ou services.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.5 Intelligence artificielle</h3>
                <p>
                  Le Site utilise des technologies d'intelligence artificielle afin de générer des questions personnalisées et d'adapter
                  le contenu pédagogique. Les renseignements personnels et les données des utilisateurs ne sont pas utilisés pour entraîner,
                  réentraîner ou améliorer des modèles d'intelligence artificielle. Aucune décision produisant un effet juridique ou
                  significatif à l'égard de l'utilisateur n'est prise exclusivement sur la base d'un traitement automatisé.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.6 Paiements</h3>
                <p>
                  Les paiements, lorsqu'applicables, sont traités par des fournisseurs de services tiers sécurisés. Barreau IA ne conserve
                  aucune information de carte de crédit ou de paiement sensible.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.7 Conservation des données</h3>
                <p>
                  Les renseignements personnels sont conservés uniquement pendant la durée nécessaire à la réalisation des finalités pour
                  lesquelles ils ont été collectés. En règle générale, les renseignements sont conservés tant que le compte utilisateur est
                  actif. À la fermeture du compte, les renseignements personnels sont supprimés ou anonymisés dans un délai raisonnable,
                  sauf lorsque leur conservation est requise par la loi.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.8 Sécurité</h3>
                <p>
                  Des mesures de sécurité raisonnables, techniques, administratives et organisationnelles, sont mises en place afin de
                  protéger les renseignements personnels contre l'accès non autorisé, la perte, l'utilisation abusive ou la divulgation.
                  Malgré ces mesures, aucun système informatique n'est entièrement exempt de risques.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.9 Communication à des tiers</h3>
                <p>
                  Les renseignements personnels peuvent être communiqués à des fournisseurs de services tiers uniquement lorsque cela est
                  nécessaire à l'exploitation du Site, notamment pour l'hébergement infonuagique et les services technologiques. Les données
                  sont hébergées sur des serveurs exploités par Amazon Web Services (AWS), lesquels peuvent être situés à l'extérieur du
                  Québec ou du Canada. Des mesures sont prises afin d'assurer une protection adéquate et équivalente des renseignements
                  personnels, conformément aux lois applicables. Les renseignements peuvent également être communiqués lorsque requis par
                  la loi ou en réponse à une demande d'une autorité compétente.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.10 Droits des utilisateurs</h3>
                <p>
                  Conformément aux lois applicables, l'utilisateur dispose d'un droit d'accès, de rectification, de retrait du consentement
                  et de suppression de ses renseignements personnels, sous réserve des exceptions prévues par la loi. Toute demande doit être
                  transmise par écrit au responsable de la protection des renseignements personnels à l'adresse indiquée ci-dessus.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.11 Mineurs</h3>
                <p>
                  Le Site est destiné à un public adulte et n'a pas pour objectif de collecter volontairement des renseignements personnels
                  concernant des personnes de moins de 18 ans.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.12 Incidents de confidentialité</h3>
                <p>
                  En cas d'incident de confidentialité présentant un risque sérieux de préjudice, Barreau IA s'engage à prendre les mesures
                  raisonnables pour limiter les conséquences de l'incident et à aviser les personnes concernées et les autorités compétentes
                  conformément aux exigences légales applicables.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.13 Modifications de la politique</h3>
                <p>
                  Barreau IA se réserve le droit de modifier la présente politique en tout temps. La version à jour est accessible en tout
                  temps sur le Site. L'utilisation continue du Site constitue une acceptation de toute modification apportée à la politique.
                </p>

                <h3 className="font-semibold text-gray-900 mt-4">6.14 Contact</h3>
                <p>
                  Pour toute question concernant la présente politique ou la protection des renseignements personnels, il est possible de
                  communiquer avec le responsable à l'adresse suivante : <a href="mailto:barreauia25@gmail.com" className="text-[#1e2c4f] hover:underline font-medium">barreauia25@gmail.com</a>.
                </p>
              </div>
            </section>

            <section className="border-l-4 border-amber-500 pl-6">
              <div className="flex items-center space-x-2 mb-3">
                <Scale className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  7. Droit Applicable
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Les presentes conditions sont regies par le droit quebecois. Tout litige relatif
                a l'interpretation ou a l'execution des presentes sera soumis a la competence
                exclusive des tribunaux quebecois competents.
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
    </div>
  );
}
