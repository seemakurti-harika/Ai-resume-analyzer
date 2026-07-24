import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Zap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">AI Career Copilot</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise-grade resume intelligence, ATS score evaluation, recruiter shortlisting predictions, and automated interview coaching powered by Gemini 2.5 AI.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Private & Secure Resume Parsing</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/analyze" className="hover:text-blue-400 transition-colors">
                  ATS Resume Scanner
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-blue-400 transition-colors">
                  Recruiter Feedback Engine
                </Link>
              </li>
              <li>
                <Link to="/improve" className="hover:text-blue-400 transition-colors">
                  AI Resume Rewriter (STAR Method)
                </Link>
              </li>
              <li>
                <Link to="/interview" className="hover:text-blue-400 transition-colors">
                  Interactive AI Mock Interviewer
                </Link>
              </li>
              <li>
                <Link to="/cover-letter" className="hover:text-blue-400 transition-colors">
                  AI Cover Letter Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>PDF Text Extraction & Parsing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Targeted Job Description Matching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Personalized 4-Week Skill Roadmap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Downloadable Comprehensive PDF Report</span>
              </li>
            </ul>
          </div>

          {/* Technology Badge */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Engine Specifications
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AI Model:</span>
                <span className="text-indigo-300 font-semibold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Gemini 2.5 Flash
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Response Speed:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> ~1.2s Real-time
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Format Support:</span>
                <span className="text-slate-200">PDF (Max 10MB)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Career Copilot. Built with Google Gemini API & React.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">API Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
