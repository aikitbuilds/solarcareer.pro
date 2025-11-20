
import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, GitBranch, GitCommit, Bug, Zap, Layout, Server, Shield, Smartphone, Book, MapPin, Wifi, DollarSign, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

interface Task {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Design' | 'Docs';
  status: 'Done' | 'In Progress' | 'Upcoming' | 'Todo';
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
    { id: '9', title: 'Documentation Center', category: 'Docs', status: 'Done', priority: 'High' },
    { id: '10', title: 'Framework Export System', category: 'Backend', status: 'Done', priority: 'High' },
    { id: '11', title: 'Mobile Field Logs (GPS)', category: 'Frontend', status: 'Done', priority: 'High' },
    { id: '12', title: 'Offline Mode (PWA)', category: 'Frontend', status: 'Done', priority: 'High' },
    { id: '13', title: 'Rich Text CRM Editor', category: 'Frontend', status: 'Done', priority: 'Medium' },
    { id: '14', title: 'Dynamic Portfolio Screenshots', category: 'Backend', status: 'Done', priority: 'Medium' },
    { id: '15', title: 'Cloud Sync (Firebase)', category: 'Backend', status: 'Done', priority: 'High' },
    { id: '16', title: 'Workbook & Planner', category: 'Frontend', status: 'Done', priority: 'High' },
    
    // In Progress
    { id: '17', title: 'Beta Testing Phase 1 (Admin)', category: 'Docs', status: 'In Progress', priority: 'High' },
    
    // Upcoming / Beta
    { id: '18', title: 'Stripe Payment Integration', category: 'Backend', status: 'Todo', priority: 'Low' },
    { id: '19', title: 'User Auth (Google/Email)', category: 'Backend', status: 'Todo', priority: 'High' },
    { id: '20', title: 'Automated Weekly Reports', category: 'AI', status: 'Upcoming', priority: 'Medium' }
  ];

  // --- CHART DATA CALCULATION ---

  // 1. Status Distribution (Pie)
  const statusData = [
    { name: 'Done', value: tasks.filter(t => t.status === 'Done').length, color: '#10B981' }, // Green
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#3B82F6' }, // Blue
    { name: 'Pending', value: tasks.filter(t => t.status === 'Todo' || t.status === 'Upcoming').length, color: '#94A3B8' } // Slate
  ];

  // 2. Category Allocation (Bar)
  const categories = ['Frontend', 'Backend', 'AI', 'Docs', 'Design'];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: tasks.filter(t => t.category === cat).length
  }));

  // 3. Velocity Simulation (Area) - Mock Data for visual
  const velocityData = [
    { sprint: 'Sprint 1', tasks: 4 },
    { sprint: 'Sprint 2', tasks: 6 },
    { sprint: 'Sprint 3', tasks: 5 },
    { sprint: 'Current', tasks: 8 },
  ];

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'Done').length,
    progress: Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)
  };

  const renderStatusColumn = (status: 'Done' | 'In Progress' | 'Upcoming' | 'Todo', icon: any, color: string) => {
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
                  task.category === 'Docs' ? 'bg-yellow-100 text-yellow-700' :
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
      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-2">
                            <GitBranch className="w-3 h-3" /> v1.5.0
                        </span>
                        <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Production Ready
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Dev Intelligence</h1>
                    <p className="text-slate-300 max-w-2xl">
                        Real-time analytics of the engineering roadmap and feature velocity.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-electric-400">{stats.progress}%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Total Completion</div>
                </div>
            </div>
        </div>
      </div>

      {/* CHART GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart 1: Project Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-slate-500" /> Project Health
            </h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs font-bold text-slate-600">
                {statusData.map(d => (
                    <div key={d.name} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                        {d.name} ({d.value})
                    </div>
                ))}
            </div>
        </div>

        {/* Chart 2: Effort Allocation */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-500" /> Effort Allocation
            </h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#f8fafc'}} />
                        <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

         {/* Chart 3: Velocity */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-500" /> Development Velocity
            </h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={velocityData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="sprint" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="tasks" stroke="#10B981" fill="#d1fae5" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
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
          {renderStatusColumn('Done', CheckCircle2, 'green')}
          {renderStatusColumn('In Progress', Zap, 'blue')}
          {renderStatusColumn('Upcoming', Clock, 'slate')}
        </div>
      )}

      {activeTab === 'changelog' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-4xl">
          <div className="relative border-l-2 border-slate-100 pl-8 space-y-12">
            
             {/* Entry 1 */}
             <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <Smartphone className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.5.0 - Workbook & Sync</h3>
                  <span className="text-xs text-slate-400">Today</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Added <strong>Workbook</strong> for daily planning and weekly reviews.</li>
                  <li>Added <strong>Firebase Cloud Sync</strong> for connecting to SolarDrive.</li>
                  <li>Added <strong>Analytics Dashboard</strong> to Dev Roadmap.</li>
                </ul>
              </div>
            </div>

             {/* Entry 2 */}
             <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <Book className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.3.0 - Docs & Backup</h3>
                  <span className="text-xs text-slate-400">Yesterday</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Launched <strong>Documentation Center</strong> with User Guides.</li>
                  <li>Added <strong>Framework Export</strong> to allow cloning the app structure.</li>
                  <li>Implemented Data Export/Import (JSON).</li>
                </ul>
              </div>
            </div>

            {/* Entry 3 */}
            <div className="relative">
              <div className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">v1.2.0 - Financials & Investors</h3>
                  <span className="text-xs text-slate-400">2 days ago</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Added <strong>Investor CRM</strong> with Cap Table tracking.</li>
                  <li>Implemented <strong>AI Drafts</strong> for investor updates.</li>
                  <li>Added <strong>Financial Strategy</strong> dashboard with Grant Tracking.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
