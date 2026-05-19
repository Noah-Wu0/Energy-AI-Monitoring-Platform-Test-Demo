import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

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

const regionOptions = [
  { value: "mangystau", label: "曼吉斯套州" },
  { value: "west-kz", label: "西哈州" },
  { value: "atyrau", label: "阿特劳州" },
  { value: "aktobe", label: "阿克托别州" },
  { value: "kyzylorda", label: "克孜勒奥尔达州" },
];

const enterpriseOptions = [
  { value: "kmg", label: "哈国油 (KMG)" },
  { value: "mangystau-munai-gas", label: "曼吉斯套油气" },
  { value: "kaz-trans-oil", label: "哈国输油" },
  { value: "kaz-trans-gas", label: "哈国输气" },
];

const severityOptions = [
  { value: "important", label: "重要" },
  { value: "watch", label: "观察" },
  { value: "normal", label: "正常" },
];

export function RegionFilter({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (state: FilterState) => void;
}) {
  return (
    <div className="s11-filters">
      <span className="s11-filter-label">筛选</span>
      <FilterDropdown
        label="全部地区"
        options={regionOptions}
        value={value.region}
        onChange={(v) => onChange({ ...value, region: v })}
      />
      <FilterDropdown
        label="全部企业"
        options={enterpriseOptions}
        value={value.enterprise}
        onChange={(v) => onChange({ ...value, enterprise: v })}
      />
      <FilterDropdown
        label="全部等级"
        options={severityOptions}
        value={value.severity}
        onChange={(v) => onChange({ ...value, severity: v })}
      />
    </div>
  );
}
