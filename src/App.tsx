import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import ResetPassword from './components/ResetPassword';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProgressTab from './components/ProgressTab';
import TestsTab from './components/TestsTab';
import ResultsTab from './components/ResultsTab';
import QuestionBank from './components/QuestionBank';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SuccessPage } from './pages/SuccessPage';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { PricingPage } from './pages/PricingPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PaywallRoute } from './components/auth/PaywallRoute';
import { supabase } from './lib/supabase';
import { useExamSelection } from './hooks/useExamSelection';
import { useAuthStore } from './store/authStore';
import { useSubscriptionStore } from './store/subscriptionStore';
const LandingPage = lazy(() => import('./components/landing/LandingPage'));

function Dashboard({ isAuthenticated, setIsAuthenticated }: {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<'tests' | 'resultats' | 'progression' | 'questions'>('tests');
  const [showSettings, setShowSettings] = useState(false);
  const { selectedExamId, setSelectedExamId } = useExamSelection();

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSettingsClick={() => setShowSettings(true)} />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pt-20 pl-72 pr-8 pb-8">
        {activeTab === 'tests' && <TestsTab selectedExamId={selectedExamId} setSelectedExamId={setSelectedExamId} />}
        {activeTab === 'resultats' && <ResultsTab selectedExamId={selectedExamId} setSelectedExamId={setSelectedExamId} />}
        {activeTab === 'progression' && <ProgressTab selectedExamId={selectedExamId} setSelectedExamId={setSelectedExamId} />}
        {activeTab === 'questions' && <QuestionBank />}
      </main>
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { initialize } = useAuthStore();
  const { fetchSubscription } = useSubscriptionStore();

  useEffect(() => {
    initialize();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        fetchSubscription();
      }
    });

    return () => subscription.unsubscribe();
  }, [initialize]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Chargement...</div>
        </div>
      }>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/*" element={
              <>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/subscription" element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/app/*" element={
                    <PaywallRoute>
                      <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                    </PaywallRoute>
                  } />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;