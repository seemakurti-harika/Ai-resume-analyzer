export interface ScoreBreakdown {
  skills: number;
  projects: number;
  experience: number;
  education: number;
  formatting: number;
}

export interface StrengthItem {
  title: string;
  description: string;
}

export interface WeaknessItem {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface SuggestionItem {
  category: string;
  action: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface InterviewTopic {
  topic: string;
  sample_question: string;
  type: 'Technical' | 'Behavioral' | 'System Design' | 'HR';
}

export interface RecruiterReview {
  hiring_decision: 'Strong Hire' | 'Hire' | 'Consider with Reservation' | 'Unlikely Shortlist';
  shortlisting_probability: number;
  strengths: string[];
  weaknesses: string[];
  hiring_risks: string[];
  improvements: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  comment: string;
}

export interface CareerRecommendation {
  title: string;
  match_percentage: number;
  reason: string;
  skills_needed: string[];
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  expected_salary: string;
  growth: string;
}

export interface RoadmapWeek {
  week: number;
  theme: string;
  courses: string[];
  projects: string[];
  books: string[];
  youtube: string[];
  practice: string[];
}

export interface LearningRoadmap {
  completion_time: string;
  weeks: RoadmapWeek[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  fileName: string;
  jobDescription?: string;
  company?: string;
  resume_text: string;
  overall_score: number;
  verdict: string;
  score_breakdown: ScoreBreakdown;
  strengths: StrengthItem[];
  weaknesses: WeaknessItem[];
  matched_skills: string[];
  missing_skills: string[];
  suggestions: SuggestionItem[];
  interview_topics: InterviewTopic[];
  recruiter_review: RecruiterReview;
  career_recommendation: CareerRecommendation[];
  learning_roadmap: LearningRoadmap;
}

export interface ImprovedResume {
  professional_summary: string;
  key_skills_categorized: Array<{ category: string; skills: string[] }>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    bullet_points: string[];
  }>;
  projects: Array<{
    name: string;
    tech_stack: string;
    bullet_points: string[];
  }>;
  achievements: string[];
  ats_keywords_added: string[];
  full_improved_markdown: string;
}

export interface ChatMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  feedback?: {
    rating_stars: number;
    strengths: string;
    constructive_tip: string;
  };
  questionType?: string;
  idealPoints?: string[];
  timestamp: string;
}

export interface CoverLetterResult {
  subject_line: string;
  salutation: string;
  opening_hook: string;
  core_value_bullets: string[];
  closing_call_to_action: string;
  full_cover_letter_markdown: string;
}
