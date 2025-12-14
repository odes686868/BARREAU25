import { Wrench, Clock, Mail } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-400 to-cyan-500 p-6 rounded-full">
                <Wrench className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Maintenance en cours
          </h1>

          <p className="text-blue-100 text-lg text-center mb-8 leading-relaxed">
            Nous effectuons actuellement des travaux de maintenance pour améliorer votre expérience.
            Le site sera de retour sous peu.
          </p>

          <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-300 mt-1" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Durée estimée</h3>
                <p className="text-blue-200 text-sm">
                  Nous travaillons à rétablir le service dès que possible. Merci de votre patience.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-blue-200 mb-3">Besoin d'aide ?</p>
            <a
              href="mailto:barreauia25@gmail.com"
              className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              <span>Contactez-nous</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-blue-300 text-sm">
              © {new Date().getFullYear()} Barreau IA - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
