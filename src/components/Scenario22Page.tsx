import { useState, useMemo } from "react";
import {
  Search,
  Building2,
  ArrowRight,
  ShieldCheck,
  Bot,
  Sparkles,
  FileWarning,
  AlertTriangle,
  Database,
  ReceiptText,
  Ship,
  BarChart3,
  Leaf,
  Gauge,
  CheckCircle2,
  Circle,
  ChevronRight,
  Scale,
  Clock,
  Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { useDataI18n } from "../i18n/dataI18n";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import type { NodeStatus } from "../data/demoData";
import {
  scenario22Enterprises,
  scenario22SourceEdges,
  scenario22ContradictionEvents,
  scenario22SourceMeta,
  type EnterpriseData,
  type ContradictionEvent,
} from "../data/scenario22Data";
import "../styles-scenario-2-2.css";

const sourceIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  self_report: FileWarning, meter: Gauge, tax: ReceiptText,
  customs: Ship, stats: BarChart3, env: Leaf,
};

/* ── Helper: risk level label ── */
function riskLabel(t: (k: string) => string, score: number) {
  if (score >= 80) return t("s22.riskHigh");
  if (score >= 60) return t("s22.riskMedium");
  if (score >= 35) return t("s22.riskAttention");
  return t("s22.riskNormal");
}
function riskColor(score: number) {
  if (score >= 80) return "#dc2626";
  if (score >= 60) return "#f59e0b";
  if (score >= 35) return "#3b82f6";
  return "#059669";
}

/* ── Data Comparison Table ── */
function DataComparisonTable({ enterprise, t, td }: { enterprise: EnterpriseData; t: (k: string) => string; td: (text: string) => string }) {
  const sorted = useMemo(
    () => [...enterprise.dataSources].sort((a, b) => b.value - a.value),
    [enterprise],
  );
  const maxVal = sorted[0]?.value ?? 1;
  const minVal = sorted[sorted.length - 1]?.value ?? 0;
  const baselineVal = maxVal;
  const edges = scenario22SourceEdges.filter((e) => e.enterpriseId === enterprise.id);

  const deviationMap = new Map<string, { rate: number; status: NodeStatus }>();
  for (const edge of edges) {
    const update = (key: string) => {
      const existing = deviationMap.get(key);
      if (!existing || edge.deviationRate > existing.rate) {
        deviationMap.set(key, { rate: edge.deviationRate, status: edge.status });
      }
    };
    update(edge.from);
    update(edge.to);
  }

  function trustLevel(dev: number): { label: string; cls: string } {
    if (dev < 3) return { label: t("s22.trustHigh"), cls: "high" };
    if (dev < 7) return { label: t("s22.trustMedium"), cls: "medium" };
    return { label: t("s22.trustLow"), cls: "low" };
  }

  return (
    <div className="s22-data-panel">
      <div className="s22-panel-hdr">
        <div>
          <h3>{t("s22.dataComparisonTitle")}</h3>
          <span className="s22-panel-sub">
            {t("s22.dataComparisonSub").replace("{count}", String(sorted.length))}
          </span>
        </div>
      </div>
        <div className="s22-data-panel-content">
          <table className="s22-data-table">
            <thead>
              <tr>
                <th>{t("s22.tableHeaderSource")}</th>
                <th>{t("s22.tableHeaderValue")}</th>
                <th>{t("s22.tableHeaderUnit")}</th>
                <th>{t("s22.tableHeaderDeviation")}</th>
                <th>{t("s22.tableHeaderTrust")}</th>
                <th>{t("s22.tableHeaderFlag")}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((src) => {
                const meta = scenario22SourceMeta[src.source];
                const dev = deviationMap.get(src.source);
                const devRate = ((baselineVal - src.value) / baselineVal) * 100;
                const trust = trustLevel(devRate);
                const isAnomaly = devRate >= 7;
                return (
                  <tr key={src.source} className={isAnomaly ? "anomaly-row" : ""}>
                    <td>
                      <div className="s22-src-name">
                        <span className="s22-src-dot" style={{ background: meta?.color ?? "#94a3b8" }} />
                        {td(src.sourceLabel)}
                      </div>
                    </td>
                    <td style={{ fontFamily: "var(--font-number)", fontWeight: 800, fontSize: 14 }}>
                      {src.value.toLocaleString()}
                    </td>
                    <td style={{ color: "#94a3b8" }}>{src.unit}</td>
                    <td>
                      <div className="s22-deviation-bar-wrap">
                        <div className="s22-deviation-bar-bg">
                          <div
                            className="s22-deviation-bar-fill"
                            style={{
                              width: `${Math.min(devRate / 12 * 100, 100)}%`,
                              background: devRate >= 7 ? "#dc2626" : devRate >= 3 ? "#f59e0b" : "#059669",
                            }}
                          />
                        </div>
                        <span style={{
                          fontFamily: "var(--font-number)", fontWeight: 800, fontSize: 12,
                          color: devRate >= 7 ? "#dc2626" : devRate >= 3 ? "#f59e0b" : "#059669",
                        }}>
                          {devRate > 0 ? `-${devRate.toFixed(1)}%` : t("s22.baseline")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`s22-trust-badge ${trust.cls}`}>{trust.label}</span>
                    </td>
                    <td>
                      {isAnomaly ? (
                        <span className="s22-anomaly-flag">
                          <AlertTriangle size={10} />
                          {t("s22.anomalyFlag")}
                        </span>
                      ) : (
                        <span className="s22-normal-flag">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      <div className="s22-data-note">
        <ShieldCheck size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
        {t("s22.dataNote")}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function Scenario22Page() {
  const { t, lang, setLang } = useI18n();
  const { td } = useDataI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnterprise, setSelectedEnterprise] = useState<EnterpriseData>(scenario22Enterprises[0]);

  const filteredEnterprises = scenario22Enterprises.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const clues = scenario22ContradictionEvents.filter(
    (ce) => ce.enterpriseId === selectedEnterprise.id,
  );

  const topClue = useMemo(() => {
    if (clues.length === 0) return null;
    return clues.reduce((a, b) => (a.aiSuspicionScore > b.aiSuspicionScore ? a : b));
  }, [clues]);

  const maxScore = topClue?.aiSuspicionScore ?? 0;
  const totalAmount = clues.reduce((s, e) => s + e.involvedAmount, 0);

  const sortedSources = useMemo(
    () => [...selectedEnterprise.dataSources].sort((a, b) => b.value - a.value),
    [selectedEnterprise],
  );
  const maxVal = sortedSources[0]?.value ?? 1;
  const minVal = sortedSources[sortedSources.length - 1]?.value ?? 0;

  const loopSteps = [t("s22.loopStep1"), t("s22.loopStep2"), t("s22.loopStep3"), t("s22.loopStep4"), t("s22.loopStep5"), t("s22.loopStep6")];
  const currentLoopStep = 2;

  const actionSteps = [t("s22.actionStep1"), t("s22.actionStep2"), t("s22.actionStep3"), t("s22.actionStep4")];
  const basisItems = [t("s22.basis1"), t("s22.basis2"), t("s22.basis3"), t("s22.basis4"), t("s22.basis5")];
  const regActions = [t("s22.aiAction1"), t("s22.aiAction2"), t("s22.aiAction3"), t("s22.aiAction4"), t("s22.aiAction5")];

  return (
    <div className="app-shell s22-shell">
      {/* ── Header ── */}
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s22.title")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <a href="#/scenario-3-1" className="primary-button">
            <FileWarning size={17} />
            {t("s22.generateReport")}
          </a>
        </div>
      </header>

      {/* ── Context Bar ── */}
      <div className="s22-context-bar">
        <div className="s22-ctx-enterprise">
          <Building2 size={14} />
          {td(selectedEnterprise.name)}
        </div>
        <div className="s22-ctx-divider" />
        <div className="s22-ctx-stats">
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">{t("s22.auditPeriod")}</span>
            <span className="s22-ctx-stat-value">{t("s22.periodValue")}</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">{t("s22.dataSourcesConnected")}</span>
            <span className="s22-ctx-stat-value">{selectedEnterprise.dataSources.length} {t("s22.enterpriseUnit")}</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">{t("s22.cluesFound")}</span>
            <span className="s22-ctx-stat-value risk-high">{t("s22.cluesEyebrow")} {clues.length} ({t("s22.anomalyFlag")} {clues.filter(c => c.aiSuspicionScore >= 80).length})</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">{t("s22.highestRiskScore")}</span>
            <span className="s22-ctx-stat-value risk-high">{maxScore}</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">{t("s22.involvedAmount")}</span>
            <span className="s22-ctx-stat-value">{(totalAmount / 1000000).toFixed(1)}M KZT</span>
          </div>
        </div>
        <div className="s22-ctx-divider" />
        <div className="s22-enterprise-tabs">
          {filteredEnterprises.slice(0, 4).map((ent) => (
            <button
              key={ent.id}
              className={`s22-ent-tab ${selectedEnterprise.id === ent.id ? "active" : ""} ${ent.status === "critical" || ent.status === "important" ? "has-risk" : ""}`}
              onClick={() => setSelectedEnterprise(ent)}
            >
              {(() => { const n = td(ent.name); return n.length > 8 ? n.slice(0, 8) + "…" : n; })()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="s22-summary-row">
        {/* Card 1: Major Finding */}
        <div className="s22-summary-card risk-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">{t("s22.majorAnomalyEyebrow")}</div>
          <div className="s22-card-title" style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "14px", fontWeight: "700" }}>
            {t("s22.majorAnomalyDesc")}
          </div>
          <div className="s22-card-metrics">
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">{t("s22.maxDeviationRate")}</span>
              <span className="s22-card-metric-value risk">{((maxVal - minVal) / maxVal * 100).toFixed(1)}%</span>
            </div>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">{t("s22.riskScore")}</span>
              <span className="s22-card-metric-value risk">{maxScore} / 100</span>
            </div>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">{t("s22.riskLevel")}</span>
              <span className="s22-risk-badge">
                <AlertTriangle size={10} />
                {riskLabel(t, maxScore)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Financial Impact */}
        <div className="s22-summary-card finance-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">{t("s22.financialImpactEyebrow")}</div>
          <div className="s22-card-title" style={{ fontSize: "14px" }}>{t("s22.financialImpactTitle")}</div>
          <div className="s22-card-metrics" style={{ marginBottom: "8px" }}>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">{t("s22.estimatedTotalAmount")}</span>
              <span className="s22-card-metric-value amber">{(totalAmount / 1000000).toFixed(1)}M KZT</span>
            </div>
          </div>
          <div className="s22-card-desc" style={{ marginTop: "4px", fontSize: "11px" }}>
            {t("s22.financialNote")}
          </div>
        </div>

        {/* Card 3: Recommended Actions */}
        <div className="s22-summary-card action-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">{t("s22.recommendedActionEyebrow")}</div>
          <div className="s22-action-steps" style={{ gap: "4px" }}>
            {actionSteps.map((step, i) => (
              <div className="s22-action-step" style={{ fontSize: "11px" }} key={i}>
                <span className="s22-step-num" style={{ width: "16px", height: "16px", fontSize: "9px" }}>{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="s22-main-row">
        {/* Left: Data Comparison & Regulatory Loop */}
        <div className="s22-main-left-col">
          <DataComparisonTable enterprise={selectedEnterprise} t={t} td={td} />

          {/* ── Regulatory Loop ── */}
          <div className="s22-loop-bar">
            <div className="s22-loop-title">{t("s22.regulatoryLoopTitle")} · {t("s22.regulatoryLoopSubtitle")}</div>
            <div className="s22-loop-steps">
              {loopSteps.map((step, i) => {
                const status = i < currentLoopStep ? "completed" : i === currentLoopStep ? "active" : "";
                return (
                  <div key={i} className={`s22-loop-step ${status}`}>
                    <div className="s22-loop-dot">
                      {i < currentLoopStep ? <CheckCircle2 size={14} /> : i === currentLoopStep ? <Clock size={12} /> : <Circle size={8} />}
                    </div>
                    <span className="s22-loop-label">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: AI Agent Panel */}
        <div className="s22-ai-panel">
          <div className="s22-ai-hdr">
            <h3>{t("s22.aiPanelTitle")}</h3>
          </div>
          <div className="s22-ai-body">
            {/* Score Ring */}
            <div className="s22-ai-score-row">
              <div className="s22-ai-score-ring">
                <svg viewBox="0 0 100 100" width="90" height="90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={riskColor(maxScore)} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(maxScore / 100) * 251} 251`}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dasharray 600ms" }}
                  />
                </svg>
                <div className="s22-ai-score-inner">
                  <span className="s22-ai-score-num" style={{ color: riskColor(maxScore) }}>{maxScore}</span>
                  <span className="s22-ai-score-label">{t("s22.riskScore")}</span>
                </div>
              </div>
              <div className="s22-ai-meta">
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">{t("s22.aiScoreRiskLevel")}</span>
                  <span className="s22-ai-meta-value" style={{ color: riskColor(maxScore) }}>{riskLabel(t, maxScore)}</span>
                </div>
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">{t("s22.aiScoreAnomalyType")}</span>
                  <span className="s22-ai-meta-value">{t("s22.anomalyTypeValue")}</span>
                </div>
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">{t("s22.aiScoreMainConflict")}</span>
                  <span className="s22-ai-meta-value">{topClue?.sourceA} vs {topClue?.sourceB}</span>
                </div>
              </div>
            </div>

            {/* Judgment Basis */}
            <div className="s22-ai-section-title">{t("s22.aiSectionBasis")}</div>
            <div className="s22-ai-basis-list">
              {basisItems.map((item, i) => (
                <div className="s22-ai-basis-item" key={i}>
                  <ChevronRight size={10} />
                  {item}
                </div>
              ))}
            </div>

            {/* Suggested Actions */}
            <div className="s22-ai-section-title">{t("s22.aiSectionActions")}</div>
            <div className="s22-ai-actions">
              {regActions.map((a, i) => (
                <div className="s22-ai-action-item" key={i}>
                  <span className="s22-ai-action-num">{i + 1}</span>
                  {a}
                </div>
              ))}
            </div>

            <a href="#/scenario-3-1" className="s22-ai-cta">
              <Sparkles size={14} />
              {t("s22.aiCtaGenerate")}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Clues Table ── */}
      <div className="s22-clues-panel">
        <div className="s22-panel-hdr">
          <div>
            <h3>{t("s22.cluesTableTitle")}</h3>
            <span className="s22-panel-sub">{t("s22.cluesEyebrow")} · {clues.length} clues</span>
          </div>
        </div>
        <table className="s22-clues-table">
          <thead>
            <tr>
              <th>{t("s22.clueTableHeaderId")}</th>
              <th>{t("s22.clueTableHeaderConflict")}</th>
              <th>{t("s22.clueTableHeaderSourceA")}</th>
              <th>{t("s22.clueTableHeaderSourceB")}</th>
              <th>{t("s22.clueTableHeaderDeviation")}</th>
              <th>{t("s22.clueTableHeaderAmount")}</th>
              <th>{t("s22.clueTableHeaderScore")}</th>
              <th>{t("s22.clueTableHeaderAction")}</th>
              <th>{t("s22.clueTableHeaderStatus")}</th>
            </tr>
          </thead>
          <tbody>
            {clues.map((clue, idx) => {
              const rc = riskColor(clue.aiSuspicionScore);
              const actionLabel = clue.suggestedAction === "转人工研判" ? t("s22.clueActionReview") : clue.suggestedAction === "约谈" ? t("s22.clueActionInterview") : t("s22.clueActionAutoCheck");
              const statusLabel = clue.status === "new" ? t("s22.clueStatusPending") : clue.status === "investigating" ? t("s22.clueStatusInvestigating") : t("s22.clueStatusClosed");
              return (
                <tr key={clue.id} className={clue.aiSuspicionScore >= 80 ? "row-critical" : clue.aiSuspicionScore >= 60 ? "row-important" : ""}>
                  <td><span className="s22-clue-id">CLU-{String(idx + 1).padStart(3, "0")}</span></td>
                  <td style={{ maxWidth: 220 }}>{td(clue.formula).slice(0, 35)}…</td>
                  <td>{td(clue.sourceA)}</td>
                  <td>{td(clue.sourceB)}</td>
                  <td>
                    <span className="s22-clue-deviation" style={{ color: rc }}>
                      {clue.deviationRate.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <span className="s22-clue-amount">
                      {(clue.involvedAmount / 1000000).toFixed(1)}M KZT
                    </span>
                  </td>
                  <td>
                    <div className="s22-clue-score-bar">
                      <div style={{ width: 50, height: 5, background: "#1e293b", borderRadius: 999, overflow: "hidden" }}>
                        <div className="s22-clue-score-fill" style={{ width: `${clue.aiSuspicionScore}%`, background: rc }} />
                      </div>
                      <span className="s22-clue-score-num" style={{ color: rc }}>{clue.aiSuspicionScore}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="s22-clue-action-badge"
                      style={{
                        background: clue.suggestedAction === "转人工研判" ? "#fef2f2" : clue.suggestedAction === "约谈" ? "#fffbeb" : "#f0f9ff",
                        color: clue.suggestedAction === "转人工研判" ? "#dc2626" : clue.suggestedAction === "约谈" ? "#d97706" : "#3b82f6",
                      }}
                    >
                      {actionLabel}
                    </span>
                  </td>
                  <td>
                    <span
                      className="s22-clue-status-badge"
                      style={{
                        background: clue.status === "new" ? "#fef2f2" : clue.status === "investigating" ? "#fffbeb" : "#ecfdf5",
                        color: clue.status === "new" ? "#dc2626" : clue.status === "investigating" ? "#d97706" : "#059669",
                      }}
                    >
                      <Circle size={6} style={{ fill: "currentColor" }} />
                      {statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Disclaimer ── */}
      <div className="s22-disclaimer">
        <ShieldCheck size={14} />
        <span>{t("s22.disclaimer")}</span>
      </div>
    </div>
  );
}
