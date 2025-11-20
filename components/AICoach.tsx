import React, { useState } from 'react';
import { askSolarCoach } from '../services/geminiService';
import { Bot, Send, Loader2, Sparkles } from 'lucide-react';

export const AICoach: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    
    const answer = await askSolarCoach(query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 h-full flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-electric-600 to-electric-900 p-4 text-white flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">SolarAI Coach</h2>
          <p className="text-xs text-blue-100">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
        {!response && !loading && (
          <div className="text-center text-slate-400 mt-10">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-solar-500 opacity-50" />
            <p>Ask me anything about PV systems, NEC codes, or NABCEP exam prep!</p>
            <div className="mt-6 grid grid-cols-1 gap-2 text-sm">
              <button onClick={() => setQuery("Explain the difference between irradiance and insolation")} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 transition">
                "Irradiance vs Insolation?"
              </button>
              <button onClick={() => setQuery("What are the key NEC 2020 rapid shutdown requirements?")} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 transition">
                "NEC 2020 Rapid Shutdown?"
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-full text-electric-600">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm font-medium">Analyzing solar data...</p>
          </div>
        )}

        {response && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Coach Answer</h3>
            <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleAsk} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your solar coach..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-electric-500 focus:border-transparent outline-none transition"
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="bg-electric-600 hover:bg-electric-500 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
