export type EnergyType = "oil" | "gas" | "power" | "heat";

const tabs: { key: EnergyType; label: string }[] = [
  { key: "oil", label: "油气" },
  { key: "gas", label: "天然气" },
  { key: "power", label: "电力" },
  { key: "heat", label: "供暖" },
];

export function EnergyTypeTabs({
  active,
  onChange,
}: {
  active: EnergyType;
  onChange: (t: EnergyType) => void;
}) {
  return (
    <div className="s11-energy-tabs">
      <span className="s11-filter-label">能源类型</span>
      <div className="s11-tab-group">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`s11-tab ${active === t.key ? "active" : ""}`}
            type="button"
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
