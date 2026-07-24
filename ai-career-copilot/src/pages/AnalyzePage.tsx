import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { Upload, FileText, Sparkles, Building2, Briefcase, AlertCircle, CheckCircle2, Loader2, X, ArrowRight, Shield } from 'lucide-react';

interface AnalyzePageProps {
  onAnalysisSuccess: (data: AnalysisResult) => void;
  onLoadSample: () => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ onAnalysisSuccess, onLoadSample }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('Extracting PDF Text...');

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file?: File) => {
    setErrorMessage(null);
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMessage('Invalid file format. Only PDF files are accepted.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10 MB limit. Please upload a smaller PDF.');
      return;
    }

    setSelectedFile(file);
  };

  // Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select or drag a PDF resume file first.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    // Dynamic loading status messages
    const steps = [
      'Parsing PDF text & extracting layout...',
      'Matching keywords against ATS algorithm...',
      'Evaluating recruiter sentiment with Gemini 2.5...',
      'Building 4-week personalized learning roadmap...',
      'Finalizing career insights scorecard...',
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1500);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('jobDescription', jobDescription);
      formData.append('company', company);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to analyze resume.');
      }

      const data: AnalysisResult = await res.json();
      onAnalysisSuccess(data);
      navigate('/results');
    } catch (err: any) {
      clearInterval(interval);
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'Error processing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = () => {
    onLoadSample();
    navigate('/results');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Analyze Your Resume for ATS & Recruiter Fit
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Upload your PDF resume to receive a multi-factor score breakdown, missing keyword analysis, recruiter hiring verdict, and career roadmap.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form & Upload Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Target Job & Company Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Target Job & Company Alignment (Recommended)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> Target Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe, Google, Amazon, Meta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Job Title / Key Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    onChange={(e) => {
                      if (!jobDescription) setJobDescription(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Description Text (Paste for Exact Keyword Match)
                </label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job posting details or key requirements here for tailored ATS scoring..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50 resize-none"
                />
              </div>
            </div>

            {/* Upload Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Upload Resume PDF
              </h2>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload Drop Zone Box */}
              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl shadow-sm">
                    📄
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">
                      Drag & Drop Resume PDF
                    </p>
                    <p className="text-xs text-slate-500">
                      or <span className="text-blue-600 underline font-semibold">browse files</span> on your computer
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      PDF only
                    </span>
                    <span>•</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      Maximum 10 MB
                    </span>
                  </div>
                </div>
              ) : (
                /* Selected File Box */
                <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                      📄
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                        Resume Selected
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                        {selectedFile.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDemoClick}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Don't have a PDF? Load Pre-parsed Demo Resume</span>
                </button>

                <button
                  type="submit"
                  disabled={loading || !selectedFile}
                  className={`w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-xl text-white transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                    loading || !selectedFile
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Full Career Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* What You'll Get Side Panel */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight">What You'll Get</h3>
            <p className="text-xs text-slate-300">
              Complete multi-dimensional analysis powered by Gemini 2.5
            </p>
          </div>

          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">Overall ATS Score (0-100)</span>
                <span className="text-slate-400">Sub-scores for Skills, Projects, Experience, and Formatting</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">Matched vs Missing Skills</span>
                <span className="text-slate-400">High-priority keywords to insert into experience bullets</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">Executive Recruiter Verdict</span>
                <span className="text-slate-400">Shortlisting probability %, hiring risks, & dealbreaker warnings</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">AI STAR Resume Rewriter</span>
                <span className="text-slate-400">Quantifiable impact bullet point suggestions</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">Interactive AI Mock Interview</span>
                <span className="text-slate-400">Role-specific technical & behavioral interview simulator</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 block">4-Week Upskilling Roadmap</span>
                <span className="text-slate-400">Curated courses, books, projects, and YouTube search terms</span>
              </div>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Files are processed securely in memory and never sold or shared.</span>
          </div>
        </div>
      </div>

      {/* Loading Modal Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white text-slate-900 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-slate-900">
                Evaluating Career Fit...
              </h3>
              <p className="text-xs font-semibold text-blue-600 animate-pulse">
                {loadingStep}
              </p>
              <p className="text-xs text-slate-500">
                Gemini 2.5 AI is parsing structure, technical depth, and recruiter sentiments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
