export type LifecycleActor = "AI" | "Human" | "System";

export type LifecycleStage = {
  id: string;
  order: number;
  name: string;
  actor: LifecycleActor;
  actorDetail: string;
  timestamp: string;
  status: "done" | "active" | "pending";
  actionType: "ai-auto" | "human-confirm" | "human-modify" | "human-reject" | "system";
  description: string;
  result: string;
};

export type AuditTrailEntry = {
  id: string;
  time: string;
  actor: string;
  action: string;
  changes: string;
  dataSnapshot: string;
  auditHash: string;
};

export type ComplianceMetrics = {
  hitlScore: number;
  approvalChainComplete: boolean;
  auditCompleteness: number;
  totalDuration: string;
  aiActions: number;
  humanActions: number;
  systemActions: number;
};

export const eventLockBanner = {
  eventId: "EVT-2026-0518-MG-PORT-001",
  title: "曼吉斯套州 / 阿克套-库雷克港储运链路外输流量连续偏离预测带",
  currentStage: 5,
  currentStageName: "人工决策",
  registeredAt: "2026-05-18 11:30:22 +06",
  registeredBy: "AI异常检测引擎 v3.2.1",
  jurisdiction: "曼吉斯套州能源局监管辖区",
};

export const lifecycleStages: LifecycleStage[] = [
  {
    id: "stage-01",
    order: 1,
    name: "AI 识别异常",
    actor: "AI",
    actorDetail: "AI异常检测引擎 v3.2.1",
    timestamp: "2026-05-18 11:30:22",
    status: "done",
    actionType: "ai-auto",
    description: "AI引擎通过时序预测模型检测到3号计量站外输流量连续4个采样间隔低于95%置信带下限，触发异常告警。同时检测到单位能耗指标同步抬升。",
    result: "异常等级判定: 重要 (IMPORTANT)。置信度: 0.78。系统自动锁定相关数据快照。",
  },
  {
    id: "stage-02",
    order: 2,
    name: "AI 归因分析",
    actor: "AI",
    actorDetail: "AI因果推理服务 CausalEngine r2.1",
    timestamp: "2026-05-18 11:31:05",
    status: "done",
    actionType: "ai-auto",
    description: "AI对流量偏离、能耗抬升、压力波动、密度变化进行多变量归因分析，结合设备维护记录和历史案例库，生成三个候选原因假设。",
    result: "主要假设(得分0.72): 井口结蜡或泵效下降；次要假设(得分0.51): 计量漂移；备选假设(得分0.33): 储层压力自然衰减。以上均为AI初判假设，需人工复核确认。",
  },
  {
    id: "stage-03",
    order: 3,
    name: "操作员复核",
    actor: "Human",
    actorDetail: "州能源局监管值班员 叶西莫夫·铁木尔",
    timestamp: "2026-05-18 13:15:40",
    status: "done",
    actionType: "human-confirm",
    description: "值班员收到AI告警后，调取3号计量站近24小时完整数据曲线，核对计量设备校准记录，确认流量偏离趋势与AI判断一致，接受异常分析结论并标记为需进一步处置。",
    result: "确认AI初判有效。签署复核意见：'流量偏离趋势明显，同意升级处置，建议核查井口状态和泵效。' 系统记录复核签名。",
  },
  {
    id: "stage-04",
    order: 4,
    name: "AI 建议处置",
    actor: "AI",
    actorDetail: "AI决策辅助系统 DecisionAdvisor v1.8",
    timestamp: "2026-05-18 13:16:30",
    status: "done",
    actionType: "ai-auto",
    description: "基于复核确认结果，AI生成处置方案建议：派遣巡检人员现场检查井口结蜡情况和泵组运行参数；安排计量站第三方标定以排除计量漂移；48小时内提交诊断报告。",
    result: "建议处置等级: 二级响应。建议处置时限: 48小时。建议责任人: 3号计量站运维主管及油田总工程师。",
  },
  {
    id: "stage-05",
    order: 5,
    name: "人工决策",
    actor: "Human",
    actorDetail: "曼吉斯套州能源局监管处处长 努尔加利耶夫·阿依达尔",
    timestamp: "2026-05-18 15:42:10",
    status: "active",
    actionType: "human-modify",
    description: "监管处长审核AI建议方案后，将处置时限从48小时缩短为24小时，并要求增加油井压力恢复测试和井底流压对比分析，同时指示将3号计量站纳入重点观察名单。",
    result: "修改AI建议：缩短响应时限至24小时；扩展检查范围至压力恢复测试；要求每周提交计量站运行状态简报，持续4周。",
  },
  {
    id: "stage-06",
    order: 6,
    name: "工单流转",
    actor: "System",
    actorDetail: "监管工单系统 WorkflowEngine",
    timestamp: "2026-05-18 15:43:05",
    status: "pending",
    actionType: "system",
    description: "根据人工决策结果，系统自动生成监管处置工单，指定责任人和处置要求，发送至卡拉让巴斯油田和3号计量站，并抄送曼吉斯套州能源局和共和国能源部监管司。",
    result: "待系统执行。",
  },
  {
    id: "stage-07",
    order: 7,
    name: "处置执行",
    actor: "Human",
    actorDetail: "油田现场巡检队 / 计量站运维组",
    timestamp: "预计 2026-05-19 15:43",
    status: "pending",
    actionType: "human-confirm",
    description: "现场执行井口检查、泵组诊断、计量设备标定、压力恢复测试等处置措施，记录所有操作过程和检测数据，形成处置执行报告上传至监管系统。",
    result: "待执行。",
  },
  {
    id: "stage-08",
    order: 8,
    name: "整改复核",
    actor: "Human",
    actorDetail: "州能源局监管处",
    timestamp: "预计 2026-05-20",
    status: "pending",
    actionType: "human-confirm",
    description: "监管处收到处置执行报告后，核验处置措施是否完整有效，检查流量数据是否恢复正常，评估是否需要追加措施，签署整改复核结论。",
    result: "待复核。",
  },
  {
    id: "stage-09",
    order: 9,
    name: "结案归档",
    actor: "System",
    actorDetail: "监管档案系统 ArchiveEngine",
    timestamp: "预计 2026-05-22",
    status: "pending",
    actionType: "system",
    description: "确认所有处置环节完结、复核通过后，系统自动归档事件全生命周期记录，包括AI分析、人工判断、工单流转、处置结果和审计哈希链，永久保存至监管档案库。",
    result: "待归档。",
  },
];

export const auditTrailEntries: AuditTrailEntry[] = [
  {
    id: "audit-001",
    time: "2026-05-18 11:30:22",
    actor: "AI异常检测引擎 v3.2.1",
    action: "创建异常事件",
    changes: "新建事件 EVT-2026-0518-MG-PORT-001，初始等级 IMPORTANT，置信度 0.78",
    dataSnapshot: "snapshot-evt-init-11h30m22s.json",
    auditHash: "0x8a3f2e1b9c4d5a6f7e8d9c0b1a2f3e4d5c6b7a8f",
  },
  {
    id: "audit-002",
    time: "2026-05-18 11:30:24",
    actor: "系统取证模块 Forensics v2.0",
    action: "数据快照冻结",
    changes: "冻结3号计量站近24小时流量、压力、密度、能耗全量数据",
    dataSnapshot: "snapshot-forensics-freeze-11h30m24s.enc",
    auditHash: "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  },
  {
    id: "audit-003",
    time: "2026-05-18 11:30:28",
    actor: "系统取证模块 Forensics v2.0",
    action: "设备档案关联",
    changes: "关联3号计量站设备清单：流量计 KBM-FM-03A，密度仪 KBM-DN-03B，压力变送器 KBM-PT-03A/B",
    dataSnapshot: "snapshot-device-assets-11h30m28s.json",
    auditHash: "0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e",
  },
  {
    id: "audit-004",
    time: "2026-05-18 11:31:05",
    actor: "AI因果推理服务 CausalEngine r2.1",
    action: "归因分析完成",
    changes: "生成3个候选原因假设，主假设得分0.72(井口结蜡/泵效下降)",
    dataSnapshot: "snapshot-causal-analysis-11h31m05s.json",
    auditHash: "0x7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a",
  },
  {
    id: "audit-005",
    time: "2026-05-18 13:15:40",
    actor: "监管值班员 叶西莫夫·铁木尔",
    action: "人工复核确认",
    changes: "签署复核意见，确认AI初判有效，同意升级处置",
    dataSnapshot: "snapshot-human-review-13h15m40s.json",
    auditHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
  },
  {
    id: "audit-006",
    time: "2026-05-18 13:16:30",
    actor: "AI决策辅助系统 DecisionAdvisor v1.8",
    action: "生成处置建议",
    changes: "建议48小时响应，建议派遣巡检及标定",
    dataSnapshot: "snapshot-decision-advice-13h16m30s.json",
    auditHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
  },
  {
    id: "audit-007",
    time: "2026-05-18 14:20:55",
    actor: "监管值班员 叶西莫夫·铁木尔",
    action: "调度处置会议",
    changes: "创建内部讨论纪要，提请监管处长审核决策",
    dataSnapshot: "snapshot-discussion-note-14h20m55s.json",
    auditHash: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
  },
  {
    id: "audit-008",
    time: "2026-05-18 15:42:10",
    actor: "监管处长 努尔加利耶夫·阿依达尔",
    action: "人工决策-修改AI建议",
    changes: "缩短响应时限至24小时；增加压力恢复测试；纳入重点观察名单4周",
    dataSnapshot: "snapshot-decision-modify-15h42m10s.json",
    auditHash: "0x0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d",
  },
  {
    id: "audit-009",
    time: "2026-05-18 15:43:05",
    actor: "监管工单系统 WorkflowEngine",
    action: "生成处置工单",
    changes: "工单 WO-20260518-0042 已生成，发送至卡拉让巴斯油田和3号计量站",
    dataSnapshot: "snapshot-workorder-created-15h43m05s.json",
    auditHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  },
  {
    id: "audit-010",
    time: "2026-05-18 15:43:10",
    actor: "监管工单系统 WorkflowEngine",
    action: "工单抄送",
    changes: "抄送曼吉斯套州能源局监管处、共和国能源部监管司",
    dataSnapshot: "snapshot-workorder-cc-15h43m10s.json",
    auditHash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  },
  {
    id: "audit-011",
    time: "2026-05-18 15:43:15",
    actor: "监管工单系统 WorkflowEngine",
    action: "状态更新",
    changes: "事件状态: 工单流转 -> 处置执行(待企业确认接收)",
    dataSnapshot: "snapshot-status-update-15h43m15s.json",
    auditHash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
  },
  {
    id: "audit-012",
    time: "2026-05-18 16:05:33",
    actor: "卡拉让巴斯油田调度中心 阿赫梅托夫·努尔兰",
    action: "工单确认接收",
    changes: "已接收工单 WO-20260518-0042，承诺24小时内完成现场检查并提交初步报告",
    dataSnapshot: "snapshot-workorder-ack-16h05m33s.json",
    auditHash: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
  },
  {
    id: "audit-013",
    time: "2026-05-18 16:05:40",
    actor: "监管工单系统 WorkflowEngine",
    action: "时限倒计时启动",
    changes: "24小时处置倒计时已启动，截止: 2026-05-19 16:05",
    dataSnapshot: "snapshot-countdown-start-16h05m40s.json",
    auditHash: "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
  },
  {
    id: "audit-014",
    time: "2026-05-18 17:22:18",
    actor: "3号计量站运维主管 库里巴耶娃·阿依古丽",
    action: "现场初步检查记录",
    changes: "提交初步检查记录：流量计零点漂移0.15%；密度仪校准记录显示逾期；压力变送器正常",
    dataSnapshot: "snapshot-field-check-17h22m18s.json",
    auditHash: "0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a",
  },
  {
    id: "audit-015",
    time: "2026-05-18 17:30:45",
    actor: "AI异常检测引擎 v3.2.1",
    action: "持续监测更新",
    changes: "流量偏离持续存在，最新采样偏离-11.8%，与处置前无明显改善",
    dataSnapshot: "snapshot-ongoing-monitor-17h30m45s.json",
    auditHash: "0x07a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
  },
  {
    id: "audit-016",
    time: "2026-05-18 18:00:00",
    actor: "监管系统自动巡检 CronAgent",
    action: "时效提醒",
    changes: "当前处置倒计时剩余22小时05分，系统自动发送提醒至责任人",
    dataSnapshot: "snapshot-reminder-18h00m00s.json",
    auditHash: "0x18b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7",
  },
  {
    id: "audit-017",
    time: "2026-05-18 19:15:32",
    actor: "监管值班员 叶西莫夫·铁木尔",
    action: "换班交接记录",
    changes: "记录交班事项，标记事件为当班重点关注项，提醒接班人员跟踪工单进度",
    dataSnapshot: "snapshot-shift-handover-19h15m32s.json",
    auditHash: "0x29c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
  },
];

export const complianceMetrics: ComplianceMetrics = {
  hitlScore: 92,
  approvalChainComplete: true,
  auditCompleteness: 98,
  totalDuration: "7h 45min (截至目前，事件尚未结案)",
  aiActions: 5,
  humanActions: 6,
  systemActions: 6,
};

export const stageTimeStats = [
  { stage: "AI识别异常", duration: "43秒", actor: "AI" },
  { stage: "AI归因分析", duration: "43秒", actor: "AI" },
  { stage: "操作员复核", duration: "1h 45min", actor: "Human" },
  { stage: "AI建议处置", duration: "50秒", actor: "AI" },
  { stage: "人工决策", duration: "2h 26min", actor: "Human" },
  { stage: "工单流转", duration: "55秒", actor: "System" },
  { stage: "处置执行", duration: "进行中", actor: "Human" },
  { stage: "整改复核", duration: "待执行", actor: "Human" },
  { stage: "结案归档", duration: "待执行", actor: "System" },
];
