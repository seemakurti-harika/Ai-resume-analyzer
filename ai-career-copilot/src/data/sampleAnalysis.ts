import { AnalysisResult } from '../types';

export const sampleAnalysisData: AnalysisResult = {
  id: 'sample_analysis_8821',
  timestamp: new Date().toISOString(),
  fileName: 'Alex_Chen_Senior_Software_Engineer.pdf',
  company: 'Stripe',
  jobDescription: 'Senior Full Stack Engineer to lead high-throughput payment infrastructure and React merchant dashboards.',
  resume_text: `ALEX CHEN
Full Stack Software Engineer | San Francisco, CA
Email: alex.chen@example.com | Phone: (555) 019-2831 | GitHub: github.com/alexchen | LinkedIn: linkedin.com/in/alexchen-dev

SUMMARY:
Results-driven Senior Full Stack Engineer with 6+ years of experience designing scalable microservices, REST & GraphQL APIs, and modern React interfaces. Specialized in Node.js, TypeScript, PostgreSQL, and AWS. Reduced payment API latency by 42% and architected real-time analytics pipelines handling 5M+ daily events.

WORK EXPERIENCE:
Senior Software Engineer | PayTech Solutions | 2022 - Present
- Architected high-concurrency payment gateway integration serving 200,000+ active merchants with 99.99% uptime.
- Optimized PostgreSQL database indexes and query plans, reducing P99 query latency from 320ms to 45ms.
- Mentored a team of 5 junior engineers and established automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS EKS.

Software Engineer | CloudScale Tech | 2019 - 2022
- Built React & TypeScript dashboard components with Redux Toolkit and Tailwind CSS, increasing user retention by 28%.
- Implemented WebSockets for live transactional analytics and automated alert streaming.
- Integrated Redis caching layer for heavy analytics endpoints, reducing backend server loads by 60%.

EDUCATION:
B.S. in Computer Science | University of California, Berkeley (2015 - 2019)
GPA: 3.8/4.0 | Honors: Dean's Honor List

SKILLS:
Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
Frameworks/Libraries: React, Node.js, Express, Next.js, Redux, Tailwind CSS, GraphQL
Databases & DevOps: PostgreSQL, Redis, MongoDB, Docker, Kubernetes, AWS (S3, EC2, Lambda), CI/CD`,

  overall_score: 88,
  verdict: 'Exceptional candidate with strong backend scalability experience and proven full-stack depth. Outstanding candidate for Stripe Senior Staff/Full-Stack team.',

  score_breakdown: {
    skills: 92,
    projects: 85,
    experience: 88,
    education: 90,
    formatting: 85,
  },

  strengths: [
    {
      title: 'Quantifiable Engineering Impact',
      description: 'Clear STAR-method metrics throughout work history (e.g., 42% latency reduction, 200,000+ merchants, 99.99% uptime).',
    },
    {
      title: 'Modern High-Demand Tech Stack',
      description: 'Strong proficiency in Node.js, TypeScript, React, PostgreSQL, Docker, and AWS.',
    },
    {
      title: 'Leadership & Mentorship',
      description: 'Demonstrated initiative leading 5 junior engineers and establishing CI/CD automation practices.',
    },
  ],

  weaknesses: [
    {
      title: 'Missing Modern Payment Protocols Keywords',
      description: 'Lacks explicit mention of PCI-DSS compliance, Webhooks security, or Idempotency keys relevant for Stripe.',
      severity: 'medium',
    },
    {
      title: 'Formatting & Length Optimization',
      description: 'Project section could feature 1-2 key open source or side projects to showcase system architecture mastery.',
      severity: 'low',
    },
  ],

  matched_skills: [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'REST APIs',
    'GraphQL',
    'Docker',
    'AWS',
    'CI/CD',
    'Tailwind CSS',
    'Redis',
  ],

  missing_skills: [
    'PCI-DSS Compliance',
    'Idempotency Keys',
    'Kafka / Event Streaming',
    'Golang',
    'System Architecture Design',
    'Micro-frontend Architecture',
  ],

  suggestions: [
    {
      category: 'ATS Keywords',
      action: 'Incorporate terms like "PCI-DSS Compliance", "Idempotent API Requests", and "Event-Driven Architecture" into PayTech experience bullets.',
      impact: 'High',
    },
    {
      category: 'Projects',
      action: 'Add a System Architecture project showcasing how you handling payment failure retries and distributed transaction locks.',
      impact: 'Medium',
    },
    {
      category: 'Formatting',
      action: 'Group technical skills into concise sub-categories to improve ATS parser accuracy.',
      impact: 'Low',
    },
  ],

  interview_topics: [
    {
      topic: 'Idempotency & Payment Systems',
      sample_question: 'How do you design a payment API endpoint to guarantee exact-once processing when network retries occur?',
      type: 'System Design',
    },
    {
      topic: 'PostgreSQL Performance Optimization',
      sample_question: 'Walk me through how you diagnosed P99 latency and redesigned database indexes at PayTech.',
      type: 'Technical',
    },
    {
      topic: 'Team Mentorship & Conflict',
      sample_question: 'Describe a time when a junior engineer on your team disagreed with your architectural proposal.',
      type: 'Behavioral',
    },
  ],

  recruiter_review: {
    hiring_decision: 'Strong Hire',
    shortlisting_probability: 92,
    strengths: [
      'Strong metric-backed bullets demonstrate business outcomes.',
      'UC Berkeley CS background provides strong foundational pedigree.',
      'Immediate match for high-scale Node/React payment roles.',
    ],
    weaknesses: [
      'No explicit mention of distributed queues like Kafka or RabbitMQ.',
    ],
    hiring_risks: [
      'Candidate may be overqualified for mid-level roles, target Senior/Lead positions.',
    ],
    improvements: [
      'Highlight security & compliance credentials if targeting financial tech.',
    ],
    difficulty: 'Moderate',
    comment: 'Top 5% candidate. Fast-track to Senior Technical Phone Screen without initial screening hurdles.',
  },

  career_recommendation: [
    {
      title: 'Senior Full Stack Payment Engineer',
      match_percentage: 95,
      reason: 'Perfect match for backend payment gateways combined with modern React UI components.',
      skills_needed: ['PCI-DSS', 'Idempotency', 'Stripe API'],
      difficulty: 'Easy',
      expected_salary: '$180,000 - $230,000',
      growth: '+24% YoY',
    },
    {
      title: 'Staff Software Architect',
      match_percentage: 88,
      reason: 'Strong system optimization record positions you well for architectural oversight.',
      skills_needed: ['Distributed Systems', 'Kafka', 'System Design'],
      difficulty: 'Moderate',
      expected_salary: '$210,000 - $270,000',
      growth: '+18% YoY',
    },
    {
      title: 'Engineering Manager',
      match_percentage: 80,
      reason: 'Proven mentorship of 5 engineers creates a natural path toward engineering management.',
      skills_needed: ['People Management', 'Sprint Planning', 'OKRs'],
      difficulty: 'Hard',
      expected_salary: '$195,000 - $250,000',
      growth: '+15% YoY',
    },
  ],

  learning_roadmap: {
    completion_time: '4 Weeks (5 hrs/week)',
    weeks: [
      {
        week: 1,
        theme: 'Payment Architecture & Idempotency',
        courses: ['Stripe System Architecture Masterclass', 'Designing Payment Gateways on Udemy'],
        projects: ['Build an Idempotent Payment API with Node.js & Redis locks'],
        books: ['Designing Data-Intensive Applications (Ch. 7 - Transactions)'],
        youtube: ['ByteByteGo Payment Gateway Architecture', 'Hussein Nasser Database Indexing'],
        practice: ['LeetCode System Design - Design Stripe / PayPal'],
      },
      {
        week: 2,
        theme: 'Distributed Event Streaming with Kafka',
        courses: ['Apache Kafka for Beginners - Stephane Maarek'],
        projects: ['Create an Event-Driven Notification Service using Kafka & Node.js'],
        books: ['Kafka: The Definitive Guide'],
        youtube: ['Kafka Architecture in 10 Minutes', 'Event Driven Architecture Explained'],
        practice: ['Implement Kafka Consumer Groups in local Docker container'],
      },
      {
        week: 3,
        theme: 'Advanced PostgreSQL & Distributed Locks',
        courses: ['High Performance PostgreSQL - Distributed SQL'],
        projects: ['PostgreSQL Partitioning and EXPLAIN ANALYZE tuning lab'],
        books: ['The Art of PostgreSQL by Dimitri Fontaine'],
        youtube: ['PostgreSQL Indexing Deep Dive', 'Optimizing Slow SQL Queries'],
        practice: ['Write EXPLAIN queries for multi-table JOINs on 1M rows'],
      },
      {
        week: 4,
        theme: 'Senior & Staff Level Behavioral / System Design Interviews',
        courses: ['Grokking the System Design Interview'],
        projects: ['Mock Interview Recording & Peer Feedback'],
        books: ['The Staff Engineer’s Path by Tanya Reilly'],
        youtube: ['Ex-Google Staff Engineer System Design Interview'],
        practice: ['Complete 3 live mock interviews on AI Career Copilot'],
      },
    ],
  },
};
