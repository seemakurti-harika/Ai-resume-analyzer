import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImprovedResume } from '../types';
import { FileCheck, Sparkles, Copy, Check, Loader2, ArrowRight, Award, Lightbulb, Code } from 'lucide-react';

interface ImproveResumePageProps {
  currentResumeText?: string;
  jobDescription?: string;
  company?: string;
}

export const ImproveResumePage: React.FC<ImproveResumePageProps> = ({
  currentResumeText: defaultResumeText = '',
  jobDescription: defaultJobDesc = '',
  company: defaultCompany = '',
}) => {
  const location = useLocation();
  const state = location.state as { resumeText?: string; jobDescription?: string; company?: string } | null;

  const initialResumeText = state?.resumeText || defaultResumeText;
  const initialJobDesc = state?.jobDescription || defaultJobDesc;
  const initialCompany = state?.company || defaultCompany;

  const [resumeText, setResumeText] = useState<string>(initialResumeText);
  const [targetJob, setTargetJob] = useState<string>(initialJobDesc);
  const [targetCompany, setTargetCompany] = useState<string>(initialCompany);

  const [loading, setLoading] = useState<boolean>(false);
  const [improvedResult, setImprovedResult] = useState<ImprovedResume | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setErrorMessage('Please provide or paste your resume text to optimize.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/improve_resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: targetJob,
          company: targetCompany,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to optimize resume.');
      }

      const result: ImprovedResume = await res.json();
      setImprovedResult(result);
    } catch (err: any) {
      console.error('Improve resume error:', err);
      setErrorMessage(err.message || 'Error executing AI resume rewrite.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!improvedResult) return;
    navigator.clipboard.writeText(improvedResult.full_improved_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>STAR Method & Quantifiable Metrics Optimizer</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          AI Resume STAR-Method Rewriter
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Transforms weak, passive bullet points into high-impact STAR-method achievements packed with quantifiable metrics and ATS keywords.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <form onSubmit={handleRewrite} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role / Job Title
              </label>
              <input
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Company Name
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Stripe, Google, Netflix"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resume Text Content to Rewrite
            </label>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your original work experience, summary, and bullet points here..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50 resize-y"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !resumeText.trim()}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Rewriting Bullets with Gemini 2.5...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Generate STAR-Optimized Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results View */}
      {improvedResult && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Optimized Resume Markdown Ready</span>
            </div>
            <button
              onClick={handleCopyMarkdown}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Markdown!' : 'Copy Rewritten Resume'}</span>
            </button>
          </div>

          {/* Keywords Added Pill Box */}
          {improvedResult.ats_keywords_added && improvedResult.ats_keywords_added.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                ATS Keywords Injected into Bullet Points:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {improvedResult.ats_keywords_added.map((kw, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Professional Summary */}
          {improvedResult.professional_summary && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Rewritten Executive Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{improvedResult.professional_summary}"
              </p>
            </div>
          )}

          {/* Experience Bullets */}
          {improvedResult.experience && improvedResult.experience.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                STAR-Method Work Experience Bullets
              </h3>

              <div className="space-y-4">
                {improvedResult.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-500 font-normal">{exp.duration}</span>
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700">
                      {(exp.bullet_points || []).map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Markdown Preview */}
          <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Full Improved Resume Raw Markdown
            </h3>
            <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl max-h-80 overflow-y-auto whitespace-pre-wrap text-slate-300">
              {improvedResult.full_improved_markdown}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
