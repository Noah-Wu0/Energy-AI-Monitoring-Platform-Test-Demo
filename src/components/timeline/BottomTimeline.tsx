import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TimelinePoint } from "../../data/scenario11Data";

const statusColor: Record<string, string> = {
  normal: "var(--status-normal)",
  watch: "var(--status-watch)",
  important: "var(--status-important)",
  critical: "var(--status-critical)",
};

export function BottomTimeline({ data }: { data: TimelinePoint[] }) {
  return (
    <div className="s11-timeline">
      <div className="s11-timeline-header">
        <span className="s11-eyebrow">24H TIMELINE</span>
        <h3>过去 24 小时态势回看</h3>
      </div>
      <div className="s11-timeline-chart">
        <ResponsiveContainer width="100%" height={60}>
          <BarChart data={data} barGap={1}>
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} interval={3} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "var(--color-bg-panel)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
              }}
              formatter={((value: number) => [`${value} 事件`, "事件密度"]) as never}
              labelFormatter={((label: string) => `${label}`) as never}
            />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={statusColor[entry.status] ?? statusColor.normal} opacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
