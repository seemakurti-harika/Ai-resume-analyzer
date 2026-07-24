import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatMessage } from '../types';
import { Bot, Send, User, Star, Loader2, Sparkles, RefreshCw, MessageSquare, Volume2, VolumeX } from 'lucide-react';

interface InterviewPageProps {
  currentResumeText?: string;
  jobDescription?: string;
  company?: string;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({
  currentResumeText: defaultResumeText = '',
  jobDescription: defaultJobDesc = '',
  company: defaultCompany = '',
}) => {
  const location = useLocation();
  const state = location.state as { resumeText?: string; jobDescription?: string; company?: string } | null;

  const resumeText = state?.resumeText || defaultResumeText;
  const targetJob = state?.jobDescription || defaultJobDesc || 'Senior Full Stack Engineer';
  const targetCompany = state?.company || defaultCompany || 'Tech Employer';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'interviewer',
      text: `Hello! I am your AI Technical Interviewer for the ${targetJob} role at ${targetCompany}. I've reviewed your resume. To kick off, could you walk me through a high-stakes technical decision or system architecture challenge you led recently?`,
      questionType: 'System Design',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputAnswer, setInputAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Speech synthesis option
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAnswer.trim() || loading) return;

    const userText = inputAnswer.trim();
    setInputAnswer('');

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'candidate',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.sender === 'candidate' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/interview_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: targetJob,
          company: targetCompany,
          messages: chatHistory,
          user_answer: userText,
        }),
      });

      if (!res.ok) {
        throw new Error('Interview server error');
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'interviewer',
        text: data.next_question || 'That is interesting. What was the impact of that choice?',
        feedback: data.feedback,
        questionType: data.question_type,
        idealPoints: data.ideal_talking_points,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiMsg.text);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        sender: 'interviewer',
        text: 'That makes sense. Moving forward, how do you handle unexpected production incidents or latency spikes under heavy traffic?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 'msg_init_' + Date.now(),
        sender: 'interviewer',
        text: `Welcome back! Let's restart our interview for the ${targetJob} role. Tell me about a project on your resume that best demonstrates your full-stack capability.`,
        questionType: 'Behavioral',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Interactive AI Mock Interviewer</h1>
            <p className="text-xs text-slate-400">
              Role: <span className="text-indigo-300 font-semibold">{targetJob}</span> • Company: <span className="text-purple-300 font-semibold">{targetCompany}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              speechEnabled
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle text-to-speech audio feedback"
          >
            {speechEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{speechEnabled ? 'Voice On' : 'Voice Off'}</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 min-h-[480px] max-h-[600px] overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          {messages.map((m) => {
            const isAI = m.sender === 'interviewer';

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isAI ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  {isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAI
                        ? 'bg-slate-100 text-slate-900 rounded-tl-xs border border-slate-200/80'
                        : 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                    }`}
                  >
                    {/* Optional Question Type Badge */}
                    {isAI && m.questionType && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 mb-2">
                        {m.questionType} Question
                      </span>
                    )}

                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span
                      className={`text-[10px] block mt-1.5 ${
                        isAI ? 'text-slate-400' : 'text-indigo-200'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>

                  {/* Rating & Real-time Feedback Card */}
                  {m.feedback && (
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Answer Evaluation:
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= (m.feedback?.rating_stars || 4)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-amber-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-amber-900 font-medium">
                        <span className="font-bold">What was great:</span> {m.feedback.strengths}
                      </p>
                      <p className="text-amber-800">
                        <span className="font-bold">Pro Tip:</span> {m.feedback.constructive_tip}
                      </p>
                    </div>
                  )}

                  {/* Ideal Talking Points */}
                  {m.idealPoints && m.idealPoints.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                      <span className="font-bold text-slate-800 block">Suggested Key Talking Points:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {m.idealPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-indigo-600 font-semibold p-3 bg-indigo-50 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>AI Interviewer is analyzing your response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Type your answer here (e.g. In my previous project, we optimized SQL indexing by...)"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !inputAnswer.trim()}
              className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Submit Answer</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Tip: Be specific with metrics (e.g. numbers, framework names, architectural trade-offs).
          </p>
        </form>
      </div>
    </div>
  );
};
