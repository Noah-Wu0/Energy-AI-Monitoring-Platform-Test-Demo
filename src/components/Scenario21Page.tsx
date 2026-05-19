import { useState, useMemo } from "react";
import {
  Brain, Activity, TrendingUp, TrendingDown, AlertTriangle,
  Zap, Layers, Eye, ArrowRight, ShieldCheck, Bot, Sparkles,
  Clock, Filter, BarChart3, LineChart, ChevronDown, UserCheck,
  Siren, Target, Search, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { useDataI18n } from "../i18n/dataI18n";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  detectionLayers,
  timeSeriesMetrics,
  metricFlowData,
  metricPressureData,
  metricEnergyData,
  anomalyDetections,
  timeRangeOptions,
  nodeFilterOptions,
  type AnomalyDetection,
  type TimeSeriesPoint,
} from "../data/scenario21Data";
import "../styles-scenario-2-1.css";

const metricDataMap: Record<string, TimeSeriesPoint[]> = {
  "metric-flow-kbm": metricFlowData,
  "metric-pressure-kbm": metricPressureData,
  "metric-energy-dunga": metricEnergyData,
};

const algoKeyMap: Record<string, string> = {
  threshold: "s21.algoThreshold",
  statistical: "s21.algoStatistical",
  "ts-ai": "s21.algoTSAI",
};

const severityKeyMap: Record<string, string> = {
  important: "s21.severityImportant",
  watch: "s21.severityWatch",
};

const statusKeyMap: Record<string, string> = {
  new: "s21.statusNew",
  reviewing: "s21.statusReviewing",
  resolved: "s21.statusResolved",
};

export function Scenario21Page() {
  const { t, lang, setLang } = useI18n();
  const { td } = useDataI18n();
  const [selectedMetricId, setSelectedMetricId] = useState<string>(timeSeriesMetrics[0].id);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("24h");
  const [selectedNodeFilter, setSelectedNodeFilter] = useState<string>("all");
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>(anomalyDetections[0].id);

  const selectedMetric = timeSeriesMetrics.find((m) => m.id === selectedMetricId) ?? timeSeriesMetrics[0];
  const tsData = metricDataMap[selectedMetricId] ?? metricFlowData;

  const selectedAnomaly = anomalyDetections.find((a) => a.id === selectedAnomalyId) ?? anomalyDetections[0];
  const chartWidth = 920;
  const chartHeight = 360;
  const chartPad = { top: 24, right: 28, bottom: 34, left: 54 };

  const chartAnomalies = useMemo(() => {
    return anomalyDetections
      .filter((a) => a.metricName === selectedMetric.name)
      .map((a) => {
        const startIdx = tsData.findIndex((p) => p.time === a.anomalyStart);
        const endIdx = tsData.findIndex((p) => p.time === a.anomalyEnd);
        return {
          ...a,
          startIndex: startIdx >= 0 ? startIdx : 0,
          endIndex: endIdx >= 0 ? endIdx : startIdx + 4,
        };
      });
  }, [selectedMetric.name, tsData]);

  const chartGeometry = useMemo(() => {
    const allValues = tsData.flatMap((point) => [point.actual, point.predicted, point.upperBound, point.lowerBound]);
    const minRaw = Math.min(...allValues);
    const maxRaw = Math.max(...allValues);
    const range = Math.max(maxRaw - minRaw, 1);
    const min = minRaw - range * 0.16;
    const max = maxRaw + range * 0.18;
    const innerW = chartWidth - chartPad.left - chartPad.right;
    const innerH = chartHeight - chartPad.top - chartPad.bottom;
    const xFor = (index: number) => chartPad.left + (index / Math.max(tsData.length - 1, 1)) * innerW;
    const yFor = (value: number) => chartPad.top + ((max - value) / (max - min)) * innerH;
    const lineFor = (key: keyof Pick<TimeSeriesPoint, "actual" | "predicted">) =>
      tsData.map((point, index) => `${xFor(index)},${yFor(point[key])}`).join(" ");
    const band = [
      ...tsData.map((point, index) => `${xFor(index)},${yFor(point.upperBound)}`),
      ...tsData.slice().reverse().map((point, reverseIndex) => {
        const index = tsData.length - 1 - reverseIndex;
        return `${xFor(index)},${yFor(point.lowerBound)}`;
      }),
    ].join(" ");
    const yTicks = Array.from({ length: 4 }, (_, index) => {
      const value = min + (range * (index + 1)) / 4;
      return { value, y: yFor(value) };
    });
    return { min, max, xFor, yFor, lineFor, band, yTicks, innerW, innerH };
  }, [tsData]);

  const hasData = tsData.length > 0;

  return (
    <div className="app-shell s21-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s21.title")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <a href="#/scenario-3-1" className="ghost-button">
            <UserCheck size={16} />
            {t("s21.initiateReview")}
          </a>
          <a href="#/scenario-2-2" className="primary-button">
            <Siren size={17} />
            {t("s21.alertOverview")}
          </a>
        </div>
      </header>

      <aside className="left-sidebar floating-panel s21-left-layers">
        <div className="s21-scroll">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("s21.detectionEngine")}</span>
              <h2>{t("s21.threeLayerTitle")}</h2>
            </div>
            <Layers size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </div>

          {detectionLayers.map((layer) => (
            <div
              key={layer.id}
              className={`s21-layer-card ${layer.active ? "active" : "pending"}`}
            >
              <div className="s21-layer-header">
                <div className="s21-layer-name">
                  {layer.id === "layer-threshold" && <Target size={14} />}
                  {layer.id === "layer-statistical" && <BarChart3 size={14} />}
                  {layer.id === "layer-ts-ai" && <Brain size={14} />}
                  {td(layer.name)}
                </div>
                <span className={`s21-layer-badge ${layer.active ? "active" : "pending"}`}>
                  {layer.active ? t("s21.layerRunning") : t("s21.layerPending")}
                </span>
              </div>
              <div className="s21-layer-desc">{td(layer.description)}</div>
              <div className="s21-layer-count">
                {t("s21.layerAnomalyPrefix")}{layer.anomalyCount}{t("s21.layerAnomalySuffix")}
              </div>
            </div>
          ))}

          <div className="section-heading compact">
            <div>
              <span className="eyebrow">METRICS</span>
              <h2>{t("s21.metricsTitle")}</h2>
            </div>
            <Activity size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </div>

          <div className="s21-metric-selector">
            {timeSeriesMetrics.map((metric) => (
              <button
                key={metric.id}
                className={`s21-metric-chip ${selectedMetricId === metric.id ? "active" : ""}`}
                type="button"
                onClick={() => setSelectedMetricId(metric.id)}
              >
                <div>
                  <div className="s21-metric-chip-name">{td(metric.name)}</div>
                  <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
                    {metric.unit}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="s21-metric-chip-value">{metric.currentValue.toLocaleString()}</div>
                  <div className={`s21-metric-chip-change ${metric.trend}`}>
                    {metric.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {metric.changePercent > 0 ? "+" : ""}{metric.changePercent}%
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="section-heading compact">
            <div>
              <span className="eyebrow">NODE FILTER</span>
              <h2>{t("s21.nodeFilterTitle")}</h2>
            </div>
          </div>

          <select
            value={selectedNodeFilter}
            onChange={(e) => setSelectedNodeFilter(e.target.value)}
            style={{
              width: "100%", height: "34px", padding: "0 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-subtle)",
              background: "var(--color-bg-panel)",
              fontSize: "12px", fontWeight: 600,
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {nodeFilterOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>

          <div className="section-heading compact">
            <div>
              <span className="eyebrow">TIME RANGE</span>
              <h2>{t("s21.timeRangeTitle")}</h2>
            </div>
            <Clock size={14} style={{ color: "var(--color-text-tertiary)" }} />
          </div>

          <div className="s21-time-range">
            {timeRangeOptions.map((opt) => (
              <button
                key={opt.value}
                className={`s21-time-chip ${selectedTimeRange === opt.value ? "active" : ""}`}
                type="button"
                onClick={() => setSelectedTimeRange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="floating-panel s21-center-chart">
        {hasData ? (
          <div className="s21-chart-container">
            <div className="s21-chart-header">
              <div className="s21-chart-title">
                <h3>{td(selectedMetric.name)} - {t("s21.timeSeriesAnalysis")}</h3>
                <div className="s21-chart-subtitle">
                  {t("s21.chartSubtitle")}
                </div>
              </div>
              <div className="s21-chart-legend">
                <div className="s21-legend-item">
                  <div className="s21-legend-dot actual" />
                  {t("s21.chartLegendActual")}
                </div>
                <div className="s21-legend-item">
                  <div className="s21-legend-dot predicted" />
                  {t("s21.chartLegendPredicted")}
                </div>
                <div className="s21-legend-item">
                  <div className="s21-legend-dot band" />
                  {t("s21.chartLegendBand")}
                </div>
              </div>
            </div>
            <div className="s21-chart-body">
              <svg className="s21-regulatory-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
                <defs>
                  <linearGradient id="s21-band-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.04" />
                  </linearGradient>
                  <filter id="s21-line-shadow" x="-10%" y="-80%" width="120%" height="260%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.28" />
                  </filter>
                </defs>
                {chartGeometry.yTicks.map((tick) => (
                  <g key={tick.y}>
                    <line x1={chartPad.left} x2={chartWidth - chartPad.right} y1={tick.y} y2={tick.y} className="s21-chart-gridline" />
                    <text x={chartPad.left - 12} y={tick.y + 4} textAnchor="end" className="s21-chart-axis-label">
                      {Math.round(tick.value).toLocaleString()}
                    </text>
                  </g>
                ))}
                {[0, 16, 32, 48, 64, 80, 95].map((index) => (
                  <g key={index}>
                    <line x1={chartGeometry.xFor(index)} x2={chartGeometry.xFor(index)} y1={chartPad.top} y2={chartHeight - chartPad.bottom} className="s21-chart-vline" />
                    <text x={chartGeometry.xFor(index)} y={chartHeight - 12} textAnchor="middle" className="s21-chart-axis-label">
                      {tsData[index]?.time}
                    </text>
                  </g>
                ))}
                {chartAnomalies.map((anomaly) => {
                  const x = chartGeometry.xFor(anomaly.startIndex);
                  const w = Math.max(chartGeometry.xFor(anomaly.endIndex) - x, 10);
                  return (
                    <g key={anomaly.id}>
                      <rect x={x} y={chartPad.top} width={w} height={chartGeometry.innerH} className={`s21-chart-alert-window ${anomaly.severity}`} />
                      <text x={x + 8} y={chartPad.top + 18} className="s21-chart-window-label">{t("s21.chartAnomalyWindow")}</text>
                    </g>
                  );
                })}
                <polygon points={chartGeometry.band} className="s21-chart-band" />
                <polyline points={chartGeometry.lineFor("predicted")} className="s21-chart-predicted" />
                <polyline points={chartGeometry.lineFor("actual")} className="s21-chart-actual" />
                {tsData.filter((_, index) => index % 8 === 0).map((point, index) => {
                  const sourceIndex = index * 8;
                  return <circle key={point.time} cx={chartGeometry.xFor(sourceIndex)} cy={chartGeometry.yFor(point.actual)} r="3.5" className="s21-chart-dot" />;
                })}
                <circle
                  cx={chartGeometry.xFor(tsData.length - 1)}
                  cy={chartGeometry.yFor(tsData[tsData.length - 1].actual)}
                  r="7"
                  className="s21-chart-current-dot"
                />
              </svg>
            </div>
            <div className="s21-chart-callouts">
              <div>
                <span>{t("s21.calloutCurrent")}</span>
                <strong>{selectedMetric.currentValue.toLocaleString()} {selectedMetric.unit}</strong>
              </div>
              <div>
                <span>{t("s21.calloutConfidence")}</span>
                <strong>{Math.round(selectedAnomaly.confidence * 100)}%</strong>
              </div>
              <div>
                <span>{t("s21.calloutAnomalyWindow")}</span>
                <strong>{selectedAnomaly.anomalyStart} - {selectedAnomaly.anomalyEnd}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="s21-no-selection">
            <LineChart size={48} />
            <span>{t("s21.emptyMetric")}</span>
          </div>
        )}
      </main>

      <aside className="right-sidebar floating-panel s21-right-ai-panel">
        <div className="s21-scroll">
          <div className={`s21-ai-alert-header severity-${selectedAnomaly.severity}`}>
            <div className="s21-ai-icon-box">
              <Bot size={18} />
            </div>
            <div className="s21-ai-title-section">
              <div className="s21-ai-title">{td(selectedAnomaly.title)}</div>
              <div className="s21-ai-subtitle">
                {t("s21.detectedAt")}{selectedAnomaly.detectedAt} | {t("s21.queueHeaderAlgorithm")}: {t(algoKeyMap[selectedAnomaly.algorithm] ?? selectedAnomaly.algorithm)}
              </div>
            </div>
            <div className="s21-confidence-badge">
              {Math.round(selectedAnomaly.confidence * 100)}%
            </div>
          </div>

          <div className="s21-explanation-section">
            <div className="s21-explanation-label">
              <Search size={12} />
              {t("s21.anomalyReason")}
            </div>
            <div className="s21-explanation-text">
              {td(selectedAnomaly.aiExplanation.reason)}
            </div>
          </div>

          <div className="s21-explanation-section">
            <div className="s21-explanation-label">
              <ShieldCheck size={12} />
              {t("s21.keyEvidence")}
            </div>
            <div className="s21-explanation-text">
              {td(selectedAnomaly.aiExplanation.evidence)}
            </div>
          </div>

          <div className="s21-explanation-section">
            <div className="s21-explanation-label">
              <ArrowRight size={12} />
              {t("s21.suggestedAction")}
            </div>
            <div className="s21-explanation-text">
              {td(selectedAnomaly.aiExplanation.recommendation)}
            </div>
          </div>

          <div className="section-heading compact" style={{ marginTop: "4px" }}>
            <div>
              <span className="eyebrow">{t("s21.relatedAnomaliesEyebrow")}</span>
              <h2>{t("s21.relatedAnomaliesTitle")}</h2>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {anomalyDetections.slice(0, 1).map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setSelectedAnomalyId(a.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "var(--radius-sm)",
                  border: selectedAnomalyId === a.id ? "1px solid var(--color-primary)" : "1px solid var(--color-border-subtle)",
                  background: selectedAnomalyId === a.id ? "var(--color-primary-soft)" : "var(--color-bg-panel-soft)",
                  cursor: "pointer", textAlign: "left", transition: "150ms",
                }}
              >
                <div className={`s21-severity-dot ${a.severity}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {td(a.title)}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontFamily: "var(--font-number)", marginTop: "2px" }}>
                    {t(algoKeyMap[a.algorithm] ?? a.algorithm)} | {t("s21.queueHeaderConfidence")} {Math.round(a.confidence * 100)}%
                  </div>
                </div>
                <ChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
              </button>
            ))}
          </div>

          <div className="s21-action-bar">
            <div className="s21-action-text">
              {t("s21.aiDoneText")}
            </div>
            <a href="#/scenario-3-1" className="s21-action-button">
              <UserCheck size={15} />
              {t("s21.initiateReviewBtn")}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </aside>

      <div className="floating-panel s21-bottom-queue">
        <div className="s21-queue-header">
          <div className="s21-queue-title">
            <Siren size={16} style={{ color: "var(--status-important)" }} />
            <h3>{t("s21.queueTitle")}</h3>
            <span className="s21-queue-count">{anomalyDetections.length} {t("s21.queueCount")}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="ghost-button" type="button" style={{ height: "30px", fontSize: "12px" }}>
              <Filter size={13} />
              {t("s21.queueFilter")}
            </button>
          </div>
        </div>
        <div className="s21-queue-table-wrap">
          <table className="s21-queue-table">
            <thead>
              <tr>
                <th>{t("s21.queueHeaderEvent")}</th>
                <th>{t("s21.queueHeaderMetric")}</th>
                <th>{t("s21.queueHeaderAlgorithm")}</th>
                <th>{t("s21.queueHeaderSeverity")}</th>
                <th>{t("s21.queueHeaderTime")}</th>
                <th>{t("s21.queueHeaderConfidence")}</th>
                <th>{t("s21.queueHeaderStatus")}</th>
                <th>{t("s21.queueHeaderAction")}</th>
              </tr>
            </thead>
            <tbody>
              {anomalyDetections.map((a) => (
                <tr
                  key={a.id}
                  style={{
                    cursor: "pointer",
                    background: selectedAnomalyId === a.id ? "var(--color-primary-soft)" : "transparent",
                  }}
                  onClick={() => setSelectedAnomalyId(a.id)}
                >
                  <td>{td(a.title)}</td>
                  <td>{td(a.metricName)}</td>
                  <td>
                    <span className={`s21-algo-badge ${a.algorithm}`}>
                      {t(algoKeyMap[a.algorithm] ?? a.algorithm)}
                    </span>
                  </td>
                  <td>
                    <span className={`s21-severity-dot ${a.severity}`} />
                    {t(severityKeyMap[a.severity] ?? a.severity)}
                  </td>
                  <td style={{ fontFamily: "var(--font-number)", fontSize: "11px" }}>{a.detectedAt}</td>
                  <td style={{ fontFamily: "var(--font-number)", fontWeight: 700 }}>
                    {Math.round(a.confidence * 100)}%
                  </td>
                  <td>
                    <span className={`s21-queue-badge ${a.status}`}>
                      {t(statusKeyMap[a.status] ?? a.status)}
                    </span>
                  </td>
                  <td>
                    <button className="s21-queue-action-btn" type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedAnomalyId(a.id); }}
                    >
                      <Eye size={12} />
                      {t("s21.viewAction")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="s21-disclaimer">
        <ShieldCheck size={14} style={{ color: "var(--status-normal)" }} />
        <span>{t("s21.disclaimer")}</span>
      </div>
    </div>
  );
}
