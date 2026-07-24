import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { ScoreBreakdownChart } from '../components/ScoreBreakdownChart';
import { SkillMatrix } from '../components/SkillMatrix';
import { StrengthWeaknessCard } from '../components/StrengthWeaknessCard';
import { RecruiterReviewCard } from '../components/RecruiterReviewCard';
import { CareerCard } from '../components/CareerCard';
import { RoadmapCard } from '../components/RoadmapCard';
import { InterviewTopicsCard } from '../components/InterviewTopicsCard';

import { Download, FileText, Bot, Sparkles, Award, Eye, EyeOff, RotateCcw, Share2, Check, ArrowUpRight } from 'lucide-react';

interface ResultsPageProps {
  analysis: AnalysisResult | null;
  onLoadSample: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ analysis, onLoadSample }) => {
  const navigate = useNavigate();
  const [showRawResume, setShowRawResume] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl">
          🔍
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">No Resume Analysis Found</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Please upload a resume PDF or test with our instant sample data to view the ATS dashboard.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/analyze"
            className="px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md transition-all"
          >
            Upload Resume
          </Link>
          <button
            onClick={onLoadSample}
            className="px-6 py-3 text-sm font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Load Demo Resume</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle PDF Download
  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const response = await fetch('/api/download_report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysis.fileName.replace('.pdf', '')}_Career_Report.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
      alert('Generating PDF report fallback...');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Dashboard Top Navigation Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Analysis Complete • ID: {analysis.id.slice(0, 16)}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            {analysis.fileName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Target Company: <span className="font-semibold text-slate-700">{analysis.company || 'General Employer'}</span> | Date: {new Date(analysis.timestamp).toLocaleDateString()}
          </p>
        </div>

        {/* Dashboard Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => navigate('/analyze')}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-analyze</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link' : 'Share Report'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingPdf ? 'Generating PDF...' : 'Download PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Quick Launch Suite Shortcuts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/improve"
          state={{ resumeText: analysis.resume_text, jobDescription: analysis.jobDescription, company: analysis.company }}
          className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div>
            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">One-Click Fix</span>
            <span className="text-xs font-bold">AI STAR Resume Rewriter</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <Link
          to="/interview"
          state={{ resumeText: analysis.resume_text, jobDescription: analysis.jobDescription, company: analysis.company }}
          className="p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div>
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider block">Practice Mode</span>
            <span className="text-xs font-bold">AI Mock Interview Chat</span>
          </div>
          <Bot className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          to="/cover-letter"
          state={{ resumeText: analysis.resume_text, jobDescription: analysis.jobDescription, company: analysis.company }}
          className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div>
            <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">Tailored Letter</span>
            <span className="text-xs font-bold">AI Cover Letter Generator</span>
          </div>
          <Award className="w-4 h-4 text-pink-200 group-hover:scale-110 transition-transform" />
        </Link>

        <button
          onClick={() => setShowRawResume(!showRawResume)}
          className="p-4 rounded-xl bg-slate-900 text-slate-100 shadow-xs hover:bg-slate-800 transition-all flex items-center justify-between text-left cursor-pointer"
        >
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parsed Source</span>
            <span className="text-xs font-bold">{showRawResume ? 'Hide Resume Text' : 'Inspect Extracted Text'}</span>
          </div>
          {showRawResume ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
        </button>
      </div>

      {/* Raw Resume Drawer toggle */}
      {showRawResume && (
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Extracted Resume Text (Passed to Gemini)
            </h3>
            <span className="text-xs text-slate-500">{analysis.resume_text.length} characters</span>
          </div>
          <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl max-h-60 overflow-y-auto whitespace-pre-wrap text-slate-300">
            {analysis.resume_text}
          </pre>
        </div>
      )}

      {/* Section 1: Overall ATS Score Gauge */}
      <ScoreGauge
        score={analysis.overall_score}
        verdict={analysis.verdict}
        candidateName={analysis.fileName}
      />

      {/* Section 2: Executive Recruiter Review */}
      <RecruiterReviewCard
        review={analysis.recruiter_review}
        company={analysis.company}
      />

      {/* Section 3: Score Breakdown Recharts Visualization */}
      <ScoreBreakdownChart breakdown={analysis.score_breakdown} />

      {/* Section 4: Matched vs Missing Skills Matrix */}
      <SkillMatrix
        matchedSkills={analysis.matched_skills || []}
        missingSkills={analysis.missing_skills || []}
      />

      {/* Section 5: Strengths, Weaknesses & Action Items */}
      <StrengthWeaknessCard
        strengths={analysis.strengths || []}
        weaknesses={analysis.weaknesses || []}
        suggestions={analysis.suggestions || []}
      />

      {/* Section 6: Expected Interview Topics */}
      <InterviewTopicsCard
        topics={analysis.interview_topics || []}
        resumeText={analysis.resume_text}
        jobDescription={analysis.jobDescription}
        company={analysis.company}
      />

      {/* Section 7: Recommended Career Pathways */}
      <CareerCard careers={analysis.career_recommendation || []} />

      {/* Section 8: Personalized 4-Week Learning Roadmap */}
      <RoadmapCard roadmap={analysis.learning_roadmap} />
    </div>
  );
};
