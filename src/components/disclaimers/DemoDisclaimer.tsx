import { ShieldCheck } from "lucide-react";

export function DemoDisclaimer() {
  return (
    <div className="s11-disclaimer">
      <ShieldCheck size={14} />
      <span>演示口径：模拟数据；AI 初判需人工复核；地图边界仅作示意，非官方测绘。</span>
    </div>
  );
}
