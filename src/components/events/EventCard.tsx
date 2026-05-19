import { AlertTriangle, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import type { AnomalyEvent } from "../../data/demoData";

const severityIcon = {
  normal: CheckCircle2,
  watch: Info,
  important: AlertTriangle,
  critical: AlertTriangle,
};

const severityLabel = {
  normal: "正常恢复",
  watch: "观察",
  important: "重要",
  critical: "紧急",
};

const actionTargets: Record<string, string> = {
  "查看异常检测": "#/drill-down-region",
  "查看设备档案": "#/scenario-1-2",
  "查看审计记录": "#/scenario-4-1",
};

export function EventCard({
  event,
  isActive,
  onClick,
}: {
  event: AnomalyEvent;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = severityIcon[event.severity];
  const targetHash = actionTargets[event.suggestedAction];

  return (
    <button
      className={`s11-event-card ${isActive ? "active" : ""} severity-${event.severity}`}
      type="button"
      onClick={onClick}
    >
      <div className="s11-event-indicator">
        <Icon size={16} className={`text-status-${event.severity}`} />
      </div>
      <div className="s11-event-body">
        <div className="s11-event-header">
          <strong>{event.title}</strong>
          <span className={`s11-event-badge severity-${event.severity}`}>
            {severityLabel[event.severity]}
          </span>
        </div>
        <p className="s11-event-desc">{event.aiSummary}</p>
        <div className="s11-event-meta">
          <span>{event.detectedAt}</span>
          <span>AI 置信度 {Math.round(event.confidence * 100)}%</span>
        </div>
        <div className="s11-event-action">
          <ArrowRight size={14} />
          {targetHash ? (
            <a
              href={targetHash}
              onClick={(e) => e.stopPropagation()}
            >
              {event.suggestedAction} ↗
            </a>
          ) : (
            <span>{event.suggestedAction}</span>
          )}
        </div>
      </div>
    </button>
  );
}
