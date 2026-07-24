import React from 'react';
import { InterviewTopic } from '../types';
import { Link } from 'react-router-dom';
import { MessageSquareCode, Bot, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface InterviewTopicsCardProps {
  topics: InterviewTopic[];
  resumeText?: string;
  jobDescription?: string;
  company?: string;
}

export const InterviewTopicsCard: React.FC<InterviewTopicsCardProps> = ({
  topics,
  resumeText,
  jobDescription,
  company,
}) => {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
            <MessageSquareCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Expected Interview Topics & Scenarios
            </h3>
            <p className="text-xs text-slate-500">
              Questions derived directly from your resume bullets & target role
            </p>
          </div>
        </div>

        <Link
          to="/interview"
          state={{ resumeText, jobDescription, company }}
          className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
        >
          <Bot className="w-4 h-4 text-purple-200" />
          <span>Launch AI Mock Interview</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Question Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topics.map((item, idx) => {
          let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
          if (item.type === 'System Design') {
            badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
          } else if (item.type === 'Behavioral') {
            badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          } else if (item.type === 'HR') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
          }

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{item.topic}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {item.type}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Sample Question:
                  </span>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{item.sample_question}"
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Practice in Simulator
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
