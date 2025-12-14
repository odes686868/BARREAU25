import { Moon } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="relative bg-slate-800 p-6 rounded-full border border-slate-700">
                <Moon className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Site en veille
          </h1>

          <p className="text-slate-300 text-lg text-center mb-8 leading-relaxed">
            Ce site est actuellement fermé et mis en veille.
          </p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-slate-400 text-center text-sm">
              Le service n'est plus accessible.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} Barreau IA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
