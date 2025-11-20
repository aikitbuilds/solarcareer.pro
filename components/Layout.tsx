import React from 'react';
import { Sun, LayoutDashboard, Award, DollarSign, Users, Bot, Menu, X, LogOut, Briefcase, FolderKanban } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<Props> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activePage === page 
          ? 'bg-electric-50 text-electric-600 font-semibold' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="w-8 h-8 bg-solar-500 rounded-lg flex items-center justify-center shadow-lg shadow-solar-500/30">
            <Sun className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">SolarCareer<span className="text-electric-600">TM</span></span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem page="real-positions" icon={Briefcase} label="Real Positions" />
          <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" />
          <NavItem page="certifications" icon={Award} label="Certifications" />
          <NavItem page="financials" icon={DollarSign} label="Financials" />
          <NavItem page="investors" icon={Users} label="Investors" />
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools</p>
          </div>
          <NavItem page="ai-coach" icon={Bot} label="AI Coach" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-500 transition">
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-white z-50 border-b border-slate-200 flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-solar-500 rounded-lg flex items-center justify-center">
            <Sun className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">SolarCareer</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-4">
          <nav className="space-y-2">
            <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem page="real-positions" icon={Briefcase} label="Real Positions" />
            <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" />
            <NavItem page="certifications" icon={Award} label="Certifications" />
            <NavItem page="financials" icon={DollarSign} label="Financials" />
            <NavItem page="investors" icon={Users} label="Investors" />
            <NavItem page="ai-coach" icon={Bot} label="AI Coach" />
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:mt-0 mt-16 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};