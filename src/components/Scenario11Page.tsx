import { useState } from "react";
import { Search, FileClock, Activity, AlertTriangle, GitBranch, Globe } from "lucide-react";
import "../styles-scenario-1-1.css";
import { useI18n } from "../i18n/I18nContext";
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
import { RegionFilter, type FilterState } from "./energy/RegionFilter";
import { NationalMap } from "./map/NationalMap";
import { EventStream } from "./events/EventStream";
import { BottomTimeline } from "./timeline/BottomTimeline";
import { DemoDisclaimer } from "./disclaimers/DemoDisclaimer";

export function Scenario11Page() {
  const { t, lang, setLang } = useI18n();
  const [energyType, setEnergyType] = useState<EnergyType>("oil");
  const [selectedEvent, setSelectedEvent] = useState<AnomalyEvent>(scenario11Events[0]);
  const [selectedNode, setSelectedNode] = useState<EnergyNode>(
    scenario11Nodes.find((n) => n.id === selectedEvent.nodeId) ?? scenario11Nodes[0],
  );
  const [filterState, setFilterState] = useState<FilterState>({
    region: null,
    enterprise: null,
    severity: null,
  });

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
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s11.workspace")}</span>
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
            <span className="eyebrow">{t("s11.national.brief")}</span>
            <h2>{t("s11.brief.title")}</h2>
            <p>{t("s11.brief.desc")}</p>
          </div>

          {/* Filters */}
          <div className="flat-card">
            <RegionFilter value={filterState} onChange={setFilterState} />
          </div>

          <div className="flat-card">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">{t("s11.risk.eyebrow")}</span>
                <h2>{t("s11.risk.title")}</h2>
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
            <span>{t("s11.judge.title")}</span>
          </div>
          <strong>{t("s11.judge.strong")}</strong>
          <p>{t("s11.judge.desc")}</p>
        </section>
        <section className="s11-story-card">
          <div className="s11-story-head">
            <GitBranch size={17} />
            <span>{t("s11.channel.title")}</span>
          </div>
          <div className="s11-story-metrics">
            <div><strong>4</strong><span>{t("s11.channel.1")}</span></div>
            <div><strong>2</strong><span>{t("s11.channel.2")}</span></div>
            <div><strong>5</strong><span>{t("s11.channel.3")}</span></div>
          </div>
        </section>
        <section className="s11-story-card s11-story-card-alert">
          <div className="s11-story-head">
            <AlertTriangle size={16} />
            <span>{t("s11.drill.title")}</span>
          </div>
          <ol className="s11-story-steps">
            <li className="s11-drill-item severity-important">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>{t("s11.drill.mangystau")}</b>
                <span>{t("s11.drill.mangystau.desc")}</span>
              </div>
              <a href="#/drill-down-region" className="s11-drill-link">{t("s11.drill.mangystau.link")}</a>
            </li>
            <li className="s11-drill-item severity-watch">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>{t("s11.drill.westkz")}</b>
                <span>{t("s11.drill.westkz.desc")}</span>
              </div>
              <a href="#/scenario-2-1" className="s11-drill-link">{t("s11.drill.westkz.link")}</a>
            </li>
            <li className="s11-drill-item severity-normal">
              <span className="s11-drill-severity" />
              <div className="s11-drill-body">
                <b>{t("s11.drill.shymkent")}</b>
                <span>{t("s11.drill.shymkent.desc")}</span>
              </div>
              <a href="#/scenario-1-2" className="s11-drill-link">{t("s11.drill.shymkent.link")}</a>
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
                <span className="eyebrow">{t("s11.health.eyebrow")}</span>
                <h2>{t("s11.health.title")}</h2>
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
