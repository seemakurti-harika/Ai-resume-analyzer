import React from 'react';
import { ScoreBreakdown } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sliders, CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreBreakdownChartProps {
  breakdown: ScoreBreakdown;
}

export const ScoreBreakdownChart: React.FC<ScoreBreakdownChartProps> = ({ breakdown }) => {
  const data = [
    { name: 'Skills Match', score: breakdown.skills, key: 'skills' },
    { name: 'Projects Impact', score: breakdown.projects, key: 'projects' },
    { name: 'Experience', score: breakdown.experience, key: 'experience' },
    { name: 'Education', score: breakdown.education, key: 'education' },
    { name: 'Formatting & ATS', score: breakdown.formatting, key: 'formatting' },
  ];

  const getColor = (val: number) => {
    if (val >= 85) return '#10b981'; // emerald
    if (val >= 70) return '#3b82f6'; // blue
    if (val >= 60) return '#f59e0b'; // amber
    return '#ef4444'; // rose
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <span>ATS Category Score Breakdown</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-factor parsing analysis across 5 key recruitment dimensions
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
            <YAxis type="category" dataKey="name" stroke="#475569" fontSize={12} width={120} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value}% Score`, 'Dimension Match']}
            />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={22}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Numerical Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
        {data.map((item) => {
          const isHigh = item.score >= 80;
          return (
            <div
              key={item.key}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
            >
              <span className="text-[11px] font-medium text-slate-500">{item.name}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-xl font-extrabold text-slate-900">{item.score}%</span>
                {isHigh ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
