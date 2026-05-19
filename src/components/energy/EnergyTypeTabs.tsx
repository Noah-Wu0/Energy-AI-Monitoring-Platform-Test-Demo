import { useI18n } from "../../i18n/I18nContext";

export type EnergyType = "oil" | "gas" | "power" | "heat";

const labelKeys: Record<EnergyType, string> = {
  oil: "energy.type.oil",
  gas: "energy.type.gas",
  power: "energy.type.power",
  heat: "energy.type.heat",
};

export function EnergyTypeTabs({
  active,
  onChange,
}: {
  active: EnergyType;
  onChange: (type: EnergyType) => void;
}) {
  const { t } = useI18n();
  const tabs: { key: EnergyType; label: string }[] = [
    { key: "oil", label: t("energy.type.oil") },
    { key: "gas", label: t("energy.type.gas") },
    { key: "power", label: t("energy.type.power") },
    { key: "heat", label: t("energy.type.heat") },
  ];

  return (
    <div className="s11-energy-tabs">
      <span className="s11-filter-label">{t("energy.type.label")}</span>
      <div className="s11-tab-group">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`s11-tab ${active === tab.key ? "active" : ""}`}
            type="button"
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
