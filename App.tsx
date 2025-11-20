
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
import { UserRole } from './types';
import { INITIAL_CERTIFICATIONS, RECENT_ACTIVITY } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);

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
        return <CertificationTracker certifications={INITIAL_CERTIFICATIONS} />;
      case 'real-positions':
        return <RealPositions />;
      case 'portfolio':
        return <Portfolio />;
      case 'ai-coach':
        return (
          <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
             <AICoach />
          </div>
        );
      case 'financials':
        return <Financials />;
      case 'investors':
        return <Investors />;
      case 'app-roadmap':
        return <ProjectRoadmap />;
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

export default App;
