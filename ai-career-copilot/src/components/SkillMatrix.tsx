import React, { useState } from 'react';
import { Check, Plus, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

interface SkillMatrixProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ matchedSkills, missingSkills }) => {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const handleCopySkill = (skill: string) => {
    navigator.clipboard.writeText(skill);
    setCopiedSkill(skill);
    setTimeout(() => setCopiedSkill(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Matched Skills */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Matched Skills ({matchedSkills.length})
              </h3>
              <p className="text-xs text-slate-500">
                Found and successfully parsed in your resume
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            ATS Verified
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {matchedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-800 text-xs font-semibold border border-emerald-200/80 transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{skill}</span>
            </div>
          ))}
          {matchedSkills.length === 0 && (
            <p className="text-xs text-slate-400 italic">No exact matched skills detected.</p>
          )}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Missing Keywords ({missingSkills.length})
              </h3>
              <p className="text-xs text-slate-500">
                Recommended terms to add to boost match rate
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
            Action Needed
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {missingSkills.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => handleCopySkill(skill)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50/80 hover:bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200 transition-colors group cursor-pointer"
              title="Click to copy keyword to clipboard"
            >
              <Plus className="w-3.5 h-3.5 text-rose-600 group-hover:rotate-90 transition-transform" />
              <span>{skill}</span>
              {copiedSkill === skill ? (
                <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>
              ) : (
                <Copy className="w-3 h-3 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              )}
            </button>
          ))}
          {missingSkills.length === 0 && (
            <p className="text-xs text-emerald-600 font-medium">
              Awesome! No critical missing keywords found for this role target.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
