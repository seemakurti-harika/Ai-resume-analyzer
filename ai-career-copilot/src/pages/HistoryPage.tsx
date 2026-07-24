import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { History, FileText, ArrowRight, Trash2, Calendar, Award } from 'lucide-react';

interface HistoryPageProps {
  history: AnalysisResult[];
  onSelectAnalysis: (analysis: AnalysisResult) => void;
  onClearHistory: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectAnalysis,
  onClearHistory,
}) => {
  const navigate = useNavigate();

  const handleOpen = (item: AnalysisResult) => {
    onSelectAnalysis(item);
    navigate('/results');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-blue-600" />
            Saved Analysis History
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Access previous ATS resume evaluations and recruiter scorecards
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No recent analyses saved yet</p>
          <p className="text-xs text-slate-500">
            Upload your resume on the Analyze page to generate and save your first audit report.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item) => {
            let scoreColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
            if (item.overall_score < 60) {
              scoreColor = 'bg-rose-100 text-rose-800 border-rose-200';
            } else if (item.overall_score < 80) {
              scoreColor = 'bg-amber-100 text-amber-800 border-amber-200';
            }

            return (
              <div
                key={item.id}
                onClick={() => handleOpen(item)}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate max-w-[200px]">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {item.fileName}
                        </h3>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${scoreColor}`}>
                      {item.overall_score}% ATS
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    "{item.verdict}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Award className="w-3.5 h-3.5 text-blue-500" />
                    Target: {item.company || 'General Employer'}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Full Dashboard <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
