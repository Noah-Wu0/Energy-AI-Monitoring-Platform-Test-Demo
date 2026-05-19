import type { NodeStatus } from "./demoData";

export type AttributionAgent = {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "running" | "done" | "pending";
  dataSources: string[];
  reasoning: string;
  output: string;
};

export type CandidateCause = {
  id: string;
  description: string;
  probability: number;
  supportingAgents: string[];
  evidenceIds: string[];
};

export type EvidenceItem = {
  id: string;
  type: "data" | "document" | "system" | "audit";
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  traceableTo: string;
};

export const scenario31LockedAnomaly = {
  id: "EVT-2026-0518-MG-PORT-001",
  title: "曼吉斯套州港储运链路流量连续偏离预测带 11.4%",
  nodeName: "阿克套-库雷克港储运节点",
  detectedAt: "2026-05-18 11:30",
  severity: "important" as NodeStatus,
  confidence: 0.78,
  summary: "曼吉斯套州油气工业带至阿克套-库雷克港储运链路连续 4 小时低于预测带 11.4%，AI 初判发现异常模式，需人工复核。已启动多 Agent 归因工作流。涉及上游油田产出、中游管输计量、下游港口库存三方数据核验。",
};

export const scenario31Agents: AttributionAgent[] = [
  {
    id: "agent-approval",
    name: "审批 Agent",
    role: "调取企业过往审批记录，核查近期产量变更、检维修计划和许可证合规性",
    icon: "FileSearch",
    status: "done",
    dataSources: ["生产许可证数据库", "检维修工单系统", "产量变更审批记录"],
    reasoning: "检索近 30 天该区域油田产量变更审批记录，发现曼吉斯套州 3 个主力油田无近期减产审批；检维修计划显示阿克套港储罐区 5 月 12 日完成例行检修，理论上不应影响外输能力。排除审批层面异常。",
    output: "排除审批层面异常：未发现未经批准的减产或停产。港口检修已完成，管线运营许可均在有效期内。",
  },
  {
    id: "agent-submit",
    name: "报送 Agent",
    role: "核验企业报送数据与电表实测数据之间的一致性，检测数据篡改或延迟报送",
    icon: "Database",
    status: "done",
    dataSources: ["企业自报送数据集", "SCADA 电表实测数据", "计量站流量记录"],
    reasoning: "对比企业报送的日产量数据与 SCADA 系统电表实测数据，发现 5 月 16 日起报送数据开始滞后于实测数据约 8-12 小时；计量站 3 号流量计在 5 月 15 日夜间出现过一次数据跳变。报送数据存在延迟，且近 3 日报送值较实测值偏低约 3.2%，需核查原因。",
    output: "发现报送异常：企业报送数据存在 8-12 小时延迟，且近 3 天低报约 3.2%。计量站 3 号流量计有数据跳变记录，疑似传感器故障。",
  },
  {
    id: "agent-inspect",
    name: "检查 Agent",
    role: "分析管道压力、温度、流量曲线的物理一致性，识别设备故障或管线泄漏",
    icon: "Activity",
    status: "done",
    dataSources: ["管道 SCADA 实时数据", "压力传感器阵列", "温度/粘度监测曲线"],
    reasoning: "分析阿克套方向 3 条主管线的压力-流量关系曲线，发现 5 月 17 日凌晨起，CPC 方向管线压力上升 6.8% 而流量下降 11.4%，呈典型的部分堵塞或阀门异常特征。温度曲线正常，排除凝管假设。管道全线无泄漏声波报警。",
    output: "物理层异常确认：CPC 方向管线呈现部分堵塞特征（压力上升 + 流量下降），非泄漏。建议优先排查泵站和阀门工况。",
  },
  {
    id: "agent-penalty",
    name: "历史记录 Agent",
    role: "核查企业历史处理记录和监管档案，评估是否存在重复模式或需关注的监管线索",
    icon: "Siren",
    status: "done",
    dataSources: ["行政处理数据库", "企业监管记录档案", "历史约谈/整改记录"],
    reasoning: "检索该企业及关联子公司近 3 年监管记录，发现 2024 年因类似报送延迟被约谈 2 次，2025 年因计量设备未按期校准被行政处理 1 次。该企业存在报送方面的既往模式，本次异常与历史行为特征部分吻合。",
    output: "历史模式吻合：企业存在报送合规方面的既往记录。2024-2025 年累计 3 次行政处理，本次异常模式与历史行为特征部分重叠。建议启动核查程序，由人工研判后决定后续措施。",
  },
  {
    id: "agent-relation",
    name: "关联 Agent",
    role: "分析关联企业和上下游数据，识别是否存在转移产量或关联交易异常",
    icon: "GitBranch",
    status: "running",
    dataSources: ["关联企业图谱", "上下游交易数据", "港口船运/铁路装卸记录"],
    reasoning: "构建企业关联图谱，发现曼吉斯套产区与相邻的阿特劳州 2 家贸易公司存在频繁的关联交易。5 月 16-18 日，港口船运记录显示有 3 艘油轮临时改港至阿塞拜疆方向，货量合计约 28 万吨。关联交易模式存在异常，正在调取贸易公司更多数据。",
    output: "关联交易疑点：发现 2 家关联贸易公司近期存在异常交易模式，3 艘油轮临时改港。关联分析仍在进行，待更多数据补充后更新结论。",
  },
  {
    id: "agent-master",
    name: "主审 Agent",
    role: "汇总各 Agent 的分析结论，交叉验证证据链，生成综合归因报告",
    icon: "Bot",
    status: "done",
    dataSources: ["各 Agent 输出汇总", "历史归因案例库", "能源部法规数据库"],
    reasoning: "综合 5 个专业 Agent 的分析输出，采用贝叶斯网络进行因果推断。最强因指向港储运链路物理异常（CPC 方向部分堵塞），结合企业报送延迟和历史监管记录，初步判断为设备故障与报送合规双重因素。关联 Agent 的交易异常发现需进一步核查，暂不纳入主因。以上为 AI 推理，需人工复核确认。",
    output: "综合归因结论：主要原因为 CPC 方向管线物理异常（部分堵塞，概率 87%），次要因素为企业报送延迟加重了监管盲区（概率 63%）。建议优先排查泵站和阀门，同步转人工研判是否约谈。关联交易疑点转入独立核查。以上结论为 AI 推理结果，需人工复核确认。",
  },
];

export const scenario31CandidateCauses: CandidateCause[] = [
  {
    id: "cause-001",
    description: "CPC 方向港储运链路物理异常，泵站或阀门部分堵塞导致流量偏离预测带",
    probability: 0.87,
    supportingAgents: ["agent-inspect", "agent-submit", "agent-master"],
    evidenceIds: ["evi-001", "evi-002", "evi-003"],
  },
  {
    id: "cause-002",
    description: "企业报送数据延迟与低报，3 号计量站流量计疑似传感器故障或校准漂移",
    probability: 0.63,
    supportingAgents: ["agent-submit", "agent-penalty", "agent-master"],
    evidenceIds: ["evi-004", "evi-005"],
  },
  {
    id: "cause-003",
    description: "计量设备校准漂移，3 号流量计在 5 月 15 日夜间出现跳变后持续偏差",
    probability: 0.41,
    supportingAgents: ["agent-submit", "agent-inspect"],
    evidenceIds: ["evi-004", "evi-007"],
  },
  {
    id: "cause-004",
    description: "上游曼吉斯套产区实际减产，企业未及时申报产量变更，导致报送与实际产量不符",
    probability: 0.28,
    supportingAgents: ["agent-approval", "agent-submit", "agent-relation"],
    evidenceIds: ["evi-005", "evi-006"],
  },
  {
    id: "cause-005",
    description: "关联企业通过临时改港方式变更出口路径，存在需核查的贸易模式变化，建议人工研判",
    probability: 0.19,
    supportingAgents: ["agent-relation", "agent-penalty"],
    evidenceIds: ["evi-006", "evi-008"],
  },
];

export const scenario31EvidenceItems: EvidenceItem[] = [
  {
    id: "evi-001",
    type: "data",
    title: "CPC 管线压力-流量曲线（近 48 小时）",
    source: "管道 SCADA 系统",
    timestamp: "2026-05-18 11:30",
    summary: "5 月 17 日 02:00 起压力上升 6.8%，流量下降 11.4%，呈部分堵塞典型特征。30 分钟采样间隔，共 96 个数据点已冻结。",
    traceableTo: "SCADA 系统 / 管道传感器阵列 / 阿特劳-阿克套 CPC 管线段",
  },
  {
    id: "evi-002",
    type: "system",
    title: "泵站运行日志 — Aktau-3 泵站",
    source: "泵站运维管理系统",
    timestamp: "2026-05-18 10:45",
    summary: "Aktau-3 泵站 2 号主泵在 5 月 17 日 01:48 触发过载保护，自动切换至备用泵。切换过程中流量出现 15 分钟中断。运行日志已提取。",
    traceableTo: "泵站运维管理系统 / Aktau-3 泵站 / 2 号主泵控制器",
  },
  {
    id: "evi-003",
    type: "data",
    title: "港口储罐液位变化记录（近 72 小时）",
    source: "阿克套港储运管理系统",
    timestamp: "2026-05-18 11:15",
    summary: "港口 4 号、7 号储罐液位自 5 月 16 日起上升速率异常缓慢，与上游预期来油量不匹配。液位数据与管线流量下降趋势一致。",
    traceableTo: "港口储运管理系统 / 储罐液位传感器 / 阿克套港操作日志",
  },
  {
    id: "evi-004",
    type: "data",
    title: "3 号计量站流量计数据跳变记录",
    source: "计量站 SCADA 终端",
    timestamp: "2026-05-15 23:52",
    summary: "3 号计量站在 5 月 15 日 23:52 出现瞬时流量数据跳变（从 6,420 t/d 跳至 7,100 t/d 后回落），此后流量数据持续偏低约 3-5%。设备自检日志显示信号噪声异常。",
    traceableTo: "计量站 SCADA 终端 / 3 号流量计 / 设备校准档案",
  },
  {
    id: "evi-005",
    type: "document",
    title: "企业 2026 年 5 月产量报送记录",
    source: "企业自报送系统",
    timestamp: "2026-05-18 08:30",
    summary: "企业 5 月 1-17 日产量报送记录显示，5 月 16 日起数据更新延迟显著，5 月 17 日数据于 5 月 18 日 08:30 才完成报送，延迟约 14 小时。报送数据完整但时效性不足。",
    traceableTo: "企业自报送系统 / 报送日志 / 能源部数据接收网关",
  },
  {
    id: "evi-006",
    type: "document",
    title: "关联贸易公司近期交易合同摘要",
    source: "关联企业图谱数据库",
    timestamp: "2026-05-18 10:00",
    summary: "关联方 A（阿特劳贸易公司）与关联方 B（阿克套贸易公司）在 5 月 14-17 日期间签订 3 笔原油买卖合同，合计约 28 万吨，交货地为巴库港。该交易模式与此前常规出口路径不一致。",
    traceableTo: "关联企业图谱数据库 / 工商登记系统 / 海关报关数据库",
  },
  {
    id: "evi-007",
    type: "audit",
    title: "3 号计量站设备校准档案",
    source: "计量设备管理系统",
    timestamp: "2026-05-18 09:15",
    summary: "3 号流量计上次校准日期为 2025 年 11 月 20 日，按规定应每 6 个月校准一次。下次校准到期日为 2026 年 5 月 20 日，当前处于校准周期末期，偏差风险升高。",
    traceableTo: "计量设备管理系统 / 校准服务商记录 / 国家标准计量院",
  },
  {
    id: "evi-008",
    type: "system",
    title: "港口船运调度系统 — 油轮改港记录",
    source: "阿克套港船运调度系统",
    timestamp: "2026-05-17 18:00",
    summary: "3 艘原定驶往新罗西斯克的油轮（运力合计 28 万吨）于 5 月 16 日晚间临时改港至巴库。改港原因标注为“商业调度调整”。船名及 IMO 编号已记录。",
    traceableTo: "港口船运调度系统 / 船舶 AIS 轨迹 / 哈萨克斯坦海事局",
  },
];
