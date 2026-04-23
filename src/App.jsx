import { useState, useEffect, useRef } from "react";
import { buildQuestions, retranslateQuestions } from "./questions";
import { generateStudyPlan, generateStudyPlanHTML } from "./studyPlan";
import { t, getDomainName, getLevelName, getDifficulty, frameworkTranslations, LANGUAGES } from "./i18n";

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

function LanguageToggle({ lang, onChange }) {
  return (
    <div style={{
      display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap",
      marginBottom: 16
    }}>
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          style={{
            background: lang === l.code ? "#2563EB" : "white",
            color: lang === l.code ? "white" : "#6B7280",
            border: `1px solid ${lang === l.code ? "#2563EB" : "#E5E7EB"}`,
            borderRadius: 20, padding: "4px 12px", fontSize: 12,
            fontWeight: 600, cursor: "pointer", transition: "all 0.15s"
          }}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

function WelcomeScreen({ onStart, lang }) {
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
          {t(lang, "app.title")}
        </h1>
        <p style={{ fontSize: 18, color: "#6B7280", margin: 0 }}>{t(lang, "app.subtitle")}</p>
      </div>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.6, marginBottom: 24 }}>
        {t(lang, "welcome.intro")}
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32,
        textAlign: "center"
      }}>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#2563EB" }}>40</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{t(lang, "welcome.questions")}</div>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#7C3AED" }}>6</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{t(lang, "welcome.domains")}</div>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 8px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#059669" }}>5</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{t(lang, "welcome.levels")}</div>
        </div>
      </div>
      <div style={{
        background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 16,
        marginBottom: 32, textAlign: "left"
      }}>
        <div style={{ fontSize: 13, color: "#1D4ED8", lineHeight: 1.5 }}>
          {t(lang, "welcome.target")}
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
        {t(lang, "welcome.start")}
      </button>
      <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 12 }}>{t(lang, "welcome.time")}</p>
    </div>
  );
}

function QuestionScreen({ question, questions, index, total, answer, onAnswer, onNext, onPrev, onExit, lang }) {
  const domainInfo = domains.find(d => d.name === question.domain);
  const domainColor = domainInfo?.color || "#2563EB";

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{
          display: "inline-block", background: domainColor + "18", color: domainColor,
          fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20
        }}>
          {getDomainName(lang, question.domain)}
        </span>
        <span style={{ fontSize: 13, color: "#9CA3AF" }}>
          {index + 1} {t(lang, "question.of")} {total}
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
            {getDifficulty(lang, question.difficulty)}
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
          {t(lang, "question.previous")}
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
          {index === total - 1 ? t(lang, "question.finish") : t(lang, "question.next")}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          onClick={onExit}
          style={{
            background: "none", border: "none", fontSize: 13,
            color: "#9CA3AF", cursor: "pointer", textDecoration: "underline",
            padding: "4px 8px"
          }}
        >
          {t(lang, "question.exit")}
        </button>
      </div>
    </div>
  );
}

function DomainTransition({ domainIndex, onContinue, lang }) {
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
        {domainIndex + 1} {t(lang, "question.of")} 6
      </h2>
      <p style={{ fontSize: 16, color: d.color, fontWeight: 600, margin: "0 0 8px" }}>
        {getDomainName(lang, d.name)}
      </p>
      <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 6px" }}>
        {d.count} {t(lang, "transition.questions")} &middot; {d.weight} {t(lang, "transition.weightOfOverall")}
      </p>
      <p style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic", margin: "0 0 24px", maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.4 }}>
        {t(lang, "transition.weightExplanation")}
      </p>
      <button
        onClick={onContinue}
        style={{
          background: d.color, color: "white", border: "none", borderRadius: 10,
          padding: "12px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer"
        }}
      >
        {t(lang, "transition.start")}
      </button>
    </div>
  );
}

function DomainComplete({ domainIndex, score, total, pct, isLast, onContinue, lang }) {
  const d = domains[domainIndex];
  const level = getLevel(pct);
  const translatedLevel = getLevelName(lang, level.name);

  return (
    <div style={{ textAlign: "center", maxWidth: 520, margin: "40px auto" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
        {t(lang, "domainComplete.title")}
      </div>
      <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 20px" }}>
        {t(lang, "domainComplete.subtitle")}
      </p>

      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 110, height: 110, borderRadius: "50%",
        background: `conic-gradient(${level.color} ${pct * 3.6}deg, #E5E7EB ${pct * 3.6}deg)`,
        marginBottom: 16
      }}>
        <div style={{
          width: 86, height: 86, borderRadius: "50%", background: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column"
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: level.color }}>{pct}%</span>
        </div>
      </div>

      <div style={{
        display: "inline-block", background: level.color + "15", color: level.color,
        padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 16
      }}>
        {translatedLevel}
      </div>

      <p style={{ fontSize: 15, color: d.color, fontWeight: 600, margin: "0 0 4px" }}>
        {getDomainName(lang, d.name)}
      </p>
      <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 24px" }}>
        {score} / {total} {t(lang, "results.correct")}
      </p>

      <button
        onClick={onContinue}
        style={{
          background: isLast ? "linear-gradient(135deg, #059669, #0891B2)" : d.color,
          color: "white", border: "none", borderRadius: 10,
          padding: "12px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
          boxShadow: isLast ? "0 4px 14px rgba(5,150,105,0.3)" : "none"
        }}
      >
        {isLast ? t(lang, "domainComplete.viewResults") : t(lang, "domainComplete.continue")}
      </button>
    </div>
  );
}

function StudyPlanSection({ domainScores, totalPct, levelName, lang }) {
  const translatedLevelName = getLevelName(lang, levelName);
  const plan = generateStudyPlan(domainScores, totalPct, translatedLevelName, lang);

  const handleDownload = () => {
    const html = generateStudyPlanHTML(plan, lang);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AI-Proficiency-Upskilling-Plan.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontSize: 14, fontWeight: 600, color: "#6B7280",
        textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12
      }}>
        {t(lang, "results.upskillingPlan")}
      </h3>

      <div style={{
        background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)",
        border: "1px solid #DBEAFE", borderRadius: 12, padding: 20, marginBottom: 16
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>{t(lang, "results.yourLevel")}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1E40AF" }}>{translatedLevelName} ({totalPct}%)</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>{t(lang, "results.target")}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>{t(lang, "results.targetLevel")}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#4B5563" }}>
          {t(lang, "results.estimated")}: <strong>{plan.estimatedWeeks} {t(lang, "results.weeks")}</strong> {t(lang, "results.hoursPerWeek")}
        </div>
      </div>

      {plan.domainPlans.map((dp, di) => (
        <div key={di} style={{
          background: "white", border: "1px solid #E5E7EB", borderRadius: 12,
          padding: 20, marginBottom: 12
        }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1E40AF", margin: "0 0 4px" }}>
            {dp.domain}
          </h4>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 16px", lineHeight: 1.5 }}>
            {dp.description}
          </p>

          <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            {t(lang, "results.recommendedCourses")}
          </div>
          {dp.courses.map((c, ci) => (
            <div key={ci} style={{
              background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 8,
              padding: "10px 14px", marginBottom: 6
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 3 }}>
                {ci + 1}. {c.title}
              </div>
              <div style={{ fontSize: 11, color: "#6B7280", display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span>{c.provider}</span>
                <span>&middot; {c.duration}</span>
                <span>&middot; {c.level}</span>
              </div>
              <a href={c.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#2563EB", textDecoration: "none", wordBreak: "break-all" }}>
                {c.url}
              </a>
            </div>
          ))}

          <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5, margin: "14px 0 8px" }}>
            {t(lang, "results.practiceActivities")}
          </div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {dp.practiceActivities.map((a, ai) => (
              <li key={ai} style={{ fontSize: 12, color: "#374151", marginBottom: 6, lineHeight: 1.5 }}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          onClick={handleDownload}
          style={{
            background: "linear-gradient(135deg, #059669, #0891B2)", color: "white",
            border: "none", borderRadius: 12, padding: "12px 32px", fontSize: 14,
            fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(5,150,105,0.3)",
            display: "inline-flex", alignItems: "center", gap: 8
          }}
        >
          {t(lang, "results.download")}
        </button>
        <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>
          {t(lang, "results.downloadNote")}
        </p>
      </div>
    </div>
  );
}

function ResultsScreen({ answers, questions, onRestart, lang }) {
  const answeredCount = Object.keys(answers).length;
  const isPartial = answeredCount < questions.length;
  const correctCount = questions.reduce((c, q, i) => c + (answers[i] === q.correct ? 1 : 0), 0);
  const totalPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const level = getLevel(totalPct);
  const translatedLevel = getLevelName(lang, level.name);

  const domainScores = domains.map(d => {
    const qs = questions.filter(q => q.domain === d.name);
    const answered = qs.filter(q => answers[questions.indexOf(q)] !== undefined);
    const correct = qs.reduce((c, q) => c + (answers[questions.indexOf(q)] === q.correct ? 1 : 0), 0);
    const pct = answered.length > 0 ? Math.round((correct / answered.length) * 100) : 0;
    return { ...d, correct, total: qs.length, answered: answered.length, pct, level: getLevel(pct) };
  });

  const weakest = [...domainScores].sort((a, b) => a.pct - b.pct).slice(0, 2);
  const frameworks = frameworkTranslations[lang];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
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
          {translatedLevel}
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
          {correctCount} / {answeredCount} {t(lang, "results.correctOf")}
          {isPartial ? ` · ${answeredCount} / ${questions.length} ${t(lang, "results.completed")}` : ""}
        </p>
      </div>

      {isPartial && (
        <div style={{
          background: "#FFF7ED", border: "1px solid #FED7AA",
          borderRadius: 12, padding: 14, marginBottom: 16, textAlign: "center"
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#C2410C" }}>
            {t(lang, "results.partialTitle")} {answeredCount} {t(lang, "results.partialOf")} {questions.length}
          </span>
          <p style={{ fontSize: 12, color: "#9A3412", margin: "4px 0 0" }}>
            {t(lang, "results.partialNote")}
          </p>
        </div>
      )}

      <div style={{
        background: totalPct >= 60 ? "#ECFDF5" : "#FEF2F2",
        border: `1px solid ${totalPct >= 60 ? "#A7F3D0" : "#FECACA"}`,
        borderRadius: 12, padding: 16, marginBottom: 24, textAlign: "center"
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: totalPct >= 60 ? "#059669" : "#DC2626" }}>
          {totalPct >= 60 ? t(lang, "results.meetsBenchmark") : t(lang, "results.belowBenchmark")}
        </span>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          {t(lang, "results.proficiencyScale")}
        </h3>
        <div style={{ display: "flex", gap: 2, borderRadius: 8, overflow: "hidden", height: 28, position: "relative" }}>
          {levels.map((l, i) => (
            <div key={i} style={{
              flex: l.max - l.min + 1, background: l.name === level.name ? l.color : l.color + "30",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 600,
              color: l.name === level.name ? "white" : l.color + "90"
            }}>
              {getLevelName(lang, l.name)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>
          <span>0%</span><span>40%</span><span>60%</span><span>75%</span><span>90%</span><span>100%</span>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
          {t(lang, "results.domainBreakdown")}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {domainScores.map((d, i) => (
            <div key={i} style={{
              background: "white", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 16px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{getDomainName(lang, d.name)}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: d.level.color,
                  background: d.level.color + "15", padding: "2px 8px", borderRadius: 10
                }}>
                  {d.pct}% &middot; {getLevelName(lang, d.level.name)}
                </span>
              </div>
              <ProgressBar value={d.pct} max={100} color={d.color} height={6} />
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
                {d.correct} / {d.answered} {t(lang, "results.correct")}
                {d.answered < d.total ? ` (${d.answered} / ${d.total} ${t(lang, "results.answered")})` : ""}
                {" · "}{t(lang, "results.weight")}: {d.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 16, marginBottom: 24
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#92400E", margin: "0 0 8px" }}>
          {t(lang, "results.priorityAreas")}
        </h3>
        {weakest.map((d, i) => (
          <div key={i} style={{ fontSize: 13, color: "#78350F", marginBottom: 4 }}>
            {i + 1}. <strong>{getDomainName(lang, d.name)}</strong> ({d.pct}%) - {d.pct < 60 ? t(lang, "results.belowBench") : t(lang, "results.atBench")}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          {t(lang, "results.benchmark")}
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

      <StudyPlanSection domainScores={domainScores} totalPct={totalPct} levelName={level.name} lang={lang} />

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
          {t(lang, "results.retake")}
        </button>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>
          {t(lang, "results.retakeNote")}
        </p>
      </div>
    </div>
  );
}

export default function AIMIAModule7() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("welcome");
  const [questions, setQuestions] = useState(() => buildQuestions("en"));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentDomainIdx, setCurrentDomainIdx] = useState(0);
  const containerRef = useRef(null);

  const scrollTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setQuestions(prev => retranslateQuestions(prev, newLang));
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
    const currentDomain = getDomainForQuestion(currentQ);
    const isLastQuestion = currentQ === questions.length - 1;
    const nextDomain = isLastQuestion ? null : getDomainForQuestion(currentQ + 1);
    const domainChanged = isLastQuestion || nextDomain !== currentDomain;

    if (domainChanged) {
      setScreen("domainComplete");
      scrollTop();
      return;
    }

    setCurrentQ(currentQ + 1);
    scrollTop();
  };

  const handleDomainContinue = () => {
    const isLastQuestion = currentQ === questions.length - 1;
    if (isLastQuestion) {
      setScreen("results");
      scrollTop();
      return;
    }
    const nextQ = currentQ + 1;
    const nextDomain = getDomainForQuestion(nextQ);
    setCurrentDomainIdx(nextDomain);
    setCurrentQ(nextQ);
    setScreen("transition");
    scrollTop();
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      scrollTop();
    }
  };

  const handleExit = () => {
    setScreen("results");
    scrollTop();
  };

  const handleRestart = () => {
    setQuestions(buildQuestions(lang));
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
      <LanguageToggle lang={lang} onChange={handleLangChange} />

      <div style={{ textAlign: "center", marginBottom: 28, opacity: screen === "welcome" ? 0 : 1 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", letterSpacing: 2 }}>
          AIMIA
        </span>
        <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 8 }}>Module 7</span>
      </div>

      {screen === "welcome" && <WelcomeScreen onStart={startAssessment} lang={lang} />}

      {screen === "transition" && (
        <DomainTransition
          domainIndex={currentDomainIdx}
          onContinue={() => { setScreen("question"); scrollTop(); }}
          lang={lang}
        />
      )}

      {screen === "question" && (
        <QuestionScreen
          question={questions[currentQ]}
          questions={questions}
          index={currentQ}
          total={questions.length}
          answer={answers[currentQ]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onExit={handleExit}
          lang={lang}
        />
      )}

      {screen === "domainComplete" && (() => {
        const domainName = questions[currentQ].domain;
        const domainIdx = domains.findIndex(d => d.name === domainName);
        const qs = questions.filter(q => q.domain === domainName);
        const correct = qs.reduce((c, q) => c + (answers[questions.indexOf(q)] === q.correct ? 1 : 0), 0);
        const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
        const isLast = currentQ === questions.length - 1;
        return (
          <DomainComplete
            domainIndex={domainIdx}
            score={correct}
            total={qs.length}
            pct={pct}
            isLast={isLast}
            onContinue={handleDomainContinue}
            lang={lang}
          />
        );
      })()}

      {screen === "results" && (
        <ResultsScreen answers={answers} questions={questions} onRestart={handleRestart} lang={lang} />
      )}
    </div>
  );
}
