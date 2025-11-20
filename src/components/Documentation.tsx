
import React, { useState } from 'react';
import { Book, Code, Users, Layers, Download, ChevronRight, BrainCircuit, ShieldCheck, Zap, Database, Smartphone, Wifi, MapPin, Mail, DollarSign, Cloud, Lock } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const Documentation: React.FC = () => {
  const { exportFramework } = useData();
  const [activeSection, setActiveSection] = useState<'guide' | 'beta' | 'framework'>('guide');
  const [guideTab, setGuideTab] = useState<'ai' | 'tracker' | 'crm' | 'mobile' | 'sync'>('ai');

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded uppercase tracking-wider border border-blue-500/30">Admin Console</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">System Documentation & Training</h1>
            <p className="text-slate-300 max-w-xl text-sm md:text-base">
              Comprehensive manual for the SolarCareer Operating System. Master the tools, manage the beta, and export the framework.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveSection('guide')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeSection === 'guide' ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Book className="w-4 h-4" /> User Guide
            </button>
            <button 
              onClick={() => setActiveSection('beta')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeSection === 'beta' ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Users className="w-4 h-4" /> Beta Protocol
            </button>
            <button 
              onClick={() => setActiveSection('framework')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeSection === 'framework' ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Code className="w-4 h-4" /> Framework
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* USER GUIDE SECTION */}
        {activeSection === 'guide' && (
          <div className="flex flex-col h-full">
            {/* Guide Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-4 gap-1 overflow-x-auto">
                <button 
                  onClick={() => setGuideTab('ai')}
                  className={`px-4 py-2 text-sm font-bold rounded-t-lg border-t border-x transition ${guideTab === 'ai' ? 'bg-white border-slate-200 text-electric-600 border-b-white -mb-px' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
                >
                   AI Coach
                </button>
                <button 
                  onClick={() => setGuideTab('tracker')}
                  className={`px-4 py-2 text-sm font-bold rounded-t-lg border-t border-x transition ${guideTab === 'tracker' ? 'bg-white border-slate-200 text-electric-600 border-b-white -mb-px' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
                >
                   Certifications
                </button>
                <button 
                  onClick={() => setGuideTab('crm')}
                  className={`px-4 py-2 text-sm font-bold rounded-t-lg border-t border-x transition ${guideTab === 'crm' ? 'bg-white border-slate-200 text-electric-600 border-b-white -mb-px' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
                >
                   Investor CRM
                </button>
                <button 
                  onClick={() => setGuideTab('mobile')}
                  className={`px-4 py-2 text-sm font-bold rounded-t-lg border-t border-x transition ${guideTab === 'mobile' ? 'bg-white border-slate-200 text-electric-600 border-b-white -mb-px' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
                >
                   Field Ops
                </button>
                <button 
                  onClick={() => setGuideTab('sync')}
                  className={`px-4 py-2 text-sm font-bold rounded-t-lg border-t border-x transition ${guideTab === 'sync' ? 'bg-white border-slate-200 text-electric-600 border-b-white -mb-px' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
                >
                   Cloud Sync
                </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
               {/* AI GUIDE */}
               {guideTab === 'ai' && (
                 <div className="space-y-8 max-w-4xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-purple-100 rounded-lg shrink-0">
                            <BrainCircuit className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">The "Savage" AI Coach</h2>
                            <p className="text-slate-600 mt-2">
                                Built on Gemini 2.5 Flash, this isn't a chatbot—it's a performance protocol manager. It uses a hybrid persona of David Goggins (Mental Toughness) and Elon Musk (First Principles).
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2">1. Accountability Mirror</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                Located in the Morning/Evening tabs. Users input their daily plan or failure report. 
                            </p>
                            <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500">
                                <strong>Logic:</strong> The AI scans for "excuses" and passive language. It returns ruthless, actionable feedback referencing the "40% Rule".
                            </div>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2">2. Tactical Advice</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                The "Tactical Advice" button reads the specific list of <em>unchecked</em> tasks in the current phase.
                            </p>
                            <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500">
                                <strong>Logic:</strong> Context-aware prompting. "User has completed A, but ignored B. Motivate them to finish B."
                            </div>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2">3. Deep Dive Protocols</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                Buttons above the chat (Mirror, 40% Rule, etc.) trigger dedicated educational modules.
                            </p>
                            <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500">
                                <strong>Output:</strong> Concept Definition -&gt; Solar Career Application -&gt; Immediate Drill.
                            </div>
                        </div>
                         <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2">4. Savage Score</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                A real-time KPI: <code className="bg-slate-200 px-1">Completed Tasks / Total Tasks</code>.
                            </p>
                            <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500">
                                <strong>Goal:</strong> Maintain &gt;85% daily. This is the primary metric for Beta testers to report.
                            </div>
                        </div>
                    </div>
                 </div>
               )}

               {/* SYNC GUIDE */}
               {guideTab === 'sync' && (
                 <div className="space-y-8 max-w-4xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-orange-100 rounded-lg shrink-0">
                            <Cloud className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">App Synchronization</h2>
                            <p className="text-slate-600 mt-2">
                                How to connect <strong>SolarCareer</strong> with the <strong>SolarDrive</strong> storage app.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-slate-500"/> The Single Backend Rule
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Because these two apps run in separate browser environments, they cannot talk directly. To sync them, they must share a <strong>Cloud Backend</strong>.
                        </p>
                        
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                            <div className="flex gap-3">
                                <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</div>
                                <p className="text-sm text-slate-700">Go to <strong>Settings &gt; Data &amp; Backup &gt; Cloud Connect</strong>.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</div>
                                <p className="text-sm text-slate-700">Enter your <strong>Firebase API Key</strong> and <strong>Project ID</strong>.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">3</div>
                                <p className="text-sm text-slate-700">Open the <strong>SolarDrive</strong> app and enter the <strong>exact same credentials</strong> in its settings.</p>
                            </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-800 text-sm flex gap-2 items-start">
                            <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                            <p>Once configured, any file reference saved in SolarCareer will be accessible in SolarDrive, and certificates uploaded to Drive will appear in your Portfolio.</p>
                        </div>
                    </div>
                 </div>
               )}

               {/* TRACKER GUIDE */}
               {guideTab === 'tracker' && (
                 <div className="space-y-8 max-w-4xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-solar-100 rounded-lg shrink-0">
                            <ShieldCheck className="w-8 h-8 text-solar-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Certification & Skills Engine</h2>
                            <p className="text-slate-600 mt-2">
                                Manages the hard assets of the career. Integrates visual roadmaps with functional logging tools.
                            </p>
                        </div>
                    </div>
                    
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4">
                            <div className="bg-white p-2 h-fit rounded border border-slate-100 font-bold text-slate-700">Career Map</div>
                            <div>
                                <p className="text-sm text-slate-600">
                                    <strong>Visual Interface:</strong> Interactive grid showing the NABCEP ecosystem. 
                                    <br/><em>Usage:</em> Click tabs to see prerequisites for advanced roles (PVIP, ESIP, Design).
                                </p>
                            </div>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4">
                            <div className="bg-white p-2 h-fit rounded border border-slate-100 font-bold text-slate-700">Active Cert</div>
                            <div>
                                <p className="text-sm text-slate-600">
                                    <strong>Progress Tracking:</strong> Manual input for Study Hours and Practice Exam scores.
                                    <br/><em>Viz:</em> Recharts line graph visualizes exam readiness over time.
                                </p>
                            </div>
                        </li>
                         <li className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4">
                            <div className="bg-white p-2 h-fit rounded border border-slate-100 font-bold text-slate-700">Simulations</div>
                            <div>
                                <p className="text-sm text-slate-600">
                                    <strong>Virtual Labs:</strong> Direct links to SkillCat (3D sim), Aurora (Design), and PVWatts.
                                    <br/><em>Goal:</em> Build a "Shadow Portfolio" of designs before getting hired.
                                </p>
                            </div>
                        </li>
                    </ul>
                 </div>
               )}

               {/* CRM GUIDE */}
               {guideTab === 'crm' && (
                 <div className="space-y-8 max-w-4xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-electric-100 rounded-lg shrink-0">
                            <Mail className="w-8 h-8 text-electric-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Investor Relations CRM</h2>
                            <p className="text-slate-600 mt-2">
                                A dedicated portal for capital management. Replaces spreadsheets with a "Founder-grade" tool.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> AI Drafting Engine</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                The composer uses Gemini to draft professional emails.
                            </p>
                            <div className="bg-slate-100 p-3 rounded text-xs font-mono text-slate-600">
                                Input: "Need money for PVIP exam"<br/>
                                Output: "Subject: Strategic Capital Call - Phase 2 certification funding..."
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5">
                             <h3 className="font-bold text-slate-800 mb-2">Rich Text</h3>
                             <p className="text-sm text-slate-600">
                                WYSIWYG editor supports bolding, lists, and formatting for professional newsletters.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-2">Cap Table Logic</h3>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                            <li><strong>Equity:</strong> Ownership stake investments.</li>
                            <li><strong>Loan:</strong> Repayment via future salary garnish.</li>
                            <li><strong>Grant:</strong> Non-dilutive capital (WIOA).</li>
                            <li><strong>Status Flow:</strong> Prospect → Contacted → Committed → Wired.</li>
                        </ul>
                    </div>
                 </div>
               )}

               {/* MOBILE GUIDE */}
               {guideTab === 'mobile' && (
                 <div className="space-y-8 max-w-4xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-green-100 rounded-lg shrink-0">
                            <Smartphone className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Mobile & Field Operations</h2>
                            <p className="text-slate-600 mt-2">
                                Features designed for job sites, signal loss, and physical verification.
                            </p>
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-500"/> GPS Field Logger
                            </h3>
                            <p className="text-sm text-slate-600 mb-3">
                                Located in <strong>Certifications &gt; Field Log</strong>.
                            </p>
                            <ul className="text-xs text-slate-500 space-y-2">
                                <li className="flex gap-2"><span className="font-bold">1.</span> Click "GPS Check-In".</li>
                                <li className="flex gap-2"><span className="font-bold">2.</span> Browser requests Geolocation API.</li>
                                <li className="flex gap-2"><span className="font-bold">3.</span> Captures Lat/Long/Accuracy.</li>
                                <li className="flex gap-2"><span className="font-bold">4.</span> Logs 4-hour block towards PVIP 58-hour requirement.</li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Wifi className="w-4 h-4 text-slate-500"/> Offline Mode (PWA)
                            </h3>
                            <p className="text-sm text-slate-600 mb-3">
                                The app is a Progressive Web App.
                            </p>
                             <ul className="text-xs text-slate-500 space-y-2">
                                <li className="flex gap-2"><span className="font-bold">1.</span> Install: "Add to Home Screen" on iOS/Android.</li>
                                <li className="flex gap-2"><span className="font-bold">2.</span> Cache: Service Worker caches UI shells.</li>
                                <li className="flex gap-2"><span className="font-bold">3.</span> Data: You can view Dashboards and Resources offline.</li>
                                <li className="flex gap-2"><span className="font-bold">4.</span> Sync: New data saves locally, but AI features require internet.</li>
                            </ul>
                        </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* BETA PROTOCOL SECTION */}
        {activeSection === 'beta' && (
          <div className="p-8 overflow-y-auto max-w-4xl mx-auto w-full space-y-8">
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <h3 className="font-bold text-yellow-800">Phase 1: Admin Testing (Current)</h3>
                <p className="text-sm text-yellow-700 mt-1">
                    <strong>Objective:</strong> Validate data persistence and "Savage Score" logic for 30 days.
                </p>
             </div>

             <h2 className="text-2xl font-bold text-slate-800">Phase 2: Beta Rollout Protocol</h2>
             
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">Prepare the Build</h4>
                        <p className="text-slate-600 text-sm">
                            Ensure the app is deployed to <code className="bg-slate-100 px-1 rounded">solarcareer.pro</code>. Verify that the <strong>Service Worker</strong> is active for offline caching (check Console).
                        </p>
                    </div>
                </div>

                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">Generate "Seed" Framework</h4>
                        <p className="text-slate-600 text-sm">
                            Go to the <strong>Framework</strong> tab here and export the JSON. This file is the "Seed" you will email to your 3 testers.
                        </p>
                    </div>
                </div>

                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">Tester Onboarding Flow</h4>
                        <p className="text-slate-600 text-sm mb-2">
                           Send this exact instruction set to users:
                        </p>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 font-mono text-xs text-slate-700">
                            1. Navigate to solarcareer.pro<br/>
                            2. Go to Settings &gt; Data &amp; Backup<br/>
                            3. Click "Import Backup" -&gt; Select 'framework_template_v1.json'<br/>
                            4. Go to AI Coach -&gt; Set your Morning Routine.<br/>
                            5. Report your "Savage Score" every Sunday.
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* FRAMEWORK EXPORT SECTION */}
        {activeSection === 'framework' && (
          <div className="p-8 overflow-y-auto max-w-4xl mx-auto w-full">
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl mb-8 text-center">
                <Layers className="w-16 h-16 text-electric-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">The "LifeOS" Framework</h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                    This button generates a clean, sanitized version of the entire application state.
                    It strips out your personal data (Investors, Journals, Logs) but preserves the <strong>Architecture</strong> (Routine Categories, Task Logic, Career Levels).
                </p>
                <button 
                    onClick={exportFramework}
                    className="bg-electric-500 hover:bg-electric-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-electric-500/30 flex items-center gap-3 mx-auto transition transform hover:scale-105"
                >
                    <Download className="w-6 h-6" /> Export Framework Template
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Sanitized: No Personal Data included</span>
                </div>
             </div>

             <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Framework Components Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <h4 className="font-bold text-slate-700">Routine Structure</h4>
                            <p className="text-xs text-slate-500 mt-1">Morning/Training/Evening Protocol definitions.</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <h4 className="font-bold text-slate-700">Career Logic</h4>
                            <p className="text-xs text-slate-500 mt-1">Certification tiers (L1-L4) and ROI calculation formulas.</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <h4 className="font-bold text-slate-700">System Configs</h4>
                            <p className="text-xs text-slate-500 mt-1">Default grant types and study resource categories.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Apply to New Niche</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        To rebuild this for Real Estate or Fitness, simply take the exported JSON and modify the <code className="bg-slate-100 px-1">certifications</code> and <code className="bg-slate-100 px-1">routineTasks</code> arrays before importing it into a fresh instance of the app.
                    </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
