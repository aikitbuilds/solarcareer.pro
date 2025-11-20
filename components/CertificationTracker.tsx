import React, { useState } from 'react';
import { Certification, PhaseStatus, StudySession, StudyResource } from '../types';
import { INITIAL_SESSIONS, STUDY_RESOURCES } from '../constants';
import { CheckCircle2, Clock, Calendar, BookOpen, ExternalLink, AlertCircle, PlayCircle, FileText, Trophy, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  certifications: Certification[];
}

export const CertificationTracker: React.FC<Props> = ({ certifications }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'timeline' | 'resources'>('active');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certification Tracker</h2>
          <p className="text-slate-500">Manage your NABCEP journey from prep to pro.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'active' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Active Cert
          </button>
          <button 
             onClick={() => setActiveTab('timeline')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'timeline' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Timeline
          </button>
          <button 
             onClick={() => setActiveTab('resources')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'resources' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Resources
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

              {/* Practice Exam Section - NEW */}
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
                      <LineChart data={examScores}>
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
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-100 border-dashed text-slate-400">
                      <Trophy className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No practice exams taken yet</p>
                    </div>
                  )}
                </div>
                {examScores.length > 0 && (
                  <div className="flex justify-between mt-2 text-xs text-slate-500 px-2">
                    <span>Latest: {examScores[examScores.length - 1].score}%</span>
                    <span>Target: 75%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" /> Study Schedule (Daily 4-6h Blocks)
              </h4>
              <div className="space-y-3">
                {[
                  { day: 'Today', time: '18:00 - 22:00', subject: 'PV System Electrical Design', status: 'Upcoming' },
                  { day: 'Tomorrow', time: '08:00 - 12:00', subject: 'Practice Exam #1', status: 'Scheduled' },
                  { day: 'Wed, Oct 15', time: '18:00 - 22:00', subject: 'NEC 690 Review', status: 'Scheduled' },
                ].map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-12 rounded-full bg-electric-500"></div>
                      <div>
                        <div className="font-semibold text-slate-800">{slot.subject}</div>
                        <div className="text-sm text-slate-500">{slot.day} • {slot.time}</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-white border border-slate-200 rounded text-slate-500">
                      {slot.status}
                    </span>
                  </div>
                ))}
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

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold mb-4 text-slate-800">Recent Study Sessions</h4>
              <div className="space-y-4">
                {INITIAL_SESSIONS.map(session => (
                  <div key={session.id} className="border-l-2 border-slate-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-300"></div>
                    <div className="text-sm font-medium text-slate-900">{session.subject}</div>
                    <div className="text-xs text-slate-500 mb-1">{session.date} • {session.durationMinutes / 60} hrs</div>
                    <p className="text-xs text-slate-600 italic">"{session.notes}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
           <div className="relative border-l-4 border-slate-100 ml-6 space-y-12">
             {certifications.map((cert, idx) => (
               <div key={cert.id} className="relative pl-8">
                 {/* Dot */}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="block text-slate-500 mb-1">Investment</strong>
                        <span className="font-medium">${cert.cost.toLocaleString()}</span>
                      </div>
                      <div>
                        <strong className="block text-slate-500 mb-1">Requirements</strong>
                        <span className="font-medium">{cert.totalHours} training hours</span>
                      </div>
                      <div>
                        <strong className="block text-slate-500 mb-1">Prerequisites</strong>
                         <div className="flex flex-wrap gap-2">
                           {cert.prerequisites.map((pre, i) => (
                             <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs text-slate-600">{pre}</span>
                           ))}
                         </div>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDY_RESOURCES.map(resource => (
              <a href={resource.url} key={resource.id} className="group block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-electric-300 hover:shadow-md transition">
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
      )}
    </div>
  );
};