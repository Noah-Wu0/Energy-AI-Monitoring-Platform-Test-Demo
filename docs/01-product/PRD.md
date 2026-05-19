# 阿克套油田能源作业区 AI 监管闭环 Demo PRD

更新时间：2026 年 5 月 18 日

## 1. 当前判断

本项目已经有一版可运行的多页面前端基础，但前期规划没有把“故事线、数据线、页面线”完整闭合，导致页面实现时容易凭感觉补内容。下一阶段不继续盲目补页面，而是先把 PRD 升级为可执行的演示蓝图。

第一阶段的交付目标调整为：

1. 用一个主监管事件贯穿 8 个演示场景。
2. 明确每页需要什么数据、哪些来自公开资料、哪些必须模拟、模拟数据如何编。
3. 明确每页的核心视觉对象、字段、页面动作和跳转关系。
4. 把工作拆成两条线：Claude Code 负责资料和模拟数据补全；Codex 负责前端静态展示、页面体验和跳转逻辑。

现有 React 页面不直接作为最终方案，而作为“素材池和可运行底稿”。后续每个页面必须先回到本 PRD 对齐，再决定保留、改写或重做。

## 2. 演示总故事

演示主线服务能源部总部监管视角，而不是企业内部设备运维视角。

```text
总部实时看见 -> 点击曼吉斯套州 -> 查看阿克套州域油田/企业网络 -> 定位企业报警 -> 查看报警对象 -> 进入企业详情 -> 时序模型预警 -> 跨系统核验 -> 多 Agent 归因 -> 知识图谱扩展 -> 人在回路审计 -> 自动生成报告
```

主故事固定为一条模拟事件：

> 能源部总部在全国能源态势图中看到曼吉斯套州（即本次讨论中的曼吉斯陶州）阿克套方向出现油田/港储运链路报警。监管人员先点击全国地图中的曼吉斯套州，进入州域二级页面，查看阿克套周边油田、企业、计量站、港口和上下游关系；当其中一家示意企业触发报警时，页面其他区域同步显示报警对象、报警类型、影响链路和建议动作。监管人员点击报警信息后进入该企业详情，再查看计量装置、时序异常、跨系统核验、多 Agent 归因、审计链和监管报告。

这条故事不能写成“AI 已确认违法”。所有判断必须保持为：

- AI 初判。
- 待人工复核。
- 建议核查。
- 可疑线索。
- 模拟演示数据。

## 3. 数据总原则

第一阶段采用：

```text
真实地理边界 + 公开产业背景 + 模拟监管数据 + 模拟 AI 输出
```

### 3.1 可用真实/公开资料

这些资料可以用于建立可信背景、命名和地图结构：

- 哈萨克斯坦全国、州级和曼吉斯套州边界。
- 阿克套港、库雷克港、曼吉斯套州油气产业公开资料。
- Uzen、Kalamkas、Karazhanbas、Dunga 等公开油田名称。
- 阿特劳、巴甫洛达尔、奇姆肯特炼厂等公开产业节点。
- 管道、港口、炼化、石化、出口方向等公开产业链线索。

使用限制：

- 公开资料只用于产业背景和命名参考。
- 不把公开产量、储量、运量写成监管判断。
- 不把真实企业 logo 和模拟异常绑定。

### 3.2 必须模拟的数据

以下数据全部模拟：

- 15 分钟级计量读数。
- SCADA 状态、心跳、延迟、压力、流量。
- 企业报送数据。
- 税务、海关、统计、环保等跨系统申报数据。
- AI 预测带、异常检测结果、置信度。
- Agent 推理过程、证据链、候选原因。
- 人工复核、签批、工单、处置、整改记录。
- 报告正文、数据快照和 AI 生成声明。

模拟规则：

- 主事件 ID 在所有页面保持一致。
- 同一事件的时间、状态、严重程度和数字必须跨页面对齐。
- 所有页面保留 demo 声明。
- AI 输出不得越过人工复核边界。

## 4. 主事件数据骨架

主事件建议统一为：

| 字段 | 建议值 | 用途 |
|---|---|---|
| eventId | `EVT-2026-0518-MG-PORT-001` | 全链路主事件 |
| nationalEventId | `nat-evt-001` | 1.1 全国态势事件 |
| regionDrilldownId | `REG-MG-AKTAU-001` | 曼吉斯套州/阿克套二级页面 |
| enterpriseAlertId | `ENT-ALERT-AKTAU-001` | 企业报警联动事件 |
| anomalyId | `ANO-2026-0518-001` | 2.1 异常检测事件 |
| auditId | `AUD-2026-0518-001` | 4.1 审计链事件 |
| 区域 | 曼吉斯套州 / 阿克套市周边油田与港储运链路 | 主演示区域 |
| 对象 | 州级工业区、阿克套油田作业区、示意企业、计量站、港储运节点、企业报送链路 | 跨页面关联对象 |
| 异常 | 某示意企业关联计量点外输流量连续 4 小时低于预测带 11.4% | 统一剧情 |
| 状态 | 重要 / 待人工复核 | 不写成违法确认 |
| 时间 | 2026-05-18 11:30 首次进入总部视图 | 全链路时间锚点 |
| AI 初判 | 可能存在计量异常、报送延迟或港储运环节异常，建议核查 | 安全表述 |
| 人工动作 | 冻结数据快照、调取档案、发起跨系统核验、形成复核意见 | 人在回路 |

## 5. 页面与故事闭环

### 5.1 1.1 全国能源设施实时态势图

页面定位：总部实时感知入口。

这页回答：能源部总部能否一眼看到全国能源系统此刻是否正常运行。

核心视觉：哈萨克斯坦全国地图，默认展示油气态势，同时保留电力、供暖切换入口。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 全国边界、州级边界 | 真实公开地理数据 | regionId, name, geometry |
| 州级工业区 | 公开产业背景 + mock 状态 | nodeId, name, type, status, riskScore |
| 管输/港口/炼化/出口链路 | 公开产业背景 + mock 流向 | edgeId, from, to, energyType, status |
| KPI | mock | onlineDevices, offlineDevices, activeEvents, dataLatency, lastRefresh |
| 事件流 | mock | eventId, title, location, severity, aiSummary, actionTarget |

页面动作：

- 点击能源类型：地图切换油气、电力、供暖图层。
- 点击曼吉斯套州：进入州域二级页面，查看阿克套油田、企业、计量站、港口和上下游关系。
- 点击事件卡：高亮地图链路，显示建议动作。
- 点击设备/计量节点：进入 1.2 计量装置档案。

演示讲述：

1. 这是能源部总部的全国能源运行入口。
2. 总部不是等企业报表，而是按 15 分钟级看到关键设施和链路状态。
3. 全国层面发现曼吉斯套州报警后，可以直接下钻到阿克套州域企业网络，而不是停留在一个红点。

### 5.2 二级页面：曼吉斯套州 / 阿克套油田与企业网络

页面定位：连接全国态势和具体企业/设备的二级空间页面，是本次事故故事的必经页面。

这页回答：全国地图发现曼吉斯套州事故后，如何看清阿克套市周边油田、企业分布、上下游关系，以及哪个企业、哪个对象正在报警。

核心视觉：曼吉斯套州/阿克套区域地图 + 油田、示意企业、计量站、管输节点、港储运节点和上下游关系拓扑。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 曼吉斯套州边界 | 真实公开地理数据 | geometry |
| 阿克套周边油田节点 | 公开命名 + mock 坐标 | fieldId, name, type, status, operatorRef |
| 示意企业节点 | mock + 公开产业角色参考 | enterpriseId, displayName, role, riskStatus, upstreamIds, downstreamIds |
| 上下游关系 | mock | edgeId, fromEnterpriseId, toEnterpriseId, relationType, materialFlow, status |
| 计量/报警对象 | mock | alertObjectId, objectType, linkedEnterpriseId, deviceId, metric, severity |
| 联动报警信息 | mock AI 输出 | alertId, title, trigger, affectedNodes, aiSummary, recommendedNextStep |

页面动作：

- 点击油田或企业节点：地图高亮其上下游关系，侧栏同步显示企业档案摘要和当前状态。
- 当某企业报警时：地图节点、右侧报警卡、底部时间线和相关上下游边同时高亮。
- 点击报警卡：进入企业下钻页，查看该企业具体情况。
- 点击报警对象中的计量装置：进入 1.2。
- 点击“查看异常曲线”：进入 2.1。

演示讲述：

1. 全国图告诉总部“哪里出事”，二级页告诉总部“这一区域有哪些企业和链路被影响”。
2. 该页不是单纯地图放大，而是把阿克套油田、企业、计量站、港储运和上下游关系放在同一张监管视图里。
3. 报警不是孤立弹窗；企业节点、报警对象、上下游链路和下一步核查入口要同步联动。

### 5.3 企业下钻页：报警企业详情

页面定位：从区域报警进入单个企业的核查页。

这页回答：具体是哪家示意企业触发报警，报警来自什么对象，它的上下游、计量装置、报送数据和风险线索是什么。

核心视觉：企业档案 + 报警对象 + 上下游关系摘要 + 下一步核查入口。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 企业基础档案 | mock | enterpriseId, displayName, industryRole, region, licenseStatus |
| 企业上下游摘要 | mock | upstreamCount, downstreamCount, keyCounterparties, relationRisk |
| 报警对象 | mock | alertObjectId, objectName, objectType, metric, currentValue, baselineValue, deviation |
| 企业关联设备 | mock | deviceId, type, status, lastReading, lastHeartbeat |
| 企业报警摘要 | mock AI 输出 | aiSummary, confidence, requiredHumanReview, recommendedNextStep |

页面动作：

- 点击报警对象：进入 1.2 计量装置在线档案。
- 点击时序曲线入口：进入 2.1。
- 点击跨系统核验入口：进入 2.2。
- 点击知识图谱入口：进入 3.2。

措辞边界：企业页只能写“示意企业”“报警线索”“建议核查”，不得写成真实企业事故定性或违法确认。

### 5.4 1.2 计量装置在线档案

页面定位：实时感知的对象详情页。

这页回答：异常背后的计量装置是否真实存在、是否在线、是否通过检定。

核心视觉：计量装置“在线身份证”。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 装置基础档案 | mock | deviceId, type, model, manufacturer, owner, facilityId |
| 安装与认证 | mock | installLocation, certificateNo, verificationStatus, validUntil |
| 实时状态 | mock | lastReading, unit, commStatus, lastHeartbeat, latency |
| 检定记录 | mock | recordId, date, method, result, inspector, certificateImagePlaceholder |
| 24h 心跳 | mock | timestamp, online, reading |

页面动作：

- 从 1.1 / 区域页进入。
- 点击“查看异常曲线”：进入 2.1。
- 点击“查看证据链”：进入 3.1 或 4.1。

### 5.5 2.1 时序大模型异常检测中心

页面定位：异常预警页，解释为什么系统认为该链路不正常。

这页回答：异常不是一个红点，而是阈值、趋势和预测模型共同发现的信号。

核心视觉：实际值、预测值、预测带、异常区间叠加曲线。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 15 分钟时序曲线 | mock | timestamp, actual, predicted, upperBound, lowerBound |
| 多层检测结果 | mock | layer, result, confidence, explanation |
| 异常清单 | mock | anomalyId, metric, severity, startTime, duration, status |
| AI 解释 | mock AI 输出 | reason, confidence, recommendedAction |

页面动作：

- 点击异常清单：切换曲线和解释面板。
- 点击“调取设备档案”：进入 1.2。
- 点击“跨系统核验”：进入 2.2。
- 点击“启动归因”：进入 3.1。

### 5.6 2.2 跨系统数据交叉验证

页面定位：异常预警的第二条证据线，验证企业报送与其他系统是否逻辑一致。

这页回答：物理计量异常是否能和企业报送、税务、海关、统计等数据互相印证。

核心视觉：企业为中心的数据源关系图。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 企业列表 | mock + 公开命名参考 | enterpriseId, name, region, industryRole |
| 数据源 | mock | sourceId, sourceType, value, unit, period, updatedAt |
| 比对规则 | mock | formulaId, sourceA, sourceB, rule, threshold |
| 矛盾事件 | mock | contradictionId, deviation, amount, severity, aiSuspicion |
| 建议动作 | mock AI 输出 | actionType, actionLabel, requiredHumanReview |

页面动作：

- 点击企业节点：查看所有数据源。
- 点击矛盾连线：展开公式和偏差。
- 点击“加入归因证据”：进入 3.1。
- 点击“查看知识图谱”：进入 3.2。

措辞边界：动作可写“核查、约谈建议、转人工研判”，避免直接把页面写成执法立案结论。

### 5.7 3.1 多 Agent 协同归因分析

页面定位：把异常从“发现”推进到“可解释、可复核”。

这页回答：不同监管职能 Agent 分别调了什么数据、产生了什么证据、主审如何汇总。

核心视觉：Agent 协同流程图 + 候选原因排序 + 证据链。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 锁定异常 | mock | eventId, anomalyId, status, confidence |
| Agent 列表 | mock | agentId, name, role, dataSources, status |
| 推理摘要 | mock AI 输出 | reasoning, output, limitation |
| 候选原因 | mock | causeId, title, probability, supportingEvidenceIds |
| 证据链 | mock | evidenceId, sourceType, sourceName, timestamp, traceableTo |

页面动作：

- 点击 Agent：查看调用数据和输出。
- 点击候选原因：高亮相关证据。
- 点击证据：进入 3.2 看关联对象，或进入 4.1 看审计记录。
- 点击“提交人工复核”：进入 4.1。

### 5.8 3.2 监管知识图谱探索

页面定位：横向扩展能力，用于查看企业、设施、设备、人员、事件之间的关系。

这页回答：单个异常是否牵连到企业关联、历史整改、设备、人员和其他事件。

核心视觉：关系图谱。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 图节点 | mock + 公开命名参考 | nodeId, nodeType, name, riskScore, status |
| 图边 | mock | edgeId, from, to, relationType, strength |
| 节点详情 | mock | attributes, relatedEvents, relatedDocuments |
| 风险路径 | mock AI 输出 | pathId, nodes, riskReason, suggestedReview |

页面动作：

- 搜索企业/设施/设备。
- 点击节点：右侧展示详情。
- 点击风险路径：回到 3.1 作为归因补充，或进入 4.1 形成审计链。

### 5.9 4.1 监管事件全生命周期审计链

页面定位：人在回路和审计治理页。

这页回答：AI 参与监管后，谁在什么时候确认、修改、驳回或签批了什么。

核心视觉：从 AI 识别到归档的生命周期时间轴。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 事件锁定条 | mock | eventId, title, currentStage, owner |
| 生命周期阶段 | mock | stageId, name, actorType, timestamp, status |
| 审计日志 | mock | auditId, action, actor, before, after, hash |
| 人工复核 | mock | reviewer, decision, comment, signatureStatus |
| 合规指标 | mock | hitlScore, auditCompleteness, aiModifiedCount |

页面动作：

- 点击阶段：展开该阶段证据和操作记录。
- 点击人工修改记录：查看 AI 原建议和人工修改理由。
- 点击“生成报告”：进入 4.2。

### 5.10 4.2 分级监管报告自动生成

页面定位：演示收束页，把前面所有数据变成监管输出。

这页回答：同一事件如何沉淀为日报、紧急专报、周报、部长简报，并保留数据来源和人工签批。

核心视觉：报告模板库 + 报告预览 + 数据快照。

关键数据：

| 数据 | 来源类型 | 字段 |
|---|---|---|
| 模板库 | mock | templateId, name, reportLevel, audience, requiredSections |
| 报告正文 | mock AI 输出 | reportId, title, sections, aiGeneratedBlocks |
| 数据快照 | mock | snapshotId, sourceIds, generatedAt, frozenBy |
| 签批流程 | mock | stepId, actor, action, timestamp, comment |
| AI 声明 | mock | aiRatio, humanReviewed, disclaimer |

页面动作：

- 切换报告模板。
- 点击正文 AI 标记：查看引用数据快照。
- 点击签批记录：查看审计链。
- 点击“返回事件全链路”：回到 4.1。

## 6. 页面跳转逻辑

主线跳转：

```text
1.1 全国态势
  -> 二级页面：曼吉斯套州 / 阿克套油田与企业网络
  -> 企业下钻页：报警企业详情
  -> 1.2 计量装置档案
  -> 2.1 时序异常检测
  -> 2.2 跨系统数据交叉验证
  -> 3.1 多 Agent 归因
  -> 3.2 知识图谱探索
  -> 4.1 全生命周期审计链
  -> 4.2 分级监管报告
```

演示可根据时间压缩为：

```text
1.1 -> 曼吉斯套州二级页 -> 企业报警详情 -> 2.1 -> 3.1 -> 4.1 -> 4.2
```

前端路由建议：

| 页面 | 路由 | 入口 |
|---|---|---|
| 首页/旧底稿 | `/` | 仅作参考，不作为正式演示主入口 |
| 1.1 全国态势 | `#/scenario-1-1` | 正式演示入口 |
| 曼吉斯套州二级页 | `#/drill-down-region` | 1.1 地图点击曼吉斯套州 |
| 企业报警详情 | `#/drill-down-company` | 二级页报警卡或企业节点 |
| 1.2 计量档案 | `#/scenario-1-2` | 企业页报警对象、2.1 设备按钮 |
| 2.1 异常检测 | `#/scenario-2-1` | 企业页异常曲线入口、1.2 曲线按钮 |
| 2.2 交叉验证 | `#/scenario-2-2` | 2.1 跨系统核验按钮 |
| 3.1 归因分析 | `#/scenario-3-1` | 2.1/2.2 启动归因按钮 |
| 3.2 知识图谱 | `#/scenario-3-2` | 2.2/3.1 查看关联按钮 |
| 4.1 审计链 | `#/scenario-4-1` | 3.1 提交人工复核按钮 |
| 4.2 报告生成 | `#/scenario-4-2` | 4.1 生成报告按钮 |

跳转验收标准：

- 每页必须有明确下一步按钮。
- 关键事件 ID 在页面间保持一致。
- 进入新页面后，顶部应显示当前锁定事件或对象。
- 1.1 点击曼吉斯套州必须进入二级页，不直接跳过州域网络。
- 二级页企业报警必须联动地图节点、报警卡、上下游边和下一步按钮。
- 点击报警卡必须进入企业详情页。
- 演示主线不依赖浏览器返回键。

## 7. 协作分工

### 7.1 Claude Code：资料和模拟数据线

Claude Code 负责：

- 补齐公开资料索引和 source ledger。
- 说明哪些数据可以从公开资料获得，哪些必须模拟。
- 为每个页面补齐 mock 数据字段。
- 生成或修正 `src/data/scenarioXXData.ts`。
- 保证跨页面 ID、时间、状态、数字一致。
- 输出数据补全说明，标注模拟规则和禁用口径。

Claude Code 不负责：

- 不重构前端组件。
- 不改页面布局和视觉样式。
- 不新增未经 PRD 允许的故事线。
- 不把 AI 初判写成违法确认。

### 7.2 Codex：前端展示和跳转线

Codex 负责：

- 基于 PRD 收敛每页的静态展示重点。
- 判断现有页面保留、改写或重做。
- 统一页面头部、事件锁定条、demo 标注和下一步按钮。
- 建立主线跳转逻辑。
- 保证页面符合 B 端监管系统风格。
- 通过截图和测试验证页面不溢出、不重叠、能完整演示。

Codex 不负责：

- 不凭空扩写监管事实。
- 不绕过数据任务卡直接发明跨系统数据。
- 不继续为炫技补无关交互。

## 8. 风险边界

- 不把 mock 数据包装成真实监管数据。
- 不把 AI 初判写成已确认违规。
- 不从企业设备运维视角替代能源部总部监管视角。
- 不为了炫技堆叠 dashboard、图谱和 Agent 流程。
- 不用真实企业 logo 暗示授权或合作。
- 不展示无法溯源的真实设备坐标。
- 不把公开新闻或公开产业数据直接转成监管证据。

页面统一声明：

```text
演示口径：模拟数据；AI 初判需人工复核；地图边界仅作示意，非官方测绘。
```

## 9. 近期执行顺序

1. Claude Code 先按任务卡补齐主事件数据包和 8 页字段表。
2. Codex 基于补齐后的数据，先重做/收敛 1.1、2.1、4.1、4.2 四个主线页面。
3. 再补 1.2、2.2、3.1、3.2 的静态展示和跳转。
4. 最后做一次全链路演示截图审查，形成“可讲故事”的版本。

第一轮验收只看闭环是否成立：

- 事件是否从 1.1 贯穿到 4.2。
- 每页是否知道自己讲什么。
- 数据是否自洽。
- 跳转是否清楚。
- AI 和人工边界是否安全。
