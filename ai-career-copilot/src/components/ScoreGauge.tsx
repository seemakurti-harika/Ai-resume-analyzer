import React from 'react';
import { Award, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  verdict: string;
  candidateName?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, verdict, candidateName }) => {
  // Determine color based on score
  let strokeColor = 'stroke-emerald-500';
  let bgGlow = 'from-emerald-500/10 to-teal-500/5';
  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let badgeText = 'ATS Ready (Top 10%)';
  let Icon = CheckCircle2;

  if (score < 60) {
    strokeColor = 'stroke-rose-500';
    bgGlow = 'from-rose-500/10 to-red-500/5';
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
    badgeText = 'Needs Critical Revisions';
    Icon = XCircle;
  } else if (score < 80) {
    strokeColor = 'stroke-amber-500';
    bgGlow = 'from-amber-500/10 to-yellow-500/5';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    badgeText = 'Moderate Alignment';
    Icon = AlertTriangle;
  }

  // Circular gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${bgGlow} bg-white border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6`}>
      {/* Background visual detail */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

      {/* Left Text & Summary */}
      <div className="space-y-3 max-w-lg text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs ${badgeBg}">
          <Icon className="w-3.5 h-3.5" />
          <span>{badgeText}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Overall ATS Match Score
        </h2>

        {candidateName && (
          <p className="text-xs font-medium text-slate-500">
            Analysis for <span className="font-semibold text-slate-700">{candidateName}</span>
          </p>
        )}

        <p className="text-sm text-slate-600 leading-relaxed font-normal bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
          <span className="font-semibold text-slate-800">Verdict:</span> "{verdict}"
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Keyword Density Optimized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Multi-Factor Gemini Audit</span>
          </div>
        </div>
      </div>

      {/* Right Circular Gauge */}
      <div className="relative flex flex-col items-center justify-center shrink-0">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="88"
              cy="88"
              r={radius}
              className="stroke-slate-100"
              strokeWidth="14"
              fill="transparent"
            />
            {/* Animated Score Progress Arc */}
            <circle
              cx="88"
              cy="88"
              r={radius}
              className={`${strokeColor} transition-all duration-1000 ease-out`}
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {score}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider -mt-1">
              / 100 ATS
            </span>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-500 mt-2">
          Target Threshold: 80+ for Interviews
        </span>
      </div>
    </div>
  );
};
