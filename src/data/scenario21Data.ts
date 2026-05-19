export type TimeSeriesPoint = {
  time: string;
  actual: number;
  predicted: number;
  upperBound: number;
  lowerBound: number;
};

export type AnomalyDetection = {
  id: string;
  title: string;
  metricName: string;
  algorithm: "threshold" | "statistical" | "timeseries-ai";
  severity: "normal" | "watch" | "important" | "critical";
  detectedAt: string;
  confidence: number;
  anomalyStart: string;
  anomalyEnd: string;
  aiExplanation: {
    reason: string;
    evidence: string;
    recommendation: string;
  };
  status: "new" | "reviewing" | "resolved";
};

export type DetectionLayer = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  anomalyCount: number;
};

export const detectionLayers: DetectionLayer[] = [
  {
    id: "layer-threshold",
    name: "简单阈值规则",
    description: "基于行业标准和历史运行参数设定的固定上下限，实时检测明显越限事件。适用于压力、温度、流量等关键安全参数的快速告警。",
    active: true,
    anomalyCount: 2,
  },
  {
    id: "layer-statistical",
    name: "统计趋势分析",
    description: "使用移动平均、标准差带和季节性分解识别偏离正常统计模式的异常。适用于捕捉渐进式漂移和周期性偏离。",
    active: true,
    anomalyCount: 2,
  },
  {
    id: "layer-ts-ai",
    name: "时序大模型预测",
    description: "基于Transformer架构的大语言时序模型，15分钟粒度滚动预测未来2小时趋势，自动标定预测带并识别超出置信区间的异常段。",
    active: true,
    anomalyCount: 1,
  },
];

export const timeSeriesMetrics = [
  {
    id: "metric-flow-kbm",
    name: "3号计量站外输流量",
    unit: "t/d",
    nodeName: "asset-metering-kbm-03",
    currentValue: 6420,
    trend: "down" as const,
    changePercent: -12.0,
  },
  {
    id: "metric-pressure-kbm",
    name: "3号计量站管汇压力",
    unit: "MPa",
    nodeName: "asset-metering-kbm-03",
    currentValue: 5.4,
    trend: "down" as const,
    changePercent: -8.5,
  },
  {
    id: "metric-energy-dunga",
    name: "敦加油气田单位能耗",
    unit: "kWh/t",
    nodeName: "fld-dunga",
    currentValue: 18.6,
    trend: "up" as const,
    changePercent: 6.4,
  },
];

function generateTimeSeries(
  baseActual: number,
  variance: number,
  dropStart: number,
  dropEnd: number,
  dropMagnitude: number,
  spikePoint: number,
  spikeMagnitude: number,
): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  for (let i = 0; i < 96; i++) {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    let actual = baseActual + (Math.sin(i / 8) * variance * 0.3) + (Math.random() - 0.5) * variance * 0.4;

    if (i >= dropStart && i <= dropEnd) {
      const progress = (i - dropStart) / (dropEnd - dropStart);
      actual -= dropMagnitude * progress;
    }

    if (i === spikePoint) {
      actual += spikeMagnitude;
    }

    const predicted = baseActual + Math.sin(i / 8) * variance * 0.3;
    const bandWidth = variance * 0.6 + (i >= dropStart && i <= dropEnd ? dropMagnitude * 0.3 : 0);

    points.push({
      time: timeStr,
      actual: Math.round(actual * 10) / 10,
      predicted: Math.round(predicted * 10) / 10,
      upperBound: Math.round((predicted + bandWidth) * 10) / 10,
      lowerBound: Math.round((predicted - bandWidth) * 10) / 10,
    });
  }
  return points;
}

export const metricFlowData: TimeSeriesPoint[] = generateTimeSeries(6420, 180, 44, 72, 780, 60, -420);
export const metricPressureData: TimeSeriesPoint[] = generateTimeSeries(5.4, 0.3, 48, 76, 0.8, 64, -0.45);
export const metricEnergyData: TimeSeriesPoint[] = generateTimeSeries(18.6, 1.2, 60, 72, 3.5, 0, 0);

export const anomalyDetections: AnomalyDetection[] = [
  {
    id: "ANO-2026-0518-001",
    title: "3号计量站外输流量连续低于预测带",
    metricName: "3号计量站外输流量",
    algorithm: "timeseries-ai",
    severity: "important",
    detectedAt: "2026-05-18 11:30",
    confidence: 0.86,
    anomalyStart: "11:00",
    anomalyEnd: "15:00",
    aiExplanation: {
      reason: "时序大模型预测显示当前流量值持续低于预测带下界超过4个连续15分钟窗口（11:00-12:00），实际值偏离预测均值约11.4%。模型在10:45首次发出黄色信号，11:30升级为橙色预警。",
      evidence: "对比过去14天同时段流量分布，当前流量处于第2百分位以下。管汇压力同步下降8.5%，符合流量-压力耦合特征，排除单传感器故障可能。",
      recommendation: "建议对3号计量站启动现场核查程序，重点排查井口结蜡、井下泵效下降或计量仪表漂移。同步调取近7天井下压力计数据以辅助判断。以上为AI初判建议，需人工复核确认后执行。",
    },
    status: "new",
  },
  {
    id: "ANO-2026-0518-002",
    title: "3号计量站管汇压力突破统计下界",
    metricName: "3号计量站管汇压力",
    algorithm: "statistical",
    severity: "important",
    detectedAt: "2026-05-18 12:00",
    confidence: 0.79,
    anomalyStart: "12:00",
    anomalyEnd: "15:00",
    aiExplanation: {
      reason: "统计趋势分析检测到管汇压力自12:00起跌破2倍标准差下界，偏离幅度-8.5%，且持续超过3个采样窗口。该模式与2025年11月井口结蜡事件的历史特征高度相似。",
      evidence: "压力下降速率与流量下降速率呈正相关（R²=0.91），与正常工况下压力随流量变化的物理关系一致。排除仪表故障：上下游压力传感器交叉验证通过。",
      recommendation: "建议与ANO-001合并复核。如确认井下问题，需通知采油厂制定清蜡或检泵计划。同时考虑加密该站计量采样频率至5分钟以获取更高分辨率数据。",
    },
    status: "new",
  },
  {
    id: "ANO-2026-0518-003",
    title: "敦加油气田夜间能耗轨迹持续抬升",
    metricName: "敦加油气田单位能耗",
    algorithm: "timeseries-ai",
    severity: "watch",
    detectedAt: "2026-05-18 05:15",
    confidence: 0.68,
    anomalyStart: "02:00",
    anomalyEnd: "06:00",
    aiExplanation: {
      reason: "时序大模型在凌晨02:00-06:00窗口检测到单位能耗连续超出预测带上界，抬升幅度约6.4%。虽然偏离幅度未触及橙色阈值，但连续6个窗口的持续性偏离模式值得关注。",
      evidence: "对比同类工况（夜间低负荷）的历史数据，当前能耗值处于近30日第92百分位。排除气温因素：同期环境温度与昨日基本持平。",
      recommendation: "建议保持观察至下一个白天工况窗口。如白班时段能耗回归正常带，可暂不升级；如日间仍偏高，需排查压缩机组效率下降或管网微漏问题。",
    },
    status: "reviewing",
  },
  {
    id: "ANO-2026-0518-004",
    title: "3号计量站单位能耗瞬时突破阈值上限",
    metricName: "3号计量站单位能耗",
    algorithm: "threshold",
    severity: "watch",
    detectedAt: "2026-05-18 13:45",
    confidence: 0.91,
    anomalyStart: "13:45",
    anomalyEnd: "14:00",
    aiExplanation: {
      reason: "简单阈值规则在13:45捕获到单位能耗瞬时突破预设上限（22 kWh/t），该阈值为设备额定效率的115%。虽然仅持续1个窗口，但表明泵组效率可能出现阶跃式下降。",
      evidence: "瞬时能耗峰值与外输流量低谷重合，符合泵组在低效区运行的典型特征。泵组电流监测数据在同时段出现小幅波动。",
      recommendation: "建议将此异常并入ANO-001/ANO-002的联合复核工单，统一现场排查泵组工况和变频器参数设置。",
    },
    status: "new",
  },
  {
    id: "ANO-2026-0518-005",
    title: "CPC管道阿克套段流量标准差异常扩大",
    metricName: "CPC管道阿克套段流量",
    algorithm: "statistical",
    severity: "watch",
    detectedAt: "2026-05-18 09:00",
    confidence: 0.72,
    anomalyStart: "08:00",
    anomalyEnd: "10:00",
    aiExplanation: {
      reason: "统计趋势分析发现08:00-10:00时段流量滚动标准差较前7天同时段均值扩大2.3倍，表明流量稳定性下降。该现象可能反映上游油田产出波动或管道运行模式切换。",
      evidence: "该管道当前处于正常运行模式，无计划内切换操作记录。上游乌津和卡拉姆卡斯两油田产量报告均未出现异常。",
      recommendation: "建议联系CPC管道调度中心确认是否有未记录的操作变更。如排除操作因素，需排查管道内壁结蜡或中间阀门部分卡阻。",
    },
    status: "new",
  },
];

export const timeRangeOptions = [
  { label: "最近 6 小时", value: "6h" },
  { label: "最近 12 小时", value: "12h" },
  { label: "最近 24 小时", value: "24h", default: true },
  { label: "最近 3 天", value: "3d" },
];

export const nodeFilterOptions = [
  { id: "all", name: "全部节点/链路" },
  { id: "asset-metering-kbm-03", name: "3号计量站" },
  { id: "fld-dunga", name: "敦加油气田" },
  { id: "fld-karazhanbas", name: "卡拉让巴斯油田" },
  { id: "node-aktau-port", name: "阿克套港储运节点" },
];
