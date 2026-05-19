# Claude Code 任务卡：主事件资料与模拟数据补全

## 任务名称

补齐能源部 AI 监管闭环 demo 的资料索引、模拟数据字段和跨页面主事件数据包。

## 背景

当前项目已有可运行多页面前端，但故事线、数据线和页面跳转尚未完全闭合。下一步需要先把资料和 mock 数据补齐，再由 Codex 收敛前端展示和跳转逻辑。

本任务只处理资料和数据，不处理前端页面实现。

## 输入文件

- `docs/01-product/PRD.md`
- `docs/01-product/scenario-cards.md`
- `docs/04-data/mock-data-strategy.md`
- `docs/04-data/data-architecture.md`
- `docs/04-data/energy-network-data-model.md`
- `docs/research/2026-05-18-kazakhstan-oil-gas-industry-chain.md`
- `docs/research/kazakhstan-national-oil-supply-chain-nodes.md`
- `docs/research/kazakhstan-national-gas-power-heating-nodes.md`
- `src/data/demoData.ts`
- `src/data/scenario11Data.ts`
- `src/data/scenario12Data.ts`
- `src/data/scenario21Data.ts`
- `src/data/scenario22Data.ts`
- `src/data/scenario31Data.ts`
- `src/data/scenario32Data.ts`
- `src/data/scenario41Data.ts`
- `src/data/scenario42Data.ts`

## 输出文件

- `docs/04-data/main-event-data-pack.md`
- `docs/04-data/source-and-mock-ledger.md`
- 更新必要的 `src/data/scenarioXXData.ts`
- 如需记录缺口，更新 `docs/04-data/data-architecture.md`

## 允许修改

- `docs/04-data/`
- `src/data/`

## 禁止修改

- `src/components/`
- `src/styles.css`
- `src/styles-scenario-*.css`
- `src/App.tsx`
- `docs/02-design/`
- `docs/06-handoff/` 中除本任务产出的交接补充外的旧任务卡

## 需求说明

### 1. 建立主事件数据包

围绕统一主事件补齐数据：

- 事件：曼吉斯套州 / 阿克套-库雷克港储运链路连续 4 小时外输流量低于预测带 11.4%。
- 统一 ID：`EVT-2026-0518-MG-PORT-001`。
- 状态：重要 / 待人工复核。
- 口径：AI 初判，不得写成已确认违法或已确认违规。

主事件必须贯穿：

```text
1.1 全国态势
-> 曼吉斯套州 / 阿克套二级页
-> 企业报警详情页
-> 1.2 计量装置档案
-> 2.1 时序异常检测
-> 2.2 跨系统数据交叉验证
-> 3.1 多 Agent 归因
-> 3.2 知识图谱探索
-> 4.1 全生命周期审计链
-> 4.2 分级监管报告
```

### 1.1 补齐二级州域和企业报警数据

必须为以下两个前端页面补齐数据，即使它们不属于 8 个编号场景：

#### 曼吉斯套州 / 阿克套二级页

用途：从全国概览点击曼吉斯套州后，展示阿克套市周边油田、示意企业、计量站、港储运节点和上下游关系。

需要补齐：

- 州域节点：油田、示意企业、计量站、港口/储运、管输节点。
- 企业分布：每个示意企业的位置、产业角色、状态、关联油田/计量站/港口。
- 上下游关系：企业之间、企业与油田/港储运之间的 mock flow edge。
- 报警联动：当某个企业报警时，需要能同步高亮企业节点、报警对象、上下游边和右侧报警卡。

建议数据对象：

- `regionDrilldownNodes`
- `regionEnterpriseNodes`
- `regionFlowEdges`
- `regionAlertCards`
- `regionSelectedAlert`

#### 企业报警详情页

用途：点击二级页报警卡后，进入具体示意企业，查看企业档案、报警对象、关联设备、上下游摘要和后续核查入口。

需要补齐：

- 企业基础档案。
- 企业上下游摘要。
- 报警对象：具体是什么在报警，例如某计量站、某流量计、某管输节点或某报送链路。
- 报警指标：当前值、基准值、偏差、时间、严重程度。
- 关联设备：用于跳转 1.2。
- 关联异常：用于跳转 2.1。
- 跨系统核验入口：用于跳转 2.2。

建议数据对象：

- `enterpriseDetail`
- `enterpriseAlertObject`
- `enterpriseRelatedDevices`
- `enterpriseUpstreamDownstreamSummary`
- `enterpriseNextActions`

### 2. 补齐来源与模拟账本

输出 `docs/04-data/source-and-mock-ledger.md`，至少包含：

- 数据对象。
- 所属页面。
- 来源类型：真实地理边界 / 公开产业背景 / 模拟监管数据 / 模拟 AI 输出。
- 是否需要公开来源引用。
- 是否进入前端字段。
- mock 生成规则。
- 禁止表述。

### 3. 补齐每页字段表

每个场景至少补齐：

- 页面核心对象。
- 主事件关联 ID。
- 页面要展示的字段。
- 字段类型。
- 示例值。
- mock 规则。
- 跨页面引用关系。

除 8 个编号场景外，还必须补齐：

- 曼吉斯套州 / 阿克套二级页字段表。
- 企业报警详情页字段表。
- 二级页报警卡到企业详情页的 ID 映射。
- 企业详情页到 1.2、2.1、2.2 的 ID 映射。

### 4. 修正现有 mock 数据风险

重点检查并修正：

- “AI 初判确认异常模式”这类过强表述。
- “高度疑似旁路盗采或私接管线”这类近似执法定性表述。
- “生成预警审计工单并立案”这类越过人工决策边界的动作。
- 真实企业名称与模拟异常直接绑定的风险。
- 跨页面数字不一致。
- 同一事件 ID 不一致。
- 二级页报警对象与企业详情页报警对象不一致。
- 全国页点击曼吉斯套州后缺少州域企业网络承接。

建议改成：

- “AI 初判发现异常模式，需人工复核”。
- “存在需核查的异常线索”。
- “建议转人工研判 / 建议发起核查流程”。
- “示意企业 / Demo 企业 / 企业 A”。

## 验收标准

- 8 个页面都有字段表。
- 主事件 ID、时间、状态、严重程度在所有数据文件中一致。
- 每个 mock 字段都能说明为什么需要编、怎么编。
- 所有 AI 输出都有“需人工复核”的边界。
- 不修改前端组件和样式。
- `npm test` 通过。
- `npm run build` 通过。

## 交接备注

完成后请输出：

1. 修改了哪些数据文件。
2. 哪些字段是公开资料支撑。
3. 哪些字段是纯 mock。
4. 哪些页面还缺前端承接。
5. 哪些数字需要 Codex 在页面里同步展示。
