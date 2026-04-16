import React, { useState } from 'react';
import axios from 'axios';
import { 
  FileUp, 
  Upload, 
  FileText, 
  Trash2, 
  Play, 
  Loader2, 
  LayoutDashboard, 
  MessageSquare, 
  History,
  Info
} from 'lucide-react';
import { CandidateCard } from './components/CandidateCard';
import { ChatPanel } from './components/ChatPanel';

function App() {
  const [jd, setJd] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'chat'>('leaderboard');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleScreen = async () => {
    if (!jd || files.length === 0) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('jd', jd);
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
      setActiveTab('leaderboard');
    } catch (error) {
      console.error("Screening failed:", error);
      alert("Error during screening. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 font-sans selection:bg-primary-500/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <History className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight gradient-text">RecruitAI</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">Smart Screen v1.0</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'leaderboard' ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={18} /> Comparison
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chat' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
              disabled={results.length === 0}
            >
              <MessageSquare size={18} /> AI Assistant
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl border-white/5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <FileText className="text-primary-400" size={20} /> Job Specification
              </h2>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-48 bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Upload className="text-primary-400" size={20} /> Resumes
              </h2>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-700 group-hover:border-primary-500/50 group-hover:bg-primary-500/5 rounded-xl p-8 transition-all text-center">
                  <FileUp className="mx-auto text-slate-500 group-hover:text-primary-400 mb-2 transition-colors" size={32} />
                  <p className="text-sm font-medium text-slate-400">Drag & drop PDFs or click</p>
                  <p className="text-[10px] text-slate-600 mt-1 uppercase font-bold tracking-widest">Supports multiple files</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 mt-4 max-h-48 overflow-y-auto pr-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 group transition-colors hover:border-white/10">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded bg-rose-500/10 flex items-center justify-center shrink-0">
                          <FileText size={16} className="text-rose-400" />
                        </div>
                        <span className="text-xs font-medium text-slate-300 truncate">{file.name}</span>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleScreen}
              disabled={loading || !jd || files.length === 0}
              className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
                  <span>Start AI Screening</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex gap-3 text-indigo-300/60 leading-tight">
            <Info size={16} className="shrink-0 mt-1" />
            <p className="text-[11px] font-medium">Wait a few seconds for our AI to analyze each resume against your requirements. Results will appear proportionally.</p>
          </div>
        </div>

        {/* Right Column: Display */}
        <div className="lg:col-span-8">
          {activeTab === 'leaderboard' ? (
            <div className="space-y-6">
              {results.length === 0 ? (
                <div className="h-[600px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/20 border border-slate-800 rounded-3xl border-dashed">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <LayoutDashboard size={40} className="text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400">No Candidates Ranked Yet</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm">
                    Enter a job description and upload at least one resume to see the AI analysis here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <LayoutDashboard className="text-primary-400" size={20} /> 
                      Ranked Results ({results.length})
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> High Fit</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Medium</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400"></div> Low Fit</div>
                    </div>
                  </div>
                  {results.map((candidate, idx) => (
                    <CandidateCard 
                      key={idx} 
                      candidate={candidate} 
                      isTop={idx === 0}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[calc(100vh-160px)] min-h-[600px]">
              <ChatPanel candidates={results} />
            </div>
          )}
        </div>
      </main>
      
      {/* Footer backdrop decoration */}
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary-900/10 to-transparent pointer-events-none -z-10"></div>
      <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}

export default App;
