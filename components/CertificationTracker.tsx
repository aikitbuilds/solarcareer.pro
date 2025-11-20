
import React, { useState } from 'react';
import { Certification, PhaseStatus, StudySession, StudyResource } from '../types';
import { INITIAL_SESSIONS, STUDY_RESOURCES } from '../constants';
import { CheckCircle2, Clock, Calendar, BookOpen, ExternalLink, AlertCircle, PlayCircle, FileText, Trophy, Plus, MapPin, Monitor, Cpu, Sun, Hammer, PencilRuler, LineChart, Wrench, Zap, Network } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  certifications: Certification[];
}

export const CertificationTracker: React.FC<Props> = ({ certifications }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'timeline' | 'resources' | 'field' | 'careermap'>('active');
  const activeCert = certifications.find(c => c.status === PhaseStatus.IN_PROGRESS);

  // Local state to handle adding new scores for the demo
  const [examScores, setExamScores] = useState(activeCert?.practiceExamScores || []);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState('');

  const handleAddScore = () => {
    if (!newScore) return;
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const score = parseInt(newScore);
    if (isNaN(score)) return;

    setExamScores([...examScores, { date: today, score }]);
    setNewScore('');
    setShowAddScore(false);
  };

  // Career Map Visual Component
  const CareerMap = () => (
    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 overflow-hidden relative">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-800">NABCEP Career Ecosystem</h3>
        <p className="text-slate-500">The gold standard pathways for solar professionals. All roads start at Associate.</p>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Grid Layout for the Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* 1. Design Specialist (Top Left) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 rounded-lg"><PencilRuler className="w-6 h-6 text-red-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">PV Design</h4>
                    <span className="text-xs text-red-600 font-bold uppercase">Specialist</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>PV System Designer</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>PV Design Engineer</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>Design Consultant</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div>Structural Engineer</li>
             </ul>
          </div>

          {/* 2. Installation Pro (Top Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg"><Hammer className="w-6 h-6 text-orange-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">PV Installation</h4>
                    <span className="text-xs text-orange-600 font-bold uppercase">Professional (PVIP)</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>PV Installer / Master Electrician</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Construction Supervisor</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Crew Chief</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></div>Site Supervisor</li>
             </ul>
          </div>

          {/* 3. Commissioning (Top Right) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:-translate-y-1 transition duration-300">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg"><Wrench className="w-6 h-6 text-blue-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Commissioning</h4>
                    <span className="text-xs text-blue-600 font-bold uppercase">& Maintenance</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>PV Service Technician</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>O&M Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>Site Assessor</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>Interconnection Engineer</li>
             </ul>
          </div>

          {/* CENTER HUB: PV Associate */}
          <div className="lg:col-start-2 flex items-center justify-center py-4 lg:py-0">
               <div className="bg-white border-4 border-solar-500 p-8 rounded-full shadow-2xl w-64 h-64 flex flex-col items-center justify-center text-center z-20 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-solar-50 rounded-full opacity-50 animate-pulse group-hover:opacity-80 transition"></div>
                  <div className="absolute -inset-4 border border-dashed border-slate-300 rounded-full animate-spin-slow"></div>
                  <Trophy className="w-10 h-10 text-solar-600 mb-2 relative z-10" />
                  <h4 className="text-2xl font-bold text-slate-900 relative z-10 leading-tight">PV<br/>Associate</h4>
                  <span className="text-[10px] bg-solar-500 text-white px-3 py-1 rounded-full mt-2 font-bold relative z-10 shadow-md">CURRENT STATUS</span>
                  <div className="absolute -bottom-12 bg-slate-800 text-white text-xs px-3 py-1 rounded shadow-lg">Prerequisite for All</div>
               </div>
          </div>

           {/* 4. Sales (Bottom Left/Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 hover:-translate-y-1 transition duration-300 lg:col-start-1 lg:row-start-2">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg"><LineChart className="w-6 h-6 text-green-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Technical Sales</h4>
                    <span className="text-xs text-green-600 font-bold uppercase">Certification</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Technical Salesperson</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Sales Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Account Manager</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>Business Development</li>
             </ul>
          </div>

           {/* 5. Storage (Bottom Right/Middle) */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 hover:-translate-y-1 transition duration-300 lg:col-start-3 lg:row-start-2">
             <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg"><Zap className="w-6 h-6 text-purple-600"/></div>
                <div>
                    <h4 className="font-bold text-lg leading-none">Energy Storage</h4>
                    <span className="text-xs text-purple-600 font-bold uppercase">Installation Pro (ESIP)</span>
                </div>
             </div>
             <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Battery Specialist</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Storage Integrator</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>Microgrid Architect</li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certification & Skills</h2>
          <p className="text-slate-500">Manage your NABCEP journey from prep to pro.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'active' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Active Cert
          </button>
           <button 
             onClick={() => setActiveTab('field')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'field' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Field Log
          </button>
          <button 
             onClick={() => setActiveTab('careermap')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'careermap' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Network className="w-4 h-4" /> Career Map
          </button>
          <button 
             onClick={() => setActiveTab('timeline')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'timeline' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Roadmap
          </button>
          <button 
             onClick={() => setActiveTab('resources')}
             className={`px-3 py-2 text-sm font-medium rounded-md transition whitespace-nowrap ${activeTab === 'resources' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Labs & Resources
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && activeCert && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Active Cert Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-solar-500/10 rounded-bl-full -mr-8 -mt-8"></div>
              
              <div className="flex justify-between items-start mb-6 relative">
                <div>
                  <span className="inline-block px-3 py-1 bg-solar-100 text-solar-600 text-xs font-bold rounded-full mb-2">IN PROGRESS</span>
                  <h3 className="text-2xl font-bold text-slate-900">{activeCert.name}</h3>
                  <p className="text-slate-500">{activeCert.provider} • Target: {activeCert.targetDate}</p>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-bold text-electric-600">{activeCert.progress}%</div>
                   <div className="text-xs text-slate-400 uppercase font-semibold">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-4 mb-6">
                <div 
                  className="bg-gradient-to-r from-solar-500 to-electric-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${activeCert.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <Clock className="w-5 h-5 mx-auto text-electric-500 mb-2" />
                  <div className="font-bold text-slate-800">{activeCert.completedHours}/{activeCert.totalHours}</div>
                  <div className="text-xs text-slate-500">Hours Studied</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <FileText className="w-5 h-5 mx-auto text-electric-500 mb-2" />
                  <div className="font-bold text-slate-800">4</div>
                  <div className="text-xs text-slate-500">Modules Done</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <AlertCircle className="w-5 h-5 mx-auto text-red-500 mb-2" />
                  <div className="font-bold text-slate-800">Pending</div>
                  <div className="text-xs text-slate-500">Payment Status</div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <Calendar className="w-5 h-5 mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-slate-800">65 Days</div>
                  <div className="text-xs text-slate-500">To Exam</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-electric-600 hover:bg-electric-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Resume Course
                </button>
                 <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" /> Log Study Time
                </button>
              </div>

              {/* Practice Exam Section */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-solar-500" /> Practice Exam Performance
                  </h4>
                  {!showAddScore ? (
                    <button 
                      onClick={() => setShowAddScore(true)}
                      className="text-sm text-electric-600 font-medium hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Log Score
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Score" 
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                        autoFocus
                      />
                      <button onClick={handleAddScore} className="bg-electric-600 text-white px-3 py-1 rounded text-xs font-bold">Save</button>
                      <button onClick={() => setShowAddScore(false)} className="text-slate-400 text-xs hover:text-slate-600">Cancel</button>
                    </div>
                  )}
                </div>
                
                <div className="h-48 w-full">
                  {examScores.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={examScores}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="date" 
                            tick={{fontSize: 12, fill: '#64748b'}} 
                            axisLine={false} 
                            tickLine={false}
                            dy={10}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            hide={false} 
                            tick={{fontSize: 12, fill: '#64748b'}}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3B82F6" 
                            strokeWidth={3} 
                            dot={{r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff'}} 
                            activeDot={{r: 6}}
                          />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-100 border-dashed text-slate-400">
                      <Trophy className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No practice exams taken yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-solar-500" /> Recent Achievements
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Completed Freedom Solar onboarding module</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Scored 85% on Electrical Basics quiz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Career Map Tab (NEW) */}
      {activeTab === 'careermap' && <CareerMap />}

      {/* Field Mode Tab */}
      {activeTab === 'field' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Field Experience Logger</h3>
                        <p className="text-sm text-slate-500">Track installation hours for NABCEP PVIP.</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full animate-pulse">
                        <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center mb-6">
                    <p className="text-slate-600 font-medium mb-4">Ready to log hours at job site?</p>
                    <button className="w-full bg-electric-600 hover:bg-electric-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex flex-col items-center justify-center gap-1">
                        <span className="flex items-center gap-2 text-lg"><CheckCircle2 className="w-6 h-6" /> CHECK IN</span>
                        <span className="text-xs opacity-80 font-normal">Verifying GPS Location...</span>
                    </button>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm uppercase">Recent Logs</h4>
                    {[
                        { date: 'Oct 24', loc: 'Residential Install - Katy, TX', hrs: 6.5 },
                        { date: 'Oct 22', loc: 'Site Survey - Woodlands, TX', hrs: 4.0 },
                    ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div>
                                <div className="font-bold text-slate-800">{log.loc}</div>
                                <div className="text-xs text-slate-500">{log.date}</div>
                            </div>
                            <span className="font-mono font-bold text-electric-600">{log.hrs} hrs</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-slate-700">PVIP Requirement</span>
                        <span className="text-slate-500">18 / 58 Hours</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '31%' }}></div>
                    </div>
                </div>
                <p className="text-slate-600 text-sm">
                    You need <strong>40 more hours</strong> of documented installation experience to qualify for the PVIP exam.
                </p>
            </div>
        </div>
      )}

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
           <div className="relative border-l-4 border-slate-100 ml-6 space-y-12">
             {certifications.map((cert, idx) => (
               <div key={cert.id} className="relative pl-8">
                 <div className={`absolute -left-[14px] top-2 w-6 h-6 rounded-full border-4 border-white ${cert.status === PhaseStatus.IN_PROGRESS ? 'bg-solar-500 ring-4 ring-solar-100' : cert.status === PhaseStatus.COMPLETED ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{cert.name}</h3>
                        <p className="text-electric-600 font-medium">{cert.targetDate}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full w-fit ${cert.status === PhaseStatus.IN_PROGRESS ? 'bg-solar-100 text-solar-700' : 'bg-slate-200 text-slate-600'}`}>
                        {cert.status}
                      </span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Resources Tab (Enhanced) */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
            {/* Virtual Labs Section */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-white">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-purple-400" /> Virtual Labs & Simulation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="https://www.skillcatapp.com/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-purple-500/20 rounded-lg mb-3">
                                <Monitor className="w-5 h-5 text-purple-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">SkillCat Simulator</h4>
                        <p className="text-sm text-slate-300 mt-1">Practice wiring, multimeter usage, and system troubleshooting in 3D.</p>
                    </a>
                    <a href="https://aurorasolar.com/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-500/20 rounded-lg mb-3">
                                <MapPin className="w-5 h-5 text-blue-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">Aurora Solar Design</h4>
                        <p className="text-sm text-slate-300 mt-1">Create professional string layouts and irradiance models for your portfolio.</p>
                    </a>
                     <a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group block">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-orange-500/20 rounded-lg mb-3">
                                <Sun className="w-5 h-5 text-orange-300" />
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-bold text-lg">NREL PVWatts</h4>
                        <p className="text-sm text-slate-300 mt-1">Official government production modeling tool for verifying system output.</p>
                    </a>
                </div>
            </div>

            {/* Standard Resources */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-slate-800">Study Library</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {STUDY_RESOURCES.map(resource => (
                    <a href={resource.url} key={resource.id} target="_blank" rel="noopener noreferrer" className="group block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-electric-300 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${resource.type === 'video' ? 'bg-red-100 text-red-600' : resource.type === 'exam' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {resource.type}
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-electric-500 transition" />
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-electric-600 transition">{resource.title}</h4>
                        <p className="text-sm text-slate-500">{resource.category}</p>
                    </a>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
