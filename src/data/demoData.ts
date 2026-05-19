import {
  Anchor,
  Bot,
  Factory,
  Flame,
  Gauge,
  Handshake,
  Landmark,
  Network,
  ShieldCheck,
  Siren,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NodeStatus = "normal" | "watch" | "important" | "critical";
export type ReviewStatus = "待复核" | "已确认" | "已驳回" | "升级处理中";

export type EnergyNode = {
  id: string;
  name: string;
  subtitle: string;
  type: "oil" | "gas" | "port" | "metering" | "regulatory" | "power";
  status: NodeStatus;
  coordinates: [number, number];
  complianceScore: number;
  flowRate: number;
  anomalyCount: number;
};

export type FlowEdge = {
  id: string;
  from: string;
  to: string;
  type: "crude" | "gas" | "data" | "power";
  label: string;
  status: NodeStatus;
  flowRate: number;
  pressure: number;
  variance: number;
  reportLag: string;
};

export type AnomalyEvent = {
  id: string;
  title: string;
  nodeId: string;
  severity: NodeStatus;
  detectedAt: string;
  confidence: number;
  reviewStatus: ReviewStatus;
  aiSummary: string;
  suggestedAction: string;
};

export type AuditStep = {
  id: string;
  actor: "AI 初判" | "系统取证" | "人工复核" | "审计留痕";
  time: string;
  content: string;
  state: "done" | "active" | "pending";
};

export type RegionEnterpriseNode = {
  id: string;
  name: string;
  role: "upstream" | "metering" | "transport" | "storage" | "regulatory";
  status: NodeStatus;
  coordinates: [number, number];
  riskScore: number;
  alertId?: string;
  summary: string;
};

export type RegionFlowEdge = {
  id: string;
  from: string;
  to: string;
  relationType: "production" | "metering" | "transport" | "reporting";
  materialFlow: string;
  status: NodeStatus;
  variance: number;
};

export type RegionAlertCard = {
  id: string;
  eventId: string;
  enterpriseId: string;
  alertObjectId: string;
  title: string;
  severity: NodeStatus;
  trigger: string;
  affectedNodeIds: string[];
  aiSummary: string;
  recommendedNextStep: string;
};

export type EnterpriseDetail = {
  id: string;
  eventId: string;
  name: string;
  industryRole: string;
  region: string;
  licenseStatus: string;
  upstreamCount: number;
  downstreamCount: number;
  keyCounterparties: string[];
  relationRisk: NodeStatus;
  aiSummary: string;
  confidence: number;
  requiredHumanReview: boolean;
};

export type EnterpriseAlertObject = {
  id: string;
  enterpriseId: string;
  objectName: string;
  objectType: "metering_device" | "pipeline_node" | "reporting_link";
  deviceId: string;
  metric: string;
  currentValue: string;
  baselineValue: string;
  deviation: string;
  detectedAt: string;
  severity: NodeStatus;
};

export type EnterpriseNextAction = {
  id: string;
  label: string;
  targetRoute: string;
  description: string;
};

export const nodeIcons: Record<EnergyNode["type"], LucideIcon> = {
  oil: Flame,
  gas: Factory,
  port: Anchor,
  metering: Gauge,
  regulatory: Landmark,
  power: Zap,
};

export const overviewStats = [
  { label: "监管企业", value: "7", unit: "家", trend: "+2 本周纳入" },
  { label: "活跃异常", value: "2", unit: "项", trend: "1 项待人工复核" },
  { label: "审计链完整率", value: "98.6", unit: "%", trend: "模拟数据" },
  { label: "AI 初判置信度", value: "0.78", unit: "", trend: "需人工确认" },
];

export const energyNodes: EnergyNode[] = [
  {
    id: "fld-uzen",
    name: "乌津油田示意节点",
    subtitle: "上游开采 / Uzen",
    type: "oil",
    status: "normal",
    coordinates: [52.0, 43.35],
    complianceScore: 94,
    flowRate: 14400,
    anomalyCount: 0,
  },
  {
    id: "fld-kalamkas",
    name: "卡拉姆卡斯油田示意节点",
    subtitle: "上游开采 / Kalamkas",
    type: "oil",
    status: "normal",
    coordinates: [51.5, 44.3],
    complianceScore: 91,
    flowRate: 10000,
    anomalyCount: 0,
  },
  {
    id: "fld-karazhanbas",
    name: "卡拉让巴斯油田示意节点",
    subtitle: "异常源 / Karazhanbas",
    type: "oil",
    status: "important",
    coordinates: [51.3, 44.9],
    complianceScore: 82,
    flowRate: 7400,
    anomalyCount: 1,
  },
  {
    id: "fld-dunga",
    name: "敦加油气田示意节点",
    subtitle: "油气混合 / Dunga",
    type: "gas",
    status: "watch",
    coordinates: [50.8, 44.5],
    complianceScore: 88,
    flowRate: 1860,
    anomalyCount: 1,
  },
  {
    id: "node-aktau-port",
    name: "阿克套港储运节点",
    subtitle: "中游储运 / Aktau Port",
    type: "port",
    status: "normal",
    coordinates: [51.1, 43.65],
    complianceScore: 96,
    flowRate: 23300,
    anomalyCount: 0,
  },
  {
    id: "asset-metering-kbm-03",
    name: "3 号计量站",
    subtitle: "流量与能耗采集",
    type: "metering",
    status: "important",
    coordinates: [51.2, 44.68],
    complianceScore: 79,
    flowRate: 6420,
    anomalyCount: 1,
  },
  {
    id: "node-ministry",
    name: "州能源局监管节点",
    subtitle: "州级报送 / 现场复核",
    type: "regulatory",
    status: "normal",
    coordinates: [51.55, 43.78],
    complianceScore: 99,
    flowRate: 0,
    anomalyCount: 0,
  },
];

export const flowEdges: FlowEdge[] = [
  {
    id: "pipe-uzen-aktau",
    from: "fld-uzen",
    to: "node-aktau-port",
    type: "crude",
    label: "原油输送",
    status: "normal",
    flowRate: 14400,
    pressure: 6.8,
    variance: 2.1,
    reportLag: "4 分钟",
  },
  {
    id: "pipe-kalamkas-karazhanbas-aktau",
    from: "fld-kalamkas",
    to: "node-aktau-port",
    type: "crude",
    label: "原油输送",
    status: "normal",
    flowRate: 10000,
    pressure: 6.2,
    variance: 1.4,
    reportLag: "6 分钟",
  },
  {
    id: "edge-karazhanbas-metering",
    from: "fld-karazhanbas",
    to: "asset-metering-kbm-03",
    type: "data",
    label: "计量采集",
    status: "important",
    flowRate: 6420,
    pressure: 5.4,
    variance: -12.0,
    reportLag: "11 分钟",
  },
  {
    id: "edge-metering-ministry",
    from: "asset-metering-kbm-03",
    to: "node-ministry",
    type: "data",
    label: "监管报送",
    status: "important",
    flowRate: 6420,
    pressure: 0,
    variance: -12.0,
    reportLag: "11 分钟",
  },
  {
    id: "edge-dunga-power",
    from: "fld-dunga",
    to: "node-ministry",
    type: "data",
    label: "能耗报送",
    status: "watch",
    flowRate: 1860,
    pressure: 4.1,
    variance: 6.4,
    reportLag: "8 分钟",
  },
];

export const mapLayerStats = [
  { label: "在线计量点", value: "24/26", state: "2 个延迟" },
  { label: "管线运行", value: "5 条", state: "1 条偏离" },
  { label: "AI 观察窗", value: "15 min", state: "滚动预测" },
  { label: "待复核证据包", value: "3 份", state: "已冻结" },
];

export const pipelineStatusRows = [
  {
    name: "Kalamkas - Karazhanbas - Aktau",
    type: "原油",
    status: "important" as NodeStatus,
    flow: "6,420 t/d",
    pressure: "5.4 MPa",
    variance: "-12.0%",
  },
  {
    name: "Uzen - Zhetybay - Aktau",
    type: "原油",
    status: "normal" as NodeStatus,
    flow: "14,400 t/d",
    pressure: "6.8 MPa",
    variance: "+2.1%",
  },
  {
    name: "Dunga energy telemetry",
    type: "能耗",
    status: "watch" as NodeStatus,
    flow: "1,860 t/d",
    pressure: "4.1 MPa",
    variance: "+6.4%",
  },
];

export const evidenceItems = [
  { label: "15 分钟流量序列", status: "已冻结", owner: "系统取证" },
  { label: "单位能耗预测带", status: "已生成", owner: "AI 服务" },
  { label: "近 24 小时报送记录", status: "已归档", owner: "监管节点" },
  { label: "巡检工单", status: "待补充", owner: "人工复核" },
];

export const anomalyEvents: AnomalyEvent[] = [
  {
    id: "evt-2026-05-18-001",
    title: "外输流量连续偏离基准",
    nodeId: "asset-metering-kbm-03",
    severity: "important",
    detectedAt: "2026-05-18 11:30",
    confidence: 0.78,
    reviewStatus: "待复核",
    aiSummary:
      "3 号计量站外输流量连续 4 小时低于预测带，伴随单位能耗抬升。AI 初判建议核查井口结蜡、泵效下降或计量漂移，需人工复核。",
    suggestedAction: "发起人工复核，调取近 24 小时流量、压力、能耗曲线与巡检记录。",
  },
  {
    id: "evt-2026-05-18-002",
    title: "夜间能耗轨迹轻微异常",
    nodeId: "fld-dunga",
    severity: "watch",
    detectedAt: "2026-05-18 05:15",
    confidence: 0.64,
    reviewStatus: "升级处理中",
    aiSummary:
      "敦加油气田夜间能耗曲线与近 14 日同类工况相比出现轻微抬升，尚不足以形成确定性结论。",
    suggestedAction: "保持观察，等待下一轮报送后由值班人员决定是否并入复核清单。",
  },
];

export const regionEnterpriseNodes: RegionEnterpriseNode[] = [
  {
    id: "ent-demo-karazhanbas-ops",
    name: "示意企业 A / 卡拉让巴斯作业单元",
    role: "upstream",
    status: "important",
    coordinates: [51.28, 44.88],
    riskScore: 82,
    alertId: "ENT-ALERT-AKTAU-001",
    summary: "连接卡拉让巴斯油田和 3 号计量站，本轮报警的企业侧承接对象。",
  },
  {
    id: "ent-demo-kalamkas-ops",
    name: "示意企业 B / 卡拉姆卡斯作业单元",
    role: "upstream",
    status: "normal",
    coordinates: [51.48, 44.36],
    riskScore: 36,
    summary: "上游开采节点，当前无活跃报警。",
  },
  {
    id: "ent-demo-uzen-ops",
    name: "示意企业 C / 乌津作业单元",
    role: "upstream",
    status: "normal",
    coordinates: [52.03, 43.37],
    riskScore: 28,
    summary: "阿克套方向稳定供给节点。",
  },
  {
    id: "ent-demo-aktau-metering",
    name: "3 号计量站 / KBM-03",
    role: "metering",
    status: "important",
    coordinates: [51.2, 44.68],
    riskScore: 78,
    alertId: "ENT-ALERT-AKTAU-001",
    summary: "报警对象所在计量节点，外输流量连续低于预测带。",
  },
  {
    id: "ent-demo-aktau-port-storage",
    name: "阿克套港储运示意节点",
    role: "storage",
    status: "watch",
    coordinates: [51.1, 43.65],
    riskScore: 54,
    summary: "中游港储运节点，需与计量站数据合并核查。",
  },
  {
    id: "ent-demo-regional-office",
    name: "州能源局监管接入点",
    role: "regulatory",
    status: "normal",
    coordinates: [51.55, 43.78],
    riskScore: 18,
    summary: "州级报送和人工复核入口。",
  },
];

export const regionFlowEdges: RegionFlowEdge[] = [
  {
    id: "region-flow-karazhanbas-metering",
    from: "ent-demo-karazhanbas-ops",
    to: "ent-demo-aktau-metering",
    relationType: "metering",
    materialFlow: "外输计量",
    status: "important",
    variance: -11.4,
  },
  {
    id: "region-flow-metering-port",
    from: "ent-demo-aktau-metering",
    to: "ent-demo-aktau-port-storage",
    relationType: "transport",
    materialFlow: "港储运链路",
    status: "important",
    variance: -11.4,
  },
  {
    id: "region-flow-kalamkas-port",
    from: "ent-demo-kalamkas-ops",
    to: "ent-demo-aktau-port-storage",
    relationType: "transport",
    materialFlow: "原油外输",
    status: "normal",
    variance: 1.4,
  },
  {
    id: "region-flow-uzen-port",
    from: "ent-demo-uzen-ops",
    to: "ent-demo-aktau-port-storage",
    relationType: "transport",
    materialFlow: "原油外输",
    status: "normal",
    variance: 2.1,
  },
  {
    id: "region-flow-metering-office",
    from: "ent-demo-aktau-metering",
    to: "ent-demo-regional-office",
    relationType: "reporting",
    materialFlow: "监管报送",
    status: "important",
    variance: -11.4,
  },
];

export const regionAlertCards: RegionAlertCard[] = [
  {
    id: "ENT-ALERT-AKTAU-001",
    eventId: "EVT-2026-0518-MG-PORT-001",
    enterpriseId: "ent-demo-karazhanbas-ops",
    alertObjectId: "alert-object-kbm-03-flow",
    title: "示意企业 A 关联计量点外输流量偏离",
    severity: "important",
    trigger: "3 号计量站外输流量连续 4 小时低于预测带 11.4%",
    affectedNodeIds: [
      "ent-demo-karazhanbas-ops",
      "ent-demo-aktau-metering",
      "ent-demo-aktau-port-storage",
      "ent-demo-regional-office",
    ],
    aiSummary:
      "AI 初判发现外输流量、计量心跳和报送延迟存在同向异常，需人工复核后决定是否进入企业核查。",
    recommendedNextStep: "查看企业报警详情并调取计量装置档案。",
  },
];

export const selectedRegionAlert = regionAlertCards[0];

export const enterpriseDetail: EnterpriseDetail = {
  id: "ent-demo-karazhanbas-ops",
  eventId: "EVT-2026-0518-MG-PORT-001",
  name: "示意企业 A / 卡拉让巴斯作业单元",
  industryRole: "上游开采与外输计量承接方",
  region: "曼吉斯套州 / 阿克套方向",
  licenseStatus: "示意许可有效，需核查本次报警对应作业记录",
  upstreamCount: 1,
  downstreamCount: 2,
  keyCounterparties: ["3 号计量站 / KBM-03", "阿克套港储运示意节点", "州能源局监管接入点"],
  relationRisk: "important",
  aiSummary:
    "AI 初判该企业关联计量点出现持续偏离，建议先核对计量装置状态、企业报送窗口和港储运交接记录。该结论仅供人工复核参考。",
  confidence: 0.78,
  requiredHumanReview: true,
};

export const enterpriseAlertObject: EnterpriseAlertObject = {
  id: "alert-object-kbm-03-flow",
  enterpriseId: "ent-demo-karazhanbas-ops",
  objectName: "3 号计量站流量计 / LF-CL-008",
  objectType: "metering_device",
  deviceId: "LF-CL-008",
  metric: "外输流量",
  currentValue: "6,421.8 t/d",
  baselineValue: "预测带下沿约 7,250 t/d",
  deviation: "-11.4%",
  detectedAt: "2026-05-18 11:30",
  severity: "important",
};

export const enterpriseRelatedDevices = [
  {
    id: "LF-CL-008",
    name: "3 号计量站流量计",
    type: "液体流量计",
    status: "important" as NodeStatus,
    lastReading: "6,421.8 t/d",
    lastHeartbeat: "11 分钟前",
  },
  {
    id: "TK-ACT-001",
    name: "1 号主储油罐液位计",
    type: "液位计",
    status: "normal" as NodeStatus,
    lastReading: "稳定",
    lastHeartbeat: "4 分钟前",
  },
];

export const enterpriseNextActions: EnterpriseNextAction[] = [
  {
    id: "next-device",
    label: "查看计量装置档案",
    targetRoute: "#/scenario-1-2",
    description: "核对 LF-CL-008 的证书、校准有效期、通信状态和最近心跳。",
  },
  {
    id: "next-timeseries",
    label: "查看异常曲线",
    targetRoute: "#/scenario-2-1",
    description: "查看实际值、预测带和异常时间窗口。",
  },
  {
    id: "next-cross-check",
    label: "进入跨系统核验",
    targetRoute: "#/scenario-2-2",
    description: "比对企业报送、计量实测、税务、海关和统计口径。",
  },
  {
    id: "next-graph",
    label: "查看关系图谱",
    targetRoute: "#/scenario-3-2",
    description: "查看企业、设备、事件和上下游关系。",
  },
];

export const auditTrail: AuditStep[] = [
  {
    id: "audit-001",
    actor: "AI 初判",
    time: "11:30",
    content: "识别流量偏离与单位能耗抬升，生成复核建议。",
    state: "done",
  },
  {
    id: "audit-002",
    actor: "系统取证",
    time: "11:32",
    content: "冻结 24 小时计量、压力、能耗曲线与报送记录。",
    state: "done",
  },
  {
    id: "audit-003",
    actor: "人工复核",
    time: "待处理",
    content: "监管人员确认是否转入企业核查或关闭观察。",
    state: "active",
  },
  {
    id: "audit-004",
    actor: "审计留痕",
    time: "待生成",
    content: "保存 AI 判断、人工意见、证据包和处置结论。",
    state: "pending",
  },
];

export const energyTrend = [
  78, 80, 77, 82, 85, 83, 86, 84, 87, 91, 94, 96, 95, 98, 102, 108, 112, 116,
  114, 110, 107, 103, 99, 95,
];
