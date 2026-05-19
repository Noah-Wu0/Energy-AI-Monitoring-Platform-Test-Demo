import { useState } from "react";
import {
  Search,
  Bot,
  Brain,
  Workflow,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Database,
  FileText,
  Siren,
  Sparkles,
  UserCheck,
  AlertTriangle,
  Activity,
  Eye,
  CheckCircle2,
  Clock,
  Target,
  Layers,
  FileClock,
  ChevronRight,
  ClipboardCheck,
} from "lucide-react";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import type { NodeStatus } from "../data/demoData";
import {
  scenario31LockedAnomaly,
  scenario31Agents,
  scenario31CandidateCauses,
  scenario31EvidenceItems,
  type AttributionAgent,
  type CandidateCause,
  type EvidenceItem,
} from "../data/scenario31Data";
import "../styles-scenario-3-1.css";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileSearch,
  Database,
  Activity,
  Siren,
  GitBranch,
  Bot,
  Brain,
  Workflow,
  ShieldCheck,
};

const agentStatusLabel: Record<AttributionAgent["status"], string> = {
  done: "已完成",
  running: "运行中",
  pending: "待启动",
};

const agentStatusColor: Record<AttributionAgent["status"], string> = {
  done: "var(--status-normal)",
  running: "var(--status-watch)",
  pending: "var(--color-text-muted)",
};

const evidenceTypeIcon: Record<EvidenceItem["type"], React.ComponentType<{ size?: number; className?: string }>> = {
  data: Database,
  document: FileText,
  system: Layers,
  audit: ShieldCheck,
};

const evidenceTypeLabel: Record<EvidenceItem["type"], string> = {
  data: "数据证据",
  document: "文档证据",
  system: "系统记录",
  audit: "审计留痕",
};

const severityColorVar: Record<NodeStatus, string> = {
  normal: "var(--status-normal)",
  watch: "var(--status-watch)",
  important: "var(--status-important)",
  critical: "var(--status-critical)",
};

const regulatoryDimensions: Record<string, { label: string; summary: string }> = {
  "agent-approval": {
    label: "审批许可核验",
    summary: "核验产量变更、检维修计划与许可证状态，确认是否存在审批口径异常。",
  },
  "agent-submit": {
    label: "企业报送核验",
    summary: "比对企业报送、计量站记录与接收网关时效，识别低报或延迟报送线索。",
  },
  "agent-inspect": {
    label: "运行数据核验",
    summary: "核查压力、流量、泵站与阀门运行状态，判断异常是否具备物理支撑。",
  },
  "agent-penalty": {
    label: "历史案例比对",
    summary: "调阅历史约谈、整改与设备校准记录，判断是否存在重复风险模式。",
  },
  "agent-relation": {
    label: "上下游关联核验",
    summary: "核验港口、贸易、船运和上下游交接数据，识别关联风险是否同窗出现。",
  },
  "agent-master": {
    label: "综合研判与归因排序",
    summary: "汇总多源证据，形成候选原因排序，并明确人工复核和处置边界。",
  },
};

const causeDetails: Record<string, { judgment: string; basis: string }> = {
  "cause-001": {
    judgment: "疑似管线 / 泵站运行异常导致运输能力下降",
    basis: "CPC 方向流量连续偏离预测带，压力-流量曲线异常，与历史相似案例匹配。",
  },
  "cause-002": {
    judgment: "企业报送延迟与低报加重监管盲区",
    basis: "企业报送滞后于实测数据，3 号计量站记录与报送窗口存在交叉偏差。",
  },
  "cause-003": {
    judgment: "计量设备校准漂移可能放大流量偏差",
    basis: "3 号流量计曾出现跳变记录，且处于校准周期末期，需排除设备侧误差。",
  },
  "cause-004": {
    judgment: "上游产区变动与报送口径存在不一致风险",
    basis: "产区与港储运数据未完全匹配，需核查企业是否及时申报产量变化。",
  },
};

const evidenceMeta: Record<string, { support: string; strength: "强" | "中" | "弱"; displayType?: string }> = {
  "evi-001": { support: "强支持原因 #1", strength: "强" },
  "evi-002": { support: "强支持原因 #1", strength: "强" },
  "evi-003": { support: "支持原因 #1", strength: "中" },
  "evi-004": { support: "支持原因 #2", strength: "中" },
  "evi-005": { support: "支持原因 #2", strength: "中" },
  "evi-006": { support: "支持关联风险", strength: "弱" },
  "evi-007": { support: "支持原因 #3", strength: "中", displayType: "历史案例" },
  "evi-008": { support: "支持关联风险", strength: "弱" },
};

const closedLoopSteps = [
  "异常锁定",
  "多 Agent 归因",
  "证据链汇总",
  "人工复核",
  "生成核查任务",
  "企业反馈",
  "处置归档",
];

const initialConclusion = [
  { label: "最可能原因", value: "CPC 方向管线 / 泵站运行异常，导致实际流量连续偏离预测区间。" },
  { label: "首要归因置信度", value: "87%" },
  { label: "当前状态", value: "待人工复核" },
];

const judgmentBasis = [
  "实际流量连续偏离预测区间 11.4%",
  "CPC 方向压力-流量曲线出现异常拐点",
  "企业报送延迟与低报现象形成交叉印证",
  "历史相似案例中存在管线 / 泵站异常模式",
  "关联上下游数据与本次异常时间窗口重合",
];

const regulatoryActions = [
  "调取 SCADA / 流量计原始数据",
  "核查泵站、阀门、管线运行状态",
  "要求企业提交异常时段运行日志",
  "生成人工复核任务",
  "形成处置留痕并归档",
];

function AgentCard({
  agent,
  isMaster,
}: {
  agent: AttributionAgent;
  isMaster?: boolean;
}) {
  const Icon = iconMap[agent.icon] ?? Bot;
  const colors = agentStatusColor[agent.status];
  const dimension = regulatoryDimensions[agent.id];

  return (
    <div className={`s31-agent-card ${agent.status} ${isMaster ? "master" : ""}`}>
      <div className="s31-agent-card-header">
        <div className="s31-agent-icon-wrap" style={{ background: isMaster ? "var(--color-primary-soft)" : "#f8fafc" }}>
          <span style={{ color: isMaster ? "var(--color-primary)" : "var(--color-text-secondary)", display: 'flex' }}><Icon size={isMaster ? 22 : 18} /></span>
        </div>
        <div className="s31-agent-info">
          <strong>{dimension?.label ?? agent.name}</strong>
          <span>{agent.name} · {dimension?.summary ?? agent.role}</span>
        </div>
        <span className="s31-agent-status" style={{ color: colors, borderColor: colors }}>
          {agent.status === "running" && <Activity size={12} className="s31-pulse-icon" />}
          {agentStatusLabel[agent.status]}
        </span>
      </div>
      <div className="s31-agent-card-body">
        <div className="s31-agent-section">
          <span className="s31-agent-label">证据来源</span>
          <div className="s31-data-source-tags">
            {agent.dataSources.map((ds, i) => (
              <span className="s31-ds-tag" key={i}>
                <Database size={10} />
                {ds}
              </span>
            ))}
          </div>
        </div>
        <div className="s31-agent-section">
          <span className="s31-agent-label">核验要点</span>
          <p className="s31-agent-reasoning">{dimension?.summary ?? agent.reasoning}</p>
        </div>
        <div className="s31-agent-section">
          <span className="s31-agent-label">监管提示</span>
          <p className="s31-agent-output">{agent.output}</p>
        </div>
      </div>
    </div>
  );
}

function EvidenceItemCard({ item, index }: { item: EvidenceItem; index: number }) {
  const Icon = evidenceTypeIcon[item.type] ?? FileText;
  const meta = evidenceMeta[item.id];
  const typeLabel = meta?.displayType ?? evidenceTypeLabel[item.type];

  return (
    <div className="s31-evidence-item">
      <div className="s31-evidence-num">{index + 1}</div>
      <div className="s31-evidence-content">
        <div className="s31-evidence-header">
          <div className="s31-evidence-type" style={{ background: item.type === "data" ? "#ecfdf5" : item.type === "document" ? "#eff6ff" : item.type === "system" ? "#fefce8" : "#fff7ed" }}>
            <span style={{ color: item.type === "data" ? "var(--status-normal)" : item.type === "document" ? "var(--color-primary)" : item.type === "system" ? "var(--status-watch)" : "var(--status-important)", display: 'flex' }}><Icon size={12} /></span>
            {typeLabel}
          </div>
          <span className="s31-evidence-time" style={{ fontFamily: "var(--font-number)" }}>{item.timestamp}</span>
        </div>
        <strong>{item.title}</strong>
        <div className="s31-evidence-fields">
          <span>证据类型：{typeLabel}</span>
          <span>支撑方向：{meta?.support ?? "支持人工复核"}</span>
          <span>证据强度：{meta?.strength ?? "中"}</span>
        </div>
        <p>{item.summary}</p>
      </div>
      <div className="s31-evidence-arrow">
        {index < scenario31EvidenceItems.length - 1 && <ChevronRight size={16} />}
      </div>
    </div>
  );
}

export function Scenario31Page() {
  const [selectedCause, setSelectedCause] = useState<CandidateCause>(scenario31CandidateCauses[0]);
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(
    new Set(["agent-relation", "agent-master"]),
  );

  const toggleAgent = (id: string) => {
    setExpandedAgents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const masterAgent = scenario31Agents.find((a) => a.id === "agent-master");
  const workerAgents = scenario31Agents.filter((a) => a.id !== "agent-master");

  const selectedCauseAgents = scenario31Agents.filter((a) =>
    selectedCause.supportingAgents.includes(a.id),
  );

  const selectedCauseEvidence = scenario31EvidenceItems.filter((e) =>
    selectedCause.evidenceIds.includes(e.id),
  );

  const doneCount = scenario31Agents.filter((a) => a.status === "done").length;
  const totalAgents = scenario31Agents.length;

  return (
    <div className="app-shell s31-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">哈萨克斯坦共和国能源部</div>
            <div className="brand-subtitle">Ministry of Energy of the Republic of Kazakhstan</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">多 Agent 协同归因</span>
          <strong>AI 监管闭环系统 (Demo)</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button">
            <Search size={16} />
            检索
          </button>
          <a href="#/scenario-4-1" className="primary-button">
            <FileClock size={17} />
            生成归因核验报告
          </a>
        </div>
      </header>

      <div className="s31-anomaly-banner floating-panel">
        <div className="s31-banner-left">
          <div className="s31-banner-icon" style={{ background: "var(--status-important)", color: "#fff" }}>
            <AlertTriangle size={20} />
          </div>
          <div className="s31-banner-info">
            <span className="s31-banner-eyebrow">重点异常事件</span>
            <h2>发现油品储运链路异常：实际流量连续偏离预测区间 11.4%，可能影响港口调度、库存核验与企业报送真实性。</h2>
            <div className="s31-banner-meta">
              <span>节点：{scenario31LockedAnomaly.nodeName}</span>
              <span>检测时间：{scenario31LockedAnomaly.detectedAt}</span>
              <span>事件异常置信度：{Math.round(scenario31LockedAnomaly.confidence * 100)}%</span>
              <span>首要归因置信度：87%</span>
              <span className="s31-banner-status" style={{ color: severityColorVar[scenario31LockedAnomaly.severity] }}>
                <ClipboardCheck size={12} />
                AI 初步归因完成，待监管人员复核
              </span>
            </div>
          </div>
        </div>
        <div className="s31-banner-right">
          <div className="s31-agent-progress">
            <span className="s31-progress-label">监管闭环进度</span>
            <div className="s31-progress-bar-wrap">
              <div
                className="s31-progress-bar-fill"
                style={{ width: `${(4 / closedLoopSteps.length) * 100}%` }}
              />
            </div>
            <span className="s31-progress-text" style={{ fontFamily: "var(--font-number)" }}>
              当前节点：人工复核
            </span>
          </div>
        </div>
      </div>

      <div className="s31-left-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">EVIDENCE DIMENSIONS</span>
            <h2>证据来源与分析维度</h2>
          </div>
          <div className="s31-workflow-legend">
            <span><span className="s31-legend-dot done" />已核验</span>
            <span><span className="s31-legend-dot running" />需补充</span>
          </div>
        </div>
        <div className="s31-workflow-scroll">
          <div className="s31-workflow-layout">
            <div className="s31-worker-agents">
              {workerAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`s31-agent-wrapper ${expandedAgents.has(agent.id) ? "expanded" : ""}`}
                  onClick={() => toggleAgent(agent.id)}
                >
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>

            <div className="s31-workflow-connector">
              <svg viewBox="0 0 60 400" width="60" height="400" className="s31-connector-svg">
                {workerAgents.map((_, idx) => {
                  const y = 45 + idx * 80;
                  return (
                    <g key={idx}>
                      <line
                        x1="0"
                        y1={y}
                        x2="30"
                        y2={y}
                        stroke="var(--color-border-subtle)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <polygon points={`30,${y - 5} 40,${y} 30,${y + 5}`} fill="var(--color-border-strong)" />
                    </g>
                  );
                })}
              </svg>
            </div>

            {masterAgent && (
              <div className="s31-master-agent-area">
                <div className="s31-master-review-card">
                  <div className="s31-master-review-header">
                    <div>
                      <span className="eyebrow">综合研判与归因排序</span>
                      <h2>AI 辅助研判结果</h2>
                    </div>
                    <span className="s31-review-status">待人工复核</span>
                  </div>

                  <section className="s31-review-section primary">
                    <div className="s31-review-section-title">
                      <Brain size={15} />
                      <strong>A. AI 初步结论</strong>
                    </div>
                    <div className="s31-conclusion-grid">
                      {initialConclusion.map((item) => (
                        <div key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="s31-review-section">
                    <div className="s31-review-section-title">
                      <ShieldCheck size={15} />
                      <strong>B. 关键判断依据</strong>
                    </div>
                    <ul className="s31-review-list">
                      {judgmentBasis.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="s31-review-section">
                    <div className="s31-review-section-title">
                      <ClipboardCheck size={15} />
                      <strong>C. 建议监管动作</strong>
                    </div>
                    <ul className="s31-action-list">
                      {regulatoryActions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>
                <div className="s31-master-output-banner">
                  <Sparkles size={14} />
                  <span>AI 已完成初步归因，下一步进入监管人员复核与核查任务生成。</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="s31-right-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">ATTRIBUTION RESULTS</span>
            <h2>候选原因归因排序</h2>
            <p className="s31-panel-subtitle">AI 初步排序，需人工复核确认</p>
          </div>
          <Brain size={18} className="s31-section-icon" />
        </div>
        <div className="s31-causes-list">
          {scenario31CandidateCauses.slice(0, 4).map((cause, idx) => {
            const isSelected = selectedCause.id === cause.id;
            const detail = causeDetails[cause.id];
            const probColor =
              cause.probability >= 0.7
                ? "var(--status-critical)"
                : cause.probability >= 0.4
                  ? "var(--status-important)"
                  : cause.probability >= 0.25
                    ? "var(--status-watch)"
                    : "var(--status-normal)";
            return (
              <button
                key={cause.id}
                className={`s31-cause-card ${isSelected ? "selected" : ""}`}
                type="button"
                onClick={() => setSelectedCause(cause)}
              >
                <div className="s31-cause-rank">#{idx + 1}</div>
                <div className="s31-cause-body">
                  <div className="s31-cause-desc">
                    <span>监管判断：</span>
                    <strong>{detail?.judgment ?? cause.description}</strong>
                  </div>
                  <p className="s31-cause-basis">
                    <span>技术依据：</span>{detail?.basis ?? cause.description}
                  </p>
                  <div className="s31-cause-meta">
                    <div className="s31-cause-probability">
                      <div className="s31-prob-bar-bg">
                        <div
                          className="s31-prob-bar-fill"
                          style={{
                            width: `${cause.probability * 100}%`,
                            background: probColor,
                          }}
                        />
                      </div>
                      <span style={{ color: probColor, fontFamily: "var(--font-number)" }}>
                        {Math.round(cause.probability * 100)}%
                      </span>
                    </div>
                    <div className="s31-cause-agents">
                      <Workflow size={11} />
                      <span>{cause.supportingAgents.length} 个维度支持</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="s31-ai-synthesis">
          <div className="s31-synthesis-header">
            <Bot size={16} />
            <strong>监管闭环流程</strong>
          </div>
          <div className="s31-loop-strip">
            {closedLoopSteps.map((step) => (
              <div key={step} className={`s31-loop-step ${step === "人工复核" ? "active" : ""}`}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="s31-bottom-panel floating-panel">
        <div className="s31-panel-header">
          <div>
            <span className="eyebrow">EVIDENCE CHAIN</span>
            <h2>证据链汇总</h2>
          </div>
          <span className="s31-evidence-count">展示 5 / {scenario31EvidenceItems.length} 项证据</span>
        </div>
        <div className="s31-evidence-chain-scroll">
          <div className="s31-evidence-chain">
            {scenario31EvidenceItems.slice(0, 5).map((item, idx) => (
              <EvidenceItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>

      <div className="s31-disclaimer">
        <ShieldCheck size={14} />
        <span>演示口径：模拟数据；AI 初判需人工复核；多 Agent 工作流为模拟演示，不接入真实政务系统。</span>
      </div>
    </div>
  );
}
