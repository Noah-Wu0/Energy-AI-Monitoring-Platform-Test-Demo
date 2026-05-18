import type { LucideIcon } from "lucide-react";
import type { EnergyNode } from "../../data/demoData";

const statusRing: Record<string, string> = {
  normal: "var(--status-normal)",
  watch: "var(--status-watch)",
  important: "var(--status-important)",
  critical: "var(--status-critical)",
};

const industryFill: Record<string, string> = {
  oil: "var(--industry-oil)",
  gas: "var(--industry-gas)",
  port: "var(--industry-data)",
  metering: "var(--industry-data)",
  regulatory: "var(--industry-data)",
  power: "var(--industry-power)",
};

function shortNodeLabel(name: string) {
  return name
    .replace(" 示意油田", "")
    .replace(" 示意气田", "")
    .replace(" 港储运节点", " 港")
    .replace("监管接入节点", "接入");
}

export function MapNode({
  node,
  x,
  y,
  icon: Icon,
  isActive,
  onClick,
}: {
  node: EnergyNode;
  x: number;
  y: number;
  icon: LucideIcon;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const isAnomaly = node.status === "important" || node.status === "critical";
  const r = isAnomaly ? 15 : 12;

  return (
    <g
      className={`s11-map-node ${isActive ? "active" : ""}`}
      transform={`translate(${x} ${y})`}
      style={{ pointerEvents: "all", cursor: "pointer" }}
      onClick={onClick}
    >
      {/* Anomaly pulse ring */}
      {isAnomaly && (
        <circle r="26" className="s11-node-pulse-warn" />
      )}
      {/* Active ring */}
      {isActive && !isAnomaly && (
        <circle r="20" className="s11-node-pulse-active" />
      )}
      {/* Status ring */}
      <circle
        r={r}
        fill={industryFill[node.type] ?? "var(--industry-data)"}
        stroke={statusRing[node.status] ?? "var(--status-normal)"}
        strokeWidth="2.5"
      />
      {/* Icon */}
      <foreignObject x={-7} y={-7} width={14} height={14}>
        <Icon size={14} color="#ffffff" style={{ display: "block" }} />
      </foreignObject>
      {/* Label */}
      <text x={0} y={r + 18} textAnchor="middle" className="s11-map-label">
        {shortNodeLabel(node.name)}
      </text>
    </g>
  );
}
