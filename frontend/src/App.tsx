import React, { useState } from 'react';
import axios from 'axios';
import {
  FileUp, Upload, FileText, Trash2, Play, Loader2,
  LayoutDashboard, MessageSquare, History, Info, ArrowLeft, Sparkles
} from 'lucide-react';
import { CandidateCard } from './components/CandidateCard';
import { ChatPanel }    from './components/ChatPanel';
import HomePage         from './components/HomePage';

type View = 'home' | 'app';

function App() {
  const [view, setView]         = useState<View>('home');
  const [jd, setJd]             = useState('');
  const [files, setFiles]       = useState<File[]>([]);
  const [results, setResults]   = useState<any[]>([]);
  const [loading, setLoading]   = useState(false);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'chat'>('leaderboard');

  // ─── File handlers ───────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };
  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  // ─── Screen handler ──────────────────────────────────────────────────
  const handleScreen = async () => {
    if (!jd || files.length === 0) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('jd', jd);
    files.forEach(file => formData.append('files', file));

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data);
      setActiveTab('leaderboard');
    } catch (error) {
      console.error('Screening failed:', error);
      alert('Error during screening. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // ─── HOME PAGE ────────────────────────────────────────────────────────
  if (view === 'home') {
    return <HomePage onEnter={() => setView('app')} />;
  }

  // ─── APP PAGE ─────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] flex flex-col page-enter selection:bg-indigo-500/30">

      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-700/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 shrink-0 flex items-center justify-between px-4 sm:px-6 h-14 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        {/* Left: back + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('home')}
            className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            title="Back to Home"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow shadow-indigo-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-black tracking-tight gradient-text leading-none">RecruitAI</h1>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Smart Screen v1.0</p>
          </div>
        </div>

        {/* Right: tabs */}
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={14} />
            <span className="hidden sm:inline">Rankings</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            disabled={results.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              activeTab === 'chat'
                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <MessageSquare size={14} />
            <span className="hidden sm:inline">AI Chat</span>
          </button>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="relative z-10 flex-1 flex overflow-hidden">

        {/* ── Left Panel: Inputs ── */}
        <aside className="w-72 lg:w-80 shrink-0 flex flex-col border-r border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">

            {/* Job Description */}
            <div className="glass-card rounded-2xl p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={15} className="text-indigo-400" /> Job Description
              </h2>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full h-36 bg-slate-950/60 border border-slate-700/50 rounded-xl p-3 text-xs text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600 resize-none"
              />
            </div>

            {/* Resume Upload */}
            <div className="glass-card rounded-2xl p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload size={15} className="text-indigo-400" /> Resumes
              </h2>
              <div className="relative group">
                <input
                  type="file"
                  id="resume-upload"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-700 group-hover:border-indigo-500/60 group-hover:bg-indigo-500/5 rounded-xl p-5 transition-all text-center">
                  <FileUp size={24} className="mx-auto text-slate-500 group-hover:text-indigo-400 mb-2 transition-colors" />
                  <p className="text-xs font-medium text-slate-400">Drop PDFs or click</p>
                  <p className="text-[10px] text-slate-600 mt-0.5 uppercase font-bold tracking-widest">Multiple supported</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded bg-rose-500/10 flex items-center justify-center shrink-0">
                          <FileText size={12} className="text-rose-400" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-300 truncate">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(idx)} className="text-slate-600 hover:text-rose-400 transition-colors p-1">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Run button */}
            <button
              onClick={handleScreen}
              disabled={loading || !jd || files.length === 0}
              className="w-full btn-shimmer disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2 group text-sm"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={17} /><span>Analysing...</span></>
              ) : (
                <><Play size={17} className="fill-current group-hover:scale-110 transition-transform" /><span>Start AI Screening</span></>
              )}
            </button>

            {/* Tip */}
            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex gap-2 text-indigo-300/50">
              <Info size={13} className="shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium leading-relaxed">Results are ranked by AI fit score. First request may take ~30s on free tier.</p>
            </div>
          </div>
        </aside>

        {/* ── Right Panel: Results ── */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'leaderboard' ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {results.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-slate-800 rounded-3xl border-dashed bg-slate-900/20">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-5">
                    <History size={32} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-400">No Results Yet</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs">Paste a job description, upload at least one resume, and hit "Start AI Screening".</p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <LayoutDashboard size={16} className="text-indigo-400" />
                      Ranked Candidates <span className="text-slate-500 font-normal text-sm">({results.length})</span>
                    </h2>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />High</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Mid</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />Low</span>
                    </div>
                  </div>
                  {results.map((candidate, idx) => (
                    <CandidateCard key={idx} candidate={candidate} isTop={idx === 0} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-hidden p-4 sm:p-6">
              <ChatPanel candidates={results} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
