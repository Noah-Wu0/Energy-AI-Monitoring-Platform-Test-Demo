import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Search, Network, Building2, Factory, User, Siren, Gauge,
  Eye, ArrowRight, ShieldCheck, AlertTriangle, Bot, Sparkles,
  ZoomIn, ZoomOut, RotateCw, Target, Filter, GitBranch, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  graphNodes, graphEdges, riskContagionPaths,
  type GraphNode, type GraphNodeType, type RiskContagionPath,
} from "../data/scenario32Data";
import "../styles-scenario-3-2.css";

export function Scenario32Page() {
  const { t, lang, setLang } = useI18n();

  const NODE_TYPE_LABEL: Record<GraphNodeType, string> = {
    enterprise: t("s32.nodeTypeEnterprise"),
    facility: t("s32.nodeTypeFacility"),
    person: t("s32.nodeTypePerson"),
    event: t("s32.nodeTypeEvent"),
    device: t("s32.nodeTypeDevice"),
  };

  const NODE_TYPE_ICON: Record<GraphNodeType, typeof Network> = {
    enterprise: Building2, facility: Factory, person: User, event: Siren, device: Gauge,
  };

  const REL_TYPE_LABELS: Record<string, string> = {
    ownership: t("s32.relOwnership"),
    operation: t("s32.relOperation"),
    violation: t("s32.relViolation"),
    rectification: t("s32.relRectification"),
    association: t("s32.relAssociation"),
    transaction: t("s32.relTransaction"),
  };

  const NODE_RADIUS: Record<GraphNodeType, number> = {
    enterprise: 22, facility: 18, person: 16, event: 18, device: 14,
  };

  const statusLabel = (s: string) => s === "critical" ? t("s32.statusCritical") : s === "important" ? t("s32.statusImportant") : s === "watch" ? t("s32.statusWatch") : t("s32.statusNormal");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<GraphNode>(graphNodes[0]);
  const [typeFilter, setTypeFilter] = useState<GraphNodeType | null>(null);
  const [activePathIdx, setActivePathIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const activePath = riskContagionPaths[activePathIdx];

  const filteredNodes = useMemo(() => {
    let nodes = graphNodes;
    if (typeFilter) nodes = nodes.filter((n) => n.type === typeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      nodes = nodes.filter((n) => n.name.toLowerCase().includes(q) || n.id.toLowerCase().includes(q));
    }
    return nodes;
  }, [typeFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);
  const visibleEdges = useMemo(() => graphEdges.filter((e) => filteredNodeIds.has(e.from) && filteredNodeIds.has(e.to)), [filteredNodeIds]);

  const relatedNodes = useMemo(() => {
    const relatedIds = new Set<string>();
    visibleEdges.forEach((e) => {
      if (e.from === selectedNode.id) relatedIds.add(e.to);
      if (e.to === selectedNode.id) relatedIds.add(e.from);
    });
    return graphNodes.filter((n) => relatedIds.has(n.id));
  }, [selectedNode, visibleEdges]);

  const relatedEdgesForSelected = useMemo(() => visibleEdges.filter((e) => e.from === selectedNode.id || e.to === selectedNode.id), [selectedNode, visibleEdges]);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.15, 2.5)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.15, 0.4)), []);
  const handleReset = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  const riskLevelLabel = (rl: string) => rl === "critical" ? t("s32.contagionRiskCritical") : rl === "important" ? t("s32.contagionRiskImportant") : rl === "watch" ? t("s32.contagionRiskWatch") : t("s32.contagionRiskNormal");

  const aiInsightText = selectedNode.status === "critical" || selectedNode.status === "important"
    ? t("s32.aiInsightCritical")
    : t("s32.aiInsightNormal");

  return (
    <div className="app-shell s32-shell">
      <header className="app-header floating-panel s32-header">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s32.title")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <button className="ghost-button" type="button">
            <Eye size={16} />
            {t("s32.viewFullGraph")}
          </button>
          <a href="#/scenario-3-1" className="primary-button">
            <GitBranch size={17} />
            {t("s32.enterAttribution")}
          </a>
        </div>
      </header>

      <div className="s32-search-bar floating-panel">
        <div className="s32-search-input-wrap">
          <Search size={16} />
          <input type="text" placeholder={t("s32.searchPlaceholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="s32-type-filters">
          {(Object.keys(NODE_TYPE_LABEL) as GraphNodeType[]).map((type) => {
            const Icon = NODE_TYPE_ICON[type];
            const count = graphNodes.filter((n) => n.type === type).length;
            return (
              <button key={type} className={`s32-type-filter-btn${typeFilter === type ? " active" : ""}`} onClick={() => setTypeFilter(typeFilter === type ? null : type)} type="button">
                <Icon size={14} />
                {NODE_TYPE_LABEL[type]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="s32-graph-container">
        <svg ref={svgRef} viewBox="0 0 920 520" preserveAspectRatio="xMidYMid meet"
          style={{ cursor: isDragging ? "grabbing" : "grab", width: "100%", height: "100%" }}
          onMouseDown={(e) => { if (!(e.target as HTMLElement).closest(".s32-graph-node")) { setIsDragging(true); dragStart.current = { x: e.clientX, y: e.clientY }; panStart.current = { ...pan }; } }}
          onMouseMove={(e) => { if (!isDragging) return; setPan({ x: panStart.current.x + e.clientX - dragStart.current.x, y: panStart.current.y + e.clientY - dragStart.current.y }); }}
          onMouseUp={() => setIsDragging(false)}
        >
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {visibleEdges.map((edge) => {
              const fromNode = graphNodes.find((n) => n.id === edge.from);
              const toNode = graphNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              const mx = (fromNode.x + toNode.x) / 2;
              const my = (fromNode.y + toNode.y) / 2;
              const isHighlighted = selectedNode.id === edge.from || selectedNode.id === edge.to;
              return (
                <g key={edge.id} className={`s32-graph-edge s32-edge-${edge.relationship}`}>
                  <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
                    strokeWidth={1.5 + edge.strength * 3.5}
                    opacity={isHighlighted ? 1 : typeFilter ? 0.35 : 0.22}
                  />
                  <text className="s32-edge-label" x={mx} y={my - 4} textAnchor="middle">{edge.label}</text>
                </g>
              );
            })}
            {filteredNodes.map((node) => {
              const Icon = NODE_TYPE_ICON[node.type];
              const r = NODE_RADIUS[node.type] * (1 / zoom);
              const isSelected = selectedNode.id === node.id;
              const isInPath = activePath.nodeIds.includes(node.id);
              return (
                <g key={node.id} className={`s32-graph-node${isSelected ? " selected" : ""}`} transform={`translate(${node.x},${node.y})`}
                  onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                >
                  {isInPath && <circle r={r + 6} fill="none" stroke={activePath.riskLevel === "critical" ? "var(--status-critical)" : "var(--status-important)"} strokeWidth={2} strokeDasharray="4 3" opacity={0.5} />}
                  <circle className={`s32-node-circle type-${node.type}`} r={r} />
                  <foreignObject x={-r * 1.1 / 2} y={-r * 1.1 / 2} width={r * 1.1} height={r * 1.1} style={{ pointerEvents: "none" }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                      <Icon size={r * 1.1 * 0.65} strokeWidth={2.5} />
                    </div>
                  </foreignObject>
                  <text className="s32-node-label" y={r + 13} textAnchor="middle">
                    {node.name.length > 12 ? node.name.slice(0, 12) + "..." : node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="s32-zoom-controls">
          <button className="s32-zoom-btn" onClick={handleZoomIn} type="button"><ZoomIn size={16} /></button>
          <button className="s32-zoom-btn" onClick={handleZoomOut} type="button"><ZoomOut size={16} /></button>
          <button className="s32-zoom-btn" onClick={handleReset} type="button"><RotateCw size={16} /></button>
        </div>

        <div className="s32-graph-command-strip">
          <div><span>{t("s32.commandNodes")}</span><strong>{graphNodes.length}</strong></div>
          <div><span>{t("s32.commandEdges")}</span><strong>{graphEdges.length}</strong></div>
          <div><span>{t("s32.commandPath")}</span><strong>{activePath.nodeIds.length} {t("s32.contagionNodeSuffix")}</strong></div>
          <div><span>{t("s32.commandRisk")}</span><strong>{selectedNode.riskScore}</strong></div>
        </div>

        <div className="s32-graph-legend">
          <div className="s32-legend-group">
            <span className="s32-legend-title">{t("s32.legendNodeType")}</span>
            {(Object.keys(NODE_TYPE_LABEL) as GraphNodeType[]).map((type) => (
              <div className="s32-legend-item" key={type}>
                <span className={`s32-legend-dot n-${type}`} />
                {NODE_TYPE_LABEL[type]}
              </div>
            ))}
          </div>
          <div className="s32-legend-group">
            <span className="s32-legend-title">{t("s32.legendRelType")}</span>
            {(["ownership", "operation", "violation", "rectification", "association", "transaction"] as const).map((rel) => (
              <div className="s32-legend-item" key={rel}>
                <span className={`s32-legend-line l-${rel}`} />
                {REL_TYPE_LABELS[rel]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="s32-detail-panel">
        <div className="s32-detail-header">
          <span className={`s32-detail-type-badge b-${selectedNode.type}`}>
            {(() => { const Icon = NODE_TYPE_ICON[selectedNode.type]; return <Icon size={12} />; })()}
            {NODE_TYPE_LABEL[selectedNode.type]}
          </span>
          <h2 className="s32-detail-name">{selectedNode.name}</h2>
        </div>
        <div className="s32-detail-body">
          <div className="s32-detail-section">
            <h4>{t("s32.detailSectionDesc")}</h4>
            <p className="s32-detail-desc">{selectedNode.description}</p>
          </div>
          <div className="s32-detail-section">
            <h4>{t("s32.detailSectionMetrics")}</h4>
            <div className="s32-detail-metrics">
              <div className="s32-detail-metric">
                <span>{t("s32.detailMetricRisk")}</span>
                <strong>{selectedNode.riskScore}</strong>
                <div className="s32-risk-bar-wrap"><div className="s32-risk-bar-fill" style={{ width: `${selectedNode.riskScore}%` }} /></div>
              </div>
              <div className="s32-detail-metric">
                <span>{t("s32.detailMetricStatus")}</span>
                <strong style={{ color: selectedNode.status === "critical" ? "var(--status-critical)" : selectedNode.status === "important" ? "var(--status-important)" : selectedNode.status === "watch" ? "var(--status-watch)" : "var(--status-normal)" }}>
                  {statusLabel(selectedNode.status)}
                </strong>
              </div>
            </div>
          </div>
          <div className="s32-detail-section">
            <h4>{t("s32.detailSectionRelated")} ({relatedNodes.length})</h4>
            <div className="s32-related-list">
              {relatedNodes.map((node) => {
                const relEdge = relatedEdgesForSelected.find((e) => e.from === node.id || e.to === node.id);
                return (
                  <button key={node.id} className="s32-related-item" onClick={() => setSelectedNode(node)} type="button">
                    <span className={`s32-related-dot r-${relEdge?.relationship ?? "association"}`} />
                    {node.name}
                    {relEdge && <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--color-text-muted)" }}>{REL_TYPE_LABELS[relEdge.relationship]}</span>}
                  </button>
                );
              })}
              {relatedNodes.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{t("s32.noRelatedNodes")}</p>}
            </div>
          </div>
          <div className="s32-ai-insight-box">
            <h4><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Sparkles size={13} />{t("s32.aiInsight")}</div></h4>
            <p>{aiInsightText}</p>
          </div>
        </div>
      </aside>

      <div className="s32-contagion-bar">
        <div className="s32-contagion-header">
          <h3><AlertTriangle size={16} style={{ color: "var(--status-critical)" }} />{t("s32.contagionTitle")}</h3>
          <div className="s32-contagion-tabs">
            {riskContagionPaths.map((path, idx) => (
              <button key={path.id} className={`s32-contagion-tab${idx === activePathIdx ? " active" : ""}`} onClick={() => setActivePathIdx(idx)} type="button">{path.name}</button>
            ))}
          </div>
        </div>
        <div className="s32-contagion-content">
          <div className="s32-contagion-path">
            {activePath.nodeIds.map((nid, idx) => {
              const node = graphNodes.find((n) => n.id === nid);
              if (!node) return null;
              return (
                <span key={nid} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span className={`s32-contagion-node c-${node.type}`}>{node.name.length > 10 ? node.name.slice(0, 10) + ".." : node.name}</span>
                  {idx < activePath.nodeIds.length - 1 && <ArrowRight size={12} className="s32-contagion-arrow" />}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className={`s32-contagion-risk r-${activePath.riskLevel}`}>{riskLevelLabel(activePath.riskLevel)}</span>
            <p className="s32-contagion-desc">{activePath.description}</p>
          </div>
        </div>
      </div>

      <div className="s32-disclaimer">
        <ShieldCheck size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
        {t("s32.disclaimer")}
      </div>
    </div>
  );
}
