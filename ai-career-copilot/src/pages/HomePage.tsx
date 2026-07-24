import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight, CheckCircle2, ShieldCheck, Zap, Bot, Award, BarChart3, Users, Compass } from 'lucide-react';

interface HomePageProps {
  onLoadSample: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLoadSample }) => {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    onLoadSample();
    navigate('/results');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden">
        {/* Background Visual Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs text-xs font-semibold animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Powered by Gemini 2.5 AI & Real-Time ATS Parsing</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Land 3x More Interviews with Your Personal{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                AI Career Copilot
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Instant ATS resume scoring, executive recruiter feedback, STAR-method bullet optimization, personalized 4-week upskilling roadmaps, and interactive mock interview practice.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/analyze"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              <span>Analyze Resume Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto px-7 py-4 text-base font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>View Live Demo Analysis</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>100% Free & Instant PDF Extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Targeted Job Description Matching</span>
            </div>
          </div>
        </div>

        {/* Floating Preview Mock Card */}
        <div className="max-w-4xl mx-auto mt-12 px-4">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-400 ml-2">Live AI Career Audit Dashboard</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                88% Overall ATS Score
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Matched Keywords</span>
                <p className="text-sm font-bold text-slate-800">11 Technical Skills Matched</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">TypeScript</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">React</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">PostgreSQL</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Recruiter Verdict</span>
                <p className="text-sm font-bold text-slate-800">Strong Hire (92% Odds)</p>
                <p className="text-[11px] text-slate-500">Fast-track to technical phone screen</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Next Milestone</span>
                <p className="text-sm font-bold text-slate-800">Week 1: Payment Architecture</p>
                <p className="text-[11px] text-slate-500">4-Week custom learning roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Win High-Paying Roles
          </h2>
          <p className="text-sm text-slate-600">
            A comprehensive suite of recruitment tools engineered for ambitious software engineers and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">ATS Resume Auditor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates matched vs missing skills, formatting parsing risks, and provides a breakdown score across 5 key hiring criteria.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Executive Recruiter Assessment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates shortlisting probability, identifies hiring red flags, and delivers real-world feedback from a hiring manager's lens.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Resume STAR Rewriter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transforms basic job descriptions into high-impact, bulleted STAR statements packed with quantifiable metrics.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Interactive AI Interview Simulator</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulates technical & behavioral interviewers, evaluates candidate answers in real-time with 1-5 star feedback, and suggests ideal talking points.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Personalized 4-Week Roadmap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curates top courses, portfolio project ideas, book chapters, and YouTube search terms to systematically close missing skill gaps.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Downloadable PDF Reports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export comprehensive multi-page PDF career reports with scorecards, action plans, and recruiter reviews for easy offline reference.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="max-w-5xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-xs text-slate-500">From raw PDF to interview-ready candidate in under 30 seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center mx-auto text-base">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Upload PDF Resume</h3>
            <p className="text-xs text-slate-600">
              Drag and drop your resume PDF with optional Target Role or Company info.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center mx-auto text-base">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Gemini AI Multi-Factor Analysis</h3>
            <p className="text-xs text-slate-600">
              Parses technical keywords, recruiter sentiments, system design topics, and skill matrices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center mx-auto text-base">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Execute & Practice</h3>
            <p className="text-xs text-slate-600">
              Rewrite resume bullets, practice AI mock interviews, and follow your 4-week upskilling roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate Your Tech Career?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Get instant ATS scores, recruiter review insights, and custom interview prep in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="px-8 py-3.5 text-sm font-bold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer"
            >
              Analyze Your Resume Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
