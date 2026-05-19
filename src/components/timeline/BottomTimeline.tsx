import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useI18n } from "../../i18n/I18nContext";
import type { TimelinePoint } from "../../data/scenario11Data";

const statusColor: Record<string, string> = {
  normal: "var(--status-normal)",
  watch: "var(--status-watch)",
  important: "var(--status-important)",
  critical: "var(--status-critical)",
};

export function BottomTimeline({ data }: { data: TimelinePoint[] }) {
  const { t } = useI18n();
  return (
    <div className="s11-timeline">
      <div className="s11-timeline-header">
        <span className="s11-eyebrow">24H TIMELINE</span>
        <h3>{t("timeline.title")}</h3>
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
              formatter={((value: number) => [`${value} ${t("timeline.tooltip_events")}`, t("timeline.tooltip_density")]) as never}
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
