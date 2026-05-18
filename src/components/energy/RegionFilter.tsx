import { ChevronDown } from "lucide-react";

export function RegionFilter() {
  return (
    <div className="s11-filters">
      <span className="s11-filter-label">筛选</span>
      <button className="s11-filter-btn" type="button">
        全部地区 <ChevronDown size={14} />
      </button>
      <button className="s11-filter-btn" type="button">
        全部企业 <ChevronDown size={14} />
      </button>
      <button className="s11-filter-btn" type="button">
        全部等级 <ChevronDown size={14} />
      </button>
    </div>
  );
}
