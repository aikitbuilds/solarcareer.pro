
import React, { useState } from 'react';
import { ExternalLink, Server, Cpu, BarChart3, Layout, Users, CheckCircle2, ArrowRight, Globe, Layers, Zap, Database, ChevronLeft, ChevronRight, RotateCw, ImageIcon } from 'lucide-react';

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
  fallbackImage: string;
  screenshotUrl?: string; // New optional field to force a specific image
}

export const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'bullet',
      name: 'Solar Operations Platform',
      company: 'Bullet Energy',
      role: 'Lead Developer & Solar Ops Architect',
      url: 'https://bulletenergy.pro',
      timeline: '2024-2025',
      description: 'A unified proposal automation engine that resolved fragmented sales workflows. By integrating real-time financial modeling with CRM data, I reduced lead-to-contract time from hours to minutes.',
      techStack: ['React', 'Node.js', 'Salesforce API', 'Automated PDFs'],
      impact: [
        'Reduced proposal time: 2 hours → 15 mins',
        'Tripled lead handling capacity per rep',
        'Eliminated pricing errors via auto-calc'
      ],
      color: 'from-orange-500 to-red-600',
      fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop' 
    },
    {
      id: 'traylor',
      name: 'AI Commercial Real Estate Platform',
      company: 'TraylorCRE',
      role: 'Lead Full-Stack Engineer',
      url: 'https://traylorcre.com',
      timeline: '2024-2025',
      description: 'A next-generation commercial real estate platform leveraging AI to analyze market trends and streamline deal flow. Built to aggregate complex property data into actionable insights for investors and brokers.',
      techStack: ['Next.js', 'TypeScript', 'Google Cloud AI', 'PostgreSQL'],
      impact: [
        'Automated property valuation models',
        'Reduced due diligence time by 60%',
        'Integrated real-time market data feeds'
      ],
      color: 'from-indigo-500 to-purple-600',
      fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: 'freedom',
      name: 'Solar Sales Pro - Branding Engine',
      company: 'Solar Sales Pro',
      role: 'Automation Architect',
      url: 'https://go.solarsales.pro/michaeltran',
      dashboardUrl: 'https://solarsales.pro/projectdashboard',
      timeline: '2024-2025',
      description: 'A dual-threat ecosystem: AI-powered personal branding funnels for reps coupled with a backend command center. This platform automates authority building, allowing solar pros to generate 381% more leads and create proposals in under 15 seconds.',
      techStack: ['React', 'Firebase', 'AI Branding', 'Funnel Ops'],
      impact: [
        '381% increase in organic lead generation',
        'Instant 15-second AI proposal creation',
        'Automated personal brand deployment'
      ],
      color: 'from-blue-600 to-cyan-500',
      fallbackImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop'
    },
    {
      id: 'sunpeach',
      name: 'Sales & Ops CRM System',
      company: 'Sunpeach Solar',
      role: 'Technical Lead',
      url: 'https://sps.ainx.pro',
      timeline: '2024-2025',
      description: 'A custom AI-powered CRM designed to handle the specific nuances of solar lead lifecycles. It automated customer communication and scheduling, significantly lowering acquisition costs.',
      techStack: ['Next.js', 'PostgreSQL', 'Twilio API', 'AI Agents'],
      impact: [
        'Cut Customer Acquisition Cost (CAC) by 40%',
        'Automated 80% of initial customer follow-ups',
        'Zero downtime during migration'
      ],
      color: 'from-yellow-500 to-orange-500',
      // Internal tool might be behind login, so we force a high-quality dashboard screenshot here
      screenshotUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop',
      fallbackImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2564&auto=format&fit=crop'
    }
  ];

  // Helper component to handle image loading errors
  const ProjectImage = ({ project }: { project: Project }) => {
    // Use manual screenshot URL if provided, otherwise attempt dynamic generation
    const initialSrc = project.screenshotUrl 
      ? project.screenshotUrl 
      : `https://image.thum.io/get/width/1200/crop/750/noanimate/${project.url}`;
      
    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
      if (!hasError) {
        setImgSrc(project.fallbackImage);
        setHasError(true);
      }
    };

    return (
      <div className="relative w-full h-full">
        <img 
          src={imgSrc} 
          alt={`${project.name} Screenshot`} 
          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-40 group-hover:scale-105 transition duration-700 ease-out"
          onError={handleError}
        />
        {hasError && (
           <div className="absolute bottom-2 right-2 bg-slate-800/80 text-white text-[10px] px-2 py-1 rounded">
             Placeholder
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden border border-slate-800">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-solar-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              <Layers className="w-5 h-5 text-electric-400" />
            </div>
            <span className="text-electric-400 text-sm font-bold uppercase tracking-wider">
              Engineering Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Building the Digital Infrastructure of <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-400 to-electric-400">Solar Energy</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Before seeking investment, I architected and deployed mission-critical systems for three major solar companies. These aren't just concepts—they are live platforms processing millions in revenue.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">Full-Stack Architecture</span>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Automation & AI</span>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Operational Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-32">
        {projects.map((project, index) => (
          <div key={project.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Screenshot / Visual Side */}
            <div className="w-full lg:w-7/12 relative group perspective-1000">
              {/* Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-20 blur-xl rounded-[2rem] group-hover:opacity-30 transition duration-500`}></div>
              
              {/* Browser Window Frame */}
              <div className="relative bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden transform transition duration-500 group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:shadow-electric-500/20">
                {/* Browser Header */}
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-4 border-b border-slate-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex gap-3 text-slate-500">
                     <ChevronLeft className="w-4 h-4 opacity-50" />
                     <ChevronRight className="w-4 h-4 opacity-50" />
                     <RotateCw className="w-3 h-3 opacity-50 mt-0.5" />
                  </div>
                  <div className="flex-1 bg-slate-900/50 px-3 py-1.5 rounded-md text-xs text-slate-400 font-mono text-center truncate border border-slate-700/50 flex items-center justify-center gap-2">
                    <Globe className="w-3 h-3 opacity-50" />
                    {project.url.replace('https://', '')}
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group">
                   <ProjectImage project={project} />
                   
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 hover:scale-105 transition transform shadow-xl"
                      >
                        Visit Live Site <ExternalLink className="w-4 h-4" />
                      </a>
                   </div>

                   {/* Gradient Overlay (always visible slightly) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                   
                   {/* Bottom Label */}
                   <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                      <p className="text-slate-400 text-xs font-mono opacity-0 group-hover:opacity-100 transition delay-100">
                        Click to navigate to {project.company}
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-5/12 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className={`p-2 rounded-lg bg-gradient-to-r ${project.color} shadow-lg`}>
                      <Layout className="w-5 h-5 text-white" />
                   </div>
                   <span className="font-bold text-slate-500 text-sm uppercase tracking-wide">{project.company}</span>
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">{project.name}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                    {project.role}
                  </span>
                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-medium border border-slate-200">
                    {project.timeline}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-200 pl-4">
                {project.description}
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Key Impact
                </h4>
                <ul className="space-y-3">
                  {project.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-electric-200 transition">
                      <span className={`w-2 h-2 rounded-full mt-2 shrink-0 bg-gradient-to-r ${project.color}`}></span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                 <h4 className="font-bold text-slate-400 mb-3 text-xs uppercase tracking-wide">Tech Stack</h4>
                 <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-mono font-bold bg-white text-slate-600 px-3 py-1.5 rounded border border-slate-200 shadow-sm">
                        {tech}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4 pt-2">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 group"
                >
                  Visit Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </a>
                {project.dashboardUrl && (
                  <a 
                    href={project.dashboardUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
                  >
                    <Layout className="w-4 h-4" /> Dashboard
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
