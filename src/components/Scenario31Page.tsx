import { useState } from "react";
import {
  Search,
  Bot,
  Brain,
  Workflow,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Database,
  FileText,
  Siren,
  Sparkles,
  UserCheck,
  AlertTriangle,
  Activity,
  Eye,
  CheckCircle2,
  Clock,
  Target,
  Layers,
  FileClock,
  ChevronRight,
  ClipboardCheck, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { useDataI18n } from "../i18n/dataI18n";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import type { NodeStatus } from "../data/demoData";
import {
  scenario31LockedAnomaly,
  scenario31Agents,
  scenario31CandidateCauses,
  scenario31EvidenceItems,
  type AttributionAgent,
  type CandidateCause,
  type EvidenceItem,
} from "../data/scenario31Data";
import "../styles-scenario-3-1.css";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileSearch, Database, Activity, Siren, GitBranch, Bot, Brain, Workflow, ShieldCheck,
};

const evidenceTypeIcon: Record<EvidenceItem["type"], React.ComponentType<{ size?: number; className?: string }>> = {
  data: Database, document: FileText, system: Layers, audit: ShieldCheck,
};

const severityColorVar: Record<NodeStatus, string> = {
  normal: "var(--status-normal)", watch: "var(--status-watch)",
  important: "var(--status-important)", critical: "var(--status-critical)",
};

export function Scenario31Page() {
  const { t, lang, setLang } = useI18n();
  const { td } = useDataI18n();
  const [selectedCause, setSelectedCause] = useState<CandidateCause>(scenario31CandidateCauses[0]);
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(
    new Set(["agent-relation", "agent-master"]),
  );

  const toggleAgent = (id: string) => {
    setExpandedAgents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const masterAgent = scenario31Agents.find((a) => a.id === "agent-master");
  const workerAgents = scenario31Agents.filter((a) => a.id !== "agent-master");

  const agentStatusKey: Record<AttributionAgent["status"], string> = {
    done: "s31.agentStatusDone",
    running: "s31.agentStatusRunning",
    pending: "s31.agentStatusPending",
  };
  const agentStatusColor: Record<AttributionAgent["status"], string> = {
    done: "var(--status-normal)",
    running: "var(--status-watch)",
    pending: "var(--color-text-muted)",
  };

  const evidenceTypeKey: Record<EvidenceItem["type"], string> = {
    data: "s31.evidenceTypeData",
    document: "s31.evidenceTypeDocument",
    system: "s31.evidenceTypeSystem",
    audit: "s31.evidenceTypeAudit",
  };

  const regulatoryDimensions: Record<string, { label: string; summary: string }> = {
    "agent-approval": { label: t("s31.agent.approval_label"), summary: t("s31.agent.approval_label") },
    "agent-submit": { label: t("s31.agent.submit_label"), summary: t("s31.agent.submit_label") },
    "agent-inspect": { label: t("s31.agent.inspect_label"), summary: t("s31.agent.inspect_label") },
    "agent-penalty": { label: t("s31.agent.penalty_label"), summary: t("s31.agent.penalty_label") },
    "agent-relation": { label: t("s31.agent.relation_label"), summary: t("s31.agent.relation_label") },
    "agent-master": { label: t("s31.agent.master_label"), summary: t("s31.agent.master_label") },
  };

  const causeDetails: Record<string, { judgment: string; basis: string }> = {
    "cause-001": { judgment: t("s31.conclusionCauseValue"), basis: t("s31.judgment1") },
    "cause-002": { judgment: t("s31.judgment3"), basis: t("s31.judgment3") },
    "cause-003": { judgment: t("s31.judgment2"), basis: t("s31.judgment4") },
    "cause-004": { judgment: t("s31.judgment5"), basis: t("s31.judgment5") },
  };

  const evidenceMeta: Record<string, { support: string; strength: string }> = {
    "evi-001": { support: t("s31.judgment1"), strength: t("s31.evidenceStrengthStrong") },
    "evi-002": { support: t("s31.judgment1"), strength: t("s31.evidenceStrengthStrong") },
    "evi-003": { support: t("s31.judgment2"), strength: t("s31.evidenceStrengthMedium") },
    "evi-004": { support: t("s31.judgment3"), strength: t("s31.evidenceStrengthMedium") },
    "evi-005": { support: t("s31.judgment4"), strength: t("s31.evidenceStrengthMedium") },
    "evi-006": { support: t("s31.judgment5"), strength: t("s31.evidenceStrengthWeak") },
    "evi-007": { support: t("s31.judgment4"), strength: t("s31.evidenceStrengthMedium") },
    "evi-008": { support: t("s31.judgment5"), strength: t("s31.evidenceStrengthWeak") },
  };

  const closedLoopSteps = [t("s31.loopStep1"), t("s31.loopStep2"), t("s31.loopStep3"), t("s31.loopStep4"), t("s31.loopStep5"), t("s31.loopStep6"), t("s31.loopStep7")];

  const initialConclusion = [
    { label: t("s31.conclusionCause"), value: t("s31.conclusionCauseValue") },
    { label: t("s31.conclusionConfidence"), value: "87%" },
    { label: t("s31.conclusionStatus"), value: t("s31.conclusion.pending_review") },
  ];

  const judgmentBasis = [t("s31.judgment1"), t("s31.judgment2"), t("s31.judgment3"), t("s31.judgment4"), t("s31.judgment5")];
  const regulatoryActions = [t("s31.action1"), t("s31.action2"), t("s31.action3"), t("s31.action4"), t("s31.action5")];

  function AgentCard({ agent, isMaster, td }: { agent: AttributionAgent; isMaster?: boolean; td: (key: string) => string }) {
    const Icon = iconMap[agent.icon] ?? Bot;
    const colors = agentStatusColor[agent.status];
    const dimension = regulatoryDimensions[agent.id];
    return (
      <div className={`s31-agent-card ${agent.status} ${isMaster ? "master" : ""}`}>
        <div className="s31-agent-card-header">
          <div className="s31-agent-icon-wrap" style={{ background: isMaster ? "var(--color-primary-soft)" : "#f8fafc" }}>
            <span style={{ color: isMaster ? "var(--color-primary)" : "var(--color-text-secondary)", display: 'flex' }}><Icon size={isMaster ? 22 : 18} /></span>
          </div>
          <div className="s31-agent-info">
            <strong>{dimension?.label ?? td(agent.name)}</strong>
            <span>{td(agent.name)} · {dimension?.summary ?? td(agent.role)}</span>
          </div>
          <span className="s31-agent-status" style={{ color: colors, borderColor: colors }}>
            {agent.status === "running" && <Activity size={12} className="s31-pulse-icon" />}
            {t(agentStatusKey[agent.status])}
          </span>
        </div>
        <div className="s31-agent-card-body">
          <div className="s31-agent-section">
            <span className="s31-agent-label">{t("s31.evidence.source")}</span>
            <div className="s31-data-source-tags">
              {agent.dataSources.map((ds, i) => (
                <span className="s31-ds-tag" key={i}>
                  <Database size={10} />
                  {td(ds)}
                </span>
              ))}
            </div>
          </div>
          <div className="s31-agent-section">
            <span className="s31-agent-label">{t("s31.evidence.verify_points")}</span>
            <p className="s31-agent-reasoning">{dimension?.summary ?? td(agent.reasoning)}</p>
          </div>
          <div className="s31-agent-section">
            <span className="s31-agent-label">{t("s31.evidence.regulatory_hint")}</span>
            <p className="s31-agent-output">{td(agent.output)}</p>
          </div>
        </div>
      </div>
    );
  }

  function EvidenceItemCard({ item, index, td }: { item: EvidenceItem; index: number; td: (key: string) => string }) {
    const Icon = evidenceTypeIcon[item.type] ?? FileText;
    const meta = evidenceMeta[item.id];
    const typeLabel = t(evidenceTypeKey[item.type]);
    return (
      <div className="s31-evidence-item">
        <div className="s31-evidence-num">{index + 1}</div>
        <div className="s31-evidence-content">
          <div className="s31-evidence-header">
            <div className="s31-evidence-type" style={{ background: item.type === "data" ? "#ecfdf5" : item.type === "document" ? "#eff6ff" : item.type === "system" ? "#fefce8" : "#fff7ed" }}>
              <span style={{ color: item.type === "data" ? "var(--status-normal)" : item.type === "document" ? "var(--color-primary)" : item.type === "system" ? "var(--status-watch)" : "var(--status-important)", display: 'flex' }}><Icon size={12} /></span>
              {typeLabel}
            </div>
            <span className="s31-evidence-time" style={{ fontFamily: "var(--font-number)" }}>{item.timestamp}</span>
          </div>
          <strong>{td(item.title)}</strong>
          <div className="s31-evidence-fields">
            <span>{t("s31.evidenceFieldType")}{typeLabel}</span>
            <span>{t("s31.evidenceFieldDirection")}{meta?.support ?? ""}</span>
            <span>{t("s31.evidenceFieldStrength")}{meta?.strength ?? ""}</span>
          </div>
          <p>{td(item.summary)}</p>
        </div>
        <div className="s31-evidence-arrow">
          {index < scenario31EvidenceItems.length - 1 && <ChevronRight size={16} />}
        </div>
      </div>
    );
  }

  const doneCount = scenario31Agents.filter((a) => a.status === "done").length;
  const totalAgents = scenario31Agents.length;

  return (
    <div className="app-shell s31-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s31.title")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <button className="ghost-button" type="button">
            <Search size={16} />
            {t("app.search")}
          </button>
          <a href="#/scenario-4-1" className="primary-button">
            <FileClock size={17} />
            {t("s31.generateAttrReport")}
          </a>
        </div>
      </header>

      <div className="s31-anomaly-banner floating-panel">
        <div className="s31-banner-left">
          <div className="s31-banner-icon" style={{ background: "var(--status-important)", color: "#fff" }}>
            <AlertTriangle size={20} />
          </div>
          <div className="s31-banner-info">
            <span className="s31-banner-eyebrow">{t("s31.bannerEyebrow")}</span>
            <h2>{t("s31.bannerTitle")}</h2>
            <div className="s31-banner-meta">
              <span>{t("s31.nodeLabel")}{td(scenario31LockedAnomaly.nodeName)}</span>
              <span>{t("s31.detectedAtLabel")}{scenario31LockedAnomaly.detectedAt}</span>
              <span>{t("s31.anomalyConfidence")}{Math.round(scenario31LockedAnomaly.confidence * 100)}%</span>
              <span>{t("s31.attrConfidence")}</span>
              <span className="s31-banner-status" style={{ color: severityColorVar[scenario31LockedAnomaly.severity] }}>
                <ClipboardCheck size={12} />
                {t("s31.aiStatusLabel")}
              </span>
            </div>
          </div>
        </div>
        <div className="s31-banner-right">
          <div className="s31-agent-progress">
            <span className="s31-progress-label">{t("s31.loopProgressLabel")}</span>
            <div className="s31-progress-bar-wrap">
              <div className="s31-progress-bar-fill" style={{ width: `${(4 / closedLoopSteps.length) * 100}%` }} />
            </div>
            <span className="s31-progress-text" style={{ fontFamily: "var(--font-number)" }}>
              {t("s31.currentNodeLabel")}
            </span>
          </div>
        </div>
      </div>

      <div className="s31-left-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">{t("s31.evidenceDimensions")}</span>
            <h2>{t("s31.evidenceDimensionsTitle")}</h2>
          </div>
          <div className="s31-workflow-legend">
            <span><span className="s31-legend-dot done" />{t("s31.legendVerified")}</span>
            <span><span className="s31-legend-dot running" />{t("s31.legendNeedSupplement")}</span>
          </div>
        </div>
        <div className="s31-workflow-scroll">
          <div className="s31-workflow-layout">
            <div className="s31-worker-agents">
              {workerAgents.map((agent) => (
                <div key={agent.id} className={`s31-agent-wrapper ${expandedAgents.has(agent.id) ? "expanded" : ""}`} onClick={() => toggleAgent(agent.id)}>
                  <AgentCard agent={agent} td={td} />
                </div>
              ))}
            </div>
            <div className="s31-workflow-connector">
              <svg viewBox="0 0 60 400" width="60" height="400" className="s31-connector-svg">
                {workerAgents.map((_, idx) => {
                  const y = 45 + idx * 80;
                  return (
                    <g key={idx}>
                      <line x1="0" y1={y} x2="30" y2={y} stroke="var(--color-border-subtle)" strokeWidth="2" strokeDasharray="4 4" />
                      <polygon points={`30,${y - 5} 40,${y} 30,${y + 5}`} fill="var(--color-border-strong)" />
                    </g>
                  );
                })}
              </svg>
            </div>
            {masterAgent && (
              <div className="s31-master-agent-area">
                <div className="s31-master-review-card">
                  <div className="s31-master-review-header">
                    <div>
                      <span className="eyebrow">{t("s31.masterEyebrow")}</span>
                      <h2>{t("s31.masterTitle")}</h2>
                    </div>
                    <span className="s31-review-status">{t("s31.masterStatusPending")}</span>
                  </div>
                  <section className="s31-review-section primary">
                    <div className="s31-review-section-title">
                      <Brain size={15} />
                      <strong>{t("s31.sectionA")}</strong>
                    </div>
                    <div className="s31-conclusion-grid">
                      {initialConclusion.map((item) => (
                        <div key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="s31-review-section">
                    <div className="s31-review-section-title">
                      <ShieldCheck size={15} />
                      <strong>{t("s31.sectionB")}</strong>
                    </div>
                    <ul className="s31-review-list">
                      {judgmentBasis.map((item) => (<li key={item}>{item}</li>))}
                    </ul>
                  </section>
                  <section className="s31-review-section">
                    <div className="s31-review-section-title">
                      <ClipboardCheck size={15} />
                      <strong>{t("s31.sectionC")}</strong>
                    </div>
                    <ul className="s31-action-list">
                      {regulatoryActions.map((item) => (<li key={item}>{item}</li>))}
                    </ul>
                  </section>
                </div>
                <div className="s31-master-output-banner">
                  <Sparkles size={14} />
                  <span>{t("s31.masterBanner")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="s31-right-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">{t("s31.causesEyebrow")}</span>
            <h2>{t("s31.causesTitle")}</h2>
            <p className="s31-panel-subtitle">{t("s31.causesSubtitle")}</p>
          </div>
          <Brain size={18} className="s31-section-icon" />
        </div>
        <div className="s31-causes-list">
          {scenario31CandidateCauses.slice(0, 4).map((cause, idx) => {
            const isSelected = selectedCause.id === cause.id;
            const detail = causeDetails[cause.id];
            const probColor =
              cause.probability >= 0.7 ? "var(--status-critical)" :
              cause.probability >= 0.4 ? "var(--status-important)" :
              cause.probability >= 0.25 ? "var(--status-watch)" : "var(--status-normal)";
            return (
              <button key={cause.id} className={`s31-cause-card ${isSelected ? "selected" : ""}`} type="button" onClick={() => setSelectedCause(cause)}>
                <div className="s31-cause-rank">#{idx + 1}</div>
                <div className="s31-cause-body">
                  <div className="s31-cause-desc">
                    <span>{t("s31.causeJudgmentLabel")}</span>
                    <strong>{detail?.judgment ?? td(cause.description)}</strong>
                  </div>
                  <p className="s31-cause-basis">
                    <span>{t("s31.causeBasisLabel")}</span>{detail?.basis ?? td(cause.description)}
                  </p>
                  <div className="s31-cause-meta">
                    <div className="s31-cause-probability">
                      <div className="s31-prob-bar-bg">
                        <div className="s31-prob-bar-fill" style={{ width: `${cause.probability * 100}%`, background: probColor }} />
                      </div>
                      <span style={{ color: probColor, fontFamily: "var(--font-number)" }}>{Math.round(cause.probability * 100)}%</span>
                    </div>
                    <div className="s31-cause-agents">
                      <Workflow size={11} />
                      <span>{cause.supportingAgents.length} {t("s31.causeAgentsSupport")}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="s31-ai-synthesis">
          <div className="s31-synthesis-header">
            <Bot size={16} />
            <strong>{t("s31.loopSynthesisTitle")}</strong>
          </div>
          <div className="s31-loop-strip">
            {closedLoopSteps.map((step) => (
              <div key={step} className={`s31-loop-step ${step === t("s31.loopStep4") ? "active" : ""}`}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="s31-bottom-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">{t("s31.evidenceChainEyebrow")}</span>
            <h2>{t("s31.evidenceChainTitle")}</h2>
          </div>
          <span className="s31-evidence-count">{t("s31.evidenceChainCount").replace("{total}", String(scenario31EvidenceItems.length))}</span>
        </div>
        <div className="s31-evidence-chain-scroll">
          <div className="s31-evidence-chain">
            {scenario31EvidenceItems.slice(0, 5).map((item, idx) => (
              <EvidenceItemCard key={item.id} item={item} index={idx} td={td} />
            ))}
          </div>
        </div>
      </div>

      <div className="s31-disclaimer">
        <ShieldCheck size={14} />
        <span>{t("s31.disclaimer")}</span>
      </div>
    </div>
  );
}
