import type { Lang } from "./i18n";
import { t, getDomainName } from "./i18n";

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

type DomainContent = {
  description: string;
  practiceActivities: string[];
};

// Domain content by language, keyed by English domain name.
const domainContent: Record<Lang, Record<string, DomainContent>> = {
  en: {
    "AI Foundations and Concepts": {
      description: "Build a solid understanding of core AI concepts including machine learning, neural networks, LLMs, and how modern AI systems work.",
      practiceActivities: [
        "Explore ChatGPT, Claude, or Gemini and identify which responses use generative vs. retrieval-based approaches",
        "Read 3 articles about how LLMs are trained and summarize the key differences between fine-tuning and RAG",
        "Create a glossary of 20 AI terms and write a one-sentence definition for each in your own words"
      ],
    },
    "Practical AI Tool Usage": {
      description: "Develop hands-on skills for writing effective prompts, using AI tools strategically, and integrating AI into your daily work tasks.",
      practiceActivities: [
        "Practice prompt chaining: break a complex task (e.g., writing a business proposal) into 4-5 sequential prompts",
        "Compare outputs from 3 different AI tools for the same task and evaluate which performed best and why",
        "Set up custom instructions in your preferred AI tool tailored to your role and test how it changes response quality"
      ],
    },
    "Critical Evaluation and Output Assessment": {
      description: "Learn to critically assess AI-generated content for accuracy, bias, and reliability before using it in professional contexts.",
      practiceActivities: [
        "Ask an AI to provide 5 statistics with citations on a topic you know well, then verify each citation against the original source",
        "Generate an AI report on a trending topic and annotate it by highlighting claims that need verification",
        "Compare an AI summary of a news article against the original article and document what was lost, distorted, or fabricated"
      ],
    },
    "Ethics, Privacy, and Responsible AI": {
      description: "Understand the ethical implications of AI use, including data privacy, algorithmic bias, responsible disclosure, and governance.",
      practiceActivities: [
        "Draft an AI usage policy for your team covering data handling, disclosure, and acceptable use cases",
        "Audit one AI tool you use regularly: review its privacy policy and identify what data it collects and retains",
        "Research 3 real-world cases of AI bias and write a brief summary of what went wrong and how it could have been prevented"
      ],
    },
    "AI in the Workplace": {
      description: "Learn strategies for integrating AI into professional workflows, measuring ROI, and building AI-augmented processes for your team.",
      practiceActivities: [
        "Map your weekly tasks and identify 5 that could benefit from AI assistance, then test AI tools on each",
        "Run a 2-week pilot: use AI for one recurring task and track time saved, quality changes, and pain points",
        "Create a simple ROI framework comparing time invested learning/using AI tools vs. productivity gains"
      ],
    },
    "Role-Specific AI Competency": {
      description: "Apply AI tools and best practices within your professional domain, whether marketing, healthcare, finance, HR, education, or software development.",
      practiceActivities: [
        "Identify 3 domain-specific use cases for AI in your role and prototype a workflow for the most impactful one",
        "Interview a colleague in a different department about how they use AI and identify transferable practices",
        "Build a 'before and after' case study documenting how AI changed one specific process in your work"
      ],
    },
  },
  "zh-TW": {
    "AI Foundations and Concepts": {
      description: "建立對 AI 核心概念的紮實理解，包括機器學習、神經網路、大型語言模型（LLM），以及現代 AI 系統的運作原理。",
      practiceActivities: [
        "試用 ChatGPT、Claude 或 Gemini，並辨識哪些回覆採用生成式方法、哪些採用檢索式方法",
        "閱讀 3 篇關於 LLM 訓練的文章，歸納微調（fine-tuning）與 RAG 之間的主要差異",
        "整理 20 個 AI 術語的詞彙表，並以自己的話為每個詞寫一句話的定義"
      ],
    },
    "Practical AI Tool Usage": {
      description: "培養撰寫有效提示、策略性運用 AI 工具，以及將 AI 融入日常工作的實作能力。",
      practiceActivities: [
        "練習提示串接：將複雜任務（例如撰寫商業提案）拆解為 4-5 個連續提示",
        "對同一任務比較 3 款不同 AI 工具的輸出，評估何者表現最佳及其原因",
        "在常用 AI 工具中設定貼合您職位的自訂指示，並測試對回覆品質的影響"
      ],
    },
    "Critical Evaluation and Output Assessment": {
      description: "學習在專業情境中使用前，以批判性角度評估 AI 產出的正確性、偏誤與可靠性。",
      practiceActivities: [
        "就您熟悉的主題，請 AI 提供 5 則附引用的統計數據，並逐一查對原始來源",
        "請 AI 產出一份熱門主題的報告，並在需要驗證的陳述上標註",
        "比較 AI 對某篇新聞的摘要與原文，記錄遺漏、扭曲或虛構的內容"
      ],
    },
    "Ethics, Privacy, and Responsible AI": {
      description: "理解 AI 使用的倫理意涵，包括資料隱私、演算法偏誤、負責任揭露與治理。",
      practiceActivities: [
        "為您的團隊草擬一份 AI 使用政策，涵蓋資料處理、揭露機制與可接受的使用情境",
        "審視一款您日常使用的 AI 工具：閱讀其隱私政策，辨識其蒐集與保留的資料類型",
        "研究 3 個真實世界的 AI 偏誤案例，簡要說明出錯原因與可能的預防方式"
      ],
    },
    "AI in the Workplace": {
      description: "學習將 AI 整合至專業工作流程、衡量投資報酬率，並為團隊打造 AI 強化流程的策略。",
      practiceActivities: [
        "盤點您每週的工作內容，找出 5 項可受惠於 AI 的任務，並逐一測試合適的 AI 工具",
        "執行為期 2 週的試點：以 AI 處理一項週期性任務，追蹤節省時間、品質變化與痛點",
        "建立一套簡易的 ROI 框架，比較學習/使用 AI 工具所投入的時間與產能提升"
      ],
    },
    "Role-Specific AI Competency": {
      description: "於您的專業領域（行銷、醫療、財務、人資、教育或軟體開發等）內應用 AI 工具與最佳實務。",
      practiceActivities: [
        "針對您的職位找出 3 個領域專屬的 AI 使用情境，並為影響最大的情境設計工作流程原型",
        "訪談不同部門的同事如何使用 AI，找出可轉移的做法",
        "建立「導入前 vs. 導入後」的案例研究，記錄 AI 如何改變您工作中的某項流程"
      ],
    },
  },
  "zh-HK": {
    "AI Foundations and Concepts": {
      description: "建立對 AI 核心概念的紮實理解，包括機器學習、神經網絡、大型語言模型（LLM），以及現代 AI 系統的運作原理。",
      practiceActivities: [
        "試用 ChatGPT、Claude 或 Gemini，並識別哪些回覆採用生成式方法、哪些採用檢索式方法",
        "閱讀 3 篇關於 LLM 訓練的文章，歸納微調（fine-tuning）與 RAG 之間的主要分別",
        "整理 20 個 AI 術語的詞彙表，並以自己的話為每個詞寫一句話定義"
      ],
    },
    "Practical AI Tool Usage": {
      description: "培養撰寫有效提示、策略性運用 AI 工具，以及把 AI 融入日常工作的實戰能力。",
      practiceActivities: [
        "練習提示串連：把複雜任務（例如撰寫商業建議書）拆解為 4-5 個連續提示",
        "就同一任務比較 3 款不同 AI 工具的輸出，評估哪一款表現最佳及原因",
        "在常用 AI 工具中設定切合您職位的自訂指令，並測試對回覆質素的影響"
      ],
    },
    "Critical Evaluation and Output Assessment": {
      description: "學習在專業場合使用前，以批判角度評估 AI 產出的準確性、偏見與可靠程度。",
      practiceActivities: [
        "就您熟悉的主題，要求 AI 提供 5 則附引用的統計數據，並逐一核對原始來源",
        "要求 AI 產出一份熱門主題的報告，並在需要核實的陳述上加註",
        "比較 AI 對某篇新聞的摘要與原文，記錄遺漏、扭曲或虛構的內容"
      ],
    },
    "Ethics, Privacy, and Responsible AI": {
      description: "理解 AI 應用的倫理意涵，包括數據私隱、演算法偏見、負責任披露與管治。",
      practiceActivities: [
        "為您的團隊草擬一份 AI 使用政策，涵蓋數據處理、披露機制與可接受的使用情境",
        "審視一款您經常使用的 AI 工具：閱讀其私隱政策，識別其收集與保留的數據類型",
        "研究 3 宗真實的 AI 偏見個案，扼要說明出錯原因與可能的預防方法"
      ],
    },
    "AI in the Workplace": {
      description: "學習把 AI 整合至專業工作流程、衡量投資回報率，並為團隊打造 AI 強化流程的策略。",
      practiceActivities: [
        "梳理您每週的工作內容，找出 5 項可受惠於 AI 的任務，並逐一測試合適的 AI 工具",
        "進行為期 2 週的試點：以 AI 處理一項週期性任務，追蹤節省時間、質素變化與痛點",
        "建立一套簡易的 ROI 框架，比較學習/使用 AI 工具所投入的時間與生產力提升"
      ],
    },
    "Role-Specific AI Competency": {
      description: "在您的專業範疇（市場營銷、醫療、財務、人力資源、教育或軟件開發等）內應用 AI 工具與最佳實務。",
      practiceActivities: [
        "針對您的職位找出 3 個範疇專屬的 AI 應用情境，並為影響最大的情境設計工作流程原型",
        "訪問不同部門的同事如何使用 AI，找出可以借鑒的做法",
        "建立「使用前 vs. 使用後」的個案研究，記錄 AI 如何改變您工作中的某項流程"
      ],
    },
  },
  es: {
    "AI Foundations and Concepts": {
      description: "Desarrolla una comprensión sólida de los conceptos fundamentales de IA, incluyendo aprendizaje automático, redes neuronales, LLMs y cómo funcionan los sistemas de IA modernos.",
      practiceActivities: [
        "Explora ChatGPT, Claude o Gemini e identifica qué respuestas usan enfoques generativos vs. basados en recuperación",
        "Lee 3 artículos sobre cómo se entrenan los LLMs y resume las diferencias clave entre fine-tuning y RAG",
        "Crea un glosario de 20 términos de IA y escribe una definición de una frase para cada uno con tus propias palabras"
      ],
    },
    "Practical AI Tool Usage": {
      description: "Desarrolla habilidades prácticas para escribir prompts efectivos, usar herramientas de IA estratégicamente e integrar la IA en tus tareas diarias.",
      practiceActivities: [
        "Practica el encadenamiento de prompts: divide una tarea compleja (por ejemplo, escribir una propuesta de negocio) en 4-5 prompts secuenciales",
        "Compara las salidas de 3 herramientas de IA distintas para la misma tarea y evalúa cuál se desempeñó mejor y por qué",
        "Configura instrucciones personalizadas en tu herramienta de IA preferida adaptadas a tu rol y prueba cómo cambia la calidad de las respuestas"
      ],
    },
    "Critical Evaluation and Output Assessment": {
      description: "Aprende a evaluar críticamente el contenido generado por IA en cuanto a precisión, sesgo y confiabilidad antes de usarlo en contextos profesionales.",
      practiceActivities: [
        "Pide a una IA 5 estadísticas con citas sobre un tema que conozcas bien, luego verifica cada cita contra la fuente original",
        "Genera un informe con IA sobre un tema de actualidad y anota las afirmaciones que requieren verificación",
        "Compara un resumen de IA de un artículo de noticias con el artículo original y documenta lo que se perdió, distorsionó o fabricó"
      ],
    },
    "Ethics, Privacy, and Responsible AI": {
      description: "Comprende las implicaciones éticas del uso de la IA, incluyendo privacidad de datos, sesgo algorítmico, divulgación responsable y gobernanza.",
      practiceActivities: [
        "Redacta una política de uso de IA para tu equipo que cubra manejo de datos, divulgación y casos de uso aceptables",
        "Audita una herramienta de IA que uses regularmente: revisa su política de privacidad e identifica qué datos recopila y retiene",
        "Investiga 3 casos reales de sesgo en IA y escribe un breve resumen de qué falló y cómo podría haberse evitado"
      ],
    },
    "AI in the Workplace": {
      description: "Aprende estrategias para integrar la IA en flujos de trabajo profesionales, medir el ROI y construir procesos aumentados con IA para tu equipo.",
      practiceActivities: [
        "Mapea tus tareas semanales e identifica 5 que podrían beneficiarse con asistencia de IA, luego prueba herramientas de IA en cada una",
        "Ejecuta un piloto de 2 semanas: usa IA para una tarea recurrente y registra tiempo ahorrado, cambios de calidad y puntos débiles",
        "Crea un marco simple de ROI comparando el tiempo invertido en aprender/usar herramientas de IA vs. las ganancias de productividad"
      ],
    },
    "Role-Specific AI Competency": {
      description: "Aplica herramientas y buenas prácticas de IA dentro de tu dominio profesional, ya sea marketing, salud, finanzas, RRHH, educación o desarrollo de software.",
      practiceActivities: [
        "Identifica 3 casos de uso específicos de IA para tu rol y diseña un prototipo de flujo de trabajo para el de mayor impacto",
        "Entrevista a un colega de otro departamento sobre cómo usa la IA e identifica prácticas transferibles",
        "Construye un estudio de caso 'antes y después' documentando cómo la IA cambió un proceso específico en tu trabajo"
      ],
    },
  },
};

const baseCourses: Record<string, Course[]> = {
  "AI Foundations and Concepts": [
    { title: "AI For Everyone", provider: "Coursera (DeepLearning.AI)", url: "https://www.coursera.org/learn/ai-for-everyone", duration: "4 weeks", level: "Beginner" },
    { title: "Introduction to Artificial Intelligence (AI)", provider: "Coursera (IBM)", url: "https://www.coursera.org/learn/introduction-to-ai", duration: "4 weeks", level: "Beginner" },
    { title: "Generative AI for Everyone", provider: "Coursera (DeepLearning.AI)", url: "https://www.coursera.org/learn/generative-ai-for-everyone", duration: "3 weeks", level: "Beginner" },
    { title: "Elements of AI", provider: "University of Helsinki (MinnaLearn)", url: "https://www.elementsofai.com/", duration: "6 weeks", level: "Beginner" },
  ],
  "Practical AI Tool Usage": [
    { title: "Prompt Engineering for ChatGPT", provider: "Coursera (Vanderbilt University)", url: "https://www.coursera.org/learn/prompt-engineering", duration: "6 hours", level: "Beginner" },
    { title: "ChatGPT Prompt Engineering for Developers", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", duration: "1 hour", level: "Intermediate" },
    { title: "Work Smarter with Microsoft Copilot", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/paths/work-smarter-with-microsoft-copilot", duration: "5 hours", level: "Beginner" },
    { title: "Google AI Essentials", provider: "Coursera (Google)", url: "https://www.coursera.org/learn/google-ai-essentials", duration: "4 weeks", level: "Beginner" },
  ],
  "Critical Evaluation and Output Assessment": [
    { title: "Introduction to Generative AI", provider: "Coursera (Google Cloud)", url: "https://www.coursera.org/learn/introduction-to-generative-ai", duration: "1 hour", level: "Beginner" },
    { title: "Critical Thinking & Problem Solving", provider: "edX (Rochester Institute of Technology)", url: "https://www.edx.org/learn/critical-thinking-skills/rochester-institute-of-technology-critical-thinking-problem-solving", duration: "4 weeks", level: "Intermediate" },
    { title: "AI For Business", provider: "Coursera (University of Pennsylvania)", url: "https://www.coursera.org/learn/ai-for-business-wharton", duration: "4 weeks", level: "Intermediate" },
    { title: "Trustworthy Generative AI", provider: "Coursera (Vanderbilt University)", url: "https://www.coursera.org/learn/trustworthy-generative-ai", duration: "3 hours", level: "Intermediate" },
  ],
  "Ethics, Privacy, and Responsible AI": [
    { title: "AI Ethics: Global Perspectives", provider: "edX (University of Helsinki)", url: "https://www.elementsofai.com/", duration: "5 weeks", level: "Intermediate" },
    { title: "Responsible AI: Applying AI Principles with Google Cloud", provider: "Coursera (Google Cloud)", url: "https://www.coursera.org/learn/responsible-ai-applying-ai-principles-with-google-cloud", duration: "2 hours", level: "Intermediate" },
    { title: "Data Privacy Fundamentals", provider: "Coursera (University of Pennsylvania)", url: "https://www.coursera.org/learn/northeastern-data-privacy", duration: "4 weeks", level: "Beginner" },
    { title: "AI and the Future of Work", provider: "edX (MIT)", url: "https://www.edx.org/learn/artificial-intelligence/massachusetts-institute-of-technology-artificial-intelligence-implications-for-business-strategy", duration: "6 weeks", level: "Intermediate" },
  ],
  "AI in the Workplace": [
    { title: "AI in the Workplace", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/topics/ai-in-the-workplace", duration: "3 hours", level: "Beginner" },
    { title: "AI Product Management", provider: "Coursera (Duke University)", url: "https://www.coursera.org/specializations/ai-product-management-duke", duration: "3 months", level: "Intermediate" },
    { title: "Artificial Intelligence in Marketing", provider: "Coursera (University of Virginia)", url: "https://www.coursera.org/learn/uva-darden-artificial-intelligence-marketing", duration: "4 weeks", level: "Intermediate" },
    { title: "Generative AI: Boost Your Digital Workplace Productivity", provider: "Coursera (IBM)", url: "https://www.coursera.org/learn/generative-ai-boost-your-digital-workplace-productivity", duration: "2 weeks", level: "Beginner" },
  ],
  "Role-Specific AI Competency": [
    { title: "AI For Business Specialization", provider: "Coursera (University of Pennsylvania)", url: "https://www.coursera.org/specializations/ai-for-business-wharton", duration: "4 months", level: "Intermediate" },
    { title: "AI in Healthcare Specialization", provider: "Coursera (Stanford University)", url: "https://www.coursera.org/specializations/ai-healthcare", duration: "3 months", level: "Intermediate" },
    { title: "AI-Powered Software and System Design", provider: "Coursera (University of Alberta)", url: "https://www.coursera.org/specializations/ai-powered-software-and-system-design", duration: "3 months", level: "Intermediate" },
    { title: "Generative AI for Project Managers", provider: "Coursera (IBM)", url: "https://www.coursera.org/learn/generative-ai-for-project-managers", duration: "2 weeks", level: "Beginner" },
  ],
};

// Course meta (duration/level) label translations
const durationUnits: Record<Lang, { hours: string; hour: string; weeks: string; week: string; months: string; month: string }> = {
  en: { hours: "hours", hour: "hour", weeks: "weeks", week: "week", months: "months", month: "month" },
  "zh-TW": { hours: "小時", hour: "小時", weeks: "週", week: "週", months: "個月", month: "個月" },
  "zh-HK": { hours: "小時", hour: "小時", weeks: "週", week: "週", months: "個月", month: "個月" },
  es: { hours: "horas", hour: "hora", weeks: "semanas", week: "semana", months: "meses", month: "mes" },
};

const levelLabels: Record<Lang, Record<string, string>> = {
  en: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" },
  "zh-TW": { Beginner: "入門", Intermediate: "中階", Advanced: "進階" },
  "zh-HK": { Beginner: "入門", Intermediate: "中級", Advanced: "進階" },
  es: { Beginner: "Principiante", Intermediate: "Intermedio", Advanced: "Avanzado" },
};

function translateCourseMeta(course: Course, lang: Lang): Course {
  if (lang === "en") return course;
  const units = durationUnits[lang];
  let duration = course.duration;
  duration = duration.replace(/(\d+)\s*hours?/i, (_, n) => `${n} ${n === "1" ? units.hour : units.hours}`);
  duration = duration.replace(/(\d+)\s*weeks?/i, (_, n) => `${n} ${n === "1" ? units.week : units.weeks}`);
  duration = duration.replace(/(\d+)\s*months?/i, (_, n) => `${n} ${n === "1" ? units.month : units.months}`);
  return {
    ...course,
    duration,
    level: levelLabels[lang][course.level] ?? course.level,
  };
}

export function generateStudyPlan(
  domainScores: { name: string; pct: number; level: { name: string } }[],
  overallPct: number,
  overallLevel: string,
  lang: Lang = "en"
): StudyPlanData {
  let weakDomains = domainScores.filter(d => d.pct < 60);
  if (weakDomains.length === 0) {
    weakDomains = [...domainScores].sort((a, b) => a.pct - b.pct).slice(0, 2);
  } else {
    weakDomains.sort((a, b) => a.pct - b.pct);
  }

  const domainPlans = weakDomains.map(d => {
    const content = domainContent[lang][d.name] ?? domainContent.en[d.name];
    const courses = baseCourses[d.name];
    if (!content || !courses) return null;

    const courseCount = d.pct < 30 ? 4 : d.pct < 50 ? 3 : 2;
    return {
      domain: getDomainName(lang, d.name),
      description: content.description,
      courses: courses.slice(0, courseCount).map(c => translateCourseMeta(c, lang)),
      practiceActivities: content.practiceActivities,
    };
  }).filter(Boolean) as DomainPlan[];

  const estimatedWeeks = Math.max(4, domainPlans.length * 3);

  return {
    overallLevel,
    overallPct,
    domainPlans,
    estimatedWeeks,
  };
}

export function generateStudyPlanHTML(plan: StudyPlanData, lang: Lang = "en"): string {
  const localeMap: Record<Lang, string> = { en: "en-US", "zh-TW": "zh-TW", "zh-HK": "zh-HK", es: "es-ES" };
  const date = new Date().toLocaleDateString(localeMap[lang], {
    year: "numeric", month: "long", day: "numeric"
  });

  const htmlLangAttr: Record<Lang, string> = { en: "en", "zh-TW": "zh-Hant-TW", "zh-HK": "zh-Hant-HK", es: "es" };

  const domainSections = plan.domainPlans.map(dp => `
    <div style="margin-bottom:32px;">
      <h2 style="font-size:18px;color:#1E40AF;margin:0 0 6px;border-bottom:2px solid #DBEAFE;padding-bottom:6px;">
        ${dp.domain}
      </h2>
      <p style="font-size:13px;color:#4B5563;margin:0 0 16px;">${dp.description}</p>

      <h3 style="font-size:14px;color:#374151;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.5px;">
        ${t(lang, "results.recommendedCourses")}
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
        ${t(lang, "results.practiceActivities")}
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
<html lang="${htmlLangAttr[lang]}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t(lang, "plan.title")}</title>
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
    <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 4px;">${t(lang, "plan.title")}</h1>
    <p style="font-size:13px;color:#6B7280;margin:0;">${t(lang, "plan.generatedOn")} ${date}</p>
  </div>

  <div style="background:linear-gradient(135deg,#EFF6FF,#F5F3FF);border:1px solid #DBEAFE;border-radius:12px;padding:20px;margin-bottom:28px;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div>
        <div style="font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;">${t(lang, "plan.currentLevel")}</div>
        <div style="font-size:20px;font-weight:700;color:#1E40AF;">${plan.overallLevel} (${plan.overallPct}%)</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;">${t(lang, "plan.targetLevel")}</div>
        <div style="font-size:20px;font-weight:700;color:#059669;">${t(lang, "results.targetLevel")}</div>
      </div>
    </div>
    <div style="margin-top:12px;font-size:13px;color:#4B5563;">
      ${t(lang, "results.estimated")}: <strong>${plan.estimatedWeeks} ${t(lang, "results.weeks")}</strong> ${t(lang, "results.hoursPerWeek")}
    </div>
  </div>

  <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:14px 16px;margin-bottom:28px;">
    <div style="font-size:13px;font-weight:600;color:#92400E;margin-bottom:6px;">${t(lang, "plan.howToUse")}</div>
    <ol style="margin:0;padding-left:20px;font-size:13px;color:#78350F;line-height:1.7;">
      <li>${t(lang, "plan.step1")}</li>
      <li>${t(lang, "plan.step2")}</li>
      <li>${t(lang, "plan.step3")}</li>
      <li>${t(lang, "plan.step4")}</li>
    </ol>
  </div>

  ${domainSections}

  <div style="border-top:2px solid #E5E7EB;padding-top:20px;margin-top:20px;text-align:center;">
    <p style="font-size:12px;color:#9CA3AF;margin:0;">
      ${t(lang, "plan.footer")}
    </p>
    <p style="font-size:12px;color:#9CA3AF;margin:4px 0 0;">
      ${t(lang, "plan.footerNote")}
    </p>
  </div>

</body>
</html>`;
}
