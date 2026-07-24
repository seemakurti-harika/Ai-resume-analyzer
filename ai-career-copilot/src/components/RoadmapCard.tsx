import React, { useState } from 'react';
import { LearningRoadmap, RoadmapWeek } from '../types';
import { Calendar, CheckSquare, Square, BookOpen, Code, Video, Globe, Award, Sparkles } from 'lucide-react';

interface RoadmapCardProps {
  roadmap: LearningRoadmap;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  if (!roadmap || !roadmap.weeks || roadmap.weeks.length === 0) return null;

  const currentWeekData: RoadmapWeek =
    roadmap.weeks.find((w) => w.week === activeWeek) || roadmap.weeks[0];

  const toggleItem = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Calculate progress
  let totalTasks = 0;
  let completedCount = 0;
  roadmap.weeks.forEach((w) => {
    const items = [
      ...w.courses,
      ...w.projects,
      ...w.books,
      ...w.youtube,
      ...w.practice,
    ];
    totalTasks += items.length;
    items.forEach((item, idx) => {
      if (completedItems[`w${w.week}_${idx}`]) {
        completedCount++;
      }
    });
  });

  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Personalized 4-Week Skill Upskilling Roadmap
            </h3>
            <p className="text-xs text-slate-500">
              Estimated Completion: <span className="font-semibold text-blue-600">{roadmap.completion_time || '4 Weeks'}</span>
            </p>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Roadmap Progress
            </span>
            <span className="text-xs font-extrabold text-blue-600">{progressPercent}% Completed</span>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="18" className="stroke-slate-200" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                className="stroke-blue-600 transition-all duration-500"
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 - (progressPercent / 100) * (2 * Math.PI * 18)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <Sparkles className="w-4 h-4 text-amber-500 absolute" />
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {roadmap.weeks.map((w) => {
          const isActive = w.week === activeWeek;
          return (
            <button
              key={w.week}
              onClick={() => setActiveWeek(w.week)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <span>Week {w.week}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {w.theme?.split(' ')[0] || 'Focus'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Week Theme Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
            Week {currentWeekData.week} Master Goal:
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-0.5">{currentWeekData.theme}</h4>
        </div>
        <Award className="w-8 h-8 text-blue-500 opacity-80" />
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Courses */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            Recommended Courses & Tutorials
          </h5>
          <div className="space-y-2">
            {(currentWeekData.courses || []).map((course, idx) => {
              const id = `w${currentWeekData.week}_c_${idx}`;
              const isChecked = !!completedItems[id];
              return (
                <div
                  key={idx}
                  onClick={() => toggleItem(id)}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/60 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                    {course}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practical Projects */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-600" />
            Portfolio Project Milestones
          </h5>
          <div className="space-y-2">
            {(currentWeekData.projects || []).map((proj, idx) => {
              const id = `w${currentWeekData.week}_p_${idx}`;
              const isChecked = !!completedItems[id];
              return (
                <div
                  key={idx}
                  onClick={() => toggleItem(id)}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/60 hover:border-indigo-300 transition-colors cursor-pointer"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                    {proj}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Books & Reading */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Books & Core Whitepapers
          </h5>
          <div className="space-y-2">
            {(currentWeekData.books || []).map((book, idx) => {
              const id = `w${currentWeekData.week}_b_${idx}`;
              const isChecked = !!completedItems[id];
              return (
                <div
                  key={idx}
                  onClick={() => toggleItem(id)}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/60 hover:border-amber-300 transition-colors cursor-pointer"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                    {book}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* YouTube & Video Topics */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-600" />
            YouTube Search Keywords & Deep Dives
          </h5>
          <div className="space-y-2">
            {(currentWeekData.youtube || []).map((yt, idx) => {
              const id = `w${currentWeekData.week}_y_${idx}`;
              const isChecked = !!completedItems[id];
              return (
                <div
                  key={idx}
                  onClick={() => toggleItem(id)}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/60 hover:border-rose-300 transition-colors cursor-pointer"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                    "{yt}"
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
