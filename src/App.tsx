import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProgressTab from './components/ProgressTab';
import TestsTab from './components/TestsTab';
import ResultsTab from './components/ResultsTab';
import QuestionBank from './components/QuestionBank';
import { useExamSelection } from './hooks/useExamSelection';

const LandingPage = lazy(() => import('./components/landing/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Success = lazy(() => import('./pages/Success'));

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'tests' | 'resultats' | 'progression' | 'questions'>('tests');
  const [showSettings, setShowSettings] = useState(false);
  const { selectedExamId, setSelectedExamId } = useExamSelection();

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
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />

          <Route path="/app" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
