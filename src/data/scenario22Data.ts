import type { NodeStatus } from "./demoData";

export type EnterpriseData = {
  id: string;
  name: string;
  industry: "oil" | "gas" | "power" | "heat";
  status: NodeStatus;
  dataSources: {
    source: string;
    sourceLabel: string;
    value: number;
    unit: string;
    period: string;
  }[];
};

export type ContradictionEvent = {
  id: string;
  enterpriseId: string;
  sourceA: string;
  sourceB: string;
  deviationRate: number;
  involvedAmount: number;
  aiSuspicionScore: number;
  formula: string;
  severity: NodeStatus;
  suggestedAction: "核查" | "约谈" | "转人工研判";
  detectedAt: string;
  status: "new" | "investigating" | "resolved";
};

export type SourceEdge = {
  id: string;
  enterpriseId: string;
  from: string;
  to: string;
  formula: string;
  deviationRate: number;
  status: NodeStatus;
};

export const scenario22Enterprises: EnterpriseData[] = [
  {
    id: "ent-001",
    name: "示意石油运输企业 A（Demo）",
    industry: "oil",
    status: "important",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 48500, unit: "吨/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 47200, unit: "吨/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 46100, unit: "吨/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 44300, unit: "吨/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 47800, unit: "吨/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 45600, unit: "吨/日", period: "2026-05 环评" },
    ],
  },
  {
    id: "ent-002",
    name: "曼吉斯套油气开采联合体（Demo）",
    industry: "oil",
    status: "critical",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 31200, unit: "吨/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 28600, unit: "吨/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 27400, unit: "吨/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 25100, unit: "吨/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 29800, unit: "吨/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 26300, unit: "吨/日", period: "2026-05 环评" },
    ],
  },
  {
    id: "ent-003",
    name: "示意凝析气生产企业 B（Demo）",
    industry: "gas",
    status: "watch",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 18500, unit: "千m³/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 17900, unit: "千m³/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 18200, unit: "千m³/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 17400, unit: "千m³/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 18100, unit: "千m³/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 17600, unit: "千m³/日", period: "2026-05 环评" },
    ],
  },
  {
    id: "ent-004",
    name: "示意电力企业 C（Demo）",
    industry: "power",
    status: "watch",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 12400, unit: "MWh/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 12100, unit: "MWh/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 11800, unit: "MWh/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 10900, unit: "MWh/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 12200, unit: "MWh/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 11500, unit: "MWh/日", period: "2026-05 环评" },
    ],
  },
  {
    id: "ent-005",
    name: "示意热力企业 D（Demo）",
    industry: "heat",
    status: "normal",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 8900, unit: "Gcal/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 8750, unit: "Gcal/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 8800, unit: "Gcal/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 8200, unit: "Gcal/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 8850, unit: "Gcal/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 8400, unit: "Gcal/日", period: "2026-05 环评" },
    ],
  },
  {
    id: "ent-006",
    name: "示意天然气运输企业 E（Demo）",
    industry: "gas",
    status: "important",
    dataSources: [
      { source: "self_report", sourceLabel: "自报送数据", value: 22600, unit: "千m³/日", period: "2026-05 月报" },
      { source: "meter", sourceLabel: "电表实测数据", value: 21400, unit: "千m³/日", period: "2026-05 实时" },
      { source: "tax", sourceLabel: "税务申报数据", value: 20800, unit: "千m³/日", period: "2026-Q2 申报" },
      { source: "customs", sourceLabel: "海关报关数据", value: 19500, unit: "千m³/日", period: "2026-05 报关单" },
      { source: "stats", sourceLabel: "统计报表数据", value: 21900, unit: "千m³/日", period: "2026-05 统计" },
      { source: "env", sourceLabel: "环评监测数据", value: 20100, unit: "千m³/日", period: "2026-05 环评" },
    ],
  },
];

export const scenario22SourceEdges: SourceEdge[] = [
  {
    id: "edge-self-meter",
    enterpriseId: "ent-001",
    from: "self_report",
    to: "meter",
    formula: "∣自报送 - 电表实测∣ / 电表实测",
    deviationRate: 2.75,
    status: "normal",
  },
  {
    id: "edge-self-tax",
    enterpriseId: "ent-001",
    from: "self_report",
    to: "tax",
    formula: "∣自报送 - 税务申报∣ / 税务申报",
    deviationRate: 5.21,
    status: "watch",
  },
  {
    id: "edge-self-customs",
    enterpriseId: "ent-001",
    from: "self_report",
    to: "customs",
    formula: "∣自报送 - 海关报关∣ / 海关报关",
    deviationRate: 9.48,
    status: "important",
  },
  {
    id: "edge-meter-tax",
    enterpriseId: "ent-001",
    from: "meter",
    to: "tax",
    formula: "∣电表实测 - 税务申报∣ / 税务申报",
    deviationRate: 2.39,
    status: "normal",
  },
  {
    id: "edge-customs-stats",
    enterpriseId: "ent-001",
    from: "customs",
    to: "stats",
    formula: "∣海关报关 - 统计报表∣ / 统计报表",
    deviationRate: 7.32,
    status: "important",
  },
  {
    id: "edge-self-env",
    enterpriseId: "ent-001",
    from: "self_report",
    to: "env",
    formula: "∣自报送 - 环评数据∣ / 环评数据",
    deviationRate: 6.36,
    status: "watch",
  },
];

export const scenario22ContradictionEvents: ContradictionEvent[] = [
  {
    id: "con-001",
    enterpriseId: "ent-001",
    sourceA: "自报送数据",
    sourceB: "海关报关数据",
    deviationRate: 9.48,
    involvedAmount: 187200000,
    aiSuspicionScore: 87,
    formula: "自报送出口量远超海关报关出口量，差额 4,200 吨/日，逻辑矛盾显著",
    severity: "important",
    suggestedAction: "核查",
    detectedAt: "2026-05-18 09:15",
    status: "new",
  },
  {
    id: "con-002",
    enterpriseId: "ent-002",
    sourceA: "自报送数据",
    sourceB: "电表实测数据",
    deviationRate: 9.09,
    involvedAmount: 234000000,
    aiSuspicionScore: 92,
    formula: "自报送产量 31,200 t/d vs 电表实测 28,600 t/d，差 2,600 t/d。自报送与实测数据存在显著偏差，需核查原因。",
    severity: "critical",
    suggestedAction: "转人工研判",
    detectedAt: "2026-05-18 08:42",
    status: "investigating",
  },
  {
    id: "con-003",
    enterpriseId: "ent-002",
    sourceA: "税务申报数据",
    sourceB: "海关报关数据",
    deviationRate: 9.16,
    involvedAmount: 156000000,
    aiSuspicionScore: 85,
    formula: "税务申报销售量与海关出口量存在差异，需核查统计口径与申报一致性。",
    severity: "important",
    suggestedAction: "约谈",
    detectedAt: "2026-05-17 16:30",
    status: "investigating",
  },
  {
    id: "con-004",
    enterpriseId: "ent-003",
    sourceA: "自报送数据",
    sourceB: "统计报表数据",
    deviationRate: 2.21,
    involvedAmount: 42000000,
    aiSuspicionScore: 34,
    formula: "自报送与统计报表数据基本吻合，偏差在可接受范围内",
    severity: "watch",
    suggestedAction: "核查",
    detectedAt: "2026-05-18 07:10",
    status: "new",
  },
  {
    id: "con-005",
    enterpriseId: "ent-004",
    sourceA: "电表实测数据",
    sourceB: "海关报关数据",
    deviationRate: 11.01,
    involvedAmount: 89000000,
    aiSuspicionScore: 78,
    formula: "电表实测发电量与海关报关出口量存在约 12% 差异，需核查跨境电力交易统计口径。",
    severity: "important",
    suggestedAction: "约谈",
    detectedAt: "2026-05-17 14:55",
    status: "investigating",
  },
  {
    id: "con-006",
    enterpriseId: "ent-004",
    sourceA: "自报送数据",
    sourceB: "环评监测数据",
    deviationRate: 7.83,
    involvedAmount: 56000000,
    aiSuspicionScore: 65,
    formula: "自报送排放数据与环评监测数据偏差超 7%，建议核查数据采集与报送流程。",
    severity: "watch",
    suggestedAction: "核查",
    detectedAt: "2026-05-18 10:22",
    status: "new",
  },
  {
    id: "con-007",
    enterpriseId: "ent-006",
    sourceA: "自报送数据",
    sourceB: "电表实测数据",
    deviationRate: 5.61,
    involvedAmount: 135000000,
    aiSuspicionScore: 71,
    formula: "西哈州天然气运输自报量持续高于电表实测，建议核查凝析气计量与报送流程。",
    severity: "important",
    suggestedAction: "约谈",
    detectedAt: "2026-05-18 06:48",
    status: "investigating",
  },
  {
    id: "con-008",
    enterpriseId: "ent-006",
    sourceA: "海关报关数据",
    sourceB: "统计报表数据",
    deviationRate: 12.31,
    involvedAmount: 212000000,
    aiSuspicionScore: 89,
    formula: "海关出口量与统计报表差额 2,400 千m³/日。跨境管道输气数据存在显著差异，建议核查。",
    severity: "critical",
    suggestedAction: "转人工研判",
    detectedAt: "2026-05-18 11:05",
    status: "new",
  },
  {
    id: "con-009",
    enterpriseId: "ent-001",
    sourceA: "税务申报数据",
    sourceB: "统计报表数据",
    deviationRate: 3.56,
    involvedAmount: 64000000,
    aiSuspicionScore: 41,
    formula: "税务申报与统计报表数据存在轻微差异，可能为统计口径不同导致",
    severity: "watch",
    suggestedAction: "核查",
    detectedAt: "2026-05-18 08:15",
    status: "new",
  },
];

export const scenario22SourceMeta: Record<string, { label: string; color: string; iconBg: string }> = {
  self_report: { label: "自报送", color: "var(--industry-oil)", iconBg: "#fff7ed" },
  meter: { label: "电表实测", color: "var(--status-normal)", iconBg: "#ecfdf5" },
  tax: { label: "税务申报", color: "var(--industry-power)", iconBg: "#eef2ff" },
  customs: { label: "海关报关", color: "var(--status-important)", iconBg: "#fff7ed" },
  stats: { label: "统计报表", color: "var(--industry-gas)", iconBg: "#f0f9ff" },
  env: { label: "环评数据", color: "var(--status-watch)", iconBg: "#fffbeb" },
};
