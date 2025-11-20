
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CertificationTracker } from './components/CertificationTracker';
import { RealPositions } from './components/RealPositions';
import { Portfolio } from './components/Portfolio';
import { AICoach } from './components/AICoach';
import { Financials } from './components/Financials';
import { Investors } from './components/Investors';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { DataManagement } from './components/DataManagement';
import { Documentation } from './components/Documentation';
import { UserRole } from './types';
import { INITIAL_CERTIFICATIONS, RECENT_ACTIVITY } from './constants';
import { DataProvider } from './contexts/DataContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [navAction, setNavAction] = useState<string | null>(null);

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
      case 'real-positions':
        return <RealPositions />;
      case 'portfolio':
        return <Portfolio />;
      case 'ai-coach':
        return (
          <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
             <AICoach 
                onNavigate={setCurrentPage}
                onAction={setNavAction}
             />
          </div>
        );
      case 'financials':
        return <Financials />;
      case 'investors':
        return <Investors />;
      case 'app-roadmap':
        return <ProjectRoadmap />;
      case 'data-management':
        return <DataManagement />;
      case 'documentation':
        return <Documentation />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
