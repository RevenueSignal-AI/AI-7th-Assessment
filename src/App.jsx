import { useState, useEffect, useRef } from "react";

const questions = [
  // Domain 1: AI Foundations and Concepts (Q1-Q8)
  {
    id: 1, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What does the term "large language model" (LLM) refer to?',
    options: [
      "A database that stores language translations",
      "An AI system trained on vast text data to generate and understand human language",
      "A programming language used to build AI applications",
      "A spell-check tool used in word processors"
    ],
    correct: 1
  },
  {
    id: 2, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'Which of the following best describes "machine learning"?',
    options: [
      "Programming explicit rules for every possible scenario",
      "A subset of AI where systems improve performance through exposure to data rather than explicit programming",
      "A method for computers to learn by reading textbooks",
      "Software that replaces human workers entirely"
    ],
    correct: 1
  },
  {
    id: 3, domain: "AI Foundations and Concepts", difficulty: "Competent",
    question: "What is the primary difference between generative AI and traditional AI?",
    options: [
      "Generative AI is always more accurate than traditional AI",
      "Traditional AI classifies or predicts; generative AI creates new content such as text, images, or code",
      "Generative AI does not require any data to function",
      "There is no meaningful difference between them"
    ],
    correct: 1
  },
  {
    id: 4, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What is a "neural network" in the context of AI?',
    options: [
      "A social network for AI researchers",
      "A computing system inspired by biological neural connections that processes information in layers",
      "A type of internet connection optimized for AI",
      "A database structure used exclusively for storing images"
    ],
    correct: 1
  },
  {
    id: 5, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'Which of the following is an example of "natural language processing" (NLP)?',
    options: [
      "A robot assembling car parts on a factory line",
      "A chatbot understanding and responding to a customer service question in English",
      "A self-driving car identifying a stop sign",
      "A recommendation engine suggesting movies based on viewing history"
    ],
    correct: 1
  },
  {
    id: 6, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What does "training data" refer to in AI development?',
    options: [
      "The user manual provided with AI software",
      "The dataset used to teach an AI model to recognize patterns and make predictions",
      "The test results after an AI has been deployed",
      "The code written by developers to build the AI"
    ],
    correct: 1
  },
  {
    id: 7, domain: "AI Foundations and Concepts", difficulty: "Proficient",
    question: 'What is "fine-tuning" in the context of AI models?',
    options: [
      "Adjusting the physical hardware that runs the AI",
      "Adapting a pre-trained model to perform better on a specific task or domain using additional targeted data",
      "Removing all training data from the model",
      "Translating the AI interface into a different language"
    ],
    correct: 1
  },
  {
    id: 8, domain: "AI Foundations and Concepts", difficulty: "Expert",
    question: 'What is "retrieval-augmented generation" (RAG)?',
    options: [
      "A technique for compressing AI models to run on smaller devices",
      "A method that enhances AI responses by retrieving relevant information from external knowledge sources before generating output",
      "A way to delete information from an AI model after training",
      "A regulatory framework for AI governance"
    ],
    correct: 1
  },
  // Domain 2: Practical AI Tool Usage (Q9-Q16)
  {
    id: 9, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "Which of the following is the most effective prompt for getting a useful response from an AI assistant?",
    options: [
      "Tell me about marketing",
      "Write a 300-word blog post targeting small business owners about 3 low-cost social media strategies, using a conversational tone with specific examples",
      "Do something about social media",
      "Marketing blog post please"
    ],
    correct: 1
  },
  {
    id: 10, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "When using an AI coding assistant, what is the best practice after it generates code?",
    options: [
      "Deploy it immediately to production",
      "Review the code for correctness, security vulnerabilities, and alignment with your project standards before using it",
      "Assume it is always correct because AI does not make mistakes",
      "Only use it if it runs without any errors on the first try"
    ],
    correct: 1
  },
  {
    id: 11, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is "prompt chaining" and when is it useful?',
    options: [
      "Copying the same prompt into multiple AI tools simultaneously",
      "Breaking a complex task into sequential prompts where each output feeds into the next, useful for multi-step reasoning or content creation",
      "Adding the word 'chain' to your prompts for better results",
      "A security vulnerability in AI systems"
    ],
    correct: 1
  },
  {
    id: 12, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "You need to analyze a 50-page PDF report. Which AI approach is most effective?",
    options: [
      "Paste the entire document into a chatbot and ask for a summary",
      "Upload the document to an AI tool with document analysis capabilities, then ask targeted questions about specific sections",
      "Read the document yourself because AI cannot process PDFs",
      "Ask the AI to guess what the document might contain based on the filename"
    ],
    correct: 1
  },
  {
    id: 13, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is the purpose of setting a "system prompt" or "custom instructions" in an AI tool?',
    options: [
      "To hack into the AI and change its programming",
      "To provide persistent context about your role, preferences, and desired output format so every response is tailored to your needs",
      "To make the AI respond only in code",
      "To limit the AI to answering only yes or no questions"
    ],
    correct: 1
  },
  {
    id: 14, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "Which strategy is most effective for improving an AI-generated output that is not meeting your expectations?",
    options: [
      "Repeating the exact same prompt multiple times hoping for a different result",
      "Providing specific feedback about what is wrong, adding constraints, examples of desired output, or breaking the task into smaller parts",
      "Switching to a completely different AI tool",
      "Adding the word 'please' to the prompt"
    ],
    correct: 1
  },
  {
    id: 15, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "When should you use an AI image generation tool versus a traditional design tool?",
    options: [
      "Always use AI because it produces better results",
      "Use AI for rapid concept exploration, mood boards, and initial ideation; use traditional tools for precise, brand-compliant final assets",
      "Never use AI for any visual work",
      "Only use AI if you have no design skills at all"
    ],
    correct: 1
  },
  {
    id: 16, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is an "AI agent" and how does it differ from a standard chatbot?',
    options: [
      "An AI agent is simply a chatbot with a human name",
      "An AI agent can autonomously plan and execute multi-step tasks, use external tools, and take actions, while a standard chatbot primarily responds to individual prompts",
      "An AI agent is a human who operates an AI system",
      "There is no difference; the terms are interchangeable"
    ],
    correct: 1
  },
  // Domain 3: Critical Evaluation and Output Assessment (Q17-Q22)
  {
    id: 17, domain: "Critical Evaluation and Output Assessment", difficulty: "Foundational",
    question: 'What is an AI "hallucination"?',
    options: [
      "When an AI system physically malfunctions",
      "When an AI generates confident-sounding but factually incorrect or fabricated information",
      "When an AI produces results that are too creative",
      "When an AI takes too long to respond"
    ],
    correct: 1
  },
  {
    id: 18, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "You are using AI to research a topic and it provides a statistic with a citation. What should you do?",
    options: [
      "Trust it completely because it provided a source",
      "Verify the citation by checking the original source, as AI can fabricate realistic-looking references",
      "Ignore the statistic because AI is always wrong",
      "Only trust it if the number seems reasonable to you"
    ],
    correct: 1
  },
  {
    id: 19, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "How can you identify potential bias in an AI-generated output?",
    options: [
      "AI outputs are never biased because algorithms are objective",
      "Check if the output consistently favors certain perspectives, demographics, or viewpoints and cross-reference with diverse sources",
      "Bias only exists in image generation, not in text",
      "If the output matches your own opinion, it is unbiased"
    ],
    correct: 1
  },
  {
    id: 20, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "An AI writing tool produces a paragraph that sounds polished but you are unsure about its accuracy. What is the best course of action?",
    options: [
      "Publish it as-is because it sounds professional",
      "Fact-check key claims, verify any data points, and ensure the logic is sound before using it in any professional context",
      "Delete it and write everything manually instead",
      "Ask the same AI if its output is accurate"
    ],
    correct: 1
  },
  {
    id: 21, domain: "Critical Evaluation and Output Assessment", difficulty: "Proficient",
    question: 'What does "model confidence" mean, and why does it matter for evaluating AI outputs?',
    options: [
      "It measures how expensive the AI model is to run",
      "It indicates how certain the model is about its output; low confidence outputs require more scrutiny and human verification",
      "It refers to the AI company's market confidence level",
      "It has no practical relevance to end users"
    ],
    correct: 1
  },
  {
    id: 22, domain: "Critical Evaluation and Output Assessment", difficulty: "Proficient",
    question: "When evaluating two different AI tools for a business task, which factors are most important to consider?",
    options: [
      "Only the price of the subscription",
      "Accuracy for your use case, data privacy policies, integration capabilities, output quality, and whether it handles your domain-specific content well",
      "Whichever tool has the most users globally",
      "The one that responds the fastest regardless of quality"
    ],
    correct: 1
  },
  // Domain 4: Ethics, Privacy, and Responsible AI (Q23-Q28)
  {
    id: 23, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: "A colleague wants to upload confidential client data to a free public AI chatbot to analyze it. What should you advise?",
    options: [
      "Go ahead, AI tools are always secure",
      "Do not upload confidential data to public AI tools as the data may be used for training and could be exposed; use enterprise-grade AI tools with proper data handling agreements instead",
      "Only upload it if the client will never find out",
      "It is fine as long as you delete the conversation afterward"
    ],
    correct: 1
  },
  {
    id: 24, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: 'What is "algorithmic bias" and why is it a concern?',
    options: [
      "A feature that makes AI work faster for certain users",
      "Systematic prejudice in AI outputs that stems from biased training data or design choices, which can lead to unfair or discriminatory outcomes",
      "A marketing term with no real-world impact",
      "A technical limitation that only affects image-generation AI"
    ],
    correct: 1
  },
  {
    id: 25, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Proficient",
    question: "When using AI to assist with hiring decisions, what is the most important ethical consideration?",
    options: [
      "Using AI will always make hiring more fair",
      "Ensuring the AI does not discriminate based on protected characteristics and that human oversight remains in the decision-making process",
      "Letting the AI make all final decisions to remove human bias entirely",
      "Only using AI for senior-level positions"
    ],
    correct: 1
  },
  {
    id: 26, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: "Under what circumstances should you disclose that content was created with AI assistance?",
    options: [
      "Never, because it makes you look less competent",
      "When organizational policy requires it, when transparency is expected by your audience, or when accuracy and accountability are critical such as in legal, medical, or academic contexts",
      "Only if someone directly asks you",
      "Always, for every single piece of content without exception"
    ],
    correct: 1
  },
  {
    id: 27, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Expert",
    question: 'What is "data poisoning" in the context of AI security?',
    options: [
      "Deleting data from a database",
      "Deliberately introducing misleading or malicious data into a training dataset to compromise the AI model's accuracy or behavior",
      "Encrypting data so AI cannot read it",
      "A method for cleaning corrupted data files"
    ],
    correct: 1
  },
  {
    id: 28, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: 'Which of the following best describes the principle of "human-in-the-loop" for AI systems?',
    options: [
      "A human must be present in the server room at all times",
      "Maintaining human oversight and decision-making authority at critical points in AI-driven processes, especially for high-stakes decisions",
      "Replacing all automated processes with human workers",
      "Only using AI during business hours when humans are available"
    ],
    correct: 1
  },
  // Domain 5: AI in the Workplace (Q29-Q34)
  {
    id: 29, domain: "AI in the Workplace", difficulty: "Competent",
    question: "Which of the following tasks is AI currently most reliable for in a professional setting?",
    options: [
      "Making final strategic decisions for the company",
      "Drafting initial content, summarizing documents, analyzing data patterns, and automating repetitive tasks",
      "Replacing all customer service staff entirely",
      "Guaranteeing 100% accurate financial forecasting"
    ],
    correct: 1
  },
  {
    id: 30, domain: "AI in the Workplace", difficulty: "Proficient",
    question: "How should a team approach implementing AI tools into their existing workflow?",
    options: [
      "Replace all current tools immediately with AI alternatives",
      "Start with a pilot project, identify specific pain points AI can address, train team members, measure results, and scale gradually based on demonstrated value",
      "Wait until competitors adopt AI first to learn from their mistakes",
      "Only allow the most technical team member to use AI tools"
    ],
    correct: 1
  },
  {
    id: 31, domain: "AI in the Workplace", difficulty: "Proficient",
    question: "What is the most effective way to measure the ROI of AI tool adoption in your work?",
    options: [
      "Count the number of AI tools your team subscribes to",
      "Track specific metrics such as time saved on tasks, error reduction rates, output quality improvements, and cost savings compared to the investment in AI tools and training",
      "Measure it solely by employee satisfaction with the tools",
      "ROI cannot be measured for AI tools"
    ],
    correct: 1
  },
  {
    id: 32, domain: "AI in the Workplace", difficulty: "Competent",
    question: "A manager asks you to use AI to summarize meeting notes and distribute action items. What is the best approach?",
    options: [
      "Record the meeting secretly and upload the audio to a free AI tool",
      "Use an approved AI tool to process meeting notes, then review the summary for accuracy and completeness before distributing to ensure nothing is misrepresented",
      "Tell the manager that AI cannot do this",
      "Distribute the AI summary without reviewing it to save time"
    ],
    correct: 1
  },
  {
    id: 33, domain: "AI in the Workplace", difficulty: "Proficient",
    question: 'What does it mean to create an "AI-augmented workflow"?',
    options: [
      "Replacing every step in a process with AI",
      "Strategically integrating AI at specific points in a workflow where it adds the most value while preserving human judgment for complex decisions and relationship tasks",
      "Using AI only for tasks you find boring",
      "Automating an entire department with no human involvement"
    ],
    correct: 1
  },
  {
    id: 34, domain: "AI in the Workplace", difficulty: "Competent",
    question: "How should you handle a situation where your organization has no formal AI usage policy?",
    options: [
      "Use any AI tool however you want since there are no rules",
      "Apply common-sense data privacy practices, avoid uploading sensitive information to public tools, document your AI usage, and advocate for creating a formal policy",
      "Refuse to use AI until a policy exists",
      "Only use AI tools at home, not at work"
    ],
    correct: 1
  },
  // Domain 6: Role-Specific AI Competency (Q35-Q40)
  {
    id: 35, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "A marketing team wants to use AI for content creation. Which approach balances efficiency with brand integrity?",
    options: [
      "Let AI generate all content and publish without review",
      "Use AI to generate drafts and variations, then have team members edit for brand voice, accuracy, and strategic alignment before publishing",
      "Avoid AI entirely because it cannot match brand voice",
      "Use AI only for social media posts but never for email marketing"
    ],
    correct: 1
  },
  {
    id: 36, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "In a healthcare setting, what is the most appropriate use of AI diagnostic tools?",
    options: [
      "Replace physician diagnoses entirely with AI recommendations",
      "Use AI as a decision-support tool that helps clinicians identify patterns and potential diagnoses, while maintaining physician authority over final medical decisions",
      "Only use AI for administrative tasks, never for anything clinical",
      "Allow patients to use AI diagnostic tools instead of visiting a doctor"
    ],
    correct: 1
  },
  {
    id: 37, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "A software developer is using an AI code assistant. Which practice is most important for maintaining code quality?",
    options: [
      "Accept all AI suggestions to write code faster",
      "Review every AI-generated code suggestion for security vulnerabilities, logic errors, and adherence to project coding standards before committing",
      "Never use AI code assistants because they always introduce bugs",
      "Only use AI for writing comments, not actual code"
    ],
    correct: 1
  },
  {
    id: 38, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "How can AI best support financial analysis and reporting?",
    options: [
      "AI should make all investment decisions autonomously",
      "AI can automate data gathering, identify trends, generate preliminary analysis, and flag anomalies, while human analysts validate findings and make strategic recommendations",
      "AI is not reliable enough for any financial work",
      "Use AI only for formatting spreadsheets"
    ],
    correct: 1
  },
  {
    id: 39, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "An HR team is considering AI-powered resume screening. What is the most important safeguard?",
    options: [
      "Trust the AI to be completely unbiased",
      "Regularly audit the AI screening criteria for disparate impact, ensure diverse training data, maintain human review of borderline candidates, and provide an appeal process",
      "Screen resumes manually because AI cannot read documents",
      "Only use AI screening for entry-level positions"
    ],
    correct: 1
  },
  {
    id: 40, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "An educator wants to integrate AI into their teaching practice. Which approach is most pedagogically sound?",
    options: [
      "Ban all AI use by students to maintain academic integrity",
      "Teach students how to use AI as a learning tool, set clear guidelines for appropriate use, redesign assessments to evaluate critical thinking alongside AI-assisted work, and model responsible AI usage",
      "Let students use AI for all assignments without guidance",
      "Only use AI for grading, not for instruction"
    ],
    correct: 1
  }
];

const domains = [
  { name: "AI Foundations and Concepts", count: 8, weight: "20%", color: "#2563EB" },
  { name: "Practical AI Tool Usage", count: 8, weight: "20%", color: "#7C3AED" },
  { name: "Critical Evaluation and Output Assessment", count: 6, weight: "15%", color: "#059669" },
  { name: "Ethics, Privacy, and Responsible AI", count: 6, weight: "15%", color: "#D97706" },
  { name: "AI in the Workplace", count: 6, weight: "15%", color: "#DC2626" },
  { name: "Role-Specific AI Competency", count: 6, weight: "15%", color: "#0891B2" }
];

const levels = [
  { name: "Awareness", range: "0-39%", color: "#EF4444", min: 0, max: 39 },
  { name: "Foundational", range: "40-59%", color: "#F59E0B", min: 40, max: 59 },
  { name: "Competent", range: "60-74%", color: "#10B981", min: 60, max: 74, target: true },
  { name: "Proficient", range: "75-89%", color: "#3B82F6", min: 75, max: 89 },
  { name: "Expert", range: "90-100%", color: "#8B5CF6", min: 90, max: 100 }
];

const frameworks = [
  { name: "World Economic Forum (2025)", definition: "Integrates AI tools into regular workflows with data literacy" },
  { name: "OECD AI Literacy (2025)", definition: "Can engage, create, manage, and design with AI across 22 competencies" },
  { name: "DigComp 2.2 / 3.0 (EU)", definition: "Levels 3-4 of 8: independent problem-solving with AI" },
  { name: "UNESCO AI Framework (2024)", definition: "Applies AI ethically with human-centered mindset" },
  { name: "LinkedIn Skills on Rise (2025)", definition: "Regular AI tool usage with measurable productivity gains" },
  { name: "U.S. Dept. of Labor (2026)", definition: "Intermediate Level: applies AI professionally with ethical awareness" }
];

function getLevel(pct) {
  return levels.find(l => pct >= l.min && pct <= l.max) || levels[0];
}

function ProgressBar({ value, max, color, height = 8 }) {
  return (
    <div style={{ background: "#E5E7EB", borderRadius: height / 2, height, width: "100%", overflow: "hidden" }}>
      <div style={{
        width: `${Math.min((value / max) * 100, 100)}%`,
        height: "100%",
        background: color,
        borderRadius: height / 2,
        transition: "width 0.6s ease"
      }} />
    </div>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 72, height: 72, borderRadius: 16, background: "linear-gradient(135deg, #2563EB, #7C3AED)",
          marginBottom: 16
        }}>
          <span style={{ fontSize: 36, color: "white", fontWeight: 700 }}>A</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: "8px 0 4px" }}>
          AIMIA Module 7
        </h1>
        <p style={{ fontSize: 18, color: "#6B7280", margin: 0 }}>AI Proficiency Assessment</p>
      </div>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.6, marginBottom: 24 }}>
        Measure your AI readiness against industry competency standards from the World Economic Forum,
        OECD, UNESCO, DigComp, and the U.S. Department of Labor.
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32,
        textAlign: "center"
      }}>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#2563EB" }}>40</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Questions</div>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#7C3AED" }}>6</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Domains</div>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#059669" }}>5</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Levels</div>
        </div>
      </div>
      <div style={{
        background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 16,
        marginBottom: 32, textAlign: "left"
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8", marginBottom: 6 }}>
          Target Benchmark: Level 3 - Competent (60-74%)
        </div>
        <div style={{ fontSize: 13, color: "#3B82F6", lineHeight: 1.5 }}>
          The industry-recommended threshold where you can independently integrate AI tools,
          evaluate outputs critically, and apply ethical reasoning.
        </div>
      </div>
      <button
        onClick={onStart}
        style={{
          background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "white",
          border: "none", borderRadius: 12, padding: "14px 48px", fontSize: 16,
          fontWeight: 600, cursor: "pointer", transition: "transform 0.15s",
          boxShadow: "0 4px 14px rgba(37,99,235,0.3)"
        }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Begin Assessment
      </button>
      <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 12 }}>Estimated time: 20-30 minutes</p>
    </div>
  );
}

function QuestionScreen({ question, index, total, answer, onAnswer, onNext, onPrev, currentDomain }) {
  const domainInfo = domains.find(d => d.name === question.domain);
  const domainColor = domainInfo?.color || "#2563EB";
  const domainQuestions = questions.filter(q => q.domain === question.domain);
  const domainIndex = domainQuestions.indexOf(question);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{
          display: "inline-block", background: domainColor + "18", color: domainColor,
          fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20
        }}>
          {question.domain}
        </span>
        <span style={{ fontSize: 13, color: "#9CA3AF" }}>
          {index + 1} of {total}
        </span>
      </div>
      <ProgressBar value={index + 1} max={total} color={domainColor} height={4} />

      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11, background: "#F3F4F6", color: "#6B7280",
            padding: "2px 8px", borderRadius: 10
          }}>
            Q{question.id}
          </span>
          <span style={{
            fontSize: 11,
            background: question.difficulty === "Expert" ? "#EDE9FE" :
                         question.difficulty === "Proficient" ? "#DBEAFE" :
                         question.difficulty === "Competent" ? "#D1FAE5" : "#F3F4F6",
            color: question.difficulty === "Expert" ? "#7C3AED" :
                   question.difficulty === "Proficient" ? "#2563EB" :
                   question.difficulty === "Competent" ? "#059669" : "#6B7280",
            padding: "2px 8px", borderRadius: 10
          }}>
            {question.difficulty}
          </span>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", lineHeight: 1.5, margin: "0 0 20px" }}>
          {question.question}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {question.options.map((opt, i) => {
          const selected = answer === i;
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                background: selected ? domainColor + "0D" : "white",
                border: `2px solid ${selected ? domainColor : "#E5E7EB"}`,
                borderRadius: 12, padding: "14px 16px",
                cursor: "pointer", textAlign: "left", fontSize: 14,
                color: "#1F2937", lineHeight: 1.5,
                transition: "all 0.15s"
              }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 28, height: 28, borderRadius: 8,
                background: selected ? domainColor : "#F3F4F6",
                color: selected ? "white" : "#6B7280",
                fontSize: 12, fontWeight: 700, flexShrink: 0
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ paddingTop: 3 }}>{opt}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={onPrev}
          disabled={index === 0}
          style={{
            background: "white", border: "1px solid #D1D5DB", borderRadius: 10,
            padding: "10px 20px", fontSize: 14, color: index === 0 ? "#D1D5DB" : "#374151",
            cursor: index === 0 ? "default" : "pointer", fontWeight: 500
          }}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={answer === undefined}
          style={{
            background: answer !== undefined ? domainColor : "#D1D5DB",
            color: "white", border: "none", borderRadius: 10,
            padding: "10px 24px", fontSize: 14, fontWeight: 600,
            cursor: answer !== undefined ? "pointer" : "default",
            transition: "background 0.15s"
          }}
        >
          {index === total - 1 ? "Finish Assessment" : "Next"}
        </button>
      </div>
    </div>
  );
}

function DomainTransition({ domainName, domainIndex, onContinue }) {
  const d = domains[domainIndex];
  return (
    <div style={{ textAlign: "center", maxWidth: 500, margin: "40px auto" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 56, height: 56, borderRadius: 14, background: d.color + "18", marginBottom: 16
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: d.color }}>{domainIndex + 1}</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
        Domain {domainIndex + 1} of 6
      </h2>
      <p style={{ fontSize: 16, color: d.color, fontWeight: 600, margin: "0 0 8px" }}>{d.name}</p>
      <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
        {d.count} questions &middot; {d.weight} of total score
      </p>
      <button
        onClick={onContinue}
        style={{
          background: d.color, color: "white", border: "none", borderRadius: 10,
          padding: "12px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer"
        }}
      >
        Start Domain
      </button>
    </div>
  );
}

function ResultsScreen({ answers, onRestart }) {
  const correctCount = questions.reduce((c, q, i) => c + (answers[i] === q.correct ? 1 : 0), 0);
  const totalPct = Math.round((correctCount / 40) * 100);
  const level = getLevel(totalPct);

  const domainScores = domains.map(d => {
    const qs = questions.filter(q => q.domain === d.name);
    const correct = qs.reduce((c, q) => c + (answers[questions.indexOf(q)] === q.correct ? 1 : 0), 0);
    const pct = Math.round((correct / qs.length) * 100);
    return { ...d, correct, total: qs.length, pct, level: getLevel(pct) };
  });

  const weakest = [...domainScores].sort((a, b) => a.pct - b.pct).slice(0, 2);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 96, height: 96, borderRadius: "50%",
          background: `conic-gradient(${level.color} ${totalPct * 3.6}deg, #E5E7EB ${totalPct * 3.6}deg)`,
          marginBottom: 12, position: "relative"
        }}>
          <div style={{
            width: 76, height: 76, borderRadius: "50%", background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column"
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: level.color }}>{totalPct}%</span>
          </div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
          {level.name}
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
          {correctCount} of 40 correct &middot; {totalPct} points
        </p>
      </div>

      {/* Benchmark bar */}
      <div style={{
        background: totalPct >= 60 ? "#ECFDF5" : "#FEF2F2",
        border: `1px solid ${totalPct >= 60 ? "#A7F3D0" : "#FECACA"}`,
        borderRadius: 12, padding: 16, marginBottom: 24, textAlign: "center"
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: totalPct >= 60 ? "#059669" : "#DC2626" }}>
          {totalPct >= 60
            ? "You meet the industry-recommended competency benchmark (Level 3: 60%+)"
            : "Below the industry-recommended competency benchmark (Level 3: 60%)"}
        </span>
      </div>

      {/* Proficiency scale */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          Proficiency Scale
        </h3>
        <div style={{ display: "flex", gap: 2, borderRadius: 8, overflow: "hidden", height: 28, position: "relative" }}>
          {levels.map((l, i) => (
            <div key={i} style={{
              flex: l.max - l.min + 1, background: l.name === level.name ? l.color : l.color + "30",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 600,
              color: l.name === level.name ? "white" : l.color + "90"
            }}>
              {l.name}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>
          <span>0%</span><span>40%</span><span>60%</span><span>75%</span><span>90%</span><span>100%</span>
        </div>
      </div>

      {/* Domain breakdown */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
          Domain Breakdown
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {domainScores.map((d, i) => (
            <div key={i} style={{
              background: "white", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 16px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{d.name}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: d.level.color,
                  background: d.level.color + "15", padding: "2px 8px", borderRadius: 10
                }}>
                  {d.pct}% &middot; {d.level.name}
                </span>
              </div>
              <ProgressBar value={d.pct} max={100} color={d.color} height={6} />
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
                {d.correct}/{d.total} correct &middot; Weight: {d.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gap Analysis */}
      <div style={{
        background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 16, marginBottom: 24
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#92400E", margin: "0 0 8px" }}>
          Priority Development Areas
        </h3>
        {weakest.map((d, i) => (
          <div key={i} style={{ fontSize: 13, color: "#78350F", marginBottom: 4 }}>
            {i + 1}. <strong>{d.name}</strong> ({d.pct}%) - {d.pct < 60 ? "Below benchmark" : "At benchmark, room to grow"}
          </div>
        ))}
      </div>

      {/* Industry Benchmark */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          Industry Benchmark Comparison
        </h3>
        <div style={{
          border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden"
        }}>
          {frameworks.map((f, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", borderBottom: i < frameworks.length - 1 ? "1px solid #F3F4F6" : "none",
              background: i % 2 === 0 ? "white" : "#FAFAFA"
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{f.name}</span>
              <span style={{ fontSize: 12, color: "#6B7280", textAlign: "right", maxWidth: "55%" }}>
                {f.definition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Restart */}
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <button
          onClick={onRestart}
          style={{
            background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "white",
            border: "none", borderRadius: 12, padding: "12px 36px", fontSize: 15,
            fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(37,99,235,0.3)"
          }}
        >
          Retake Assessment
        </button>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>
          Recommended: retake every 3-6 months to track growth
        </p>
      </div>
    </div>
  );
}

export default function AIMIAModule7() {
  const [screen, setScreen] = useState("welcome"); // welcome, transition, question, results
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentDomainIdx, setCurrentDomainIdx] = useState(0);
  const containerRef = useRef(null);

  const scrollTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const startAssessment = () => {
    setCurrentDomainIdx(0);
    setScreen("transition");
    scrollTop();
  };

  const handleAnswer = (optionIdx) => {
    setAnswers(prev => ({ ...prev, [currentQ]: optionIdx }));
  };

  const getDomainForQuestion = (qIndex) => {
    const q = questions[qIndex];
    return domains.findIndex(d => d.name === q.domain);
  };

  const handleNext = () => {
    if (currentQ === questions.length - 1) {
      setScreen("results");
      scrollTop();
      return;
    }
    const nextQ = currentQ + 1;
    const currentDomain = getDomainForQuestion(currentQ);
    const nextDomain = getDomainForQuestion(nextQ);

    if (nextDomain !== currentDomain) {
      setCurrentDomainIdx(nextDomain);
      setCurrentQ(nextQ);
      setScreen("transition");
    } else {
      setCurrentQ(nextQ);
    }
    scrollTop();
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      scrollTop();
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQ(0);
    setCurrentDomainIdx(0);
    setScreen("welcome");
    scrollTop();
  };

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#F9FAFB", minHeight: "100vh", padding: "32px 20px",
        overflowY: "auto", maxHeight: "100vh", boxSizing: "border-box"
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 28, opacity: screen === "welcome" ? 0 : 1 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", letterSpacing: 2 }}>
          AIMIA
        </span>
        <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 8 }}>Module 7</span>
      </div>

      {screen === "welcome" && <WelcomeScreen onStart={startAssessment} />}

      {screen === "transition" && (
        <DomainTransition
          domainName={domains[currentDomainIdx].name}
          domainIndex={currentDomainIdx}
          onContinue={() => { setScreen("question"); scrollTop(); }}
        />
      )}

      {screen === "question" && (
        <QuestionScreen
          question={questions[currentQ]}
          index={currentQ}
          total={questions.length}
          answer={answers[currentQ]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          currentDomain={questions[currentQ].domain}
        />
      )}

      {screen === "results" && (
        <ResultsScreen answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}