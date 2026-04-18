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
    desc: 'Gemini LLM reads every resume deeply — real semantic understanding.',
  },
  {
    icon: BarChart3,
    color: 'from-sky-500 to-cyan-500',
    glow: 'rgba(14,165,233,0.3)',
    title: 'Smart Ranking',
    desc: 'Candidates ordered by fit score so you always know who to call.',
  },
  {
    icon: FileSearch,
    color: 'from-indigo-500 to-blue-600',
    glow: 'rgba(99,102,241,0.3)',
    title: 'PDF Parsing',
    desc: 'Upload multiple PDFs — we extract every page instantly.',
  },
  {
    icon: MessageSquare,
    color: 'from-fuchsia-500 to-pink-600',
    glow: 'rgba(217,70,239,0.3)',
    title: 'Interactive Chat',
    desc: 'Ask anything about shortlisted candidates in real time.',
  },
];

const stats = [
  { value: '10×', label: 'Faster' },
  { value: '95%', label: 'Accuracy' },
  { value: '∞',   label: 'Resumes' },
];

const HomePage: React.FC<HomePageProps> = ({ onEnter }) => {
  return (
    /*
      On very short phones we allow Y-scroll so nothing is clipped.
      On tall enough screens it stays full-viewport (overflow-hidden).
    */
    <div className="relative w-full min-h-screen bg-[#020617] grid-bg flex flex-col">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-700/20 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-700/20 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-700/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 md:px-12 h-14 sm:h-16 border-b border-white/5 bg-[#020617]/60 backdrop-blur-xl shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse-glow">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight gradient-text">RecruitAI</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Powered by Gemini
          </span>
          <button
            onClick={onEnter}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all px-3 sm:px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/20"
          >
            Launch <ChevronRight size={14} className="hidden sm:inline" />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-0 gap-0">

        {/* Badge */}
        <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-5">
          <Zap size={12} className="text-amber-400" />
          <span className="text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wide">AI Resume Screener — v1.0</span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-200 max-w-2xl text-center font-extrabold leading-none tracking-tight text-white mb-3 sm:mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 7vw, 3.75rem)' }}
        >
          Hire Smarter with{' '}
          <span className="gradient-text">AI-Powered</span>
          <br className="hidden sm:block" />{' '}
          Resume Intelligence
        </h1>

        {/* Sub */}
        <p className="animate-fade-in-up delay-300 max-w-md text-center text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 px-2">
          Upload resumes, paste a job description, and let Gemini AI rank, score, and explain every candidate — in seconds.
        </p>

        {/* Stats */}
        <div className="animate-fade-in-up delay-400 flex items-center gap-5 sm:gap-10 mb-5 sm:mb-7">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-500 mb-6 sm:mb-8 w-full flex justify-center px-4">
          <button
            onClick={onEnter}
            className="btn-shimmer text-white font-bold text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl flex items-center gap-2 shadow-2xl w-full max-w-xs sm:w-auto justify-center active:scale-95 transition-transform"
          >
            <Sparkles size={16} />
            Start Screening Resumes
            <ArrowRight size={15} className="ml-0.5" />
          </button>
        </div>

        {/* Feature cards: 2-col on mobile, 4-col on md+ */}
        <div className="animate-fade-in-up delay-600 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 px-0">
          {features.map(({ icon: Icon, color, glow, title, desc }) => (
            <div
              key={title}
              className="feature-card glass-card rounded-2xl p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 cursor-default"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 4px 20px ${glow}` }}
              >
                <Icon size={16} className="text-white" />
              </div>
              <p className="text-white text-[11px] sm:text-xs font-bold leading-tight mt-1">{title}</p>
              <p className="text-slate-500 text-[10px] sm:text-[11px] leading-relaxed hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-3 border-t border-white/5 text-[10px] sm:text-[11px] text-slate-600 px-4 text-center shrink-0">
        <Shield size={11} />
        <span>Your data never leaves your session.</span>
        <span className="hidden sm:inline mx-1 opacity-30">|</span>
        <span className="hidden sm:inline">Built with FastAPI · Gemini · React</span>
      </footer>
    </div>
  );
};

export default HomePage;
