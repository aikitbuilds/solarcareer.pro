import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Sun, Loader2, CheckCircle2, ShieldCheck, AlertCircle, 
  Award, TrendingUp, Brain, DollarSign, Users, BarChart3,
  Zap, Target, BookOpen, MapPin, Clock, ArrowRight, Sparkles,
  ExternalLink, Calculator, TrendingDown, Percent, DollarSign as DollarIcon,
  Briefcase, Building2, Rocket, Lock, CheckCircle, Activity, PieChart,
  LineChart, ArrowUpRight, Star, Globe, Battery, Gauge
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roiInvestment, setRoiInvestment] = useState(10000);
  const [roiReturn, setRoiReturn] = useState(15);
  const [roiTimeframe, setRoiTimeframe] = useState(12);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Sample data for charts
  const careerGrowthData = [
    { month: 'Jan', certifications: 0, projects: 0, income: 0 },
    { month: 'Feb', certifications: 1, projects: 2, income: 5000 },
    { month: 'Mar', certifications: 1, projects: 5, income: 12000 },
    { month: 'Apr', certifications: 2, projects: 8, income: 20000 },
    { month: 'May', certifications: 2, projects: 12, income: 32000 },
    { month: 'Jun', certifications: 3, projects: 18, income: 48000 },
  ];

  const certificationDistribution = [
    { name: 'NABCEP PV Associate', value: 35, color: '#3B82F6' },
    { name: 'NABCEP PV Installer', value: 28, color: '#F59E0B' },
    { name: 'NABCEP PV Designer', value: 22, color: '#10B981' },
    { name: 'NABCEP PV Technical Sales', value: 15, color: '#8B5CF6' },
  ];

  const roiComparisonData = [
    { period: '3mo', traditional: 2, solarcareer: 8 },
    { period: '6mo', traditional: 5, solarcareer: 15 },
    { period: '12mo', traditional: 10, solarcareer: 28 },
    { period: '24mo', traditional: 20, solarcareer: 45 },
  ];

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (e: any) {
      console.error('Login error:', e);
      const errorMessage = e?.code === 'auth/configuration-not-found' 
        ? 'Firebase Authentication is not configured. Please enable Google Sign-In in Firebase Console.'
        : e?.message || 'Failed to sign in. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = [heroRef.current, portfolioRef.current, calculatorRef.current, statsRef.current].filter(Boolean);
    elements.forEach(el => el && observer.observe(el));

    return () => {
      elements.forEach(el => el && observer.unobserve(el));
    };
  }, []);

  // ROI Calculation
  const calculateROI = () => {
    const monthlyReturn = (roiInvestment * (roiReturn / 100)) / 12;
    const totalReturn = monthlyReturn * roiTimeframe;
    const totalValue = roiInvestment + totalReturn;
    const roiPercentage = ((totalReturn / roiInvestment) * 100).toFixed(1);
    return { totalReturn, totalValue, roiPercentage, monthlyReturn };
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Solar Installation Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop)',
              opacity: 0.15
            }}
          ></div>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        </div>
        
        {/* Animated background with grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-solar-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-solar-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sun className="text-white w-6 h-6 fill-white" />
              </div>
              <span className="text-2xl font-extrabold text-white">SolarCareer<span className="text-electric-400">.Pro</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
              <a href="#stats" className="hover:text-white transition">Stats</a>
              <a href="#portfolio" className="hover:text-white transition">Portfolio</a>
              <a href="#roi-calculator" className="hover:text-white transition">ROI</a>
              <a href="#features" className="hover:text-white transition">Features</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Career Transformation Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up">
              Transform Your Career in
              <span className="block relative">
                <span 
                  className="inline-block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 40px rgba(251, 146, 60, 0.6)) drop-shadow(0 0 60px rgba(251, 146, 60, 0.4))',
                    animation: 'glow-pulse 2s ease-in-out infinite alternate, gradient 3s ease infinite'
                  }}
                >
                  Solar Energy
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The complete operating system for your solar career journey. Track certifications, manage finances, and accelerate your growth with AI-powered insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="group relative px-8 py-4 bg-gradient-to-r from-electric-500 to-electric-600 text-white font-bold rounded-xl shadow-2xl shadow-electric-500/50 hover:shadow-electric-500/70 hover:scale-105 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-electric-400 to-electric-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                    <span className="relative z-10">Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="relative z-10">Get Started Free</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <a 
                href="#stats"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                View Stats
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-red-300 mb-1">Authentication Error</p>
                    <p className="text-xs text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-white/50 rotate-90" />
        </div>
      </section>

      {/* Stats Section with Charts */}
      <section id="stats" ref={statsRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Real Results, Real Growth
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how SolarCareer.Pro users accelerate their careers
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900">3.2x</span>
              </div>
              <p className="text-slate-600 font-medium">Faster Career Growth</p>
              <p className="text-sm text-slate-400 mt-1">vs traditional methods</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900">85%</span>
              </div>
              <p className="text-slate-600 font-medium">Certification Success</p>
              <p className="text-sm text-slate-400 mt-1">NABCEP pass rate</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900">$48K</span>
              </div>
              <p className="text-slate-600 font-medium">Avg. Income Increase</p>
              <p className="text-sm text-slate-400 mt-1">In first 6 months</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900">2.5K+</span>
              </div>
              <p className="text-slate-600 font-medium">Active Professionals</p>
              <p className="text-sm text-slate-400 mt-1">Growing daily</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Career Growth Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Career Growth Trajectory</h3>
                  <p className="text-slate-600">6-month progress tracking</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={careerGrowthData}>
                  <defs>
                    <linearGradient id="colorCertifications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="certifications" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCertifications)" name="Certifications" />
                  <Area type="monotone" dataKey="projects" stroke="#F59E0B" fillOpacity={1} fill="url(#colorProjects)" name="Projects" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Certification Distribution */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Certification Distribution</h3>
                  <p className="text-slate-600">Popular NABCEP paths</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={certificationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {certificationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* ROI Comparison */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">ROI Comparison</h3>
                  <p className="text-slate-600">Career growth vs traditional methods</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="traditional" fill="#94a3b8" name="Traditional Path" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="solarcareer" fill="#3B82F6" name="SolarCareer.Pro" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real projects delivering real results in the solar energy industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Freedom Solar + Project Dashboard - Featured */}
            <div className="md:col-span-2 group">
              <a 
                href="https://solarsales.pro/projectdashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-electric-600 to-blue-700 rounded-2xl p-8 text-white h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-electric-200 uppercase tracking-wider">Featured Project</span>
                        <h3 className="text-2xl font-extrabold">Freedom Solar</h3>
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold mb-4">Project Dashboard</h4>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      Comprehensive project management dashboard for solar sales operations. Track leads, manage installations, and optimize sales pipeline with real-time analytics.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">Sales Management</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">Analytics</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">CRM</span>
                    </div>
                    <div className="flex items-center gap-2 text-electric-200 font-semibold group-hover:gap-4 transition-all">
                      <span>View Project</span>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Bullet Energy */}
            <div className="group">
              <a 
                href="https://bulletenergy.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-solar-500 to-orange-600 rounded-2xl p-8 text-white h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-4">Bullet Energy</h3>
                    <p className="text-orange-100 mb-6 leading-relaxed text-sm">
                      High-performance energy solutions platform with advanced analytics and customer management.
                    </p>
                    <div className="flex items-center gap-2 text-orange-200 font-semibold group-hover:gap-4 transition-all">
                      <span>Visit Site</span>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* SPS */}
            <div className="group">
              <a 
                href="https://sps.ainx.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-24 -mt-24"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-4">SPS Platform</h3>
                    <p className="text-purple-100 mb-6 leading-relaxed text-sm">
                      Solar project management system with integrated workflow automation and team collaboration tools.
                    </p>
                    <div className="flex items-center gap-2 text-purple-200 font-semibold group-hover:gap-4 transition-all">
                      <span>Explore Platform</span>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Protection & ROI Calculator Section */}
      <section id="roi-calculator" ref={calculatorRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Investment Protection
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Calculate your potential return on investment and see how we protect your capital
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* ROI Calculator */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">ROI Calculator</h3>
                </div>

                <div className="space-y-6">
                  {/* Investment Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Investment Amount
                    </label>
                    <div className="relative">
                      <DollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={roiInvestment}
                        onChange={(e) => setRoiInvestment(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-500"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  {/* Annual Return Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={roiReturn}
                        onChange={(e) => setRoiReturn(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-500"
                        placeholder="15"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Timeframe (Months)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={roiTimeframe}
                        onChange={(e) => setRoiTimeframe(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-500"
                        placeholder="12"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-electric-600 to-blue-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Projected Returns</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-200">Total Return</span>
                      <TrendingUp className="w-5 h-5 text-green-300" />
                    </div>
                    <p className="text-3xl font-extrabold">${roi.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-200">Total Value</span>
                      <DollarIcon className="w-5 h-5 text-green-300" />
                    </div>
                    <p className="text-3xl font-extrabold">${roi.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-200">ROI Percentage</span>
                      <Percent className="w-5 h-5 text-green-300" />
                    </div>
                    <p className="text-3xl font-extrabold">{roi.roiPercentage}%</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-200">Monthly Return</span>
                      <BarChart3 className="w-5 h-5 text-green-300" />
                    </div>
                    <p className="text-3xl font-extrabold">${roi.monthlyReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection Features */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Lock className="w-8 h-8 text-electric-400 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Capital Protection</h4>
                <p className="text-slate-300 text-sm">Your principal investment is protected through diversified strategies and risk management.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Transparent Reporting</h4>
                <p className="text-slate-300 text-sm">Real-time tracking and detailed reports on all investments and returns.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <TrendingUp className="w-8 h-8 text-solar-400 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Proven Track Record</h4>
                <p className="text-slate-300 text-sm">Consistent returns across multiple projects with documented success metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A comprehensive platform designed specifically for solar career professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature cards */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-electric-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-electric-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Certification Tracker</h3>
              <p className="text-slate-600 mb-4">
                Track your NABCEP certifications with progress monitoring, practice exam scores, and milestone tracking.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Progress tracking & analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Practice exam scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>GPS-verified field hours</span>
                </li>
              </ul>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Career Coach</h3>
              <p className="text-slate-600 mb-4">
                Get personalized career guidance, study plans, and strategic advice powered by advanced AI.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Personalized study plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Career strategy insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Performance analysis</span>
                </li>
              </ul>
        </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Financial Management</h3>
              <p className="text-slate-600 mb-4">
                Track expenses, manage investors, analyze financial health, and optimize your runway.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Expense tracking & analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Investor CRM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Financial health scoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-electric-600 via-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join professionals who are accelerating their solar careers with AI-powered insights and comprehensive tracking.
          </p>
             <button 
               onClick={handleLogin}
               disabled={isLoggingIn}
            className="px-10 py-5 bg-white text-electric-600 font-bold rounded-xl shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connecting...</span>
              </>
               ) : (
              <>
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </>
               )}
             </button>
          <p className="mt-6 text-blue-200 text-sm">
            <ShieldCheck className="w-4 h-4 inline mr-2" />
            Free to start • No credit card required • Secure & Private
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-solar-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Sun className="text-white w-5 h-5 fill-white" />
              </div>
              <span className="text-lg font-bold text-white">SolarCareer<span className="text-electric-400">.Pro</span></span>
            </div>
            <p className="text-sm">
              © 2025 SolarCareer.Pro - Mission Control for Your Solar Career
             </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        @keyframes glow-pulse {
          0% {
            filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.8)) 
                    drop-shadow(0 0 40px rgba(251, 146, 60, 0.6)) 
                    drop-shadow(0 0 60px rgba(251, 146, 60, 0.4))
                    drop-shadow(0 0 80px rgba(234, 179, 8, 0.3));
            text-shadow: 0 0 20px rgba(251, 146, 60, 0.8),
                         0 0 40px rgba(251, 146, 60, 0.6),
                         0 0 60px rgba(234, 179, 8, 0.4);
          }
          100% {
            filter: drop-shadow(0 0 30px rgba(251, 146, 60, 1)) 
                    drop-shadow(0 0 60px rgba(251, 146, 60, 0.8)) 
                    drop-shadow(0 0 90px rgba(251, 146, 60, 0.6))
                    drop-shadow(0 0 120px rgba(234, 179, 8, 0.5));
            text-shadow: 0 0 30px rgba(251, 146, 60, 1),
                         0 0 60px rgba(251, 146, 60, 0.8),
                         0 0 90px rgba(234, 179, 8, 0.6);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};
