import { MapPin, X } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import type { EnergyNode } from "../../data/demoData";

export function MapPopover({
  node,
  position,
  onClose,
}: {
  node: EnergyNode;
  position: { left: number; top: number };
  onClose: () => void;
}) {
  const { t } = useI18n();
  const isAnomaly = node.status === "important" || node.status === "critical";

  return (
    <div
      className={`s11-map-popover ${isAnomaly ? "is-anomaly" : ""}`}
      style={{ position: "absolute", left: position.left, top: position.top, zIndex: 150 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="s11-popover-header">
        <div className="s11-popover-title">
          <div className="s11-popover-name-row">
            <MapPin size={14} />
            <strong>{node.name}</strong>
          </div>
          <span className={`s11-popover-badge ${isAnomaly ? "badge-critical" : "badge-normal"}`}>
            {isAnomaly ? t("node.anomaly") : t("node.normal")}
          </span>
        </div>
        <button type="button" className="s11-popover-close" onClick={onClose}>
          <X size={14} />
        </button>
      </div>
      <div className="s11-popover-body">
        <div className="s11-popover-row">
          <span>{t("node.category")}</span>
          <strong>{node.subtitle}</strong>
        </div>
        {node.flowRate > 0 && (
          <div className="s11-popover-row">
            <span>{t("node.flow")}</span>
            <strong>{node.flowRate.toLocaleString()} t/d</strong>
          </div>
        )}
        <div className="s11-popover-row">
          <span>{t("node.compliance")}</span>
          <strong className={isAnomaly ? "text-critical" : "text-normal"}>
            {node.complianceScore} / 100
          </strong>
        </div>
      </div>
      {isAnomaly && (
        <div className="s11-popover-footer">
          {t("node.action")}
        </div>
      )}
    </div>
  );
}
