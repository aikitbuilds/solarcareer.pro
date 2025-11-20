
import React, { useState } from 'react';
import { ExternalLink, Layout, ArrowRight, Globe, Layers, Database, ChevronLeft, ChevronRight, RotateCw, BarChart3, Cpu, Zap, PieChart as PieIcon, Activity } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Tooltip, AreaChart, Area, XAxis, CartesianGrid, YAxis } from 'recharts';

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
  screenshotUrl?: string;
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
      screenshotUrl: 'https://file-s3-assets.ai-studio-assets.com/s/321186602917504910/10x-better-deals-screenshot.png',
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
      screenshotUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop',
      fallbackImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2564&auto=format&fit=crop'
    }
  ];

  // --- CHART DATA ---
  const techData = [
    { name: 'React/FE', value: 40, color: '#3B82F6' },
    { name: 'Backend', value: 30, color: '#10B981' },
    { name: 'AI/ML', value: 20, color: '#F59E0B' },
    { name: 'DevOps', value: 10, color: '#8B5CF6' },
  ];

  const impactData = [
    { name: 'Lead Gen', value: 381, fill: '#10B981' },
    { name: 'Speed', value: 95, fill: '#3B82F6' }, // 95% faster
    { name: 'Auto', value: 80, fill: '#F59E0B' }, // 80% automation
  ];

  const scaleData = [
    { month: 'Jan', reqs: 1000 },
    { month: 'Feb', reqs: 5000 },
    { month: 'Mar', reqs: 12000 },
    { month: 'Apr', reqs: 45000 },
    { month: 'May', reqs: 120000 },
  ];

  // Helper component to handle image loading errors
  const ProjectImage = ({ project }: { project: Project }) => {
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
          loading="lazy"
          decoding="async"
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Engineering Portfolio</h2>
          <p className="text-slate-500">Mission-critical digital infrastructure and AI systems.</p>
        </div>
      </div>

      {/* --- MINI DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Chart 1: Tech Ecology */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <PieIcon className="w-4 h-4 text-electric-500" /> Tech Stack Mix
            </h3>
            <div className="h-32 w-full flex gap-4 items-center">
                <div className="flex-1 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={techData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                                {techData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1">
                    {techData.map(d => (
                        <div key={d.name} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Chart 2: Performance Impact */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <BarChart3 className="w-4 h-4 text-green-500" /> System Impact
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impactData}>
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                           {impactData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                % Increase / Efficiency Gain
            </div>
        </div>

        {/* Chart 3: Scale */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Activity className="w-4 h-4 text-purple-500" /> Scale Velocity
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scaleData}>
                        <defs>
                            <linearGradient id="colorScale" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{fontSize: '12px', borderRadius: '8px'}} />
                        <Area type="monotone" dataKey="reqs" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorScale)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center text-xs text-slate-500 mt-2 font-bold">
                Data Points Processed
            </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-32 pt-6">
        {projects.map((project, index) => (
          <div key={project.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Screenshot / Visual Side */}
            <div className="w-full lg:w-7/12 relative group perspective-1000">
              {/* Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-20 blur-xl rounded-[30px] group-hover:opacity-40 transition duration-500`}></div>
              
              {/* Browser Window */}
              <div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 transform transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                {/* Browser Toolbar */}
                <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-3">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="flex gap-3 ml-4 text-slate-500">
                     <ChevronLeft className="w-4 h-4" />
                     <ChevronRight className="w-4 h-4" />
                     <RotateCw className="w-3 h-3" />
                   </div>
                   <div className="flex-1 bg-slate-900 rounded-md h-6 flex items-center px-3 text-[10px] text-slate-500 font-mono mx-2 truncate">
                      {project.url}
                   </div>
                </div>
                
                {/* Image Container */}
                <div className="aspect-video bg-slate-800 relative group-hover:cursor-pointer overflow-hidden">
                   <ProjectImage project={project} />
                   
                   {/* Overlay Action */}
                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center backdrop-blur-sm">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition duration-300 shadow-xl"
                      >
                        <Globe className="w-5 h-5" /> Visit Live Site
                      </a>
                   </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-5/12 space-y-6">
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-lg text-white`}>
                    <Layout className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{project.name}</h3>
                    <p className="text-slate-500 font-medium">{project.company} • {project.timeline}</p>
                  </div>
               </div>

               <div className="prose prose-slate">
                 <p className="text-lg text-slate-600 leading-relaxed">
                   {project.description}
                 </p>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                     <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
                       <Zap className="w-4 h-4 text-yellow-500" /> Key Impact
                     </h4>
                     <ul className="space-y-2">
                       {project.impact.map((item, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                           {item}
                         </li>
                       ))}
                     </ul>
                  </div>
               </div>

               <div className="flex gap-4 pt-2">
                 <a 
                   href={project.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 text-electric-600 font-bold hover:text-electric-800 transition group"
                 >
                   Live Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                 </a>
                 {project.dashboardUrl && (
                    <a 
                      href={project.dashboardUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition group"
                    >
                      <BarChart3 className="w-4 h-4" /> View Dashboard
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
