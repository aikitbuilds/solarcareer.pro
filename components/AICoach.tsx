
import React, { useState, useEffect } from 'react';
import { askSolarCoach, getCareerAudit, analyzeReflection, getTacticalAdvice, getDeepDiveContent } from '../services/geminiService';
import { Bot, Send, Loader2, Sparkles, ListChecks, MessageSquare, Zap, BrainCircuit, Flame, Sun, Moon, Briefcase, CheckSquare, Timer, ChevronRight, BookOpen, Battery, Disc, UserCheck } from 'lucide-react';
import { RoutineTask } from '../types';

export const AICoach: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'Morning' | 'Training' | 'Evening'>('Morning');
  
  // Routine State
  const [tasks, setTasks] = useState<RoutineTask[]>([
    // Morning
    { id: 'm1', label: 'Wake up @ 5:00 AM', category: 'Morning', completed: false, timeEstimate: '05:00' },
    { id: 'm2', label: 'Hydrate + Electrolytes', category: 'Morning', completed: false },
    { id: 'm3', label: 'Physical Activation (Zone 2)', category: 'Morning', completed: false, timeEstimate: '30 min' },
    { id: 'm4', label: 'Review Goals (The Protocol)', category: 'Morning', completed: false },
    // Training
    { id: 't1', label: 'Deep Work Block 1 (Study)', category: 'Training', completed: false, timeEstimate: '90 min' },
    { id: 't2', label: 'Hands-on Sim (SkillCat)', category: 'Training', completed: false, timeEstimate: '30 min' },
    { id: 't3', label: 'Networking Outreach (3 Contacts)', category: 'Training', completed: false },
    // Evening
    { id: 'e1', label: 'Review Daily Metrics', category: 'Evening', completed: false },
    { id: 'e2', label: 'Plan Tomorrow', category: 'Evening', completed: false },
    { id: 'e3', label: 'Disconnect Tech', category: 'Evening', completed: false, timeEstimate: '21:00' },
  ]);

  const [focusTime, setFocusTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Chat/AI State
  const [chatHistory, setChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([
    { sender: 'ai', text: "Command Center Online. I am ready to assist with your daily protocol. What is your status?" }
  ]);
  const [query, setQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Reflection State
  const [reflectionText, setReflectionText] = useState('');

  // Metrics
  const phaseTasks = tasks.filter(t => t.category === activePhase);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const savageScore = Math.round((completedCount / totalTasks) * 100);

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
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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
    const done = phaseTasks.filter(t => t.completed).map(t => t.label);
    const pending = phaseTasks.filter(t => !t.completed).map(t => t.label);
    const advice = await getTacticalAdvice(activePhase, done, pending);
    
    setChatHistory(prev => [...prev, { sender: 'ai', text: advice }]);
    setAiLoading(false);
  };

  const handleReflection = async () => {
    if (!reflectionText) return;
    setAiLoading(true);
    const feedback = await analyzeReflection(reflectionText, activePhase === 'Morning' ? 'Morning Plan' : 'Evening Review');
    setChatHistory(prev => [
      ...prev, 
      { sender: 'user', text: `[${activePhase} Reflection Logged]: ${reflectionText}` },
      { sender: 'ai', text: feedback }
    ]);
    setReflectionText('');
    setAiLoading(false);
  };

  const handleDeepDive = async (strategy: string) => {
    setAiLoading(true);
    setChatHistory(prev => [...prev, { sender: 'user', text: `Requesting Deep Dive: ${strategy}` }]);
    const content = await getDeepDiveContent(strategy);
    setChatHistory(prev => [...prev, { sender: 'ai', text: content }]);
    setAiLoading(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 overflow-hidden">
      
      {/* LEFT PANEL: ROUTINE & TRACKING */}
      <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
        
        {/* Top Stats Bar */}
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl shadow-red-500/50 shadow-lg">
              {savageScore}%
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Savage Score</div>
              <div className="font-bold text-lg">{completedCount}/{totalTasks} Tasks</div>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current Phase</div>
             <div className="font-bold text-xl text-electric-400">{activePhase} Protocol</div>
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
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 group ${task.completed ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-electric-300'}`}
               >
                 <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-electric-400'}`}>
                    {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                 </div>
                 <div className="flex-1">
                    <div className={`font-bold ${task.completed ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>{task.label}</div>
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

           {(activePhase === 'Morning' || activePhase === 'Evening') && (
             <div className="border-t border-slate-100 pt-6">
               <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                 <BrainCircuit className="w-5 h-5 text-purple-600" />
                 {activePhase === 'Morning' ? 'Morning Intention' : 'After Action Report'}
               </h4>
               <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-electric-50 outline-none resize-none"
                  placeholder={activePhase === 'Morning' ? "What is the ONE thing you must accomplish?" : "Where did you fail today? No excuses."}
               />
               <button 
                onClick={handleReflection}
                disabled={!reflectionText}
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition"
               >
                 <Sparkles className="w-4 h-4" /> Analyze & Commit
               </button>
             </div>
           )}
        </div>
      </div>

      {/* RIGHT PANEL: AI CHAT & FEEDBACK (Always visible now) */}
      <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl z-10">
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
      </div>

    </div>
  );
};
