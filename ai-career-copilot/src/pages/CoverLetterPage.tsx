import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CoverLetterResult } from '../types';
import { Award, Sparkles, Copy, Check, Loader2, ArrowRight, Building, FileText } from 'lucide-react';

interface CoverLetterPageProps {
  currentResumeText?: string;
  jobDescription?: string;
  company?: string;
}

export const CoverLetterPage: React.FC<CoverLetterPageProps> = ({
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
  const [jobDescription, setJobDescription] = useState<string>(initialJobDesc);
  const [company, setCompany] = useState<string>(initialCompany);
  const [tone, setTone] = useState<string>('Professional & Confident');

  const [loading, setLoading] = useState<boolean>(false);
  const [coverLetterResult, setCoverLetterResult] = useState<CoverLetterResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setErrorMessage('Please provide your resume text to tailor the cover letter.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/cover_letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: jobDescription,
          company,
          tone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate cover letter.');
      }

      const data: CoverLetterResult = await res.json();
      setCoverLetterResult(data);
    } catch (err: any) {
      console.error('Cover letter error:', err);
      setErrorMessage(err.message || 'Error generating cover letter.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetterResult) return;
    navigator.clipboard.writeText(coverLetterResult.full_cover_letter_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
          <Award className="w-3.5 h-3.5 text-purple-600" />
          <span>Tailored AI Cover Letter Writer</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          High-Conversion Cover Letter Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Generates persuasive, company-aligned cover letters that highlight your top achievements and match target job requirements.
        </p>
      </div>

      {/* Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" /> Target Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe, OpenAI, Google"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tone Style
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
              >
                <option value="Professional & Confident">Professional & Confident</option>
                <option value="Executive & Strategic">Executive & Strategic</option>
                <option value="Startup & Energetic">Startup & Energetic</option>
                <option value="Technical & Analytical">Technical & Analytical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" /> Target Role
              </label>
              <input
                type="text"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Candidate Resume Text
            </label>
            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste candidate resume text or experience highlights..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50/50 resize-y"
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
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Drafting Cover Letter...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Generate Custom Cover Letter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Display */}
      {coverLetterResult && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                Subject Line Proposal
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {coverLetterResult.subject_line}
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Cover Letter'}</span>
            </button>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif space-y-4 whitespace-pre-wrap">
            {coverLetterResult.full_cover_letter_markdown}
          </div>
        </div>
      )}
    </div>
  );
};
