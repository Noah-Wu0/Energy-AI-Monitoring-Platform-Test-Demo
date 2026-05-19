import { useCallback, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { EnergyNode, FlowEdge } from "../../data/demoData";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import kzRegionsRaw from "../../../assets/maps/kazakhstan-regions-v1.geojson?raw";
import { MapNode } from "./MapNode";
import { MapPopover } from "./MapPopover";

const kzRegions = JSON.parse(kzRegionsRaw) as GeoJSON.FeatureCollection;

const edgeBend: Record<string, number> = {
  "chain-atyrau-refinery": -22,
  "chain-atyrau-petrochem": 40,
  "chain-atyrau-caspian": -120,
  "chain-mangystau-port": -24,
  "chain-mangystau-bitum": 24,
  "chain-west-gas-atyrau": -82,
  "chain-aktobe-qyzylorda": 92,
  "chain-qyzylorda-shymkent": 72,
  "chain-qyzylorda-atasu": -54,
  "chain-atasu-alashankou": -64,
  "chain-mangystau-samara": 148,
  "chain-atyrau-pavlodar": -170,
  "data-west-ministry": -112,
  "data-east-ministry": 96,
  "data-caspian-ministry": -138,
};

const regionStatus: Record<string, "normal" | "watch" | "important" | "strategic"> = {
  Atyrau: "watch",
  Mangghystau: "important",
  "West Kazakhstan": "watch",
  Aqtöbe: "normal",
  Qyzylorda: "watch",
  Pavlodar: "strategic",
  Qaraghandy: "strategic",
  "South Kazakhstan": "watch",
  Aqmola: "strategic",
};

const regionLabels: Record<string, string> = {
  Atyrau: "Atyrau / 上游+炼化",
  Mangghystau: "Mangystau / 港储运",
  "West Kazakhstan": "West KZ / 凝析气",
  Aqtöbe: "Aktobe / 油气",
  Qyzylorda: "Kyzylorda / Kumkol",
  Pavlodar: "Pavlodar / 炼厂",
  "South Kazakhstan": "Shymkent / 炼厂",
};

const stageTransform = {
  a: 1.16,
  b: 0,
  c: -0.06,
  d: 1.02,
  e: -10,
  f: -12,
};

function stagePoint(x: number, y: number): [number, number] {
  return [
    stageTransform.a * x + stageTransform.c * y + stageTransform.e,
    stageTransform.b * x + stageTransform.d * y + stageTransform.f,
  ];
}

function curvedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number,
) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  const controlX = midX + normalX * bend;
  const controlY = midY + normalY * bend;
  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}

export function NationalMap({
  nodes,
  edges,
  selectedNode,
  nodeIcons,
  onSelectNode,
}: {
  nodes: EnergyNode[];
  edges: FlowEdge[];
  selectedNode: EnergyNode | null;
  nodeIcons: Record<EnergyNode["type"], LucideIcon>;
  onSelectNode: (node: EnergyNode) => void;
}) {
  const { t } = useI18n();
  const width = 1200;
  const height = 760;
  const svgRef = useRef<SVGSVGElement>(null);

  const projection = useMemo(
    () =>
      geoMercator().fitExtent(
        [
          [52, 74],
          [1148, 706],
        ],
        kzRegions,
      ),
    [],
  );

  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const pointForNode = useCallback(
    (node: EnergyNode): [number, number] => {
      const p = projection(node.coordinates);
      return p ?? [0, 0];
    },
    [projection],
  );

  // SVG to container-relative coordinate conversion for popover positioning
  // Accounts for CSS scale(1.15) transform on the SVG element
  const svgToContainer = useCallback(
    (svgX: number, svgY: number): [number, number] => {
      const svg = svgRef.current;
      if (!svg) return [0, 0];
      const container = svg.parentElement;
      if (!container) return [0, 0];
      const [stageX, stageY] = stagePoint(svgX, svgY);
      const svgRect = svg.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scaleX = svgRect.width / width;
      const scaleY = svgRect.height / height;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (svgRect.width - width * scale) / 2;
      const offsetY = (svgRect.height - height * scale) / 2;
      const absX = svgRect.left + offsetX + stageX * scale;
      const absY = svgRect.top + offsetY + stageY * scale;
      return [absX - containerRect.left, absY - containerRect.top];
    },
    [width, height],
  );

  const [popoverNode, setPopoverNode] = useState<{
    node: EnergyNode;
    screenX: number;
    screenY: number;
  } | null>(null);

  const handleNodeClick = (e: React.MouseEvent, node: EnergyNode) => {
    e.stopPropagation();
    onSelectNode(node);
    const container = svgRef.current?.parentElement;
    if (container) {
      const cr = container.getBoundingClientRect();
      setPopoverNode({ node, screenX: e.clientX - cr.left + 12, screenY: e.clientY - cr.top - 16 });
    }
  };

  const handleMapClick = (regionName?: string | React.MouseEvent) => {
    setPopoverNode(null);
    if (typeof regionName === "string" && regionName === "Mangghystau") {
      window.location.hash = "#/drill-down-region";
    }
  };

  return (
    <div className="s11-map-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="s11-national-map"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleMapClick}
      >
        <defs>
          <filter id="s11-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#475569" floodOpacity="0.18" />
          </filter>
          <filter id="s11-corridor-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="s11-arrow-crude"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--industry-oil)" />
          </marker>
          <marker
            id="s11-arrow-gas"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--industry-gas)" />
          </marker>
          <marker
            id="s11-arrow-data"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--industry-data)" />
          </marker>
        </defs>
        {/* Removed internal map title as requested by user */}

        <ellipse className="s11-sandtable-base" cx="612" cy="668" rx="520" ry="86" />

        <g
          className="s11-sandtable"
          transform={`matrix(${stageTransform.a} ${stageTransform.b} ${stageTransform.c} ${stageTransform.d} ${stageTransform.e} ${stageTransform.f})`}
        >
          <g className="s11-region-extrusion">
            {kzRegions.features.map((feature, i) => {
              const d = pathGen(feature) ?? "";
              return <path key={i} d={d} />;
            })}
          </g>

          <g>
            {/* Region polygons */}
            {kzRegions.features.map((feature, i) => {
              const d = pathGen(feature) ?? "";
              const props = feature.properties as Record<string, unknown> | undefined;
              const regionName = String(props?.NAME_1 ?? "");
              const status = regionStatus[regionName] ?? "base";
              return (
                <path
                  key={i}
                  d={d}
                  className={`s11-region s11-region-${status}`}
                  style={regionName === "Mangghystau" ? { cursor: "pointer" } : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMapClick(regionName);
                  }}
                />
              );
            })}
          </g>

          <g className="s11-region-labels">
            {kzRegions.features.map((feature, i) => {
              const props = feature.properties as Record<string, unknown> | undefined;
              const regionName = String(props?.NAME_1 ?? "");
              const label = regionLabels[regionName];
              if (!label) return null;
              const centroid = pathGen.centroid(feature);
              if (!Number.isFinite(centroid[0]) || !Number.isFinite(centroid[1])) return null;
              return (
                <text key={`${regionName}-${i}`} x={centroid[0]} y={centroid[1]}>
                  {label}
                </text>
              );
            })}
          </g>

          {/* Corridor bands */}
          {edges
            .filter((edge) => edge.type !== "data" && edge.flowRate > 8000)
            .map((edge) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              const [x1, y1] = pointForNode(fromNode);
              const [x2, y2] = pointForNode(toNode);
              const pathD = curvedPath(x1, y1, x2, y2, edgeBend[edge.id] ?? 0);
              return (
                <path
                  key={`band-${edge.id}`}
                  d={pathD}
                  className={`s11-corridor-band band-${edge.type} ${edge.status === "important" ? "band-important" : ""}`}
                  filter="url(#s11-corridor-glow)"
                />
              );
            })}

          <g className="s11-corridor-labels">
            <g transform="translate(360 302)">
              <rect width="136" height="26" rx="5" />
              <text x="68" y="17">{t("nmap.corridor.cpc")}</text>
            </g>
            <g transform="translate(326 492)">
              <rect width="148" height="26" rx="5" />
              <text x="74" y="17">{t("nmap.corridor.uas")}</text>
            </g>
            <g transform="translate(688 548)">
              <rect width="164" height="26" rx="5" />
              <text x="82" y="17">{t("nmap.corridor.cn")}</text>
            </g>
            <g transform="translate(210 614)">
              <rect width="150" height="26" rx="5" />
              <text x="75" y="17">{t("nmap.corridor.aktau")}</text>
            </g>
          </g>

          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const [x1, y1] = pointForNode(fromNode);
            const [x2, y2] = pointForNode(toNode);
            const pathId = `s11-path-${edge.id}`;
            const pathD = curvedPath(x1, y1, x2, y2, edgeBend[edge.id] ?? 0);
            const markerId =
              edge.type === "gas"
                ? "s11-arrow-gas"
                : edge.type === "data"
                  ? "s11-arrow-data"
                  : "s11-arrow-crude";

            return (
              <g key={edge.id} className={`s11-flow-edge flow-${edge.type}`}>
                <path
                  id={pathId}
                  d={pathD}
                  className={edge.status === "important" ? "edge-important" : ""}
                  markerEnd={`url(#${markerId})`}
                />
                <text className="s11-edge-label">
                  <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                    {edge.label}
                  </textPath>
                </text>
                {/* Animated flow packet */}
                {edge.flowRate > 0 && (
                  <circle r="3" className="s11-flow-packet">
                    <animateMotion
                      dur={edge.status === "important" ? "1.5s" : "4s"}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const [x, y] = pointForNode(node);
            const Icon = nodeIcons[node.type];
            const isActive = selectedNode?.id === node.id;

            return (
              <MapNode
                key={node.id}
                node={node}
                x={x}
                y={y}
                icon={Icon}
                isActive={isActive}
                onClick={(e) => handleNodeClick(e, node)}
              />
            );
          })}
        </g>

        <g className="s11-risk-callouts">
          <g transform="translate(92 468)">
            <path d="M 136 18 L 198 -18" />
            <rect width="156" height="42" rx="8" />
            <text x="12" y="17">{t("nmap.callout.mangystau")}</text>
            <text x="12" y="32">{t("nmap.callout.mangystau_desc")}</text>
          </g>
          <g transform="translate(122 290)">
            <path d="M 132 18 L 220 12" />
            <rect width="150" height="42" rx="8" />
            <text x="12" y="17">{t("nmap.callout.westkz")}</text>
            <text x="12" y="32">{t("nmap.callout.westkz_desc")}</text>
          </g>
        </g>
      </svg>

      {/* HTML Popover for selected node */}
      {popoverNode && (
        <MapPopover
          node={popoverNode.node}
          position={{ left: popoverNode.screenX, top: popoverNode.screenY }}
          onClose={() => setPopoverNode(null)}
        />
      )}

      {/* Map Legend */}
      <div className="s11-map-legend">
        <div className="s11-legend-item">
          <span className="s11-legend-dot oil" /> {t("nmap.legend.oil_zone")}
        </div>
        <div className="s11-legend-item">
          <span className="s11-legend-dot gas" /> {t("nmap.legend.gas_node")}
        </div>
        <div className="s11-legend-item">
          <span className="s11-legend-line oil-line" /> {t("nmap.legend.crude")}
        </div>
        <div className="s11-legend-item">
          <span className="s11-legend-line data-line" /> {t("nmap.legend.data")}
        </div>
        <div className="s11-legend-item">
          <span className="s11-legend-region important" /> {t("nmap.legend.anomaly")}
        </div>
        <div className="s11-legend-item">
          <span className="s11-legend-region watch" /> {t("nmap.legend.watch")}
        </div>
      </div>
    </div>
  );
}
