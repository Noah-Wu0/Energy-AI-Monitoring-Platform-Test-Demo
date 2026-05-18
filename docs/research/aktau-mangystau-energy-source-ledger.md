# 阿克套/曼吉斯套州能源产业资料来源记录

> 访问日期：2026-05-18
> 决策记录（2026-05-18）：因油田精确坐标、计量站/泵站位置等数据无法从公开渠道获取，demo 第一阶段**全部使用模拟数据**。公开资料仅作为产业背景参考和节点/企业命名的灵感来源，所有数值（产量、坐标、储量、运量等）与真实企业运营数据无任何对应关系。页面全局标注"数据为模拟演示"。

## 1. 资料来源表

| 编号 | 来源 | URL | 标题/说明 | 核心信息 | 可支撑 Demo 内容 | 使用边界 |
|---|---|---|---|---|---|---|
| S01 | open-data-kazakhstan/geo-boundaries-kz | https://github.com/open-data-kazakhstan/geo-boundaries-kz | GADM 3.6 哈萨克斯坦行政边界（GeoJSON/TopoJSON/SVG/Shapefile） | 全国、州级、区级行政边界；曼吉斯套州 5 区 | 首页交互地图底图、州级下钻、阿克套城市标注 | ODC-PDDL 许可证，非官方测绘；标注"地图仅为示意" |
| S02 | GADM | https://gadm.org/ | 全球行政区域数据库 | 边界上游来源 | 地理参考 | 学术界广泛使用，边界非法律效力 |
| S03 | KazMunayGas 2024 Annual Report | https://ar2024.kmg.kz/en/strategic-report/operating-review/midstream | KMG 年报 — 中游运营回顾 | 管道运量数据、KazTransOil 网络长度、CPC 份额 | 管道网络结构、运营商关系、运量基准值 | 公开年报数据，demo 中具体日产量为模拟 |
| S04 | The Astana Times | https://astanatimes.com/2026/01/kazakhstan-boosts-oil-output-in-2025-as-western-regions-drive-growth/ | 2025 年哈萨克斯坦石油产量报道 | 2025 全国产量 9930 万吨；曼吉斯套州占 17.2% | 曼吉斯套州产量占比、产量趋势 | 新闻引用，宏观数字可用作基准参考 |
| S05 | Global Energy Monitor (GEM.wiki) | https://www.gem.wiki/Kalamkas-Karazhanbas-Aktau_Oil_Pipeline | Kalamkas-Karazhanbas-Aktau 原油管道 | 长度 264.5 km、管径 530 mm、运能 7 Mtpa、投产 1979 | 管道节点结构、连线属性 | 公开维基，管线技术参数可参考 |
| S06 | Global Energy Monitor (GEM.wiki) | https://www.gem.wiki/Ozen-Zhetybay-Aktau_Oil_Pipeline | Uzen-Zhetybay-Aktau 原油管道 | 长度 141.6 km、管径 530/700 mm、运能 9 Mtpa、投产 1966 | 管道节点结构、连线属性 | 同上 |
| S07 | Global Energy Monitor (GEM.wiki) | https://www.gem.wiki/Kalamkas_Oil_Field_(Kazakhstan) | Kalamkas 油田 | 1976 年发现、1979 年投产、可采储量约 4.5 亿桶 | 油田节点属性、时间线 | 同上 |
| S08 | Petroleum Journal (Kazakhstan) | https://www.petroleumjournal.kz/ | 哈萨克斯坦石油行业专业期刊 | 曼吉斯套州 340 家注册油气企业、GRP 占比 43%、行业结构 | 行业规模、企业数量参考 | 专业期刊，数据为行业统计口径 |
| S09 | Kursiv (Kazakhstan business media) | https://kz.kursiv.media/en/2025-07-10/engk-yeri-kazakh-oil-giant-boosts-production-after-buying-out-totalenergies/ | KMG 收购 TotalEnergies 在 Dunga 的股份 | Dunga 油田 KMG 60% 持股、产量提升 | 企业持股关系、Dunga 油田背景 | 商业媒体报道 |
| S10 | KazTransOil press release | https://kaztransoil.kz/en/press_centre/news/5552-kaztransoil-ensures-timely-rerouting-of-a-portion-of-crude-export-flows-from-cpc | CPC 管道中断后原油改道 | 阿克套港运量提升、改道路线（Aktau→BTC） | 阿克套港出口角色、应急改道场景 | 官方新闻稿，可信度高 |
| S11 | KMG press release | https://www.kmg.kz/en/press-center/press-releases/493/ | KMG 在阿克套开设代表处 | 18 家 KMG 企业在曼吉斯套州、32,500+ 员工、占 KMG 产量 43% | 企业数量、雇佣规模、区域重要性 | 官方新闻稿 |
| S12 | CPC / Aktau export news (Xinhua) | http://english.news.cn/20260117/e10f231f45514504a921cdc79f4b13ec/c.html | 哈萨克斯坦因 CPC 受限制而改道石油出口 | 2024 年 Aktau→Baku 运量 139 万吨；2025 年计划 160 万吨 | 阿克套港运量数据 | 官方通讯社报道 |
| S13 | Rogtec Magazine | https://www.rogtecmagazine.com/677-3-thousand-tonnes-of-oil-were-produced-at-the-dunga-field-in-2025/ | Dunga 油田 2025 年产量 | 2025 年产 677,300 吨 (+7.5% YoY)；累计 900 万吨 | Dunga 油田精确产量（公开值） | 行业杂志，引用 KMG 数据 |
| S14 | Interfax Kazakhstan | https://interfax.com/newsroom/top-stories/92127/ | 曼吉斯套核电站断电导致多个油田停产 | 2023 年 7 月断电影响 Ozenmunaigas、Mangistaumunaigas、Karazhanbasmunai | 异常事件场景参考（断电导致停产） | 新闻通讯社 |
| S15 | Q-FCM LLP | https://oil-gas.kz/en/press-centre/news/news-blog/1769-q-fcm-llp-integrated-engineering-solutions-for-oil-gas-facilities | 哈萨克斯坦油气计量系统 | 贸易交接计量、DCS/SCADA 集成、活塞式体积管 | 计量站节点类型、SCADA 系统参考 | 企业官网 |
| S16 | KazMunayGas 2024 Annual Report | https://ar2024.kmg.kz/en/strategic-report/strategy/key-investment-projects | KMG 重点投资项目 | KMG 参与 Tengiz、Kashagan、Karachaganak 等大型油气项目 | 全国油气态势图中的西部/北里海关键节点 | 公开年报，仅用于节点背景，不用于监管结论 |
| S17 | KMG North Caspian Project | https://www.kmg.kz/en/press-center/media/severo-kaspiyskiy-proekt/ | North Caspian project | 哈萨克斯坦首个大型海上油气项目，项目包括 Kashagan | Kashagan 示意油田节点 | 公开项目介绍，demo 坐标与状态均为模拟 |
| S18 | Karachaganak Petroleum Operating | https://www.kpo.kz/en/about-kpo | About KPO | KPO 运营 Karachaganak 油气凝析田，并服务哈萨克斯坦能源产业 | Karachaganak 示意气田节点 | 企业官网，仅用于节点背景 |
| S19 | KazTransOil | https://kaztransoil.kz/en/about/ | KazTransOil About | KazTransOil 提供国内、过境和出口石油运输服务，并涉及 Aktau 海上石油终端装船设施 | Atyrau/Aktau 管道与储运节点背景 | 企业官网，具体流量与状态为模拟 |

## 2. 曼吉斯套州油气产业概况（公开资料综合）

### 2.1 区域地位

- 哈萨克斯坦第二大产油区（仅次于阿特劳州），2025 年占全国原油产量约 17.2%
- 石油采掘业占区域 GRP 的 43%（~1.5 万亿坚戈）
- KMG 集团 43% 的原油产量来自该州
- 18 家 KMG 下属企业在曼吉斯套州运营，雇佣超过 32,500 人
- 截至 2025 年初，州内注册油气生产企业 340 家，其中 7 家为大型企业（千名员工以上）

### 2.2 主要油田（公开信息）

| 油田 | 运营企业 | 发现 | 公开储量信息 | 2024-2025 产量参考 |
|---|---|---|---|---|
| Uzen（乌津） | Ozenmunaigas JSC | 1965 | 初始地质储量 11.5 亿吨，剩余 >1.2 亿吨 | 2024: 509.8 万吨油 + 6.12 亿 m³ 气 |
| Kalamkas（卡拉姆卡斯） | Mangistaumunaigas JSC | 1976 | 可采储量约 4.5 亿桶（~6000 万吨） | MMG 合计 2024: 617 万吨 |
| Zhetybay（热特拜） | Mangistaumunaigas JSC | — | 与 Kalamkas 合计占 MMG 储量 90% | 同上 |
| Karazhanbas（卡拉让巴斯） | Karazhanbasmunai JSC | 1974 | 重质油、布扎奇半岛 | 2024: ~270 万吨 |
| Dunga（敦加） | Dunga Operating GmbH | 1966 | 地质储量 1.06 亿吨油 + 60+ 亿 m³ 气 | 2025: 67.73 万吨油 + 5100 万 m³ 气 |
| Kalamkas-Sea + Khazar | KMG + Lukoil（在建） | — | 可采 6700 万吨油 + 90 亿 m³ 气 | 预计 2028-2029 投产 |

### 2.3 阿克套港与油气运输

- 阿克套港是哈萨克斯坦在里海的主要港口
- 两条主要原油管道汇集至阿克套：
  - Uzen-Zhetybay-Aktau（141.6 km，9 Mtpa，1966 年投产）
  - Kalamkas-Karazhanbas-Aktau（264.5 km，7 Mtpa，1979 年投产）
- 2024 年 Aktau→Baku 原油运量约 139 万吨
- 原油经里海油轮运至巴库，续经 BTC 管道至土耳其杰伊汉港
- 哈萨克斯坦能源部正在研究跨里海海底管道可行性
- 库里克港（Kuryk Port）是阿克套以外的重要补充港口
- Kazmortransflot（KMG 子公司，总部阿克套）运营国家海运船队

### 2.4 下游设施

- **Caspi Bitum 沥青厂**（阿克套）：KMG 合资企业，计划扩产至 150 万吨/年
- **KazGPP 天然气处理厂**（曼吉斯套州）：KMG 子公司运营
- **Zhanaozen 天然气处理厂**（计划中）：KMG + Linde AG 合作
- **阿克套化学分析实验室**（KMG Engineering）

### 2.5 管道出口路线

| 路线 | 走向 | 运能/运量 |
|---|---|---|
| CPC（里海管道联盟） | Tengiz → Novorossiysk（黑海） | ~80% 出口量，81.5 Mtpa |
| UAS（乌津-阿特劳-萨马拉） | Uzen → Atyrau → Samara（俄罗斯） | 传统出口路线 |
| KZ-China（中哈原油管道） | Atasu → Alashankou（中国） | 20 Mtpa |
| Aktau → BTC | 阿克套（油轮）→ 巴库 → 第比利斯 → 杰伊汉 | ~1.5 Mt/yr（2025 增长中） |

## 3. 可支撑 Demo 的公开信息

### 3.1 直接可用的结构化信息

- 全国 14 个州级行政区名称、代码（GADM）
- 曼吉斯套州 5 个区级行政区（含阿克套市）
- 全国油气态势示意节点：Tengiz、Kashagan、Karachaganak 可作为西部/北里海能源格局背景节点
- 5 个主要油田的基本参数（名称、运营企业、储量/产量量级）
- 2 条原油管道的基本技术参数（长度、管径、运能、投产年份）
- 阿克套港的功能定位和出口路线

### 3.2 适合进入 Mock 数据的场景

- 油田日产量偏离基准 → AI 检测异常的事件流
- 管道流量/压力异常 → 关联上游油田和下游港口
- 计量站数据漂移 → 人工复核
- 企业报送数据延迟 → 合规风险提示
- 断电导致多油田停产 → 关联事件链

### 3.3 适合 Demo 流程设计的公开线索

- CPC 管道受损 → 原油改道阿克套 → Aktau 港运量激增 → 管道调度变化
- 成熟油田产量衰减 → 提高采收率措施 → 投资审批流程
- 新油田开发（Kalamkas-Sea）→ 环评 → 设备采购 → 投产计划

## 4. 使用边界

1. **所有产量数据标注为模拟值**，仅公开的年产量总量和量级关系作为参考
2. **地图标注**：页面应注明"地图边界仅为示意，非官方测绘"
3. **企业名称**：使用公开英文名称和中文译名，不暗示官方授权或合作
4. **油田坐标**：为近似值，不用于导航或工程
5. **储量数据**：引用公开来源的估算值，标注来源
6. **不使用任何内部/未公开的企业运营数据**
7. **不使用带版权水印的地图**

## 5. 待核实事项

| 编号 | 事项 | 优先级 | 说明 |
|---|---|---|---|
| V01 | 阿克套城市精确坐标和面积 | 中 | 当前使用近似坐标，后续可用 OpenStreetMap 校对 |
| V02 | 各油田精确井口坐标 | 中 | 公开数据难以获取精确坐标，demo 可用近似值 |
| V03 | 曼吉斯套州境内天然气管道网络详情 | 中 | 当前仅掌握原油管道主线信息 |
| V04 | 计量站/泵站的具体位置和编号 | 中 | 安全敏感信息，公开资料极少，需使用完全模拟数据 |
| V05 | 各企业实际能源消耗数据 | 低 | 企业内部数据，demo 完全模拟 |
| V06 | 曼吉斯套州新能源（风电/光伏）设施 | 低 | 与石油天然气主流程关联度较低，后续扩展时可补充 |
| V07 | 哈萨克斯坦能源部实际监管报送流程和字段 | 低 | 监管流程为公开法规框架，具体字段为 demo 设计 |
| V08 | 阿克套港口具体泊位和装船能力 | 低 | 公开资料有限，demo 简化处理 |

## 6. 扩展阅读

- [全国石油上下游产业节点表](./kazakhstan-national-oil-supply-chain-nodes.md)（2026-05-18）：从曼吉斯套州扩展到全哈 14 州的油田、管道、炼化、石化和出口终端的完整链路节点表，含上下游拓扑关系。

## 7. 版权与可信度风险评估

### 6.1 低风险

- GADM 行政边界：ODC-PDDL 许可证，无版权限制
- KMG 年报/官方新闻稿：公开信息，引用时标注来源即可
- 政府/通讯社报道（Astana Times、Xinhua、Interfax）：公开新闻，可引用

### 6.2 中等风险

- GEM.wiki 管道/油田数据：维基格式，由社区维护，技术参数可能与官方数据有偏差，建议交叉验证
- Petroleum Journal：行业期刊，专业但非官方

### 6.3 需注意

- 企业名称/Logo：使用公开注册名称不构成侵权；不使用企业 Logo 除非 demo 内部明确为示意
- 油田坐标：不使用任何付费/订阅数据的坐标，仅使用公开可获取的近似坐标
- 生产数据：demo 中明确标注为模拟，不与任何企业实际经营数据建立可追溯关系
