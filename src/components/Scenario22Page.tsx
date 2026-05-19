import { useState, useMemo } from "react";
import {
  Search,
  Building2,
  ArrowRight,
  ShieldCheck,
  Bot,
  Sparkles,
  FileWarning,
  AlertTriangle,
  Database,
  ReceiptText,
  Ship,
  BarChart3,
  Leaf,
  Gauge,
  CheckCircle2,
  Circle,
  ChevronRight,
  Scale,
  Clock,
} from "lucide-react";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import type { NodeStatus } from "../data/demoData";
import {
  scenario22Enterprises,
  scenario22SourceEdges,
  scenario22ContradictionEvents,
  scenario22SourceMeta,
  type EnterpriseData,
  type ContradictionEvent,
} from "../data/scenario22Data";
import "../styles-scenario-2-2.css";

const sourceIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  self_report: FileWarning, meter: Gauge, tax: ReceiptText,
  customs: Ship, stats: BarChart3, env: Leaf,
};

/* ── Regulatory loop steps ── */
const loopSteps = [
  "异常发现", "风险定级", "核查指令", "企业反馈", "人工复核", "处置归档",
];

/* ── Helper: risk level label ── */
function riskLabel(score: number) {
  if (score >= 80) return "高风险";
  if (score >= 60) return "中风险";
  if (score >= 35) return "关注";
  return "正常";
}
function riskColor(score: number) {
  if (score >= 80) return "#dc2626";
  if (score >= 60) return "#f59e0b";
  if (score >= 35) return "#3b82f6";
  return "#059669";
}

/* ── Data Comparison Table ── */
function DataComparisonTable({ enterprise }: { enterprise: EnterpriseData }) {
  const sorted = useMemo(
    () => [...enterprise.dataSources].sort((a, b) => b.value - a.value),
    [enterprise],
  );
  const maxVal = sorted[0]?.value ?? 1;
  const minVal = sorted[sorted.length - 1]?.value ?? 0;
  const baselineVal = maxVal; // Use max as reference baseline
  const edges = scenario22SourceEdges.filter((e) => e.enterpriseId === enterprise.id);

  // Build deviation map: source key → max deviation from any edge
  const deviationMap = new Map<string, { rate: number; status: NodeStatus }>();
  for (const edge of edges) {
    const update = (key: string) => {
      const existing = deviationMap.get(key);
      if (!existing || edge.deviationRate > existing.rate) {
        deviationMap.set(key, { rate: edge.deviationRate, status: edge.status });
      }
    };
    update(edge.from);
    update(edge.to);
  }

  function trustLevel(dev: number): { label: string; cls: string } {
    if (dev < 3) return { label: "可信", cls: "high" };
    if (dev < 7) return { label: "待验", cls: "medium" };
    return { label: "异常", cls: "low" };
  }

  return (
    <div className="s22-data-panel">
      <div className="s22-panel-hdr">
        <div>
          <h3>多源数据一致性对比</h3>
          <span className="s22-panel-sub">
            同一企业、同一周期、同一产品出口量在 {sorted.length} 个独立数据系统中的申报值
          </span>
        </div>
      </div>
        <div className="s22-data-panel-content">
          <table className="s22-data-table">
            <thead>
              <tr>
                <th>数据源系统</th>
                <th>标准化申报值</th>
                <th>单位</th>
                <th>与最高值偏差</th>
                <th>数据可信度</th>
                <th>异常标记</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((src) => {
                const meta = scenario22SourceMeta[src.source];
                const dev = deviationMap.get(src.source);
                const devRate = ((baselineVal - src.value) / baselineVal) * 100;
                const trust = trustLevel(devRate);
                const isAnomaly = devRate >= 7;
                return (
                  <tr key={src.source} className={isAnomaly ? "anomaly-row" : ""}>
                    <td>
                      <div className="s22-src-name">
                        <span className="s22-src-dot" style={{ background: meta?.color ?? "#94a3b8" }} />
                        {src.sourceLabel}
                      </div>
                    </td>
                    <td style={{ fontFamily: "var(--font-number)", fontWeight: 800, fontSize: 14 }}>
                      {src.value.toLocaleString()}
                    </td>
                    <td style={{ color: "#94a3b8" }}>{src.unit}</td>
                    <td>
                      <div className="s22-deviation-bar-wrap">
                        <div className="s22-deviation-bar-bg">
                          <div
                            className="s22-deviation-bar-fill"
                            style={{
                              width: `${Math.min(devRate / 12 * 100, 100)}%`,
                              background: devRate >= 7 ? "#dc2626" : devRate >= 3 ? "#f59e0b" : "#059669",
                            }}
                          />
                        </div>
                        <span style={{
                          fontFamily: "var(--font-number)", fontWeight: 800, fontSize: 12,
                          color: devRate >= 7 ? "#dc2626" : devRate >= 3 ? "#f59e0b" : "#059669",
                        }}>
                          {devRate > 0 ? `-${devRate.toFixed(1)}%` : "基准"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`s22-trust-badge ${trust.cls}`}>{trust.label}</span>
                    </td>
                    <td>
                      {isAnomaly ? (
                        <span className="s22-anomaly-flag">
                          <AlertTriangle size={10} />
                          重大异常
                        </span>
                      ) : (
                        <span className="s22-normal-flag">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      <div className="s22-data-note">
        <ShieldCheck size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
        业务说明：各系统原始数据已按统一口径折算为标准化单位。本例中自报送出口量最高，海关报关量等出现显著偏差，最大偏差 {((maxVal - minVal) / maxVal * 100).toFixed(1)}%（以最高值为基准），差额 {(maxVal - minVal).toLocaleString()} {sorted[0]?.unit}。
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function Scenario22Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnterprise, setSelectedEnterprise] = useState<EnterpriseData>(scenario22Enterprises[0]);

  const filteredEnterprises = scenario22Enterprises.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const clues = scenario22ContradictionEvents.filter(
    (ce) => ce.enterpriseId === selectedEnterprise.id,
  );

  const topClue = useMemo(() => {
    if (clues.length === 0) return null;
    return clues.reduce((a, b) => (a.aiSuspicionScore > b.aiSuspicionScore ? a : b));
  }, [clues]);

  const maxScore = topClue?.aiSuspicionScore ?? 0;
  const totalAmount = clues.reduce((s, e) => s + e.involvedAmount, 0);

  const sortedSources = useMemo(
    () => [...selectedEnterprise.dataSources].sort((a, b) => b.value - a.value),
    [selectedEnterprise],
  );
  const maxVal = sortedSources[0]?.value ?? 1;
  const minVal = sortedSources[sortedSources.length - 1]?.value ?? 0;

  // Current loop step (demo: step 2 = "核查指令" is active)
  const currentLoopStep = 2;

  return (
    <div className="app-shell s22-shell">
      {/* ── Header ── */}
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">哈萨克斯坦共和国能源部</div>
            <div className="brand-subtitle">Ministry of Energy of the Republic of Kazakhstan</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">跨系统交叉验证</span>
          <strong>能源监管数据可信度核验系统 (Demo)</strong>
        </div>
        <div className="header-actions">
          <a href="#/scenario-3-1" className="primary-button">
            <FileWarning size={17} />
            生成核验报告
          </a>
        </div>
      </header>

      {/* ── Context Bar ── */}
      <div className="s22-context-bar">
        <div className="s22-ctx-enterprise">
          <Building2 size={14} />
          {selectedEnterprise.name}
        </div>
        <div className="s22-ctx-divider" />
        <div className="s22-ctx-stats">
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">核验周期</span>
            <span className="s22-ctx-stat-value">2026 年 5 月</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">接入数据源</span>
            <span className="s22-ctx-stat-value">{selectedEnterprise.dataSources.length} 个系统</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">监管线索发现</span>
            <span className="s22-ctx-stat-value risk-high">共 {clues.length} 项（重大异常 {clues.filter(c => c.aiSuspicionScore >= 80).length} 项）</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">最高风险评分</span>
            <span className="s22-ctx-stat-value risk-high">{maxScore}</span>
          </div>
          <div className="s22-ctx-stat">
            <span className="s22-ctx-stat-label">涉及金额</span>
            <span className="s22-ctx-stat-value">{(totalAmount / 1000000).toFixed(1)}M KZT</span>
          </div>
        </div>
        <div className="s22-ctx-divider" />
        <div className="s22-enterprise-tabs">
          {filteredEnterprises.slice(0, 4).map((ent) => (
            <button
              key={ent.id}
              className={`s22-ent-tab ${selectedEnterprise.id === ent.id ? "active" : ""} ${ent.status === "critical" || ent.status === "important" ? "has-risk" : ""}`}
              onClick={() => setSelectedEnterprise(ent)}
            >
              {ent.name.length > 8 ? ent.name.slice(0, 8) + "…" : ent.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="s22-summary-row">
        {/* Card 1: Major Finding */}
        <div className="s22-summary-card risk-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">MAJOR ANOMALY DETECTED · 重大异常结论</div>
          <div className="s22-card-title" style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "14px", fontWeight: "700" }}>
            同一企业、同一周期、同一产品口径下，最高申报量与最低核验量相差 {(maxVal - minVal).toLocaleString()}，偏差已超过监管阈值，建议进入核查程序。
          </div>
          <div className="s22-card-metrics">
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">最大偏差率 (以最高值计)</span>
              <span className="s22-card-metric-value risk">{((maxVal - minVal) / maxVal * 100).toFixed(1)}%</span>
            </div>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">风险评分</span>
              <span className="s22-card-metric-value risk">{maxScore} / 100</span>
            </div>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">风险等级</span>
              <span className="s22-risk-badge">
                <AlertTriangle size={10} />
                {riskLabel(maxScore)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Financial Impact */}
        <div className="s22-summary-card finance-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">FINANCIAL IMPACT · 涉资影响评估</div>
          <div className="s22-card-title" style={{ fontSize: "14px" }}>预计涉资规模预警</div>
          <div className="s22-card-metrics" style={{ marginBottom: "8px" }}>
            <div className="s22-card-metric">
              <span className="s22-card-metric-label">预估涉及总金额</span>
              <span className="s22-card-metric-value amber">{(totalAmount / 1000000).toFixed(1)}M KZT</span>
            </div>
          </div>
          <div className="s22-card-desc" style={{ marginTop: "4px", fontSize: "11px" }}>
            涉资金额按“偏差量 × 核验周期 × 当期参考价格”测算，仅供监管参考。可能影响：税收核验、出口合规。
          </div>
        </div>

        {/* Card 3: Recommended Actions */}
        <div className="s22-summary-card action-card" style={{ padding: "14px 18px" }}>
          <div className="s22-card-eyebrow">RECOMMENDED ACTION · AI 建议处置</div>
          <div className="s22-action-steps" style={{ gap: "4px" }}>
            {["生成核查任务并提交人工审批", "要求企业限期提交说明材料", "监管人员复核确认凭证", "形成处置留痕归档"].map((step, i) => (
              <div className="s22-action-step" style={{ fontSize: "11px" }} key={i}>
                <span className="s22-step-num" style={{ width: "16px", height: "16px", fontSize: "9px" }}>{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="s22-main-row">
        {/* Left: Data Comparison & Regulatory Loop */}
        <div className="s22-main-left-col">
          <DataComparisonTable enterprise={selectedEnterprise} />

          {/* ── Regulatory Loop ── */}
          <div className="s22-loop-bar">
            <div className="s22-loop-title">REGULATORY LOOP · 监管闭环流程</div>
            <div className="s22-loop-steps">
              {loopSteps.map((step, i) => {
                const status = i < currentLoopStep ? "completed" : i === currentLoopStep ? "active" : "";
                return (
                  <div key={i} className={`s22-loop-step ${status}`}>
                    <div className="s22-loop-dot">
                      {i < currentLoopStep ? <CheckCircle2 size={14} /> : i === currentLoopStep ? <Clock size={12} /> : <Circle size={8} />}
                    </div>
                    <span className="s22-loop-label">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: AI Agent Panel */}
        <div className="s22-ai-panel">
          <div className="s22-ai-hdr">
            <h3>AI Agent 研判结果</h3>
          </div>
          <div className="s22-ai-body">
            {/* Score Ring */}
            <div className="s22-ai-score-row">
              <div className="s22-ai-score-ring">
                <svg viewBox="0 0 100 100" width="90" height="90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={riskColor(maxScore)} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(maxScore / 100) * 251} 251`}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dasharray 600ms" }}
                  />
                </svg>
                <div className="s22-ai-score-inner">
                  <span className="s22-ai-score-num" style={{ color: riskColor(maxScore) }}>{maxScore}</span>
                  <span className="s22-ai-score-label">风险评分</span>
                </div>
              </div>
              <div className="s22-ai-meta">
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">风险等级</span>
                  <span className="s22-ai-meta-value" style={{ color: riskColor(maxScore) }}>{riskLabel(maxScore)}</span>
                </div>
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">异常类型</span>
                  <span className="s22-ai-meta-value">跨系统数据冲突</span>
                </div>
                <div className="s22-ai-meta-item">
                  <span className="s22-ai-meta-label">主要冲突</span>
                  <span className="s22-ai-meta-value">{topClue?.sourceA} vs {topClue?.sourceB}</span>
                </div>
              </div>
            </div>

            {/* Judgment Basis */}
            <div className="s22-ai-section-title">判断依据</div>
            <div className="s22-ai-basis-list">
              {[
                "同企业、同周期、同产品类型出口量口径不一致",
                "差异超过监管预设阈值（>5%）",
                "交叉比对 6 个独立数据源识别逻辑矛盾",
                "历史报送模式 + 同行业基准偏差检测",
                "贝叶斯网络推断多源矛盾交叉验证评分",
              ].map((item, i) => (
                <div className="s22-ai-basis-item" key={i}>
                  <ChevronRight size={10} />
                  {item}
                </div>
              ))}
            </div>

            {/* Suggested Actions */}
            <div className="s22-ai-section-title">建议监管动作</div>
            <div className="s22-ai-actions">
              {["自动生成核查任务", "调取原始凭证数据", "企业限期报送说明", "监管人员复核审批", "监管系统留痕归档"].map((a, i) => (
                <div className="s22-ai-action-item" key={i}>
                  <span className="s22-ai-action-num">{i + 1}</span>
                  {a}
                </div>
              ))}
            </div>

            <a href="#/scenario-3-1" className="s22-ai-cta">
              <Sparkles size={14} />
              生成核查任务并提交人工审批
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Clues Table ── */}
      <div className="s22-clues-panel">
        <div className="s22-panel-hdr">
          <div>
            <h3>监管线索列表</h3>
            <span className="s22-panel-sub">REGULATORY CLUES · 共 {clues.length} 条线索</span>
          </div>
        </div>
        <table className="s22-clues-table">
          <thead>
            <tr>
              <th>线索编号</th>
              <th>冲突描述</th>
              <th>数据源 A</th>
              <th>数据源 B</th>
              <th>偏差率</th>
              <th>涉及金额</th>
              <th>风险评分</th>
              <th>建议动作</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {clues.map((clue, idx) => {
              const rc = riskColor(clue.aiSuspicionScore);
              return (
                <tr key={clue.id} className={clue.aiSuspicionScore >= 80 ? "row-critical" : clue.aiSuspicionScore >= 60 ? "row-important" : ""}>
                  <td><span className="s22-clue-id">CLU-{String(idx + 1).padStart(3, "0")}</span></td>
                  <td style={{ maxWidth: 220 }}>{clue.formula.slice(0, 35)}…</td>
                  <td>{clue.sourceA}</td>
                  <td>{clue.sourceB}</td>
                  <td>
                    <span className="s22-clue-deviation" style={{ color: rc }}>
                      {clue.deviationRate.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <span className="s22-clue-amount">
                      {(clue.involvedAmount / 1000000).toFixed(1)}M KZT
                    </span>
                  </td>
                  <td>
                    <div className="s22-clue-score-bar">
                      <div style={{ width: 50, height: 5, background: "#1e293b", borderRadius: 999, overflow: "hidden" }}>
                        <div className="s22-clue-score-fill" style={{ width: `${clue.aiSuspicionScore}%`, background: rc }} />
                      </div>
                      <span className="s22-clue-score-num" style={{ color: rc }}>{clue.aiSuspicionScore}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="s22-clue-action-badge"
                      style={{
                        background: clue.suggestedAction === "转人工研判" ? "#fef2f2" : clue.suggestedAction === "约谈" ? "#fffbeb" : "#f0f9ff",
                        color: clue.suggestedAction === "转人工研判" ? "#dc2626" : clue.suggestedAction === "约谈" ? "#d97706" : "#3b82f6",
                      }}
                    >
                      {clue.suggestedAction}
                    </span>
                  </td>
                  <td>
                    <span
                      className="s22-clue-status-badge"
                      style={{
                        background: clue.status === "new" ? "#fef2f2" : clue.status === "investigating" ? "#fffbeb" : "#ecfdf5",
                        color: clue.status === "new" ? "#dc2626" : clue.status === "investigating" ? "#d97706" : "#059669",
                      }}
                    >
                      <Circle size={6} style={{ fill: "currentColor" }} />
                      {clue.status === "new" ? "待核查" : clue.status === "investigating" ? "核查中" : "已结案"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Disclaimer ── */}
      <div className="s22-disclaimer">
        <ShieldCheck size={14} />
        <span>演示口径：模拟数据；AI 风险评分仅供参考，最终处置需人工复核确认；跨系统数据源均为模拟生成，不连接真实政务系统。</span>
      </div>
    </div>
  );
}
