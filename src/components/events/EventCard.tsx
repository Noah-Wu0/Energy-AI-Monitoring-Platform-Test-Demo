import { AlertTriangle, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { useDataI18n } from "../../i18n/dataI18n";
import type { AnomalyEvent } from "../../data/demoData";

const severityIcon = {
  normal: CheckCircle2,
  watch: Info,
  important: AlertTriangle,
  critical: AlertTriangle,
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
  const { t } = useI18n();
  const { td } = useDataI18n();
  const Icon = severityIcon[event.severity];
  const targetHash = actionTargets[event.suggestedAction];
  const sevKey = event.severity === "normal" ? "event.normal" : event.severity === "watch" ? "event.watch" : event.severity === "important" ? "event.important" : "event.critical";

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
          <strong>{td(event.title)}</strong>
          <span className={`s11-event-badge severity-${event.severity}`}>
            {t(sevKey)}
          </span>
        </div>
        <p className="s11-event-desc">{td(event.aiSummary)}</p>
        <div className="s11-event-meta">
          <span>{td(event.detectedAt)}</span>
          <span>{t("event.ai_confidence")} {Math.round(event.confidence * 100)}%</span>
        </div>
        <div className="s11-event-action">
          <ArrowRight size={14} />
          {targetHash ? (
            <a
              href={targetHash}
              onClick={(e) => e.stopPropagation()}
            >
              {td(event.suggestedAction)} ↗
            </a>
          ) : (
            <span>{td(event.suggestedAction)}</span>
          )}
        </div>
      </div>
    </button>
  );
}
