
import React, { useState, useRef, useEffect } from 'react';
import { Investor, InvestorUpdate } from '../types';
import { Users, Send, Plus, DollarSign, PieChart, TrendingUp, Mail, CheckCircle2, Sparkles, Loader2, Save, X, Calendar, Filter, Eye, Bold, Italic, Underline, List, AlignLeft } from 'lucide-react';
import { draftInvestorUpdate } from '../services/geminiService';

export const Investors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crm' | 'communicate'>('crm');
  
  // State for Adding Investor
  const [showAddInvestor, setShowAddInvestor] = useState(false);
  const [newInvestor, setNewInvestor] = useState<Partial<Investor>>({
    name: '',
    type: 'Equity',
    amount: 0,
    status: 'Prospect',
    lastContact: new Date().toISOString().split('T')[0]
  });

  // Mock Data
  const [investors, setInvestors] = useState<Investor[]>([
    { id: '1', name: 'Family Trust A', type: 'Loan', status: 'Wired', amount: 15000, email: 'family@trust.com', lastContact: '2025-10-20', notes: 'Repayment via salary garnish starts Jan 2026.' },
    { id: '2', name: 'Angel Investor B', type: 'Equity', status: 'Committed', amount: 10000, email: 'angel@vc.com', lastContact: '2025-10-22', notes: 'Waiting on Phase 1 completion proof.' },
    { id: '3', name: 'WIOA Grant', type: 'Grant', status: 'Prospect', amount: 4000, email: 'case.manager@texas.gov', lastContact: '2025-10-25', notes: 'Application pending review.' },
  ]);

  const [updates, setUpdates] = useState<InvestorUpdate[]>([
    { id: 'u1', date: 'Oct 01, 2025', subject: 'Project Launch & Initial Funding', preview: 'Phase 1 has officially begun. We have secured 50% of the required capital...', sentTo: 2 }
  ]);

  // Communication State
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState(''); // Stores HTML
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftContext, setDraftContext] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipientFilter, setRecipientFilter] = useState<'All' | 'Committed' | 'Prospect'>('All');
  
  const editorRef = useRef<HTMLDivElement>(null);

  const totalRaised = investors.filter(i => i.status === 'Wired' || i.status === 'Committed').reduce((sum, i) => sum + i.amount, 0);
  const goal = 30000;
  const progress = (totalRaised / goal) * 100;

  // Populate editor when tab opens
  useEffect(() => {
    if (activeTab === 'communicate' && editorRef.current) {
      editorRef.current.innerHTML = emailBody;
    }
  }, [activeTab]);

  // Filter Logic
  const getRecipients = () => {
    if (recipientFilter === 'All') return investors;
    if (recipientFilter === 'Committed') return investors.filter(i => i.status === 'Committed' || i.status === 'Wired');
    if (recipientFilter === 'Prospect') return investors.filter(i => i.status === 'Prospect' || i.status === 'Contacted');
    return [];
  };
  const recipientCount = getRecipients().length;

  const handleSaveInvestor = () => {
    if (!newInvestor.name || !newInvestor.amount) return;
    
    const investor: Investor = {
      id: Date.now().toString(),
      name: newInvestor.name,
      type: newInvestor.type as any,
      status: newInvestor.status as any,
      amount: Number(newInvestor.amount),
      lastContact: newInvestor.lastContact || new Date().toISOString().split('T')[0],
      email: 'pending@example.com',
      notes: 'New entry'
    };

    setInvestors([...investors, investor]);
    setShowAddInvestor(false);
    setNewInvestor({ name: '', type: 'Equity', amount: 0, status: 'Prospect', lastContact: new Date().toISOString().split('T')[0] });
  };

  const handleDraftAI = async () => {
    if (!draftContext) return;
    setIsDrafting(true);
    const draft = await draftInvestorUpdate('Monthly Update', draftContext);
    
    let newBody = '';
    const parts = draft.split('\n\n');
    if (parts.length > 1 && parts[0].toLowerCase().startsWith('subject:')) {
      setEmailSubject(parts[0].replace('Subject:', '').trim());
      // Convert plain text newlines to HTML breaks/paragraphs
      newBody = parts.slice(1).map(p => `<p>${p}</p>`).join('');
    } else {
      newBody = draft.split('\n').map(line => line ? `<p>${line}</p>` : '<br/>').join('');
    }

    setEmailBody(newBody);
    if (editorRef.current) {
      editorRef.current.innerHTML = newBody;
    }
    setIsDrafting(false);
  };

  const handleSendUpdate = () => {
    setShowSuccess(true);
    // Strip HTML for preview
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = emailBody;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    const newUpdate: InvestorUpdate = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      subject: emailSubject,
      preview: plainText.substring(0, 100) + '...',
      sentTo: recipientCount
    };
    setUpdates([newUpdate, ...updates]);
    
    setTimeout(() => {
      setShowSuccess(false);
      setEmailSubject('');
      setEmailBody('');
      if (editorRef.current) editorRef.current.innerHTML = '';
      setDraftContext('');
    }, 3000);
  };

  const execCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    if (editorRef.current) {
      setEmailBody(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Investor Relations</h2>
          <p className="text-slate-500">Capital management and stakeholder communication portal.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition flex items-center gap-2 ${activeTab === 'crm' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <PieChart className="w-4 h-4" /> Overview & CRM
          </button>
          <button 
             onClick={() => setActiveTab('communicate')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition flex items-center gap-2 ${activeTab === 'communicate' ? 'bg-white text-electric-600 shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Mail className="w-4 h-4" /> Communication Portal
          </button>
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-md bg-green-600 text-white p-4 rounded-xl shadow-2xl z-50 animate-bounce flex items-center gap-3 justify-center">
          <CheckCircle2 className="w-6 h-6" />
          <div className="font-bold">Update Sent Successfully!</div>
        </div>
      )}

      {/* CRM TAB */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          {/* Cap Table Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-slate-400 text-xs uppercase font-bold">Total Raised</div>
                  <div className="text-3xl font-bold mt-1">${totalRaised.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{progress.toFixed(0)}% of Goal</span>
                <span>Target: ${goal.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-slate-500 text-xs uppercase font-bold">Active Investors</div>
                  <div className="text-3xl font-bold text-slate-800 mt-1">{investors.length}</div>
                </div>
                <div className="p-2 bg-electric-100 rounded-lg">
                  <Users className="w-6 h-6 text-electric-600" />
                </div>
              </div>
              <div className="text-sm text-slate-600">
                <span className="text-green-600 font-bold">2</span> Committed • <span className="text-slate-400">1</span> Prospect
              </div>
            </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-slate-500 text-xs uppercase font-bold">Avg. Check Size</div>
                  <div className="text-3xl font-bold text-slate-800 mt-1">$9,666</div>
                </div>
                <div className="p-2 bg-solar-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-solar-600" />
                </div>
              </div>
              <div className="text-sm text-slate-600">
                Mixed Capital: Loan / Equity / Grant
              </div>
            </div>
          </div>

          {/* Investor Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Cap Table & Pipeline</h3>
              {!showAddInvestor ? (
                <button 
                  onClick={() => setShowAddInvestor(true)}
                  className="text-sm flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
                >
                  <Plus className="w-4 h-4" /> Add Investor
                </button>
              ) : (
                <button 
                  onClick={() => setShowAddInvestor(false)}
                  className="text-sm flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold">
                  <tr>
                    <th className="p-4">Investor Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Commitment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Contact</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Add Investor Row */}
                  {showAddInvestor && (
                    <tr className="bg-blue-50">
                      <td className="p-4">
                        <input 
                          autoFocus
                          type="text" 
                          placeholder="Investor Name"
                          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:border-blue-400"
                          value={newInvestor.name}
                          onChange={e => setNewInvestor({...newInvestor, name: e.target.value})}
                        />
                      </td>
                      <td className="p-4">
                        <select 
                          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:border-blue-400"
                          value={newInvestor.type}
                          onChange={e => setNewInvestor({...newInvestor, type: e.target.value as any})}
                        >
                          <option value="Equity">Equity</option>
                          <option value="Loan">Loan</option>
                          <option value="Grant">Grant</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <span className="absolute left-2 top-2 text-slate-400">$</span>
                          <input 
                            type="number" 
                            placeholder="0"
                            className="w-full p-2 pl-5 border border-blue-200 rounded focus:outline-none focus:border-blue-400"
                            value={newInvestor.amount || ''}
                            onChange={e => setNewInvestor({...newInvestor, amount: parseFloat(e.target.value)})}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                         <select 
                          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:border-blue-400"
                          value={newInvestor.status}
                          onChange={e => setNewInvestor({...newInvestor, status: e.target.value as any})}
                        >
                          <option value="Prospect">Prospect</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Committed">Committed</option>
                          <option value="Wired">Wired</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <input 
                          type="date" 
                          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:border-blue-400"
                          value={newInvestor.lastContact}
                          onChange={e => setNewInvestor({...newInvestor, lastContact: e.target.value})}
                        />
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={handleSaveInvestor}
                          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                          title="Save"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )}

                  {investors.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-800">{inv.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${inv.type === 'Loan' ? 'bg-purple-100 text-purple-700' : inv.type === 'Equity' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                          {inv.type}
                        </span>
                      </td>
                      <td className="p-4 font-mono">${inv.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${
                          inv.status === 'Wired' ? 'text-green-600' : 
                          inv.status === 'Committed' ? 'text-blue-600' : 
                          'text-slate-500'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            inv.status === 'Wired' ? 'bg-green-500' : 
                            inv.status === 'Committed' ? 'bg-blue-500' : 
                            'bg-slate-400'
                          }`}></div>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{inv.lastContact}</td>
                      <td className="p-4">
                        <button onClick={() => setActiveTab('communicate')} className="text-electric-600 hover:text-electric-800 font-medium text-xs flex items-center gap-1">
                           <Mail className="w-3 h-3" /> Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNICATION TAB */}
      {activeTab === 'communicate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Composer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Send className="w-5 h-5 text-electric-600" /> Compose Update
                </h3>
                <div className="flex gap-2">
                  <select 
                    className="text-xs border border-slate-300 rounded-md px-2 py-1 bg-white cursor-pointer hover:border-electric-400 transition"
                    onChange={(e) => {
                      if(e.target.value === 'monthly') setDraftContext("Draft a standard monthly update covering Phase 1 progress (15% complete), recent study hours (40hrs), and next month's goals.");
                      if(e.target.value === 'capital') setDraftContext("Draft a capital call request. We need the remaining $5k to pay for the PVIP exam. Explain the ROI.");
                    }}
                  >
                    <option value="">Load Template...</option>
                    <option value="monthly">Monthly Progress</option>
                    <option value="capital">Capital Call</option>
                    <option value="milestone">Milestone Hit</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6 flex flex-col gap-4">
                
                {/* Recipients & Subject */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Filter className="w-3 h-3" /> Recipients
                    </label>
                    <select 
                      value={recipientFilter}
                      onChange={(e) => setRecipientFilter(e.target.value as any)}
                      className="w-full p-3 border border-slate-200 rounded-lg font-medium focus:ring-2 focus:ring-electric-500 outline-none bg-slate-50"
                    >
                      <option value="All">All Investors ({investors.length})</option>
                      <option value="Committed">Committed Only ({investors.filter(i => i.status === 'Committed' || i.status === 'Wired').length})</option>
                      <option value="Prospect">Prospects Only ({investors.filter(i => i.status === 'Prospect' || i.status === 'Contacted').length})</option>
                    </select>
                  </div>
                  <div className="w-full md:w-2/3 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Subject Line</label>
                    <input 
                      type="text" 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-lg font-medium focus:ring-2 focus:ring-electric-500 outline-none"
                      placeholder="e.g. Investor Update: Phase 1 Progress"
                    />
                  </div>
                </div>

                {/* AI Assistant */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-electric-600" />
                      <label className="text-sm font-bold text-slate-700">AI Drafting Assistant</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={draftContext}
                      onChange={(e) => setDraftContext(e.target.value)}
                      placeholder="Tell AI what to write (e.g. 'Just passed Freedom Solar training, requesting funds')"
                      className="flex-1 text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-electric-500 outline-none"
                    />
                    <button 
                      onClick={handleDraftAI}
                      disabled={!draftContext || isDrafting}
                      className="bg-electric-600 hover:bg-electric-700 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition disabled:opacity-50 shrink-0"
                    >
                      {isDrafting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Generate Draft
                    </button>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Message Body</label>
                  
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-electric-500 transition">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50">
                       <button onClick={() => execCommand('bold')} className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition" title="Bold"><Bold className="w-4 h-4"/></button>
                       <button onClick={() => execCommand('italic')} className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition" title="Italic"><Italic className="w-4 h-4"/></button>
                       <button onClick={() => execCommand('underline')} className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition" title="Underline"><Underline className="w-4 h-4"/></button>
                       <div className="w-px h-4 bg-slate-300 mx-1"></div>
                       <button onClick={() => execCommand('insertUnorderedList')} className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition" title="Bullet List"><List className="w-4 h-4"/></button>
                    </div>
                    
                    {/* Editable Area */}
                    <div 
                       ref={editorRef}
                       contentEditable
                       className="w-full h-64 p-4 outline-none font-sans text-sm overflow-y-auto prose prose-sm max-w-none"
                       onInput={(e) => setEmailBody(e.currentTarget.innerHTML)}
                       suppressContentEditableWarning={true}
                       data-placeholder="Compose your update here..."
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex justify-between items-center border-t border-slate-100 mt-2">
                  <div className="text-xs text-slate-500">
                      Sending to <strong className="text-slate-800">{recipientCount} Investors</strong> via <span className="font-mono">noreply@solarcareer.pro</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-slate-500 text-sm font-medium hover:text-slate-800 px-3 py-2 transition">
                        Send Test
                      </button>
                      <button 
                        onClick={handleSendUpdate}
                        disabled={!emailSubject || !emailBody}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-green-600/20"
                      >
                        <Send className="w-4 h-4" /> Send Update
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-500" /> History
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px]">
                {updates.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <Mail className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No updates sent yet.</p>
                  </div>
                ) : (
                  updates.map(update => (
                    <div key={update.id} className="p-4 rounded-lg border border-slate-100 hover:border-electric-200 hover:shadow-md transition bg-slate-50 group cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400">{update.date}</span>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Sent
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-electric-600 transition">{update.subject}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{update.preview}</p>
                      <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                        <span className="text-xs text-slate-400 font-medium">{update.sentTo} Recipients</span>
                        <Eye className="w-3 h-3 text-slate-400 group-hover:text-electric-500" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
