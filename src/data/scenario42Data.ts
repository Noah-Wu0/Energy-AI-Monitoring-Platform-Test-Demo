export type ReportTemplate = {
  id: string;
  name: string;
  type: "daily" | "weekly" | "monthly" | "emergency" | "minister";
  description: string;
  lastGenerated: string;
  schedule: string;
  regulationRef: string;
};

export type ReportStatus = "draft" | "ai_generated" | "edited" | "approved" | "published";

export type GeneratedReport = {
  id: string;
  templateId: string;
  title: string;
  generatedAt: string;
  status: ReportStatus;
  content: string;
  aiDeclaration: string;
  humanApproval: string;
};

export type DataSnapshot = {
  id: string;
  reportId: string;
  name: string;
  timeRange: string;
  dataVersion: string;
  keyMetrics: { label: string; value: string }[];
  aiDisclaimer: string;
};

export type ReportLifecycleStep = {
  id: string;
  order: number;
  name: string;
  actor: "AI" | "Human" | "System";
  timestamp: string;
  status: "done" | "active" | "pending";
  description: string;
};

export const reportTemplates: ReportTemplate[] = [
  {
    id: "tpl-daily",
    name: "监管日报",
    type: "daily",
    description: "每日能源运行态势自动汇总，覆盖全国油气生产、异常事件、AI分析简报与需关注事项。",
    lastGenerated: "2026-05-18 15:30",
    schedule: "每日 15:30 自动生成",
    regulationRef: "《能源监管条例》第46条第1款 — 日报制度",
  },
  {
    id: "tpl-weekly",
    name: "监管周报",
    type: "weekly",
    description: "每周能源运行综述，含关键指标趋势分析、异常事件回顾及下周风险预判。",
    lastGenerated: "2026-05-18 09:00",
    schedule: "每周一 09:00 自动生成",
    regulationRef: "《能源监管条例》第46条第2款 — 周报制度",
  },
  {
    id: "tpl-monthly",
    name: "监管月报",
    type: "monthly",
    description: "月度能源运行综合评估，涵盖产量统计、合规审查、设备运维及政策执行情况。",
    lastGenerated: "2026-05-01 10:00",
    schedule: "每月1日 10:00 自动生成",
    regulationRef: "《能源监管条例》第46条第3款 — 月报制度",
  },
  {
    id: "tpl-emergency",
    name: "紧急专报",
    type: "emergency",
    description: "针对突发事件即时生成专项报告，包含事件说明、影响范围评估与建议处置措施。",
    lastGenerated: "2026-05-17 08:55",
    schedule: "事件触发后 15 分钟内生成",
    regulationRef: "《能源监管条例》第46条第4款 — 紧急报告制度",
  },
  {
    id: "tpl-minister",
    name: "部长简报",
    type: "minister",
    description: "面向部领导的高层摘要，凝练核心指标、重大风险与决策建议，一页纸呈现。",
    lastGenerated: "2026-05-18 08:00",
    schedule: "每日 08:00 报送",
    regulationRef: "《能源监管条例》第46条第5款 — 部长简报制度",
  },
];

export const generatedReports: GeneratedReport[] = [
  {
    id: "rpt-daily-20260518",
    templateId: "tpl-daily",
    title: "哈萨克斯坦共和国能源部监管日报 — 2026年5月18日",
    generatedAt: "2026-05-18 15:30",
    status: "published",
    content: `# 哈萨克斯坦共和国能源部监管日报
## 报告编号：MOE-DR-2026-0518 | 生成时间：2026年5月18日 15:30

### 一、全国能源运行态势总览

截至2026年5月18日15时，全国油气生产运行总体平稳。主要产区日产量：原油185.2万桶，天然气2.86亿立方米，较前一日分别变动+0.3%和-1.1%。全国接入计量设备1,890台，其中1,842台在线正常回传，48台离线，设备在线率97.5%。

[AI_GENERATED]根据AI综合分析，全国17个重点监测节点中，15个处于正常运行区间，2个处于观察状态。曼吉斯套州港储运链路流量偏离约-11.4%，系统已触发异常预警（事件编号 EVT-2026-0518-MG-PORT-001），AI 初判发现异常模式，已启动多 Agent 归因工作流，待人工复核。[/AI_GENERATED]

西哈州凝析气报送链路延迟问题已得到改善，数据心跳恢复至正常水平，延迟中位数从15分钟降至5分钟。阿克托别、克孜勒奥尔达产区运行稳定，各项指标均处于正常波动范围。

### 二、异常事件摘要

[AI_GENERATED]今日系统自动检测异常事件3项，其中需关注事项1项（曼吉斯套港储运偏离约-11.4%），已自动归档事项2项（奇姆肯特炼厂进料波动恢复、西哈州数据延迟恢复）。曼吉斯套链路偏离事件已启动归因分析。[/AI_GENERATED]

重点事件详情：曼吉斯套州至阿克套-库雷克港储运链路于今日11:30触发异常预警，外输流量连续4小时低于预测带约11.4%。AI 初判为重要等级，已启动多 Agent 归因和多源数据核验，待人工复核后确定处置方案。

### 三、AI分析简报

[AI_GENERATED]基于多源数据融合分析，当前全国能源系统综合风险指数为45/100，处于"观察"区间。曼吉斯套链路偏离事件（EVT-2026-0518-MG-PORT-001）正在归因分析中，多 Agent 已介入核验。以上为 AI 初判，需人工复核确认。建议关注里海水位季节性变化对港口装船作业的潜在影响，以及月底产量结算前的数据报送压力。[/AI_GENERATED]

全国管道输送系统压力稳定，CPC管道、UAS管道和中哈原油管道均在正常运行参数范围内。阿克套港口当前装船作业正常，1号泊位和3号泊位满负荷运行。

### 四、需关注事项

1. 曼吉斯套港储运链路（EVT-2026-0518-MG-PORT-001）— 偏离约-11.4%，多 Agent 归因进行中，待人工复核后确定处置方案
2. 里海港口水位 — 关注季节性变化对装船作业的潜在影响
3. 西哈州数据链路 — 已恢复正常，本周保持观察

### 五、附件与数据来源

数据来源：全国能源设施实时监测系统（NEMS）
数据时间范围：2026年5月18日 00:00 — 15:00（UTC+5）
引用数据快照版本：DS-20260518-1500-v3
本报告由AI辅助生成，经人工审核签批后发布`,
    aiDeclaration: "本报告中标记为[AI_GENERATED]的段落由AI系统自动生成，涵盖态势分析、异常摘要、风险研判等内容。AI生成比例约35%。所有AI生成内容经人工审核确认后纳入报告。",
    humanApproval: "已审核，同意发布。签批人：能源部监管司副司长 N. Suleimenov，签批时间：2026-05-18 15:45",
  },
  {
    id: "rpt-emergency-20260517",
    templateId: "tpl-emergency",
    title: "能源监管紧急专报 — 阿克套港2号泊位流量异常",
    generatedAt: "2026-05-17 08:55",
    status: "published",
    content: `# 能源监管紧急专报
## 报告编号：MOE-ER-2026-0517 | 优先级：高 | 生成时间：2026年5月17日 08:55

### 一、紧急情况说明

2026年5月17日08时42分，阿克套-库雷克港2号泊位计量系统检测到进港原油流量骤降，15分钟内流量下降至正常水平的62%。系统自动触发紧急预警机制（预警等级：重要），并同步通知值班监管员。

[AI_GENERATED]AI综合分析判定，流量骤降与港区2号泊位输油臂液压系统故障高度相关。系统同时检测到该泊位装船作业随即暂停，而1号泊位和3号泊位仍在正常运行。初步排除管道泄漏和罐区异常的可能性，依据为：压力曲线未出现突降特征、相邻管线振动传感器未见异常、罐区液位变化曲线正常。[/AI_GENERATED]

### 二、影响范围评估

[AI_GENERATED]受影响设施：阿克套港2号泊位装船线及附属输油臂
受影响时段：自08:42起持续中
预计影响量：约2,800吨/日（按当前装船计划计算）
替代运力方案：1号泊位和3号泊位可承接部分转运量，剩余可通过库雷克港分流
整体风险评估：港口整体原油外输作业能力下降约35%[/AI_GENERATED]

### 三、建议处置措施

1. 立即派遣港区运维团队检查2号泊位输油臂液压系统
2. 启动库雷克港备用装船方案，分流待装船原油
3. 通知下游接收方运营方调整船期安排
4. 每2小时向能源部监管司报送处置进展情况
5. 安排对同型号输油臂进行预防性检查

### 四、后续跟踪

截至当日14:30，运维团队确认2号泊位输油臂液压缸密封件老化导致压力不足，已完成更换。泊位已于16:10恢复正常装船作业。

### 五、附件与数据来源

触发时间：2026年5月17日 08:42（UTC+5）
数据快照版本：DS-20260517-0845-emergency
关联异常事件编号：EVT-20260517-001
处置完成时间：2026年5月17日 16:10`,
    aiDeclaration: "本报告中标记为[AI_GENERATED]的段落由AI系统在事件触发后自动生成，包括根因分析、影响范围评估等内容。AI生成比例约45%。所有AI研判结论经人工审核确认后纳入报告。",
    humanApproval: "已审核，同意发布并执行处置措施。签批人：能源部监管司司长 A. Tolegenov，签批时间：2026-05-17 09:10",
  },
  {
    id: "rpt-weekly-20260518",
    templateId: "tpl-weekly",
    title: "哈萨克斯坦共和国能源部监管周报 — 2026年第20周",
    generatedAt: "2026-05-18 09:00",
    status: "approved",
    content: `# 哈萨克斯坦共和国能源部监管周报
## 报告编号：MOE-WR-2026-W20 | 统计周期：2026年5月12日 — 5月18日

### 一、本周能源运行综述

本周全国油气生产运行整体平稳，原油日均产量184.6万桶，天然气日均产量2.88亿立方米，均在年度计划浮动范围内。全国炼化企业加工负荷率92.7%，较上周微降0.3个百分点，主要受奇姆肯特炼厂计划内检修影响。

[AI_GENERATED]本周AI系统累计监测异常事件19项，其中已处置12项、观察中5项、待升级2项。异常事件总量较上周减少3项，下降13.6%。事件处置及时率达到89.5%，较上周提高3.2个百分点。主要风险仍集中在曼吉斯套州港储运链路和西哈州凝析气数据报送链路。[/AI_GENERATED]

### 二、关键指标周度变化

| 指标名称 | 本周均值 | 上周均值 | 环比变化 |
| 原油产量（万桶/日） | 184.6 | 183.9 | +0.4% |
| 天然气产量（亿m³/日） | 2.88 | 2.91 | -1.0% |
| 设备在线率 | 99.3% | 99.1% | +0.2pp |
| 数据延迟中位数（分钟） | 6.8 | 7.2 | -5.6% |
| 异常事件处置及时率 | 89.5% | 86.3% | +3.2pp |

### 三、重点异常事件回顾

1. 曼吉斯套港储运偏离（EVT-2026-0518-MG-PORT-001，持续观察中）— 5月18日触发异常预警，偏离约-11.4%，归因分析进行中
2. 西哈州数据链路延迟（已恢复）— 经排查为企业侧网关时钟漂移，已校准
3. 阿克套港2号泊位输油臂故障（已处置）— 液压缸密封件更换，16:10恢复作业
4. 奇姆肯特炼厂计划内检修（进行中）— 预计5月20日完成

### 四、下周重点风险预判

[AI_GENERATED]AI预测下周重点关注方向：第一，曼吉斯套链路偏离事件（EVT-2026-0518-MG-PORT-001）的归因结论和处置进展；第二，里海水位季节性变化对港口装船作业的潜在影响；第三，月底产量结算日（5月31日）前的数据报送高峰压力。建议安排专人对曼吉斯套州主要计量站进行跟踪观察。以上为 AI 风险预判，需人工审核。综合风险预判：维持"观察"评级。[/AI_GENERATED]

### 五、附件与数据来源

数据来源：全国能源设施实时监测系统（NEMS）
统计周期：2026年5月12日 00:00 — 5月18日 09:00（UTC+5）
数据快照版本：DS-20260518-0900-wk20
报告状态：待签批发布`,
    aiDeclaration: "本报告中标记为[AI_GENERATED]的段落由AI系统自动生成，涵盖事件统计、趋势分析和下周风险预判。AI生成比例约25%。所有AI生成内容经人工审核确认后纳入报告。",
    humanApproval: "已审核，内容属实。待司长签批后发布。审核人：能源部监管司数据分析处处长 M. Zhakupov，审核时间：2026-05-18 10:15",
  },
];

export const dataSnapshots: DataSnapshot[] = [
  {
    id: "snap-daily-0518",
    reportId: "rpt-daily-20260518",
    name: "日报数据快照 — 2026年5月18日 15:00",
    timeRange: "2026-05-18 00:00 — 15:00（UTC+5）",
    dataVersion: "DS-20260518-1500-v3",
    keyMetrics: [
      { label: "原油日产量", value: "185.2万桶" },
      { label: "天然气日产量", value: "2.86亿m³" },
      { label: "在线设备数", value: "1,794台" },
      { label: "离线设备数", value: "48台" },
      { label: "异常事件数", value: "3项" },
      { label: "数据延迟中位数", value: "6分钟" },
      { label: "AI综合风险指数", value: "45/100" },
      { label: "重点观察节点", value: "2个" },
    ],
    aiDisclaimer: "本数据快照由NEMS系统于2026-05-18 15:00自动采集生成，数据未经人工修改。AI基于此快照数据进行自动化分析。",
  },
  {
    id: "snap-emergency-0517",
    reportId: "rpt-emergency-20260517",
    name: "紧急专报数据快照 — 2026年5月17日 08:45",
    timeRange: "2026-05-17 08:42 — 08:45（事件触发窗口）",
    dataVersion: "DS-20260517-0845-emergency",
    keyMetrics: [
      { label: "异常泊位", value: "2号泊位" },
      { label: "流量降幅", value: "-38%" },
      { label: "正常泊位", value: "1号、3号" },
      { label: "触发预警等级", value: "重要" },
      { label: "预估影响量", value: "2,800吨/日" },
      { label: "AI置信度", value: "89%" },
      { label: "港口产能损失", value: "约35%" },
      { label: "处置时间", value: "7.5小时" },
    ],
    aiDisclaimer: "本数据快照为事件触发后系统自动抓取的高频数据，采样间隔为1分钟。数据版本DS-20260517-0845-emergency已锁定不可篡改。",
  },
  {
    id: "snap-weekly-w20",
    reportId: "rpt-weekly-20260518",
    name: "周报数据快照 — 2026年第20周 5月18日 09:00",
    timeRange: "2026-05-12 00:00 — 2026-05-18 09:00（UTC+5）",
    dataVersion: "DS-20260518-0900-wk20",
    keyMetrics: [
      { label: "周均原油产量", value: "184.6万桶/日" },
      { label: "周均天然气产量", value: "2.88亿m³/日" },
      { label: "周异常事件总数", value: "19项" },
      { label: "已处置事件", value: "12项" },
      { label: "事件处置及时率", value: "89.5%" },
      { label: "炼化加工负荷率", value: "92.7%" },
      { label: "设备周在线率", value: "99.3%" },
      { label: "数据延迟改善", value: "-5.6%" },
    ],
    aiDisclaimer: "本数据快照覆盖完整第20周（5月12日-18日）监测数据，由NEMS系统自动聚合生成。所有数值均为系统原始记录，未做人工修正。",
  },
  {
    id: "snap-daily-0517",
    reportId: "rpt-daily-20260518",
    name: "日报历史快照 — 2026年5月17日 15:00",
    timeRange: "2026-05-17 00:00 — 15:00（UTC+5）",
    dataVersion: "DS-20260517-1500-v3",
    keyMetrics: [
      { label: "原油日产量", value: "184.1万桶" },
      { label: "天然气日产量", value: "2.89亿m³" },
      { label: "异常事件数", value: "5项" },
      { label: "曼吉斯套偏离", value: "-11.4%" },
      { label: "数据延迟中位数", value: "7分钟" },
      { label: "AI综合风险指数", value: "45/100" },
    ],
    aiDisclaimer: "历史快照，用于趋势对比。数据已归档至NEMS历史数据库。",
  },
  {
    id: "snap-minister-brief",
    reportId: "rpt-daily-20260518",
    name: "部长简报底层数据 — 2026年5月18日 08:00",
    timeRange: "2026-05-18 00:00 — 08:00（UTC+5）",
    dataVersion: "DS-20260518-0800-minister",
    keyMetrics: [
      { label: "晨间原油产量", value: "184.9万桶" },
      { label: "晨间天然气产量", value: "2.87亿m³" },
      { label: "前日未决事件", value: "2项" },
      { label: "港口作业正常率", value: "100%" },
      { label: "管道压力区间", value: "5.4-6.8 MPa" },
      { label: "AI风险预判", value: "低风险" },
    ],
    aiDisclaimer: "部长简报底层数据集，每日08:00系统自动采集并生成简报草案。所有数据为自动采集的原始值。",
  },
];

export function getReportsForTemplate(templateId: string): GeneratedReport[] {
  return generatedReports.filter((r) => r.templateId === templateId);
}

export function getSnapshotsForReport(reportId: string): DataSnapshot[] {
  return dataSnapshots.filter((s) => s.reportId === reportId);
}

export function getLifecycleSteps(report: GeneratedReport): ReportLifecycleStep[] {
  const statusOrder: ReportStatus[] = ["draft", "ai_generated", "edited", "approved", "published"];
  const currentIndex = statusOrder.indexOf(report.status);

  const steps: ReportLifecycleStep[] = [
    {
      id: "step-draft",
      order: 1,
      name: "报告起草",
      actor: "System",
      timestamp: report.generatedAt,
      status: currentIndex >= 0 ? "done" : "pending",
      description: "系统根据预设模板自动汇编数据，生成报告初稿框架。",
    },
    {
      id: "step-ai-gen",
      order: 2,
      name: "AI 内容生成",
      actor: "AI",
      timestamp: report.generatedAt,
      status: currentIndex >= 1 ? "done" : currentIndex === 0 ? "active" : "pending",
      description: "AI系统自动生成分析段落、趋势研判与风险预判内容，并在报告中标记。",
    },
    {
      id: "step-edit",
      order: 3,
      name: "人工编辑复核",
      actor: "Human",
      timestamp: report.generatedAt,
      status: currentIndex >= 2 ? "done" : currentIndex === 1 ? "active" : "pending",
      description: "监管分析师审核AI生成内容，修正不当表述，补充人工判断，所有修改均可追溯。",
    },
    {
      id: "step-approve",
      order: 4,
      name: "签批确认",
      actor: "Human",
      timestamp: report.status === "approved" || report.status === "published" ? report.humanApproval.split("签批时间：")[1]?.split("，")[0] ?? report.generatedAt : "",
      status: currentIndex >= 3 ? "done" : currentIndex === 2 ? "active" : "pending",
      description: "主管领导审阅报告内容，确认数据准确性和分析结论后签批。",
    },
    {
      id: "step-publish",
      order: 5,
      name: "发布归档",
      actor: "System",
      timestamp: report.status === "published" ? report.generatedAt : "",
      status: currentIndex >= 4 ? "done" : currentIndex === 3 ? "active" : "pending",
      description: "系统自动将签批后的报告分发给指定接收方，并归档至监管文档库。",
    },
  ];

  return steps;
}
