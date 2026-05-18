import type { KpiItem } from "../../data/scenario11Data";

export function TopKpiBar({ kpis }: { kpis: KpiItem[] }) {
  return (
    <div className="s11-kpi-bar">
      {kpis.map((kpi) => (
        <div className="s11-kpi-tile" key={kpi.label}>
          <span className="s11-kpi-label">{kpi.label}</span>
          <strong className="s11-kpi-value">
            {kpi.value}
            {kpi.unit && <small>{kpi.unit}</small>}
          </strong>
          <span className="s11-kpi-sub">{kpi.subtitle}</span>
        </div>
      ))}
    </div>
  );
}
