import { useState, useMemo } from "react";
import {
  GitBranch, Clock, CheckCircle2, CircleDot, Bot, User, UserCheck,
  Settings, ShieldCheck, ArrowRight, AlertTriangle, History, FileClock,
  Activity, ClipboardCheck, Download, Siren, Search, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { useDataI18n } from "../i18n/dataI18n";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  eventLockBanner, lifecycleStages, auditTrailEntries,
  complianceMetrics, stageTimeStats, type LifecycleStage,
} from "../data/scenario41Data";
import "../styles-scenario-4-1.css";

const ACTION_TYPE_KEYS: Record<LifecycleStage["actionType"], string> = {
  "ai-auto": "s41.actionAiAuto",
  "human-confirm": "s41.actionHumanConfirm",
  "human-modify": "s41.actionHumanModify",
  "human-reject": "s41.actionHumanReject",
  system: "s41.actionSystem",
};

function getStageActorBadgeClass(actionType: LifecycleStage["actionType"]): string {
  if (actionType === "ai-auto") return "ba-ai";
  if (actionType === "human-modify") return "ba-human-modify";
  if (actionType === "human-reject") return "ba-human-reject";
  if (actionType === "human-confirm") return "ba-human";
  return "ba-system";
}

function getStageActorBadgeKey(actionType: LifecycleStage["actionType"]): string {
  if (actionType === "ai-auto") return "s41.badgeAi";
  if (actionType === "human-confirm") return "s41.badgeHuman";
  if (actionType === "human-modify") return "s41.badgeHumanModify";
  if (actionType === "human-reject") return "s41.badgeHumanReject";
  return "s41.badgeSystem";
}

function getStageActorIcon(actor: LifecycleStage["actor"]) {
  if (actor === "AI") return Bot;
  if (actor === "Human") return User;
  return Settings;
}

function stageDotClass(stage: LifecycleStage): string {
  const parts: string[] = [stage.status];
  if (stage.status === "done") parts.push(stage.actionType);
  return parts.join(" ");
}

export function Scenario41Page() {
  const { t, lang, setLang } = useI18n();
  const { td } = useDataI18n();
  const [selectedStageId, setSelectedStageId] = useState("stage-05");

  const selectedStage = useMemo(
    () => lifecycleStages.find((s) => s.id === selectedStageId) ?? lifecycleStages[0],
    [selectedStageId],
  );

  const hitlStatusLabel =
    complianceMetrics.hitlScore >= 90 ? t("s41.hitlExcellent") :
    complianceMetrics.hitlScore >= 70 ? t("s41.hitlGood") : t("s41.hitlNeedsImprove");

  const statusLabel = (s: string) => s === "done" ? t("s41.statusDone") : s === "active" ? t("s41.statusActive") : t("s41.statusPending");

  return (
    <div className="app-shell s41-shell">
      <header className="app-header floating-panel s41-header">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s41.title")}</span>
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
          <a href="#/scenario-4-2" className="primary-button">
            <Download size={17} />
            {t("s41.generateReport")}
          </a>
        </div>
      </header>

      <div className="s41-event-banner floating-panel">
        <div className="s41-event-lockup">
          <span className="s41-event-id">{eventLockBanner.eventId}</span>
          <span className="s41-event-title">{td(eventLockBanner.title)}</span>
        </div>
        <div className="s41-event-meta">
          <span><Clock size={14} />{eventLockBanner.registeredAt}</span>
          <span><Activity size={14} />{td(eventLockBanner.jurisdiction)}</span>
        </div>
        <div className="s41-current-stage-badge">
          <CircleDot size={14} />
          {t("s41.currentStage")}{eventLockBanner.currentStageName} ({eventLockBanner.currentStage}/9)
        </div>
      </div>

      <div className="s41-timeline-container">
        <div className="s41-timeline-header">
          <GitBranch size={18} style={{ color: "var(--color-primary)" }} />
          <h2>{t("s41.timelineTitle")}</h2>
          <span>{t("s41.timelineSub")}</span>
        </div>
        {lifecycleStages.map((stage) => {
          const StageIcon = getStageActorIcon(stage.actor);
          const isSelected = selectedStageId === stage.id;
          return (
            <div key={stage.id} className="s41-stage">
              <div className="s41-stage-line-col">
                <div className={`s41-stage-dot ${stageDotClass(stage)}`}>
                  {stage.status === "done" && <CheckCircle2 size={10} style={{ position: "absolute", color: "#fff", top: -1, left: -1 }} />}
                </div>
                {stage.order < 9 && <div className={`s41-stage-line ${stage.status}`} />}
              </div>
              <div className={`s41-stage-card${isSelected ? " active" : ""}`} onClick={() => setSelectedStageId(stage.id)} style={{ cursor: "pointer" }}>
                <div className="s41-stage-card-header">
                  <span className="s41-stage-name">{td(stage.name)}</span>
                  <span className={`s41-stage-actor-badge ${getStageActorBadgeClass(stage.actionType)}`}>
                    {t(ACTION_TYPE_KEYS[stage.actionType])}
                  </span>
                </div>
                <div className="s41-stage-meta">
                  <span><StageIcon size={12} />{td(stage.actorDetail)}</span>
                  <span><Clock size={12} />{stage.timestamp}</span>
                  <span>
                    {stage.status === "done" ? <CheckCircle2 size={12} style={{ color: "var(--status-normal)" }} /> : stage.status === "active" ? <CircleDot size={12} style={{ color: "var(--status-watch)" }} /> : <History size={12} />}
                    {statusLabel(stage.status)}
                  </span>
                </div>
                <p className="s41-stage-desc">{td(stage.description)}</p>
                <div className="s41-stage-result">{td(stage.result)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="s41-compliance-panel">
        <div className="s41-compliance-header">
          <h3><ShieldCheck size={18} />{t("s41.complianceTitle")}</h3>
        </div>
        <div className="s41-compliance-body">
          <div className="s41-compliance-score-card">
            <h4>{t("s41.hitlTitle")}</h4>
            <div className="s41-score-big">{complianceMetrics.hitlScore}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--status-normal)" }}>{hitlStatusLabel}</span>
            <div className="s41-score-bar-wrap"><div className="s41-score-bar-fill good" style={{ width: `${complianceMetrics.hitlScore}%` }} /></div>
          </div>
          <div className="s41-compliance-score-card">
            <h4>{t("s41.auditCompleteness")}</h4>
            <div className="s41-score-big">{complianceMetrics.auditCompleteness}%</div>
            <div className="s41-score-bar-wrap"><div className="s41-score-bar-fill good" style={{ width: `${complianceMetrics.auditCompleteness}%` }} /></div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              {t("s41.approvalChainTitle")}
            </h4>
            <div className="s41-check-row">
              {complianceMetrics.approvalChainComplete ? <CheckCircle2 size={16} className="check" /> : <AlertTriangle size={16} className="warn" />}
              {t("s41.approvalPassed")}: {complianceMetrics.approvalChainComplete ? t("s41.approvalPassed") : t("s41.approvalFailed")}
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <CheckCircle2 size={16} className="check" />{t("s41.checkSignOff")}
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <CheckCircle2 size={16} className="check" />{t("s41.checkHash")}
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <Clock size={16} style={{ color: "var(--status-watch)" }} />{t("s41.totalDuration")}{complianceMetrics.totalDuration}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              {t("s41.aiVsHumanStats")}
            </h4>
            <div className="s41-action-stats">
              <div className="s41-action-stat aa-ai"><strong>{complianceMetrics.aiActions}</strong><span>{t("s41.statsAiAuto")}</span></div>
              <div className="s41-action-stat aa-human"><strong>{complianceMetrics.humanActions}</strong><span>{t("s41.statsHuman")}</span></div>
              <div className="s41-action-stat aa-system" style={{ gridColumn: "1 / -1" }}><strong>{complianceMetrics.systemActions}</strong><span>{t("s41.statsSystem")}</span></div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              {t("s41.stageTimeStats")}
            </h4>
            <div className="s41-stage-time-list">
              {stageTimeStats.map((stat) => (
                <div key={stat.stage} className="s41-stage-time-row"><span>{td(stat.stage)}</span><span>{stat.duration}</span></div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="s41-audit-table-container">
        <div className="s41-audit-table-header">
          <h3><FileClock size={16} style={{ color: "var(--color-text-secondary)", marginRight: 6 }} />{t("s41.auditTableTitle")}</h3>
          <span className="s41-audit-table-count">{t("s41.auditTableCount").replace("{count}", String(auditTrailEntries.length))}</span>
        </div>
        <div className="s41-audit-table-wrap">
          <table className="s41-audit-table">
            <thead>
              <tr>
                <th>{t("s41.auditHeaderTime")}</th>
                <th>{t("s41.auditHeaderActor")}</th>
                <th>{t("s41.auditHeaderAction")}</th>
                <th>{t("s41.auditHeaderChanges")}</th>
                <th>{t("s41.auditHeaderSnapshot")}</th>
                <th>{t("s41.auditHeaderHash")}</th>
              </tr>
            </thead>
            <tbody>
              {auditTrailEntries.map((entry) => {
                const isAi = entry.actor.includes("AI");
                const isSystem = !isAi && (entry.actor.includes("系统") || entry.actor.includes("System"));
                const isHuman = !isAi && !isSystem;
                const dotClass = isAi ? "ad-ai" : isHuman ? "ad-human" : "ad-system";
                return (
                  <tr key={entry.id}>
                    <td className="td-time">{entry.time}</td>
                    <td className="td-actor"><span className={`s41-actor-dot ${dotClass}`} />{td(entry.actor)}</td>
                    <td><strong>{td(entry.action)}</strong></td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{td(entry.changes)}</td>
                    <td className="td-time">{td(entry.dataSnapshot)}</td>
                    <td className="td-hash">{entry.auditHash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="s41-disclaimer">
        <ShieldCheck size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
        {t("s41.disclaimer")}
      </div>
    </div>
  );
}
