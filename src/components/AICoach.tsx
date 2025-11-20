
import React, { useState, useEffect } from 'react';
import { askSolarCoach, analyzeReflection, getTacticalAdvice, getDeepDiveContent, researchCareerTopic } from '../services/geminiService';
import { Bot, Send, Loader2, Sparkles, ListChecks, MessageSquare, Zap, BrainCircuit, Flame, Sun, Moon, Briefcase, CheckSquare, Timer, ChevronRight, BookOpen, Battery, Disc, UserCheck, ArrowRight, Search, Globe, FileText, BarChart3, Activity, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ResearchResult } from '../types';
import { ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, AreaChart, Area, Tooltip, XAxis } from 'recharts';

interface Props {
  onNavigate?: (page: string) => void;
  onAction?: (action: string) => void;
}

export const AICoach: React.FC<Props> = ({ onNavigate, onAction }) => {
  const { data, updateData } = useData();
  const [activePhase, setActivePhase] = useState<'Morning' | 'Training' | 'Evening'>('Morning');
  const [mode, setMode] = useState<'coach' | 'research'>('coach');
  
  // Use Global Data
  const tasks = data.routineTasks;

  const [focusTime, setFocusTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Chat/AI State
  const [chatHistory, setChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([
    { sender: 'ai', text: "Command Center Online. I am ready to assist with your daily protocol. What is your status?" }
  ]);
  const [query, setQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Research State
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);

  // Metrics
  const phaseTasks = tasks.filter(t => t.category === activePhase);
  const completedCount = tasks.filter(t => t.status === 'Done' || t.completed).length;
  const totalTasks = tasks.length;
  const savageScore = Math.round((completedCount / totalTasks) * 100);

  // --- CHART DATA ---
  const scoreData = [{ name: 'Score', value: savageScore, fill: '#F59E0B' }];
  
  const protocolData = [
      { name: 'Morn', value: tasks.filter(t => t.category === 'Morning' && (t.status === 'Done' || t.completed)).length, total: tasks.filter(t => t.category === 'Morning').length },
      { name: 'Train', value: tasks.filter(t => t.category === 'Training' && (t.status === 'Done' || t.completed)).length, total: tasks.filter(t => t.category === 'Training').length },
      { name: 'Eve', value: tasks.filter(t => t.category === 'Evening' && (t.status === 'Done' || t.completed)).length, total: tasks.filter(t => t.category === 'Evening').length },
  ];

  const focusHistoryData = [
      { time: '8am', mins: 0 },
      { time: '10am', mins: 45 },
      { time: '12pm', mins: 30 },
      { time: '2pm', mins: 60 },
      { time: '4pm', mins: 15 },
  ];

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => setFocusTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === id) {
        // Explicitly type the new status to match the union type
        const newStatus = (t.status === 'Done' ? 'Todo' : 'Done') as 'Todo' | 'Done' | 'In_Progress';
        return { ...t, status: newStatus, completed: newStatus === 'Done' };
      }
      return t;
    });
    updateData({ routineTasks: updatedTasks });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiLoading(true);

    const answer = await askSolarCoach(userMsg);
    setChatHistory(prev => [...prev, { sender: 'ai', text: answer }]);
    setAiLoading(false);
  };

  const handleTacticalCheck = async () => {
    setAiLoading(true);
    const done = phaseTasks.filter(t => t.completed).map(t => t.title);
    const pending = phaseTasks.filter(t => !t.completed).map(t => t.title);
    const advice = await getTacticalAdvice(activePhase, done, pending);
    
    setChatHistory(prev => [...prev, { sender: 'ai', text: advice }]);
    setAiLoading(false);
  };

  const handleDeepDive = async (strategy: string) => {
    setAiLoading(true);
    setChatHistory(prev => [...prev, { sender: 'user', text: `Requesting Deep Dive: ${strategy}` }]);
    const content = await getDeepDiveContent(strategy);
    setChatHistory(prev => [...prev, { sender: 'ai', text: content }]);
    setAiLoading(false);
  };

  const handleResearch = async () => {
    if(!researchQuery) return;
    setAiLoading(true);
    const resStr = await researchCareerTopic(researchQuery);
    try {
      const parsed = JSON.parse(resStr);
      setResearchResult(parsed);
    } catch(e) {
      setChatHistory(prev => [...prev, { sender: 'ai', text: "Research format error. Try again." }]);
    }
    setAiLoading(false);
  };

  const handleQuickAction = (action: string) => {
    if (onNavigate && onAction) {
      onAction(action);
      if (action === 'log_study') {
        onNavigate('certifications');
      }
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 overflow-hidden">
      
      {/* LEFT PANEL: ROUTINE & TRACKING */}
      <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
        
        {/* --- MINI DASHBOARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
             {/* Chart 1: Savage Score */}
             <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative h-36">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xs uppercase tracking-wide absolute top-3 left-3">
                    <Flame className="w-3 h-3 text-red-500" /> Savage Score
                </h3>
                <div className="flex-1 w-full relative mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={scoreData} startAngle={180} endAngle={0} barSize={15}>
                            <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="value" cornerRadius={10} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
                        <span className="text-2xl font-bold text-slate-800">{savageScore}%</span>
                    </div>
                </div>
            </div>

            {/* Chart 2: Protocol Adherence */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col h-36">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
                    <ListChecks className="w-3 h-3 text-blue-500" /> Protocol
                </h3>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={protocolData}>
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '10px', borderRadius: '4px'}} />
                            <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 3: Focus Intensity */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col h-36">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
                    <Activity className="w-3 h-3 text-green-500" /> Focus Flow
                </h3>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={focusHistoryData}>
                            <defs>
                                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip contentStyle={{fontSize: '10px', borderRadius: '4px'}} />
                            <Area type="monotone" dataKey="mins" stroke="#10B981" fillOpacity={1} fill="url(#colorFocus)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Phase Selector */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <button 
            onClick={() => setActivePhase('Morning')}
            className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Morning' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Morning</span>
          </button>
          <button 
            onClick={() => setActivePhase('Training')}
            className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Training' ? 'border-electric-500 bg-electric-50 text-electric-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Training</span>
          </button>
          <button 
             onClick={() => setActivePhase('Evening')}
             className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${activePhase === 'Evening' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50'}`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Evening</span>
          </button>
        </div>

        {/* Quick Actions (NEW) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm shrink-0">
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</h4>
           <div className="grid grid-cols-1 gap-2">
             <button 
               onClick={() => handleQuickAction('log_study')}
               className="w-full flex items-center justify-between px-4 py-3 bg-electric-50 hover:bg-electric-100 text-electric-700 rounded-lg transition group border border-electric-100"
             >
               <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-white rounded-md shadow-sm group-hover:shadow">
                   <BookOpen className="w-4 h-4 text-electric-600" />
                 </div>
                 <span className="font-bold text-sm">Log Study Session</span>
               </div>
               <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition" />
             </button>
           </div>
        </div>

        {/* Main Routine Content */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 p-6 overflow-y-auto">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-electric-600" />
                {activePhase} Checklist
              </h3>
              <button 
                onClick={handleTacticalCheck}
                className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
              >
                <Zap className="w-3 h-3 text-yellow-400" /> Tactical Advice
              </button>
           </div>

           {/* Task List */}
           <div className="space-y-3 mb-8">
             {phaseTasks.map(task => (
               <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 group ${task.status === 'Done' ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-electric-300'}`}
               >
                 <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${task.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-electric-400'}`}>
                    {task.status === 'Done' && <CheckSquare className="w-4 h-4 text-white" />}
                 </div>
                 <div className="flex-1">
                    <div className={`font-bold ${task.status === 'Done' ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>{task.title}</div>
                    {task.timeEstimate && <div className="text-xs text-slate-400 font-mono">{task.timeEstimate}</div>}
                 </div>
               </div>
             ))}
           </div>

           {/* Contextual Modules */}
           {activePhase === 'Training' && (
             <div className="bg-slate-900 text-white p-6 rounded-xl mb-6">
               <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-electric-400" />
                    <h4 className="font-bold">Focus Timer</h4>
                 </div>
                 <div className="font-mono text-2xl font-bold text-electric-400">
                   {formatTime(focusTime)}
                 </div>
               </div>
               <div className="flex gap-2">
                 <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 rounded-lg font-bold transition ${isTimerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                 >
                   {isTimerRunning ? 'STOP' : 'START FOCUS'}
                 </button>
                 <button 
                  onClick={() => { setIsTimerRunning(false); setFocusTime(0); }}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 text-slate-300"
                 >
                   Reset
                 </button>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* RIGHT PANEL: AI & RESEARCH */}
      <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl z-10">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setMode('coach')}
              className={`flex-1 py-3 text-sm font-bold transition ${mode === 'coach' ? 'border-b-2 border-electric-600 text-electric-700 bg-electric-50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                AI Coach
            </button>
            <button 
              onClick={() => setMode('research')}
              className={`flex-1 py-3 text-sm font-bold transition ${mode === 'research' ? 'border-b-2 border-purple-600 text-purple-700 bg-purple-50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Research
            </button>
        </div>

        {mode === 'coach' ? (
            <>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-electric-600" />
                        <span className="font-bold text-slate-700">AI Coach Uplink</span>
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Mindset Protocol Toolbar */}
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        <button onClick={() => handleDeepDive('Accountability Mirror')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Self-Reflection">
                        <UserCheck className="w-3 h-3 text-purple-500" /> Mirror
                        </button>
                        <button onClick={() => handleDeepDive('40% Rule')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-red-400 hover:bg-red-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Endurance">
                        <Battery className="w-3 h-3 text-red-500" /> 40% Rule
                        </button>
                        <button onClick={() => handleDeepDive('First Principles')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Musk: Physics Thinking">
                        <BrainCircuit className="w-3 h-3 text-blue-500" /> 1st Princ.
                        </button>
                        <button onClick={() => handleDeepDive('Cookie Jar')} className="shrink-0 px-2 py-1 bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 rounded text-[10px] font-bold flex items-center gap-1 text-slate-600 transition" title="Goggins: Past Wins">
                        <Disc className="w-3 h-3 text-orange-500" /> Cookie Jar
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-electric-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                            {msg.text}
                        </div>
                        </div>
                    ))}
                    {aiLoading && (
                        <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Coach is thinking...</span>
                        </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
                    <div className="relative">
                        <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask for advice or log status..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-electric-50 outline-none transition"
                        />
                        <button 
                        type="submit" 
                        disabled={!query.trim() || aiLoading}
                        className="absolute right-2 top-2 p-1.5 bg-electric-600 text-white rounded-lg hover:bg-electric-700 disabled:opacity-50 transition"
                        >
                        <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </>
        ) : (
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 bg-purple-50">
                    <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-600" /> Knowledge Gatherer
                    </h3>
                    <div className="flex gap-2">
                        <input 
                          type="text"
                          value={researchQuery}
                          onChange={(e) => setResearchQuery(e.target.value)}
                          placeholder="Topic (e.g. PMP Certification)"
                          className="flex-1 p-2 text-sm border border-slate-300 rounded-lg"
                        />
                        <button onClick={handleResearch} className="bg-purple-600 text-white p-2 rounded-lg">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    {researchResult ? (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                            <h4 className="font-bold text-lg text-slate-800">{researchResult.topic}</h4>
                            <p className="text-sm text-slate-600">{researchResult.summary}</p>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase">Cost</div>
                                    <div className="font-mono text-sm font-bold text-slate-800">{researchResult.estimatedCost}</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase">Timeline</div>
                                    <div className="font-mono text-sm font-bold text-slate-800">{researchResult.timeline}</div>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold text-sm text-slate-700 mb-2">Prerequisites</h5>
                                <ul className="list-disc list-inside text-xs text-slate-600">
                                    {researchResult.prerequisites.map((p,i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>

                             <div>
                                <h5 className="font-bold text-sm text-slate-700 mb-2">Resources</h5>
                                <div className="space-y-2">
                                    {researchResult.resources.map((r,i) => (
                                        <a key={i} href={r.url} target="_blank" className="block text-xs text-blue-600 hover:underline truncate">
                                            <ExternalLink className="w-3 h-3 inline mr-1" /> {r.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 mt-10">
                            <Search className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Enter a topic to research.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
