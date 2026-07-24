import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnalysisResult } from './types';
import { sampleAnalysisData } from './data/sampleAnalysis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ResultsPage } from './pages/ResultsPage';
import { ImproveResumePage } from './pages/ImproveResumePage';
import { InterviewPage } from './pages/InterviewPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { HistoryPage } from './pages/HistoryPage';

export default function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(() => {
    const saved = localStorage.getItem('career_copilot_active');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved active analysis', e);
      }
    }
    return sampleAnalysisData; // Default to rich demo data for immediate preview
  });

  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    const saved = localStorage.getItem('career_copilot_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
    return [sampleAnalysisData];
  });

  // Save state changes
  useEffect(() => {
    if (analysis) {
      localStorage.setItem('career_copilot_active', JSON.stringify(analysis));
    }
  }, [analysis]);

  useEffect(() => {
    localStorage.setItem('career_copilot_history', JSON.stringify(history));
  }, [history]);

  const handleAnalysisSuccess = (data: AnalysisResult) => {
    setAnalysis(data);
    setHistory((prev) => [data, ...prev.filter((item) => item.id !== data.id)]);
  };

  const handleLoadSample = () => {
    setAnalysis(sampleAnalysisData);
    setHistory((prev) => [sampleAnalysisData, ...prev.filter((item) => item.id !== sampleAnalysisData.id)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('career_copilot_history');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
        {/* Sticky Header */}
        <Navbar onLoadSample={handleLoadSample} hasAnalysis={!!analysis} />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onLoadSample={handleLoadSample} />} />

            <Route
              path="/analyze"
              element={
                <AnalyzePage
                  onAnalysisSuccess={handleAnalysisSuccess}
                  onLoadSample={handleLoadSample}
                />
              }
            />

            <Route
              path="/results"
              element={
                <ResultsPage
                  analysis={analysis}
                  onLoadSample={handleLoadSample}
                />
              }
            />

            <Route
              path="/improve"
              element={
                <ImproveResumePage
                  currentResumeText={analysis?.resume_text}
                  jobDescription={analysis?.jobDescription}
                  company={analysis?.company}
                />
              }
            />

            <Route
              path="/interview"
              element={
                <InterviewPage
                  currentResumeText={analysis?.resume_text}
                  jobDescription={analysis?.jobDescription}
                  company={analysis?.company}
                />
              }
            />

            <Route
              path="/cover-letter"
              element={
                <CoverLetterPage
                  currentResumeText={analysis?.resume_text}
                  jobDescription={analysis?.jobDescription}
                  company={analysis?.company}
                />
              }
            />

            <Route
              path="/history"
              element={
                <HistoryPage
                  history={history}
                  onSelectAnalysis={(item) => setAnalysis(item)}
                  onClearHistory={handleClearHistory}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
