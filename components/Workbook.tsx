
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { generateWeeklyRecap, draftDailyPlan } from '../services/geminiService';
import { WeeklyRecap } from '../types';
import { BookOpen, Calendar, CheckCircle2, ChevronRight, Coffee, Moon, Sparkles, Target, Trophy, List, Loader2, ArrowRight, BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, Tooltip, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis } from 'recharts';

export const Workbook: React.FC = () => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'plan'>('daily');
  
  // Daily State
  const [dayPhase, setDayPhase] = useState<'morning' | 'evening'>('morning');
  const [morningIntent, setMorningIntent] = useState('');
  const [eveningReflection, setEveningReflection] = useState('');
  
  // Weekly State
  const [isGeneratingRecap, setIsGeneratingRecap] = useState(false);
  
  // Planning State
  const [isPlanning, setIsPlanning] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState('');
  const [tomorrowPriorities, setTomorrowPriorities] = useState('');

  // --- CHART DATA ---
  const consistencyData = [
    { day: 'M', tasks: 8 },
    { day: 'T', tasks: 7 },
    { day: 'W', tasks: 10 },
    { day: 'T', tasks: 6 },
    { day: 'F', tasks: 9 },
    { day: 'S', tasks: 4 },
    { day: 'S', tasks: 5 },
  ];

  const focusData = [
    { name: 'Deep Work', value: 60, color: '#3B82F6' },
    { name: 'Admin', value: 20, color: '#94A3B8' },
    { name: 'Meetings', value: 20, color: '#F59E0B' },
  ];

  const moodData = [
    { day: 'Mon', mood: 3 },
    { day: 'Tue', mood: 4 },
    { day: 'Wed', mood: 2 },
    { day: 'Thu', mood: 5 },
    { day: 'Fri', mood: 4 },
  ];

  // --- DAILY LOGIC ---
  const handleLogEntry = (type: 'Morning Plan' | 'Evening Review') => {
    const content = type === 'Morning Plan' ? morningIntent : eveningReflection;
    if (!content) return;
    
    const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type,
        content,
        mood: 'Neutral' as any
    };
    
    updateData({ journal: [newEntry, ...data.journal] });
    if (type === 'Morning Plan') setMorningIntent('');
    if (type === 'Evening Review') setEveningReflection('');
    alert(`${type} logged successfully.`);
  };

  // --- WEEKLY RECAP LOGIC ---
  const handleGenerateRecap = async () => {
    setIsGeneratingRecap(true);
    
    // Gather last 7 days data
    const recentJournals = data.journal.slice(0, 10).map(j => j.content); // Simplified recent entries
    const totalTasks = data.routineTasks.length;
    const completedTasks = data.routineTasks.filter(t => t.status === 'Done').length;
    
    const resultStr = await generateWeeklyRecap(recentJournals, completedTasks, totalTasks);
    
    try {
        const result = JSON.parse(resultStr);
        const newRecap: WeeklyRecap = {
            id: Date.now().toString(),
            weekStartDate: new Date().toLocaleDateString(),
            totalTasksCompleted: completedTasks,
            averageMood: 'High', // Simplified
            keyWins: result.keyWins || [],
            lessonsLearned: result.lessonsLearned || [],
            aiStrategyForNextWeek: result.aiStrategyForNextWeek || 'Keep pushing.',
            score: result.score || 85
        };
        
        updateData({ weeklyRecaps: [newRecap, ...(data.weeklyRecaps || [])] });
    } catch (e) {
        console.error("Failed to parse AI Recap", e);
    }
    setIsGeneratingRecap(false);
  };

  // --- PLANNING LOGIC ---
  const handleAutoPlan = async () => {
    setIsPlanning(true);
    const backlog = data.routineTasks.filter(t => t.status !== 'Done').map(t => t.title);
    const priorities = tomorrowPriorities.split(',').map(s => s.trim());
    
    const plan = await draftDailyPlan(priorities, backlog);
    setGeneratedSchedule(plan);
    setIsPlanning(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Workbook Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-slate-800">
                <BookOpen className="w-8 h-8 text-electric-400" /> Life & Career Workbook
            </h1>
            <p className="text-slate-500">
                Reflect, Plan, and Execute. Your daily journal and strategic command center.
            </p>
          </div>
      </div>

       {/* --- MINI DASHBOARD --- */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Chart 1: Consistency Streak */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <BarChart3 className="w-4 h-4 text-electric-500" /> Task Consistency
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consistencyData}>
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
               Avg 7 Tasks / Day
            </div>
        </div>

        {/* Chart 2: Mood Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <TrendingUp className="w-4 h-4 text-purple-500" /> Energy Levels
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                        <Tooltip contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Line type="monotone" dataKey="mood" stroke="#8B5CF6" strokeWidth={3} dot={{r:3}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                Rising Trend
            </div>
        </div>

        {/* Chart 3: Focus Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <PieIcon className="w-4 h-4 text-orange-500" /> Focus Distribution
            </h3>
            <div className="h-32 w-full flex gap-4 items-center">
                <div className="flex-1 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={focusData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                                {focusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1">
                    {focusData.map(d => (
                        <div key={d.name} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

       <div className="flex bg-slate-200 p-1 rounded-lg w-fit mb-6">
            <button 
                onClick={() => setActiveTab('daily')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Coffee className="w-4 h-4" /> Daily
            </button>
                <button 
                onClick={() => setActiveTab('plan')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'plan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Target className="w-4 h-4" /> Planner
            </button>
            <button 
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${activeTab === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Trophy className="w-4 h-4" /> Weekly Review
            </button>
        </div>

      {/* --- DAILY TAB --- */}
      {activeTab === 'daily' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Card */}
            <div className={`rounded-xl border-2 transition-all duration-300 flex flex-col ${dayPhase === 'morning' ? 'border-orange-400 shadow-lg bg-orange-50/30' : 'border-slate-200 bg-white opacity-60 hover:opacity-100'}`} onClick={() => setDayPhase('morning')}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 rounded-t-xl">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-orange-500" /> Morning Intent
                    </h3>
                    {dayPhase === 'morning' && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold">Active</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-600">What is the ONE thing that makes today a success?</p>
                    <textarea 
                        value={morningIntent}
                        onChange={(e) => setMorningIntent(e.target.value)}
                        className="w-full flex-1 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-400 outline-none resize-none bg-white"
                        placeholder="I will focus on..."
                    />
                    <button 
                        onClick={() => handleLogEntry('Morning Plan')}
                        disabled={!morningIntent}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-lg font-bold shadow-lg shadow-orange-500/20 transition"
                    >
                        Commit to Day
                    </button>
                </div>
            </div>

            {/* Evening Card */}
            <div className={`rounded-xl border-2 transition-all duration-300 flex flex-col ${dayPhase === 'evening' ? 'border-purple-400 shadow-lg bg-purple-50/30' : 'border-slate-200 bg-white opacity-60 hover:opacity-100'}`} onClick={() => setDayPhase('evening')}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 rounded-t-xl">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-purple-500" /> Evening Reflection
                    </h3>
                    {dayPhase === 'evening' && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold">Active</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-600">Where did you win? Where did you learn?</p>
                    <textarea 
                        value={eveningReflection}
                        onChange={(e) => setEveningReflection(e.target.value)}
                        className="w-full flex-1 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none resize-none bg-white"
                        placeholder="Today I learned..."
                    />
                    <button 
                        onClick={() => handleLogEntry('Evening Review')}
                        disabled={!eveningReflection}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-lg font-bold shadow-lg shadow-purple-600/20 transition"
                    >
                        Log & Close Day
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- WEEKLY TAB --- */}
      {activeTab === 'weekly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recap Generator */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-electric-600" /> Sunday Strategy Session
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                    AI analyzes your journal entries, completed tasks, and mood from the last 7 days to generate a tactical plan for next week.
                </p>
                <button 
                    onClick={handleGenerateRecap}
                    disabled={isGeneratingRecap}
                    className="w-full py-4 bg-electric-600 hover:bg-electric-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-xl shadow-electric-500/20"
                >
                    {isGeneratingRecap ? <Loader2 className="w-5 h-5 animate-spin"/> : <Trophy className="w-5 h-5" />}
                    Generate Weekly Recap
                </button>
            </div>

            {/* Past Recaps */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-800">Recap History</h3>
                {(data.weeklyRecaps || []).length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                        No weekly recaps generated yet.
                    </div>
                ) : (
                    (data.weeklyRecaps || []).map(recap => (
                        <div key={recap.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Week Of</div>
                                    <div className="text-lg font-bold text-slate-800">{recap.weekStartDate}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-electric-600">{recap.score}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Wk Score</div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                    <h4 className="font-bold text-green-800 text-sm mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Key Wins</h4>
                                    <ul className="list-disc list-inside text-xs text-green-700 space-y-1">
                                        {recap.keyWins.map((win, i) => <li key={i}>{win}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Next Week Strategy</h4>
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        {recap.aiStrategyForNextWeek}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}

      {/* --- PLANNER TAB --- */}
      {activeTab === 'plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Input Side */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-500" /> Plan Tomorrow
                </h3>
                
                <div className="space-y-4 flex-1">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Primary Focus / Must Do</label>
                        <input 
                            type="text"
                            value={tomorrowPriorities}
                            onChange={(e) => setTomorrowPriorities(e.target.value)} 
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                            placeholder="e.g. Finish Module 4, Call 3 Investors"
                        />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Backlog (Unfinished Tasks)</h4>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {data.routineTasks.filter(t => t.status !== 'Done').map(t => (
                                <div key={t.id} className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                                    {t.title} <span className="text-slate-400">- {t.priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleAutoPlan}
                        disabled={isPlanning}
                        className="w-full mt-auto py-3 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                    >
                        {isPlanning ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4 text-yellow-400"/>}
                        AI Auto-Schedule
                    </button>
                </div>
            </div>

            {/* Output Side */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4">Proposed Schedule</h3>
                {generatedSchedule ? (
                    <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 whitespace-pre-wrap font-mono text-sm text-slate-700 shadow-sm overflow-y-auto">
                        {generatedSchedule}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <List className="w-12 h-12 mb-2 opacity-20" />
                        <p>Enter priorities and click Auto-Schedule</p>
                    </div>
                )}
                
                {generatedSchedule && (
                    <button className="mt-4 w-full py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100">
                        Confirm & Save to Calendar
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
};
