import React from 'react';
import { CareerRecommendation } from '../types';
import { Compass, DollarSign, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';

interface CareerCardProps {
  careers: CareerRecommendation[];
}

export const CareerCard: React.FC<CareerCardProps> = ({ careers }) => {
  if (!careers || careers.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top AI-Recommended Career Pathways
            </h3>
            <p className="text-xs text-slate-500">
              High-growth roles matched to your current technical trajectory
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
          Top {careers.length} Roles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careers.map((c, idx) => {
          const matchColor =
            c.match_percentage >= 90
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : c.match_percentage >= 80
              ? 'bg-blue-100 text-blue-800 border-blue-200'
              : 'bg-indigo-100 text-indigo-800 border-indigo-200';

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-200 hover:shadow-md transition-all space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {c.title}
                  </h4>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${matchColor}`}
                  >
                    {c.match_percentage}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{c.reason}</p>

                {/* Salary & Growth */}
                <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Salary Range:
                    </span>
                    <span className="font-bold text-slate-900">{c.expected_salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Market Growth:
                    </span>
                    <span className="font-bold text-emerald-600">{c.growth}</span>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Skills to Bridge Gap:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(c.skills_needed || []).map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Transition Difficulty: {c.difficulty || 'Moderate'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
