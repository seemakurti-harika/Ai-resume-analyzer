import express, { Request, Response } from 'express';
import multer from 'multer';
import * as pdfParseModule from 'pdf-parse';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { jsPDF } from 'jspdf';

const pdfParse: any = (pdfParseModule as any).default || pdfParseModule;

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Configure body parser and multer
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are supported.'));
    }
  },
});

// Helper: Initialize Gemini Client
function getAi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }
  return new GoogleGenAI({ apiKey });
}

// Memory store for recent analyses
const analysisStore: Record<string, any> = {};

// Helper: Clean JSON response from Gemini
function cleanJsonResponse(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(cleaned);
}

// API Routes

// 1. POST /api/upload - Parse resume and generate full ATS & Career analysis
app.post('/api/upload', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const jobDescription = (req.body.jobDescription || '').trim();
    const company = (req.body.company || '').trim();
    let resumeText = '';

    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
    } else if (req.body.sampleText) {
      resumeText = req.body.sampleText;
    } else {
      return res.status(400).json({ error: 'Please upload a valid PDF resume.' });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        error: 'Unable to extract sufficient text from the PDF. Please ensure the document contains selectable text.',
      });
    }

    const ai = getAi();
    const prompt = `
You are an expert Executive Recruiter, ATS (Applicant Tracking System) Specialist, and Career Copilot.
Analyze the provided candidate resume thoroughly against the optional target job description and company.

RESUME CONTENT:
"""
${resumeText.slice(0, 10000)}
"""

TARGET JOB DESCRIPTION (if blank, analyze for top candidate alignment):
"""
${jobDescription || 'General Tech & Industry Alignment'}
"""

TARGET COMPANY: "${company || 'General Top Employer'}"

Return a single strict JSON object matching this schema EXACTLY without markdown wrappers or conversational intro text:

{
  "overall_score": number (0-100),
  "verdict": string (1 punchy summary verdict on candidate fit),
  "score_breakdown": {
    "skills": number (0-100),
    "projects": number (0-100),
    "experience": number (0-100),
    "education": number (0-100),
    "formatting": number (0-100)
  },
  "strengths": [
    { "title": string, "description": string }
  ],
  "weaknesses": [
    { "title": string, "description": string, "severity": "high" | "medium" | "low" }
  ],
  "matched_skills": [string],
  "missing_skills": [string],
  "suggestions": [
    { "category": string, "action": string, "impact": "High" | "Medium" | "Low" }
  ],
  "interview_topics": [
    { "topic": string, "sample_question": string, "type": "Technical" | "Behavioral" | "System Design" | "HR" }
  ],
  "recruiter_review": {
    "hiring_decision": "Strong Hire" | "Hire" | "Consider with Reservation" | "Unlikely Shortlist",
    "shortlisting_probability": number (0-100),
    "strengths": [string],
    "weaknesses": [string],
    "hiring_risks": [string],
    "improvements": [string],
    "difficulty": "Easy" | "Moderate" | "Challenging" | "Extreme",
    "comment": string
  },
  "career_recommendation": [
    {
      "title": string,
      "match_percentage": number (0-100),
      "reason": string,
      "skills_needed": [string],
      "difficulty": "Easy" | "Moderate" | "Hard",
      "expected_salary": string,
      "growth": string
    }
  ],
  "learning_roadmap": {
    "completion_time": string,
    "weeks": [
      {
        "week": 1,
        "theme": string,
        "courses": [string],
        "projects": [string],
        "books": [string],
        "youtube": [string],
        "practice": [string]
      },
      {
        "week": 2,
        "theme": string,
        "courses": [string],
        "projects": [string],
        "books": [string],
        "youtube": [string],
        "practice": [string]
      },
      {
        "week": 3,
        "theme": string,
        "courses": [string],
        "projects": [string],
        "books": [string],
        "youtube": [string],
        "practice": [string]
      },
      {
        "week": 4,
        "theme": string,
        "courses": [string],
        "projects": [string],
        "books": [string],
        "youtube": [string],
        "practice": [string]
      }
    ]
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    const analysisData = cleanJsonResponse(responseText);

    const id = 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const result = {
      id,
      timestamp: new Date().toISOString(),
      fileName: req.file ? req.file.originalname : 'Sample_Resume.pdf',
      jobDescription,
      company,
      resume_text: resumeText,
      ...analysisData,
    };

    analysisStore[id] = result;
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/upload:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze resume. Please check your Gemini API configuration or try again.',
    });
  }
});

// 2. POST /api/improve_resume - Gemini STAR-method resume re-writer
app.post('/api/improve_resume', async (req: Request, res: Response) => {
  try {
    const { resume_text, job_description, company } = req.body;
    if (!resume_text) {
      return res.status(400).json({ error: 'Resume text is required for improvement.' });
    }

    const ai = getAi();
    const prompt = `
You are an elite Resume Writer and Executive Career Coach.
Rewrite and optimize the provided candidate resume to maximize ATS keyword density, STAR-method impact statements (Situation, Task, Action, Result with quantifiable metrics), and recruiter engagement. NEVER fabricate work history or fake companies, but elevate wording and structure.

RESUME CONTENT:
"""
${resume_text.slice(0, 10000)}
"""

TARGET ROLE / JOB DESCRIPTION:
"""
${job_description || 'Target Tech Industry Role'}
"""

TARGET COMPANY: "${company || 'Top Tech Firm'}"

Return JSON matching this schema:
{
  "professional_summary": string,
  "key_skills_categorized": [
    { "category": string, "skills": [string] }
  ],
  "experience": [
    {
      "role": string,
      "company": string,
      "duration": string,
      "bullet_points": [string]
    }
  ],
  "projects": [
    {
      "name": string,
      "tech_stack": string,
      "bullet_points": [string]
    }
  ],
  "achievements": [string],
  "ats_keywords_added": [string],
  "full_improved_markdown": string
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const result = cleanJsonResponse(response.text || '');
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/improve_resume:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate improved resume.' });
  }
});

// 3. POST /api/interview_chat - AI Mock Interview Chatbot
app.post('/api/interview_chat', async (req: Request, res: Response) => {
  try {
    const { resume_text, job_description, company, messages, user_answer } = req.body;

    const ai = getAi();
    const prompt = `
You are a Staff Software Engineer & Hiring Manager conducting an interactive technical & behavioral mock interview.
Target Role: "${job_description || 'Senior Engineer'}"
Target Company: "${company || 'Tech Company'}"
Candidate Resume Excerpt:
"""
${(resume_text || '').slice(0, 3000)}
"""

Conversation History so far:
${JSON.stringify(messages || [])}

User's Latest Response: "${user_answer || 'Hello, I am ready to start the interview.'}"

Provide a structured response:
1. Feedback on candidate's previous answer (score 1-5 stars, what was great, what could be improved).
2. The NEXT single interview question (mix technical, behavioral, architecture, or project deep dive).

Return JSON:
{
  "feedback": {
    "rating_stars": number (1-5),
    "strengths": string,
    "constructive_tip": string
  },
  "next_question": string,
  "question_type": "Technical" | "Behavioral" | "System Design" | "HR" | "Coding Scenario",
  "ideal_talking_points": [string]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const result = cleanJsonResponse(response.text || '');
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/interview_chat:', error);
    return res.status(500).json({ error: error.message || 'Failed to process interview response.' });
  }
});

// 4. POST /api/cover_letter - AI Cover Letter Generator
app.post('/api/cover_letter', async (req: Request, res: Response) => {
  try {
    const { resume_text, job_description, company, tone } = req.body;

    const ai = getAi();
    const prompt = `
Generate a highly persuasive, customized Cover Letter for a job application.
Tone: ${tone || 'Professional & Confident'}
Target Company: "${company || 'Target Company'}"
Job Description / Role:
"""
${(job_description || 'Software Engineer').slice(0, 3000)}
"""
Candidate Resume:
"""
${(resume_text || '').slice(0, 4000)}
"""

Return JSON:
{
  "subject_line": string,
  "salutation": string,
  "opening_hook": string,
  "core_value_bullets": [string],
  "closing_call_to_action": string,
  "full_cover_letter_markdown": string
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const result = cleanJsonResponse(response.text || '');
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/cover_letter:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate cover letter.' });
  }
});

// 5. GET /api/analyses/:id - Retrieve cached analysis
app.get('/api/analyses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  if (analysisStore[id]) {
    return res.json(analysisStore[id]);
  }
  return res.status(404).json({ error: 'Analysis record not found.' });
});

// 6. POST /api/download_report - PDF Report generator fallback
app.post('/api/download_report', (req: Request, res: Response) => {
  try {
    const { analysis } = req.body;
    if (!analysis) {
      return res.status(400).json({ error: 'Analysis data is required' });
    }

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // Dark blue
    doc.text('AI CAREER COPILOT - ATS ANALYSIS REPORT', 14, 22);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Candidate File: ${analysis.fileName || 'Resume'}`, 14, 30);
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 14, 36);
    doc.text(`Target Company: ${analysis.company || 'N/A'}`, 14, 42);

    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 46, 196, 46);

    // Score Summary
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text(`Overall ATS Match Score: ${analysis.overall_score}%`, 14, 56);
    doc.setFontSize(11);
    doc.text(`Verdict: ${analysis.verdict || 'N/A'}`, 14, 64);

    // Score breakdown
    doc.setFontSize(13);
    doc.text('Score Breakdown:', 14, 76);
    let y = 84;
    if (analysis.score_breakdown) {
      Object.entries(analysis.score_breakdown).forEach(([key, val]) => {
        doc.text(`• ${key.toUpperCase()}: ${val}%`, 20, y);
        y += 6;
      });
    }

    y += 6;
    doc.setFontSize(13);
    doc.text('Matched Skills:', 14, y);
    y += 8;
    const matched = (analysis.matched_skills || []).join(', ');
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(matched || 'None detected', 170), 20, y);

    y += 18;
    doc.setFontSize(13);
    doc.text('Missing Skills to Add:', 14, y);
    y += 8;
    const missing = (analysis.missing_skills || []).join(', ');
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(missing || 'None detected', 170), 20, y);

    const pdfOutput = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="AI_Career_Copilot_Report.pdf"');
    return res.send(Buffer.from(pdfOutput));
  } catch (err: any) {
    console.error('PDF error:', err);
    return res.status(500).json({ error: 'Failed to generate PDF report.' });
  }
});

// Start Express + Vite Integration
async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AI Career Copilot Server running at http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
