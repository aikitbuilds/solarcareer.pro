import React from 'react';
import { UserRole, Certification, ActivityItem } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Calendar, DollarSign, Award, ArrowRight } from 'lucide-react';

interface Props {
  userRole: UserRole;
  progress: number;
  certifications: Certification[];
  recentActivity: ActivityItem[];
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<Props> = ({ userRole, progress, certifications, recentActivity, onNavigate }) => {
  const activeCert = certifications.find(c => c.status === 'In Progress');
  
  const progressData = [
    { name: 'Complete', value: progress },
    { name: 'Remaining', value: 100 - progress }
  ];
  const COLORS = ['#3B82F6', '#E2E8F0']; // Electric Blue & Slate 200

  // Get latest score if available
  const latestScore = activeCert?.practiceExamScores && activeCert.practiceExamScores.length > 0 
    ? activeCert.practiceExamScores[activeCert.practiceExamScores.length - 1].score 
    : '--';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-solar-500/20 text-solar-500 text-xs font-bold rounded-full uppercase tracking-wider border border-solar-500/20">
              {userRole === UserRole.ADMIN ? 'Admin View' : 'Investor View'}
            </span>
            <span className="text-slate-400 text-sm">Last updated: Today, 09:41 AM</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userRole === UserRole.ADMIN ? 'Michael' : 'Investor'}</h1>
          <p className="text-slate-300 max-w-2xl">
            Phase 1 is underway. Freedom Solar training is complete, and NABCEP PV Associate prep is on track for December.
          </p>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Widget 1: Overall Progress */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-slate-700">Career Journey</h3>
            <TrendingUp className="w-5 h-5 text-electric-500" />
          </div>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-slate-900">{progress}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Complete</span>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500 mt-2">Phase 1: Foundation</div>
        </div>

        {/* Widget 2: Next Milestone */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Next Target</h3>
            <Calendar className="w-5 h-5 text-solar-500" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-bold text-slate-900 tracking-tight">Dec 15</div>
            <div className="text-electric-600 font-medium">NABCEP PV Associate Exam</div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-solar-500 h-2 rounded-full w-2/3"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-right">65 Days Remaining</p>
        </div>

         {/* Widget 3: Active Certification */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Active Cert</h3>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <div className="my-4">
             <div className="text-lg font-bold text-slate-900">{activeCert?.name || 'None'}</div>
             <div className="text-slate-500 text-sm">{activeCert?.completedHours}/{activeCert?.totalHours} Hours Logged</div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Modules</span>
               <span className="font-medium text-slate-800">4/12</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Practice Score</span>
               <span className="font-medium text-slate-800">{latestScore}%</span>
             </div>
          </div>
        </div>

        {/* Widget 4: Financial Snapshot */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-700">Financials</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="my-4">
            <div className="text-3xl font-bold text-slate-900">$4,500</div>
            <div className="text-sm text-slate-500">Spent of $30,000 Budget</div>
          </div>
           <div className="flex gap-2 mt-auto">
             <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">15% Used</span>
             <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">On Track</span>
           </div>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <button className="text-electric-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map(activity => (
              <div key={activity.id} className="p-4 flex gap-4 hover:bg-slate-50 transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'study' ? 'bg-blue-100 text-blue-600' : activity.type === 'milestone' ? 'bg-solar-100 text-solar-600' : 'bg-slate-100 text-slate-600'}`}>
                  {activity.type === 'study' ? <TrendingUp size={18} /> : activity.type === 'milestone' ? <Award size={18} /> : <DollarSign size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{activity.description}</p>
                  <span className="text-[10px] text-slate-400">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-b from-electric-600 to-electric-800 rounded-xl shadow-lg p-6 text-white">
          <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('certifications')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Log Study Session</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('real-positions')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Add Job Application</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('investors')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between transition group"
            >
              <span className="font-medium">Investor Update</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
             <button 
              onClick={() => onNavigate('ai-coach')}
              className="w-full bg-solar-500 hover:bg-solar-400 text-white p-3 rounded-lg flex items-center justify-between transition font-bold mt-6 shadow-lg"
            >
              <span className="font-medium">Ask AI Coach</span>
              <Award className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;