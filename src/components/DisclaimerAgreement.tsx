import { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DisclaimerAgreementProps {
  userId: string;
  onAccept: () => void;
}

export default function DisclaimerAgreement({ userId, onAccept }: DisclaimerAgreementProps) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!agreed) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_agreements')
        .upsert({
          user_id: userId,
          disclaimer_accepted: true,
          accepted_at: new Date().toISOString(),
        });

      if (error) throw error;
      onAccept();
    } catch (err) {
      console.error('Error saving agreement:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-5">
          <div className="flex items-center space-x-3">
            <Shield className="w-7 h-7 text-white" />
            <h2 className="text-xl font-bold text-white">
              Conditions d'utilisation
            </h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                Le contenu de cette application a été généré par l'intelligence artificielle
                <strong> Grok 3 de xAI</strong> et n'a pas été vérifié par des professionnels du droit.
              </p>
            </div>

            <p>
              Cette application est un <strong>prototype en cours de développement</strong>.
              Les questions et réponses peuvent contenir des erreurs ou des inexactitudes.
            </p>

            <p>
              L'éditeur décline toute responsabilité concernant tout échec à un examen
              résultant de l'utilisation de cette application.
            </p>

            <p>
              Cette application est destinée uniquement à des fins d'entraînement complémentaire
              et ne remplace pas une préparation basée sur des sources officielles.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#1e2c4f] focus:ring-[#1e2c4f] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                J'ai lu et j'accepte les conditions d'utilisation et la clause de non-responsabilité.
                Je comprends que cette application est un outil d'entraînement et non une source officielle.
              </span>
            </label>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleAccept}
            disabled={!agreed || loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              agreed && !loading
                ? 'bg-[#1e2c4f] text-white hover:bg-[#2d4270]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Enregistrement...' : 'Continuer'}
          </button>
        </div>
      </div>
    </div>
  );
}
