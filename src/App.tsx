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
import { supabase } from './lib/supabase';
import { useExamSelection } from './hooks/useExamSelection';
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/app" replace /> : <LandingPage />
          } />
          <Route path="/auth" element={
            isAuthenticated ? <Navigate to="/app" replace /> : <Auth onLogin={() => setIsAuthenticated(true)} />
          } />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/app/*" element={
            isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/auth" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;