
import React, { useState, useEffect } from 'react';
import { Sun, LayoutDashboard, Award, DollarSign, Users, Bot, Menu, X, LogOut, Briefcase, FolderKanban, GitBranch, Settings, Book, Wifi, WifiOff, Cloud, ExternalLink, ChevronRight, PieChart, ShieldCheck } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface Props {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<Props> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { data } = useData();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const NavItem = ({ 
    page, 
    icon: Icon, 
    label, 
    color = 'electric',
    badge
  }: { 
    page: string; 
    icon: any; 
    label: string;
    color?: 'electric' | 'solar' | 'green' | 'purple' | 'slate';
    badge?: string;
  }) => {
    const isActive = activePage === page;

    // Dynamic Color Map
    const colorStyles = {
      electric: {
        active: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-blue-100/50'
      },
      solar: {
        active: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-orange-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-orange-100/50'
      },
      green: {
        active: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-emerald-100/50'
      },
      purple: {
        active: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-purple-100/50'
      },
      slate: {
        active: 'bg-slate-800 text-white shadow-slate-500/30',
        iconActive: 'bg-white/20 text-white',
        iconInactive: 'bg-slate-100 text-slate-600 group-hover:bg-slate-800 group-hover:text-white',
        hover: 'hover:bg-white hover:shadow-md hover:shadow-slate-200/50'
      }
    };

    const style = colorStyles[color];

    return (
      <button
        onClick={() => {
          onNavigate(page);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden mb-1.5 ${
          isActive 
            ? `${style.active} shadow-lg translate-x-1` 
            : `text-slate-500 ${style.hover} hover:translate-x-1`
        }`}
      >
        {/* Icon Container */}
        <div className={`p-2 rounded-lg transition-all duration-300 ${
          isActive ? style.iconActive : style.iconInactive
        }`}>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300 group-hover:scale-110" />
        </div>

        <div className="flex-1 text-left">
          <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
            {label}
          </span>
        </div>
        
        {/* Active Indicator */}
        {isActive && (
           <div className="mr-2 w-2 h-2 rounded-full bg-white animate-pulse shadow-sm"></div>
        )}
        
        {/* Optional Badge */}
        {badge && !isActive && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-slate-200 transition">
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-50/50 backdrop-blur-xl border-r border-slate-200 h-screen sticky top-0 z-20">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-solar-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-solar-500/20 transform hover:rotate-12 transition-transform duration-500">
              <Sun className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
               <h1 className="font-extrabold text-xl text-slate-800 leading-tight tracking-tight">SolarCareer<span className="text-electric-600">.Pro</span></h1>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mission Control</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2 no-scrollbar">
          
          {/* CORE OPERATIONS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Operations</p>
             <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" color="electric" />
             <NavItem page="real-positions" icon={Briefcase} label="Real Positions" color="electric" />
             <NavItem page="certifications" icon={Award} label="Certifications" color="electric" />
             <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" color="electric" />
          </div>

          {/* FINANCIALS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Capital</p>
             <NavItem page="financials" icon={DollarSign} label="Financials" color="green" />
             <NavItem page="investors" icon={Users} label="Investor CRM" color="green" badge="3" />
          </div>

          {/* AI TOOLS */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Intelligence</p>
             <NavItem page="ai-coach" icon={Bot} label="AI Coach" color="solar" badge="Online" />
          </div>

          {/* ADMIN */}
          <div className="mb-6">
             <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Admin</p>
             <NavItem page="documentation" icon={Book} label="Documentation" color="purple" />
             <NavItem page="data-management" icon={Settings} label="Data & Backup" color="purple" />
             <NavItem page="app-roadmap" icon={GitBranch} label="Dev Roadmap" color="slate" />
          </div>
          
          {/* External App Link if configured */}
          {data.syncSettings?.externalAppUrl && (
            <div className="px-2 mt-4">
               <a 
                href={data.syncSettings.externalAppUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group"
              >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                   <Cloud size={20} />
                </div>
                <div className="flex-1">
                   <span className="text-sm font-bold text-slate-700 block group-hover:text-purple-700">SolarDrive</span>
                   <span className="text-[10px] text-slate-400">External Sync Active</span>
                </div>
                <ExternalLink size={14} className="text-slate-300 group-hover:text-purple-400" />
              </a>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          {/* Connectivity Status */}
          <div className={`mb-3 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-bold border ${isOnline ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
             <div className="flex items-center gap-2">
               {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
               {isOnline ? 'System Online' : 'Offline Mode'}
             </div>
             <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 flex justify-between items-center p-4 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-solar-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
            <Sun className="text-white w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-800 leading-none">SolarCareer</span>
            {!isOnline && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Offline Mode</span>}
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition">
          {mobileMenuOpen ? <X className="text-slate-600" /> : <Menu className="text-slate-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-50 z-40 pt-20 px-4 overflow-y-auto">
          <nav className="space-y-1 pb-20">
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-4">Core</p>
            <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" color="electric" />
            <NavItem page="real-positions" icon={Briefcase} label="Real Positions" color="electric" />
            <NavItem page="certifications" icon={Award} label="Certifications" color="electric" />
            <NavItem page="portfolio" icon={FolderKanban} label="Portfolio" color="electric" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Capital</p>
            <NavItem page="financials" icon={DollarSign} label="Financials" color="green" />
            <NavItem page="investors" icon={Users} label="Investors" color="green" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Tools</p>
            <NavItem page="ai-coach" icon={Bot} label="AI Coach" color="solar" />
            
            <p className="px-4 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-6">Admin</p>
            <NavItem page="documentation" icon={Book} label="Docs" color="purple" />
            <NavItem page="data-management" icon={Settings} label="Data" color="purple" />
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
