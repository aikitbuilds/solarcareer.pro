import React, { useState } from 'react';
import { DollarSign, GraduationCap, Landmark, ExternalLink, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { GrantOpportunity } from '../types';

export const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'grants' | 'training'>('overview');

  const grants: GrantOpportunity[] = [
    {
      id: 'g1',
      name: 'WIOA Workforce Grant',
      amount: 4000,
      status: 'Applied',
      deadline: 'Rolling',
      requirements: ['Unemployed/Underemployed', 'Texas Resident', 'Approved Training Provider']
    },
    {
      id: 'g2',
      name: 'Texas Public Education Grant (TPEG)',
      amount: 1500,
      status: 'Not Started',
      deadline: '2025-12-01',
      requirements: ['FAFSA Completion', 'Financial Need']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Financial Strategy</h2>
          <p className="text-slate-500">Managing capital, grants, and training costs.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'overview' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Overview
          </button>
          <button 
             onClick={() => setActiveTab('grants')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'grants' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Grants & Aid
          </button>
          <button 
             onClick={() => setActiveTab('training')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'training' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Cost Optimization
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-700">Total Budget</h3>
             </div>
             <div className="text-3xl font-bold text-slate-900">$30,000</div>
             <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
             </div>
             <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Spent: $4,500</span>
                <span>Remaining: $25,500</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Landmark className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-700">Potential Grant Funding</h3>
             </div>
             <div className="text-3xl font-bold text-slate-900">$5,500</div>
             <p className="text-sm text-slate-500 mt-2">
                Leveraging WIOA could offset 60% of certification costs.
             </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-solar-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-solar-600" />
                </div>
                <h3 className="font-bold text-slate-700">Projected Income (Yr 1)</h3>
             </div>
             <div className="text-3xl font-bold text-slate-900">$58,000</div>
             <p className="text-sm text-slate-500 mt-2">
                Based on conservative NABCEP Associate entry-level roles.
             </p>
          </div>
        </div>
      )}

      {activeTab === 'grants' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">External Funding Opportunities</h3>
            <p className="text-sm text-slate-500">Government grants and workforce development funds to reduce investor dependency.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {grants.map(grant => (
                <div key={grant.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg text-slate-900">{grant.name}</h4>
                            <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${grant.status === 'Applied' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                {grant.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {grant.requirements.map((req, i) => (
                                <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{req}</span>
                            ))}
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-xl font-bold text-green-600">${grant.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">Max Coverage</div>
                        <button className="mt-3 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition flex items-center gap-2 ml-auto">
                            View Details <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" /> Current Path (Premium)
                </h3>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900">Everblue PV Associate</span>
                        <span className="font-bold text-red-600">$999</span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>Live instructor access</li>
                        <li>Guarantee pass</li>
                        <li>High brand recognition</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Optimized Path (Value)
                </h3>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900">MREA PV Associate</span>
                        <span className="font-bold text-green-600">$595</span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>Self-paced online</li>
                        <li>Same NABCEP eligibility</li>
                        <li><span className="font-bold text-green-700">Save $404</span></li>
                    </ul>
                </div>
                 <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900">HeatSpring Free Series</span>
                        <span className="font-bold text-green-600">$0</span>
                    </div>
                    <p className="text-xs text-slate-500">Excellent supplemental material for basic electrical theory.</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};