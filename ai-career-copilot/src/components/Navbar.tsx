import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, FileText, BarChart3, Bot, FileCheck, Award, History, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onLoadSample?: () => void;
  hasAnalysis?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoadSample, hasAnalysis }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Analyze Resume', path: '/analyze', icon: FileText },
    { name: 'Results', path: '/results', icon: BarChart3, highlight: hasAnalysis },
    { name: 'AI Interview', path: '/interview', icon: Bot },
    { name: 'Resume Rewriter', path: '/improve', icon: FileCheck },
    { name: 'Cover Letter', path: '/cover-letter', icon: Award },
    { name: 'Saved History', path: '/history', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
              Career<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Copilot</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-blue-600 -mt-1">
              AI ATS & Career Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{link.name}</span>
                {link.highlight && !active && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {onLoadSample && (
            <button
              onClick={onLoadSample}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              title="Load instant pre-analyzed demo resume"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Try Demo Sample</span>
            </button>
          )}

          <Link
            to="/analyze"
            className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/20 hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {onLoadSample && (
            <button
              onClick={onLoadSample}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200"
            >
              Demo
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-xl text-white bg-blue-600 shadow-xs"
            >
              Upload & Analyze Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
