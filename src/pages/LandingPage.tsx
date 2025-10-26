import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Target, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getCurrentUser } from '../lib/auth';

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const user = await getCurrentUser();
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Réussissez vos examens avec
              <span className="text-blue-600"> ExamPrep</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Préparez-vous efficacement avec nos quiz interactifs, suivez vos progrès et atteignez vos objectifs académiques.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleGetStarted} size="lg" className="px-8">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link
                to="/pricing"
              >
                <Button variant="outline" size="lg" className="px-8">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir ExamPrep ?</h2>
            <p className="text-xl text-gray-600">Des outils puissants pour maximiser vos chances de réussite</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Interactifs</h3>
              <p className="text-gray-600">Des milliers de questions organisées par matière et niveau de difficulté</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suivi des Progrès</h3>
              <p className="text-gray-600">Visualisez vos performances et identifiez vos points d'amélioration</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certifications</h3>
              <p className="text-gray-600">Obtenez des certificats pour valider vos compétences</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
              <p className="text-gray-600">Échangez avec d'autres étudiants et partagez vos expériences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Étudiants actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Questions disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Taux de réussite</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-semibold">Marie L.</span>
              </div>
              <p className="text-gray-600">"Grâce à ExamPrep, j'ai réussi mon examen avec une excellente note. Les quiz sont très bien conçus !"</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-semibold">Thomas M.</span>
              </div>
              <p className="text-gray-600">"Le suivi des progrès m'a permis de me concentrer sur mes points faibles. Très efficace !"</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-semibold">Sarah K.</span>
              </div>
              <p className="text-gray-600">"Interface intuitive et contenu de qualité. Je recommande vivement cette plateforme !"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à réussir votre examen ?</h2>
            <p className="text-xl text-blue-100 mb-8">Rejoignez des milliers d'étudiants qui ont réussi grâce à notre plateforme.</p>
            <Button onClick={handleGetStarted} size="lg" className="px-8">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}