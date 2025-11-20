
import React, { useRef, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Download, Upload, Database, Trash2, CheckCircle2, AlertTriangle, HardDrive, Cloud, Link as LinkIcon, RefreshCw, ExternalLink, Server } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const { data, updateData, exportDatabase, importDatabase, resetDatabase } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Cloud Form State
  const [externalUrl, setExternalUrl] = useState(data.syncSettings?.externalAppUrl || '');
  const [apiKey, setApiKey] = useState(data.syncSettings?.firebaseConfig?.apiKey || '');
  const [projectId, setProjectId] = useState(data.syncSettings?.firebaseConfig?.projectId || '');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const success = await importDatabase(e.target.files[0]);
      setUploadStatus(success ? 'success' : 'error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleSaveCloudConfig = () => {
    updateData({
        syncSettings: {
            ...data.syncSettings,
            externalAppUrl: externalUrl,
            firebaseConfig: {
                apiKey,
                projectId,
                authDomain: `${projectId}.firebaseapp.com`,
                storageBucket: `${projectId}.appspot.com`
            },
            isConnected: !!apiKey && !!projectId
        }
    });
    alert("Cloud configuration saved. If these credentials match the external app, data will sync.");
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Data & Sync Center</h1>
            <p className="text-slate-300">
                Manage local backups or configure cloud synchronization with the SolarDrive ecosystem.
            </p>
         </div>
         
         <div className="flex gap-2 mt-6">
            <button 
                onClick={() => setActiveTab('local')}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${activeTab === 'local' ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                <HardDrive className="w-4 h-4" /> Local Backup
            </button>
            <button 
                onClick={() => setActiveTab('cloud')}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${activeTab === 'cloud' ? 'bg-electric-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                <Cloud className="w-4 h-4" /> Cloud Connect
            </button>
         </div>
      </div>

      {activeTab === 'local' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Local Status */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-electric-600" /> Local Storage Status
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <div className="font-bold text-green-800">System Active</div>
                            <div className="text-xs text-green-600">Auto-saving to browser storage</div>
                        </div>
                    </div>
                    <div className="text-sm text-slate-600">
                        <p className="mb-2"><strong>Last Saved:</strong> {new Date(data.lastSaved).toLocaleString()}</p>
                        <p className="mb-1"><strong>Database Size:</strong> {(JSON.stringify(data).length / 1024).toFixed(2)} KB</p>
                        <p><strong>Records:</strong> {data.investors.length} Investors, {data.journal.length} Journals</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-solar-500" /> Actions
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                        Download a .json file of your entire profile. You can save this file to Google Drive for safekeeping.
                    </p>
                </div>
                
                <div className="space-y-3">
                    <button 
                        onClick={exportDatabase}
                        className="w-full py-3 bg-electric-600 hover:bg-electric-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-md"
                    >
                        <Download className="w-4 h-4" /> Export Backup (.json)
                    </button>

                    <div className="relative">
                        <input 
                            type="file" 
                            accept=".json" 
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                        >
                            <Upload className="w-4 h-4" /> Import Backup
                        </button>
                        {uploadStatus === 'success' && (
                            <div className="absolute top-0 left-0 w-full h-full bg-green-500 text-white rounded-lg flex items-center justify-center font-bold animate-fade-in">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Imported!
                            </div>
                        )}
                        {uploadStatus === 'error' && (
                            <div className="absolute top-0 left-0 w-full h-full bg-red-500 text-white rounded-lg flex items-center justify-center font-bold animate-fade-in">
                                <AlertTriangle className="w-4 h-4 mr-2" /> Invalid File
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={resetDatabase}
                        className="w-full py-2 text-xs text-red-500 hover:text-red-700 hover:underline mt-4"
                    >
                        Reset / Wipe Data
                    </button>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'cloud' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-electric-600" /> External App Connection
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                    Connect this Mission Control dashboard to your external storage or ancillary apps.
                </p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">365Transform URL</label>
                        <input 
                            type="text"
                            value={externalUrl}
                            onChange={(e) => setExternalUrl(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-electric-500 outline-none"
                            placeholder="https://ai-powered-life-transformation..."
                        />
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 flex gap-3">
                        <ExternalLink className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                            <strong>Quick Access:</strong> Saving this URL enables the "365Transform" shortcut in the main sidebar navigation.
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-orange-500" /> Firebase Cloud Sync
                </h3>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg mb-4 text-xs text-orange-800">
                    <strong>Bridge Protocol:</strong> To sync data with the external Drive app, both apps must share the same Firebase Project credentials.
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firebase Project ID</label>
                        <input 
                            type="text"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                            placeholder="e.g. solar-career-prod"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">API Key</label>
                        <input 
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                            placeholder="AIzaSy..."
                        />
                    </div>

                    <button 
                        onClick={handleSaveCloudConfig}
                        className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                    >
                        <RefreshCw className="w-4 h-4" /> Save & Initialize Sync
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
