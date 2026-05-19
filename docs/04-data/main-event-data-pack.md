# 主事件数据包

更新：2026-05-18

## 1. 主事件定义

| 字段 | 值 |
|---|---|
| **统一事件 ID** | `EVT-2026-0518-MG-PORT-001` |
| **事件名称** | 曼吉斯套州 / 阿克套-库雷克港储运链路外输流量连续偏离预测带 |
| **区域** | 曼吉斯套州 (Mangystau) / 阿克套-库雷克港储运链路 |
| **核心异常** | 外输流量连续 4 小时低于预测带 11.4% |
| **首次检测时间** | 2026-05-18 11:30 (UTC+5) |
| **严重程度** | 重要 (IMPORTANT) |
| **状态** | 待人工复核 |
| **AI 初判结论** | 可能存在计量异常、报送延迟或港储运环节运行偏差，建议核查 |
| **口径** | AI 初判，不得写成已确认违法或已确认违规 |

## 2. 全场景 ID 映射

主事件 ID 在不同场景中的对应 ID：

| 场景 | 场景内 ID | 用途 |
|---|---|---|
| 1.1 全国态势 | `nat-evt-001` | 右侧事件流第一条，曼吉斯套港储运链路流量偏离 |
| 1.2 计量档案 | `LF-CL-008` | 卡拉让巴斯计量站流量计，关联异常源 |
| 2.1 异常检测 | `ANO-2026-0518-001` | 3号计量站外输流量连续低于预测带 |
| 2.1 关联异常 | `ANO-2026-0518-002` | 管汇压力突破统计下界（与 ANO-001 合并复核） |
| 2.2 交叉验证 | `con-001` | 自报送 vs 海关报关偏差 9.48%，涉及企业 ent-001 |
| 3.1 归因分析 | `scenario31LockedAnomaly` | 锁定异常对象，启动多 Agent 归因 |
| 3.2 知识图谱 | `event-01` | 图节点：流量数据连续偏离事件 |
| 4.1 审计链 | `EVT-2026-0518-MG-PORT-001` | eventLockBanner 主事件 ID |
| 4.2 报告 | `rpt-daily-20260518` | 日报引用主事件偏离数据 |

### 贯穿链路

```
[1.1] nat-evt-001 "曼吉斯套港储运链路流量偏离 11.4%"
  ├── [1.2] LF-CL-008 "卡拉让巴斯计量站流量计" (计量装置档案)
  ├── [2.1] ANO-2026-0518-001 "3号计量站外输流量连续低于预测带" (异常检测)
  ├── [2.1] ANO-2026-0518-002 "管汇压力突破统计下界" (关联异常)
  ├── [2.2] con-001 / ent-001 (跨系统交叉验证)
  ├── [3.1] scenario31LockedAnomaly (归因分析锁定事件)
  ├── [3.2] event-01 / dev-01 / fac-01 (知识图谱节点)
  ├── [4.1] EVT-2026-0518-MG-PORT-001 (全生命周期审计)
  └── [4.2] rpt-daily-20260518 (日报引用) / rpt-emergency-20260517 (专报引用)
```

## 3. 按场景字段表

### 3.1 场景 1.1 — 全国能源设施实时态势图

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| KPI 条 | 全局 | onlineDevices | number | 1,842 | 固定值，与 1.2 summary 对齐 | 1.2 total-online-offline |
| KPI 条 | 全局 | offlineDevices | number | 48 | 固定值 | 1.2 |
| KPI 条 | 全局 | activeEvents | number | 17 | 固定值 | 1.2 pendingReview |
| KPI 条 | 全局 | dataLatency | string | "6 分钟" | 固定值 | — |
| KPI 条 | 全局 | lastRefresh | string | "15:30" | 固定值 | 1.2, 4.2 |
| 地图节点 | 曼吉斯套里海通道 | reg-mangystau-caspian | EnergyNode | status=important, anomalyCount=5 | 模拟坐标+公开命名 | 2.1, 3.1 |
| 地图节点 | 阿克套-库雷克港储运 | hub-aktau-kuryk-port | EnergyNode | status=important, anomalyCount=3 | 模拟坐标+公开命名 | 2.1 |
| 管路连线 | 主事件链 | chain-mangystau-port | FlowEdge | variance=-11.4, status=important | 模拟 | 2.1 ANO-001 |
| 事件流 | nat-evt-001 | title/severity/aiSummary | AnomalyEvent | "曼吉斯套州港储运链路流量偏离" | 固定剧情 | 2.1, 3.1, 4.1 |

### 3.2 场景 1.2 — 计量装置在线档案

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 汇总统计 | 全量 | total/online/offline/watch/pendingReview | MeteringDeviceSummary | 1890/1842/48/14/17 | 与 1.1 KPI 对齐 | 1.1 KPI |
| 装置 LF-CL-008 | 主事件异常源 | deviceId/name/model/status | MeteringDevice | "卡拉让巴斯计量站流量计", status=important | 模拟装置档案 | 2.1, 3.1 evi-004 |
| 装置 LF-CL-008 | 主事件异常源 | currentReading | number | 6421.8 t/d | 与 demoData flowRate 对齐 | demoData |
| 装置 LF-CL-008 | 主事件异常源 | commStatus | MeteringCommStatus | "degraded" | 模拟通信恶化 | 2.1 |
| 装置 LF-CL-008 | 主事件异常源 | calibrationExpiry | string | "2026-07-29" | 模拟校准周期末期 | 3.1 evi-007 |
| 检定记录 VR-016/017 | LF-CL-008 | result/date/inspectorNotes | VerificationRecord | "conditional" 零点漂移偏大 | 模拟 | 3.1 evi-007 |

### 3.3 场景 2.1 — 时序大模型异常检测中心

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 时序曲线 | ANO-001 | metricFlowData (96点) | TimeSeriesPoint[] | actual/predicted/upperBound/lowerBound | generateTimeSeries(6420, 180, 44, 72, 780, ...) | 1.2 LF-CL-008 读数 |
| 异常检测 | ANO-2026-0518-001 | title/severity/confidence | AnomalyDetection | severity=important, confidence=0.86 | 固定剧情 | 1.1 nat-evt-001 |
| 异常检测 | ANO-2026-0518-002 | title/severity | AnomalyDetection | "管汇压力突破统计下界" | 与 ANO-001 关联 | 1.1 nat-evt-001 |
| AI 解释 | ANO-001 | aiExplanation.reason | string | "实际值偏离预测均值达 12%" | 模拟 AI 输出 | — |
| AI 解释 | ANO-001 | aiExplanation.recommendation | string | "建议对3号计量站进行现场核查…需人工复核确认" | 模拟 AI 输出 | 3.1, 4.1 |
| 检测层 | 全部 | detectionLayers | DetectionLayer[] | 阈值/统计/时序大模型 | 固定配置 | — |

### 3.4 场景 2.2 — 跨系统数据交叉验证

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 企业数据 | ent-001 | dataSources[6] | EnterpriseData | 自报送/电表实测/税务/海关/统计/环评 | 模拟多源数据 | 3.1, 3.2 |
| 矛盾事件 | con-001 | sourceA/sourceB/deviationRate | ContradictionEvent | 自报送 vs 海关, deviation=9.48% | 模拟偏差 | 3.1 evi-005 |
| 矛盾事件 | con-001 | aiSuspicionScore | number | 87 | 模拟 AI 评分 | — |
| 矛盾事件 | con-001 | suggestedAction | "核查" \| "约谈" \| "转人工研判" | "核查" | 禁止"立案" | 4.1 |
| 数据源边 | edge-self-customs | from/to/formula/deviationRate | SourceEdge | deviationRate=9.48, status=important | 模拟 | — |

### 3.5 场景 3.1 — 多 Agent 协同归因分析

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 锁定异常 | EVT-2026-0518-MG-PORT-001 | title/severity/confidence/summary | object | 偏离 11.4%, important, 0.78 | 与 1.1/2.1 对齐 | 1.1 nat-evt-001, 2.1 ANO-001 |
| Agent 列表 | agent-inspect | reasoning/output | AttributionAgent | "CPC方向管线呈现部分堵塞特征" | 模拟 Agent 推理 | 2.1 |
| Agent 列表 | agent-submit | reasoning/output | AttributionAgent | "企业报送数据存在8-12小时延迟" | 模拟 Agent 推理 | 2.2 |
| 候选原因 | cause-001 | description/probability/evidenceIds | CandidateCause | 概率 0.87, 物理异常 | 模拟贝叶斯推断 | 4.1 |
| 证据包 | evi-001 ~ evi-008 | type/title/source/summary/traceableTo | EvidenceItem | data/document/system/audit | 模拟证据链 | 1.2, 2.1, 2.2 |

### 3.6 场景 3.2 — 监管知识图谱探索

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 图节点 | event-01 | name/type/status/riskScore | GraphNode | "流量数据连续偏离事件", event, important, 82 | 模拟 | 1.1, 2.1, 4.1 |
| 图节点 | dev-01 | name/type/status/riskScore | GraphNode | "KBM-FM-03A 电磁流量计", device, important, 68 | 模拟 | 1.2 LF-CL-008 |
| 图节点 | fac-01 | name/type/status/riskScore | GraphNode | "3号计量站 (KBM-03)", facility, important, 72 | 模拟 | 2.1 |
| 图边 | edge-05/07 | from/to/relationship/strength | GraphEdge | ent-04→event-01, violation, 0.88 | 模拟 | 3.1 |
| 风险路径 | path-01 | nodeIds/riskLevel/description | RiskContagionPath | "计量校准逾期→流量偏离→关联交易" | 模拟 AI 输出 | 3.1, 4.1 |

### 3.7 场景 4.1 — 监管事件全生命周期审计链

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 事件锁定条 | EVT-2026-0518-MG-PORT-001 | eventId/title/currentStage/registeredAt | object | 当前阶段: 人工决策 | 与 1.1/3.1 对齐 | 全部前序场景 |
| 生命周期阶段 | stage-01 ~ stage-09 | name/actor/timestamp/status/description | LifecycleStage[] | AI识别→归因→复核→建议→决策→工单→处置→复核→归档 | 模拟全流程 | 3.1 Agent 输出 |
| 审计日志 | audit-001 ~ audit-017 | action/actor/changes/auditHash | AuditTrailEntry[] | 17条带SHA哈希的操作记录 | 模拟哈希 | 全部场景 |
| 合规指标 | — | hitlScore/auditCompleteness/aiActions/humanActions | ComplianceMetrics | HITL 92, 审计完整度 98% | 模拟指标 | 4.2 |

### 3.8 场景 4.2 — 分级监管报告自动生成

| 页面核心对象 | 主事件关联 | 字段 | 类型 | 示例值 | mock 规则 | 跨页面引用 |
|---|---|---|---|---|---|---|
| 报告模板 | tpl-daily/emergency/weekly/monthly/minister | name/type/schedule | ReportTemplate[] | 5 种模板 | 模拟 | — |
| 日报 | rpt-daily-20260518 | content/aiDeclaration/humanApproval | GeneratedReport | 曼吉斯套偏离从-11.4%恢复至-7.8% | 模拟报告正文 | 1.1 KPI, 4.1 审计 |
| 数据快照 | snap-daily-0518 | keyMetrics | DataSnapshot | 8 项关键指标 | 模拟 | 1.1 KPI |
| AI 声明 | — | aiRatio/humanReviewed/disclaimer | string | "AI生成比例约35%，经人工审核签批" | 固定声明 | — |

## 4. 跨页面数字对齐表

| 数据项 | 1.1 | 1.2 | 2.1 | 2.2 | 3.1 | 3.2 | 4.1 | 4.2 |
|---|---|---|---|---|---|---|---|---|
| 在线设备数 | 1,842 | 1,842 (online) | — | — | — | — | — | 1,794 (计量子集) |
| 离线设备数 | 48 | 48 (offline) | — | — | — | — | — | 48 |
| 异常数 | 17 | 17 (pendingReview) | 5 (ANO) | 9 (con) | 5 (cause) | 5 (event) | — | 3 (日报) |
| 数据延迟 | 6 min | — | — | — | — | — | — | 6 min |
| 刷新时间 | 15:30 | 15:30 | — | — | — | — | — | 15:30 |
| 主事件偏离 | -11.4% | — | -12% (ANO-001) | 9.48% (con-001) | -11.4% | — | — | -11.4%→-7.8% |
| 主事件置信度 | 0.78 | — | 0.86 (ANO-001) | 87 (con-001) | 0.78 | — | 0.78 | — |
| 主事件严重程度 | important | important (LF-CL-008) | important | important | important | important | important | — |

## 5. Mock 生成规则摘要

| 数据类型 | 生成方式 | 说明 |
|---|---|---|
| 15 分钟时序数据 | `generateTimeSeries(baseActual, variance, ...)` | 正弦波 + 随机噪声 + 指定窗口内线性下降 |
| 心跳数据 | 24 点数组，固定衰减模式 | 正常装置 0.90-1.00 / 异常装置 0.50→0 |
| 企业多源数据 | 以自报送为基准 ± 2%-12% 偏差 | 6 个数据源，偏差方向体现剧情需要 |
| Agent 推理文本 | 固定模板 | 每个 Agent 固定 reasoning + output |
| 审计哈希 | `0x` + 40 位十六进制 | 模拟 SHA-256 哈希 |
| 人名 | 哈萨克语常见名+姓组合 | 均为虚构模拟人名 |
| 企业名 | "示意节点" / "Demo" 后缀 | 不绑定真实企业 |

## 6. 禁止表述清单

以下表述在所有数据文件中禁止出现：

- "AI 已确认" / "AI 确认" / "系统判定"
- "违法" / "违规" / "非法" / "盗采" / "旁路"
- "立案" / "处罚" / "罚款" / "吊销"
- "真实" / "实际" / "官方" (修饰监管数据时)
- 真实企业名称与模拟异常直接绑定
- 真实坐标标注为精确值

应使用：

- "AI 初判发现异常模式，需人工复核"
- "存在需核查的异常线索"
- "建议转人工研判" / "建议发起核查流程"
- "示意企业" / "Demo 企业" / "企业 A"
- "模拟坐标" / "示意位置"

## 7. 页面 Demo 声明

全局声明（所有页面）：

```text
演示口径：模拟数据；AI 初判需人工复核；地图边界仅作示意，非官方测绘。
```

地图页补充：
```text
地图边界仅作示意，非官方测绘。
```

AI 面板补充：
```text
AI 初判仅供人工复核参考。
```

报告页补充：
```text
本报告由模拟数据生成，用于演示流程。
```
