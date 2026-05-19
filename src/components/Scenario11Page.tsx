import { useState } from "react";
import { Search, FileClock, Activity, AlertTriangle, GitBranch } from "lucide-react";
import "../styles-scenario-1-1.css";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import type { EnergyNode, AnomalyEvent } from "../data/demoData";
import type { EnergyType } from "./energy/EnergyTypeTabs";
import {
  scenario11Kpis,
  scenario11Nodes,
  scenario11Edges,
  scenario11Events,
  scenario11Timeline,
  scenario11NodeIcons,
} from "../data/scenario11Data";
import { TopKpiBar } from "./kpi/TopKpiBar";
import { EnergyTypeTabs } from "./energy/EnergyTypeTabs";
import { RegionFilter } from "./energy/RegionFilter";
import { NationalMap } from "./map/NationalMap";
import { EventStream } from "./events/EventStream";
import { BottomTimeline } from "./timeline/BottomTimeline";
import { DemoDisclaimer } from "./disclaimers/DemoDisclaimer";

export function Scenario11Page() {
  const [energyType, setEnergyType] = useState<EnergyType>("oil");
  const [selectedEvent, setSelectedEvent] = useState<AnomalyEvent>(scenario11Events[0]);
  const [selectedNode, setSelectedNode] = useState<EnergyNode>(
    scenario11Nodes.find((n) => n.id === selectedEvent.nodeId) ?? scenario11Nodes[0],
  );

  const handleSelectEvent = (event: AnomalyEvent) => {
    setSelectedEvent(event);
    const node = scenario11Nodes.find((n) => n.id === event.nodeId);
    if (node) setSelectedNode(node);
  };

  const handleSelectNode = (node: EnergyNode) => {
    setSelectedNode(node);
  };

  // Filter nodes by energy type
  const visibleNodes =
    energyType === "oil"
      ? scenario11Nodes.filter(
          (n) => n.type === "oil" || n.type === "gas" || n.type === "port" || n.type === "regulatory",
        )
      : energyType === "gas"
        ? scenario11Nodes.filter((n) => n.type === "gas" || n.type === "port" || n.type === "regulatory")
        : scenario11Nodes;

  // Filter edges: only show edges where both ends are visible
  const visibleEdges = scenario11Edges.filter(
    (e) =>
      visibleNodes.some((n) => n.id === e.from) &&
      visibleNodes.some((n) => n.id === e.to),
  );

  const regionRank = [
    { name: "曼吉斯套", value: 87, meta: "港储运偏离", tone: "important" },
    { name: "西哈州", value: 64, meta: "数据延迟", tone: "watch" },
    { name: "阿特劳", value: 58, meta: "石化观察", tone: "watch" },
    { name: "克孜勒奥尔达", value: 41, meta: "进料波动", tone: "normal" },
  ];

  const corridorLoad = [
    { name: "CPC", value: 76, meta: "稳定" },
    { name: "UAS", value: 69, meta: "正常" },
    { name: "中哈管道", value: 58, meta: "稳定" },
    { name: "阿克套-BTC", value: 91, meta: "待复核" },
  ];

  return (
    <div className="app-shell s11-shell">
      {/* ---- Header ---- */}
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">哈萨克斯坦共和国能源部</div>
            <div className="brand-subtitle">Ministry of Energy of the Republic of Kazakhstan</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">全国态势</span>
          <strong>AI 监管闭环系统 (Demo)</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button">
            <Search size={16} />
            检索
          </button>
          <button className="primary-button" type="button">
            <FileClock size={17} />
            生成监管简报
          </button>
        </div>
      </header>

      {/* ---- Top KPI Bar ---- */}
      <div className="s11-top-kpi floating-panel">
        <TopKpiBar kpis={scenario11Kpis} />
      </div>

      {/* ---- Left Sidebar ---- */}
      <aside className="left-sidebar floating-panel">
        <div className="sidebar-content-scroll">
          {/* Energy Type Switch */}
          <div className="flat-card">
            <EnergyTypeTabs active={energyType} onChange={setEnergyType} />
          </div>

          <div className="s11-command-card">
            <span className="eyebrow">NATIONAL BRIEF</span>
            <h2>全国油气链路正在运行，风险集中在里海港储运与西北气凝析报送链。</h2>
            <p>本层级先看州级工业区和产业通道；进入下一级后再展开油田、泵站、计量点和企业证据包。</p>
          </div>

          {/* Filters */}
          <div className="flat-card">
            <RegionFilter />
          </div>

          <div className="flat-card">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">RISK RANK</span>
                <h2>州级风险排行</h2>
              </div>
            </div>
            <div className="s11-rank-bars">
              {regionRank.map((item) => (
                <div className="s11-rank-row" key={item.name}>
                  <div className="s11-rank-copy">
                    <strong>{item.name}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <div className="s11-rank-track">
                    <i className={`tone-${item.tone}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <em>{item.value}</em>
                </div>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* ---- Central Map ---- */}
      <NationalMap
        nodes={visibleNodes}
        edges={visibleEdges}
        selectedNode={selectedNode}
        nodeIcons={scenario11NodeIcons}
        onSelectNode={handleSelectNode}
      />

      <div className="s11-content-cards">
        <section className="s11-story-card">
          <div className="s11-story-head">
            <Activity size={17} />
            <span>当前判断</span>
          </div>
          <strong>全国油气系统总体可见，风险集中在曼吉斯套港储运链路。</strong>
          <p>优先下钻曼吉斯套州，核对港储运、计量站和企业报送证据包；西哈州保持观察。</p>
        </section>
        <section className="s11-story-card">
          <div className="s11-story-head">
            <GitBranch size={17} />
            <span>主通道状态</span>
          </div>
          <div className="s11-story-metrics">
            <div><strong>4</strong><span>主产业通道</span></div>
            <div><strong>2</strong><span>待复核链路</span></div>
            <div><strong>5</strong><span>炼化/石化节点</span></div>
          </div>
        </section>
        <section className="s11-story-card s11-story-card-alert">
          <div className="s11-story-head">
            <AlertTriangle size={16} />
            <span>下钻处置</span>
          </div>
          <ol className="s11-story-steps">
            <li className="s11-drill-item severity-important">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>曼吉斯套州</b>
                <span>港储运链路流量偏离 −11.4%</span>
              </div>
              <a href="#/drill-down-region" className="s11-drill-link">进入州域网络 →</a>
            </li>
            <li className="s11-drill-item severity-watch">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>西哈州</b>
                <span>凝析气数据心跳延迟</span>
              </div>
              <a href="#/scenario-2-1" className="s11-drill-link">查看异常检测 →</a>
            </li>
            <li className="s11-drill-item severity-normal">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>奇姆肯特炼厂</b>
                <span>进料波动已恢复正常</span>
              </div>
              <a href="#/scenario-1-2" className="s11-drill-link">查看设备档案 →</a>
            </li>
          </ol>
        </section>
      </div>

      {/* ---- Right Sidebar ---- */}
      <aside className="right-sidebar floating-panel">
        <div className="sidebar-content-scroll">
          <div className="flat-card s11-risk-panel">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">FLOW HEALTH</span>
                <h2>通道健康度</h2>
              </div>
            </div>
            <div className="s11-health-list">
              {corridorLoad.map((item) => (
                <div className="s11-health-row" key={item.name}>
                  <span>{item.name}</span>
                  <div><i style={{ width: `${item.value}%` }} /></div>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          <EventStream
            events={scenario11Events}
            selectedId={selectedEvent.id}
            onSelect={handleSelectEvent}
          />
        </div>
      </aside>

      {/* ---- Bottom Timeline ---- */}
      <div className="s11-bottom-bar floating-panel">
        <BottomTimeline data={scenario11Timeline} />
      </div>

      {/* ---- Demo Disclaimer ---- */}
      <DemoDisclaimer />
    </div>
  );
}
