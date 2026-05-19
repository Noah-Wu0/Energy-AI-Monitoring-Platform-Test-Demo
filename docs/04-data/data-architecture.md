# 数据架构文档 — AI 监管闭环 Demo

更新：2026-05-18

## 1. 数据全景

本项目所有数据均为 TypeScript mock 数据，位于 `src/data/`。零 API 调用、零网络请求。

```
src/data/
├── demoData.ts          # 基础类型定义 + 默认视图（阿克套区域）数据
├── scenario11Data.ts    # 1.1 全国能源设施实时态势图
├── scenario12Data.ts    # 1.2 计量装置在线档案
├── scenario21Data.ts    # 2.1 时序大模型异常检测中心
├── scenario22Data.ts    # 2.2 跨系统数据交叉验证
├── scenario31Data.ts    # 3.1 多 Agent 协同归因分析
├── scenario32Data.ts    # 3.2 监管知识图谱探索
├── scenario41Data.ts    # 4.1 监管事件全生命周期审计链
└── scenario42Data.ts    # 4.2 分级监管报告自动生成
```

## 2. 类型体系

### 2.1 通用基础类型（demoData.ts）

所有场景共用的基础类型，其他文件通过 `import type` 引用：

| 类型 | 用途 | 被哪些场景使用 |
|---|---|---|
| `EnergyNode` | 能源设施节点（油田、炼厂、枢纽等） | 1.1, 3.1 |
| `FlowEdge` | 产业链边（管道、数据报送链路） | 1.1 |
| `AnomalyEvent` | 异常事件 | 1.1 |
| `NodeStatus` | `"normal" \| "watch" \| "important" \| "critical"` | 全部场景 |
| `AuditStep` | 审计步骤 | 默认视图 |

### 2.2 场景专属类型

各场景文件定义自己的扩展类型，加上 `export type` 供组件引用：

| 场景 | 扩展类型 |
|---|---|
| 1.1 | `KpiItem`, `TimelinePoint` |
| 1.2 | `MeteringDevice`, `MeteringDeviceType`, `MeteringCommStatus`, `VerificationRecord`, `MeteringDeviceSummary` |
| 2.1 | `TimeSeriesPoint`, `AnomalyDetection`, `DetectionLayer` |
| 2.2 | `EnterpriseData`, `ContradictionEvent`, `SourceEdge` |
| 3.1 | `AttributionAgent`, `CandidateCause`, `EvidenceItem` |
| 3.2 | `GraphNode`, `GraphEdge`, `RiskContagionPath` |
| 4.1 | `LifecycleStage`, `AuditTrailEntry`, `ComplianceMetrics` |
| 4.2 | `ReportTemplate`, `GeneratedReport`, `DataSnapshot`, `ReportLifecycleStep` |

### 2.3 类型引用规则

```typescript
// 跨场景引用基础类型
import type { NodeStatus } from "./demoData";

// 场景内引用同场景类型
import type { MeteringDevice } from "./scenario12Data";

// 禁止循环引用、禁止场景间互相引用非基础类型
```

## 3. 场景-数据映射

### 3.1 场景 1.1 — 全国能源设施实时态势图

| 数据 | 导出名 | 数量 | 说明 |
|---|---|---|---|
| KPI 指标 | `scenario11Kpis` | 5 | 在线设备 1,842 / 离线 48 / 异常 17 / 延迟 6min / 刷新 15:30 |
| 地图节点 | `scenario11Nodes` | 15 | 5 州级产区 + 3 炼厂 + 4 管输/港口 + 2 石化 + 1 监管节点 |
| 产业链边 | `scenario11Edges` | 15 | 原油/天然气/数据报送链路，from/to 引用节点 ID |
| 事件流 | `scenario11Events` | 3 | 曼吉斯套偏离(重要) / 西哈延迟(观察) / 奇姆肯特恢复(正常) |
| 24h 时间轴 | `scenario11Timeline` | 24 | 每小时事件密度，峰值 11:00-13:00 |
| 节点图标 | `scenario11NodeIcons` | 6 | Lucide 图标映射 |

**ID 前缀规范：** `reg-` (产区), `ref-` (炼厂), `hub-` (枢纽), `pc-` (石化), `nat-` (国家级), `chain-` (链路), `data-` (数据链路), `nat-evt-` (国家级事件)

### 3.2 场景 1.2 — 计量装置在线档案

| 数据 | 导出名 | 数量 | 说明 |
|---|---|---|---|
| 汇总统计 | `scenario12Summary` | 1 | 总计 1,890 / 在线 1,842 / 离线 48 / 观察 14 / 待复核 17 |
| 装置清单 | `meteringDevices` | 10+ | 覆盖电能/天然气/热能/液体流量四种计量类型 |
| 检定记录 | `verificationRecords` | 20 | 每条关联 deviceId，含首次/周期/抽查等多种检定类型 |
| 类型标签 | `deviceTypeLabels` | 4 | 中文显示名映射 |
| 类型单位 | `deviceTypeUnits` | 4 | 每种类型的读数单位 |

**ID 前缀规范：** `EM-` (电能计量), `GM-` (天然气计量), `HT-` (热能计量), `LF-` (液体流量计量)

**与 1.1 的数据对齐：**
- `scenario12Summary.total` (1,890) = 在线 1,842 + 离线 48
- `scenario12Summary.pendingReview` (17) = `scenario11Kpis[2].value` (17)
- 最新刷新时间均为 "15:30"

### 3.3 场景 2.1 — 时序大模型异常检测中心

| 数据 | 导出名 | 说明 |
|---|---|---|
| 检测层 | `detectionLayers` | 3 层：阈值规则、统计趋势、时序大模型 |
| 时序曲线 | `metricFlowData` / `metricPressureData` / `metricEnergyData` | 96 点（24h×15min），含 actual/predicted/upperBound/lowerBound |
| 异常检测 | `anomalyDetections` | 5 条，关联 1.1 的事件（曼吉斯套偏离→ANO-2026-0518-001/002/003/004，CPC 标准差→ANO-2026-0518-005） |
| 时间范围 | `timeRangeOptions` | 6h/12h/24h/3d |
| 节点筛选 | `nodeFilterOptions` | 全部/3号计量站/敦加/卡拉让巴斯/阿克套港 |

**与 1.1/1.2 的数据关联：**
- `ANO-2026-0518-001` 对应 1.1 的 `nat-evt-001`（曼吉斯套偏离），同属主事件 `EVT-2026-0518-MG-PORT-001`
- 时序数据节点 `asset-metering-kbm-03` 对应 1.2 的 `LF-CL-008` 流量计量装置

### 3.4 场景 2.2 — 跨系统数据交叉验证

| 数据 | 导出名 | 数量 | 说明 |
|---|---|---|---|
| 企业数据 | `scenario22Enterprises` | 6 | 涵盖油/气/电/热，每企业 6 个数据源 |
| 数据源边 | `scenario22SourceEdges` | 6 | 偏差率边，连接自报送↔实测/税务/海关/统计/环评 |
| 矛盾事件 | `scenario22ContradictionEvents` | 9 | 涉及金额和行为建议（核查/约谈/立案） |
| 数据源元数据 | `scenario22SourceMeta` | 6 | 颜色和图标映射 |

### 3.5 场景 3.1 — 多 Agent 协同归因分析

| 数据 | 导出名 | 说明 |
|---|---|---|
| 锁定异常 | `scenario31LockedAnomaly` | 曼吉斯套港储运偏离事件 |
| Agent 群 | `scenario31Agents` | 6 个 Agent：审批/报送/检查/处罚/关联/主审 |
| 候选原因 | `scenario31CandidateCauses` | 5 个假设，含概率和证据关联 |
| 证据包 | `scenario31EvidenceItems` | 8 条证据，类型：data/document/system/audit |

**与 1.1/2.1 的数据关联：**
- 锁定异常 ID = `EVT-2026-0518-MG-PORT-001` = 1.1 的 `nat-evt-001` = 2.1 的 `ANO-2026-0518-001`
- `scenario31EvidenceItems[3]` (evi-004) = 1.2 的 `LF-CL-008` 流量计数据跳变记录

### 3.6 场景 3.2 — 监管知识图谱探索

| 数据 | 导出名 | 数量 | 说明 |
|---|---|---|---|
| 图节点 | `graphNodes` | 22 | 企业(7)/设施(4)/设备(4)/人员(4)/事件(5) |
| 图边 | `graphEdges` | 32 | 关系: ownership/operation/violation/rectification/association/transaction |
| 风险传导路径 | `riskContagionPaths` | 4 | 4 条传导链，各有风险等级 |

**与前序场景的数据关联：**
- `event-01` "流量数据连续偏离事件" = 1.1 `nat-evt-001` = 主事件 `EVT-2026-0518-MG-PORT-001`
- `dev-01` "KBM-FM-03A 电磁流量计" 对应 1.2 的 `LF-CL-008` 计量装置
- `fac-01` "3号计量站(KBM-03)" 为 2.1 的核心监测对象

### 3.7 场景 4.1 — 监管事件全生命周期审计链

| 数据 | 导出名 | 说明 |
|---|---|---|
| 事件锁横幅 | `eventLockBanner` | 核心事件 EVT-2026-0518-MG-PORT-001 |
| 生命周期阶段 | `lifecycleStages` | 9 阶段：AI识别→AI归因→复核→AI建议→决策→工单→处置→复核→归档 |
| 审计跟踪 | `auditTrailEntries` | 17 条审计日志，含 SHA 哈希（mock） |
| 合规指标 | `complianceMetrics` | HITL 分数 92，审计完整度 98%，人工操作 6 次/AI 5 次/系统 6 次 |
| 阶段耗时 | `stageTimeStats` | 各阶段耗时分布，AI 秒级 vs 人类小时级 |

**核心数据关联链：**
```
1.1 nat-evt-001 → 2.1 ANO-2026-0518-001 → 3.1 EVT-2026-0518-MG-PORT-001 → 3.2 event-01 → 4.1 EVT-2026-0518-MG-PORT-001
```

### 3.8 场景 4.2 — 分级监管报告自动生成

| 数据 | 导出名 | 数量 | 说明 |
|---|---|---|---|
| 报告模板 | `reportTemplates` | 5 | 日报/周报/月报/紧急专报/部长简报 |
| 已生成报告 | `generatedReports` | 3 | 日报(5/18)、紧急专报(5/17)、周报(W20) |
| 数据快照 | `dataSnapshots` | 5 | 每份报告关联底层快照 |
| 辅助函数 | `getReportsForTemplate()`, `getSnapshotsForReport()`, `getLifecycleSteps()` | 3 | |

**与 1.1 的指标对齐：** 日报中的"在线设备 1,794 台/离线 48 台" = 1.1 KPI "在线 1,842" (含 SCADA 节点等)，报告聚焦计量设备子集。

## 4. 跨场景数据引用关系

### 4.1 主线事件贯穿链路

```
主事件 EVT-2026-0518-MG-PORT-001 "曼吉斯套州/阿克套-库雷克港储运链路外输流量偏离预测带 11.4%"
  ├── [1.1] nat-evt-001 "曼吉斯套港储运链路流量偏离 11.4%" (全国事件流)
  ├── [1.2] LF-CL-008 "卡拉让巴斯计量站流量计" (计量装置档案)
  ├── [2.1] ANO-2026-0518-001 "3号计量站外输流量连续低于预测带" (异常检测)
  ├── [2.1] ANO-2026-0518-002 "管汇压力突破统计下界" (关联异常)
  ├── [2.2] con-001 / ent-001 (跨系统交叉验证)
  ├── [3.1] EVT-2026-0518-MG-PORT-001 (归因分析锁定事件)
  ├── [3.2] event-01 / dev-01 / fac-01 (知识图谱节点)
  ├── [4.1] EVT-2026-0518-MG-PORT-001 (全生命周期审计)
  └── [4.2] rpt-daily-20260518 (日报引用) / rpt-emergency-20260517 (专报引用)
```

### 4.2 ID 交叉引用索引

| ID | 所在文件 | 被引用位置 |
|---|---|---|
| `EVT-2026-0518-MG-PORT-001` | scenario41Data.ts (eventLockBanner) | 全场景主事件 ID |
| `nat-evt-001` | scenario11Data.ts | scenario31Data.ts (locked anomaly cross-ref) |
| `hub-aktau-kuryk-port` | scenario11Data.ts | scenario11Edges, scenario11Events |
| `LF-CL-008` | scenario12Data.ts | scenario21Data.ts (metric-flow-kbm) |
| `asset-metering-kbm-03` | scenario21Data.ts | nodeFilterOptions |
| `ANO-2026-0518-001` | scenario21Data.ts | 主异常检测事件 |
| `ent-001` 等 | scenario22Data.ts | scenario32Data.ts (graph edges) |
| `evi-001` ~ `evi-008` | scenario31Data.ts | scenario31CandidateCauses |

## 5. 数据新增规范

### 5.1 要新增场景数据时

1. 创建 `src/data/scenarioXXData.ts`
2. 从 `demoData.ts` import 基础类型
3. 定义场景专属类型（`export type`）
4. 导出 mock 数据数组
5. 确保 ID 全局唯一，使用场景前缀（见 5.2）
6. 添加 helper 函数用于数据过滤/排序
7. 如果有跨场景引用，使用 ID 字符串引用（不 import 其他场景的数据）
8. 在本文件中追加场景数据描述

### 5.2 ID 前缀规范

| 场景 | 数据对象 | ID 前缀 | 示例 |
|---|---|---|---|
| 1.1 | 产区节点 | `reg-` | `reg-mangystau-caspian` |
| 1.1 | 炼厂节点 | `ref-` | `ref-atyrau` |
| 1.1 | 枢纽/港口 | `hub-` | `hub-aktau-kuryk-port` |
| 1.1 | 石化节点 | `pc-` | `pc-atyrau-petrochem` |
| 1.1 | 国家级节点 | `nat-` | `nat-ministry` |
| 1.1 | 链路 | `chain-` / `data-` | `chain-mangystau-port` |
| 1.1 | 事件 | `nat-evt-` | `nat-evt-001` |
| 1.2 | 电能计量 | `EM-` | `EM-MT-001` |
| 1.2 | 天然气计量 | `GM-` | `GM-FL-003` |
| 1.2 | 热能计量 | `HT-` | `HT-CL-005` |
| 1.2 | 液体流量 | `LF-` | `LF-CL-007` |
| 1.2 | 检定记录 | `VR-` | `VR-001` |
| 2.1 | 异常检测 | `ANO-` | `ANO-2026-0518-001` |
| 2.2 | 企业 | `ent-` | `ent-001` |
| 2.2 | 矛盾事件 | `con-` | `con-001` |
| 3.1 | Agent | `agent-` | `agent-approval` |
| 3.1 | 原因 | `cause-` | `cause-001` |
| 3.1 | 证据 | `evi-` | `evi-001` |
| 3.2 | 图节点 | `ent-`/`fac-`/`dev-`/`person-`/`event-` | `event-01` |
| 4.1 | 审计 | `audit-` | `audit-001` |
| 4.1 | 阶段 | `stage-` | `stage-01` |
| 4.2 | 报告 | `rpt-` | `rpt-daily-20260518` |
| 4.2 | 快照 | `snap-` | `snap-daily-0518` |

### 5.3 数据自洽检查清单

新增或修改数据时，必须验证：

- [ ] ID 全局唯一（同场景内 + 跨场景交叉检查）
- [ ] 引用完整（from/to, nodeId, deviceId 等引用的 ID 存在）
- [ ] 统计对齐（跨页面引用的同一个数字必须一致）
- [ ] 状态一致（同一事件的严重程度在所有页面中相同）
- [ ] 时间合理（审计时间 ≥ 人工复核时间 ≥ AI 检测时间 ≥ 事件发生时间）
- [ ] Demo 标注（所有 mock 数据页面都有免责声明）
- [ ] 命名合规（见 mock-data-strategy.md 命名规则）

## 6. 组件如何引用数据

### 6.1 React 组件引用方式

```typescript
// 场景 1.2 示例
import { meteringDevices, verificationRecords, scenario12Summary, deviceTypeLabels } from "../data/scenario12Data";
import type { MeteringDevice, VerificationRecord } from "../data/scenario12Data";

// 在组件中使用
function MeteringDeviceList() {
  const [devices] = useState<MeteringDevice[]>(meteringDevices);
  // ...
}
```

### 6.2 HTML 设计稿引用方式

HTML 设计稿（`~/.gstack/projects/Ai/designs/`）中的 mock 展示数据应与对应的 TypeScript 数据文件保持一致：
- 装置名称、ID、型号 = 对应 `scenario12Data.ts` 中的记录
- 统计数字 = 对应 `scenario12Summary` 的值
- 事件描述 = 对应各场景事件数据中的 `title` 和 `aiSummary`

## 7. 数据补充优先级

当前各场景数据完整度：

| 场景 | 数据完整度 | 需补充 |
|---|---|---|
| 1.1 | 完整 | — |
| 1.2 | 需补充 | 装置数量少(10台 vs 1,890总量)，需增加代表性样本 |
| 2.1 | 完整 | — |
| 2.2 | 完整 | — |
| 3.1 | 完整 | — |
| 3.2 | 完整 | — |
| 4.1 | 完整 | — |
| 4.2 | 完整 | — |
