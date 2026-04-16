import React from 'react';
import {
  Sparkles, Zap, Shield, BarChart3, ArrowRight,
  Brain, FileSearch, MessageSquare, ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onEnter: () => void;
}

const features = [
  {
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.3)',
    title: 'AI-Powered Analysis',
    desc: 'Gemini LLM reads every resume deeply — no keyword matching, real semantic understanding.',
  },
  {
    icon: BarChart3,
    color: 'from-sky-500 to-cyan-500',
    glow: 'rgba(14,165,233,0.3)',
    title: 'Smart Ranking',
    desc: 'Candidates ordered by fit score so you always know who to interview first.',
  },
  {
    icon: FileSearch,
    color: 'from-indigo-500 to-blue-600',
    glow: 'rgba(99,102,241,0.3)',
    title: 'PDF Resume Parsing',
    desc: 'Upload multiple PDFs at once. We extract, clean and analyse every page instantly.',
  },
  {
    icon: MessageSquare,
    color: 'from-fuchsia-500 to-pink-600',
    glow: 'rgba(217,70,239,0.3)',
    title: 'Interactive Chat',
    desc: 'Ask anything about the shortlisted candidates — our AI answers in seconds.',
  },
];

const stats = [
  { value: '10×', label: 'Faster Screening' },
  { value: '95%', label: 'Accuracy' },
  { value: '∞',   label: 'Resumes / Run' },
];

const HomePage: React.FC<HomePageProps> = ({ onEnter }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] grid-bg flex flex-col">

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-700/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-700/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-16 border-b border-white/5 bg-[#020617]/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse-glow">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">RecruitAI</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live — Powered by Gemini
          </span>
          <button
            onClick={onEnter}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/20"
          >
            Launch App <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* ── Main content (no scroll) ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-0">

        {/* Hero badge */}
        <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
          <Zap size={13} className="text-amber-400" />
          <span className="text-xs font-semibold text-slate-300 tracking-wide">AI Resume Screener — v1.0</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-200 max-w-3xl text-center font-extrabold leading-none tracking-tight text-4xl sm:text-5xl md:text-6xl text-white mb-4" style={{fontFamily:'Space Grotesk, sans-serif'}}>
          Hire Smarter with{' '}
          <span className="gradient-text">AI-Powered</span>
          <br />Resume Intelligence
        </h1>

        {/* Sub */}
        <p className="animate-fade-in-up delay-300 max-w-xl text-center text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          Upload resumes, paste a job description, and let Gemini AI rank, score, and explain every candidate — in seconds.
        </p>

        {/* Stats row */}
        <div className="animate-fade-in-up delay-400 flex items-center gap-6 sm:gap-10 mb-7">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={onEnter}
            className="btn-shimmer text-white font-bold text-sm px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-2xl"
          >
            <Sparkles size={18} />
            Start Screening Resumes
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        {/* Feature cards — horizontal row on desktop */}
        <div className="animate-fade-in-up delay-600 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, color, glow, title, desc }) => (
            <div
              key={title}
              className="feature-card glass-card rounded-2xl p-4 flex flex-col gap-2 cursor-default"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-1`}
                style={{ boxShadow: `0 4px 20px ${glow}` }}
              >
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-white text-xs font-bold leading-tight">{title}</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 flex items-center justify-center gap-2 py-3 border-t border-white/5 text-[11px] text-slate-600">
        <Shield size={12} />
        <span>Your data never leaves your session.</span>
        <span className="mx-2 opacity-30">|</span>
        <span>Built with FastAPI · Gemini · React</span>
      </footer>
    </div>
  );
};

export default HomePage;
