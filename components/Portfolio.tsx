import React from 'react';
import { ExternalLink, Server, Cpu, BarChart3, Layout, Users, CheckCircle2, ArrowRight, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  company: string;
  role: string;
  url: string;
  dashboardUrl?: string;
  timeline: string;
  description: string;
  techStack: string[];
  impact: string[];
  color: string;
}

export const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'bullet',
      name: 'Solar Operations Platform',
      company: 'Bullet Energy',
      role: 'Lead Developer & Solar Operations Architect',
      url: 'https://bulletenergy.pro',
      timeline: '2024-2025',
      description: 'A complete solar sales proposal system with automated ROI calculation, CRM, and project pipeline tracking. Designed to streamline the residential solar installation process from lead to contract.',
      techStack: ['AI Automation', 'Real-time Data', 'CRM Workflows', 'Financial Modeling'],
      impact: [
        'Reduced proposal generation time from 2 hours to 15 mins',
        'Enabled sales team to handle 3x more leads',
        'Improved customer satisfaction through transparency'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'sunpeach',
      name: 'Sales & Operations System',
      company: 'Sunpeach Solar',
      role: 'Technical Lead & Operations Specialist',
      url: 'https://sps.ainx.pro',
      timeline: '2024-2025',
      description: 'Advanced CRM with AI-powered lead qualification, system design calculation tools, and automated installation scheduling. Serves as the central nervous system for daily operations.',
      techStack: ['Full-stack Web App', 'Automated Workflows', 'API Integrations', 'System Design'],
      impact: [
        'Reduced customer acquisition costs by 40%',
        'Improved installation scheduling efficiency',
        'Enhanced customer communication with 24/7 automation'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'freedom',
      name: 'Solar Sales Pro Dashboard',
      company: 'Freedom Solar / Solar Sales Pro',
      role: 'Solar Sales Automation Architect',
      url: 'https://solarsales.pro',
      dashboardUrl: 'https://solarsales.pro/projectdashboard',
      timeline: '2024-2025',
      description: 'A comprehensive operational dashboard for tracking solar sales performance, project statuses, and team metrics. Provides real-time visibility into the health of the solar pipeline.',
      techStack: ['Dashboard Analytics', 'Real-time Monitoring', 'Team Management', 'Performance Tracking'],
      impact: [
        'Centralized project tracking for distributed teams',
        'Real-time visualization of sales pipeline health',
        'Data-driven decision making for sales leadership'
      ],
      color: 'from-blue-600 to-indigo-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/20">
              Proven Experience
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Solar Project Portfolio</h1>
          <p className="text-slate-300 max-w-3xl">
            Before seeking investment, I have already worked with <strong className="text-white">THREE major solar companies</strong>, 
            building operational systems that demonstrate real capability in the solar industry.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Visual Side (Left) */}
            <div className={`lg:w-1/3 bg-gradient-to-br ${project.color} p-8 text-white flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-2 opacity-90 mb-1">
                  <Server className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.company}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                <p className="text-white/80 text-sm">{project.role}</p>
                <div className="mt-2 inline-block bg-white/20 px-2 py-1 rounded text-xs font-mono">
                  {project.timeline}
                </div>
              </div>

              <div className="mt-8">
                 <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <Layout className="w-8 h-8 mb-3 text-white/90" />
                    <div className="h-2 w-2/3 bg-white/30 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-white/30 rounded"></div>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                 <div className="flex flex-wrap gap-2">
                   {project.techStack.map((tech, i) => (
                     <span key={i} className="text-[10px] uppercase font-bold bg-black/20 px-2 py-1 rounded text-white/90">
                       {tech}
                     </span>
                   ))}
                 </div>
              </div>
            </div>

            {/* Content Side (Right) */}
            <div className="lg:w-2/3 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Project Overview</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-electric-600" /> Business Impact
              </h4>
              <ul className="space-y-3 mb-8">
                {project.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium"
                >
                  <Globe className="w-4 h-4" /> Visit Live Platform
                </a>
                {project.dashboardUrl && (
                  <a 
                    href={project.dashboardUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  >
                    <Layout className="w-4 h-4" /> View Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};