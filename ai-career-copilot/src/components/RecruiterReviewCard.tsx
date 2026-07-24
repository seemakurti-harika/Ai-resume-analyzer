import React from 'react';
import { RecruiterReview } from '../types';
import { UserCheck, Award, AlertTriangle, MessageSquare, Gauge } from 'lucide-react';

interface RecruiterReviewCardProps {
  review: RecruiterReview;
  company?: string;
}

export const RecruiterReviewCard: React.FC<RecruiterReviewCardProps> = ({ review, company }) => {
  if (!review) return null;

  let decisionBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (review.hiring_decision === 'Unlikely Shortlist') {
    decisionBadge = 'bg-rose-100 text-rose-800 border-rose-300';
  } else if (review.hiring_decision === 'Consider with Reservation') {
    decisionBadge = 'bg-amber-100 text-amber-800 border-amber-300';
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-lg space-y-6 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">
              Executive Recruiter Assessment
            </h3>
            <p className="text-xs text-slate-400">
              Simulated screening evaluation for {company || 'Target Employer'}
            </p>
          </div>
        </div>

        {/* Hiring Decision Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Recruiter Verdict
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Shortlist Odds: {review.shortlisting_probability}%
            </span>
          </div>
          <div
            className={`px-4 py-2 rounded-xl text-sm font-black tracking-wide border shadow-sm ${decisionBadge}`}
          >
            {review.hiring_decision}
          </div>
        </div>
      </div>

      {/* Shortlist Odds Progress Meter */}
      <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-blue-400" />
            Interview Shortlist Probability
          </span>
          <span className="text-blue-400 font-bold text-sm">
            {review.shortlisting_probability}% Match Rate
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-1000 rounded-full"
            style={{ width: `${review.shortlisting_probability}%` }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Key Strengths Recruiter Loves */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            What Impresses the Hiring Manager
          </h4>
          <ul className="space-y-2">
            {(review.strengths || []).map((s, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks & Red Flags */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Recruiter Hesitations & Hiring Risks
          </h4>
          <ul className="space-y-2">
            {(review.hiring_risks || review.weaknesses || []).map((r, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recruiter Commentary Quote */}
      {review.comment && (
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Senior Recruiter Internal Note:</span>
          </div>
          <p className="text-xs text-slate-200 italic leading-relaxed pl-6">
            "{review.comment}"
          </p>
        </div>
      )}
    </div>
  );
};
