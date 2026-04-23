import type { Lang } from "./i18n";

export interface Question {
  id: number;
  domain: string;
  difficulty: string;
  question: string;
  options: string[];
  correct: number;
  originalIndices: number[];
}

interface Translation {
  question: string;
  options: string[];
}

interface RawQuestion {
  id: number;
  domain: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  translations: Partial<Record<Lang, Translation>>;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildQuestions(lang: Lang = "en"): Question[] {
  return rawQuestions.map((q) => {
    const correctEnIdx = q.options.indexOf(q.correctAnswer);
    const translation = lang !== "en" ? q.translations[lang] : null;
    const sourceOptions = translation ? translation.options : q.options;
    const sourceQuestion = translation ? translation.question : q.question;

    const indexed = sourceOptions.map((text, i) => ({ text, originalIdx: i }));
    const shuffled = shuffle(indexed);
    const newCorrect = shuffled.findIndex((o) => o.originalIdx === correctEnIdx);

    return {
      id: q.id,
      domain: q.domain, // Keep English as canonical ID; UI translates for display
      difficulty: q.difficulty,
      question: sourceQuestion,
      options: shuffled.map((o) => o.text),
      correct: newCorrect,
      originalIndices: shuffled.map((o) => o.originalIdx),
    };
  });
}

// Retranslate existing questions into a new language while preserving the
// shuffle order, so mid-assessment language switches don't lose progress or
// break the answer->correct-index mapping.
export function retranslateQuestions(questions: Question[], lang: Lang): Question[] {
  return questions.map((q) => {
    const raw = rawQuestions.find((r) => r.id === q.id);
    if (!raw) return q;
    const translation = lang !== "en" ? raw.translations[lang] : null;
    const sourceOptions = translation ? translation.options : raw.options;
    const sourceQuestion = translation ? translation.question : raw.question;
    return {
      ...q,
      question: sourceQuestion,
      options: q.originalIndices.map((i) => sourceOptions[i]),
    };
  });
}

const rawQuestions: RawQuestion[] = [
  {
    id: 1, domain: "AI Foundations and Concepts", difficulty: "Foundational",
    question: 'What does the term "large language model" (LLM) refer to?',
    options: [
      "A rules-based system that matches user phrases to pre-written response templates",
      "An AI system trained on vast amounts of text data to understand and generate human language",
      "A search engine optimized to process and rank natural language queries",
      "A neural network designed specifically to translate between programming languages"
    ],
    correctAnswer: "An AI system trained on vast amounts of text data to understand and generate human language",
    translations: {
      "zh-TW": {
        question: "「大型語言模型」（LLM）一詞指的是什麼？",
        options: [
          "一套以規則為基礎的系統，將使用者語句對應至預先撰寫的回覆範本",
          "一種以大量文字資料訓練而成、可理解與生成人類語言的 AI 系統",
          "一種針對自然語言查詢處理與排序而優化的搜尋引擎",
          "一種專為不同程式語言之間翻譯所設計的神經網路"
        ],
      },
      "zh-HK": {
        question: "「大型語言模型」（LLM）是指什麼？",
        options: [
          "一套以規則為本的系統，把用戶語句配對至預先撰寫的回應範本",
          "一種以大量文字數據訓練而成、能理解並生成人類語言的 AI 系統",
          "一種針對自然語言查詢處理與排序而優化的搜尋引擎",
          "一種專為不同程式語言之間翻譯而設計的神經網絡"
        ],
      },
      es: {
        question: '¿A qué se refiere el término "modelo grande de lenguaje" (LLM)?',
        options: [
          "Un sistema basado en reglas que asocia frases del usuario con plantillas de respuesta predefinidas",
          "Un sistema de IA entrenado con grandes cantidades de texto para comprender y generar lenguaje humano",
          "Un motor de búsqueda optimizado para procesar y clasificar consultas en lenguaje natural",
          "Una red neuronal diseñada específicamente para traducir entre lenguajes de programación"
        ],
      },
    },
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
    correctAnswer: "A subset of AI where systems improve performance through exposure to data rather than explicit programming",
    translations: {
      "zh-TW": {
        question: "下列何者最能描述「機器學習」？",
        options: [
          "一種由工程師為系統可能遇到的每一個決策情境撰寫規則的作法",
          "AI 的一個分支，系統透過接觸資料來提升表現，而非依靠明確的程式規則",
          "AI 透過閱讀技術文件來獲取領域知識的過程",
          "電腦科學中專注於打造模仿人類行為機器人的分支"
        ],
      },
      "zh-HK": {
        question: "以下哪項最能描述「機器學習」？",
        options: [
          "由工程師為系統可能遇到的每種決策情境編寫規則的做法",
          "AI 的一個分支，系統透過接觸數據來提升表現，而非倚賴明確的程式規則",
          "AI 透過閱讀技術文件來獲取專業知識的過程",
          "電腦科學中專注於打造模仿人類行為機械人的分支"
        ],
      },
      es: {
        question: '¿Cuál de las siguientes describe mejor el "aprendizaje automático" (machine learning)?',
        options: [
          "Un enfoque donde los ingenieros programan todas las reglas de decisión posibles que el sistema pueda encontrar",
          "Un subcampo de la IA donde los sistemas mejoran su desempeño al exponerse a datos en lugar de ser programados explícitamente",
          "Un proceso donde la IA lee documentación técnica para adquirir conocimiento del dominio",
          "Una rama de las ciencias de la computación centrada en construir robots que imitan físicamente el comportamiento humano"
        ],
      },
    },
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
    correctAnswer: "Traditional AI classifies or predicts; generative AI creates new content such as text, images, or code",
    translations: {
      "zh-TW": {
        question: "生成式 AI 與傳統 AI 的主要差異是什麼？",
        options: [
          "生成式 AI 依賴標註過的資料集，傳統 AI 則無需任何訓練資料",
          "傳統 AI 著重分類或預測；生成式 AI 則能創造新的文字、圖像或程式碼",
          "傳統 AI 負責創意任務，生成式 AI 則專注於結構化資料分析",
          "生成式 AI 即時運作，傳統 AI 則須離線處理"
        ],
      },
      "zh-HK": {
        question: "生成式 AI 與傳統 AI 的主要分別是什麼？",
        options: [
          "生成式 AI 依賴有標註的數據集，傳統 AI 則無需任何訓練數據",
          "傳統 AI 著重分類或預測；生成式 AI 則能創造新的文字、圖像或程式碼",
          "傳統 AI 負責創意任務，生成式 AI 則專注於結構化數據分析",
          "生成式 AI 實時運作，傳統 AI 則需離線處理"
        ],
      },
      es: {
        question: "¿Cuál es la principal diferencia entre la IA generativa y la IA tradicional?",
        options: [
          "La IA generativa depende de conjuntos de datos etiquetados mientras que la IA tradicional funciona sin datos de entrenamiento",
          "La IA tradicional clasifica o predice; la IA generativa crea contenido nuevo como texto, imágenes o código",
          "La IA tradicional maneja tareas creativas mientras que la generativa se enfoca en análisis de datos estructurados",
          "La IA generativa opera en tiempo real mientras que la tradicional requiere procesamiento fuera de línea"
        ],
      },
    },
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
    correctAnswer: "A computing system modeled on biological neural connections that processes information in layers",
    translations: {
      "zh-TW": {
        question: "在 AI 的脈絡下，「神經網路」指的是什麼？",
        options: [
          "一種分散式資料庫架構，用於將訓練資料儲存在多台伺服器上",
          "一種模仿生物神經連結的運算系統，以層狀結構處理資訊",
          "一種以固定數學規則對輸入進行分類的演算法",
          "一種讓不同 AI 系統安全交換資料的通訊協定"
        ],
      },
      "zh-HK": {
        question: "在 AI 的語境下，「神經網絡」是指什麼？",
        options: [
          "一種分散式資料庫架構，用於將訓練數據儲存於多部伺服器",
          "一種模仿生物神經連結的運算系統，以層狀結構處理資訊",
          "一種以固定數學規則對輸入進行分類的演算法",
          "一種讓不同 AI 系統安全交換數據的通訊協定"
        ],
      },
      es: {
        question: '¿Qué es una "red neuronal" en el contexto de la IA?',
        options: [
          "Una arquitectura de base de datos distribuida para almacenar datos de entrenamiento en múltiples servidores",
          "Un sistema de computación inspirado en las conexiones neuronales biológicas que procesa información en capas",
          "Un algoritmo que aplica un conjunto fijo de reglas matemáticas para clasificar entradas",
          "Un protocolo de comunicaciones que permite a distintos sistemas de IA intercambiar datos de forma segura"
        ],
      },
    },
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
    correctAnswer: "A chatbot understanding and responding to a customer service question",
    translations: {
      "zh-TW": {
        question: "下列何者為「自然語言處理」（NLP）的範例？",
        options: [
          "自駕車即時偵測行人並調整車速",
          "聊天機器人理解並回覆客服問題",
          "偵測金融交易異常樣態的詐欺識別系統",
          "根據過往購買紀錄推薦商品的演算法"
        ],
      },
      "zh-HK": {
        question: "下列哪項屬於「自然語言處理」（NLP）的例子？",
        options: [
          "自動駕駛汽車即時偵測行人並調整車速",
          "聊天機械人理解並回應客戶服務查詢",
          "偵測金融交易異常模式的詐騙識別系統",
          "根據過往購買記錄推薦商品的演算法"
        ],
      },
      es: {
        question: '¿Cuál de los siguientes es un ejemplo de "procesamiento de lenguaje natural" (PLN)?',
        options: [
          "Un auto autónomo detectando peatones y ajustando su velocidad en tiempo real",
          "Un chatbot comprendiendo y respondiendo a una consulta de atención al cliente",
          "Un sistema de detección de fraudes que señala patrones inusuales en transacciones financieras",
          "Un algoritmo de recomendación que sugiere productos según el historial de compras"
        ],
      },
    },
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
    correctAnswer: "The dataset used to teach an AI model to recognize patterns and make predictions",
    translations: {
      "zh-TW": {
        question: "在 AI 開發中，「訓練資料」指的是什麼？",
        options: [
          "定義模型如何處理新請求的組態設定",
          "用來教導 AI 模型辨識樣態並進行預測的資料集",
          "用來評估已上線模型實際準確度的基準",
          "描述開發者如何建置與測試 AI 系統的文件"
        ],
      },
      "zh-HK": {
        question: "在 AI 開發中，「訓練數據」指的是什麼？",
        options: [
          "定義模型如何處理新要求的設定",
          "用來教導 AI 模型辨識模式並進行預測的數據集",
          "用來評估已部署模型實際準確度的基準",
          "描述開發者如何建置與測試 AI 系統的文件"
        ],
      },
      es: {
        question: '¿A qué se refiere "datos de entrenamiento" en el desarrollo de IA?',
        options: [
          "La configuración que define cómo un modelo procesa nuevas solicitudes",
          "El conjunto de datos utilizado para enseñar a un modelo de IA a reconocer patrones y hacer predicciones",
          "Los puntos de referencia utilizados para evaluar la precisión real de un modelo desplegado",
          "La documentación que describe cómo los desarrolladores construyeron y probaron el sistema de IA"
        ],
      },
    },
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
    correctAnswer: "Adapting a pre-trained model to perform better on a specific task or domain using additional targeted data",
    translations: {
      "zh-TW": {
        question: "在 AI 模型的脈絡下，「微調」（fine-tuning）是什麼？",
        options: [
          "完全從零開始以較小且經過精選的資料集訓練一個新模型",
          "透過額外的針對性資料，讓預訓練模型在特定任務或領域上表現更好",
          "透過人工審閱與修正介面手動調整模型輸出",
          "將大型模型壓縮為較小版本，以便在有限硬體上更快執行"
        ],
      },
      "zh-HK": {
        question: "在 AI 模型的語境下，「微調」（fine-tuning）是什麼？",
        options: [
          "完全從零開始，以較小且精挑的數據集訓練新模型",
          "透過額外的針對性數據，讓預訓練模型在特定任務或範疇上表現更佳",
          "透過人手審閱與修正介面手動調整模型輸出",
          "把大型模型壓縮為較小版本，以便在有限硬件上更快運行"
        ],
      },
      es: {
        question: '¿Qué significa "fine-tuning" (ajuste fino) en el contexto de los modelos de IA?',
        options: [
          "Entrenar un modelo completamente desde cero usando un conjunto de datos más pequeño y curado",
          "Adaptar un modelo previamente entrenado para que funcione mejor en una tarea o dominio específico usando datos adicionales focalizados",
          "Ajustar manualmente las salidas del modelo mediante una interfaz de revisión y corrección humana",
          "Comprimir un modelo grande en una versión más pequeña que se ejecute más rápido en hardware limitado"
        ],
      },
    },
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
    correctAnswer: "A method that enhances AI responses by retrieving relevant information from external sources before generating output",
    translations: {
      "zh-TW": {
        question: "「檢索增強生成」（RAG）是什麼？",
        options: [
          "一種以即時資料流訓練模型、使其知識保持更新的技術",
          "一種在生成回覆前先從外部來源檢索相關資訊，以強化 AI 回覆品質的方法",
          "一種在模型上線後改寫其訓練資料以修正事實錯誤的做法",
          "一種將多個 AI 模型的輸出整合為單一回覆的框架"
        ],
      },
      "zh-HK": {
        question: "「檢索增強生成」（RAG）是什麼？",
        options: [
          "一種以實時數據流訓練模型、使其知識保持更新的技術",
          "一種在生成回覆前先從外部來源檢索相關資訊，以提升 AI 回覆質素的方法",
          "一種在模型部署後改寫其訓練數據以更正事實錯誤的做法",
          "一種把多個 AI 模型的輸出整合為單一回覆的框架"
        ],
      },
      es: {
        question: '¿Qué es la "generación aumentada por recuperación" (RAG)?',
        options: [
          "Una técnica para entrenar modelos con flujos de datos en tiempo real para mantener su conocimiento actualizado",
          "Un método que mejora las respuestas de IA recuperando información relevante de fuentes externas antes de generar la salida",
          "Un proceso para reescribir los datos de entrenamiento de una IA con el fin de corregir errores factuales tras su despliegue",
          "Un marco para combinar las salidas de múltiples modelos de IA en una sola respuesta"
        ],
      },
    },
  },
  {
    id: 9, domain: "Practical AI Tool Usage", difficulty: "Competent",
    question: "Which of the following is the most effective prompt for getting a useful response from an AI assistant?",
    options: [
      "Write a comprehensive overview of all social media platforms and their suitability for different business types",
      "Write a 300-word blog post targeting small business owners about 3 low-cost social media strategies, using a conversational tone with specific examples",
      "Summarize the key digital marketing trends from the past five years and how they apply to content creation",
      "Create a blog post about social media marketing for businesses, covering the main points thoroughly"
    ],
    correctAnswer: "Write a 300-word blog post targeting small business owners about 3 low-cost social media strategies, using a conversational tone with specific examples",
    translations: {
      "zh-TW": {
        question: "下列何者是向 AI 助理取得有用回覆最有效的提示？",
        options: [
          "撰寫一份涵蓋所有社群媒體平台及其對不同類型企業適用性的全面概述",
          "撰寫一篇 300 字的部落格文章，針對小型企業主，介紹 3 個低成本社群媒體策略，語氣親切且附具體範例",
          "總結過去五年主要的數位行銷趨勢，並說明其如何應用於內容創作",
          "寫一篇關於企業社群媒體行銷的部落格文章，涵蓋重點內容"
        ],
      },
      "zh-HK": {
        question: "下列哪項是向 AI 助理取得有用回覆最有效的提示？",
        options: [
          "撰寫一份涵蓋所有社交媒體平台及其對不同類型企業適用性的全面概述",
          "撰寫一篇 300 字的網誌文章，針對小企業主，介紹 3 個低成本社交媒體策略，語氣親切並附具體例子",
          "總結過去五年主要的數碼營銷趨勢，並說明其如何應用於內容創作",
          "寫一篇關於企業社交媒體營銷的網誌文章，涵蓋主要重點"
        ],
      },
      es: {
        question: "¿Cuál de los siguientes es el prompt más efectivo para obtener una respuesta útil de un asistente de IA?",
        options: [
          "Escribe una visión general completa de todas las plataformas de redes sociales y su idoneidad para distintos tipos de negocios",
          "Escribe un artículo de blog de 300 palabras dirigido a dueños de pequeños negocios sobre 3 estrategias de redes sociales de bajo costo, con tono conversacional y ejemplos específicos",
          "Resume las principales tendencias de marketing digital de los últimos cinco años y cómo se aplican a la creación de contenido",
          "Crea un artículo de blog sobre marketing en redes sociales para negocios, cubriendo los puntos principales a fondo"
        ],
      },
    },
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
    correctAnswer: "Review the code for correctness, security vulnerabilities, and alignment with your project standards before using it",
    translations: {
      "zh-TW": {
        question: "使用 AI 程式碼助理時，在其產生程式碼後，最佳做法為何？",
        options: [
          "在提交前先透過自動化 linter 檢查語法錯誤",
          "檢視程式碼的正確性、安全漏洞，以及是否符合專案規範，再實際採用",
          "於沙盒環境中執行，驗證能否無錯誤運行",
          "請 AI 解釋程式碼作用，並以此作為品質把關"
        ],
      },
      "zh-HK": {
        question: "使用 AI 編程助理時，在其生成程式碼後，最佳做法為何？",
        options: [
          "在提交前先透過自動化 linter 檢查語法錯誤",
          "檢視程式碼的正確性、保安漏洞，以及是否符合項目規範後才使用",
          "在沙盒環境中執行，驗證能否無錯誤運行",
          "請 AI 解釋程式碼作用，並以此作為品質把關"
        ],
      },
      es: {
        question: "Al usar un asistente de codificación con IA, ¿cuál es la mejor práctica después de que genere código?",
        options: [
          "Pasarlo por un linter automatizado para detectar errores de sintaxis antes de hacer commit",
          "Revisar el código en cuanto a corrección, vulnerabilidades de seguridad y cumplimiento de los estándares del proyecto antes de usarlo",
          "Probarlo en un entorno de sandbox para verificar que se ejecuta sin errores en tiempo de ejecución",
          "Pedirle a la IA que explique qué hace el código y confiar en esa explicación como control de calidad"
        ],
      },
    },
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
    correctAnswer: "Breaking a complex task into sequential prompts where each output feeds into the next, useful for multi-step reasoning or content creation",
    translations: {
      "zh-TW": {
        question: "什麼是「提示串接」（prompt chaining），何時使用最有用？",
        options: [
          "重複執行同一個提示多次，並把各次回覆中最佳的部分組合起來",
          "將複雜任務拆解為一連串提示，前一步輸出作為下一步輸入，適合多步推理或內容創作",
          "依序串接多個 AI 工具，讓每個工具負責任務中的不同部分",
          "用後續提示去修正前一次 AI 回覆中的特定錯誤"
        ],
      },
      "zh-HK": {
        question: "什麼是「提示串連」（prompt chaining），何時最有用？",
        options: [
          "重複執行同一提示多次，並將各次回覆中最強的部分結合起來",
          "把複雜任務拆解為一連串提示，前一步輸出作為下一步輸入，適用於多步推理或內容創作",
          "依序串連多個 AI 工具，讓每個工具負責任務中不同部分",
          "用後續提示修正前一次 AI 回覆中的特定錯誤"
        ],
      },
      es: {
        question: '¿Qué es el "encadenamiento de prompts" (prompt chaining) y cuándo es útil?',
        options: [
          "Ejecutar el mismo prompt varias veces y combinar los mejores elementos de cada respuesta",
          "Dividir una tarea compleja en prompts secuenciales donde cada salida alimenta la siguiente, útil para razonamiento en varios pasos o creación de contenido",
          "Conectar múltiples herramientas de IA en secuencia para que cada una se especialice en una parte diferente de la tarea",
          "Usar prompts de seguimiento para corregir errores específicos en una respuesta previa generada por IA"
        ],
      },
    },
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
    correctAnswer: "Upload the document to an AI tool with document analysis capabilities, then ask targeted questions about specific sections",
    translations: {
      "zh-TW": {
        question: "您需要分析一份 50 頁的 PDF 報告。哪種 AI 方式最有效？",
        options: [
          "將摘要貼入聊天機器人，並請其推論文件其餘內容",
          "將文件上傳至具文件分析能力的 AI 工具，再針對特定章節提出具體問題",
          "用 AI 工具將 PDF 轉為文字，再把全文貼入一般聊天機器人",
          "請 AI 僅依文件標題與主要章節產生摘要"
        ],
      },
      "zh-HK": {
        question: "您需要分析一份 50 頁的 PDF 報告。哪種 AI 方式最有效？",
        options: [
          "把摘要貼入聊天機械人，並要求它推論文件其餘內容",
          "將文件上載至具文件分析能力的 AI 工具，再針對特定章節提出具體問題",
          "用 AI 工具把 PDF 轉為文字，再將全文貼入一般聊天機械人",
          "要求 AI 僅依文件標題與主要章節生成摘要"
        ],
      },
      es: {
        question: "Necesitas analizar un informe PDF de 50 páginas. ¿Qué enfoque de IA es más efectivo?",
        options: [
          "Copiar el resumen ejecutivo en un chatbot y pedirle que infiera el resto del contenido del documento",
          "Subir el documento a una herramienta de IA con capacidades de análisis documental y hacer preguntas específicas sobre secciones concretas",
          "Usar una herramienta de IA para convertir el PDF a texto y luego pegar el texto completo en un chatbot general",
          "Pedirle a la IA que genere un resumen basándose solo en el título del documento y los encabezados principales"
        ],
      },
    },
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
    correctAnswer: "To provide persistent context about your role, preferences, and desired output format so every response is tailored to your needs",
    translations: {
      "zh-TW": {
        question: "在 AI 工具中設定「系統提示」或「自訂指示」的目的為何？",
        options: [
          "將 AI 限制在特定主題範圍，使其不回答無關問題",
          "提供關於使用者角色、偏好與輸出格式的持續性脈絡，讓每次回覆都貼合需求",
          "藉由指明應優先使用哪些訓練來源，來提升準確度",
          "設定安全過濾條件，避免 AI 產生特定類型內容"
        ],
      },
      "zh-HK": {
        question: "在 AI 工具中設定「系統提示」或「自訂指令」的目的為何？",
        options: [
          "把 AI 限制在特定主題範圍內，使其不回應無關的問題",
          "提供關於使用者角色、偏好與輸出格式的持續性背景，讓每次回覆都切合需要",
          "藉由指明應優先使用哪些訓練來源，來提升準確度",
          "設定安全過濾條件，防止 AI 生成某類內容"
        ],
      },
      es: {
        question: '¿Cuál es el propósito de establecer un "system prompt" o "instrucciones personalizadas" en una herramienta de IA?',
        options: [
          "Restringir la IA a un área temática específica y evitar que responda a preguntas no relacionadas",
          "Proporcionar contexto persistente sobre tu rol, preferencias y formato de salida deseado para que cada respuesta se ajuste a tus necesidades",
          "Mejorar la precisión indicando a la IA qué fuentes de entrenamiento debe priorizar",
          "Configurar filtros de seguridad que eviten que la IA genere ciertos tipos de contenido"
        ],
      },
    },
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
    correctAnswer: "Provide specific feedback on what is wrong, add constraints, give examples of the desired output, or break the task into smaller steps",
    translations: {
      "zh-TW": {
        question: "當 AI 輸出未達預期時，下列哪一種策略最有效？",
        options: [
          "用同義詞或略為不同的句型重新改寫原提示",
          "具體指出哪裡有問題、加上限制條件、提供期望輸出的範例，或將任務拆解為更小步驟",
          "改用更強大的 AI 模型，看是否能更有效處理該任務",
          "請 AI 自我檢討其回覆，再產出修正後的版本"
        ],
      },
      "zh-HK": {
        question: "當 AI 輸出未達預期時，下列哪種策略最有效？",
        options: [
          "用同義詞或略為不同的句式改寫原提示",
          "具體指出哪裡出錯、加上限制條件、提供期望輸出的例子，或把任務拆解為更小步驟",
          "改用更強大的 AI 模型，看看能否更有效處理該任務",
          "請 AI 自行檢討其回覆，再生成修訂版"
        ],
      },
      es: {
        question: "¿Qué estrategia es más efectiva para mejorar una salida de IA que no cumple tus expectativas?",
        options: [
          "Reformular el prompt original usando sinónimos y una estructura de oración ligeramente distinta",
          "Dar retroalimentación específica sobre qué está mal, agregar restricciones, dar ejemplos de la salida deseada o dividir la tarea en pasos más pequeños",
          "Cambiar a un modelo de IA más capaz para ver si maneja la tarea con mayor efectividad",
          "Pedir a la IA que critique su propia respuesta y luego genere una versión revisada"
        ],
      },
    },
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
    correctAnswer: "Use AI for rapid concept exploration, mood boards, and initial ideation; use traditional tools for precise, brand-compliant final assets",
    translations: {
      "zh-TW": {
        question: "何時該使用 AI 影像生成工具，何時該使用傳統設計工具？",
        options: [
          "需要擬真照片時使用 AI，處理向量圖形時使用傳統工具",
          "用 AI 進行快速概念探索、情緒板與初步發想；用傳統工具製作需精準、符合品牌規範的最終素材",
          "早期概念階段用傳統工具，後期細修與最終設計用 AI",
          "面向客戶的交付物使用 AI，因其視覺一致性較佳"
        ],
      },
      "zh-HK": {
        question: "何時應使用 AI 圖像生成工具，何時應使用傳統設計工具？",
        options: [
          "需要擬真相片時使用 AI，處理向量圖形時使用傳統工具",
          "用 AI 作快速概念探索、情緒板與初步構思；用傳統工具製作需精準、符合品牌規範的最終素材",
          "早期概念階段用傳統工具，後期細修與最終設計則用 AI",
          "面向客戶的交付物使用 AI，因其視覺一致性較佳"
        ],
      },
      es: {
        question: "¿Cuándo deberías usar una herramienta de generación de imágenes por IA en lugar de una herramienta de diseño tradicional?",
        options: [
          "Usar IA cuando necesitas salidas fotorrealistas y herramientas tradicionales al trabajar con gráficos vectoriales",
          "Usar IA para exploración rápida de conceptos, moodboards e ideación inicial; usar herramientas tradicionales para entregables finales precisos y acordes a la marca",
          "Usar herramientas tradicionales para conceptos iniciales y la IA para refinar y pulir el diseño final",
          "Usar IA para entregables orientados al cliente, ya que produce resultados más consistentes visualmente"
        ],
      },
    },
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
    correctAnswer: "An AI agent can autonomously plan and execute multi-step tasks, use external tools, and take actions, while a standard chatbot primarily responds to individual prompts",
    translations: {
      "zh-TW": {
        question: "什麼是「AI 代理」（AI agent）？它與一般聊天機器人有何差異？",
        options: [
          "AI 代理是針對特定專業領域或產業微調過的聊天機器人",
          "AI 代理能自主規劃與執行多步驟任務、使用外部工具並採取行動；一般聊天機器人主要針對單一提示做回覆",
          "聊天機器人使用大型語言模型，AI 代理則基於較舊的規則式架構",
          "AI 代理擁有更大的上下文視窗，因此能記住更長的對話"
        ],
      },
      "zh-HK": {
        question: "什麼是「AI 代理」（AI agent）？它與普通聊天機械人有何分別？",
        options: [
          "AI 代理是針對特定專業範疇或行業微調過的聊天機械人",
          "AI 代理能自主規劃並執行多步驟任務、使用外部工具並採取行動；普通聊天機械人主要針對單一提示作回覆",
          "聊天機械人使用大型語言模型，AI 代理則基於較舊的規則式架構",
          "AI 代理具備更大的上下文視窗，能記住更長的對話"
        ],
      },
      es: {
        question: '¿Qué es un "agente de IA" y en qué se diferencia de un chatbot estándar?',
        options: [
          "Un agente de IA es un chatbot ajustado (fine-tuned) adaptado para un dominio profesional o industria específica",
          "Un agente de IA puede planificar y ejecutar autónomamente tareas de varios pasos, usar herramientas externas y tomar acciones, mientras que un chatbot estándar principalmente responde a prompts individuales",
          "Los chatbots usan modelos grandes de lenguaje mientras que los agentes dependen de arquitecturas más antiguas basadas en reglas",
          "Los agentes de IA operan con ventanas de contexto más grandes, permitiéndoles recordar conversaciones más largas"
        ],
      },
    },
  },
  {
    id: 17, domain: "Critical Evaluation and Output Assessment", difficulty: "Foundational",
    question: 'What is an AI "hallucination"?',
    options: [
      "When an AI misunderstands the intent of a prompt and produces an off-topic response",
      "When an AI generates confident-sounding but factually incorrect or fabricated information",
      "When an AI produces inconsistent answers to the same question asked multiple times",
      "When an AI draws on outdated training data and provides information that is no longer accurate"
    ],
    correctAnswer: "When an AI generates confident-sounding but factually incorrect or fabricated information",
    translations: {
      "zh-TW": {
        question: "AI 的「幻覺」（hallucination）指的是什麼？",
        options: [
          "AI 誤解提示的意圖，產出與主題無關的回覆",
          "AI 產出聽起來自信、但在事實上錯誤或捏造的資訊",
          "對同一個問題多次提問時，AI 給出不一致的答案",
          "AI 依據過時的訓練資料，提供已不再準確的資訊"
        ],
      },
      "zh-HK": {
        question: "AI 的「幻覺」（hallucination）是指什麼？",
        options: [
          "AI 誤解提示的意圖，產出與主題無關的回覆",
          "AI 產出聽起來自信、但事實上錯誤或虛構的資訊",
          "對同一條問題多次發問時，AI 給出不一致的答案",
          "AI 依據過時的訓練數據，提供已不再準確的資訊"
        ],
      },
      es: {
        question: '¿Qué es una "alucinación" de IA?',
        options: [
          "Cuando una IA malinterpreta la intención de un prompt y produce una respuesta fuera de tema",
          "Cuando una IA genera información que suena confiable pero es factualmente incorrecta o fabricada",
          "Cuando una IA produce respuestas inconsistentes a la misma pregunta hecha varias veces",
          "Cuando una IA se basa en datos de entrenamiento desactualizados y proporciona información que ya no es precisa"
        ],
      },
    },
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
    correctAnswer: "Verify the citation by checking the original source, as AI can fabricate realistic-looking references",
    translations: {
      "zh-TW": {
        question: "您使用 AI 研究某個主題，它提供了一項統計數據與引用出處。您應如何處理？",
        options: [
          "交叉比對其他 AI 工具是否也產出相同數字",
          "透過查對原始來源來核實引用，因為 AI 可能捏造看似真實的參考資料",
          "視其為可靠，因為 AI 僅會引用同儕審查的資料來源",
          "只要該統計與您已知的其他資訊一致，就直接採用"
        ],
      },
      "zh-HK": {
        question: "您用 AI 研究某個主題，它提供了一項統計數據連同引用來源。您應如何處理？",
        options: [
          "交叉比對其他 AI 工具是否也產出相同數字",
          "透過查對原始來源來核實引用，因為 AI 可能虛構看似真實的參考資料",
          "視之為可靠，因為 AI 只會引用同儕審查的來源",
          "只要該統計與您已知的其他資訊一致，便直接採用"
        ],
      },
      es: {
        question: "Estás usando IA para investigar un tema y te proporciona una estadística con una cita. ¿Qué deberías hacer?",
        options: [
          "Contrastar la estadística con otras herramientas de IA para ver si producen la misma cifra",
          "Verificar la cita revisando la fuente original, ya que la IA puede fabricar referencias que parecen reales",
          "Aceptarla como confiable ya que las herramientas de IA están entrenadas para citar solo fuentes revisadas por pares",
          "Usarla si la estadística es consistente con otra información que ya sabes que es precisa"
        ],
      },
    },
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
    correctAnswer: "Check whether the output consistently favors certain perspectives, demographics, or viewpoints, and cross-reference with diverse sources",
    translations: {
      "zh-TW": {
        question: "要如何辨識 AI 輸出中可能存在的偏誤？",
        options: [
          "請 AI 檢視自己的輸出，並標記任何可能帶有偏誤的陳述",
          "檢查輸出是否一貫偏向某些觀點、族群或立場，並與多元來源交叉比對",
          "多次執行同一提示，若結果有差異即視為偏誤的跡象",
          "將輸出與另一款 AI 工具比較，若答案一致即視為無偏誤"
        ],
      },
      "zh-HK": {
        question: "如何識別 AI 輸出中可能出現的偏見？",
        options: [
          "請 AI 檢視自己的輸出，並標註任何可能帶有偏見的陳述",
          "檢視輸出是否一貫偏向某些觀點、群體或立場，並與多元來源交叉比對",
          "多次執行同一提示，若回應出現差異即視為偏見跡象",
          "將輸出與另一款 AI 工具比較，若答案一致即視作無偏見"
        ],
      },
      es: {
        question: "¿Cómo puedes identificar un posible sesgo en una salida generada por IA?",
        options: [
          "Pedirle a la IA que revise su propia salida y marque cualquier afirmación que pueda considerarse sesgada",
          "Verificar si la salida favorece consistentemente ciertas perspectivas, grupos demográficos o puntos de vista, y contrastarla con fuentes diversas",
          "Ejecutar el mismo prompt varias veces y tratar cualquier variación en las respuestas como un indicador de sesgo",
          "Comparar la salida con una herramienta de IA distinta y tratar las respuestas consistentes como imparciales"
        ],
      },
    },
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
    correctAnswer: "Fact-check key claims, verify any data points, and ensure the logic is sound before using it in any professional context",
    translations: {
      "zh-TW": {
        question: "AI 寫作工具產出一段看似精煉的文字，但您對其準確性沒把握。最佳做法為何？",
        options: [
          "為語氣與文風做編修，因為專業的語言即代表可靠度",
          "查核重點事實、驗證任何數據，並確認邏輯無誤後，再用於任何專業用途",
          "交由同事閱讀，由其判斷是否具可信度後再發佈",
          "用抄襲檢測工具確認內容為原創，以證明其可信"
        ],
      },
      "zh-HK": {
        question: "AI 寫作工具生成一段看似精煉的文字，但您對其準確性沒信心。最佳做法為何？",
        options: [
          "修整語氣與文風，因為專業的語言便代表可靠",
          "核實重點事實、驗證任何數據，並確認邏輯無誤後，才用於任何專業場合",
          "交由同事閱讀，由其判斷是否具可信度後才發佈",
          "用抄襲檢測工具確認內容為原創，以證明其可信"
        ],
      },
      es: {
        question: "Una herramienta de escritura con IA produce un párrafo que suena pulido pero no estás seguro de su precisión. ¿Cuál es la mejor acción?",
        options: [
          "Editar el párrafo para ajustar tono y estilo, ya que el lenguaje profesional es un indicador confiable de precisión",
          "Verificar los hechos clave, comprobar los datos y asegurarse de que la lógica es sólida antes de usarlo en cualquier contexto profesional",
          "Hacer que un colega lo lea para evaluar si suena creíble antes de publicarlo",
          "Pasarlo por un detector de plagio para confirmar que el contenido es original y, por tanto, confiable"
        ],
      },
    },
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
    correctAnswer: "It indicates how certain the model is about its output; outputs with lower confidence require more scrutiny and human verification",
    translations: {
      "zh-TW": {
        question: "「模型信心度」是什麼？為何對評估 AI 輸出很重要？",
        options: [
          "反映模型在初期評估中，於基準測試上的表現如何",
          "代表模型對其輸出的確定程度；信心較低的輸出需要更多人工檢視與驗證",
          "衡量模型在訓練時接觸到相似資料的機率",
          "描述模型處理請求的速度與其運算極限的相對關係"
        ],
      },
      "zh-HK": {
        question: "「模型信心度」是什麼？為何對評估 AI 輸出很重要？",
        options: [
          "反映模型在初期評估中於基準測試上的表現",
          "代表模型對其輸出的確定程度；信心較低的輸出需要更多人工審視與核實",
          "衡量模型在訓練期間接觸相似數據的機率",
          "描述模型處理要求的速度與其運算極限的相對關係"
        ],
      },
      es: {
        question: '¿Qué significa "confianza del modelo" y por qué importa al evaluar salidas de IA?',
        options: [
          "Refleja qué tan bien se desempeñó el modelo en pruebas de referencia durante la evaluación inicial",
          "Indica qué tan seguro está el modelo de su salida; las salidas con menor confianza requieren más escrutinio y verificación humana",
          "Mide la probabilidad de que el modelo haya encontrado datos similares durante el entrenamiento",
          "Describe qué tan rápido procesa solicitudes el modelo en relación con sus límites computacionales"
        ],
      },
    },
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
    correctAnswer: "Accuracy for your use case, data privacy policies, integration capabilities, output quality, and domain-specific performance",
    translations: {
      "zh-TW": {
        question: "評估兩款不同 AI 工具以用於商務任務時，哪些因素最重要？",
        options: [
          "各公司使用者規模，以及工具上市的時間長短",
          "針對您的使用情境的準確度、資料隱私政策、整合能力、輸出品質，以及在特定領域的表現",
          "回應速度、訂閱價格，以及介面是否需要技術訓練才能操作",
          "支援的語言數量，以及是否提供免費試用期"
        ],
      },
      "zh-HK": {
        question: "為商業任務評估兩款不同 AI 工具時，哪些因素最重要？",
        options: [
          "各公司的用戶規模，以及工具推出市場的時間長短",
          "針對您用例的準確度、數據私隱政策、整合能力、輸出質素，以及在特定範疇的表現",
          "回應速度、訂閱價格，以及介面是否需要技術訓練才能操作",
          "支援的語言數量，以及是否提供免費試用期"
        ],
      },
      es: {
        question: "Al evaluar dos herramientas de IA diferentes para una tarea de negocio, ¿qué factores son más importantes considerar?",
        options: [
          "El tamaño de la base de usuarios de cada empresa y cuánto tiempo lleva cada herramienta disponible en el mercado",
          "Precisión para tu caso de uso, políticas de privacidad de datos, capacidades de integración, calidad de salida y desempeño específico del dominio",
          "Velocidad de respuesta, precio de suscripción y si la interfaz requiere formación técnica para usarse",
          "El número de idiomas soportados y si se ofrece un período de prueba gratuito"
        ],
      },
    },
  },
  {
    id: 23, domain: "Ethics, Privacy, and Responsible AI", difficulty: "Competent",
    question: "A colleague wants to upload confidential client data to a free public AI chatbot to analyze it. What should you advise?",
    options: [
      "Remove all names and identifying details before uploading so the data is technically anonymized",
      "Do not upload confidential data to public AI tools as it may be used for training or become exposed; use enterprise tools with proper data handling agreements instead",
      "Check the tool's privacy policy first and proceed only if it states that conversation data is not stored",
      "Limit the upload to a summary of the data rather than the raw files to reduce the exposure risk"
    ],
    correctAnswer: "Do not upload confidential data to public AI tools as it may be used for training or become exposed; use enterprise tools with proper data handling agreements instead",
    translations: {
      "zh-TW": {
        question: "同事想將機密客戶資料上傳至免費的公開 AI 聊天機器人進行分析，您應如何建議？",
        options: [
          "上傳前先移除所有姓名與可辨識細節，視為已去識別化",
          "不要將機密資料上傳至公開 AI 工具，因其可能被用於訓練或外洩；應改用具備適當資料處理協議的企業級工具",
          "先查看工具的隱私政策，只有在明確聲明不保留對話資料時才進行",
          "僅上傳資料摘要而非原始檔案，以降低外洩風險"
        ],
      },
      "zh-HK": {
        question: "同事想將機密客戶資料上載至免費的公開 AI 聊天機械人作分析，您應如何建議？",
        options: [
          "上載前先移除所有姓名與可識別細節，視為已匿名化",
          "不要將機密資料上載至公開 AI 工具，因可能被用於訓練或外洩；應改用具適當數據處理協議的企業級工具",
          "先查看工具的私隱政策，只有在明確聲明不保留對話數據時才進行",
          "只上載資料摘要而非原始檔案，以降低外洩風險"
        ],
      },
      es: {
        question: "Un colega quiere subir datos confidenciales de clientes a un chatbot de IA público y gratuito para analizarlos. ¿Qué deberías aconsejar?",
        options: [
          "Eliminar todos los nombres y detalles identificativos antes de subir, para que los datos estén técnicamente anonimizados",
          "No subir datos confidenciales a herramientas de IA públicas ya que pueden usarse para entrenamiento o quedar expuestos; usar en su lugar herramientas empresariales con acuerdos adecuados de manejo de datos",
          "Revisar primero la política de privacidad de la herramienta y proceder solo si indica que los datos de la conversación no se almacenan",
          "Limitar la carga a un resumen de los datos en lugar de los archivos en bruto para reducir el riesgo de exposición"
        ],
      },
    },
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
    correctAnswer: "Systematic errors in AI outputs that result from biased training data or design choices, leading to unfair or discriminatory outcomes",
    translations: {
      "zh-TW": {
        question: "「演算法偏誤」是什麼？為何值得關注？",
        options: [
          "AI 模型傾向偏好資料中較常見的樣態，使其對邊緣案例的準確度下降",
          "AI 輸出中因訓練資料有偏或設計選擇不當而產生的系統性錯誤，會導致不公平或歧視性的結果",
          "AI 在不同硬體組態或作業環境下的表現差異",
          "資源雄厚公司所打造的 AI 工具與較小型組織工具之間的能力落差"
        ],
      },
      "zh-HK": {
        question: "「演算法偏見」是什麼？為何值得關注？",
        options: [
          "AI 模型傾向偏好數據中較常見的模式，使其對邊緣情況的準確度下降",
          "AI 輸出中因訓練數據有偏或設計選擇不當而產生的系統性錯誤，會導致不公平或歧視性的結果",
          "AI 在不同硬件配置或作業環境下的表現差異",
          "資源雄厚公司所建的 AI 工具與小型組織工具之間的能力差距"
        ],
      },
      es: {
        question: '¿Qué es el "sesgo algorítmico" y por qué es una preocupación?',
        options: [
          "La tendencia de los modelos de IA a favorecer patrones más comunes en los datos, reduciendo la precisión en casos límite",
          "Errores sistemáticos en las salidas de IA que resultan de datos de entrenamiento sesgados o decisiones de diseño, llevando a resultados injustos o discriminatorios",
          "Diferencias en el desempeño de la IA en distintas configuraciones de hardware o entornos operativos",
          "La brecha de capacidad entre las herramientas de IA construidas por empresas bien financiadas y las de organizaciones más pequeñas"
        ],
      },
    },
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
    correctAnswer: "Ensuring the AI does not discriminate based on protected characteristics and that human oversight remains in the decision-making process",
    translations: {
      "zh-TW": {
        question: "在招募決策中運用 AI 時，最重要的倫理考量是什麼？",
        options: [
          "確認 AI 的評分標準，是否與各特定職位的技術需求一致",
          "確保 AI 不因受保護的特徵而產生歧視，並在決策過程中保有人工監督",
          "確認所有應徵者在 AI 篩選時，都收到相同順序的相同問題",
          "確保 AI 以足夠大的資料集訓練，以進行統計上可靠的比較"
        ],
      },
      "zh-HK": {
        question: "在招聘決策中運用 AI 時，最重要的倫理考量是什麼？",
        options: [
          "確認 AI 的評分準則是否與各特定職位的技術需求一致",
          "確保 AI 不因受保護特徵而產生歧視，並在決策過程中保留人手監督",
          "確認所有應徵者在 AI 篩選時均獲得相同順序的相同問題",
          "確保 AI 以足夠大的數據集訓練，以作統計上可靠的比較"
        ],
      },
      es: {
        question: "Al usar IA para apoyar decisiones de contratación, ¿cuál es la consideración ética más importante?",
        options: [
          "Validar que los criterios de puntuación de la IA se alineen con los requisitos técnicos de cada rol específico",
          "Asegurar que la IA no discrimine por características protegidas y que se mantenga la supervisión humana en el proceso de decisión",
          "Confirmar que todos los candidatos reciban las mismas preguntas en el mismo orden durante el cribado por IA",
          "Asegurar que la IA haya sido entrenada con un conjunto de datos suficientemente grande para hacer comparaciones estadísticamente confiables"
        ],
      },
    },
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
    correctAnswer: "When organizational policy requires it, when your audience expects transparency, or when accuracy and accountability are critical — such as in legal, medical, or academic contexts",
    translations: {
      "zh-TW": {
        question: "在什麼情況下應揭露內容是在 AI 協助下所產生？",
        options: [
          "每當 AI 的貢獻超出文法或拼字修正等小幅編修時",
          "當組織政策要求、受眾期待透明度，或在法律、醫療、學術等對準確與問責至關重要的情境下",
          "僅在內容將對外發佈時；內部溝通不需揭露",
          "當您對內容是否符合品質標準沒把握、想管理受眾期待時"
        ],
      },
      "zh-HK": {
        question: "在什麼情況下應披露內容是在 AI 協助下產生？",
        options: [
          "每當 AI 貢獻超出文法或拼字校正等小幅修改時",
          "當機構政策要求、受眾期望透明度，或在法律、醫療、學術等對準確性與問責至關重要的情境下",
          "只有在內容將對外發佈時；內部溝通不需披露",
          "當您對內容是否符合質素標準沒把握、想管理受眾期望時"
        ],
      },
      es: {
        question: "¿En qué circunstancias deberías divulgar que un contenido fue creado con asistencia de IA?",
        options: [
          "Siempre que la IA haya contribuido más que pequeñas ediciones como gramática o revisión ortográfica",
          "Cuando la política organizacional lo exija, cuando tu audiencia espere transparencia, o cuando la precisión y la responsabilidad sean críticas — como en contextos legales, médicos o académicos",
          "Solo cuando el contenido se publique externamente, no para comunicaciones internas del negocio",
          "Cuando no estés seguro de si el contenido cumple estándares de calidad y quieras gestionar las expectativas de la audiencia"
        ],
      },
    },
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
    correctAnswer: "Deliberately introducing misleading or malicious data into a training dataset to corrupt the model's behavior or accuracy",
    translations: {
      "zh-TW": {
        question: "在 AI 資安脈絡下，「資料投毒」（data poisoning）是什麼？",
        options: [
          "讓模型接觸低品質或重複的訓練範例，導致其表現逐漸下降",
          "蓄意將誤導或惡意資料植入訓練資料集，以破壞模型的行為或準確度",
          "透過精心設計的對抗式提示，從已上線的模型中萃取敏感資訊",
          "以過量請求塞爆模型 API，以降低其可用性與回應品質"
        ],
      },
      "zh-HK": {
        question: "在 AI 資訊保安語境下，「數據投毒」（data poisoning）是什麼？",
        options: [
          "讓模型接觸低質量或重複的訓練樣本，導致其表現逐漸下降",
          "蓄意把誤導或惡意數據植入訓練數據集，以破壞模型的行為或準確度",
          "透過精心設計的對抗式提示，從已部署的模型中抽取敏感資訊",
          "用過量請求塞爆模型 API，以降低其可用性與回應質素"
        ],
      },
      es: {
        question: '¿Qué es el "envenenamiento de datos" (data poisoning) en el contexto de la seguridad de la IA?',
        options: [
          "Exponer un modelo a ejemplos de entrenamiento de baja calidad o redundantes que degradan gradualmente su desempeño",
          "Introducir deliberadamente datos engañosos o maliciosos en un conjunto de entrenamiento para corromper el comportamiento o la precisión del modelo",
          "Extraer información sensible de un modelo desplegado mediante prompts adversariales diseñados específicamente",
          "Sobrecargar la API de un modelo con peticiones excesivas para degradar su disponibilidad y calidad de respuesta"
        ],
      },
    },
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
    correctAnswer: "Maintaining human oversight and decision-making authority at critical points in AI-driven processes, especially for high-stakes outcomes",
    translations: {
      "zh-TW": {
        question: "下列何者最能描述 AI 系統的「人類介入」（human-in-the-loop）原則？",
        options: [
          "在用於更新模型前，須由人工手動為所有訓練資料進行標註",
          "在 AI 驅動流程的關鍵節點，尤其是高風險結果，仍保有人類監督與決策權",
          "確保每一筆 AI 產出的輸出，在被儲存或執行前都由人工檢視",
          "在 AI 系統遇到非預期錯誤時，隨時有開發者可介入處理"
        ],
      },
      "zh-HK": {
        question: "下列哪項最能描述 AI 系統的「人類介入」（human-in-the-loop）原則？",
        options: [
          "在用作更新模型前，須由人手標註所有訓練數據",
          "在 AI 驅動流程的關鍵節點，尤其是高風險結果，仍保留人類監督與決策權",
          "確保每一筆 AI 生成的輸出，在被儲存或執行前都經人手審視",
          "在 AI 系統遇到意外錯誤時，隨時有開發者可介入處理"
        ],
      },
      es: {
        question: '¿Cuál de las siguientes describe mejor el principio de "human-in-the-loop" para sistemas de IA?',
        options: [
          "Requerir que un humano etiquete manualmente todos los datos de entrenamiento antes de usarse para actualizar un modelo",
          "Mantener la supervisión humana y la autoridad de decisión en puntos críticos de procesos impulsados por IA, especialmente para resultados de alto riesgo",
          "Asegurar que un humano revise cada salida generada por IA antes de almacenarla o actuar sobre ella",
          "Tener un desarrollador de guardia para intervenir cuando un sistema de IA encuentre un error inesperado"
        ],
      },
    },
  },
  {
    id: 29, domain: "AI in the Workplace", difficulty: "Competent",
    question: "Which of the following tasks is AI currently most reliable for in a professional setting?",
    options: [
      "Conducting stakeholder interviews, facilitating workshops, and building cross-functional alignment",
      "Drafting initial content, summarizing documents, analyzing patterns in data, and automating repetitive tasks",
      "Negotiating vendor contracts, managing client relationships, and resolving escalated complaints",
      "Designing organizational strategy, evaluating cultural fit, and setting long-term business priorities"
    ],
    correctAnswer: "Drafting initial content, summarizing documents, analyzing patterns in data, and automating repetitive tasks",
    translations: {
      "zh-TW": {
        question: "在職場環境中，AI 目前最能穩定完成下列哪項任務？",
        options: [
          "進行利害關係人訪談、引導工作坊、建立跨部門共識",
          "撰寫初稿、摘要文件、分析資料樣態、自動化重複性工作",
          "洽談供應商合約、經營客戶關係、處理升級投訴",
          "設計組織策略、評估文化契合度、設定長期業務優先順序"
        ],
      },
      "zh-HK": {
        question: "在職場環境中，AI 目前最能可靠處理下列哪項任務？",
        options: [
          "進行持份者訪談、主持工作坊、建立跨部門共識",
          "撰寫初稿、摘要文件、分析數據模式、自動化重複性工作",
          "洽談供應商合約、維繫客戶關係、處理升級投訴",
          "設計機構策略、評估文化契合度、訂立長期業務優次"
        ],
      },
      es: {
        question: "¿Para cuál de las siguientes tareas es actualmente más confiable la IA en un entorno profesional?",
        options: [
          "Realizar entrevistas con stakeholders, facilitar talleres y construir alineación interfuncional",
          "Redactar contenido inicial, resumir documentos, analizar patrones en datos y automatizar tareas repetitivas",
          "Negociar contratos con proveedores, gestionar relaciones con clientes y resolver quejas escaladas",
          "Diseñar estrategia organizacional, evaluar ajuste cultural y establecer prioridades de negocio a largo plazo"
        ],
      },
    },
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
    correctAnswer: "Start with a focused pilot, identify pain points AI can address, train team members, measure outcomes, and scale gradually based on demonstrated value",
    translations: {
      "zh-TW": {
        question: "團隊導入 AI 工具至既有流程時，應如何進行？",
        options: [
          "調查成員偏好，並採購獲選率最高的工具",
          "從聚焦的試點開始，找出 AI 能解決的痛點，訓練成員、衡量成效，並依驗證成果逐步擴大規模",
          "在導入任何工具前，先聘請外部顧問設計完整 AI 策略",
          "同時在所有工作流程部署最先進工具，以加速採用"
        ],
      },
      "zh-HK": {
        question: "團隊把 AI 工具引入現有工作流程時，應如何進行？",
        options: [
          "調查成員偏好，並採購獲選率最高的工具",
          "由聚焦的試點開始，找出 AI 能解決的痛點，培訓成員、衡量成效，並按驗證成果逐步擴展",
          "在引入任何工具前，先聘用外部顧問設計完整 AI 策略",
          "同時在所有工作流程部署最先進工具，以加快採用"
        ],
      },
      es: {
        question: "¿Cómo debería un equipo enfocar la implementación de herramientas de IA en su flujo de trabajo existente?",
        options: [
          "Encuestar a los miembros del equipo sobre sus preferencias y comprar la herramienta con la mayor aprobación",
          "Comenzar con un piloto focalizado, identificar los puntos débiles que la IA puede abordar, capacitar al equipo, medir resultados y escalar gradualmente basándose en el valor demostrado",
          "Contratar un consultor externo para diseñar una estrategia integral de IA antes de introducir cualquier herramienta",
          "Desplegar la herramienta más avanzada disponible en todos los flujos de trabajo simultáneamente para maximizar la velocidad de adopción"
        ],
      },
    },
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
    correctAnswer: "Track metrics such as time saved, error reduction rates, output quality improvements, and cost savings relative to the investment in tools and training",
    translations: {
      "zh-TW": {
        question: "衡量工作中導入 AI 工具的投資報酬率（ROI），最有效的方式是什麼？",
        options: [
          "比較導入 AI 前後的團隊人數，以量化人力成本的減少",
          "追蹤節省的時間、錯誤減少率、輸出品質提升、成本節約等指標，並與工具及訓練的投資成本相對照",
          "每季員工問卷調查，並以高滿意度作為商業價值的替代指標",
          "追蹤每週完成的任務數，並與月訂閱費比較"
        ],
      },
      "zh-HK": {
        question: "衡量工作中採用 AI 工具的投資回報率（ROI），最有效的方法是什麼？",
        options: [
          "比較採用 AI 前後的團隊人數，以量化人力成本的下降",
          "追蹤節省時間、錯誤減少率、輸出質素提升、成本節省等指標，並與工具及培訓的投資成本對比",
          "每季進行員工調查，並把高滿意度視作商業價值的替代指標",
          "追蹤每週完成的任務數，並與月訂閱費比較"
        ],
      },
      es: {
        question: "¿Cuál es la forma más efectiva de medir el ROI de la adopción de herramientas de IA en tu trabajo?",
        options: [
          "Comparar la plantilla del equipo antes y después de adoptar la IA para cuantificar la reducción en costos laborales",
          "Monitorear métricas como tiempo ahorrado, tasas de reducción de errores, mejoras en calidad de salida y ahorros de costos en relación con la inversión en herramientas y capacitación",
          "Encuestar a los empleados cada trimestre y tratar las altas puntuaciones de satisfacción como un indicador del valor de negocio",
          "Monitorear las tareas completadas por semana y comparar esa cifra con el costo mensual de suscripción"
        ],
      },
    },
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
    correctAnswer: "Use an approved AI tool to process the meeting notes, then review the summary for accuracy and completeness before distributing it",
    translations: {
      "zh-TW": {
        question: "主管請您用 AI 摘要會議紀錄並分派行動項目，最佳做法是什麼？",
        options: [
          "使用 AI 工具的自動發送功能，在會議結束後立即分派摘要",
          "使用經核准的 AI 工具處理會議紀錄，並在發送前檢視摘要的準確性與完整性",
          "用 AI 完整逐字轉錄會議，並分享完整逐字稿而非產生的摘要",
          "請 AI 以每位與會者的觀點產生摘要，並分享所有版本"
        ],
      },
      "zh-HK": {
        question: "主管要求您用 AI 總結會議記錄並派發行動項目，最佳做法是什麼？",
        options: [
          "使用 AI 工具的自動傳送功能，會議結束後即時派發摘要",
          "使用已批准的 AI 工具處理會議記錄，並在派發前檢視摘要的準確性與完整性",
          "用 AI 完整逐字轉錄會議，並分享整份逐字稿而非生成的摘要",
          "請 AI 以每位與會者的角度生成摘要，並分享所有版本"
        ],
      },
      es: {
        question: "Un gerente te pide que uses IA para resumir notas de reuniones y distribuir elementos de acción. ¿Cuál es el mejor enfoque?",
        options: [
          "Usar la función de envío automático de la herramienta de IA para distribuir el resumen inmediatamente después de la reunión",
          "Usar una herramienta de IA aprobada para procesar las notas de la reunión, luego revisar el resumen en cuanto a precisión y completitud antes de distribuirlo",
          "Transcribir la reunión literalmente usando IA y compartir la transcripción completa en lugar de un resumen generado",
          "Pedirle a la IA que genere un resumen desde la perspectiva de cada participante y compartir todas las versiones"
        ],
      },
    },
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
    correctAnswer: "Strategically integrating AI at points in a workflow where it adds the most value while preserving human judgment for complex decisions and relationship-driven tasks",
    translations: {
      "zh-TW": {
        question: "建立「AI 強化流程」（AI-augmented workflow）的意涵為何？",
        options: [
          "無論複雜度為何，一律用 AI 工具取代最耗時的流程步驟",
          "在流程中 AI 最能加分的節點策略性導入 AI，複雜決策與關係導向任務仍由人類判斷負責",
          "建立與現有流程並行的 AI 流程，待全面驗證後再採用",
          "將流程的每一步驟文件化，再依速度分派給人類或 AI"
        ],
      },
      "zh-HK": {
        question: "建立「AI 強化流程」（AI-augmented workflow）是什麼意思？",
        options: [
          "無論複雜度如何，一律用 AI 工具取代最耗時的流程步驟",
          "在流程中 AI 最能加分的節點策略性引入 AI，複雜決策與關係導向的任務仍由人類判斷負責",
          "建立與現有流程並行的 AI 流程，待全面驗證後才採用",
          "把流程每一步驟文件化，再按速度分派予人類或 AI"
        ],
      },
      es: {
        question: '¿Qué significa crear un "flujo de trabajo aumentado con IA"?',
        options: [
          "Reemplazar los pasos del flujo de trabajo más consumidores de tiempo con herramientas de IA sin importar su complejidad",
          "Integrar estratégicamente la IA en los puntos del flujo de trabajo donde agrega más valor, conservando el juicio humano para decisiones complejas y tareas basadas en relaciones",
          "Construir un proceso paralelo impulsado por IA que corra junto a los flujos existentes hasta estar completamente validado",
          "Documentar cada paso del flujo de trabajo y asignar cada uno a un humano o a una IA según la velocidad"
        ],
      },
    },
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
    correctAnswer: "Apply common-sense data privacy practices, avoid uploading sensitive information to public tools, document your AI usage, and advocate for creating a formal policy",
    translations: {
      "zh-TW": {
        question: "當組織尚未建立正式 AI 使用政策時，應如何應對？",
        options: [
          "觀察競爭對手公開使用的工具，並照搬其做法作為暫行基準",
          "採用常識性的資料隱私實務、避免將敏感資訊上傳至公開工具、記錄您的 AI 使用情況，並倡議建立正式政策",
          "將 AI 使用限於低風險的行政事務，等待領導層劃定可接受範圍",
          "在開始前，針對每一款打算使用的 AI 工具向主管請求書面核可"
        ],
      },
      "zh-HK": {
        question: "當機構尚未制訂正式 AI 使用政策時，應如何處理？",
        options: [
          "留意競爭對手公開使用的工具，並照搬其做法作為暫行基準",
          "採用常識性的數據私隱做法、避免將敏感資訊上載至公開工具、記錄您的 AI 使用情況，並倡議制訂正式政策",
          "把 AI 使用限於低風險的行政事務，等待領導層劃定可接受範圍",
          "在開始前，就每一款擬使用的 AI 工具向主管請求書面批准"
        ],
      },
      es: {
        question: "¿Cómo deberías manejar una situación en la que tu organización no tiene una política formal de uso de IA?",
        options: [
          "Identificar qué herramientas usan públicamente los competidores y replicar su enfoque como línea base de trabajo",
          "Aplicar prácticas sensatas de privacidad de datos, evitar subir información sensible a herramientas públicas, documentar tu uso de IA y abogar por la creación de una política formal",
          "Limitar el uso de IA a tareas administrativas de bajo riesgo y esperar a que el liderazgo defina los límites aceptables",
          "Solicitar aprobación por escrito a tu gerente para cada herramienta de IA que planees usar antes de empezar"
        ],
      },
    },
  },
  {
    id: 35, domain: "Role-Specific AI Competency", difficulty: "Competent",
    question: "A marketing team wants to use AI for content creation. Which approach balances efficiency with brand integrity?",
    options: [
      "Train the AI on existing brand assets so it can produce final-quality content without human editing",
      "Use AI to generate drafts and variations, then have team members edit for brand voice, accuracy, and strategic alignment before publishing",
      "Use AI for ideation only and have copywriters produce all written content entirely from scratch",
      "Reserve AI for high-volume, low-visibility content and rely on human writers for key campaigns"
    ],
    correctAnswer: "Use AI to generate drafts and variations, then have team members edit for brand voice, accuracy, and strategic alignment before publishing",
    translations: {
      "zh-TW": {
        question: "行銷團隊欲運用 AI 創作內容，哪種做法能兼顧效率與品牌一致性？",
        options: [
          "以既有品牌素材訓練 AI，使其無需人工修改即可產出最終品質內容",
          "以 AI 產生初稿與多種版本，再由成員針對品牌語氣、正確性與策略一致性進行編修後發佈",
          "AI 只用於發想，所有文字內容仍由文案人員從零開始撰寫",
          "AI 僅用於高量低曝光的內容，重點宣傳仍倚賴人工撰寫"
        ],
      },
      "zh-HK": {
        question: "市場營銷團隊想以 AI 創作內容，哪種做法能兼顧效率與品牌一致性？",
        options: [
          "以現有品牌素材訓練 AI，使其無需人手修改即可產出最終質素內容",
          "用 AI 生成初稿與多個版本，再由成員就品牌語氣、準確性與策略一致性作編修後才發佈",
          "AI 只用於構思，所有文字內容仍由文案人員從零開始撰寫",
          "AI 只用於高量低曝光的內容，重點宣傳仍倚賴人手撰寫"
        ],
      },
      es: {
        question: "Un equipo de marketing quiere usar IA para la creación de contenido. ¿Qué enfoque equilibra eficiencia e integridad de marca?",
        options: [
          "Entrenar la IA con los activos de marca existentes para que pueda producir contenido de calidad final sin edición humana",
          "Usar la IA para generar borradores y variaciones, y luego que los miembros del equipo editen según la voz de marca, precisión y alineación estratégica antes de publicar",
          "Usar la IA solo para ideación y que los redactores produzcan todo el contenido escrito completamente desde cero",
          "Reservar la IA para contenido de alto volumen y baja visibilidad, y depender de redactores humanos para campañas clave"
        ],
      },
    },
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
    correctAnswer: "Use AI as a decision-support tool to help clinicians identify patterns and possible diagnoses, while physicians retain final authority over medical decisions",
    translations: {
      "zh-TW": {
        question: "在醫療場域中，AI 診斷工具最適切的使用方式為何？",
        options: [
          "先在風險較低的科別部署 AI，待準確度基準穩定達標後再擴大使用",
          "以 AI 作為決策輔助工具，協助臨床人員辨識樣態與可能診斷，醫師仍對最終醫療決策保有主導權",
          "讓 AI 獨立處理例行診斷，僅於複雜或罕見病例時才由醫師介入",
          "主要將 AI 用於產生第二意見，並僅於主治醫師已不確定的病例上使用"
        ],
      },
      "zh-HK": {
        question: "在醫療場景中，AI 診斷工具最合適的使用方式為何？",
        options: [
          "先在風險較低的科室部署 AI，待準確度基準穩定達標後才擴展使用",
          "把 AI 用作決策輔助工具，協助臨床人員識別模式與可能診斷，醫生仍對最終醫療決策保有主導權",
          "讓 AI 獨立處理常規診斷，僅在複雜或罕見個案才由醫生介入",
          "主要將 AI 用於產生第二意見，並只在主診醫生已感不確定的個案上使用"
        ],
      },
      es: {
        question: "En un entorno de atención médica, ¿cuál es el uso más apropiado de herramientas diagnósticas con IA?",
        options: [
          "Desplegar la IA primero en departamentos de menor riesgo y ampliar el acceso una vez que se cumplan consistentemente los parámetros de precisión",
          "Usar la IA como herramienta de apoyo a la decisión para ayudar a los clínicos a identificar patrones y posibles diagnósticos, mientras los médicos conservan la autoridad final sobre las decisiones médicas",
          "Permitir que la IA maneje los diagnósticos rutinarios de forma independiente e involucrar a los médicos solo en casos complejos o inusuales",
          "Usar la IA principalmente para generar segundas opiniones en casos donde el médico tratante ya tiene incertidumbre"
        ],
      },
    },
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
    correctAnswer: "Review every AI-generated suggestion for security vulnerabilities, logic errors, and adherence to project coding standards before committing",
    translations: {
      "zh-TW": {
        question: "軟體開發者使用 AI 程式碼助理時，維持程式碼品質最重要的做法是什麼？",
        options: [
          "所有 AI 產出的程式碼都透過自動化測試執行，通過所有測試即採納",
          "在提交之前，針對每一個 AI 建議審視其安全漏洞、邏輯錯誤，以及是否符合專案程式規範",
          "樣板與工具類程式碼接受 AI 建議，核心商業邏輯仍由人工撰寫",
          "僅當 AI 產出的程式碼長度或複雜度超過一定門檻時，才由另一位開發者檢視"
        ],
      },
      "zh-HK": {
        question: "軟件開發人員使用 AI 編程助理時，維持程式碼質素最重要的做法是什麼？",
        options: [
          "所有 AI 生成的程式碼都透過自動化測試執行，通過所有測試即採納",
          "在提交之前，針對每一個 AI 建議審視其保安漏洞、邏輯錯誤，以及是否符合項目編碼規範",
          "樣板與工具類程式碼接受 AI 建議，核心業務邏輯則由人手撰寫",
          "只有當 AI 生成的程式碼長度或複雜度超過一定程度時，才交由另一位開發者審視"
        ],
      },
      es: {
        question: "Un desarrollador de software usa un asistente de código con IA. ¿Qué práctica es más importante para mantener la calidad del código?",
        options: [
          "Ejecutar todo el código generado por IA a través de pruebas automatizadas y aceptarlo si todos los casos de prueba pasan",
          "Revisar cada sugerencia generada por IA en busca de vulnerabilidades de seguridad, errores de lógica y adherencia a los estándares de codificación del proyecto antes de hacer commit",
          "Aceptar sugerencias de IA para código repetitivo y utilitarios pero escribir toda la lógica de negocio central manualmente",
          "Hacer que un segundo desarrollador revise el código generado por IA solo cuando excede cierta longitud o complejidad"
        ],
      },
    },
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
    correctAnswer: "AI can automate data gathering, identify trends, generate preliminary analysis, and flag anomalies, while human analysts validate findings and make strategic recommendations",
    translations: {
      "zh-TW": {
        question: "AI 如何能最有效支援財務分析與報表撰寫？",
        options: [
          "AI 可取代建模與預測步驟，人類則專責與客戶溝通",
          "AI 能自動化資料蒐集、辨識趨勢、產出初步分析並標記異常，人類分析師則驗證結論並提出策略建議",
          "AI 最適合從既有報告產生高階儀表板與敘述性摘要",
          "AI 能監測即時市場資料，在事先核可的風險範圍內執行交易"
        ],
      },
      "zh-HK": {
        question: "AI 如何能最有效支援財務分析與報告撰寫？",
        options: [
          "AI 可取代建模與預測步驟，人類則專注於客戶溝通",
          "AI 能自動蒐集數據、識別趨勢、產出初步分析並標示異常，人類分析師則驗證結論並提出策略建議",
          "AI 最適合從現有報告生成高層儀表板與敘述性摘要",
          "AI 能監察實時市場數據，在預先批准的風險範圍內執行交易"
        ],
      },
      es: {
        question: "¿Cómo puede apoyar mejor la IA al análisis financiero y la elaboración de informes?",
        options: [
          "La IA puede reemplazar los pasos de modelado y pronóstico mientras los humanos se enfocan únicamente en la comunicación con el cliente",
          "La IA puede automatizar la recolección de datos, identificar tendencias, generar análisis preliminares y marcar anomalías, mientras los analistas humanos validan los hallazgos y hacen recomendaciones estratégicas",
          "La IA es más adecuada para generar tableros ejecutivos y resúmenes narrativos a partir de informes existentes",
          "La IA puede monitorear datos del mercado en tiempo real y ejecutar operaciones dentro de parámetros de riesgo preaprobados"
        ],
      },
    },
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
    correctAnswer: "Regularly audit the screening criteria for disparate impact, ensure diverse training data, maintain human review for borderline candidates, and provide an appeal process",
    translations: {
      "zh-TW": {
        question: "人資團隊考慮採用 AI 履歷篩選，最重要的保障措施為何？",
        options: [
          "由 AI 對應徵者排名，招募人員只需聚焦於分數最高的級別",
          "定期稽核篩選標準是否造成差別影響、確保訓練資料具多元性、對臨界候選人保留人工複審，並提供申訴管道",
          "向應徵者揭露使用 AI 篩選，讓其可據此優化履歷",
          "將 AI 排名與最資深招募人員的排名相比，以驗證其準確度"
        ],
      },
      "zh-HK": {
        question: "人力資源團隊考慮採用 AI 履歷篩選，最重要的保障措施為何？",
        options: [
          "由 AI 為應徵者排名，招聘人員只需聚焦於分數最高的級別",
          "定期稽核篩選準則是否造成差別影響、確保訓練數據具多元性、對臨界候選人保留人手複審，並提供申訴途徑",
          "向應徵者披露採用 AI 篩選，讓其據此優化履歷",
          "將 AI 排名與最資深招聘人員的排名相比，以驗證其準確度"
        ],
      },
      es: {
        question: "Un equipo de RRHH está considerando el cribado de currículums con IA. ¿Cuál es la salvaguarda más importante?",
        options: [
          "Usar la IA para clasificar candidatos y que los reclutadores enfoquen su atención en el nivel de mayor puntuación",
          "Auditar regularmente los criterios de cribado en busca de impacto desigual, asegurar datos de entrenamiento diversos, mantener revisión humana para candidatos en el límite y proporcionar un proceso de apelación",
          "Informar a los candidatos de que se usa IA en el cribado para que puedan optimizar sus currículums",
          "Validar la precisión de la IA comparando sus clasificaciones con las de tu reclutador más experimentado"
        ],
      },
    },
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
    correctAnswer: "Teach students to use AI as a learning tool, set clear usage guidelines, redesign assessments to evaluate critical thinking alongside AI-assisted work, and model responsible AI use",
    translations: {
      "zh-TW": {
        question: "教師欲將 AI 整合至教學實務，哪種做法在教學法上最為穩健？",
        options: [
          "先在正式使用前，以選修性質的延伸活動逐步引入 AI 工具",
          "教學生將 AI 作為學習工具、訂定明確使用準則、重新設計評量以同時評估批判思考與 AI 輔助成果，並以身作則示範負責任的 AI 使用",
          "將 AI 導入聚焦於評分與行政工作，以保留課堂時間用於直接教學",
          "讓學生自行決定是否使用 AI 工具，並依其選擇調整評分標準"
        ],
      },
      "zh-HK": {
        question: "教師想將 AI 融入教學實踐，哪種做法在教學法上最為穩健？",
        options: [
          "在正式採用前，先以選修性質的延伸活動逐步引入 AI 工具",
          "教導學生把 AI 作為學習工具、訂立清晰的使用指引、重新設計評估以同時考核批判思考與 AI 輔助成果，並以身作則示範負責任的 AI 使用",
          "把 AI 融入聚焦於評分與行政工作，以保留課堂時間用於直接教學",
          "讓學生自行決定是否使用 AI 工具，並按其選擇調整評分準則"
        ],
      },
      es: {
        question: "Un educador quiere integrar la IA en su práctica docente. ¿Qué enfoque es más sólido pedagógicamente?",
        options: [
          "Introducir las herramientas de IA gradualmente poniéndolas disponibles para actividades opcionales de enriquecimiento antes del uso formal",
          "Enseñar a los estudiantes a usar la IA como herramienta de aprendizaje, establecer pautas claras de uso, rediseñar las evaluaciones para valorar el pensamiento crítico junto al trabajo asistido por IA, y modelar un uso responsable de la IA",
          "Enfocar la integración de IA en la calificación y tareas administrativas para preservar el tiempo de clase para instrucción directa",
          "Permitir a los estudiantes elegir si usar herramientas de IA y ajustar los criterios de calificación según su elección individual"
        ],
      },
    },
  },
];
