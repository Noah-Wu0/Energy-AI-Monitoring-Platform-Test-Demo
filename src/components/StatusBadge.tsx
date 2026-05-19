import { useI18n } from "../i18n/I18nContext";
import type { NodeStatus } from "../data/demoData";

const statusKey: Record<NodeStatus, string> = {
  normal: "status.normal",
  watch: "status.watch",
  important: "status.important",
  critical: "status.critical",
};

export function StatusBadge({ status }: { status: NodeStatus }) {
  const { t } = useI18n();
  return <span className={`status-badge status-${status}`}>{t(statusKey[status])}</span>;
}
