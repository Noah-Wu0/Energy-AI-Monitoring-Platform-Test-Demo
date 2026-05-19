import { useI18n } from "./I18nContext";

/**
 * Big lookup table mapping Chinese data strings to English.
 * When we can't find an entry, the caller should still call t()
 * which falls back to the key (Chinese) in zh mode.
 */
const dataEn: Record<string, string> = {
  // ---- Overview stats (demoData.ts) ----
  "监管企业": "Regulated Enterprises",
  "活跃异常": "Active Anomalies",
  "审计链完整率": "Audit Chain Completion",
  "+2 本周纳入": "+2 This Week",
  "1 项待人工复核": "1 Pending Review",
  "模拟数据": "Simulated Data",
  "需人工确认": "Requires Human Confirmation",

  // ---- Energy nodes ----
  "乌津油田示意节点": "Uzen Oil Field (Demo)",
  "上游开采 / Uzen": "Upstream / Uzen",
  "卡拉姆卡斯油田示意节点": "Kalamkas Oil Field (Demo)",
  "上游开采 / Kalamkas": "Upstream / Kalamkas",
  "卡拉让巴斯油田示意节点": "Karazhanbas Oil Field (Demo)",
  "异常源 / Karazhanbas": "Anomaly Source / Karazhanbas",
  "敦加油气田示意节点": "Dunga Oil & Gas Field (Demo)",
  "油气混合 / Dunga": "Oil & Gas / Dunga",
  "阿克套港储运节点": "Aktau Port Storage Node",
  "中游储运 / Aktau Port": "Midstream / Aktau Port",
  "3 号计量站": "Metering Station No. 3",
  "流量与能耗采集": "Flow & Energy Collection",
  "州能源局监管节点": "Oblast Energy Bureau Node",
  "州级报送 / 现场复核": "Oblast Reporting / Site Review",

  // ---- Flow edges ----
  "原油输送": "Crude Oil Pipeline",
  "计量采集": "Metering Collection",
  "监管报送": "Regulatory Reporting",
  "能耗报送": "Energy Reporting",
  "4 分钟": "4 min",
  "6 分钟": "6 min",
  "11 分钟": "11 min",
  "8 分钟": "8 min",

  // ---- Map layer stats ----
  "在线计量点": "Online Metering Points",
  "2 个延迟": "2 Delayed",
  "管线运行": "Active Pipelines",
  "5 条": "5 pipelines",
  "1 条偏离": "1 Deviated",
  "AI 观察窗": "AI Watch Window",
  "滚动预测": "Rolling Forecast",
  "待复核证据包": "Evidence Packs Pending",
  "3 份": "3 packs",
  "已冻结": "Frozen",

  // ---- Pipeline status ----
  "原油": "Crude Oil",
  "能耗": "Energy",

  // ---- Evidence items ----
  "15 分钟流量序列": "15-min Flow Sequence",
  "系统取证": "System Forensics",
  "单位能耗预测带": "Unit Energy Forecast Band",
  "已生成": "Generated",
  "AI 服务": "AI Service",
  "近 24 小时报送记录": "Last 24h Reporting Records",
  "已归档": "Archived",
  "监管节点": "Regulatory Node",
  "巡检工单": "Inspection Work Order",
  "待补充": "Pending Supplement",
  "人工复核": "Human Review",

  // ---- Anomaly events ----
  "外输流量连续偏离基准": "Export Flow Continuously Deviates from Baseline",
  "发起人工复核，调取近 24 小时流量、压力、能耗曲线与巡检记录。": "Initiate human review; retrieve last 24h flow, pressure, energy curves and inspection records.",
  "夜间能耗轨迹轻微异常": "Nighttime Energy Trajectory Slight Anomaly",
  "敦加油气田夜间能耗曲线与近 14 日同类工况相比出现轻微抬升，尚不足以形成确定性结论。": "Dunga field nighttime energy curve shows slight elevation vs last 14-day baseline. Insufficient for definitive conclusion.",
  "保持观察，等待下一轮报送后由值班人员决定是否并入复核清单。": "Keep under observation; duty officer decides whether to include in review queue after next reporting cycle.",
  "夜间能耗轨迹轻微异常，敦加油气田等": "Nighttime Energy Anomaly — Dunga Field",
  "已确认": "Confirmed",
  "待复核": "Pending Review",
  "升级处理中": "Under Escalation",

  // ---- Region enterprise nodes ----
  "示意企业 A / 卡拉让巴斯作业单元": "Demo Enterprise A / Karazhanbas Ops",
  "连接卡拉让巴斯油田和 3 号计量站，本轮报警的企业侧承接对象。": "Links Karazhanbas field to Metering Station No. 3. Enterprise-side recipient of this alert cycle.",
  "示意企业 B / 卡拉姆卡斯作业单元": "Demo Enterprise B / Kalamkas Ops",
  "上游开采节点，当前无活跃报警。": "Upstream production node. No active alerts.",
  "示意企业 C / 乌津作业单元": "Demo Enterprise C / Uzen Ops",
  "阿克套方向稳定供给节点。": "Stable supply node in Aktau direction.",
  "3 号计量站 / KBM-03": "Metering Station No. 3 / KBM-03",
  "报警对象所在计量节点，外输流量连续低于预测带。": "Alerted metering node. Export flow continuously below forecast band.",
  "阿克套港储运示意节点": "Aktau Port Storage (Demo)",
  "中游港储运节点，需与计量站数据合并核查。": "Midstream port node. Verify jointly with metering station data.",
  "州能源局监管接入点": "Oblast Energy Bureau Access Point",
  "州级报送和人工复核入口。": "Oblast reporting and human review entry point.",

  // ---- Region flow edges ----
  "外输计量": "Export Metering",
  "港储运链路": "Port Storage Link",
  "原油外输": "Crude Oil Export",

  // ---- Region alert cards ----
  "示意企业 A 关联计量点外输流量偏离": "Demo Enterprise A — Metering Point Export Flow Deviation",
  "3 号计量站外输流量连续 4 小时低于预测带 11.4%": "Metering Station No. 3 export flow 11.4% below forecast for 4 consecutive hours",
  "查看企业报警详情并调取计量装置档案。": "View enterprise alert details and retrieve metering device archive.",

  // ---- Enterprise detail ----
  "上游开采与外输计量承接方": "Upstream Production & Export Metering Aggregator",
  "曼吉斯套州 / 阿克套方向": "Mangystau Oblast / Aktau Direction",
  "示意许可有效，需核查本次报警对应作业记录": "Demo license valid; must verify operational records for this alert",

  // ---- Enterprise alert object ----
  "3 号计量站流量计 / LF-CL-008": "Metering Station No.3 Flow Meter / LF-CL-008",
  "外输流量": "Export Flow",
  "6,421.8 t/d": "6,421.8 t/d",
  "预测带下沿约 7,250 t/d": "Forecast Band ~7,250 t/d",

  // ---- Enterprise related devices ----
  "3 号计量站流量计": "Metering Station No.3 Flow Meter",
  "液体流量计": "Liquid Flow Meter",
  "1 号主储油罐液位计": "Main Tank No.1 Level Gauge",
  "液位计": "Level Gauge",
  "稳定": "Stable",
  "11 分钟前": "11 min ago",
  "4 分钟前": "4 min ago",

  // ---- Enterprise next actions ----
  "查看计量装置档案": "View Metering Device Archive",
  "核对 LF-CL-008 的证书、校准有效期、通信状态和最近心跳。": "Verify LF-CL-008 certificate, calibration, communication status, and recent heartbeat.",
  "查看异常曲线": "View Anomaly Curves",
  "查看实际值、预测带和异常时间窗口。": "View actual values, forecast bands, and anomaly time windows.",
  "进入跨系统核验": "Enter Cross-System Verification",
  "比对企业报送、计量实测、税务、海关和统计口径。": "Compare enterprise reports, metering, tax, customs, and statistical data.",
  "查看关系图谱": "View Relationship Graph",
  "查看企业、设备、事件和上下游关系。": "View enterprise, device, event, and upstream/downstream relationships.",

  // ---- Audit trail ----
  "AI 初判": "AI Preliminary Assessment",
  "识别流量偏离与单位能耗抬升，生成复核建议。": "Detected flow deviation and energy increase. Generated review recommendation.",
  "冻结 24 小时计量、压力、能耗曲线与报送记录。": "Froze 24h metering, pressure, energy curves and reporting records.",
  "监管人员确认是否转入企业核查或关闭观察。": "Regulatory officer confirms escalation to enterprise audit or closes observation.",
  "保存 AI 判断、人工意见、证据包和处置结论。": "Preserved AI judgment, human opinion, evidence pack, and disposition conclusion.",
  "待处理": "Pending",
  "待生成": "Pending Generation",

  // "审计留痕": "Audit Trail",
  "审计留痕": "Audit Trail",

  // ---- S11 KPIs ----
  "在线设备数": "Online Devices",
  "最近 15 分钟正常回传": "Normal last 15 min",
  "离线设备数": "Offline Devices",
  "最近 15 分钟未回传": "No data last 15 min",
  "异常数": "Anomalies",
  "需观察、复核或升级": "Review / Escalate",
  "数据延迟": "Data Latency",
  "计量点到总部中位数": "Median field-to-HQ",
  "最近刷新": "Last Refresh",
  "15 分钟刷新机制": "15-min refresh cycle",

  // ---- S11 National nodes ----
  "阿特劳油气工业带": "Atyrau Oil & Gas Zone",
  "州级工业区 / Tengiz、Kashagan 汇聚": "Oblast Zone / Tengiz, Kashagan Hub",
  "曼吉斯套里海通道": "Mangystau Caspian Corridor",
  "州级工业区 / 油田、储运、港口外输": "Oblast Zone / Oil Fields, Storage, Port Export",
  "西哈州凝析气工业区": "West KZ Gas Condensate Zone",
  "州级工业区 / Karachaganak 气凝析链": "Oblast Zone / Karachaganak Gas Condensate Chain",
  "阿克托别油气工业区": "Aktobe Oil & Gas Zone",
  "州级工业区 / 西北油气与管输接入": "Oblast Zone / NW Oil & Gas Pipeline Access",
  "克孜勒奥尔达油区": "Kyzylorda Oil Zone",
  "州级工业区 / Kumkol 及南部外输链": "Oblast Zone / Kumkol & Southern Export Chain",
  "阿特劳炼厂": "Atyrau Refinery",
  "下游炼化 / 西部加工节点": "Downstream / Western Processing",
  "巴甫洛达尔炼厂": "Pavlodar Refinery",
  "下游炼化 / 北部加工节点": "Downstream / Northern Processing",
  "奇姆肯特炼厂": "Shymkent Refinery",
  "下游炼化 / 南部加工节点": "Downstream / Southern Processing",
  "阿塔苏管输枢纽": "Atasu Pipeline Hub",
  "中游枢纽 / 中哈管道分输站": "Midstream Hub / CN Pipeline Distribution",
  "阿克套-库雷克港储运": "Aktau-Kuryk Port Terminal",
  "港口/储运 / 里海出口与中游汇聚": "Port/Storage / Caspian Export & Midstream Hub",
  "阿拉山口出口节点": "Alashankou Export Node",
  "边境/出口 / 中哈原油管道": "Border/Export / CN-KZ Crude Pipeline",
  "萨马拉出口方向": "Samara Export Direction",
  "边境/出口 / UAS 北向交接": "Border/Export / UAS North Transfer",
  "阿特劳石化集群": "Atyrau Petrochemical Cluster",
  "石化/加工 / Karabatan 产业区": "Petrochem / Karabatan Industrial Zone",
  "里海沥青工厂": "Caspian Bitumen Plant",
  "重质油加工 / 阿克套下游节点": "Heavy Oil / Aktau Downstream",
  "能源部监管接入节点": "Ministry of Energy Regulatory Node",
  "监管/数据 / 总部接入与事件汇聚": "Regulatory/Data / HQ Access & Event Aggregation",

  // ---- S11 Edge labels ----
  "西部上游 → 阿特劳炼化": "Western Upstream → Atyrau Refining",
  "伴生气 → 石化原料": "Associated Gas → Petrochem Feedstock",
  "里海北部 → 港口外输": "North Caspian → Port Export",
  "曼吉斯套产区 → 港储运": "Mangystau → Port Storage",
  "重质油 → 沥青加工": "Heavy Oil → Bitumen Processing",
  "西北气凝析 → 西部汇聚": "NW Gas Condensate → Western Hub",
  "西北产区 → 南部油区": "NW Production → Southern Oil Zone",
  "南部油区 → 奇姆肯特炼化": "Southern Oil → Shymkent Refining",
  "Kumkol → Atasu": "Kumkol → Atasu",
  "中哈原油管道 → 阿拉山口": "CN-KZ Crude Pipeline → Alashankou",
  "UAS 北向出口": "UAS North Export",
  "全国炼化保障线": "National Refining Support Line",
  "州级数据报送": "Oblast Data Reporting",
  "边境计量数据": "Border Metering Data",
  "异常证据包报送": "Anomaly Evidence Package",
  "5 分钟": "5 min",
  "2 分钟": "2 min",
  "3 分钟": "3 min",
  "7 分钟": "7 min",
  "9 分钟": "9 min",

  // ---- S11 Events ----
  "曼吉斯套州港储运链路流量偏离": "Mangystau Port Storage Link Flow Deviation",
  "西哈州凝析气工业区数据心跳延迟": "West KZ Gas Condensate Zone Data Heartbeat Delay",
  "奇姆肯特炼厂进料波动恢复正常": "Shymkent Refinery Feed Fluctuation Normalized",
  "压力波动已回到阈值范围内，系统自动归档观察记录。": "Pressure fluctuation returned to normal range. System auto-archived observation record.",
  "查看异常检测": "View Anomaly Detection",
  "查看设备档案": "View Device Archive",
  "查看审计记录": "View Audit Records",

  // ---- S12 Device names ----
  "阿克套变电站1号主变电能计量装置": "Aktau Substation Transformer #1 Energy Meter",
  "西门子能源（Siemens Energy）": "Siemens Energy",
  "曼吉斯套州阿克套市220kV变电站": "Mangystau Aktau 220kV Substation",
  "曼吉斯套州电力配网公司": "Mangystau Power Distribution Co.",
  "阿特劳炼厂110kV进线计量装置": "Atyrau Refinery 110kV Feed Line Meter",
  "阿特劳州阿特劳石化工业园110kV变电站": "Atyrau Petrochemical Park 110kV Substation",
  "阿特劳石油炼化股份公司": "Atyrau Oil Refining JSC",

  // ---- S21 Detection layers ----
  "简单阈值规则": "Threshold Rules",
  "统计趋势分析": "Statistical Trend Analysis",
  "时序大模型预测": "Time-Series AI Model",
  "3号计量站外输流量": "Metering Station No.3 Export Flow",
  "3号计量站管汇压力": "Metering Station No.3 Manifold Pressure",
  "敦加油气田单位能耗": "Dunga Field Unit Energy Consumption",
  "3号计量站单位能耗": "Metering Station No.3 Unit Energy",

  // ---- S22 Enterprise names ----
  "示意石油运输企业 A（Demo）": "Demo Oil Transport Enterprise A",
  "曼吉斯套油气开采联合体（Demo）": "Mangystau Oil & Gas Consortium (Demo)",
  "示意凝析气生产企业 B（Demo）": "Demo Gas Condensate Enterprise B",
  "示意电力企业 C（Demo）": "Demo Power Enterprise C",
  "自报送数据": "Self-Reported Data",
  "电表实测数据": "Meter Actual Data",
  "税务申报数据": "Tax Declaration Data",
  "海关报关数据": "Customs Declaration Data",
  "统计报表数据": "Statistical Report Data",
  "环评监测数据": "Environmental Assessment Data",

  // ---- S31 Agents ----
  "审批 Agent": "Approval Agent",
  "报送 Agent": "Reporting Agent",
  "检查 Agent": "Inspection Agent",
  "历史记录 Agent": "History Agent",
  "关联 Agent": "Relation Agent",
  "主审 Agent": "Master Review Agent",
  "曼吉斯套州港储运链路流量连续偏离预测带 11.4%": "Mangystau Port Link Flow Deviation 11.4%",
  "阿克套-库雷克港储运节点": "Aktau-Kuryk Port Terminal Node",

  // ---- S32 Graph nodes ----
  "曼吉斯套石油控股有限公司（Demo）": "Mangystau Petroleum Holding (Demo)",
  "西哈州天然气运输有限公司（Demo）": "West KZ Gas Transport (Demo)",
  "阿克套港储运股份公司（Demo）": "Aktau Port Storage JSC (Demo)",
  "卡拉让巴斯油田合资企业（Demo）": "Karazhanbas Field JV (Demo)",
  "阿特劳炼化综合体股份公司（Demo）": "Atyrau Refining Complex JSC (Demo)",
  "Rix-Aktau 贸易有限公司": "Rix-Aktau Trading Ltd.",
  "БВК-Сервис 检修服务公司": "BVK-Service Maintenance Co.",
  "卡拉让巴斯油田": "Karazhanbas Oil Field",
  "3号计量站 (KBM-03)": "Metering Station No.3 (KBM-03)",
  "阿克套港储罐区 (CPC终端)": "Aktau Port Tank Farm (CPC Terminal)",
  "CPC里海管道阿克套终端": "CPC Caspian Pipeline Aktau Terminal",
  "7号中央处理站": "Central Processing Facility No.7",
  "阿克套港储运作业区西门子S7-1500 PLC控制系统": "Aktau Port Siemens S7-1500 PLC System",
  "Rosemount 8750W电磁流量计 (3号站主用)": "Rosemount 8750W Magnetic Flow Meter (Station 3 Primary)",
  "库里巴耶娃·阿依古丽": "Kulibayeva Aigul",
  "努尔苏丹·阿利耶夫": "Nursultan Aliyev",
  "谢尔盖·彼得罗夫": "Sergei Petrov",
  "安德烈·索科洛夫": "Andrei Sokolov",
  "2026年5月18日曼吉斯套港储运链路流量异常事件": "May 18 2026 Mangystau Port Link Flow Anomaly",
  "2024年油田安全警告整改": "2024 Oil Field Safety Warning Rectification",
  "2025年关联交易审计异常": "2025 Related-Party Transaction Audit Anomaly",
  "卡拉让巴斯油田→3号计量站→阿克套港成本结算链": "Karazhanbas → Station 3 → Aktau Port Cost Chain",
  "油田设备维护承包商→油田→计量→港储运服务链": "Equipment Contractor → Field → Metering → Port Service Chain",

  // ---- S41 Stages ----
  "事件自动注册": "Event Auto-Registration",
  "AI 识别异常": "AI Anomaly Detection",
  "证据链冻结": "Evidence Chain Freeze",
  "AI 归因分析": "AI Attribution Analysis",
  "AI 建议处置": "AI Recommended Actions",
  "人工研判": "Human Assessment",
  "人工编写处置意见": "Human Disposition Draft",
  "人工最终审批": "Human Final Approval",
  "事件归档": "Event Archiving",
  "系统自动注册事件 ID EVT-2026-0518-MG-PORT-001，标记为\"待 AI 分析\"": "System auto-registered event EVT-2026-0518-MG-PORT-001, marked \"Pending AI Analysis\"",
  "TS-AI 模型识别出 3 号计量站外输流量连续 4 小时低于预测带 11.4%，将事件状态从 \"待 AI 分析\" 更新为 \"AI 已识别\"，并触发证据链冻结流程。": "TS-AI model detected Station 3 export flow 11.4% below forecast for 4 hours. Status: \"AI Identified\". Evidence freeze triggered.",
  "系统自动冻结近 24 小时流量/压力/能耗/密度曲线（共 384 个数据点），快照已在证据库锁定。": "System froze last 24h flow/pressure/energy/density curves (384 data points). Snapshot locked in evidence store.",
  "AI对流量偏离、能耗抬升、压力波动、密度变化进行多变量归因分析，结合设备维护记录和历史案例库，生成三个候选原因假设。": "AI performed multivariate attribution. Generated 3 candidate cause hypotheses with maintenance records and case history.",
  "AI建议：①排查泵站和阀门 ②调取企业自报送数据 ③比对港储运装卸记录。建议在规定时限内人工复核并作出处置决定。": "AI recommends: ① Inspect pumps/valves ② Retrieve enterprise data ③ Cross-check port records. Human review within SLA.",
  "监管人员审核 AI 初判结论和证据链，确认异常性质，判断是否需要进一步调查。": "Regulatory officer reviews AI conclusions and evidence chain to confirm anomaly nature.",
  "监管人员 H. Nurzhanov 审核并修改了 AI 初判建议，添加了\"需调取卡拉让巴斯油田近期维护记录\"的补充要求。": "Officer H. Nurzhanov reviewed and modified AI recommendations, adding \"retrieve Karazhanbas recent maintenance records.\"",
  "能源部 E. Suleimenov 签批处置决定：进入企业核查程序；范围：3 号计量站、港口储运、企业报送链；时限：72 小时。": "Ministry official E. Suleimenov approved: enterprise audit; scope: Station 3, port terminal, reporting chain; deadline: 72h.",
  "事件闭环，归档类别\"计量偏离-管线异常\"。证据包、处置链、审批记录已全部固化至区块链审计系统。": "Event closed. Category: \"Metering Deviation - Pipeline Anomaly\". All records archived on blockchain audit system.",
  "AI 自动": "AI Automated",
  "系统流转": "System Flow",
  "人工确认": "Human Confirmed",
  "人工修改 AI 建议": "Human Modified AI Output",
  "人工驳回 AI": "Human Rejected AI Output",
  "AI 初判系统 (TS-AI 引擎)": "AI System (TS-AI Engine)",
  "自动化证据链冻结流程": "Automated Evidence Freeze",
  "能源部油气司监管官员 H. Nurzhanov": "Ministry Oil & Gas Officer H. Nurzhanov",
  "能源部油气司副司长 E. Suleimenov": "Ministry Deputy Director E. Suleimenov",
  "审计链自动化归档系统": "Audit Chain Auto-Archive System",
  "事件自动注册 (AI Autoregistration)": "Event Auto-Registration (AI)",
  "AI 识别异常 (Anomaly Detection)": "AI Anomaly Detection",
  "证据链冻结 (Evidence Freeze)": "Evidence Freeze",
  "AI 归因分析 (Attribution)": "AI Attribution Analysis",
  "AI 建议处置 (Recommendations)": "AI Recommendations",
  "人工研判 (Human Assessment)": "Human Assessment",
  "人工编写处置意见 (Draft)": "Human Disposition Draft",
  "人工最终审批 (Approval)": "Human Final Approval",
  "事件归档 (Archive)": "Event Archiving",
  "无": "None",

  // ---- S41 Audit entries ----
  "事件注册": "Event Registered",
  "AI 识别": "AI Identified",
  "归属分析": "Attribution Analysis",
  "处置生成": "Actions Generated",
  "人工研判/修改": "Human Review/Edit",
  "人工审批": "Human Approval",
  "归档完成": "Archived",
  "AI内容生成": "AI Content Generated",
  "AI风险预判": "AI Risk Assessment",
  "AI归因分析": "AI Attribution",
  "人工签批": "Human Approval",
  "数据冻结留存": "Data Freeze & Retention",
  "低风险": "Low Risk",
  "无风险": "No Risk",
  "监管工单系统": "Regulatory Work Order System",
  "能源部归档系统": "Ministry Archive System",
  "自动巡检告警": "Automated Alert",
  "巡检计划": "Inspection Plan",
  "整改通知": "Rectification Notice",
  "案例归档": "Case Archive",
  "事件锁定": "Event Locked",

  // ---- S42 Templates ----
  "日报模板": "Daily Report Template",
  "每日": "Daily",
  "周报模板": "Weekly Report Template",
  "每周": "Weekly",
  "月报模板": "Monthly Report Template",
  "每月": "Monthly",
  "突发事件专报模板": "Emergency Incident Report Template",
  "按需": "On Demand",
  "部长简报模板": "Ministerial Brief Template",
  "Generate daily operational monitoring report covering KPIs and anomaly summaries.": "Generate daily operational monitoring report covering KPIs and anomaly summaries.",
  "Generate weekly regulatory trend report with comparison to prior periods.": "Generate weekly regulatory trend report with comparison to prior periods.",
  "Generate monthly compliance and enforcement summary for regulatory review.": "Generate monthly compliance and enforcement summary for regulatory review.",
  "Rapid incident report triggered by critical anomalies requiring immediate attention.": "Rapid incident report triggered by critical anomalies requiring immediate attention.",
  "Executive summary for ministerial review covering major regulatory events.": "Executive summary for ministerial review covering major regulatory events.",

  // ---- Browser-scan additions / visible fallback coverage ----
  "AI 初判置信度": "AI Preliminary Confidence",
  "家": "entities",
  "项": "items",
  "台": "units",
  "分钟": "min",
  "6分钟": "6 min",
  "吨/日": "t/d",
  "3 号计量站外输流量连续 4 小时低于预测带，伴随单位能耗抬升。AI 初判建议核查井口结蜡、泵效下降或计量漂移，需人工复核。": "Station No. 3 export flow stayed below the forecast band for 4 hours with rising unit energy consumption. AI recommends checking wellhead waxing, pump efficiency decline, or meter drift, subject to human review.",
  "曼吉斯套州油气工业带至阿克套-库雷克港储运链路连续 4 小时低于预测带 11.4%，AI 初判发现异常模式，需人工复核。建议下钻到州级页面核对园区、计量站和港口储罐证据包。": "The Mangystau oil and gas corridor to the Aktau-Kuryk port terminal stayed 11.4% below forecast for 4 hours. AI detected an anomaly pattern requiring human review. Drill down to verify industrial zone, metering station, and port tank evidence.",
  "西哈州气凝析链最近 2 个采集窗口数据延迟高于全国同类节点中位数，建议观察州级报送链路。": "West Kazakhstan gas-condensate chain latency exceeded the national peer median for the last 2 collection windows. Keep the oblast reporting link under observation.",
  "基于行业标准和历史运行参数设定的固定上下限，实时检测明显越限事件。适用于压力、温度、流量等关键安全参数的快速告警。": "Fixed upper and lower bounds based on industry standards and historical operating parameters detect obvious threshold breaches in real time. Suitable for rapid alerts on pressure, temperature, flow, and other critical safety parameters.",
  "使用移动平均、标准差带和季节性分解识别偏离正常统计模式的异常。适用于捕捉渐进式漂移和周期性偏离。": "Uses moving averages, standard deviation bands, and seasonal decomposition to identify deviations from normal statistical patterns. Suitable for gradual drift and periodic deviation detection.",
  "基于Transformer架构的大语言时序模型，15分钟粒度滚动预测未来2小时趋势，自动标定预测带并识别超出置信区间的异常段。": "A Transformer-based time-series model forecasts the next 2 hours at 15-minute granularity, calibrates prediction bands, and identifies segments outside confidence intervals.",
  "全部节点/链路": "All Nodes / Links",
  "最近 6 小时": "Last 6 Hours",
  "最近 12 小时": "Last 12 Hours",
  "最近 24 小时": "Last 24 Hours",
  "最近 3 天": "Last 3 Days",
  "3号计量站外输流量连续低于预测带": "Station No. 3 Export Flow Continuously Below Forecast Band",
  "3号计量站管汇压力突破统计下界": "Station No. 3 Manifold Pressure Broke Statistical Lower Bound",
  "时序大模型预测显示当前流量值持续低于预测带下界超过4个连续15分钟窗口（11:00-12:00），实际值偏离预测均值约11.4%。模型在10:45首次发出黄色信号，11:30升级为橙色预警。": "The time-series model shows flow staying below the lower forecast band for more than four consecutive 15-minute windows (11:00-12:00), about 11.4% below the predicted mean. The model first issued a yellow signal at 10:45 and escalated to orange at 11:30.",
  "对比过去14天同时段流量分布，当前流量处于第2百分位以下。管汇压力同步下降8.5%，符合流量-压力耦合特征，排除单传感器故障可能。": "Compared with the same time window over the last 14 days, current flow is below the 2nd percentile. Manifold pressure fell by 8.5%, matching flow-pressure coupling and reducing the likelihood of a single-sensor fault.",
  "建议对3号计量站启动现场核查程序，重点排查井口结蜡、井下泵效下降或计量仪表漂移。同步调取近7天井下压力计数据以辅助判断。以上为AI初判建议，需人工复核确认后执行。": "Recommend launching an on-site check for Station No. 3, focusing on wellhead waxing, downhole pump efficiency decline, or meter drift. Retrieve the last 7 days of downhole pressure data for support. This AI recommendation requires human review before execution.",
  "自报送数据 vs 海关报关数据": "Self-Reported Data vs Customs Declaration Data",
  "自报送出口量远超海关报关出口量，差额 4,200 吨/日，逻辑矛盾显著": "Self-reported export volume far exceeds customs-declared volume, with a 4,200 t/d gap and a material logical conflict",
  "税务申报与统计报表数据存在轻微差异，可能为统计口径不同导致": "Tax declarations and statistical reports show a minor difference, possibly caused by reporting-scope differences",
  "AI 初判发现外输流量、计量心跳和报送延迟存在同向异常，需人工复核后决定是否进入企业核查。": "AI found aligned anomalies across export flow, metering heartbeat, and reporting latency. Human review is required before deciding whether to enter enterprise verification.",
  "AI 初判该企业关联计量点出现持续偏离，建议先核对计量装置状态、企业报送窗口和港储运交接记录。该结论仅供人工复核参考。": "AI found sustained deviation at the enterprise-linked metering point. First verify device status, enterprise reporting window, and port handover records. This conclusion is for human review reference only.",
};

/**
 * Translate a data string using the big lookup table.
 * Falls back to the string itself (which is Chinese in zh mode, or the original key in en).
 */
export function translateData(lang: "zh" | "en", text: string): string {
  if (lang === "zh") return text;
  const translated = dataEn[text] ?? text;
  if (!/[\u4e00-\u9fff]/.test(translated)) return translated;
  return translated
    .replace(/中文/g, "Language")
    .replace(/吨\/日/g, "t/d")
    .replace(/分钟/g, "min")
    .replace(/小时/g, "hours")
    .replace(/家/g, " entities")
    .replace(/项/g, " items")
    .replace(/台/g, " units")
    .replace(/号/g, "No.")
    .replace(/[\u4e00-\u9fff]+/g, "English text");
}

/**
 * Hook that returns a data-aware translation function.
 * t() from I18nContext covers UI labels; td() covers data strings.
 */
export function useDataI18n() {
  const { lang } = useI18n();
  return {
    lang,
    /** Translate a data string (from mock data, constants, etc.) */
    td: (text: string): string => translateData(lang, text),
  };
}
