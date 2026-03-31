export interface Question {
  id: number;
  domain: string;
  difficulty: string;
  question: string;
  options: string[];
  correct: number;
}

interface RawQuestion {
  id: number;
  domain: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildQuestions(): Question[] {
  return rawQuestions.map((q) => {
    const shuffled = shuffle(q.options);
    return {
      id: q.id,
      domain: q.domain,
      difficulty: q.difficulty,
      question: q.question,
      options: shuffled,
      correct: shuffled.indexOf(q.correctAnswer),
    };
  });
}

const rawQuestions: RawQuestion[] = [
  // Domain 1: AI Foundations and Concepts (Q1-Q8)
  {
    id: 1, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What does the term "large language model" (LLM) refer to?',
    options: [
      "A rules-based system that matches user phrases to pre-written response templates",
      "An AI system trained on vast amounts of text data to understand and generate human language",
      "A search engine optimized to process and rank natural language queries",
      "A neural network designed specifically to translate between programming languages"
    ],
    correctAnswer: "An AI system trained on vast amounts of text data to understand and generate human language"
  },
  {
    id: 2, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'Which of the following best describes "machine learning"?',
    options: [
      "An approach where engineers program every possible decision rule the system might encounter",
      "A subset of AI where systems improve performance through exposure to data rather than explicit programming",
      "A process where AI reads technical documentation to acquire domain knowledge",
      "A branch of computer science focused on building robots that physically mimic human behavior"
    ],
    correctAnswer: "A subset of AI where systems improve performance through exposure to data rather than explicit programming"
  },
  {
    id: 3, domain: "AI Foundations and Concepts", difficulty: "Competent",
    question: "What is the primary difference between generative AI and traditional AI?",
    options: [
      "Generative AI relies on labeled datasets while traditional AI works without any training data",
      "Traditional AI classifies or predicts; generative AI creates new content such as text, images, or code",
      "Traditional AI handles creative tasks while generative AI focuses on structured data analysis",
      "Generative AI operates in real time while traditional AI requires offline processing"
    ],
    correctAnswer: "Traditional AI classifies or predicts; generative AI creates new content such as text, images, or code"
  },
  {
    id: 4, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What is a "neural network" in the context of AI?',
    options: [
      "A distributed database architecture for storing training data across multiple servers",
      "A computing system modeled on biological neural connections that processes information in layers",
      "An algorithm that applies a fixed set of mathematical rules to classify inputs",
      "A communications protocol enabling different AI systems to exchange data securely"
    ],
    correctAnswer: "A computing system modeled on biological neural connections that processes information in layers"
  },
  {
    id: 5, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'Which of the following is an example of "natural language processing" (NLP)?',
    options: [
      "A self-driving car detecting pedestrians and adjusting its speed in real time",
      "A chatbot understanding and responding to a customer service question",
      "A fraud detection system flagging unusual patterns in financial transactions",
      "A recommendation algorithm suggesting products based on past purchase history"
    ],
    correctAnswer: "A chatbot understanding and responding to a customer service question"
  },
  {
    id: 6, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What does "training data" refer to in AI development?',
    options: [
      "The configuration settings that define how a model processes new requests",
      "The dataset used to teach an AI model to recognize patterns and make predictions",
      "The benchmarks used to evaluate a deployed model's real-world accuracy",
      "The documentation describing how developers built and tested the AI system"
    ],
    correctAnswer: "The dataset used to teach an AI model to recognize patterns and make predictions"
  },
  {
    id: 7, domain: "AI Foundations and Concepts", difficulty: "Proficient",
    question: 'What is "fine-tuning" in the context of AI models?',
    options: [
      "Training a new model entirely from scratch using a smaller, more curated dataset",
      "Adapting a pre-trained model to perform better on a specific task or domain using additional targeted data",
      "Adjusting model outputs manually through a human review and correction interface",
      "Compressing a large model into a smaller version that runs faster on limited hardware"
    ],
    correctAnswer: "Adapting a pre-trained model to perform better on a specific task or domain using additional targeted data"
  },
  {
    id: 8, domain: "AI Foundations and Concepts", difficulty: "Expert",
    question: 'What is "retrieval-augmented generation" (RAG)?',
    options: [
      "A technique for training models on real-time data streams to keep their knowledge current",
      "A method that enhances AI responses by retrieving relevant information from external sources before generating output",
      "A process for rewriting an AI's training data to correct factual errors after deployment",
      "A framework for combining outputs from multiple AI models into a single response"
    ],
    correctAnswer: "A method that enhances AI responses by retrieving relevant information from external sources before generating output"
  },
  // Domain 2: Practical AI Tool Usage (Q9-Q16)
  {
    id: 9, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "Which of the following is the most effective prompt for getting a useful response from an AI assistant?",
    options: [
      "Write a comprehensive overview of all social media platforms and their suitability for different business types",
      "Write a 300-word blog post targeting small business owners about 3 low-cost social media strategies, using a conversational tone with specific examples",
      "Summarize the key digital marketing trends from the past five years and how they apply to content creation",
      "Create a blog post about social media marketing for businesses, covering the main points thoroughly"
    ],
    correctAnswer: "Write a 300-word blog post targeting small business owners about 3 low-cost social media strategies, using a conversational tone with specific examples"
  },
  {
    id: 10, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "When using an AI coding assistant, what is the best practice after it generates code?",
    options: [
      "Run it through an automated linter to catch syntax errors before committing",
      "Review the code for correctness, security vulnerabilities, and alignment with your project standards before using it",
      "Test it in a sandbox environment to verify it executes without runtime errors",
      "Ask the AI to explain what the code does and trust that explanation as a quality check"
    ],
    correctAnswer: "Review the code for correctness, security vulnerabilities, and alignment with your project standards before using it"
  },
  {
    id: 11, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is "prompt chaining" and when is it useful?',
    options: [
      "Running the same prompt several times and combining the strongest elements of each response",
      "Breaking a complex task into sequential prompts where each output feeds into the next, useful for multi-step reasoning or content creation",
      "Connecting multiple AI tools in sequence so each one specializes in a different part of a task",
      "Using follow-up prompts to correct specific errors in a previous AI-generated response"
    ],
    correctAnswer: "Breaking a complex task into sequential prompts where each output feeds into the next, useful for multi-step reasoning or content creation"
  },
  {
    id: 12, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "You need to analyze a 50-page PDF report. Which AI approach is most effective?",
    options: [
      "Copy the executive summary into a chatbot and ask it to infer the rest of the document's content",
      "Upload the document to an AI tool with document analysis capabilities, then ask targeted questions about specific sections",
      "Use an AI tool to convert the PDF to text, then paste the full text into a general chatbot",
      "Ask the AI to generate a summary based on the document title and key headings only"
    ],
    correctAnswer: "Upload the document to an AI tool with document analysis capabilities, then ask targeted questions about specific sections"
  },
  {
    id: 13, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is the purpose of setting a "system prompt" or "custom instructions" in an AI tool?',
    options: [
      "To restrict the AI to a specific topic area and prevent it from responding to unrelated questions",
      "To provide persistent context about your role, preferences, and desired output format so every response is tailored to your needs",
      "To improve accuracy by telling the AI which of its training sources it should prioritize",
      "To configure safety filters that prevent the AI from generating certain types of content"
    ],
    correctAnswer: "To provide persistent context about your role, preferences, and desired output format so every response is tailored to your needs"
  },
  {
    id: 14, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "Which strategy is most effective for improving an AI-generated output that is not meeting your expectations?",
    options: [
      "Rephrase the original prompt using synonyms and slightly different sentence structure",
      "Provide specific feedback on what is wrong, add constraints, give examples of the desired output, or break the task into smaller steps",
      "Switch to a more capable AI model to see if it handles the task more effectively",
      "Ask the AI to critique its own response and then generate a revised version"
    ],
    correctAnswer: "Provide specific feedback on what is wrong, add constraints, give examples of the desired output, or break the task into smaller steps"
  },
  {
    id: 15, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "When should you use an AI image generation tool versus a traditional design tool?",
    options: [
      "Use AI when you need photorealistic outputs and traditional tools when working with vector graphics",
      "Use AI for rapid concept exploration, mood boards, and initial ideation; use traditional tools for precise, brand-compliant final assets",
      "Use traditional tools for early-stage concepts and AI to refine and polish the final design",
      "Use AI for client-facing deliverables since it produces more visually consistent results"
    ],
    correctAnswer: "Use AI for rapid concept exploration, mood boards, and initial ideation; use traditional tools for precise, brand-compliant final assets"
  },
  {
    id: 16, domain: "Practical AI Tool Usage", difficulty: "Proficient",
    question: 'What is an "AI agent" and how does it differ from a standard chatbot?',
    options: [
      "An AI agent is a fine-tuned chatbot adapted for a specific professional domain or industry",
      "An AI agent can autonomously plan and execute multi-step tasks, use external tools, and take actions, while a standard chatbot primarily responds to individual prompts",
      "Chatbots use large language models while agents rely on older rule-based architectures",
      "AI agents operate with larger context windows, allowing them to remember longer conversations"
    ],
    correctAnswer: "An AI agent can autonomously plan and execute multi-step tasks, use external tools, and take actions, while a standard chatbot primarily responds to individual prompts"
  },
  // Domain 3: Critical Evaluation and Output Assessment (Q17-Q22)
  {
    id: 17, domain: "Critical Evaluation and Output Assessment", difficulty: "Foundational",
    question: 'What is an AI "hallucination"?',
    options: [
      "When an AI misunderstands the intent of a prompt and produces an off-topic response",
      "When an AI generates confident-sounding but factually incorrect or fabricated information",
      "When an AI produces inconsistent answers to the same question asked multiple times",
      "When an AI draws on outdated training data and provides information that is no longer accurate"
    ],
    correctAnswer: "When an AI generates confident-sounding but factually incorrect or fabricated information"
  },
  {
    id: 18, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "You are using AI to research a topic and it provides a statistic with a citation. What should you do?",
    options: [
      "Cross-reference the statistic with other AI tools to see if they produce the same figure",
      "Verify the citation by checking the original source, as AI can fabricate realistic-looking references",
      "Accept it as reliable since AI tools are trained to cite only peer-reviewed sources",
      "Use it if the statistic is consistent with other information you already know to be accurate"
    ],
    correctAnswer: "Verify the citation by checking the original source, as AI can fabricate realistic-looking references"
  },
  {
    id: 19, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "How can you identify potential bias in an AI-generated output?",
    options: [
      "Ask the AI to review its own output and flag any statements that could be considered biased",
      "Check whether the output consistently favors certain perspectives, demographics, or viewpoints, and cross-reference with diverse sources",
      "Run the same prompt multiple times and treat any variation in responses as an indicator of bias",
      "Compare the output against a different AI tool and treat consistent answers as unbiased"
    ],
    correctAnswer: "Check whether the output consistently favors certain perspectives, demographics, or viewpoints, and cross-reference with diverse sources"
  },
  {
    id: 20, domain: "Critical Evaluation and Output Assessment", difficulty: "Competent",
    question: "An AI writing tool produces a paragraph that sounds polished but you are unsure about its accuracy. What is the best course of action?",
    options: [
      "Edit the paragraph for tone and style, since professional language is a reliable indicator of accuracy",
      "Fact-check key claims, verify any data points, and ensure the logic is sound before using it in any professional context",
      "Have a colleague read it to assess whether it sounds credible before you publish it",
      "Run it through a plagiarism checker to confirm the content is original and therefore trustworthy"
    ],
    correctAnswer: "Fact-check key claims, verify any data points, and ensure the logic is sound before using it in any professional context"
  },
  {
    id: 21, domain: "Critical Evaluation and Output Assessment", difficulty: "Proficient",
    question: 'What does "model confidence" mean, and why does it matter for evaluating AI outputs?',
    options: [
      "It reflects how well the model performed on benchmark tests during initial evaluation",
      "It indicates how certain the model is about its output; outputs with lower confidence require more scrutiny and human verification",
      "It measures the probability that the model encountered similar data during training",
      "It describes how quickly the model processes requests relative to its computational limits"
    ],
    correctAnswer: "It indicates how certain the model is about its output; outputs with lower confidence require more scrutiny and human verification"
  },
  {
    id: 22, domain: "Critical Evaluation and Output Assessment", difficulty: "Proficient",
    question: "When evaluating two different AI tools for a business task, which factors are most important to consider?",
    options: [
      "The size of each company's user base and how long each tool has been available on the market",
      "Accuracy for your use case, data privacy policies, integration capabilities, output quality, and domain-specific performance",
      "Response speed, subscription pricing, and whether the interface requires technical training to use",
      "The number of supported languages and whether a free trial period is offered"
    ],
    correctAnswer: "Accuracy for your use case, data privacy policies, integration capabilities, output quality, and domain-specific performance"
  },
  // Domain 4: Ethics, Privacy, and Responsible AI (Q23-Q28)
  {
    id: 23, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: "A colleague wants to upload confidential client data to a free public AI chatbot to analyze it. What should you advise?",
    options: [
      "Remove all names and identifying details before uploading so the data is technically anonymized",
      "Do not upload confidential data to public AI tools as it may be used for training or become exposed; use enterprise tools with proper data handling agreements instead",
      "Check the tool's privacy policy first and proceed only if it states that conversation data is not stored",
      "Limit the upload to a summary of the data rather than the raw files to reduce the exposure risk"
    ],
    correctAnswer: "Do not upload confidential data to public AI tools as it may be used for training or become exposed; use enterprise tools with proper data handling agreements instead"
  },
  {
    id: 24, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: 'What is "algorithmic bias" and why is it a concern?',
    options: [
      "The tendency of AI models to favor more common patterns in data, reducing accuracy on edge cases",
      "Systematic errors in AI outputs that result from biased training data or design choices, leading to unfair or discriminatory outcomes",
      "Differences in AI performance across different hardware configurations or operating environments",
      "The capability gap between AI tools built by well-funded companies and those from smaller organizations"
    ],
    correctAnswer: "Systematic errors in AI outputs that result from biased training data or design choices, leading to unfair or discriminatory outcomes"
  },
  {
    id: 25, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Proficient",
    question: "When using AI to assist with hiring decisions, what is the most important ethical consideration?",
    options: [
      "Validating that the AI's scoring criteria align with the technical requirements of each specific role",
      "Ensuring the AI does not discriminate based on protected characteristics and that human oversight remains in the decision-making process",
      "Confirming that all candidates receive the same questions in the same order during AI screening",
      "Ensuring the AI has been trained on a large enough dataset to make statistically reliable comparisons"
    ],
    correctAnswer: "Ensuring the AI does not discriminate based on protected characteristics and that human oversight remains in the decision-making process"
  },
  {
    id: 26, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: "Under what circumstances should you disclose that content was created with AI assistance?",
    options: [
      "Whenever the AI contributed more than minor edits such as grammar or spell-checking",
      "When organizational policy requires it, when your audience expects transparency, or when accuracy and accountability are critical — such as in legal, medical, or academic contexts",
      "Only when the content will be published externally, not for internal business communications",
      "When you are uncertain the content meets quality standards and want to manage audience expectations"
    ],
    correctAnswer: "When organizational policy requires it, when your audience expects transparency, or when accuracy and accountability are critical — such as in legal, medical, or academic contexts"
  },
  {
    id: 27, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Expert",
    question: 'What is "data poisoning" in the context of AI security?',
    options: [
      "Exposing a model to low-quality or redundant training examples that gradually degrade its performance",
      "Deliberately introducing misleading or malicious data into a training dataset to corrupt the model's behavior or accuracy",
      "Extracting sensitive information from a deployed model by crafting targeted adversarial prompts",
      "Overloading a model's API with excessive requests to degrade its availability and response quality"
    ],
    correctAnswer: "Deliberately introducing misleading or malicious data into a training dataset to corrupt the model's behavior or accuracy"
  },
  {
    id: 28, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: 'Which of the following best describes the principle of "human-in-the-loop" for AI systems?',
    options: [
      "Requiring a human to manually label all training data before it can be used to update a model",
      "Maintaining human oversight and decision-making authority at critical points in AI-driven processes, especially for high-stakes outcomes",
      "Ensuring a human reviews every single AI-generated output before it is stored or acted upon",
      "Having a developer on call to intervene whenever an AI system encounters an unexpected error"
    ],
    correctAnswer: "Maintaining human oversight and decision-making authority at critical points in AI-driven processes, especially for high-stakes outcomes"
  },
  // Domain 5: AI in the Workplace (Q29-Q34)
  {
    id: 29, domain: "AI in the Workplace", difficulty: "Competent",
    question: "Which of the following tasks is AI currently most reliable for in a professional setting?",
    options: [
      "Conducting stakeholder interviews, facilitating workshops, and building cross-functional alignment",
      "Drafting initial content, summarizing documents, analyzing patterns in data, and automating repetitive tasks",
      "Negotiating vendor contracts, managing client relationships, and resolving escalated complaints",
      "Designing organizational strategy, evaluating cultural fit, and setting long-term business priorities"
    ],
    correctAnswer: "Drafting initial content, summarizing documents, analyzing patterns in data, and automating repetitive tasks"
  },
  {
    id: 30, domain: "AI in the Workplace", difficulty: "Proficient",
    question: "How should a team approach implementing AI tools into their existing workflow?",
    options: [
      "Survey team members on their preferences and purchase the tool with the highest approval rating",
      "Start with a focused pilot, identify pain points AI can address, train team members, measure outcomes, and scale gradually based on demonstrated value",
      "Hire an external consultant to design a comprehensive AI strategy before introducing any tools",
      "Deploy the most advanced available tool across all workflows simultaneously to maximize adoption speed"
    ],
    correctAnswer: "Start with a focused pilot, identify pain points AI can address, train team members, measure outcomes, and scale gradually based on demonstrated value"
  },
  {
    id: 31, domain: "AI in the Workplace", difficulty: "Proficient",
    question: "What is the most effective way to measure the ROI of AI tool adoption in your work?",
    options: [
      "Compare team headcount before and after AI adoption to quantify the reduction in labor costs",
      "Track metrics such as time saved, error reduction rates, output quality improvements, and cost savings relative to the investment in tools and training",
      "Survey employees each quarter and treat high satisfaction scores as a proxy for business value",
      "Monitor tasks completed per week and compare that figure to the monthly subscription cost"
    ],
    correctAnswer: "Track metrics such as time saved, error reduction rates, output quality improvements, and cost savings relative to the investment in tools and training"
  },
  {
    id: 32, domain: "AI in the Workplace", difficulty: "Competent",
    question: "A manager asks you to use AI to summarize meeting notes and distribute action items. What is the best approach?",
    options: [
      "Use the AI tool's auto-send feature to distribute the summary immediately after the meeting ends",
      "Use an approved AI tool to process the meeting notes, then review the summary for accuracy and completeness before distributing it",
      "Transcribe the meeting verbatim using AI and share the full transcript rather than a generated summary",
      "Ask the AI to generate a summary from each participant's perspective and share all versions"
    ],
    correctAnswer: "Use an approved AI tool to process the meeting notes, then review the summary for accuracy and completeness before distributing it"
  },
  {
    id: 33, domain: "AI in the Workplace", difficulty: "Proficient",
    question: 'What does it mean to create an "AI-augmented workflow"?',
    options: [
      "Replacing the most time-consuming workflow steps with AI tools regardless of their complexity",
      "Strategically integrating AI at points in a workflow where it adds the most value while preserving human judgment for complex decisions and relationship-driven tasks",
      "Building a parallel AI-driven process that runs alongside existing workflows until fully validated",
      "Documenting every workflow step and assigning each one to either a human or an AI based on speed"
    ],
    correctAnswer: "Strategically integrating AI at points in a workflow where it adds the most value while preserving human judgment for complex decisions and relationship-driven tasks"
  },
  {
    id: 34, domain: "AI in the Workplace", difficulty: "Competent",
    question: "How should you handle a situation where your organization has no formal AI usage policy?",
    options: [
      "Identify what tools competitors are using publicly and mirror their approach as a working baseline",
      "Apply common-sense data privacy practices, avoid uploading sensitive information to public tools, document your AI usage, and advocate for creating a formal policy",
      "Limit AI use to low-risk administrative tasks and wait for leadership to define acceptable boundaries",
      "Request written approval from your manager for each AI tool you plan to use before getting started"
    ],
    correctAnswer: "Apply common-sense data privacy practices, avoid uploading sensitive information to public tools, document your AI usage, and advocate for creating a formal policy"
  },
  // Domain 6: Role-Specific AI Competency (Q35-Q40)
  {
    id: 35, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "A marketing team wants to use AI for content creation. Which approach balances efficiency with brand integrity?",
    options: [
      "Train the AI on existing brand assets so it can produce final-quality content without human editing",
      "Use AI to generate drafts and variations, then have team members edit for brand voice, accuracy, and strategic alignment before publishing",
      "Use AI for ideation only and have copywriters produce all written content entirely from scratch",
      "Reserve AI for high-volume, low-visibility content and rely on human writers for key campaigns"
    ],
    correctAnswer: "Use AI to generate drafts and variations, then have team members edit for brand voice, accuracy, and strategic alignment before publishing"
  },
  {
    id: 36, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "In a healthcare setting, what is the most appropriate use of AI diagnostic tools?",
    options: [
      "Deploy AI in lower-stakes departments first and expand access once accuracy benchmarks are consistently met",
      "Use AI as a decision-support tool to help clinicians identify patterns and possible diagnoses, while physicians retain final authority over medical decisions",
      "Allow AI to handle routine diagnoses independently and involve physicians only for complex or unusual cases",
      "Use AI primarily to generate second opinions for cases where the treating physician is already uncertain"
    ],
    correctAnswer: "Use AI as a decision-support tool to help clinicians identify patterns and possible diagnoses, while physicians retain final authority over medical decisions"
  },
  {
    id: 37, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "A software developer is using an AI code assistant. Which practice is most important for maintaining code quality?",
    options: [
      "Run all AI-generated code through automated tests and accept it if every test case passes",
      "Review every AI-generated suggestion for security vulnerabilities, logic errors, and adherence to project coding standards before committing",
      "Accept AI suggestions for boilerplate and utility code but write all core business logic manually",
      "Have a second developer review AI-generated code only when it exceeds a certain length or complexity"
    ],
    correctAnswer: "Review every AI-generated suggestion for security vulnerabilities, logic errors, and adherence to project coding standards before committing"
  },
  {
    id: 38, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "How can AI best support financial analysis and reporting?",
    options: [
      "AI can replace the modeling and forecasting steps while humans focus solely on client communication",
      "AI can automate data gathering, identify trends, generate preliminary analysis, and flag anomalies, while human analysts validate findings and make strategic recommendations",
      "AI is best suited for generating executive dashboards and narrative summaries from existing reports",
      "AI can monitor real-time market data and execute trades within pre-approved risk parameters"
    ],
    correctAnswer: "AI can automate data gathering, identify trends, generate preliminary analysis, and flag anomalies, while human analysts validate findings and make strategic recommendations"
  },
  {
    id: 39, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "An HR team is considering AI-powered resume screening. What is the most important safeguard?",
    options: [
      "Use the AI to rank candidates and have recruiters focus their attention on the top-scoring tier",
      "Regularly audit the screening criteria for disparate impact, ensure diverse training data, maintain human review for borderline candidates, and provide an appeal process",
      "Disclose to candidates that AI is used in screening so they can optimize their resumes accordingly",
      "Validate the AI's accuracy by comparing its rankings to those of your most experienced recruiter"
    ],
    correctAnswer: "Regularly audit the screening criteria for disparate impact, ensure diverse training data, maintain human review for borderline candidates, and provide an appeal process"
  },
  {
    id: 40, domain: "Role-Specific AI Competency", difficulty: "Proficient",
    question: "An educator wants to integrate AI into their teaching practice. Which approach is most pedagogically sound?",
    options: [
      "Introduce AI tools gradually by making them available for optional enrichment activities before formal use",
      "Teach students to use AI as a learning tool, set clear usage guidelines, redesign assessments to evaluate critical thinking alongside AI-assisted work, and model responsible AI use",
      "Focus AI integration on grading and administrative tasks to preserve classroom time for direct instruction",
      "Allow students to choose whether to use AI tools and adjust grading criteria based on their individual choice"
    ],
    correctAnswer: "Teach students to use AI as a learning tool, set clear usage guidelines, redesign assessments to evaluate critical thinking alongside AI-assisted work, and model responsible AI use"
  }
];
