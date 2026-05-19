import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Network,
  Building2,
  Factory,
  User,
  Siren,
  Gauge,
  Eye,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Target,
  Filter,
  GitBranch,
} from "lucide-react";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  graphNodes,
  graphEdges,
  riskContagionPaths,
  type GraphNode,
  type GraphNodeType,
  type RiskContagionPath,
} from "../data/scenario32Data";
import "../styles-scenario-3-2.css";

const NODE_TYPE_CONFIG: Record<GraphNodeType, { label: string; icon: typeof Network }> = {
  enterprise: { label: "企业", icon: Building2 },
  facility: { label: "设施", icon: Factory },
  person: { label: "人员", icon: User },
  event: { label: "事件", icon: Siren },
  device: { label: "装置", icon: Gauge },
};

const REL_TYPE_LABELS: Record<string, string> = {
  ownership: "持股",
  operation: "运营",
  violation: "异常",
  rectification: "整改",
  association: "关联",
  transaction: "交易",
};

const NODE_RADIUS: Record<GraphNodeType, number> = {
  enterprise: 22,
  facility: 18,
  person: 16,
  event: 18,
  device: 14,
};

function getNodeIcon(type: GraphNodeType) {
  const cfg = NODE_TYPE_CONFIG[type];
  const Icon = cfg.icon;
  return Icon;
}

export function Scenario32Page() {
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
    if (typeFilter) {
      nodes = nodes.filter((n) => n.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      nodes = nodes.filter(
        (n) => n.name.toLowerCase().includes(q) || n.id.toLowerCase().includes(q),
      );
    }
    return nodes;
  }, [typeFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const visibleEdges = useMemo(() => {
    return graphEdges.filter(
      (e) => filteredNodeIds.has(e.from) && filteredNodeIds.has(e.to),
    );
  }, [filteredNodeIds]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.15, 2.5)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.15, 0.4)), []);
  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".s32-graph-node")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  }, [pan]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPan({ x: panStart.current.x + dx, y: panStart.current.y + dy });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalUp);
    return () => window.removeEventListener("mouseup", handleGlobalUp);
  }, []);

  const relatedNodes = useMemo(() => {
    const relatedIds = new Set<string>();
    visibleEdges.forEach((e) => {
      if (e.from === selectedNode.id) relatedIds.add(e.to);
      if (e.to === selectedNode.id) relatedIds.add(e.from);
    });
    return graphNodes.filter((n) => relatedIds.has(n.id));
  }, [selectedNode, visibleEdges]);

  const relatedEdgesForSelected = useMemo(() => {
    return visibleEdges.filter(
      (e) => e.from === selectedNode.id || e.to === selectedNode.id,
    );
  }, [selectedNode, visibleEdges]);

  const translateX = useCallback(
    (x: number) => x * zoom + pan.x,
    [zoom, pan],
  );
  const translateY = useCallback(
    (y: number) => y * zoom + pan.y,
    [zoom, pan],
  );

  const cursorStyle = isDragging ? "grabbing" : "grab";

  return (
    <div className="app-shell s32-shell">
      <header className="app-header floating-panel s32-header">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">哈萨克斯坦共和国能源部</div>
            <div className="brand-subtitle">Ministry of Energy of the Republic of Kazakhstan</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">监管图谱</span>
          <strong>AI 监管知识图谱 (Demo)</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button">
            <Eye size={16} />
            查看完整图谱
          </button>
          <a href="#/scenario-3-1" className="primary-button">
            <GitBranch size={17} />
            进入归因研判
          </a>
        </div>
      </header>

      <div className="s32-search-bar floating-panel">
        <div className="s32-search-input-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="搜索节点名称、编号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="s32-type-filters">
          {(Object.keys(NODE_TYPE_CONFIG) as GraphNodeType[]).map((type) => {
            const cfg = NODE_TYPE_CONFIG[type];
            const Icon = cfg.icon;
            const count = graphNodes.filter((n) => n.type === type).length;
            return (
              <button
                key={type}
                className={`s32-type-filter-btn${typeFilter === type ? " active" : ""}`}
                onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                type="button"
              >
                <Icon size={14} />
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="s32-graph-container">
        <svg
          ref={svgRef}
          viewBox={`0 0 920 520`}
          preserveAspectRatio="xMidYMid meet"
          style={{ cursor: cursorStyle, width: "100%", height: "100%" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {visibleEdges.map((edge) => {
              const fromNode = graphNodes.find((n) => n.id === edge.from);
              const toNode = graphNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              const mx = (fromNode.x + toNode.x) / 2;
              const my = (fromNode.y + toNode.y) / 2;
              const isHighlighted =
                selectedNode.id === edge.from || selectedNode.id === edge.to;
              return (
                <g key={edge.id} className={`s32-graph-edge s32-edge-${edge.relationship}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    strokeWidth={1.5 + edge.strength * 3.5}
                    opacity={isHighlighted ? 1 : typeFilter ? 0.35 : 0.22}
                  />
                  <text className="s32-edge-label" x={mx} y={my - 4} textAnchor="middle">
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {filteredNodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              const r = NODE_RADIUS[node.type] * (1 / zoom);
              const isSelected = selectedNode.id === node.id;
              const isInPath = activePath.nodeIds.includes(node.id);

              return (
                <g
                  key={node.id}
                  className={`s32-graph-node${isSelected ? " selected" : ""}`}
                  transform={`translate(${node.x},${node.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                >
                  {isInPath && (
                    <circle
                      r={r + 6}
                      fill="none"
                      stroke={activePath.riskLevel === "critical" ? "var(--status-critical)" : "var(--status-important)"}
                      strokeWidth={2}
                      strokeDasharray="4 3"
                      opacity={0.5}
                    />
                  )}
                  <circle
                    className={`s32-node-circle type-${node.type}`}
                    r={r}
                  />
                  {(() => {
                    const iconSize = r * 1.1;
                    const iconEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    return (
                      <foreignObject
                        x={-iconSize / 2}
                        y={-iconSize / 2}
                        width={iconSize}
                        height={iconSize}
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                          }}
                        >
                          <Icon size={iconSize * 0.65} strokeWidth={2.5} />
                        </div>
                      </foreignObject>
                    );
                  })()}
                  <text
                    className="s32-node-label"
                    y={r + 13}
                    textAnchor="middle"
                  >
                    {node.name.length > 12 ? node.name.slice(0, 12) + "..." : node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="s32-zoom-controls">
          <button className="s32-zoom-btn" onClick={handleZoomIn} type="button" title="放大">
            <ZoomIn size={16} />
          </button>
          <button className="s32-zoom-btn" onClick={handleZoomOut} type="button" title="缩小">
            <ZoomOut size={16} />
          </button>
          <button className="s32-zoom-btn" onClick={handleReset} type="button" title="重置">
            <RotateCw size={16} />
          </button>
        </div>

        <div className="s32-graph-command-strip">
          <div>
            <span>图谱对象</span>
            <strong>{graphNodes.length}</strong>
          </div>
          <div>
            <span>关系边</span>
            <strong>{graphEdges.length}</strong>
          </div>
          <div>
            <span>当前路径</span>
            <strong>{activePath.nodeIds.length} 节点</strong>
          </div>
          <div>
            <span>选中风险</span>
            <strong>{selectedNode.riskScore}</strong>
          </div>
        </div>

        <div className="s32-graph-legend">
          <div className="s32-legend-group">
            <span className="s32-legend-title">节点类型</span>
            {(Object.keys(NODE_TYPE_CONFIG) as GraphNodeType[]).map((type) => (
              <div className="s32-legend-item" key={type}>
                <span className={`s32-legend-dot n-${type}`} />
                {NODE_TYPE_CONFIG[type].label}
              </div>
            ))}
          </div>
          <div className="s32-legend-group">
            <span className="s32-legend-title">关系类型</span>
            {(["ownership", "operation", "violation", "rectification", "association", "transaction"] as const).map(
              (rel) => (
                <div className="s32-legend-item" key={rel}>
                  <span className={`s32-legend-line l-${rel}`} />
                  {REL_TYPE_LABELS[rel]}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <aside className="s32-detail-panel">
        <div className="s32-detail-header">
          <span className={`s32-detail-type-badge b-${selectedNode.type}`}>
            {(() => {
              const Icon = NODE_TYPE_CONFIG[selectedNode.type].icon;
              return <Icon size={12} />;
            })()}
            {NODE_TYPE_CONFIG[selectedNode.type].label}
          </span>
          <h2 className="s32-detail-name">{selectedNode.name}</h2>
        </div>

        <div className="s32-detail-body">
          <div className="s32-detail-section">
            <h4>节点描述</h4>
            <p className="s32-detail-desc">{selectedNode.description}</p>
          </div>

          <div className="s32-detail-section">
            <h4>关键指标</h4>
            <div className="s32-detail-metrics">
              <div className="s32-detail-metric">
                <span>风险评分</span>
                <strong>{selectedNode.riskScore}</strong>
                <div className="s32-risk-bar-wrap">
                  <div
                    className="s32-risk-bar-fill"
                    style={{ width: `${selectedNode.riskScore}%` }}
                  />
                </div>
              </div>
              <div className="s32-detail-metric">
                <span>状态</span>
                <strong style={{
                  color:
                    selectedNode.status === "critical"
                      ? "var(--status-critical)"
                      : selectedNode.status === "important"
                        ? "var(--status-important)"
                        : selectedNode.status === "watch"
                          ? "var(--status-watch)"
                          : "var(--status-normal)",
                }}>
                  {selectedNode.status === "critical"
                    ? "严重"
                    : selectedNode.status === "important"
                      ? "重要"
                      : selectedNode.status === "watch"
                        ? "观察"
                        : "正常"}
                </strong>
              </div>
            </div>
          </div>

          <div className="s32-detail-section">
            <h4>关联节点 ({relatedNodes.length})</h4>
            <div className="s32-related-list">
              {relatedNodes.map((node) => {
                const relEdge = relatedEdgesForSelected.find(
                  (e) => e.from === node.id || e.to === node.id,
                );
                return (
                  <button
                    key={node.id}
                    className="s32-related-item"
                    onClick={() => setSelectedNode(node)}
                    type="button"
                  >
                    <span
                      className={`s32-related-dot r-${relEdge?.relationship ?? "association"}`}
                    />
                    {node.name}
                    {relEdge && (
                      <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--color-text-muted)" }}>
                        {REL_TYPE_LABELS[relEdge.relationship]}
                      </span>
                    )}
                  </button>
                );
              })}
              {relatedNodes.length === 0 && (
                <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                  当前筛选条件下无关联节点
                </p>
              )}
            </div>
          </div>

          <div className="s32-ai-insight-box">
            <h4>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={13} />
                AI 洞察
              </div>
            </h4>
            <p>
              {selectedNode.status === "critical" || selectedNode.status === "important"
                ? `该${NODE_TYPE_CONFIG[selectedNode.type].label}节点当前风险评分 ${selectedNode.riskScore}，处于${selectedNode.status === "critical" ? "严重" : "重要"}关注级别。建议优先核查该节点的关联关系和近期异常记录，评估风险传导可能性。`
                : `该${NODE_TYPE_CONFIG[selectedNode.type].label}节点运行状态正常，风险评分 ${selectedNode.riskScore}。保持常规监测频率，关注关联节点的状态变化。`}
            </p>
          </div>
        </div>
      </aside>

      <div className="s32-contagion-bar">
        <div className="s32-contagion-header">
          <h3>
            <AlertTriangle size={16} style={{ color: "var(--status-critical)" }} />
            风险传染路径分析
          </h3>
          <div className="s32-contagion-tabs">
            {riskContagionPaths.map((path, idx) => (
              <button
                key={path.id}
                className={`s32-contagion-tab${idx === activePathIdx ? " active" : ""}`}
                onClick={() => setActivePathIdx(idx)}
                type="button"
              >
                {path.name}
              </button>
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
                  <span className={`s32-contagion-node c-${node.type}`}>
                    {node.name.length > 10 ? node.name.slice(0, 10) + ".." : node.name}
                  </span>
                  {idx < activePath.nodeIds.length - 1 && (
                    <ArrowRight size={12} className="s32-contagion-arrow" />
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className={`s32-contagion-risk r-${activePath.riskLevel}`}
            >
              {activePath.riskLevel === "critical"
                ? "严重风险"
                : activePath.riskLevel === "important"
                  ? "重要风险"
                  : activePath.riskLevel === "watch"
                    ? "观察级"
                    : "正常"}
            </span>
            <p className="s32-contagion-desc">{activePath.description}</p>
          </div>
        </div>
      </div>

      <div className="s32-disclaimer">
        <ShieldCheck size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
        演示系统不接入物理真实测点
      </div>
    </div>
  );
}
