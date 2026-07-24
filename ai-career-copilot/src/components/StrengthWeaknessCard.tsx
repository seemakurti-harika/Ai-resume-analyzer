import React from 'react';
import { StrengthItem, WeaknessItem, SuggestionItem } from '../types';
import { ShieldCheck, AlertOctagon, Lightbulb, ArrowUpRight } from 'lucide-react';

interface StrengthWeaknessCardProps {
  strengths: StrengthItem[];
  weaknesses: WeaknessItem[];
  suggestions: SuggestionItem[];
}

export const StrengthWeaknessCard: React.FC<StrengthWeaknessCardProps> = ({
  strengths,
  weaknesses,
  suggestions,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Key Resume Strengths</h3>
              <p className="text-xs text-slate-500">Standout competitive advantages</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {strengths.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/80 space-y-1">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-3">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Parsing Gaps & Risks</h3>
              <p className="text-xs text-slate-500">Areas where recruiters or ATS may drop score</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {weaknesses.map((w, idx) => {
              const severityColor =
                w.severity === 'high'
                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                  : w.severity === 'medium'
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {w.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityColor}`}
                    >
                      {w.severity || 'medium'} risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actionable Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-white border border-blue-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-blue-100">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Prioritized Action Items for Score Boost
              </h3>
              <p className="text-xs text-slate-500">
                Actionable edits recommended by Gemini AI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {suggestions.map((item, idx) => {
              const impactBg =
                item.impact === 'High'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${impactBg}`}>
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.action}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 pt-2 border-t border-slate-100">
                    <span>Fix in Resume Rewriter</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
