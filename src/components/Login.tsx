import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Brand */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-solar-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
              <Sun className="text-white w-7 h-7 fill-white" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4">SolarCareer<span className="text-blue-300">.Pro</span></h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              The operating system for your career transformation. Track certifications, manage capital, and optimize performance with AI.
            </p>
          </div>
          <div className="relative z-10 space-y-4 mt-12">
            <div className="flex items-center gap-3 text-sm font-medium text-blue-100">
              <CheckCircle2 className="w-5 h-5 text-green-400" /> Secure Cloud Sync
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-blue-100">
              <CheckCircle2 className="w-5 h-5 text-green-400" /> AI-Powered Coaching
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-blue-100">
              <CheckCircle2 className="w-5 h-5 text-green-400" /> Real-time Financials
            </div>
          </div>
        </div>

        {/* Right Side - Auth */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center items-center bg-slate-50">
          <div className="w-full max-w-sm text-center">
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
             <p className="text-slate-500 mb-8">Sign in to access your Mission Control</p>

             <button 
               onClick={handleLogin}
               disabled={isLoggingIn}
               className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-slate-50 hover:shadow-md transition flex items-center justify-center gap-3 group"
             >
               {isLoggingIn ? (
                 <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
               ) : (
                 <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
               )}
               <span>{isLoggingIn ? 'Connecting...' : 'Continue with Google'}</span>
             </button>

             <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
               <ShieldCheck className="w-3 h-3" /> Secured by Google Firebase
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};