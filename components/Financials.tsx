
import React, { useState, useRef } from 'react';
import { DollarSign, Landmark, ExternalLink, TrendingUp, Plus, Trash2, Wallet, BrainCircuit, PhoneCall, ArrowRight, AlertTriangle, CheckCircle2, Loader2, FileText, Upload, Calculator, ChevronRight, X, BarChart3, PieChart as PieIcon, AreaChart as AreaIcon } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Expense, GrantOpportunity } from '../types';
import { analyzeFinancialHealth, negotiateBill, analyzeBankStatement } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie } from 'recharts';

export const Financials: React.FC = () => {
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'ai-cfo'>('overview');
  const [showAddExpense, setShowAddExpense] = useState(false);
  
  // Onboarding State
  const [showMLEWizard, setShowMLEWizard] = useState(false);
  const [mleStep, setMleStep] = useState(0);
  const [mleData, setMleData] = useState<Partial<Expense>[]>([]);
  
  // Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [negotiationScript, setNegotiationScript] = useState<string | null>(null);
  const [selectedBill, setSelectedBill] = useState<Expense | null>(null);
  
  // New Expense State
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: 'Food',
    name: '',
    amount: 0,
    frequency: 'Monthly',
    isEssential: true
  });

  const expenses = data.expenses || [];
  const totalMonthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRaised = data.investors.filter(i => i.status === 'Wired').reduce((sum, i) => sum + i.amount, 0);
  const cashOnHand = totalRaised - 4500; // Hardcoded spend for demo logic
  const runwayMonths = totalMonthlyExpenses > 0 ? (cashOnHand / totalMonthlyExpenses).toFixed(1) : '∞';

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

  // --- CHART DATA ---
  // 1. Expense Breakdown (Pie)
  const expenseData = [
    { name: 'Essential', value: expenses.filter(e => e.isEssential).reduce((a, b) => a + b.amount, 0), color: '#10B981' },
    { name: 'Discretionary', value: expenses.filter(e => !e.isEssential).reduce((a, b) => a + b.amount, 0), color: '#F43F5E' }
  ];

  // 2. Runway (Area) - Simulated based on burn
  const runwayData = [
    { month: 'Now', balance: cashOnHand },
    { month: '+1 Mo', balance: cashOnHand - totalMonthlyExpenses },
    { month: '+2 Mo', balance: cashOnHand - (totalMonthlyExpenses * 2) },
    { month: '+3 Mo', balance: cashOnHand - (totalMonthlyExpenses * 3) },
  ];

  // 3. Burn History (Bar) - Simulated
  const burnHistory = [
    { month: 'Sep', amount: 1800 },
    { month: 'Oct', amount: 2100 },
    { month: 'Nov', amount: totalMonthlyExpenses },
  ];

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    const expense: Expense = {
        id: Date.now().toString(),
        name: newExpense.name,
        amount: Number(newExpense.amount),
        category: newExpense.category as any,
        frequency: newExpense.frequency as any,
        isEssential: newExpense.isEssential || false
    };
    updateData({ expenses: [...expenses, expense] });
    setShowAddExpense(false);
    setNewExpense({ category: 'Food', name: '', amount: 0, frequency: 'Monthly', isEssential: true });
  };

  const handleDeleteExpense = (id: string) => {
    updateData({ expenses: expenses.filter(e => e.id !== id) });
  };

  const handleRunCFO = async () => {
    setIsAnalyzing(true);
    const analysis = await analyzeFinancialHealth(expenses, cashOnHand);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const handleNegotiate = async (expense: Expense) => {
    setIsAnalyzing(true);
    setSelectedBill(expense);
    const script = await negotiateBill(expense.name, expense.amount, expense.category);
    setNegotiationScript(script);
    setIsAnalyzing(false);
  };

  // --- MLE WIZARD LOGIC ---
  
  const HOUSTON_DEFAULTS = {
    housing: { rent: 1350, insurance: 20 },
    utilities: { electric: 160, internet: 70, phone: 60 },
    transport: { carNote: 450, carIns: 140, gas: 150 },
    living: { groceries: 400, sub: 15 }
  };

  const handleWizardSubmit = () => {
      // Convert MLE temp data to real expenses
      const newExpenses = mleData.map((item, idx) => ({
          id: `mle-${Date.now()}-${idx}`,
          category: item.category || 'Housing',
          name: item.name || 'Expense',
          amount: Number(item.amount) || 0,
          frequency: 'Monthly',
          isEssential: true
      } as Expense));

      // Merge with existing or replace
      updateData({ expenses: [...expenses, ...newExpenses] });
      setShowMLEWizard(false);
      setActiveTab('budget');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setIsUploading(true);
        
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = (event.target?.result as string).split(',')[1];
            const mimeType = file.type;
            
            const result = await analyzeBankStatement(base64, mimeType);
            
            if (result.suggestedExpenses.length > 0) {
                // Auto-add suggested
                const extracted: Expense[] = result.suggestedExpenses.map((ex: any, i: number) => ({
                    ...ex,
                    id: `ai-${Date.now()}-${i}`
                }));
                updateData({ expenses: [...expenses, ...extracted] });
                alert(`AI successfully extracted ${extracted.length} expenses!`);
            }
            setAiAnalysis(result.text); // Show analysis text in AI tab
            setIsUploading(false);
            setActiveTab('ai-cfo'); // Switch to show result
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* MLE WIZARD MODAL */}
      {showMLEWizard && (
          <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                      <div>
                          <h2 className="text-xl font-bold flex items-center gap-2">
                              <Calculator className="w-5 h-5 text-emerald-400" /> MLE Onboarding
                          </h2>
                          <p className="text-slate-400 text-xs">Minimal Living Expenses Setup (Houston/Texas Avgs)</p>
                      </div>
                      <button onClick={() => setShowMLEWizard(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
                  </div>
                  
                  <div className="p-8">
                      {/* Step 1: Housing */}
                      {mleStep === 0 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 1: Housing & Power</h3>
                              <p className="text-sm text-slate-500">Housing is typically 30-40% of the budget. Electricity in Texas is a major variable.</p>
                              
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rent / Mortgage</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.housing.rent}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Rent/Mortgage');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Rent/Mortgage', amount: Number(e.target.value), category: 'Housing' }]);
                                        }}
                                      />
                                      <span className="text-[10px] text-emerald-600 font-medium">Houston Avg: $1,350</span>
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Electricity (Summer)</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.utilities.electric}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Electric Bill');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Electric Bill', amount: Number(e.target.value), category: 'Utilities' }]);
                                        }}
                                      />
                                      <span className="text-[10px] text-emerald-600 font-medium">Texas Avg: $160+</span>
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* Step 2: Transport */}
                      {mleStep === 1 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 2: Transportation</h3>
                              <p className="text-sm text-slate-500">Houston is a driving city. Don't forget tolls and insurance.</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Car Note</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.carNote}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Car Note');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Car Note', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                                   <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Insurance</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.carIns}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Car Insurance');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Car Insurance', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                                   <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gas/Fuel</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.transport.gas}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Gas');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Gas', amount: Number(e.target.value), category: 'Transport' }]);
                                        }}
                                      />
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* Step 3: Essentials */}
                      {mleStep === 2 && (
                          <div className="space-y-4 animate-fade-in">
                              <h3 className="font-bold text-slate-800 text-lg">Step 3: Essentials</h3>
                              <p className="text-sm text-slate-500">The bare minimums to stay connected and fed.</p>
                              
                              <div className="grid grid-cols-1 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Groceries</label>
                                      <input 
                                        type="number" 
                                        defaultValue={HOUSTON_DEFAULTS.living.groceries}
                                        className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                        onChange={(e) => {
                                            const exists = mleData.find(d => d.name === 'Groceries');
                                            if(exists) exists.amount = Number(e.target.value);
                                            else setMleData([...mleData, { name: 'Groceries', amount: Number(e.target.value), category: 'Food' }]);
                                        }}
                                      />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                        <input 
                                            type="number" 
                                            defaultValue={HOUSTON_DEFAULTS.utilities.phone}
                                            className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                            onChange={(e) => {
                                                const exists = mleData.find(d => d.name === 'Phone Bill');
                                                if(exists) exists.amount = Number(e.target.value);
                                                else setMleData([...mleData, { name: 'Phone Bill', amount: Number(e.target.value), category: 'Utilities' }]);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Internet</label>
                                        <input 
                                            type="number" 
                                            defaultValue={HOUSTON_DEFAULTS.utilities.internet}
                                            className="w-full p-3 border border-slate-200 rounded-lg font-bold text-slate-800"
                                            onChange={(e) => {
                                                const exists = mleData.find(d => d.name === 'Internet');
                                                if(exists) exists.amount = Number(e.target.value);
                                                else setMleData([...mleData, { name: 'Internet', amount: Number(e.target.value), category: 'Utilities' }]);
                                            }}
                                        />
                                    </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
                       {mleStep > 0 ? (
                           <button onClick={() => setMleStep(prev => prev - 1)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-200 rounded-lg">Back</button>
                       ) : <div></div>}

                       {mleStep < 2 ? (
                           <button onClick={() => setMleStep(prev => prev + 1)} className="bg-slate-900 text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2">Next <ChevronRight className="w-4 h-4"/></button>
                       ) : (
                           <button onClick={handleWizardSubmit} className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200">Finish & Create Budget</button>
                       )}
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Financial Command Center</h2>
            <p className="text-slate-500">Optimize runway, cut burn rate, and manage capital.</p>
          </div>
      </div>

      {/* --- MINI DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Chart 1: Expense Composition */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <PieIcon className="w-4 h-4 text-emerald-500" /> Needs vs. Wants
            </h3>
            <div className="h-32 w-full flex gap-4 items-center">
                <div className="flex-1 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={expenseData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1">
                    {expenseData.map(d => (
                        <div key={d.name} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Chart 2: Runway */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <AreaIcon className="w-4 h-4 text-red-500" /> Runway Projection
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={runwayData}>
                         <defs>
                            <linearGradient id="colorRunway" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{fontSize: '12px', borderRadius: '8px'}} formatter={(val: number) => `$${val.toLocaleString()}`} />
                        <Area type="monotone" dataKey="balance" stroke="#F43F5E" fillOpacity={1} fill="url(#colorRunway)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                <span className="text-red-600">{runwayMonths} Months Left</span>
            </div>
        </div>

        {/* Chart 3: Burn History */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <BarChart3 className="w-4 h-4 text-slate-500" /> Burn Rate Trend
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={burnHistory}>
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Bar dataKey="amount" fill="#334155" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                Current: ${totalMonthlyExpenses.toLocaleString()}/mo
            </div>
        </div>
      </div>

      {/* Tabs & Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <PieIcon className="w-4 h-4" /> Overview
            </button>
            <button 
                onClick={() => setActiveTab('budget')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'budget' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <Wallet className="w-4 h-4" /> Living Expenses
            </button>
            <button 
                onClick={() => setActiveTab('ai-cfo')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'ai-cfo' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <BrainCircuit className="w-4 h-4" /> AI CFO & Bills
            </button>
        </div>

        <button 
          onClick={() => setShowMLEWizard(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition shadow-md"
        >
           <Calculator className="w-4 h-4" /> MLE Wizard
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Capital Stack Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-blue-600" /> Capital Sources
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Raised</div>
                        <div className="text-2xl font-bold text-slate-900">${totalRaised.toLocaleString()}</div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold text-slate-700 mb-2">Active Grants</h4>
                        {grants.map(g => (
                            <div key={g.id} className="flex justify-between items-center text-sm py-2 border-b border-slate-50 last:border-0">
                                <span>{g.name}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${g.status === 'Applied' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {g.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h3 className="font-bold text-slate-800">Living Expenses Ledger</h3>
                    <p className="text-sm text-slate-500">Track monthly recurring costs to calculate accurate burn rate.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.png" onChange={handleFileUpload} />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition shadow-sm text-sm font-bold"
                        >
                           {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
                           Upload Statement (AI)
                        </button>
                    </div>
                    <button 
                        onClick={() => setShowAddExpense(!showAddExpense)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-sm text-sm font-bold"
                    >
                        {showAddExpense ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Manual</>}
                    </button>
                </div>
            </div>

            {showAddExpense && (
                <div className="p-6 bg-emerald-50 border-b border-emerald-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-emerald-800 uppercase">Expense Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-emerald-200 rounded" 
                            placeholder="e.g. Car Insurance"
                            value={newExpense.name}
                            onChange={e => setNewExpense({...newExpense, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-emerald-800 uppercase">Amount</label>
                        <input 
                            type="number" 
                            className="w-full p-2 border border-emerald-200 rounded" 
                            placeholder="0.00"
                            value={newExpense.amount || ''}
                            onChange={e => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-emerald-800 uppercase">Category</label>
                        <select 
                            className="w-full p-2 border border-emerald-200 rounded"
                            value={newExpense.category}
                            onChange={e => setNewExpense({...newExpense, category: e.target.value as any})}
                        >
                            <option value="Housing">Housing</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Debt">Debt</option>
                            <option value="Subscription">Subscription</option>
                        </select>
                    </div>
                    <button onClick={handleAddExpense} className="bg-emerald-600 text-white p-2.5 rounded font-bold">Save</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                        <tr>
                            <th className="p-4">Expense Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Frequency</th>
                            <th className="p-4">Type</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {expenses.map(expense => (
                            <tr key={expense.id} className="hover:bg-slate-50">
                                <td className="p-4 font-medium text-slate-900">{expense.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                        expense.category === 'Housing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        expense.category === 'Food' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-slate-50 text-slate-600 border-slate-200'
                                    }`}>
                                        {expense.category}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500">{expense.frequency}</td>
                                <td className="p-4">
                                    {expense.isEssential ? 
                                        <span className="text-green-600 flex items-center gap-1 font-bold text-xs"><CheckCircle2 className="w-3 h-3"/> Need</span> : 
                                        <span className="text-rose-500 flex items-center gap-1 font-bold text-xs"><AlertTriangle className="w-3 h-3"/> Want</span>
                                    }
                                </td>
                                <td className="p-4 text-right font-mono font-bold text-slate-800">${expense.amount.toFixed(2)}</td>
                                <td className="p-4 text-center">
                                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-slate-400 hover:text-rose-500 transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-slate-50 font-bold">
                            <td colSpan={4} className="p-4 text-right text-slate-600">MONTHLY TOTAL</td>
                            <td className="p-4 text-right text-emerald-700">${totalMonthlyExpenses.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* AI CFO TAB */}
      {activeTab === 'ai-cfo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CFO Analysis */}
            <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-emerald-400" /> Virtual CFO
                    </h3>
                    <p className="text-slate-300 text-sm mb-4">
                        Analyzes your burn rate and capital stack to provide ruthless strategic advice.
                    </p>
                    <button 
                        onClick={handleRunCFO}
                        disabled={isAnalyzing}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                    >
                        {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                        Run Financial Diagnostic
                    </button>
                </div>

                {aiAnalysis && (
                    <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm prose prose-sm max-w-none">
                        <h4 className="text-emerald-800 font-bold border-b border-emerald-100 pb-2 mb-4">
                            <FileText className="w-4 h-4 inline mr-2" /> CFO Report / Bank Analysis
                        </h4>
                        <div className="whitespace-pre-wrap text-slate-700">{aiAnalysis}</div>
                    </div>
                )}
            </div>

            {/* Bill Negotiator */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-purple-600" /> Bill Negotiator
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    Select a recurring bill. The AI will generate a specific script to read to customer service to lower your rate.
                </p>

                <div className="space-y-3 mb-6">
                    {expenses.filter(e => e.category === 'Utilities' || e.category === 'Subscription' || e.category === 'Debt').map(bill => (
                        <button 
                            key={bill.id}
                            onClick={() => handleNegotiate(bill)}
                            className="w-full p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg flex justify-between items-center transition group"
                        >
                            <span className="font-bold text-slate-700 group-hover:text-purple-700">{bill.name} (${bill.amount})</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                        </button>
                    ))}
                </div>

                {isAnalyzing && !aiAnalysis && (
                    <div className="flex items-center gap-2 text-purple-600 text-sm font-bold justify-center p-4">
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating Script...
                    </div>
                )}

                {negotiationScript && (
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-purple-800 uppercase">Script for {selectedBill?.name}</span>
                            <button 
                                onClick={() => navigator.clipboard.writeText(negotiationScript)} 
                                className="text-xs text-purple-600 hover:underline"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="text-sm text-slate-800 whitespace-pre-wrap font-medium">
                            {negotiationScript}
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};