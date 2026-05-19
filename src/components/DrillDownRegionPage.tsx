import { useState, useMemo } from "react";
import "../styles-drill-down-region.css";
import { geoMercator, geoPath } from "d3-geo";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  Clock3,
  Filter,
  Gauge,
  Network,
  Route,
  Search,
  ShieldCheck,
  Target, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { useDataI18n } from "../i18n/dataI18n";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import mangystauDistrictsRaw from "../../assets/maps/mangystau-districts-v1.geojson?raw";
import mangystauRegionRaw from "../../assets/maps/mangystau-region-v1.geojson?raw";
import {
  regionAlertCards,
  regionEnterpriseNodes,
  regionFlowEdges,
  selectedRegionAlert,
} from "../data/demoData";

const mangystauRegion = JSON.parse(mangystauRegionRaw);
const mangystauDistricts = JSON.parse(mangystauDistrictsRaw);

const nodeDisplayOffsets: Record<string, [number, number]> = {
  "ent-demo-kalamkas-ops": [-76, -92],
  "ent-demo-karazhanbas-ops": [-120, -128],
  "ent-demo-aktau-metering": [58, -84],
  "ent-demo-regional-office": [210, -12],
  "ent-demo-aktau-port-storage": [150, 126],
  "ent-demo-uzen-ops": [-12, 130],
};

const roleKeyMap: Record<string, string> = {
  upstream: "dr.role.upstream",
  metering: "dr.role.metering",
  transport: "dr.role.transport",
  storage: "dr.role.storage",
  regulatory: "dr.role.regulatory",
};

const roleIconMap: Record<string, string> = {
  upstream: "dr.role.icon_oil",
  metering: "dr.role.icon_meter",
  transport: "dr.role.icon_transport",
  storage: "dr.role.icon_storage",
  regulatory: "dr.role.icon_reg",
};

export function DrillDownRegionPage() {
  const { t, lang, setLang } = useI18n();
  const { td } = useDataI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const activeAlert = selectedRegionAlert;
  const affectedNodeIds = useMemo(() => new Set(activeAlert.affectedNodeIds), [activeAlert]);

  const filteredNodes = useMemo(() => {
    if (activeFilter === "anomaly") {
      return regionEnterpriseNodes.filter((node) => node.status === "important" || node.status === "critical");
    }
    return regionEnterpriseNodes;
  }, [activeFilter]);

  const width = 1200;
  const height = 800;

  const projection = useMemo(() => geoMercator().fitExtent([[-70, -90], [1270, 910]], mangystauRegion), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const pointForNode = (node: any) => {
    const [x, y] = projection(node.coordinates) ?? [0, 0];
    const [dx, dy] = nodeDisplayOffsets[node.id] ?? [0, 0];
    return [x + dx, y + dy];
  };

  const regionKpis = [
    { label: t("dr.kpi.risk"), value: "82", unit: "/100", icon: Gauge },
    { label: t("dr.kpi.objects"), value: "4", unit: t("dr.kpi.objects_unit"), icon: Network },
    { label: t("dr.kpi.deviation"), value: "-11.4", unit: "%", icon: Activity },
    { label: t("dr.kpi.window"), value: "15", unit: "min", icon: Clock3 },
  ];

  const regionTelemetryRows = [
    { label: t("dr.tel.metering"), value: "6,421.8 t/d", state: t("dr.tel.below_forecast"), tone: "important" },
    { label: t("dr.tel.scada"), value: "11 min", state: t("dr.tel.delayed"), tone: "watch" },
    { label: t("dr.tel.enterprise"), value: "T+8h", state: t("dr.tel.pending_audit"), tone: "watch" },
    { label: t("dr.tel.port"), value: t("dr.tel.connected"), state: t("dr.tel.pending_review"), tone: "normal" },
  ];

  const decisionRows = [
    { label: t("dr.decision.1"), value: t("dr.decision.1.val"), icon: Building2 },
    { label: t("dr.decision.2"), value: t("dr.decision.2.val"), icon: Route },
    { label: t("dr.decision.3"), value: t("dr.decision.3.val"), icon: Target },
  ];

  return (
    <div className="app-shell s11-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("dr.workspace")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <button className="ghost-button" type="button"><Search size={16} /> {t("app.search")}</button>
          <a href="#/drill-down-company" className="primary-button"><Target size={17} /> {t("dr.view.company")}</a>
        </div>
      </header>

      <aside className="left-sidebar floating-panel s-drill-left">
        <div className="sidebar-content-scroll">
          <div className="s-drill-command">
            <span className="eyebrow">{t("dr.command")}</span>
            <strong>{t("dr.command.title")}</strong>
            <p>{t("dr.command.desc")}</p>
          </div>

          <div className="flat-card">
            <div className="section-heading compact">
              <div><span className="eyebrow">FILTERS</span><h2>{t("dr.filter.title")}</h2></div>
              <Filter size={16} className="text-muted"/>
            </div>
            <div className="segmented-control" style={{marginTop: 12}}>
              <button className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>{t("dr.filter.all")}</button>
              <button className={activeFilter === "anomaly" ? "active" : ""} onClick={() => setActiveFilter("anomaly")}>{t("dr.filter.anomaly")}</button>
            </div>
          </div>

          <div className="flat-card">
            <div className="section-heading compact">
              <div><span className="eyebrow">ENTITIES</span><h2>{t("dr.entities.title")}</h2></div>
            </div>
            <div className="node-list" style={{marginTop: 12}}>
              {filteredNodes.map(node => (
                <div key={node.id} style={{display: 'flex', justifyContent: 'space-between', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--color-border-subtle)'}}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <strong style={{fontSize: 12}}>{td(node.name)}</strong>
                    <span style={{fontSize: 10, color: 'var(--color-text-tertiary)'}}>{t(roleKeyMap[node.role] ?? node.role)} · Risk {node.riskScore}</span>
                  </div>
                  {affectedNodeIds.has(node.id) ? <AlertTriangle size={14} className="text-critical"/> : <ShieldCheck size={14} className="text-normal"/>}
                </div>
              ))}
            </div>
          </div>

          <div className="s-drill-chain-card">
            <span className="eyebrow">UPSTREAM / DOWNSTREAM</span>
            <h2>{t("dr.chain.title")}</h2>
            <div className="s-drill-chain">
              <span>{t("dr.chain.1")}</span>
              <i />
              <span>{t("dr.chain.2")}</span>
              <i />
              <span>{t("dr.chain.3")}</span>
              <i />
              <span>{t("dr.chain.4")}</span>
            </div>
          </div>

          <div className="s-drill-source-card">
            <span className="eyebrow">DATA CADENCE</span>
            <h2>{t("dr.cadence.title")}</h2>
            {regionTelemetryRows.map((row) => (
              <div key={row.label} className={`s-drill-source-row ${row.tone}`}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
                <em>{row.state}</em>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="s11-map-container s-drill-map-container">
        <div className="s-drill-kpi-strip">
          {regionKpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label}>
                <Icon size={15} />
                <span>{kpi.label}</span>
                <strong>{kpi.value}<small>{kpi.unit}</small></strong>
              </div>
            );
          })}
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="s11-national-map s-drill-map">
          <defs>
            <pattern id="region-grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M 42 0 L 0 0 0 42" fill="none" stroke="rgba(100,116,139,0.18)" strokeWidth="1" />
            </pattern>
            <filter id="region-node-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.22" />
            </filter>
          </defs>
          <rect width={width} height={height} fill="url(#region-grid)" opacity="0.46" />
          {mangystauDistricts.features.map((feature: any, i: number) => (
            <path key={i} d={path(feature) ?? ""} className="s-drill-district" />
          ))}
          <path d={path(mangystauRegion.features?.[0] ?? mangystauRegion) ?? ""} className="s-drill-region-outline" />
          {regionFlowEdges.map(edge => {
            const from = regionEnterpriseNodes.find(n => n.id === edge.from);
            const to = regionEnterpriseNodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            const [x1, y1] = pointForNode(from);
            const [x2, y2] = pointForNode(to);
            const isAffected = affectedNodeIds.has(edge.from) && affectedNodeIds.has(edge.to);
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const curve = `M ${x1} ${y1} Q ${midX} ${midY - 42} ${x2} ${y2}`;
            return (
              <g key={edge.id} className={isAffected ? "s-drill-flow affected" : "s-drill-flow"}>
                <path d={curve} />
                {isAffected && <path d={curve} className="s-drill-flow-runner" />}
                <text x={midX} y={midY - 52} textAnchor="middle">
                  {td(edge.materialFlow)}
                </text>
              </g>
            );
          })}
          {filteredNodes.map(node => {
            const [x, y] = pointForNode(node);
            const isAnomaly = affectedNodeIds.has(node.id);
            return (
              <g key={node.id} transform={`translate(${x},${y})`} className={isAnomaly ? "s-drill-node active" : "s-drill-node"}>
                {isAnomaly && <circle r="30" className="s-drill-pulse" />}
                <circle r={isAnomaly ? 16 : 13} className="s-drill-node-core" />
                <text y="5" textAnchor="middle" className="s-drill-node-mark">{t(roleIconMap[node.role] ?? "")}</text>
                <text y={isAnomaly ? -26 : -22} textAnchor="middle" className="s-drill-node-label">{td(node.name)}</text>
                <text y={isAnomaly ? 36 : 32} textAnchor="middle" className="s-drill-node-sub">{t(roleKeyMap[node.role] ?? node.role)} · {node.riskScore}</text>
              </g>
            )
          })}
        </svg>
        <div className="s-drill-map-caption">
          <strong>{t("dr.map.caption_local")}</strong>
          <span>{t("dr.map.caption_desc")}</span>
        </div>
        <div className="s-drill-map-side">
          <span className="eyebrow">{t("dr.map.live_window")}</span>
          <strong>11:30 - 15:30</strong>
          <div>
            <i style={{ height: "34%" }} />
            <i style={{ height: "44%" }} />
            <i style={{ height: "52%" }} />
            <i style={{ height: "78%" }} />
            <i style={{ height: "86%" }} />
            <i style={{ height: "64%" }} />
          </div>
          <p>{t("dr.map.anomaly_desc")}</p>
        </div>
        <div className="s-drill-map-bottom">
          {regionTelemetryRows.slice(0, 3).map((row) => (
            <div key={row.label} className={row.tone}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
              <em>{row.state}</em>
            </div>
          ))}
        </div>
      </div>

      <aside className="right-sidebar floating-panel s-drill-right">
        <div className="sidebar-content-scroll">
          <div className="s-drill-alert-panel">
            <div className="section-heading compact">
              <div><span className="eyebrow" style={{color: 'var(--status-important)'}}>ACTIVE ALERT</span><h2 style={{color: 'var(--status-important)'}}>{t("dr.alert_panel.title")}</h2></div>
              <Bot size={18} color="var(--status-important)"/>
            </div>
            <p>
              <strong>{td(activeAlert.title)}</strong><br/><br/>
              {td(activeAlert.trigger)}<br/><br/>
              {td(activeAlert.aiSummary)}
            </p>
            <a href="#/drill-down-company" className="primary-button" style={{marginTop: 16, width: '100%', justifyContent: 'center'}}>
              {t("dr.alert_panel.view_detail")} <ArrowRight size={14}/>
            </a>
          </div>

          <div className="s-drill-decision-panel">
            <span className="eyebrow">MINISTER VIEW</span>
            <h2>{t("dr.decision.title_local")}</h2>
            {decisionRows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.label}>
                  <Icon size={15} />
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              );
            })}
          </div>

          <div className="s-drill-link-panel">
             <div className="section-heading compact">
              <div><span className="eyebrow">LINKED OBJECTS</span><h2>{t("dr.linked.title")}</h2></div>
              <Network size={16} className="text-muted" />
            </div>
            <div className="s-drill-linked-grid">
              {activeAlert.affectedNodeIds.slice(0, 2).map((nodeId) => {
                const node = regionEnterpriseNodes.find((item) => item.id === nodeId);
                if (!node) return null;
                return (
                  <div key={nodeId}>
                    <span>{t(roleKeyMap[node.role] ?? node.role)}</span>
                    <strong>{td(node.name)}</strong>
                  </div>
                );
              })}
            </div>
            <div className="s-drill-linked-summary">
              {t("dr.linked.more_prefix")}{Math.max(activeAlert.affectedNodeIds.length - 2, 0)}{t("dr.linked.more_suffix")}
            </div>
            {regionAlertCards.map(alert => (
              <div key={alert.id} className="s-drill-alert-row">
                <strong>{td(alert.alertObjectId)}</strong>
                <span>{td(alert.recommendedNextStep)}</span>
              </div>
            ))}
            <div className="s-drill-disclaimer">
              {t("dr.disclaimer_full")}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
