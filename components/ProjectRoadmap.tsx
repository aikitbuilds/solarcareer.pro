
import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, GitBranch, GitCommit, Bug, Zap, Layout, Server, Shield, Smartphone } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Design';
  status: 'Done' | 'In Progress' | 'Todo';
  priority: 'High' | 'Medium' | 'Low';
}

export const ProjectRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'changelog'>('board');

  const tasks: Task[] = [
    // Completed
    { id: '1', title: 'Core Dashboard UI', category: 'Frontend', status: 'Done', priority: 'High' },
    { id: '2', title: 'Certification Tracker Logic', category: 'Frontend', status: 'Done', priority: 'High' },
    { id: '3', title: 'Gemini AI Integration (Coach)', category: 'AI', status: 'Done', priority: 'High' },
    { id: '4', title: 'Investor CRM & Email Gen', category: 'Backend', status: 'Done', priority: 'High' },
    { id: '5', title: 'Real Positions Job Data', category: 'Design', status: 'Done', priority: 'Medium' },
    { id: '6', title: 'Portfolio Component', category: 'Frontend', status: 'Done', priority: 'Medium' },
    { id: '7', title: 'Financials & Grant Tracking', category: 'Backend', status: 'Done', priority: 'High' },
    { id: '8', title: 'Accountability Mirror (AI)', category: 'AI', status: 'Done', priority: 'High' },
    
    // In Progress
    { id: '9', title: 'Mobile Responsive Polish', category: 'Design', status: 'In Progress', priority: 'High' },
    { id: '10', title: 'Firebase Deployment Setup', category: 'Backend', status: 'In Progress', priority: 'High' },
    
    // Todo
    { id: '11', title: 'Stripe Payment Integration', category: 'Backend', status: 'Todo', priority: 'Low' },
    { id: '12', title: 'Offline Mode (PWA)', category: 'Frontend', status: 'Todo', priority: 'Medium' },
    { id: '13', title: 'User Auth (Google/Email)', category: 'Backend', status: 'Todo', priority: 'High' }
  ];

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'Done').length,
    progress: Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)
  };

  const renderStatusColumn = (status: 'Done' | 'In Progress' | 'Todo', icon: any, color: string) => {
    const items = tasks.filter(t => t.status === status);
    const Icon = icon;

    return (
      <div className="flex-1 min-w-[300px]">
        <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${color === 'green' ? 'border-green-500' : color === 'blue' ? 'border-blue-500' : 'border-slate-300'}`}>
          <Icon className={`w-5 h-5 ${color === 'green' ? 'text-green-600' : color === 'blue' ? 'text-blue-600' : 'text-slate-500'}`} />
          <h3 className="font-bold text-slate-700 uppercase text-sm tracking-wider">{status}</h3>
          <span className="ml-auto bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{items.length}</span>
        </div>
        
        <div className="space-y-3">
          {items.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                  task.category === 'AI' ? 'bg-purple-100 text-purple-700' :
                  task.category === 'Backend' ? 'bg-slate-800 text-white' :
                  task.category === 'Frontend' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {task.category}
                </span>
                {task.priority === 'High' && <span className="w-2 h-2 rounded-full bg-red-500" title="High Priority"></span>}
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-3 group-hover:text-electric-600 transition">{task.title}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <GitCommit className="w-3 h-3" />
                <span>#{task.id.padStart(4, '0')}</span>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
              No tasks in this stage
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* App Development Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-electric-900 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-2">
                <GitBranch className="w-3 h-3" /> v1.2.0-beta
              </span>
              <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Build Passing
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">App Development Roadmap</h1>
            <p className="text-slate-300 max-w-2xl">
              Tracking the construction of the SolarCareer Platform itself.
            </p>
          </div>
          
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.progress}%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{tasks.length}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{stats.done}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Shipped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex bg-white p-1 rounded-lg shadow-sm border border-slate-200 w-fit">
        <button 
          onClick={() => setActiveTab('board')}
          className={`px-4 py-2 text-sm font-bold rounded-md transition flex items-center gap-2 ${activeTab === 'board' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Layout className="w-4 h-4" /> Task Board
        </button>
        <button 
          onClick={() => setActiveTab('changelog')}
          className={`px-4 py-2 text-sm font-bold rounded-md transition flex items-center gap-2 ${activeTab === 'changelog' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Clock className="w-4 h-4" /> Changelog
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'board' && (
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6">
          {renderStatusColumn('Todo', Circle, 'slate')}
          {renderStatusColumn('In Progress', Zap, 'blue')}
          {renderStatusColumn('Done', CheckCircle2, 'green')}
        </div>
      )}

      {activeTab === 'changelog' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-4xl">
          <div className="relative border-l-2 border-slate-100 pl-8 space-y-12">
            
            {/* Entry 1 */}
            <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.2.0 - Financials & Investors</h3>
                  <span className="text-xs text-slate-400">Today</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Added <strong>Investor CRM</strong> with Cap Table tracking.</li>
                  <li>Implemented <strong>AI Drafts</strong> for investor updates.</li>
                  <li>Added <strong>Financial Strategy</strong> dashboard with Grant Tracking.</li>
                </ul>
              </div>
            </div>

             {/* Entry 2 */}
             <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.1.0 - AI Coach & Reflection</h3>
                  <span className="text-xs text-slate-400">Yesterday</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Launched <strong>SolarAI Coach</strong> with Gemini 2.5 Flash.</li>
                  <li>Added <strong>Accountability Mirror</strong> for daily reflection.</li>
                  <li>Integrated Career Audit diagnostics.</li>
                </ul>
              </div>
            </div>

             {/* Entry 3 */}
             <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-800 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <Server className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.0.0 - Core Platform</h3>
                  <span className="text-xs text-slate-400">Oct 25, 2025</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Initial release of Certification Tracker.</li>
                  <li>Portfolio component with 3 major projects.</li>
                  <li>Real Positions market data integration.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tech Stack Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
                <Layout className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <div className="font-bold text-slate-800">React 18</div>
                <div className="text-xs text-slate-500">Frontend Core</div>
            </div>
        </div>
         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
                <div className="font-bold text-slate-800">Gemini 2.5</div>
                <div className="text-xs text-slate-500">AI Engine</div>
            </div>
        </div>
         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
                <Server className="w-5 h-5 text-orange-600" />
            </div>
            <div>
                <div className="font-bold text-slate-800">Firebase</div>
                <div className="text-xs text-slate-500">Hosting/Auth</div>
            </div>
        </div>
         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
                <div className="font-bold text-slate-800">Tailwind</div>
                <div className="text-xs text-slate-500">Styling System</div>
            </div>
        </div>
      </div>
    </div>
  );
};
