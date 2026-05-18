# 首页产业网络数据模型

## 1. 设计原则

- 第一阶段**全部使用模拟数据**。节点名称、企业名称、油田名称参考公开行业实践作为命名灵感，但所有数值（产量、坐标、储量、运量、员工数等）均为模拟生成，不与任何真实企业运营数据对应
- 数据模型分三层：概览（州级）→ 企业/作业区 → 设备/事件
- 所有 demo 数据标注为模拟，页面全局标注"数据为模拟演示，不反映真实运营状态"
- TypeScript 类型草案，后续映射到 mock 数据生成器

## 2. 节点类型（Node Types）

### 2.1 上游节点（Upstream）

| 节点类型 | 英文标识 | 图标建议 | 说明 |
|---|---|---|---|
| 油田 | `oil_field` | 油井/井架图标 | 原油开采作业区 |
| 气田 | `gas_field` | 气焰图标 | 天然气开采作业区 |
| 油气田（兼探） | `oil_gas_field` | 混合图标 | 同时产出原油和天然气的作业区 |

### 2.2 中游节点（Midstream）

| 节点类型 | 英文标识 | 图标建议 | 说明 |
|---|---|---|---|
| 原油管道节点 | `crude_pipeline_node` | 管道阀门图标 | 管道起止点、分输站、阀室 |
| 天然气管道节点 | `gas_pipeline_node` | 管道阀门图标（蓝色） | 输气管道关键节点 |
| 泵站 | `pump_station` | 泵图标 | 原油管道增压站 |
| 压缩站 | `compressor_station` | 压缩机图标 | 天然气管道增压站 |
| 计量站 | `metering_station` | 仪表图标 | 贸易交接/厂际计量站 |
| 储运基地 | `storage_terminal` | 储罐图标 | 原油/成品油储罐区 |
| 港口 | `port` | 锚/船图标 | 原油/成品油装船码头（阿克套港、库里克港） |

### 2.3 下游节点（Downstream）

| 节点类型 | 英文标识 | 图标建议 | 说明 |
|---|---|---|---|
| 炼化企业 | `refinery` | 蒸馏塔图标 | 原油加工/炼油厂 |
| 化工企业 | `chemical_plant` | 反应器图标 | 石化产品生产（聚乙烯、聚丙烯、沥青等） |
| 天然气处理厂 | `gas_processing_plant` | 分离器图标 | 天然气净化、LNG/CNG |

### 2.4 监管与事件节点（Regulatory & Event）

| 节点类型 | 英文标识 | 图标建议 | 说明 |
|---|---|---|---|
| 监管报送节点 | `regulatory_node` | 盾牌/公文图标 | 企业向能源部报送数据的逻辑节点 |
| 异常事件节点 | `anomaly_event` | 警告三角图标 | AI 检测到的异常事件 |
| 人工复核节点 | `human_review` | 人形/眼睛图标 | 人工确认/驳回的记录 |

## 3. 连线类型（Edge Types）

### 3.1 物理流（Physical Flow）

| 连线类型 | 英文标识 | 线条样式 | 说明 |
|---|---|---|---|
| 原油输送 | `crude_oil_flow` | 实线，深棕色 | 油田 → 储运 → 港口/炼厂 |
| 天然气输送 | `natural_gas_flow` | 实线，蓝色 | 气田 → 处理厂 → 管道外输 |
| 成品油输送 | `refined_product_flow` | 虚线，橙色 | 炼厂 → 储运/消费 |
| 电力供应 | `power_supply` | 虚线，黄色 | 电网 → 作业区/泵站 |

### 3.2 信息流（Information Flow）

| 连线类型 | 英文标识 | 线条样式 | 说明 |
|---|---|---|---|
| 数据报送 | `data_reporting` | 点线，灰色 | 作业区/企业 → 监管节点 |
| 监管核验 | `regulatory_verification` | 点划线，绿色 | 监管节点 → 企业（核验指令） |
| 异常关联 | `anomaly_correlation` | 虚线，红色 | 异常事件 → 关联设备/作业区 |

## 4. 下钻层级数据字段

### 4.1 州级（Region Level）

```typescript
interface RegionOverview {
  regionId: string; // e.g., "KAZ.6_1"
  regionName: string; // e.g., "曼吉斯套州 (Mangystau)"
  regionNameEn: string;
  regionNameKk: string;
  centerCoordinates: [number, number]; // [lng, lat] 行政中心
  totalOilFields: number;
  totalGasFields: number;
  activeAnomalies: number; // 当前活跃异常数
  dailyProductionOilTons: number; // 日产原油（吨，模拟值）
  dailyProductionGasCubicMeters: number; // 日产天然气（立方米，模拟值）
  enterpriseCount: number; // 监管企业数
  pipelineLengthKm: number; // 境内管道总长（公里，模拟值）
}
```

### 4.2 企业/作业区（Enterprise / Field Level）

```typescript
interface EnterpriseNode {
  enterpriseId: string;
  enterpriseName: string; // e.g., "Mangistaumunaigas JSC"
  enterpriseNameEn: string;
  enterpriseType: 'oil_producer' | 'gas_producer' | 'refinery' | 'pipeline_operator'
    | 'port_operator' | 'storage_operator' | 'chemical_plant';
  parentRegionId: string;
  coordinates: [number, number]; // [lng, lat] 模拟坐标
  operatedFields: string[]; // 关联油田 fieldIds
  status: 'normal' | 'warning' | 'critical';
  complianceScore: number; // 0-100 合规评分（模拟）
  lastReportedAt: string; // ISO 8601，最近一次数据报送时间（模拟）
  activeAnomalyCount: number;
  annualProductionOilTons: number; // 年产量（模拟）
  annualProductionGasCubicMeters: number; // 年产量（模拟）
  employeeCount: number; // 员工数（模拟）
}
```

### 4.3 油田/气田（Field Level）

```typescript
interface FieldNode {
  fieldId: string;
  fieldName: string; // e.g., "Uzen", "Kalamkas", "Karazhanbas"
  fieldNameEn: string;
  fieldType: 'oil_field' | 'gas_field' | 'oil_gas_field';
  operatorEnterpriseId: string; // 运营企业
  parentRegionId: string;
  parentDistrictId: string; // GADM level-2 district
  coordinates: [number, number];
  discoveryYear: number;
  productionStartYear: number;
  estimatedReservesMillionTons: number; // 估算储量（百万吨，模拟）
  currentDailyProductionTons: number; // 当前日产量（模拟）
  wellCount: number; // 井数（模拟）
  status: 'normal' | 'warning' | 'critical';
  enhancedRecoveryMethods: string[]; // 提高采收率措施
}
```

### 4.4 设备/管道节点（Asset / Pipeline Node Level）

```typescript
interface AssetNode {
  assetId: string;
  assetName: string;
  assetType: 'pump_station' | 'compressor_station' | 'metering_station'
    | 'storage_tank' | 'wellhead' | 'pipeline_segment' | 'port_berth';
  parentEnterpriseId: string;
  parentFieldId?: string;
  coordinates: [number, number];
  status: 'normal' | 'warning' | 'critical';
  lastInspectionDate: string; // ISO 8601
  nextInspectionDue: string;
  telemetryEnabled: boolean; // 是否远程遥测
  currentFlowRate?: number; // 当前流量（如适用）
  currentPressure?: number; // 当前压力（如适用）
  anomalyHistory: string[]; // 关联异常事件 ID 列表
}
```

### 4.5 管道连线（Pipeline Edge）

```typescript
interface PipelineEdge {
  edgeId: string;
  edgeType: 'crude_oil_flow' | 'natural_gas_flow' | 'refined_product_flow';
  pipelineName: string;
  pipelineNameEn: string;
  fromNodeId: string;
  toNodeId: string;
  lengthKm: number; // 长度（公里，模拟）
  diameterMm: number; // 管径（毫米，模拟）
  annualCapacityMillionTons: number; // 年输送能力（百万吨，模拟）
  operationalSince: number; // 投产年份
  operatorEnterpriseId: string;
  status: 'normal' | 'warning' | 'critical';
  currentFlowRateTonsPerDay: number; // 当前日输送量（模拟）
}
```

### 4.6 异常事件（Anomaly Event）

```typescript
interface AnomalyEvent {
  eventId: string;
  eventType: 'flow_deviation' | 'pressure_anomaly' | 'metering_drift'
    | 'compliance_delay' | 'emission_exceedance' | 'unauthorized_operation';
  severity: 'info' | 'warning' | 'critical';
  detectedAt: string; // ISO 8601，AI 检测时间
  sourceNodeId: string; // 源节点（设备/作业区）
  relatedNodeIds: string[]; // 关联节点
  aiAssessment: string; // AI 初判描述
  aiConfidence: number; // 0-1
  humanReviewStatus: 'pending' | 'confirmed' | 'dismissed' | 'escalated';
  humanReviewerId?: string;
  humanReviewNotes?: string;
  humanReviewedAt?: string;
  auditTrail: AuditEntry[];
}
```

## 5. Mock 数据示例（全部模拟）

> 以下所有数值、坐标、产量、储量均为模拟数据。油田名称和企业名称参考公开行业信息作为命名灵感，但与真实企业运营数据无任何对应关系。

### 5.1 曼吉斯套州概况

```typescript
const mockMangystauOverview: RegionOverview = {
  regionId: "KAZ.6_1",
  regionName: "曼吉斯套州 (Mangystau)",
  regionNameEn: "Mangystau Region",
  regionNameKk: "Маңғыстау облысы",
  centerCoordinates: [51.17, 43.65], // 模拟坐标
  totalOilFields: 15,
  totalGasFields: 3,
  activeAnomalies: 2,
  dailyProductionOilTons: 46800, // 模拟
  dailyProductionGasCubicMeters: 1700000, // 模拟
  enterpriseCount: 7,
  pipelineLengthKm: 650,
};
```

### 5.2 油田节点

```typescript
const mockFields: FieldNode[] = [
  {
    fieldId: "fld-uzen",
    fieldName: "乌津油田 (Uzen)",
    fieldNameEn: "Uzen",
    fieldType: "oil_gas_field",
    operatorEnterpriseId: "ent-ozenmunaigas",
    parentRegionId: "KAZ.6_1",
    parentDistrictId: "KAZ.6.1_1",
    coordinates: [52.0, 43.35],
    discoveryYear: 1965,
    productionStartYear: 1967,
    estimatedReservesMillionTons: 150,
    currentDailyProductionTons: 14400, // 模拟
    wellCount: 3200,
    status: "normal",
    enhancedRecoveryMethods: ["聚合物驱", "酸化", "新钻井"],
  },
  {
    fieldId: "fld-kalamkas",
    fieldName: "卡拉姆卡斯油田 (Kalamkas)",
    fieldNameEn: "Kalamkas",
    fieldType: "oil_field",
    operatorEnterpriseId: "ent-mangistaumunaigas",
    parentRegionId: "KAZ.6_1",
    parentDistrictId: "KAZ.6.2_1",
    coordinates: [51.5, 44.3],
    discoveryYear: 1976,
    productionStartYear: 1979,
    estimatedReservesMillionTons: 60,
    currentDailyProductionTons: 10000, // 模拟
    wellCount: 1800,
    status: "normal",
    enhancedRecoveryMethods: ["水力压裂", "侧钻水平井"],
  },
  {
    fieldId: "fld-karazhanbas",
    fieldName: "卡拉让巴斯油田 (Karazhanbas)",
    fieldNameEn: "Karazhanbas",
    fieldType: "oil_field",
    operatorEnterpriseId: "ent-karazhanbasmunai",
    parentRegionId: "KAZ.6_1",
    parentDistrictId: "KAZ.6.5_1",
    coordinates: [51.3, 44.9],
    discoveryYear: 1974,
    productionStartYear: 1979,
    estimatedReservesMillionTons: 40,
    currentDailyProductionTons: 7400, // 模拟
    wellCount: 1500,
    status: "warning", // 模拟：近期产量波动
    enhancedRecoveryMethods: ["蒸汽驱", "蒸汽吞吐"],
  },
  {
    fieldId: "fld-dunga",
    fieldName: "敦加油田 (Dunga)",
    fieldNameEn: "Dunga",
    fieldType: "oil_gas_field",
    operatorEnterpriseId: "ent-dunga-operating",
    parentRegionId: "KAZ.6_1",
    parentDistrictId: "KAZ.6.5_1",
    coordinates: [50.8, 44.5],
    discoveryYear: 1966,
    productionStartYear: 1977,
    estimatedReservesMillionTons: 106,
    currentDailyProductionTons: 1860, // 模拟
    wellCount: 200,
    status: "normal",
    enhancedRecoveryMethods: [],
  },
];
```

### 5.3 管道连线

```typescript
const mockPipelines: PipelineEdge[] = [
  {
    edgeId: "pipe-uzen-zhetybay-aktau",
    edgeType: "crude_oil_flow",
    pipelineName: "乌津-热特拜-阿克套原油管道",
    pipelineNameEn: "Uzen-Zhetybay-Aktau Oil Pipeline",
    fromNodeId: "fld-uzen",
    toNodeId: "node-aktau-port",
    lengthKm: 141.6,
    diameterMm: 700,
    annualCapacityMillionTons: 9,
    operationalSince: 1966,
    operatorEnterpriseId: "ent-kaztransoil",
    status: "normal",
    currentFlowRateTonsPerDay: 14400, // 模拟
  },
  {
    edgeId: "pipe-kalamkas-karazhanbas-aktau",
    edgeType: "crude_oil_flow",
    pipelineName: "卡拉姆卡斯-卡拉让巴斯-阿克套原油管道",
    pipelineNameEn: "Kalamkas-Karazhanbas-Aktau Oil Pipeline",
    fromNodeId: "fld-kalamkas",
    toNodeId: "node-aktau-port",
    lengthKm: 264.5,
    diameterMm: 530,
    annualCapacityMillionTons: 7,
    operationalSince: 1979,
    operatorEnterpriseId: "ent-kaztransoil",
    status: "normal",
    currentFlowRateTonsPerDay: 10000, // 模拟
  },
];
```

### 5.4 异常事件

```typescript
const mockAnomaly: AnomalyEvent = {
  eventId: "evt-2026-05-18-001",
  eventType: "flow_deviation",
  severity: "warning",
  detectedAt: "2026-05-18T08:30:00+05:00",
  sourceNodeId: "fld-karazhanbas",
  relatedNodeIds: ["pipe-kalamkas-karazhanbas-aktau", "asset-metering-kbm-03"],
  aiAssessment: "卡拉让巴斯油田 3 号计量站外输流量连续 4 小时低于基准值 12%，初步判断可能原因：井口结蜡或泵效下降，需人工核查。",
  aiConfidence: 0.78,
  humanReviewStatus: "pending",
  auditTrail: [],
};
```

## 6. 后续扩展建议

- 所有坐标、产量、储量等数值均为模拟，后续如需引入真实数据需重新生成 mock 数据集
- `anomalyEvent` 应连接到时序数据生成器，确保异常曲线和事件卡片数据一致
- 企业节点可补充管理层级（母公司-KMG → 子公司 → 作业区-具体油田），层级关系可参考公开企业架构作为命名灵感
