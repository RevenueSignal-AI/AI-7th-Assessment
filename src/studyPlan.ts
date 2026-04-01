export interface Course {
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
}

export interface DomainPlan {
  domain: string;
  description: string;
  courses: Course[];
  practiceActivities: string[];
}

export interface StudyPlanData {
  overallLevel: string;
  overallPct: number;
  domainPlans: DomainPlan[];
  estimatedWeeks: number;
}

const domainCourses: Record<string, DomainPlan> = {
  "AI Foundations and Concepts": {
    domain: "AI Foundations and Concepts",
    description: "Build a solid understanding of core AI concepts including machine learning, neural networks, LLMs, and how modern AI systems work.",
    courses: [
      {
        title: "AI For Everyone",
        provider: "Coursera (DeepLearning.AI)",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        duration: "4 weeks",
        level: "Beginner"
      },
      {
        title: "Introduction to Artificial Intelligence (AI)",
        provider: "Coursera (IBM)",
        url: "https://www.coursera.org/learn/introduction-to-ai",
        duration: "4 weeks",
        level: "Beginner"
      },
      {
        title: "Generative AI for Everyone",
        provider: "Coursera (DeepLearning.AI)",
        url: "https://www.coursera.org/learn/generative-ai-for-everyone",
        duration: "3 weeks",
        level: "Beginner"
      },
      {
        title: "Elements of AI",
        provider: "University of Helsinki (MinnaLearn)",
        url: "https://www.elementsofai.com/",
        duration: "6 weeks",
        level: "Beginner"
      }
    ],
    practiceActivities: [
      "Explore ChatGPT, Claude, or Gemini and identify which responses use generative vs. retrieval-based approaches",
      "Read 3 articles about how LLMs are trained and summarize the key differences between fine-tuning and RAG",
      "Create a glossary of 20 AI terms and write a one-sentence definition for each in your own words"
    ]
  },
  "Practical AI Tool Usage": {
    domain: "Practical AI Tool Usage",
    description: "Develop hands-on skills for writing effective prompts, using AI tools strategically, and integrating AI into your daily work tasks.",
    courses: [
      {
        title: "Prompt Engineering for ChatGPT",
        provider: "Coursera (Vanderbilt University)",
        url: "https://www.coursera.org/learn/prompt-engineering",
        duration: "6 hours",
        level: "Beginner"
      },
      {
        title: "ChatGPT Prompt Engineering for Developers",
        provider: "DeepLearning.AI",
        url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        duration: "1 hour",
        level: "Intermediate"
      },
      {
        title: "Work Smarter with Microsoft Copilot",
        provider: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning/paths/work-smarter-with-microsoft-copilot",
        duration: "5 hours",
        level: "Beginner"
      },
      {
        title: "Google AI Essentials",
        provider: "Coursera (Google)",
        url: "https://www.coursera.org/learn/google-ai-essentials",
        duration: "4 weeks",
        level: "Beginner"
      }
    ],
    practiceActivities: [
      "Practice prompt chaining: break a complex task (e.g., writing a business proposal) into 4-5 sequential prompts",
      "Compare outputs from 3 different AI tools for the same task and evaluate which performed best and why",
      "Set up custom instructions in your preferred AI tool tailored to your role and test how it changes response quality"
    ]
  },
  "Critical Evaluation and Output Assessment": {
    domain: "Critical Evaluation and Output Assessment",
    description: "Learn to critically assess AI-generated content for accuracy, bias, and reliability before using it in professional contexts.",
    courses: [
      {
        title: "Introduction to Generative AI",
        provider: "Coursera (Google Cloud)",
        url: "https://www.coursera.org/learn/introduction-to-generative-ai",
        duration: "1 hour",
        level: "Beginner"
      },
      {
        title: "Critical Thinking & Problem Solving",
        provider: "edX (Rochester Institute of Technology)",
        url: "https://www.edx.org/learn/critical-thinking-skills/rochester-institute-of-technology-critical-thinking-problem-solving",
        duration: "4 weeks",
        level: "Intermediate"
      },
      {
        title: "AI For Business",
        provider: "Coursera (University of Pennsylvania)",
        url: "https://www.coursera.org/learn/ai-for-business-wharton",
        duration: "4 weeks",
        level: "Intermediate"
      },
      {
        title: "Trustworthy Generative AI",
        provider: "Coursera (Vanderbilt University)",
        url: "https://www.coursera.org/learn/trustworthy-generative-ai",
        duration: "3 hours",
        level: "Intermediate"
      }
    ],
    practiceActivities: [
      "Ask an AI to provide 5 statistics with citations on a topic you know well, then verify each citation against the original source",
      "Generate an AI report on a trending topic and annotate it by highlighting claims that need verification",
      "Compare an AI summary of a news article against the original article and document what was lost, distorted, or fabricated"
    ]
  },
  "Ethics, Privacy, and Responsible AI": {
    domain: "Ethics, Privacy, and Responsible AI",
    description: "Understand the ethical implications of AI use, including data privacy, algorithmic bias, responsible disclosure, and governance.",
    courses: [
      {
        title: "AI Ethics: Global Perspectives",
        provider: "edX (University of Helsinki)",
        url: "https://www.elementsofai.com/",
        duration: "5 weeks",
        level: "Intermediate"
      },
      {
        title: "Responsible AI: Applying AI Principles with Google Cloud",
        provider: "Coursera (Google Cloud)",
        url: "https://www.coursera.org/learn/responsible-ai-applying-ai-principles-with-google-cloud",
        duration: "2 hours",
        level: "Intermediate"
      },
      {
        title: "Data Privacy Fundamentals",
        provider: "Coursera (University of Pennsylvania)",
        url: "https://www.coursera.org/learn/northeastern-data-privacy",
        duration: "4 weeks",
        level: "Beginner"
      },
      {
        title: "AI and the Future of Work",
        provider: "edX (MIT)",
        url: "https://www.edx.org/learn/artificial-intelligence/massachusetts-institute-of-technology-artificial-intelligence-implications-for-business-strategy",
        duration: "6 weeks",
        level: "Intermediate"
      }
    ],
    practiceActivities: [
      "Draft an AI usage policy for your team covering data handling, disclosure, and acceptable use cases",
      "Audit one AI tool you use regularly: review its privacy policy and identify what data it collects and retains",
      "Research 3 real-world cases of AI bias and write a brief summary of what went wrong and how it could have been prevented"
    ]
  },
  "AI in the Workplace": {
    domain: "AI in the Workplace",
    description: "Learn strategies for integrating AI into professional workflows, measuring ROI, and building AI-augmented processes for your team.",
    courses: [
      {
        title: "AI in the Workplace",
        provider: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning/topics/ai-in-the-workplace",
        duration: "3 hours",
        level: "Beginner"
      },
      {
        title: "AI Product Management",
        provider: "Coursera (Duke University)",
        url: "https://www.coursera.org/specializations/ai-product-management-duke",
        duration: "3 months",
        level: "Intermediate"
      },
      {
        title: "Artificial Intelligence in Marketing",
        provider: "Coursera (University of Virginia)",
        url: "https://www.coursera.org/learn/uva-darden-artificial-intelligence-marketing",
        duration: "4 weeks",
        level: "Intermediate"
      },
      {
        title: "Generative AI: Boost Your Digital Workplace Productivity",
        provider: "Coursera (IBM)",
        url: "https://www.coursera.org/learn/generative-ai-boost-your-digital-workplace-productivity",
        duration: "2 weeks",
        level: "Beginner"
      }
    ],
    practiceActivities: [
      "Map your weekly tasks and identify 5 that could benefit from AI assistance, then test AI tools on each",
      "Run a 2-week pilot: use AI for one recurring task and track time saved, quality changes, and pain points",
      "Create a simple ROI framework comparing time invested learning/using AI tools vs. productivity gains"
    ]
  },
  "Role-Specific AI Competency": {
    domain: "Role-Specific AI Competency",
    description: "Apply AI tools and best practices within your professional domain, whether marketing, healthcare, finance, HR, education, or software development.",
    courses: [
      {
        title: "AI For Business Specialization",
        provider: "Coursera (University of Pennsylvania)",
        url: "https://www.coursera.org/specializations/ai-for-business-wharton",
        duration: "4 months",
        level: "Intermediate"
      },
      {
        title: "AI in Healthcare Specialization",
        provider: "Coursera (Stanford University)",
        url: "https://www.coursera.org/specializations/ai-healthcare",
        duration: "3 months",
        level: "Intermediate"
      },
      {
        title: "AI-Powered Software and System Design",
        provider: "Coursera (University of Alberta)",
        url: "https://www.coursera.org/specializations/ai-powered-software-and-system-design",
        duration: "3 months",
        level: "Intermediate"
      },
      {
        title: "Generative AI for Project Managers",
        provider: "Coursera (IBM)",
        url: "https://www.coursera.org/learn/generative-ai-for-project-managers",
        duration: "2 weeks",
        level: "Beginner"
      }
    ],
    practiceActivities: [
      "Identify 3 domain-specific use cases for AI in your role and prototype a workflow for the most impactful one",
      "Interview a colleague in a different department about how they use AI and identify transferable practices",
      "Build a 'before and after' case study documenting how AI changed one specific process in your work"
    ]
  }
};

export function generateStudyPlan(
  domainScores: { name: string; pct: number; level: { name: string } }[],
  overallPct: number,
  overallLevel: string
): StudyPlanData {
  // Focus on domains below competent (60%), sorted weakest first
  // If all domains are at/above 60%, include the two lowest for continued growth
  let weakDomains = domainScores.filter(d => d.pct < 60);
  if (weakDomains.length === 0) {
    weakDomains = [...domainScores].sort((a, b) => a.pct - b.pct).slice(0, 2);
  } else {
    weakDomains.sort((a, b) => a.pct - b.pct);
  }

  const domainPlans = weakDomains.map(d => {
    const plan = domainCourses[d.name];
    if (!plan) return null;

    // For very low scores, recommend all courses; for closer to 60%, recommend fewer
    const courseCount = d.pct < 30 ? 4 : d.pct < 50 ? 3 : 2;
    return {
      ...plan,
      courses: plan.courses.slice(0, courseCount),
    };
  }).filter(Boolean) as DomainPlan[];

  // Estimate weeks: ~2-3 weeks per weak domain
  const estimatedWeeks = Math.max(4, domainPlans.length * 3);

  return {
    overallLevel,
    overallPct,
    domainPlans,
    estimatedWeeks,
  };
}

export function generateStudyPlanHTML(plan: StudyPlanData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  const domainSections = plan.domainPlans.map(dp => `
    <div style="margin-bottom:32px;">
      <h2 style="font-size:18px;color:#1E40AF;margin:0 0 6px;border-bottom:2px solid #DBEAFE;padding-bottom:6px;">
        ${dp.domain}
      </h2>
      <p style="font-size:13px;color:#4B5563;margin:0 0 16px;">${dp.description}</p>

      <h3 style="font-size:14px;color:#374151;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.5px;">
        Recommended Courses
      </h3>
      ${dp.courses.map((c, i) => `
        <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:4px;">
            ${i + 1}. ${c.title}
          </div>
          <div style="font-size:12px;color:#6B7280;">
            <span style="margin-right:12px;">${c.provider}</span>
            <span style="margin-right:12px;">${c.duration}</span>
            <span>${c.level}</span>
          </div>
          <div style="font-size:12px;margin-top:4px;">
            <a href="${c.url}" style="color:#2563EB;text-decoration:none;">${c.url}</a>
          </div>
        </div>
      `).join("")}

      <h3 style="font-size:14px;color:#374151;margin:16px 0 10px;text-transform:uppercase;letter-spacing:0.5px;">
        Practice Activities
      </h3>
      <ul style="margin:0;padding-left:20px;">
        ${dp.practiceActivities.map(a => `
          <li style="font-size:13px;color:#374151;margin-bottom:8px;line-height:1.5;">
            <input type="checkbox" style="margin-right:8px;"> ${a}
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Proficiency Upskilling Plan</title>
  <style>
    @media print {
      body { padding: 20px; }
      a { color: #2563EB !important; }
      .no-print { display: none !important; }
    }
    @media (max-width: 600px) {
      body { padding: 16px !important; }
      h1 { font-size: 20px !important; }
    }
  </style>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:32px 20px;color:#111827;line-height:1.6;">

  <div style="text-align:center;margin-bottom:32px;">
    <div style="font-size:12px;font-weight:700;color:#2563EB;letter-spacing:2px;margin-bottom:4px;">AIMIA MODULE 7</div>
    <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 4px;">AI Proficiency Upskilling Plan</h1>
    <p style="font-size:13px;color:#6B7280;margin:0;">Generated on ${date}</p>
  </div>

  <div style="background:linear-gradient(135deg,#EFF6FF,#F5F3FF);border:1px solid #DBEAFE;border-radius:12px;padding:20px;margin-bottom:28px;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div>
        <div style="font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;">Current Level</div>
        <div style="font-size:20px;font-weight:700;color:#1E40AF;">${plan.overallLevel} (${plan.overallPct}%)</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;">Target Level</div>
        <div style="font-size:20px;font-weight:700;color:#059669;">Competent (60%+)</div>
      </div>
    </div>
    <div style="margin-top:12px;font-size:13px;color:#4B5563;">
      Estimated study time: <strong>${plan.estimatedWeeks} weeks</strong> at 3-5 hours per week
    </div>
  </div>

  <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:14px 16px;margin-bottom:28px;">
    <div style="font-size:13px;font-weight:600;color:#92400E;margin-bottom:6px;">How to use this plan</div>
    <ol style="margin:0;padding-left:20px;font-size:13px;color:#78350F;line-height:1.7;">
      <li>Work through domains in order, starting with your weakest areas</li>
      <li>Complete at least one course per domain before moving on</li>
      <li>Do the practice activities to reinforce what you learn</li>
      <li>Retake the AIMIA Module 7 assessment every 3-6 months to measure progress</li>
    </ol>
  </div>

  ${domainSections}

  <div style="border-top:2px solid #E5E7EB;padding-top:20px;margin-top:20px;text-align:center;">
    <p style="font-size:12px;color:#9CA3AF;margin:0;">
      AIMIA Module 7 - AI Proficiency Assessment &middot; Upskilling Plan
    </p>
    <p style="font-size:12px;color:#9CA3AF;margin:4px 0 0;">
      Retake the assessment at <strong>60%+ (Competent level)</strong> to confirm your progress
    </p>
  </div>

</body>
</html>`;
}
