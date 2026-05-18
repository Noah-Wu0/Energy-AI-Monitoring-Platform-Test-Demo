import type { NodeStatus } from "../data/demoData";

const statusLabel: Record<NodeStatus, string> = {
  normal: "正常",
  watch: "观察",
  important: "待复核",
  critical: "高风险",
};

export function StatusBadge({ status }: { status: NodeStatus }) {
  return <span className={`status-badge status-${status}`}>{statusLabel[status]}</span>;
}
