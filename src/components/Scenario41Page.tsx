import { useState, useMemo } from "react";
import {
  GitBranch,
  Clock,
  CheckCircle2,
  CircleDot,
  Bot,
  User,
  UserCheck,
  Settings,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  History,
  FileClock,
  Activity,
  ClipboardCheck,
  Download,
  Siren,
  Search, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  eventLockBanner,
  lifecycleStages,
  auditTrailEntries,
  complianceMetrics,
  stageTimeStats,
  type LifecycleStage,
} from "../data/scenario41Data";
import "../styles-scenario-4-1.css";

const ACTION_TYPE_LABELS: Record<LifecycleStage["actionType"], string> = {
  "ai-auto": "AI 自动",
  "human-confirm": "人工确认",
  "human-modify": "人工修改 AI 建议",
  "human-reject": "人工驳回 AI",
  system: "系统流转",
};

function getStageActorBadgeClass(actionType: LifecycleStage["actionType"]): string {
  if (actionType === "ai-auto") return "ba-ai";
  if (actionType === "human-modify") return "ba-human-modify";
  if (actionType === "human-reject") return "ba-human-reject";
  if (actionType === "human-confirm") return "ba-human";
  return "ba-system";
}

function getStageActorBadgeLabel(actionType: LifecycleStage["actionType"]): string {
  if (actionType === "ai-auto") return "AI";
  if (actionType === "human-confirm") return "人工";
  if (actionType === "human-modify") return "人工修改";
  if (actionType === "human-reject") return "人工驳回";
  return "系统";
}

function getStageActorIcon(actor: LifecycleStage["actor"]) {
  if (actor === "AI") return Bot;
  if (actor === "Human") return User;
  return Settings;
}

function stageDotClass(stage: LifecycleStage): string {
  const parts: string[] = [stage.status];
  if (stage.status === "done") {
    parts.push(stage.actionType);
  }
  return parts.join(" ");
}

export function Scenario41Page() {
  const { t, lang, setLang } = useI18n();
  const [selectedStageId, setSelectedStageId] = useState("stage-05");

  const selectedStage = useMemo(
    () => lifecycleStages.find((s) => s.id === selectedStageId) ?? lifecycleStages[0],
    [selectedStageId],
  );

  const hitlStatusLabel =
    complianceMetrics.hitlScore >= 90
      ? "优秀"
      : complianceMetrics.hitlScore >= 70
        ? "良好"
        : "需改进";

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
            生成监管报告
          </a>
        </div>
      </header>

      <div className="s41-event-banner floating-panel">
        <div className="s41-event-lockup">
          <span className="s41-event-id">{eventLockBanner.eventId}</span>
          <span className="s41-event-title">{eventLockBanner.title}</span>
        </div>
        <div className="s41-event-meta">
          <span>
            <Clock size={14} />
            {eventLockBanner.registeredAt}
          </span>
          <span>
            <Activity size={14} />
            {eventLockBanner.jurisdiction}
          </span>
        </div>
        <div className="s41-current-stage-badge">
          <CircleDot size={14} />
          当前阶段: {eventLockBanner.currentStageName} (第 {eventLockBanner.currentStage}/9 步)
        </div>
      </div>

      <div className="s41-timeline-container">
        <div className="s41-timeline-header">
          <GitBranch size={18} style={{ color: "var(--color-primary)" }} />
          <h2>事件全生命周期时间轴</h2>
          <span>共 9 个阶段，已完成 4 个，当前处于第 5 阶段</span>
        </div>

        {lifecycleStages.map((stage) => {
          const StageIcon = getStageActorIcon(stage.actor);
          const isSelected = selectedStageId === stage.id;

          return (
            <div key={stage.id} className="s41-stage">
              <div className="s41-stage-line-col">
                <div className={`s41-stage-dot ${stageDotClass(stage)}`}>
                  {stage.status === "done" && (
                    <CheckCircle2
                      size={10}
                      style={{
                        position: "absolute",
                        color: "#fff",
                        top: -1,
                        left: -1,
                      }}
                    />
                  )}
                </div>
                {stage.order < 9 && (
                  <div className={`s41-stage-line ${stage.status}`} />
                )}
              </div>

              <div
                className={`s41-stage-card${isSelected ? " active" : ""}`}
                onClick={() => setSelectedStageId(stage.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="s41-stage-card-header">
                  <span className="s41-stage-name">{stage.name}</span>
                  <span className={`s41-stage-actor-badge ${getStageActorBadgeClass(stage.actionType)}`}>
                    {ACTION_TYPE_LABELS[stage.actionType]}
                  </span>
                </div>

                <div className="s41-stage-meta">
                  <span>
                    <StageIcon size={12} />
                    {stage.actorDetail}
                  </span>
                  <span>
                    <Clock size={12} />
                    {stage.timestamp}
                  </span>
                  <span>
                    {stage.status === "done" ? (
                      <CheckCircle2 size={12} style={{ color: "var(--status-normal)" }} />
                    ) : stage.status === "active" ? (
                      <CircleDot size={12} style={{ color: "var(--status-watch)" }} />
                    ) : (
                      <History size={12} />
                    )}
                    {stage.status === "done" ? "已完成" : stage.status === "active" ? "进行中" : "待执行"}
                  </span>
                </div>

                <p className="s41-stage-desc">{stage.description}</p>

                <div className="s41-stage-result">{stage.result}</div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="s41-compliance-panel">
        <div className="s41-compliance-header">
          <h3>
            <ShieldCheck size={18} />
            合规性评估
          </h3>
        </div>

        <div className="s41-compliance-body">
          <div className="s41-compliance-score-card">
            <h4>HITL (Human-in-the-Loop) 评估</h4>
            <div className="s41-score-big">{complianceMetrics.hitlScore}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--status-normal)" }}>
              {hitlStatusLabel}
            </span>
            <div className="s41-score-bar-wrap">
              <div
                className="s41-score-bar-fill good"
                style={{ width: `${complianceMetrics.hitlScore}%` }}
              />
            </div>
          </div>

          <div className="s41-compliance-score-card">
            <h4>审计完整性评分</h4>
            <div className="s41-score-big">{complianceMetrics.auditCompleteness}%</div>
            <div className="s41-score-bar-wrap">
              <div
                className="s41-score-bar-fill good"
                style={{ width: `${complianceMetrics.auditCompleteness}%` }}
              />
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              签批链完整性
            </h4>
            <div className="s41-check-row">
              {complianceMetrics.approvalChainComplete ? (
                <CheckCircle2 size={16} className="check" />
              ) : (
                <AlertTriangle size={16} className="warn" />
              )}
              签批链完整: {complianceMetrics.approvalChainComplete ? "已通过" : "未完成"}
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <CheckCircle2 size={16} className="check" />
              所有环节责任人已签认
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <CheckCircle2 size={16} className="check" />
              审计哈希链已验证一致
            </div>
            <div className="s41-check-row" style={{ marginTop: 6 }}>
              <Clock size={16} style={{ color: "var(--status-watch)" }} />
              事件总耗时: {complianceMetrics.totalDuration}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              AI vs 人工 动作统计
            </h4>
            <div className="s41-action-stats">
              <div className="s41-action-stat aa-ai">
                <strong>{complianceMetrics.aiActions}</strong>
                <span>AI 自动</span>
              </div>
              <div className="s41-action-stat aa-human">
                <strong>{complianceMetrics.humanActions}</strong>
                <span>人工操作</span>
              </div>
              <div className="s41-action-stat aa-system" style={{ gridColumn: "1 / -1" }}>
                <strong>{complianceMetrics.systemActions}</strong>
                <span>系统流转</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              各阶段耗时统计
            </h4>
            <div className="s41-stage-time-list">
              {stageTimeStats.map((stat) => (
                <div key={stat.stage} className="s41-stage-time-row">
                  <span>{stat.stage}</span>
                  <span>{stat.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="s41-audit-table-container">
        <div className="s41-audit-table-header">
          <h3>
            <FileClock size={16} style={{ color: "var(--color-text-secondary)", marginRight: 6 }} />
            审计溯源记录
          </h3>
          <span className="s41-audit-table-count">
            共 {auditTrailEntries.length} 条记录
          </span>
        </div>
        <div className="s41-audit-table-wrap">
          <table className="s41-audit-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>操作人/系统</th>
                <th>动作</th>
                <th>变更内容</th>
                <th>数据快照</th>
                <th>审计哈希</th>
              </tr>
            </thead>
            <tbody>
              {auditTrailEntries.map((entry) => {
                const isAi = entry.actor.includes("AI");
                const isHuman = !isAi && !entry.actor.includes("系统") && !entry.actor.includes("监管工单") && !entry.actor.includes("自动巡检");
                const isSystem = !isAi && !isHuman;
                const dotClass = isAi ? "ad-ai" : isHuman ? "ad-human" : "ad-system";

                return (
                  <tr key={entry.id}>
                    <td className="td-time">{entry.time}</td>
                    <td className="td-actor">
                      <span className={`s41-actor-dot ${dotClass}`} />
                      {entry.actor}
                    </td>
                    <td>
                      <strong>{entry.action}</strong>
                    </td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {entry.changes}
                    </td>
                    <td className="td-time">{entry.dataSnapshot}</td>
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
        演示系统不接入物理真实测点
      </div>
    </div>
  );
}
