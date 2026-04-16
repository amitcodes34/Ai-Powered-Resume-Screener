import React from 'react';
import { Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CandidateCardProps {
  candidate: {
    name: string;
    score: number;
    summary: string;
    strengths: string[];
    gaps: string[];
    filename: string;
  };
  isTop: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isTop }) => {
  return (
    <div className={cn(
      "glass-card p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in",
      isTop && "ring-2 ring-primary-500 shadow-primary-500/20"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
            {isTop && (
              <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold flex items-center gap-1 border border-primary-500/30">
                <Award size={12} /> Top Match
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-1">{candidate.filename}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className={cn(
            "text-3xl font-black",
            candidate.score >= 80 ? "text-emerald-400" : candidate.score >= 50 ? "text-amber-400" : "text-rose-400"
          )}>
            {candidate.score}%
          </div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Match Score</p>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 leading-relaxed italic">
        "{candidate.summary}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={14} /> Strengths
          </h4>
          <ul className="space-y-1">
            {candidate.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-emerald-500/50 mt-1">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-rose-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={14} /> Gaps
          </h4>
          <ul className="space-y-1">
            {candidate.gaps.slice(0, 2).map((g, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-rose-500/50 mt-1">•</span> {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
