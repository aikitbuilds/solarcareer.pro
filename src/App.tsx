import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Layout } from './components/Layout';
import { UserRole } from './types';
import { INITIAL_CERTIFICATIONS, RECENT_ACTIVITY } from './constants';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Lazy Load Pages
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const CertificationTracker = lazy(() => import('./components/CertificationTracker').then(module => ({ default: module.CertificationTracker })));
const RealPositions = lazy(() => import('./components/RealPositions').then(module => ({ default: module.RealPositions })));
const Portfolio = lazy(() => import('./components/Portfolio').then(module => ({ default: module.Portfolio })));
const AICoach = lazy(() => import('./components/AICoach').then(module => ({ default: module.AICoach })));
const Financials = lazy(() => import('./components/Financials').then(module => ({ default: module.Financials })));
const Investors = lazy(() => import('./components/Investors').then(module => ({ default: module.Investors })));
const Workbook = lazy(() => import('./components/Workbook').then(module => ({ default: module.Workbook })));
const ProjectRoadmap = lazy(() => import('./components/ProjectRoadmap').then(module => ({ default: module.ProjectRoadmap })));
const DataManagement = lazy(() => import('./components/DataManagement').then(module => ({ default: module.DataManagement })));
const Documentation = lazy(() => import('./components/Documentation').then(module => ({ default: module.Documentation })));

const PageLoader = () => (
  <div className="h-full w-full flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
    <Loader2 className="w-10 h-10 animate-spin text-electric-500 mb-4" />
    <span className="text-sm font-medium animate-pulse">Loading Module...</span>
  </div>
);

const AuthenticatedApp: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [navAction, setNavAction] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [loadingOnboarding, setLoadingOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!currentUser) {
        setLoadingOnboarding(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const onboardingCompleted = data.onboarding?.completed ?? false;
          setShowOnboarding(!onboardingCompleted);
        } else {
          // New user - show onboarding
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setShowOnboarding(false);
      } finally {
        setLoadingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, [currentUser]);

  if (!currentUser) {
    return <Login />;
  }

  if (loadingOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-electric-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            userRole={userRole} 
            progress={15} 
            certifications={INITIAL_CERTIFICATIONS}
            recentActivity={RECENT_ACTIVITY}
            onNavigate={setCurrentPage}
          />
        );
      case 'certifications':
        return (
          <CertificationTracker 
            certifications={INITIAL_CERTIFICATIONS} 
            initialAction={navAction}
            onClearAction={() => setNavAction(null)}
          />
        );
      case 'real-positions': return <RealPositions />;
      case 'portfolio': return <Portfolio />;
      case 'ai-coach':
        return (
          <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
             <AICoach onNavigate={setCurrentPage} onAction={setNavAction} />
          </div>
        );
      case 'workbook': return <Workbook />;
      case 'financials': return <Financials />;
      case 'investors': return <Investors />;
      case 'app-roadmap': return <ProjectRoadmap />;
      case 'data-management': return <DataManagement />;
      case 'documentation': return <Documentation />;
      default: return <div>Page not found</div>;
    }
  };

  return (
    <DataProvider>
      <Layout activePage={currentPage} onNavigate={setCurrentPage}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </Layout>
    </DataProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#334155',
          color: '#fff',
          borderRadius: '8px',
        }
      }} />
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default App;