
import React, { useState } from 'react';
import { Briefcase, DollarSign, TrendingUp, ShieldCheck, MapPin, Calendar, CheckCircle2, AlertCircle, Building2, ArrowRight, BarChart3, PieChart as PieIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const RealPositions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'level1' | 'level2' | 'level3' | 'level4'>('overview');

  // --- CHART DATA ---
  const salaryData = [
    { level: 'Start', salary: 35000 },
    { level: 'L1: Assoc', salary: 52000 },
    { level: 'L2: PVIP', salary: 78000 },
    { level: 'L3: ESIP', salary: 88000 },
    { level: 'L4: PM', salary: 137000 },
  ];

  const roiData = [
    { name: 'L1', cost: 999, return: 4500 }, // Cost vs Monthly Income increment
    { name: 'L2', cost: 2000, return: 6500 },
    { name: 'L3', cost: 2500, return: 7500 },
    { name: 'L4', cost: 2000, return: 11400 },
  ];

  const marketData = [
    { name: 'Install', value: 45, color: '#F59E0B' }, // Solar Gold
    { name: 'PM/Ops', value: 25, color: '#3B82F6' }, // Electric Blue
    { name: 'Sales', value: 20, color: '#10B981' },  // Green
    { name: 'Design', value: 10, color: '#8B5CF6' },  // Purple
  ];

  const renderTabButton = (id: string, label: string, subtitle?: string) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex-1 p-4 text-left border-b-2 transition-colors ${
        activeTab === id
          ? 'border-electric-600 bg-electric-50'
          : 'border-transparent hover:bg-slate-50'
      }`}
    >
      <div className={`font-bold ${activeTab === id ? 'text-electric-700' : 'text-slate-700'}`}>
        {label}
      </div>
      {subtitle && (
        <div className={`text-xs ${activeTab === id ? 'text-electric-500' : 'text-slate-400'}`}>
          {subtitle}
        </div>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Real Positions & Market Data</h2>
          <p className="text-slate-500">Investment protection through guaranteed career earnings.</p>
        </div>
      </div>

      {/* --- MINI DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart 1: Salary Trajectory */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <TrendingUp className="w-4 h-4 text-green-500" /> Career Income Growth
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salaryData}>
                        <defs>
                            <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{fontSize: '12px', borderRadius: '8px'}} formatter={(val: number) => `$${val.toLocaleString()}`} />
                        <Area type="monotone" dataKey="salary" stroke="#10B981" fillOpacity={1} fill="url(#colorSalary)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold">
                <span>Entry ($35k)</span>
                <span className="text-green-600">Peak ($137k)</span>
            </div>
        </div>

        {/* Chart 2: ROI Speed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <DollarSign className="w-4 h-4 text-electric-500" /> Cost vs. Monthly Return
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiData}>
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Bar dataKey="cost" stackId="a" fill="#94A3B8" name="Cert Cost" />
                        <Bar dataKey="return" stackId="a" fill="#3B82F6" name="Monthly Salary" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2 font-bold">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-400 rounded-full"></div> Cost</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-electric-500 rounded-full"></div> Income</div>
            </div>
        </div>

        {/* Chart 3: Market Demand */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <PieIcon className="w-4 h-4 text-solar-500" /> Job Type Distribution
            </h3>
            <div className="h-32 w-full flex gap-4 items-center">
                <div className="flex-1 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={marketData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                                {marketData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1">
                    {marketData.map(d => (
                        <div key={d.name} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden">
        {renderTabButton('overview', 'Investment Analysis', 'ROI & Safety Net')}
        {renderTabButton('level1', 'Level 1: Associate', 'Dec 2025 • $45k+')}
        {renderTabButton('level2', 'Level 2: PVIP', 'Apr 2026 • $70k+')}
        {renderTabButton('level3', 'Level 3: ESIP', 'Jun 2026 • $80k+')}
        {renderTabButton('level4', 'Level 4: CSPM', 'Aug 2026 • $106k+')}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg">Floor Protection</h3>
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  Even if the business never launches, certifications guarantee a high-income career.
                </p>
                <div className="text-2xl font-bold text-white">$106k - $137k</div>
                <div className="text-xs text-slate-400">Guaranteed Annual Salary (Level 4)</div>
              </div>

              <div className="bg-gradient-to-br from-electric-600 to-electric-800 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Business Upside</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">
                  The business launch provides exponential returns on top of the career safety net.
                </p>
                <div className="text-2xl font-bold text-white">1,050% ROI</div>
                <div className="text-xs text-blue-200">Potential Year 1 Return</div>
              </div>

              <div className="bg-gradient-to-br from-solar-500 to-solar-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Zero Loss</h3>
                </div>
                <p className="text-yellow-100 text-sm mb-4">
                  Certifications are permanent assets that always repay the initial investment.
                </p>
                <div className="text-2xl font-bold text-white">3.5 Weeks</div>
                <div className="text-xs text-yellow-200">Time to Repay Full Investment</div>
              </div>
            </div>

            {/* Investment Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Total Certification Investment Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-4">Certification</th>
                      <th className="p-4">Cost</th>
                      <th className="p-4">Completion</th>
                      <th className="p-4">Salary Unlocked</th>
                      <th className="p-4">ROI Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium text-slate-900">NABCEP PV Associate</td>
                      <td className="p-4">$999</td>
                      <td className="p-4">Dec 2025</td>
                      <td className="p-4 text-green-600 font-bold">$45k - $58k</td>
                      <td className="p-4">2 weeks</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">NABCEP PVIP (+ OSHA 10)</td>
                      <td className="p-4">$2,150</td>
                      <td className="p-4">Apr 2026</td>
                      <td className="p-4 text-green-600 font-bold">$70k - $85k</td>
                      <td className="p-4">3 weeks</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">NABCEP ESIP (+ OSHA 30)</td>
                      <td className="p-4">$2,800</td>
                      <td className="p-4">Jun 2026</td>
                      <td className="p-4 text-green-600 font-bold">$80k - $95k</td>
                      <td className="p-4">4 weeks</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">CSPM Project Manager</td>
                      <td className="p-4">$2,000</td>
                      <td className="p-4">Aug 2026</td>
                      <td className="p-4 text-green-600 font-bold">$106k - $137k</td>
                      <td className="p-4">4 weeks</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-4 text-slate-900">TOTAL</td>
                      <td className="p-4 text-red-600">$7,949</td>
                      <td className="p-4">9 Months</td>
                      <td className="p-4 text-green-700">$137k Ceiling</td>
                      <td className="p-4 text-electric-600">3.5 Weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Validation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">Houston Job Market Validation (Nov 2025)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-3xl font-bold text-slate-800">128+</div>
                  <div className="text-sm text-slate-500">Professional Solar Jobs</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <div className="text-3xl font-bold text-slate-800">48%</div>
                  <div className="text-sm text-slate-500">Growth Rate (2021-2031)</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <div className="text-3xl font-bold text-slate-800">300+</div>
                  <div className="text-sm text-slate-500">Days of Sunshine</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <div className="text-3xl font-bold text-green-600">$137k</div>
                  <div className="text-sm text-slate-500">Avg. PM Salary (Texas)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 1 TAB */}
        {activeTab === 'level1' && (
          <LevelView 
            title="Level 1: NABCEP PV Associate"
            targetDate="December 2025"
            investment="$999"
            roiTime="2 Weeks"
            salaryRange="$45,760 - $58,240"
            description="Entry-level certification validating basic knowledge of PV systems. Required by most serious installation companies."
            jobs={[
              { title: "Solar Installer", company: "Freedom Solar", location: "Houston, TX", salary: "$22-28/hr", note: "Benefits: Health, 401k" },
              { title: "Solar Technician", company: "Suncore Solar", location: "Houston, TX", salary: "$75/hr (Contract)", note: "Specialized/Flexible" },
              { title: "Solar Installer", company: "TriSMART Solar", location: "Houston, TX", salary: "$23-25/hr", note: "Full-time position" },
            ]}
            stats={[
              { label: "Houston Market", value: "$22-28/hr" },
              { label: "National Avg", value: "$23.46/hr" },
              { label: "Contract Rate", value: "Up to $75/hr" }
            ]}
          />
        )}

        {/* LEVEL 2 TAB */}
        {activeTab === 'level2' && (
          <LevelView 
            title="Level 2: NABCEP PV Installation Professional (PVIP)"
            targetDate="April 2026"
            investment="$2,000"
            roiTime="3 Weeks"
            salaryRange="$70,000 - $85,000"
            description="The 'Gold Standard' for solar professionals. Opens doors to lead installer, crew supervisor, and engineering roles."
            jobs={[
              { title: "Development Engineer", company: "AES Corporation", location: "Houston, TX", salary: "$91k - $109k", note: "Requires PVIP + OSHA 10" },
              { title: "Commercial Solar Electrician", company: "StraightUp Solar", location: "Similar Market", salary: "$115k - $130k", note: "Lead role with per diem" },
              { title: "Solar Electrician", company: "SpartanX LLC", location: "Corpus Christi, TX", salary: "$70k - $80k", note: "Company truck provided" },
            ]}
            stats={[
              { label: "Salary Increase", value: "+$11,000/yr" },
              { label: "Indeed Impact", value: "75% Hired Faster" },
              { label: "EPC Demand", value: "60% Require It" }
            ]}
          />
        )}

        {/* LEVEL 3 TAB */}
        {activeTab === 'level3' && (
          <LevelView 
            title="Level 3: NABCEP ESIP (Energy Storage)"
            targetDate="June 2026"
            investment="$2,500"
            roiTime="4 Weeks"
            salaryRange="$80,000 - $95,000"
            description="Specialized certification for battery storage systems. High demand due to rapid industry growth (40% annually)."
            jobs={[
              { title: "Solar & ESS Field Tech", company: "Continental Energy", location: "National", salary: "$62k - $104k", note: "Referral program + Tuition" },
              { title: "Battery Commissioning Eng.", company: "Generac", location: "National Avg", salary: "$82k - $134k", note: "Full benefits package" },
              { title: "Field Service Technician", company: "Classet", location: "Dallas, TX", salary: "$83k - $89k", note: "Overtime available" },
            ]}
            stats={[
              { label: "Market Growth", value: "+40% Annually" },
              { label: "Wage Premium", value: "15-30% Higher" },
              { label: "Top Earners", value: "$217k (CA)" }
            ]}
          />
        )}

         {/* LEVEL 4 TAB */}
         {activeTab === 'level4' && (
          <LevelView 
            title="Level 4: Certified Solar Project Manager (CSPM)"
            targetDate="August 2026"
            investment="$2,000"
            roiTime="4 Weeks"
            salaryRange="$106,000 - $137,000"
            description="Leadership credential for managing budgets, teams, and timelines. The 'Ceiling Breaker' for career earnings."
            jobs={[
              { title: "Project Manager Renewable", company: "Texas Average", location: "Statewide", salary: "$137,336 avg", note: "66% above national avg" },
              { title: "Solar Project Manager", company: "Houston Specific", location: "Houston, TX", salary: "$116k avg", note: "Range: $85k - $145k" },
              { title: "Commercial Estimator", company: "SitelogIQ", location: "National", salary: "$85k - $115k", note: "PM-adjacent role" },
            ]}
            stats={[
              { label: "Texas PM Avg", value: "$137k/yr" },
              { label: "Houston Avg", value: "$116k/yr" },
              { label: "Lifetime Earnings", value: "$2.7M+" }
            ]}
          />
        )}

      </div>
    </div>
  );
};

// Sub-component for Level Views to reduce repetition
const LevelView: React.FC<{
  title: string;
  targetDate: string;
  investment: string;
  roiTime: string;
  salaryRange: string;
  description: string;
  jobs: Array<{ title: string; company: string; location: string; salary: string; note: string }>;
  stats: Array<{ label: string; value: string }>;
}> = ({ title, targetDate, investment, roiTime, salaryRange, description, jobs, stats }) => (
  <div className="space-y-6">
    {/* Header Card */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <Calendar className="w-4 h-4" /> Target: {targetDate}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{salaryRange}</div>
          <div className="text-xs text-slate-500 uppercase font-bold">Est. Annual Salary</div>
        </div>
      </div>
      
      <p className="text-slate-600 mb-6">{description}</p>

      <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
        <div className="text-center border-r border-slate-100">
          <div className="text-slate-500 text-xs uppercase font-bold mb-1">Investment</div>
          <div className="text-lg font-bold text-slate-900">{investment}</div>
        </div>
        <div className="text-center border-r border-slate-100">
          <div className="text-slate-500 text-xs uppercase font-bold mb-1">ROI Speed</div>
          <div className="text-lg font-bold text-electric-600">{roiTime}</div>
        </div>
        <div className="text-center">
           <div className="text-slate-500 text-xs uppercase font-bold mb-1">Market Status</div>
           <div className="text-lg font-bold text-green-600">High Demand</div>
        </div>
      </div>
    </div>

    {/* Job Market Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-slate-800">{stat.value}</div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Real Job Postings */}
    <div>
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-electric-600" /> Real Job Postings (Nov 2025)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-electric-300 transition group">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-electric-50 group-hover:text-electric-600 transition">
                <Building2 className="w-5 h-5 text-slate-500 group-hover:text-electric-600" />
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Hiring</span>
            </div>
            <h5 className="font-bold text-slate-900 mb-1">{job.title}</h5>
            <div className="text-sm text-slate-600 mb-2">{job.company} • {job.location}</div>
            <div className="text-sm font-bold text-slate-800 mb-3">{job.salary}</div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-50">
              <CheckCircle2 className="w-3 h-3 inline mr-1 text-green-500" />
              {job.note}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Banner */}
    <div className="bg-electric-50 border border-electric-100 p-4 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-electric-600 mt-0.5 shrink-0" />
      <div>
        <h5 className="font-bold text-electric-900 text-sm">Investment Protection</h5>
        <p className="text-electric-700 text-sm">
          At this level, the {investment} investment is fully repaid after just {roiTime} of work. 
          This certification permanently increases your earning power regardless of the business outcome.
        </p>
      </div>
    </div>
  </div>
);
