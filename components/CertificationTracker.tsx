
import React, { useState, useEffect } from 'react';
import { Certification, PhaseStatus, StudySession, StudyResource, FieldLog } from '../types';
import { INITIAL_SESSIONS, STUDY_RESOURCES } from '../constants';
import { CheckCircle2, Clock, Calendar, BookOpen, ExternalLink, AlertCircle, PlayCircle, FileText, Trophy, Plus, MapPin, Monitor, Cpu, Sun, Hammer, PencilRuler, LineChart, Wrench, Zap, Network, Loader2, Signal, DownloadCloud, WifiOff, X, BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';
import { useData } from '../contexts/DataContext';

interface Props {
  certifications: Certification[];
  initialAction?: string | null;
  onClearAction?: () => void;
}

export const CertificationTracker: React.FC<Props> = ({ certifications: initialCerts, initialAction, onClearAction }) => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'active' | 'timeline' | 'resources' | 'field' | 'careermap'>('active');
  
  // Prioritize data from global context if available to ensure persistence works
  const certifications = data.certifications && data.certifications.length > 0 ? data.certifications : initialCerts;
  
  const activeCert = certifications.find(c => c.status === PhaseStatus.IN_PROGRESS);

  // Local state to handle adding new scores for the demo
  const [examScores, setExamScores] = useState(activeCert?.practiceExamScores || []);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState('');

  // Study Logging State
  const [showLogStudy, setShowLogStudy] = useState(false);
  const [studyDuration, setStudyDuration] = useState('');
  const [studyNotes, setStudyNotes] = useState('');

  // Field Log State
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // --- MINI DASHBOARD DATA ---
  const studyVelocityData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 1 },
  ];

  const readinessData = [
    { name: 'Ready', value: 65, fill: '#3B82F6' }
  ];

  const scoreTrendData = examScores.slice(-5).map((s, i) => ({ ...s, index: i })) || [];


  // Handle Initial Actions from other pages (e.g. AI Coach)
  useEffect(() => {
    if (initialAction === 'log_study') {
      setActiveTab('active');
      setShowLogStudy(true);
      if(onClearAction) onClearAction();
    }
  }, [initialAction, onClearAction]);

  const handleAddScore = () => {
    if (!newScore) return;
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const score = parseInt(newScore);
    if (isNaN(score)) return;

    setExamScores([...examScores, { date: today, score }]);
    setNewScore('');
    setShowAddScore(false);
  };

  const handleSaveStudySession = () => {
    if (!activeCert || !studyDuration) return;
    const hours = parseFloat(studyDuration);
    if (isNaN(hours)) return;

    // Update global data
    const updatedCerts = certifications.map(c => 
      c.id === activeCert.id 
        ? { 
            ...c, 
            completedHours: Math.min(c.totalHours, c.completedHours + hours),
            progress: Math.min(100, Math.round(((c.completedHours + hours) / c.totalHours) * 100))
          } 
        : c
    );
    
    updateData({ certifications: updatedCerts });
    setShowLogStudy(false);
    setStudyDuration('');
    setStudyNotes('');
    // Note: In a real app, we would also save the session to a 'StudySessions' array
  };

  const handleGPSCheckIn = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLog: FieldLog = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          location: `GPS Verified Coordinates`,
          hours: 4.0, // Default block
          task: 'Site Installation & Safety Check',
          verified: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
        };
        
        updateData({ fieldLogs: [newLog, ...data.fieldLogs] });
        setIsLocating(false);
      },
      (error) => {
        console.error("GPS Error", error);
        setLocationError("Unable to retrieve location. Ensure GPS is enabled.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
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
    <div className="space-y-6 relative">
      
      {/* Log Study Time Modal */}
      {showLogStudy && activeCert && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
             <div className="bg-slate-900 p-6 flex justify-between items-center">
               <div>
                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-electric-400" /> Log Study Session
                 </h3>
                 <p className="text-slate-400 text-xs">Adding hours to: {activeCert.name}</p>
               </div>
               <button onClick={() => setShowLogStudy(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
             </div>
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration (Hours)</label>
                 <input 
                   type="number" 
                   value={studyDuration}
                   onChange={(e) => setStudyDuration(e.target.value)}
                   className="w-full p-3 border border-slate-200 rounded-lg text-lg font-bold text-slate-800 focus:ring-2 focus:ring-electric-500 outline-none"
                   placeholder="e.g. 1.5"
                   autoFocus
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Session Notes</label>
                 <textarea 
                   value={studyNotes}
                   onChange={(e) => setStudyNotes(e.target.value)}
                   className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-electric-500 outline-none h-24 resize-none"
                   placeholder="What did you cover? (e.g. Electrical codes, shading analysis)"
                 />
               </div>
               <button 
                 onClick={handleSaveStudySession}
                 disabled={!studyDuration}
                 className="w-full bg-electric-600 hover:bg-electric-700 disabled:bg-slate-300 text-white py-3 rounded-lg font-bold transition shadow-lg shadow-electric-600/20"
               >
                 Confirm & Save Progress
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certification & Skills</h2>
          <p className="text-slate-500">Manage your NABCEP journey from prep to pro.</p>
        </div>
      </div>

      {/* --- MINI DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Chart 1: Study Velocity */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <BarChart3 className="w-4 h-4 text-electric-500" /> Study Velocity (7 Days)
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyVelocityData}>
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold">
                <span>Total: 14hrs</span>
                <span className="text-electric-600">Target: 10hrs/wk</span>
            </div>
        </div>

        {/* Chart 2: Readiness */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Activity className="w-4 h-4 text-green-500" /> Exam Readiness
            </h3>
            <div className="h-32 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="80%" outerRadius="100%" data={readinessData} startAngle={180} endAngle={0} barSize={20}>
                        <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                    <span className="text-3xl font-bold text-slate-800">65%</span>
                    <span className="text-[10px] text-slate-400 uppercase">Confidence</span>
                </div>
            </div>
        </div>

        {/* Chart 3: Knowledge Gaps */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <PieIcon className="w-4 h-4 text-purple-500" /> Recent Scores Trend
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                     <RechartsLineChart data={scoreTrendData}>
                        <Tooltip contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} dot={{r:3}} />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                Last 5 Practice Exams
            </div>
        </div>
      </div>

      <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0 overflow-x-auto w-full md:w-fit mb-6">
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

              <div className="flex justify-between items-end mb-2 relative z-10">
                <span className="text-xs font-bold text-slate-500 uppercase">Progress Tracker</span>
                <span className="text-xs font-bold text-electric-600">{activeCert.completedHours} / {activeCert.totalHours} Hrs</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-6 mb-6 p-1 border border-slate-200 relative z-10">
                <div 
                  className="bg-gradient-to-r from-solar-500 to-electric-500 h-full rounded-full transition-all duration-1000 relative shadow-sm overflow-hidden" 
                  style={{ width: `${activeCert.progress}%` }}
                >
                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                </div>
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
                 <button 
                  onClick={() => setShowLogStudy(true)}
                  className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                 >
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
                    <button 
                      onClick={handleGPSCheckIn}
                      disabled={isLocating}
                      className={`w-full font-bold py-4 rounded-xl shadow-lg transition flex flex-col items-center justify-center gap-1 ${isLocating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-electric-600 hover:bg-electric-700 text-white'}`}
                    >
                        {isLocating ? (
                          <>
                            <span className="flex items-center gap-2 text-lg"><Loader2 className="w-6 h-6 animate-spin" /> ACQUIRING GPS...</span>
                            <span className="text-xs opacity-80 font-normal">Triangulating position...</span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-2 text-lg"><CheckCircle2 className="w-6 h-6" /> GPS CHECK-IN</span>
                            <span className="text-xs opacity-80 font-normal">Verify location & log timestamp</span>
                          </>
                        )}
                    </button>
                    {locationError && (
                      <div className="mt-3 text-xs text-red-500 flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {locationError}
                      </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm uppercase flex justify-between">
                      <span>Recent Verified Logs</span>
                      <span className="text-electric-600 text-xs flex items-center gap-1"><Signal className="w-3 h-3"/> Live Sync</span>
                    </h4>
                    {data.fieldLogs.length === 0 ? (
                       <div className="text-center py-4 text-slate-400 text-sm italic border border-dashed border-slate-200 rounded-lg">No field logs recorded yet.</div>
                    ) : (
                      data.fieldLogs.map((log) => (
                          <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <div>
                                  <div className="font-bold text-slate-800 flex items-center gap-2">
                                    {log.location}
                                    {log.coordinates && (
                                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-mono" title={`Lat: ${log.coordinates.lat}, Lng: ${log.coordinates.lng}`}>
                                        GPS
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-500">{log.date} • {log.task}</div>
                              </div>
                              <span className="font-mono font-bold text-electric-600">{log.hours} hrs</span>
                          </div>
                      ))
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-slate-700">PVIP Requirement</span>
                        <span className="text-slate-500">
                          {data.fieldLogs.reduce((acc, log) => acc + log.hours, 0)} / 58 Hours
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(data.fieldLogs.reduce((acc, log) => acc + log.hours, 0) / 58) * 100}%` }}></div>
                    </div>
                </div>
                <p className="text-slate-600 text-sm">
                    You need <strong>{Math.max(0, 58 - data.fieldLogs.reduce((acc, log) => acc + log.hours, 0))} more hours</strong> of documented installation experience to qualify for the PVIP exam.
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
                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center justify-between">
                   <span>Study Library</span>
                   <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                     <DownloadCloud className="w-3 h-3" /> Available Offline
                   </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {STUDY_RESOURCES.map(resource => (
                    <div key={resource.id} className="group block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-electric-300 hover:shadow-md transition relative">
                        <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${resource.type === 'video' ? 'bg-red-100 text-red-600' : resource.type === 'exam' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {resource.type}
                        </span>
                        {['article', 'Code', 'Technical Specs'].includes(resource.category) ? (
                           <div className="p-1 bg-green-100 rounded-full" title="Cached for Offline Use">
                              <DownloadCloud className="w-3 h-3 text-green-600" />
                           </div>
                        ) : (
                           <WifiOff className="w-3 h-3 text-slate-300" title="Requires Internet" />
                        )}
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-electric-600 transition">{resource.title}</h4>
                        <div className="flex justify-between items-end mt-2">
                          <p className="text-sm text-slate-500">{resource.category}</p>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-electric-600 hover:text-electric-800">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
