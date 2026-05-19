import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";

export type FilterState = {
  region: string | null;
  enterprise: string | null;
  severity: string | null;
};

type FilterDropdownProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
};

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="s11-filter-dropdown" ref={ref}>
      <button
        className={`s11-filter-btn ${value ? "has-value" : ""}`}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : label}</span>
        <div className="s11-filter-btn-icons">
          {value && (
            <span
              className="s11-filter-clear"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown size={14} className={open ? "rotated" : ""} />
        </div>
      </button>
      {open && (
        <div className="s11-filter-menu">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`s11-filter-option ${opt.value === value ? "active" : ""}`}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RegionFilter({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (state: FilterState) => void;
}) {
  const { t } = useI18n();

  const regionOptions = [
    { value: "mangystau", label: t("filter.region.mangystau") },
    { value: "west-kz", label: t("filter.region.west_kz") },
    { value: "atyrau", label: t("filter.region.atyrau") },
    { value: "aktobe", label: t("filter.region.aktobe") },
    { value: "kyzylorda", label: t("filter.region.kyzylorda") },
  ];

  const enterpriseOptions = [
    { value: "kmg", label: t("filter.enterprise.kmg") },
    { value: "mangystau-munai-gas", label: t("filter.enterprise.mangystau") },
    { value: "kaz-trans-oil", label: t("filter.enterprise.kaz_trans_oil") },
    { value: "kaz-trans-gas", label: t("filter.enterprise.kaz_trans_gas") },
  ];

  const severityOptions = [
    { value: "important", label: t("severity.important") },
    { value: "watch", label: t("severity.watch") },
    { value: "normal", label: t("severity.normal") },
  ];

  return (
    <div className="s11-filters">
      <span className="s11-filter-label">{t("filter.label")}</span>
      <FilterDropdown
        label={t("filter.all_regions")}
        options={regionOptions}
        value={value.region}
        onChange={(v) => onChange({ ...value, region: v })}
      />
      <FilterDropdown
        label={t("filter.all_enterprises")}
        options={enterpriseOptions}
        value={value.enterprise}
        onChange={(v) => onChange({ ...value, enterprise: v })}
      />
      <FilterDropdown
        label={t("filter.all_levels")}
        options={severityOptions}
        value={value.severity}
        onChange={(v) => onChange({ ...value, severity: v })}
      />
    </div>
  );
}
