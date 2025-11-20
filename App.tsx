import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CertificationTracker } from './components/CertificationTracker';
import { RealPositions } from './components/RealPositions';
import { Portfolio } from './components/Portfolio';
import { AICoach } from './components/AICoach';
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
      case 'investors':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-xl border border-slate-200 border-dashed p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Under Construction</h2>
            <p className="text-slate-500 max-w-md">
              The {currentPage === 'financials' ? 'Financial Planning' : 'Investor Relations'} module is scheduled for development in Phase 2 of the app roadmap.
            </p>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="mt-6 text-electric-600 font-medium hover:underline"
            >
              Return to Dashboard
            </button>
          </div>
        );
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