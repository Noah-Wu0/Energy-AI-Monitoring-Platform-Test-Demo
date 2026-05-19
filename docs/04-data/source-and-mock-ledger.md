# 来源与模拟数据账本

更新：2026-05-18

## 1. 数据分层总览

```
L1 真实地理边界 ──── 地图底图和行政边界
L2 公开产业背景 ──── 油田/管道/炼厂命名、产业链拓扑
L3 模拟监管数据 ──── 计量读数、SCADA、报送、税务、海关、统计
L4 模拟 AI 输出 ──── 预测带、异常检测、归因推理、报告正文
```

## 2. 数据对象台账

### 2.1 地理边界数据 (L1)

| 数据对象 | 所属页面 | 来源类型 | 公开来源引用 | 进入前端字段 | 说明 |
|---|---|---|---|---|---|
| 哈萨克斯坦全国边界 | 1.1 | 真实公开地理数据 | GADM (gadm.org) | regionId, geometry | TopoJSON/GeoJSON |
| 州级边界 | 1.1, 区域下钻 | 真实公开地理数据 | GADM | regionId, geometry | 14州+3直辖市 |
| 曼吉斯套州边界 | 1.1 下钻 | 真实公开地理数据 | GADM | geometry | 文件: mangystau-region-v1.geojson |
| 曼吉斯套区级边界 | 区域下钻 | 真实公开地理数据 | GADM | geometry | 文件: mangystau-districts-v1.geojson |

### 2.2 产业背景数据 (L2)

| 数据对象 | 所属页面 | 来源类型 | 公开来源引用 | 进入前端字段 | 说明 |
|---|---|---|---|---|---|
| 油田名称 (Uzen/Kalamkas/Karazhanbas/Dunga 等) | 1.1, 1.2, 3.2 | 公开产业背景 | KMG 年报, GEM.wiki | name, subtitle | 仅用作命名参考 |
| Tengiz/Kashagan/Karachaganak 等 | 1.1 | 公开产业背景 | KMG 年报, 行业期刊 | name | 全国油田节点命名 |
| 三大炼厂名称 | 1.1 | 公开产业背景 | KMG 年报 | name | Atyrau/Pavlodar/Shymkent |
| 管道命名 (CPC/UAS/中哈/BBS等) | 1.1 | 公开产业背景 | GEM.wiki, KMG 年报 | label | 管线名称 |
| 阿克套港/库雷克港 | 1.1, 3.2 | 公开产业背景 | 行业报道 | name | 港口节点 |
| 石化厂名称 (KPI/Caspi Bitum等) | 1.1 | 公开产业背景 | KMG PetroChem | name | 下游节点 |
| 产业链拓扑关系 | 1.1 | 公开产业背景 | 研究文档 | from/to | 连接关系 |

### 2.3 模拟监管数据 (L3)

| 数据对象 | 所属页面 | 来源类型 | 公开来源引用 | 进入前端字段 | mock 生成规则 |
|---|---|---|---|---|---|
| KPI 指标 (在线/离线/异常/延迟) | 1.1 | 模拟监管数据 | 不需要 | label, value, unit, subtitle | 固定值，跨页面对齐 |
| 15 分钟时序流量数据 | 2.1 | 模拟监管数据 | 不需要 | timestamp, actual, predicted, upperBound, lowerBound | `generateTimeSeries(baseActual, variance, dropStart, dropEnd, ...)` |
| 计量装置档案 | 1.2 | 模拟监管数据 | 不需要 | deviceId, name, model, manufacturer, certNumber, installLocation | 虚构装置型号+虚构证书号 |
| 计量装置实时状态 | 1.2 | 模拟监管数据 | 不需要 | currentReading, commStatus, lastCollectionTime, calibrationExpiry | 模拟读数+模拟通信状态 |
| 24h 心跳数据 | 1.2 | 模拟监管数据 | 不需要 | heartbeatData[].time, value | 24 点数组，正常 0.90-1.00，异常递减 |
| 检定记录 | 1.2 | 模拟监管数据 | 不需要 | id, deviceId, date, type, result, certUrl, inspectorNotes | 虚构检定机构+虚构日期 |
| SCADA 遥测数据 | 2.1 | 模拟监管数据 | 不需要 | pressure, flowRate, variance | 模拟值 |
| 企业报送数据 | 2.2 | 模拟监管数据 | 不需要 | source: "self_report", value, unit, period | 以自报送为基准，其他源 ±2%-12% |
| 税务申报数据 | 2.2 | 模拟监管数据 | 不需要 | source: "tax", value | 模拟税务数据 |
| 海关报关数据 | 2.2 | 模拟监管数据 | 不需要 | source: "customs", value | 模拟海关数据 |
| 统计报表数据 | 2.2 | 模拟监管数据 | 不需要 | source: "stats", value | 模拟统计数据 |
| 环评监测数据 | 2.2 | 模拟监管数据 | 不需要 | source: "env", value | 模拟环评数据 |
| 证据包 | 3.1 | 模拟监管数据 | 不需要 | id, type, title, source, timestamp, summary, traceableTo | 固定剧情证据，traceableTo 指向虚构系统 |
| 审计日志 | 4.1 | 模拟监管数据 | 不需要 | id, time, actor, action, changes, auditHash | 固定剧情+模拟SHA哈希 |
| 数据快照 | 4.2 | 模拟监管数据 | 不需要 | id, name, timeRange, keyMetrics | 固定快照ID+模拟指标 |
| 事件流 | 1.1 | 模拟监管数据 | 不需要 | id, title, nodeId, severity, detectedAt, aiSummary | 3条固定事件 |
| 24h 时间轴 | 1.1 | 模拟监管数据 | 不需要 | hour, count, status | 固定模式，11:00-13:00 峰值 |

### 2.4 模拟 AI 输出 (L4)

| 数据对象 | 所属页面 | 来源类型 | 公开来源引用 | 进入前端字段 | mock 生成规则 |
|---|---|---|---|---|---|
| AI 预测带 | 2.1 | 模拟 AI 输出 | 不需要 | predicted, upperBound, lowerBound | 正弦波 ± 动态带宽 |
| 异常检测结果 | 2.1 | 模拟 AI 输出 | 不需要 | aiExplanation.reason, evidence, recommendation | 固定模板文本 |
| 异常检测置信度 | 2.1 | 模拟 AI 输出 | 不需要 | confidence | 固定值 0.68-0.91 |
| AI 矛盾评分 | 2.2 | 模拟 AI 输出 | 不需要 | aiSuspicionScore | 固定值 34-92 |
| Agent 推理过程 | 3.1 | 模拟 AI 输出 | 不需要 | reasoning, output | 固定模板，不得越界 |
| 候选原因概率 | 3.1 | 模拟 AI 输出 | 不需要 | probability | 固定值 0.19-0.87 |
| 风险传导路径 | 3.2 | 模拟 AI 输出 | 不需要 | riskLevel, description | 固定 4 条路径 |
| AI 初判总结 | 1.1, 3.1 | 模拟 AI 输出 | 不需要 | aiSummary, summary | 固定文本 |
| 报告 AI 生成块 | 4.2 | 模拟 AI 输出 | 不需要 | [AI_GENERATED] 段落 | 固定报告模板+[AI_GENERATED]标记 |
| AI 声明 | 4.2 | 模拟 AI 输出 | 不需要 | aiDeclaration, aiDisclaimer | 固定声明文本 |

### 2.5 模拟人工操作数据 (L3)

| 数据对象 | 所属页面 | 来源类型 | 公开来源引用 | 进入前端字段 | mock 生成规则 |
|---|---|---|---|---|---|
| 人工复核记录 | 4.1 | 模拟监管数据 | 不需要 | reviewer, decision, comment | 虚构人名+虚构决定 |
| 签批流程 | 4.2 | 模拟监管数据 | 不需要 | stepId, actor, action, timestamp | 5步固定流程 |
| 处置工单 | 4.1 | 模拟监管数据 | 不需要 | 工单ID, 责任人, 时限 | 虚构工单 |
| 知识图谱节点(人) | 3.2 | 模拟监管数据 | 不需要 | person-01 ~ person-04 | 虚构哈萨克人名 |

## 3. 来源引用汇总

| 编号 | 来源 | 用途 | 公开可达 |
|---|---|---|---|
| S01 | GADM (gadm.org) | 行政边界地理数据 | 是 |
| S02 | KMG 2024 年报 (ar2024.kmg.kz) | 油田/管道/产量公开参考 | 是 |
| S03 | GEM.wiki | 油田/管道技术参数交叉验证 | 是 |
| S04 | KMG 官网 (kmg.kz) | 项目参数、石化进展 | 是 |
| S05 | CPC 官网 (cpc.ru) | 管道和终端参数 | 是 |
| S06 | KazTransOil 官网 | 管网参数 | 是 |
| S07 | The Astana Times | 产量和运量最新报道 | 是 |
| S08 | Interfax Kazakhstan / Kursiv | 行业事件报道 | 是 |
| S09 | KEGOC 官网 (kegoc.kz) | 全国输电网参数 | 是 |
| S10 | QazaqGaz / Intergas Central Asia | 天然气管网数据 | 是 |

所有来源仅用于 Demo 产业背景和命名参考，不构成监管结论。

## 4. 前端字段映射

### 4.1 进入前端组件的数据字段

| 场景 | 组件 | 引用数据变量 | 关键字段 |
|---|---|---|---|
| 1.1 | NationalMap | scenario11Nodes, scenario11Edges | id, name, coordinates, status, flowRate |
| 1.1 | KpiBar | scenario11Kpis | label, value, unit, subtitle |
| 1.1 | EventStream | scenario11Events | id, title, severity, aiSummary, suggestedAction |
| 1.1 | BottomTimeline | scenario11Timeline | hour, count, status |
| 1.2 | DeviceList | meteringDevices | id, name, model, status, currentReading, commStatus |
| 1.2 | VerificationPanel | verificationRecords | id, deviceId, date, type, result |
| 2.1 | TimeSeriesChart | metricFlowData, metricPressureData, metricEnergyData | time, actual, predicted, upperBound, lowerBound |
| 2.1 | AnomalyPanel | anomalyDetections | id, title, severity, confidence, aiExplanation |
| 2.2 | EnterpriseGraph | scenario22Enterprises, scenario22ContradictionEvents | enterpriseId, dataSources, deviationRate, aiSuspicionScore |
| 3.1 | AgentWorkflow | scenario31Agents, scenario31CandidateCauses | reasoning, output, probability, evidenceIds |
| 3.1 | EvidencePanel | scenario31EvidenceItems | type, title, source, summary, traceableTo |
| 3.2 | KnowledgeGraph | graphNodes, graphEdges, riskContagionPaths | id, name, type, x, y, riskScore, relationship |
| 4.1 | LifecycleTimeline | lifecycleStages, auditTrailEntries | name, actor, timestamp, action, auditHash |
| 4.1 | CompliancePanel | complianceMetrics | hitlScore, auditCompleteness, aiActions, humanActions |
| 4.2 | ReportPreview | generatedReports, reportTemplates | title, content, aiDeclaration, humanApproval |
| 4.2 | SnapshotPanel | dataSnapshots | keyMetrics, timeRange, dataVersion |

### 4.2 仅文档/不进入前端的字段

| 字段 | 文件 | 用途 |
|---|---|---|
| 数据架构文档 | data-architecture.md | 开发者参考 |
| Mock 策略说明 | mock-data-strategy.md | 数据治理规范 |
| 主事件数据包 | main-event-data-pack.md | 跨场景一致性检查 |
| 本账本 | source-and-mock-ledger.md | 来源追溯 |
| 研究文档 | research/*.md | 产业背景参考 |

## 5. 禁止表述完整清单

### 5.1 绝对禁止

以下表述在任何数据文件中不得出现：

| 禁止表述 | 原因 | 替代表述 |
|---|---|---|
| "AI 确认异常模式" | AI 不能做确认性判断 | "AI 初判发现异常模式，需人工复核" |
| "AI 已确认"/"系统判定" | 越过人工边界 | "AI 初判为…" |
| "违法"/"违规"/"非法" | 执法定性 | "存在需核查的异常线索" |
| "盗采"/"旁路盗采"/"私接管线" | 犯罪指控 | "存在未匹配流量差" |
| "立案" | 执法决策 | "建议转人工研判" / "建议发起核查" |
| "处罚"/"罚款"/"吊销" | 执法结果 | "建议约谈" / "建议核查" |
| "虚报"/"骗补"/"偷税" | 法律定性 | "报送数据与实测存在偏差" |
| "真实"/"实际"/"官方" (修饰 mock 数据) | 误导性表述 | 标注"模拟" / "Demo" |
| "KMZ"/"KMG"/"CNPC"等真实企业缩写+异常绑定 | 声誉风险 | "示意企业 A" / "Demo 企业" |

### 5.2 需要人工复核边界标记的 AI 输出

所有 AI 输出段落必须包含以下标记之一：

- "AI 初判，需人工复核"
- "AI 生成内容，仅供参考"
- "[AI_GENERATED] … 经人工审核"
- "AI 初判仅供人工复核参考"

## 6. Demo 声明标注规则

| 页面类型 | 标注位置 | 声明内容 |
|---|---|---|
| 地图页 (1.1, 区域下钻) | 地图右下角 | "地图边界仅作示意，非官方测绘。数据为模拟演示。" |
| 数据页 (1.2, 2.1, 2.2) | 页面顶部全局条 | "Demo 数据，非真实监管数据。AI 初判需人工复核。" |
| AI 面板 (2.1, 2.2, 3.1) | AI 输出区域上方 | "AI 初判仅供人工复核参考。" |
| 归因页 (3.1) | 每个 Agent 输出 | "AI 推理过程，待人工确认" |
| 审计页 (4.1) | 审计链顶部 | "模拟监管事件全生命周期记录。" |
| 报告页 (4.2) | 报告正文末尾 | "本报告由模拟数据生成，用于演示流程。" |
| 知识图谱 (3.2) | 图谱右下角 | "模拟关系网络，非真实关联。" |
