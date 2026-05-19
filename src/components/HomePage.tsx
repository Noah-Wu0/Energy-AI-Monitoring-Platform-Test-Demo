import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileClock,
  GitBranch,
  Map,
  ShieldCheck,
} from "lucide-react";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";

const storySteps = [
  {
    id: "01",
    label: "全国态势发现",
    title: "从全国能源运行大屏发现曼吉斯套州异常红点",
    route: "#/scenario-1-1",
    icon: Map,
  },
  {
    id: "02",
    label: "区域下钻定位",
    title: "进入州域网络，定位阿克套港储运链路与报警企业",
    route: "#/drill-down-region",
    icon: GitBranch,
  },
  {
    id: "03",
    label: "企业与对象核查",
    title: "查看企业档案、计量对象、关联设备与数据源状态",
    route: "#/drill-down-company",
    icon: Database,
  },
  {
    id: "04",
    label: "异常检测与归因",
    title: "通过时序检测、多源交叉校验和 AI 辅助归因形成初步结论",
    route: "#/scenario-2-1",
    icon: Bot,
  },
  {
    id: "05",
    label: "复核与处置闭环",
    title: "监管人员人工复核，生成核查任务、审计链和监管报告",
    route: "#/scenario-3-1",
    icon: ClipboardCheck,
  },
];

const demoCards = [
  {
    title: "一句话开场",
    value: "这不是 AI 替代执法，而是把证据链整理成可复核、可追责的监管闭环。",
    note: "强调系统不是替代执法，而是把多源证据整理成可复核、可追责的监管闭环。",
  },
  {
    title: "本次事件口径",
    value: "阿克套港储运链路实际流量连续偏离预测区间 11.4%",
    note: "可能影响港口调度、库存核验与企业报送真实性。",
  },
  {
    title: "边界声明",
    value: "AI 初判，人工复核确认",
    note: "所有结论均以监管人员复核、核查任务和审计留痕作为最终闭环。",
  },
];

export function HomePage() {
  return (
    <div className="app-shell home-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">哈萨克斯坦共和国能源部</div>
            <div className="brand-subtitle">Ministry of Energy of the Republic of Kazakhstan</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">演示首页</span>
          <strong>能源监管 AI 闭环系统</strong>
        </div>
        <div className="header-actions">
          <a href="#/scenario-1-1" className="primary-button">
            <BarChart3 size={17} />
            开始演示
          </a>
        </div>
      </header>

      <main className="home-main">
        <section className="home-brief floating-panel">
          <div className="home-hero-copy">
            <span className="eyebrow">MINISTERIAL DEMO STORYLINE</span>
            <h1>能源监管 AI 闭环演示：从异常发现到处置归档</h1>
            <p>
              围绕曼吉斯套州阿克套方向油品储运链路异常，演示能源部如何发现异常、汇总证据、形成初步归因，并进入人工复核和监管处置。
            </p>
            <div className="home-hero-actions">
              <a href="#/scenario-1-1" className="primary-button">
                进入全国概览 <ArrowRight size={15} />
              </a>
              <a href="#/scenario-3-1" className="ghost-button">
                查看归因复核页
              </a>
            </div>
          </div>
          <div className="home-brief-metrics">
            <div><span>事件异常置信度</span><strong>78%</strong></div>
            <div><span>首要归因置信度</span><strong>87%</strong></div>
            <div><span>当前节点</span><strong>人工复核</strong></div>
            <div><span>演示主线</span><strong>闭环监管</strong></div>
          </div>
        </section>

        <aside className="home-side-panel floating-panel">
          <div className="home-incident-card">
            <div className="home-incident-header">
              <AlertTriangle size={18} />
              <span>重点异常事件</span>
            </div>
            <strong>发现油品储运链路异常</strong>
            <p>实际流量连续偏离预测区间 11.4%，可能影响港口调度、库存核验与企业报送真实性。</p>
            <div className="home-incident-grid">
              <div><span>事件异常置信度</span><b>78%</b></div>
              <div><span>首要归因置信度</span><b>87%</b></div>
              <div><span>当前环节</span><b>人工复核</b></div>
            </div>
          </div>

          <div className="home-side-notes">
            {demoCards.map((card) => (
              <div className="home-info-card" key={card.title}>
                <span>{card.title}</span>
                <strong>{card.value}</strong>
                <p>{card.note}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="home-story-panel floating-panel">
          <div className="home-section-title">
            <div>
              <span className="eyebrow">DEMO FLOW</span>
              <h2>建议演示路径</h2>
            </div>
            <ShieldCheck size={18} />
          </div>
          <div className="home-story-steps">
            {storySteps.map((step) => {
              const Icon = step.icon;
              return (
                <a href={step.route} className="home-story-step" key={step.id}>
                  <div className="home-step-index">{step.id}</div>
                  <div className="home-step-icon"><Icon size={16} /></div>
                  <span>{step.label}</span>
                  <strong>{step.title}</strong>
                </a>
              );
            })}
          </div>
        </section>

        <div className="home-bottom-row">
          <section className="home-close-loop floating-panel">
            <div className="home-section-title">
              <div>
                <span className="eyebrow">REGULATORY CLOSE LOOP</span>
                <h2>最终要讲清的闭环</h2>
              </div>
              <FileCheck2 size={18} />
            </div>
            <div className="home-loop-line">
              {["发现异常", "多源取证", "AI 初步归因", "人工复核", "生成核查任务", "企业反馈", "处置归档"].map((item, index) => (
                <div className={index === 3 ? "active" : ""} key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="home-footer-note">
              <FileClock size={15} />
              <span>演示口径：模拟数据；AI 只做辅助研判，监管决定、核查任务和处置归档均由人工复核确认。</span>
            </div>
          </section>

          <section className="home-script-panel floating-panel">
            <div className="home-section-title">
              <div>
                <span className="eyebrow">TALK TRACK</span>
                <h2>建议讲法</h2>
              </div>
              <FileClock size={18} />
            </div>
            <div className="home-script-list">
              <p><strong>开场：</strong>先说明这是一个监管闭环，不是单点算法演示。</p>
              <p><strong>中段：</strong>沿着全国态势、州域链路、企业对象、异常曲线、归因复核逐层下钻。</p>
              <p><strong>收口：</strong>强调 AI 只做辅助研判，最终进入人工复核、核查任务和处置归档。</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
