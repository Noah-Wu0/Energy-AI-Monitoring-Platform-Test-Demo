import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "./i18n/I18nContext";
import { geoMercator, geoPath } from "d3-geo";
import { Scenario11Page } from "./components/Scenario11Page";
import { DrillDownRegionPage } from "./components/DrillDownRegionPage";
import { DrillDownCompanyPage } from "./components/DrillDownCompanyPage";
import { Scenario12Page } from "./components/Scenario12Page";
import { Scenario21Page } from "./components/Scenario21Page";
import { Scenario22Page } from "./components/Scenario22Page";
import { Scenario31Page } from "./components/Scenario31Page";
import { Scenario32Page } from "./components/Scenario32Page";
import { Scenario41Page } from "./components/Scenario41Page";
import { Scenario42Page } from "./components/Scenario42Page";
import { HomePage } from "./components/HomePage";
import {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Database,
  Eye,
  FileClock,
  Filter,
  Globe,
  History,
  Layers3,
  ListChecks,
  MapPin,
  Network,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  AlertTriangle,
  X
} from "lucide-react";
import mangystauDistrictsRaw from "../assets/maps/mangystau-districts-v1.geojson?raw";
import mangystauRegionRaw from "../assets/maps/mangystau-region-v1.geojson?raw";
import emblemUrl from "../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import kmgLogoUrl from "../assets/logos/kmg-kazmunaygas-logo-v1.svg";
import { StatusBadge } from "./components/StatusBadge";
import {
  anomalyEvents,
  auditTrail,
  energyNodes,
  energyTrend,
  evidenceItems,
  flowEdges,
  mapLayerStats,
  nodeIcons,
  overviewStats,
  pipelineStatusRows,
  type AnomalyEvent,
  type EnergyNode,
} from "./data/demoData";

const selectedDefault = anomalyEvents[0];
const mangystauRegion = JSON.parse(mangystauRegionRaw) as GeoJSON.FeatureCollection;
const mangystauDistricts = JSON.parse(mangystauDistrictsRaw) as GeoJSON.FeatureCollection;

// Adjust offsets to be minimal, just to resolve overlap
const nodeDisplayOffsets: Record<string, [number, number]> = {
  "fld-kalamkas": [20, -10],
  "fld-karazhanbas": [-10, -25],
  "asset-metering-kbm-03": [5, -25],
  "node-ministry": [0, 0],
  "node-aktau-port": [-10, 10],
  "fld-uzen": [10, 10],
  "fld-dunga": [-15, 15],
};

// Removed redundant external targets array

function AppHeader() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="app-header floating-panel">
      <div className="brand-lockup">
        <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
        <div>
          <div className="brand-title">{t("app.subtitle")}</div>
          <div className="brand-subtitle">{t("app.subtitle.en")}</div>
        </div>
      </div>
      <div className="header-center">
        <span className="workspace-tag">{t("overview.workspace")}</span>
        <strong>{t("app.title")}</strong>
      </div>
      <div className="header-actions">
        <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
          <Globe size={15} />
          {t("app.lang")}
        </button>
        <button className="ghost-button" type="button">
          <Search size={16} />
          {t("app.search")}
        </button>
        <button className="primary-button" type="button">
          <FileClock size={17} />
          {t("app.report")}
        </button>
      </div>
    </header>
  );
}

function LeftSidebar({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: EnergyNode;
  onSelectNode: (node: EnergyNode) => void;
}) {
  const { t } = useI18n();
  return (
    <aside className="left-sidebar floating-panel">
      <div className="sidebar-content-scroll">
        <div className="flat-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("overview.macro")}</span>
              <h2>{t("overview.macro.title")}</h2>
            </div>
            <Activity size={18} className="section-icon" />
          </div>
          <div className="kpi-grid">
            {overviewStats.map((stat) => (
              <div className="kpi-tile" key={stat.label}>
                <span>{stat.label}</span>
                <strong>
                  {stat.value}
                  <small>{stat.unit}</small>
                </strong>
                <em className={stat.trend.includes("异常") ? "text-critical" : "text-primary"}>
                  {stat.trend}
                </em>
              </div>
            ))}
          </div>
        </div>

        <div className="flat-card">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("overview.assets")}</span>
              <h2>{t("overview.assets.title")}</h2>
            </div>
            <span className="mini-count">{energyNodes.length}</span>
          </div>
          <div className="node-list">
            {energyNodes.map((node) => {
              const Icon = nodeIcons[node.type];
              const isActive = node.id === selectedNode.id;
              const isAnomaly = node.status === "important" || node.status === "critical";
              return (
                <button
                  className={`node-row ${isActive ? "active" : ""} ${isAnomaly ? "has-anomaly" : ""}`}
                  key={node.id}
                  type="button"
                  onClick={() => onSelectNode(node)}
                >
                  <div className={`node-icon-box bg-industry-${node.type} ${isAnomaly ? "pulse-warn" : ""}`}>
                    <Icon size={16} color="white" />
                  </div>
                  <div className="node-copy">
                    <strong>{node.name.replace("示意节点", "")}</strong>
                    <small>{node.subtitle}</small>
                  </div>
                  {isAnomaly ? <AlertTriangle size={16} className="text-critical" /> : <StatusBadge status={node.status} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flat-card">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("overview.telemetry")}</span>
              <h2>{t("overview.telemetry.title")}</h2>
            </div>
          </div>
          <MiniTrend />
          <div className="metric-strip">
            <div className="metric-box">
              <span>{t("overview.flow.instant")}</span>
              <strong>{selectedNode.flowRate.toLocaleString()} <small>t/d</small></strong>
            </div>
            <div className="metric-box">
              <span>{t("overview.compliance")}</span>
              <strong>{selectedNode.complianceScore} <small>/ 100</small></strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MiniTrend() {
  const points = energyTrend
    .map((value, index) => {
      const x = (index / (energyTrend.length - 1)) * 270;
      const y = 98 - ((value - 70) / 50) * 82;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="mini-trend" viewBox="0 0 270 112" role="img">
      <defs>
        <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#EA580C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[24, 52, 80].map((y) => (
        <line key={y} x1="0" x2="270" y1={y} y2={y} className="trend-grid" />
      ))}
      <polygon points={`0,108 ${points} 270,108`} fill="url(#trendArea)" />
      <polyline points={points} className="trend-line-alert" />
      <circle cx="176" cy="24" r="5" className="trend-dot-alert" />
      <text x="188" y="29" className="trend-label-alert">
        AI 捕获异常掉落
      </text>
    </svg>
  );
}

function MapWorkspace({
  selectedNode,
  selectedEvent,
  onSelectNode,
  isPopoverOpen,
  onClosePopover,
  viewMode,
  onViewModeChange,
}: {
  selectedNode: EnergyNode;
  selectedEvent: AnomalyEvent;
  onSelectNode: (node: EnergyNode) => void;
  isPopoverOpen: boolean;
  onClosePopover: () => void;
  viewMode: "industry" | "data-link";
  onViewModeChange: (mode: "industry" | "data-link") => void;
}) {
  const { t } = useI18n();
  const width = 1440;
  const height = 900;
  const svgRef = useRef<SVGSVGElement>(null);

  const projection = useMemo(() => {
    return geoMercator().fitExtent(
      [
        [150, 80],
        [1290, 820],
      ],
      mangystauRegion as GeoJSON.FeatureCollection,
    );
  }, []);

  const path = useMemo(() => geoPath(projection), [projection]);
  const pointForNode = (node: EnergyNode) => {
    const [x, y] = projection(node.coordinates) ?? [0, 0];
    const [dx, dy] = nodeDisplayOffsets[node.id] ?? [0, 0];
    return [x + dx, y + dy];
  };

  // Convert SVG viewBox coords to screen pixel coords
  const svgToScreen = useCallback((svgX: number, svgY: number): [number, number] => {
    const svg = svgRef.current;
    if (!svg) return [0, 0];
    const rect = svg.getBoundingClientRect();
    const scaleX = rect.width / width;
    const scaleY = rect.height / height;
    const scale = Math.max(scaleX, scaleY); // xMidYMid slice
    const renderedW = width * scale;
    const renderedH = height * scale;
    const offsetX = (rect.width - renderedW) / 2;
    const offsetY = (rect.height - renderedH) / 2;
    return [offsetX + svgX * scale, offsetY + svgY * scale];
  }, [width, height]);

  const backgroundWells = useMemo(() => {
    const wells = [];
    for (let i = 0; i < 120; i++) {
      const lng = 50.8 + Math.random() * 2.2;
      const lat = 43.2 + Math.random() * 1.8;
      wells.push([lng, lat]);
    }
    return wells;
  }, []);

  return (
    <div className="map-workspace">
      {/* View Switcher */}
      <div className="map-top-center-overlay floating-panel-subtle">
        <div className="segmented-control">
          <button className={viewMode === "industry" ? "active" : ""} type="button" onClick={() => onViewModeChange("industry")}>
            <Layers3 size={15} /> {t("overview.map.layer")}
          </button>
          <button className={viewMode === "data-link" ? "active" : ""} type="button" onClick={() => onViewModeChange("data-link")}>
            <Database size={15} /> {t("overview.map.data")}
          </button>
        </div>
      </div>

      {/* View Mode Indicator */}
      {viewMode === "data-link" && (
        <div style={{
          position: "absolute", top: 160, left: "50%", transform: "translateX(-50%)",
          zIndex: 100, padding: "10px 20px", borderRadius: 8,
          background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.36)",
          fontSize: 13, fontWeight: 700, color: "#0284c7",
          boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
        }}>
          <Database size={15} style={{ marginRight: 8, verticalAlign: -3 }} />
          {t("overview.map.data.desc")}
        </div>
      )}

      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="industry-map" preserveAspectRatio="xMidYMid slice">
        <defs>
          <marker id="arrowExport" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706" />
          </marker>
          <marker id="arrowData" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
          </marker>
        </defs>

        <rect width="100%" height="100%" className="map-ocean" onClick={onClosePopover} />
        {(mangystauDistricts as GeoJSON.FeatureCollection).features.map((feature, index) => (
          <path key={index} d={path(feature) ?? ""} className="district-shape" onClick={onClosePopover} />
        ))}
        <path d={path((mangystauRegion as GeoJSON.FeatureCollection).features[0]) ?? ""} className="region-outline" onClick={onClosePopover} />

        {/* Background Minor Wells (Context) */}
        {backgroundWells.map((coord, index) => {
          const [x, y] = projection(coord as [number, number]) ?? [0, 0];
          return <circle key={`well-${index}`} cx={x} cy={y} r="1.5" fill="#94a3b8" opacity="0.4" />;
        })}

        {/* Edges - filtered by viewMode */}
        {flowEdges.filter(edge => viewMode === "industry" ? edge.type !== "data" : edge.type === "data").map((edge) => {
          const from = energyNodes.find((node) => node.id === edge.from);
          const to = energyNodes.find((node) => node.id === edge.to);
          if (!from || !to) return null;
          const [x1, y1] = pointForNode(from);
          const [x2, y2] = pointForNode(to);
          
          const dx = x2 - x1;
          const dy = y2 - y1;
          const isHorizontal = Math.abs(dx) > Math.abs(dy);
          const pathData = isHorizontal 
            ? `M ${x1} ${y1} C ${x1 + dx * 0.5} ${y1}, ${x1 + dx * 0.5} ${y2}, ${x2} ${y2}`
            : `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.5}, ${x2} ${y1 + dy * 0.5}, ${x2} ${y2}`;
            
          const pathId = `path-${edge.id}`;
          return (
            <g key={edge.id} className={`flow-edge flow-${edge.type} status-${edge.status}`}>
              <path id={pathId} d={pathData} />
              <circle r={edge.status === "important" ? 4.5 : 3} className="flow-packet">
                <animateMotion dur={edge.status === "important" ? "1.8s" : "4s"} repeatCount="indefinite">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {energyNodes.map((node) => {
          const [x, y] = pointForNode(node);
          const Icon = nodeIcons[node.type];
          const isActive = selectedNode.id === node.id;
          const isAnomaly = node.status === "important" || node.status === "critical";
          const isEventNode = selectedEvent.nodeId === node.id;
          
          return (
            <g
              key={node.id}
              className={`gis-node ${isActive ? "active" : ""}`}
              transform={`translate(${x} ${y})`}
              style={{ pointerEvents: "all" }}
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onSelectNode(node); 
              }}
            >
              {(isAnomaly || isEventNode) && <circle r="26" className="node-pulse-warn" />}
              {isActive && !isAnomaly && <circle r="20" className="node-pulse-active" />}
              
              <circle r={isAnomaly ? 15 : 12} className={`node-solid fill-industry-${node.type} ${isAnomaly ? "stroke-warn" : "stroke-white"}`} />
              
              <foreignObject x={isAnomaly ? -8 : -7} y={isAnomaly ? -8 : -7} width={isAnomaly ? 16 : 14} height={isAnomaly ? 16 : 14}>
                <Icon size={isAnomaly ? 16 : 14} color="#ffffff" />
              </foreignObject>

              {/* GIS standard label: stroke outline text */}
              <text x={0} y={26} textAnchor="middle" className="gis-label-main">
                {node.name.replace("示意节点", "")}
              </text>
            </g>
          );
        })}

      </svg>

      {/* HTML Popover - rendered OUTSIDE the SVG for maximum browser compatibility */}
      {isPopoverOpen && selectedNode && (() => {
        const [svgX, svgY] = pointForNode(selectedNode);
        const [screenX, screenY] = svgToScreen(svgX, svgY);
        const isAnomaly = selectedNode.status === "important" || selectedNode.status === "critical";
        return (
          <div
            className={`premium-popover ${isAnomaly ? "is-anomaly" : ""}`}
            style={{ position: "absolute", left: screenX + 20, top: screenY - 40, zIndex: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="premium-popover-header">
              <div className="premium-popover-title">
                <span className="premium-popover-name">{selectedNode.name}</span>
                {isAnomaly ? (
                  <span className="premium-popover-badge badge-critical">AI 异常预警</span>
                ) : (
                  <span className="premium-popover-badge badge-normal">运转正常</span>
                )}
              </div>
              <button type="button" className="premium-popover-close" onClick={onClosePopover}>
                <X size={14} />
              </button>
            </div>
            <div className="premium-popover-body">
              <div className="premium-popover-row">
                <span className="row-label">设施类别</span>
                <span className="row-value">{selectedNode.subtitle}</span>
              </div>
              {selectedNode.flowRate > 0 && (
                <div className="premium-popover-row">
                  <span className="row-label">遥测流速</span>
                  <span className="row-value font-num">{selectedNode.flowRate.toLocaleString()} <span className="unit">t/d</span></span>
                </div>
              )}
              <div className="premium-popover-row">
                <span className="row-label">合规指数</span>
                <span className={`row-value font-num ${isAnomaly ? "text-critical" : "text-normal"}`}>{selectedNode.complianceScore} <span className="unit">/ 100</span></span>
              </div>
            </div>
            {isAnomaly && (
              <div className="premium-popover-footer">
                建议立即下发核查指令
              </div>
            )}
          </div>
        );
      })()}
      
      {/* Legend */}
      <div className="map-legend-panel floating-panel-subtle">
        <div className="legend-title">图例说明</div>
        <div className="legend-row">
          <div className="legend-dot fill-industry-oil" /> 重点油气节点
        </div>
        <div className="legend-row">
          <div className="legend-line line-oil" /> 物理输送管网
        </div>
        <div className="legend-row">
          <div className="legend-line line-data" /> 监管报送链路
        </div>
        <div className="legend-row">
          <AlertTriangle size={14} className="text-critical" /> AI 预警目标
        </div>
      </div>
    </div>
  );
}

function RightSidebar({
  selectedEvent,
  onSelectEvent,
}: {
  selectedEvent: AnomalyEvent;
  onSelectEvent: (event: AnomalyEvent) => void;
}) {
  const { t, lang } = useI18n();
  const sourceNode = energyNodes.find((node) => node.id === selectedEvent.nodeId);

  return (
    <aside className="right-sidebar floating-panel">
      <div className="sidebar-content-scroll">

        {/* Urgent AI Panel */}
        <div className="flat-card alert-card">
          <div className="ai-panel-header">
            <span className="ai-badge-urgent">
              <Bot size={16} />
              {t("overview.ai.title")}
            </span>
            <span className="confidence-urgent">{t("event.confidence")}: {Math.round(selectedEvent.confidence * 100)}%</span>
          </div>
          <h2 className="alert-title">{selectedEvent.title}</h2>
          <p className="alert-desc">{selectedEvent.aiSummary}</p>

          <div className="evidence-box">
            <div className="evidence-row">
              <span>{lang === "zh" ? "异常发生源" : "Anomaly Source"}</span>
              <strong>{sourceNode?.name ?? (lang === "zh" ? "未知" : "Unknown")}</strong>
            </div>
            <div className="evidence-row">
              <span>{lang === "zh" ? "预警时间" : "Detection Time"}</span>
              <strong>{selectedEvent.detectedAt}</strong>
            </div>
          </div>

          <div className="action-box-urgent">
            <Sparkles size={16} />
            <span>{selectedEvent.suggestedAction}</span>
          </div>
          <a href="#/scenario-2-1" className="review-button-urgent" style={{ textDecoration: "none" }}>
            <UserCheck size={17} />
            {t("overview.ai.action")}
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Event Feed */}
        <div className="flat-card">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("overview.event.title")}</span>
              <h2>{t("overview.event.heading")}</h2>
            </div>
          </div>
          <div className="event-list">
            {anomalyEvents.map((event) => (
              <button
                className={`event-row ${selectedEvent.id === event.id ? "active" : ""}`}
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event)}
              >
                <div className={`event-dot status-${event.severity}`} />
                <div className="event-row-content">
                  <strong>{event.title}</strong>
                  <small>{event.detectedAt}</small>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="flat-card">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("overview.audit.title")}</span>
              <h2>{t("overview.audit.heading")}</h2>
            </div>
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <div className="audit-list">
            {auditTrail.map((step) => (
              <div className={`audit-step ${step.state}`} key={step.id}>
                <div className="audit-marker">
                  {step.state === "done" ? <CheckCircle2 size={16} className="text-normal" /> : <CircleDot size={16} className="text-muted" />}
                </div>
                <div className="audit-content">
                  <div className="audit-title">
                    <strong>{step.actor}</strong>
                    <span>{step.time}</span>
                  </div>
                  <p>{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function BottomCommandBar() {
  const { t } = useI18n();
  return (
    <div className="bottom-command-bar floating-panel">
      <div className="command-item active">
        <Eye size={16} />
        {t("overview.bottom.situ")}
      </div>
      <div className="command-item">
        <ClipboardCheck size={16} />
        {t("overview.bottom.review")}
      </div>
      <div className="command-item">
        <ListChecks size={16} />
        {t("overview.bottom.track")}
      </div>
      <div className="command-divider" />
      <div className="command-brand">
        <img src={kmgLogoUrl} alt="KMG" />
        <span>{t("overview.bottom.brand")}</span>
      </div>
    </div>
  );
}

export function App() {
  const { t } = useI18n();
  const [selectedEvent, setSelectedEvent] = useState<AnomalyEvent>(selectedDefault);
  const [selectedNode, setSelectedNode] = useState<EnergyNode>(
    energyNodes.find((node) => node.id === selectedDefault.nodeId) ?? energyNodes[0],
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"industry" | "data-link">("industry");

  const handleSelectEvent = (event: AnomalyEvent) => {
    setSelectedEvent(event);
    const node = energyNodes.find((item) => item.id === event.nodeId);
    if (node) {
      setSelectedNode(node);
      setIsPopoverOpen(true);
    }
  };

  const handleSelectNode = (node: EnergyNode) => {
    setSelectedNode(node);
    setIsPopoverOpen(true);
  };

  return (
    <div className="app-shell">
      <MapWorkspace
        selectedNode={selectedNode}
        selectedEvent={selectedEvent}
        onSelectNode={handleSelectNode}
        isPopoverOpen={isPopoverOpen}
        onClosePopover={() => setIsPopoverOpen(false)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <AppHeader />
      <LeftSidebar selectedNode={selectedNode} onSelectNode={handleSelectNode} />
      <RightSidebar selectedEvent={selectedEvent} onSelectEvent={handleSelectEvent} />

      <div className="demo-disclaimer floating-panel-subtle">
        <ShieldCheck size={16} className="text-primary" />
        <span>{t("overview.disclaimer")}</span>
      </div>
      <BottomCommandBar />
    </div>
  );
}

export function AppRouter() {
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "" || route === "#/" || route === "#/home") {
    return <HomePage />;
  }
  if (route === "#/overview") {
    return <App />;
  }
  if (route === "#/scenario-1-1") {
    return <Scenario11Page />;
  }
  if (route === "#/drill-down-region") {
    return <DrillDownRegionPage />;
  }
  if (route === "#/drill-down-company") {
    return <DrillDownCompanyPage />;
  }
  if (route === "#/scenario-1-2") {
    return <Scenario12Page />;
  }
  if (route === "#/scenario-2-1") {
    return <Scenario21Page />;
  }
  if (route === "#/scenario-2-2") {
    return <Scenario22Page />;
  }
  if (route === "#/scenario-3-1") {
    return <Scenario31Page />;
  }
  if (route === "#/scenario-3-2") {
    return <Scenario32Page />;
  }
  if (route === "#/scenario-4-1") {
    return <Scenario41Page />;
  }
  if (route === "#/scenario-4-2") {
    return <Scenario42Page />;
  }
  return <HomePage />;
}
