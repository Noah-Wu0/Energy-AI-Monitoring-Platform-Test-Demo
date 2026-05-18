# 哈萨克斯坦全国石油上下游产业节点表

> 编制日期：2026-05-18
> 配套文档：[全国天然气/电力/供暖产业节点表](./kazakhstan-national-gas-power-heating-nodes.md)
> 用途：支撑 Demo"全国能源态势图"和"产业网络链路"场景的数据骨架
> 数据声明：所有产量/运量/坐标数值为公开来源参考值，Demo 中标注"数据为模拟演示"，不与企业实际运营数据建立可追溯关系

## 一、节点分类体系

| 节点层级 | 类型代码 | 说明 |
|---|---|---|
| 上游 | FIELD | 油气田/产区 |
| 上游 | GPP | 天然气处理厂（井口伴生气处理） |
| 中游 | PIPE | 干线管道 |
| 中游 | PS | 泵站/增压站 |
| 中游 | STORAGE | 储油罐区/油库 |
| 中游 | METER | 计量站（贸易交接级） |
| 下游 | REF | 炼油厂 |
| 下游 | PETROCHEM | 石化厂（聚丙烯/聚乙烯/橡胶/PET 等） |
| 下游 | BITUMEN | 沥青厂 |
| 下游 | GSC | 天然气分离/分馏综合体 |
| 出口 | PORT | 原油出口港口/海上终端 |
| 出口 | RAIL | 铁路装卸站 |
| 出口 | BORDER | 陆路管道出境节点 |

---

## 二、全哈石油产业节点总表

### 2.1 上游 — 主要油气田

| 节点编号 | 名称（中/英/哈） | 所在州 | 类型 | 运营企业 | 主要合资方 | 发现/投产 | 储量参考（公开） | 产量参考（2024-2025，公开） | 下游连接 |
|---|---|---|---|---|---|---|---|---|---|
| F-01 | Tengiz / Теңіз / 田吉兹 | Atyrau | FIELD | TCO (Tengizchevroil) | Chevron 50%, ExxonMobil 25%, KMG 20%, Lukoil 5% | 1979 发现 / 1993 投产 | 地质储量 ~31 亿吨 | 2024: ~2900 万吨；2025: ~3900 万吨（FGP 扩产后） | → PIPE-CPC, → GSC-Tengiz |
| F-02 | Korolev / Королевское / 科罗廖夫 | Atyrau | FIELD | TCO | 同 Tengiz（同一 PSA） | — | 与 Tengiz 合计 | 并入 Tengiz 产量 | → PIPE-CPC |
| F-03 | Kashagan / Қашаған / 卡沙甘 | Atyrau (里海海上) | FIELD (Offshore) | NCOC (North Caspian Operating Co.) | KMG 16.88%, Eni 16.81%, Shell 16.81%, TotalEnergies 16.81%, ExxonMobil 16.81%, CNPC 8.33%, Inpex 7.56% | 2000 发现 / 2016 商业生产 | 可采 ~9-13 Gbbl（~45 亿吨） | 2024: ~1740 万吨；2025: ~1820 万吨 | → Bolashak 陆上处理厂, → PIPE-CPC |
| F-04 | Aktoty / Ақтоты | Atyrau (里海海上) | FIELD (Offshore) | NCOC | 同 Kashagan PSA | — | 同 PSA 范围 | 纳入 Kashagan 体系 | → Bolashak |
| F-05 | Kairan / Қайран | Atyrau (里海海上) | FIELD (Offshore) | NCOC | 同 Kashagan PSA | — | 同 PSA 范围 | 未独立开发 | — |
| F-06 | Karachaganak / Қарашығанақ / 卡拉恰干纳克 | West Kazakhstan | FIELD (Oil+Gas Cond) | KPO (Karachaganak Petroleum Operating) | Eni 29.25%, Shell 29.25%, Chevron 18%, Lukoil 13.5%, KMG 10% | 1979 发现 / 1984 投产 | 剩余可采：2.79 亿吨油 + 7850 亿m³气 | 2024: ~1100 万吨液烃 + ~256 亿m³气 | → PIPE-KATS (→ Atyrau → CPC), → Orenburg GPP (俄) |
| F-07 | Chinarevskoye / Чинаревское | West Kazakhstan | FIELD | Zhaikmunai LLP | — | — | — | 油气凝析生产 | → 本地集输 |
| F-08 | Uzen / Өзен / 乌津 | Mangystau | FIELD | Ozenmunaigas JSC (KMG) | KMG | 1965 投产 | 初始地质 11.5 亿吨，剩余 >1.2 亿吨 | 2024: 509.8 万吨油 + 6.12 亿m³气 | → PIPE-UAS |
| F-09 | Kalamkas / Қаламқас / 卡拉姆卡斯 | Mangystau | FIELD | Mangistaumunaigas JSC (KMG) | KMG | 1976 发现 / 1979 投产 | 可采 ~6000 万吨（~4.5 亿桶） | 纳入 MMG 合计（2024: 617 万吨） | → PIPE-KK-Aktau |
| F-10 | Zhetybay / Жетібай / 热特拜 | Mangystau | FIELD | Mangistaumunaigas JSC (KMG) | KMG | — | 与 Kalamkas 合计占 MMG 储量 90% | 纳入 MMG 合计 | → PIPE-UZ-Aktau |
| F-11 | Karazhanbas / Қаражанбас / 卡拉让巴斯 | Mangystau | FIELD | Karazhanbasmunai JSC | — | 1974 | 重质油、布扎奇半岛 | 2024: ~270 万吨 | → PIPE-KK-Aktau |
| F-12 | Dunga / Дұнға / 敦加 | Mangystau | FIELD | Dunga Operating GmbH | KMG 60%（收购 TotalEnergies 股份后） | 1966 发现 | 地质 1.06 亿吨油 + 60+ 亿m³气 | 2025: 67.73 万吨油 + 5100 万m³气 | → 本地集输 → 阿克套 |
| F-13 | Kalamkas-Sea + Khazar / Қаламқас-теңіз + Хазар | Mangystau (里海海上) | FIELD (Offshore) | KMG + Lukoil | KMG 50%, Lukoil 50% | 在建 | 可采 6700 万吨油 + 90 亿m³气 | 预计 2028-2029 投产（⚠ 2026.3 因制裁暂停） | — |
| F-14 | Zhanazhol / Жаңажол / 扎纳若尔 | Aktobe | FIELD (Oil+Gas Cond) | CNPC / KMG | CNPC 为主 | — | — | 大型气凝析田 | → PIPE-KK (Kenkiyak-Kumkol) |
| F-15 | Kenkiyak / Кеңқияқ / 肯基亚克 | Aktobe | FIELD | CNPC / KMG | CNPC 为主 | — | 盐上+盐下双储层 | — | → PIPE-KA (Kenkiyak-Atyrau), → PIPE-KK |
| F-16 | Urikhtau / Үріктау / 乌里赫套 | Aktobe | FIELD | KMG / CNPC | — | — | — | 运营中 | → 本地集输 |
| F-17 | Kumkol / Құмкөл / 库姆科尔 | Kyzylorda | FIELD | Turgai Petroleum | Lukoil 50%, PetroKazakhstan 50% | — | 成熟油田 | — | → PIPE-KK, → PIPE-KC (中哈管道) |
| F-18 | Zhambyl / Жамбыл | Caspian Sea | FIELD (Offshore) | KMG | — | 已发现，未开发 | — | — | — |

### 2.2 中游 — 干线原油管道

| 节点编号 | 名称 | 走向 | 长度 (km) | 管径 (mm) | 运能 (Mtpa) | 投产 | 运营方 | 连接上游 | 连接下游 |
|---|---|---|---|---|---|---|---|---|---|
| P-01 | CPC 管道（哈段） | Tengiz → Atyrau → 俄边境 → Novorossiysk | 1,511 (哈段 452) | 1,016 / 1,067 | 67-72.5（可扩至 81.5） | 2001 | CPC-K (KMG 19%) | F-01 Tengiz, F-03 Kashagan, F-06 Karachaganak | PORT-CPC (Novorossiysk) |
| P-02 | Uzen-Atyrau-Samara (UAS) | Uzen → Atyrau → Samara (俄) | 1,235.7 | — | 15-17（计划扩至 25） | 1971 | KazTransOil (KMG) | F-08 Uzen | → 俄 Transneft 系统 → 德国 Schwedt / 波罗的海 |
| P-03 | 中哈原油管道 (KZ-China) | Atyrau → Kenkiyak → Kumkol → Atasu → Alashankou (中国) | ~2,798（全系统） | — | 分段：Kenkiyak-Atyrau 6 / KK 10 / Atasu-Alashankou 20 | 2006-2009 | KZ-China Pipeline LLP (KMG/CNPC 50:50) | F-14 Zhanazhol, F-15 Kenkiyak, F-17 Kumkol | BORDER-Alashankou (中国新疆) |
| P-04 | Karachaganak-Atyrau (KATS) | Karachaganak → Bolshoy Chagan → Atyrau | 635 | — | — | — | KazTransOil | F-06 Karachaganak | → Atyrau → CPC / UAS |
| P-05 | Kalamkas-Karazhanbas-Aktau | Kalamkas → Karazhanbas → Aktau | 264.5 | 530 | 7 | 1979 | KazTransOil | F-09 Kalamkas, F-11 Karazhanbas | PORT-Aktau |
| P-06 | Uzen-Zhetybay-Aktau | Uzen → Zhetybay → Aktau | 141.6 | 530/700 | 9 | 1966 | KazTransOil | F-08 Uzen, F-10 Zhetybay | PORT-Aktau |
| P-07 | Kenkiyak-Atyrau | Kenkiyak → Atyrau | 455 | — | 6 | — | KZ-China Pipeline LLP | F-15 Kenkiyak | → Atyrau → 中哈管道西段 |
| P-08 | Kenkiyak-Kumkol | Kenkiyak → Kumkol | 794 | — | 10 | — | KZ-China Pipeline LLP | F-15 Kenkiyak, F-14 Zhanazhol | F-17 Kumkol → Atasu |
| P-09 | Atasu-Alashankou | Atasu → Alashankou (中国边境) | 965 | — | 20 | 2006 | KZ-China Pipeline LLP | F-17 Kumkol (经 Atasu) | BORDER-Alashankou |
| P-10 | TON-2 管道 (哈段) | — | — | — | — | — | KazTransOil | 俄过境油 | — |

### 2.3 中游 — 主要泵站与储运枢纽

> 注：KazTransOil 全网共有 36 个泵站、1,426,000 m³ 储罐总容量。以下为关键节点，Demo 中使用示意位置。

| 节点编号 | 名称 | 所在州/地点 | 类型 | 所属系统 | 说明 |
|---|---|---|---|---|---|
| S-01 | Atyrau 泵站群 + 罐区 | Atyrau | PS + STORAGE | CPC / UAS / KATS 交汇 | 全哈最大原油集输枢纽，CPC 起点；含 KANOIL ATYRAU 罐区（175,000 m³） |
| S-02 | Tengiz 泵站（CPC 首站） | Atyrau | PS | CPC | CPC 管道起点泵站 |
| S-03 | Makhambetskiy 接收站 | Atyrau | STORAGE | KATS | KATS 管道终点，接收 Karachaganak 来油 |
| S-04 | Aktau 港罐区 | Mangystau (阿克套) | STORAGE + PORT | UZ-Aktau / KK-Aktau | KazTransOil 运营，3 个装油泊位 |
| S-05 | Kuryk 港罐区 | Mangystau (库里克) | STORAGE + PORT | 独立 | Sarzha MMT 在建，油品/化工品/LPG |
| S-06 | Atasu 站 | Karaganda | PS + STORAGE | 中哈管道 | 中哈管道中枢分输站 |
| S-07 | Kumkol 站 | Kyzylorda | PS + STORAGE | 中哈管道 | 连接 Kumkol 油田 |
| S-08 | Kenkiyak 站 | Aktobe | PS | Kenkiyak-Atyrau / KK | 阿克纠宾产区集输节点 |
| S-09 | Shagyr 装卸站 | Turkestan | RAIL | KazTransOil | 铁路油罐车装卸 |
| S-10 | T. Kasymov 装卸站 | — | RAIL | KazTransOil | 铁路油罐车装卸 |

### 2.4 下游 — 炼油厂

| 节点编号 | 名称 | 所在州/城市 | 加工能力 (Mtpa) | 规划扩能 | 处理深度 | 产品标准 | 运营方 | 原油来源 | 产品去向 |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | Atyrau 炼油厂 (ANPZ) | Atyrau / 阿特劳 | 5.5 | → 6.7 Mtpa | ~89% | Euro-4/5 | KMG | 本地油田（Tengiz 等）+ 管道来油 | 哈西部成品油市场 |
| R-02 | Pavlodar 石化厂 (PNPZ) | Pavlodar / 巴甫洛达尔 | 5.5 | → 8 Mtpa | ~89% | Euro-4/5 | KMG | 俄西西伯利亚原油（管道来油） | 哈北部/中部市场 |
| R-03 | Shymkent 炼油厂 (PKOP) | Shymkent / 奇姆肯特 | 6.0 | → 12 Mtpa | ~89% | Euro-4/5 | PetroKazakhstan Oil Products (KMG 50%+) | Kumkol + 中哈管道来油 | 哈南部市场 + 出口中亚 |

### 2.5 下游 — 石化与天然气处理

| 节点编号 | 名称 | 所在州/地点 | 类型 | 状态 | 投资额 (USD) | 产能 | 产品 | 运营方 | 原料来源 | 下游连接 |
|---|---|---|---|---|---|---|---|---|---|---|
| PC-01 | Tengiz 天然气分离综合体 (GSC) | Atyrau (Tengiz) | GSC | 在建 (2025-2029) | >20 亿 | 91 亿m³/年干气处理 | 乙烷 160 万吨/年 + 丙烷 36 万吨/年 | KMG PetroChem | F-01 Tengiz | → PC-03 Silleno (乙烷), → PC-02 KPI (丙烷) |
| PC-02 | KPI 聚丙烯厂 | Atyrau (Karabatan SEZ) | PETROCHEM | 运营 (2022) | 26 亿 | 50 万吨/年 聚丙烯 | 聚丙烯粒料 | KPI Inc. | Tengiz 丙烷（当前）；未来来自 PC-01 | → 114 家下游加工企业 |
| PC-03 | Silleno 聚乙烯厂 | Atyrau (Karabatan SEZ) | PETROCHEM | 在建 (→2029) | 74 亿 | 125 万吨/年 聚乙烯 | PE 粒料 | Silleno LLP (KMG 40% / SIBUR 30% / SINOPEC 30%) | PC-01 Tengiz GSC 乙烷 | → 出口（欧洲/CIS/中国/土耳其） |
| PC-04 | Butadiene 橡胶厂 | Atyrau (Karabatan SEZ) | PETROCHEM | 在建 (Phase 1: 2025; 全 2027) | ~10 亿 | 38.8 万吨/年（含 12 万吨丁二烯） | DSSR 轮胎橡胶 / SBS / MTBE | Butadiene LLP (Tatneft 75% / Samruk 25%) | Tengiz + Korolev | → 轮胎/道路/塑料行业 |
| PC-05 | TPA/PET 厂 | Atyrau (Karabatan SEZ) | PETROCHEM | 规划 (2026-2029) | ~15 亿 | 73.5 万吨/年 PET | 对苯二甲酸 + 聚酯切片 | KMG PetroChem | — | → 包装/纺织 |
| PC-06 | Karachaganak GPP (4 bcm) | West Kazakhstan (Karachaganak) | GPP | 争议/延迟 (谈判破裂 2025.6) | 35-37 亿 | 40-45 亿m³/年原料气 | 商品气 + 凝析油 | KPO（或 KMG 独建） | F-06 Karachaganak | → 替代 Orenburg GPP (俄) |
| PC-07 | Kashagan GPP (Bolashak 扩建) | Atyrau (Bolashak 陆上处理厂) | GPP | 规划中 (Stage 2A/2B) | — | ~25 亿m³/年 | 商品气 + LPG | NCOC | F-03 Kashagan | — |
| PC-08 | Caspi Bitum 沥青厂 | Mangystau (阿克套) | BITUMEN | 运营 | — | 100 万吨/年（计划扩至 150 万） | 道路沥青 | KMG 合资 | MMG 重质原油（Karazhanbas） | → 哈国内道路建设 |
| PC-09 | KazGPP 天然气处理厂 | Mangystau | GPP | 运营 | — | — | 商品气 + LPG | KMG 子公司 | Mangystau 各油田伴生气 | — |
| PC-10 | Zhanaozen GPP (计划) | Mangystau | GPP | 计划中 | — | — | 商品气 | KMG + Linde AG | Mangystau 油田气 | — |
| PC-11 | 新炼油厂（西部） | 待定（西哈/阿特劳） | REF | 规划 (2030-2033) | — | 10 Mtpa | 成品油 | KMG | 西部油田 | → 出口（中国/印度/中亚） |

### 2.6 出口终端与边境节点

| 节点编号 | 名称 | 类型 | 位置 | 运能/运量（2025，公开） | 运营方 | 上游连接 | 后续流向 |
|---|---|---|---|---|---|---|---|
| E-01 | CPC 海上终端 (Novorossiysk) | PORT | 俄黑海沿岸 (Yuzhnaya Ozereevka) | 70.52 Mt (2025 实际)；3 SPM、100 万m³ 罐容 | CPC-R | P-01 CPC 管道 | 油轮 → 地中海/全球市场 |
| E-02 | 阿克套港 | PORT | Mangystau (里海东岸) | 装油能力 12.5 Mtpa；2025 实装 ~3.2 Mt；4 个油轮泊位 | KazTransOil / 阿克套港 | P-05 KK-Aktau, P-06 UZ-Aktau | 油轮 → 巴库 (阿塞拜疆) → BTC 管道 → 土耳其 Ceyhan (地中海) |
| E-03 | 库里克港 (Kuryk) | PORT | Mangystau (阿克套以南 70km) | ~6 Mtpa（在建 Sarzha MMT 油码头 5.5 Mtpa） | — | — | 油轮 → 巴库 / 马哈奇卡拉 |
| E-04 | Alashankou 边境站 | BORDER | 中哈边境 (阿拉山口) | 20 Mtpa（管道运能） | KZ-China Pipeline LLP | P-09 Atasu-Alashankou | → 中国独山子炼油厂及管道网 |
| E-05 | Samara 交接站 | BORDER | 俄哈边境 (Samara) | UAS 管道 15-17 Mtpa | KazTransOil → Transneft | P-02 UAS | → 俄 Transneft → 德国 Schwedt / 波罗的海 Ust-Luga |
| E-06 | 阿克套→马哈奇卡拉 | PORT | 里海 | 2025 H1: ~99.9 万吨 | — | PORT-Aktau | → 俄 Makhachkala → Novorossiysk |

---

## 三、全链路拓扑关系

### 3.1 按产区划分的链路

**Atyrau 产区（全国最大）**：
```
Tengiz (F-01) + Korolev (F-02)
  ├── CPC 管道 (P-01) → CPC 海上终端 Novorossiysk (E-01) → 全球市场
  └── Tengiz GSC (PC-01) [在建]
        ├── 乙烷 → Silleno PE (PC-03) [在建→2029]
        └── 丙烷 → KPI PP (PC-02) [运营]

Kashagan (F-03) [海上]
  ├── Bolashak 陆上处理厂 → CPC 管道 (P-01) → E-01
  └── Kashagan GPP (PC-07) [规划中]

Atyrau 炼油厂 (R-01)
  ← 本地油田原油
  → 哈西部成品油市场
```

**West Kazakhstan 产区**：
```
Karachaganak (F-06)
  ├── KATS 管道 (P-04) → Atyrau (S-01) → CPC (P-01) → E-01
  └── → Orenburg GPP (俄) → 商品气返回（当前路线）
  └── Karachaganak GPP (PC-06) [争议/延迟]（未来替代 Orenburg）
```

**Mangystau 产区**：
```
Uzen (F-08) ─┬─ P-06 UZ-Aktau ──┐
Zhetybay (F-10) ─┘                │
                                    ├── 阿克套港罐区 (S-04)
Kalamkas (F-09) ─┬─ P-05 KK-Aktau ─┘       │
Karazhanbas (F-11) ─┘                       │
                                              ├── 阿克套港 (E-02) → 油轮 → 巴库 → BTC → Ceyhan
Dunga (F-12) → 本地集输 → 阿克套             │
                                              ├── 阿克套→马哈奇卡拉 (E-06) → Novorossiysk
Uzen (F-08) → UAS (P-02) → Atyrau → Samara (E-05) → 俄 → 欧洲
                                              │
Karazhanbas 重质油 → Caspi Bitum (PC-08) → 沥青
伴生气 → KazGPP (PC-09) → 商品气
```

**Aktobe 产区**：
```
Zhanazhol (F-14) ─┐
Kenkiyak (F-15) ──┼── Kenkiyak 站 (S-08)
                    │       │
                    │       ├── Kenkiyak-Atyrau (P-07) → Atyrau → CPC
                    │       │
                    │       └── Kenkiyak-Kumkol (P-08) →
                    │                                     │
Urikhtau (F-16) ───┘                                     ↓
                                                    Kumkol 站 (S-07)
                                                          │
Kumkol (F-17) ──────────────────────────────────────────┘
                                                          │
                                                    Atasu 站 (S-06)
                                                          │
                                                    Atasu-Alashankou (P-09)
                                                          │
                                                    Alashankou (E-04) → 中国
                                                          │
                                                    Shymkent 炼油厂 (R-03)
```

**Kyzylorda 产区**：
```
Kumkol (F-17) → 中哈管道 (P-08/P-09) → 中国 / Shymkent 炼厂
```

### 3.2 全国出口链路汇总

| 出口路线 | 途经关键节点 | 2025 运量参考 (Mt) | 占比 | 目的地 |
|---|---|---|---|---|
| CPC (黑海) | Tengiz/Kashagan → P-01 → E-01 | 70.52 | ~75% | 全球（地中海/欧洲） |
| UAS (俄 → 欧洲) | Uzen → P-02 → E-05 | 11.13 | ~12% | 德国 Schwedt、波罗的海 |
| 中哈管道 | Aktobe/Kyzylorda → P-08/P-09 → E-04 | 11.09 | ~12% | 中国新疆 |
| 阿克套 → BTC | Mangystau → P-05/P-06 → E-02 | ~1.3 (BTC段) | ~1.4% | 土耳其 Ceyhan (地中海) |
| 阿克套 → 马哈奇卡拉 | E-02 → E-06 | ~1.0 | ~1% | 俄黑海 |

### 3.3 国内炼化链路

| 炼厂 | 原油来源 | 产品辐射范围 |
|---|---|---|
| Atyrau (R-01) | Tengiz + Kashagan + Karachaganak (经管道汇集 Atyrau) | 哈西部 (Atyrau, Mangystau) |
| Pavlodar (R-02) | 俄西西伯利亚原油（管道进口） | 哈北部/中部 (Astana, Karaganda) |
| Shymkent (R-03) | Kumkol + 中哈管道来油 | 哈南部 (Shymkent, Almaty, Taraz) + 出口中亚 |
| Caspi Bitum (PC-08) | Karazhanbas 重质原油 | 哈全国道路建设 |
| Atyrau 石化集群 (PC-02/03/04/05) | Tengiz 乙烷/丙烷/丁烷 | 出口为主 + 部分国内加工 |

---

## 四、数据缺口与填充优先级

### 4.1 已填充（本次调研新增 vs 原 Manchystau-only 台账）

| 层面 | 原台账 (Mangystau only) | 本次新增 |
|---|---|---|
| 油田 | 5 个（Uzen/Kalamkas/Zhetybay/Karazhanbas/Dunga） | +13 个全国主要油田 |
| 管道 | 2 条（UZ-Aktau, KK-Aktau） | +8 条全国干线管道 |
| 炼厂 | 0 | +3 大全哈炼厂 + 1 规划新炼厂 |
| 石化 | 3 个（仅提及名称） | +11 个详细参数含产能/投资/状态 |
| 出口终端 | 阿克套港简述 | +6 个出口/边境节点 |
| 储运枢纽 | 0 | +10 个泵站/罐区/装卸站 |
| 链路关系 | 无系统化 | 完整产区→管道→出口/炼化链路 |

### 4.2 仍需补充（Demo 第二阶段或实地/官方渠道）

| 缺口 | 说明 | 替代方案 |
|---|---|---|
| 各油田精确井口坐标 | 公开数据不可得（安全敏感） | Demo 使用近似坐标 + "示意"标注 |
| 36 个泵站完整清单和位置 | KazTransOil 未公开全部细节 | Demo 使用主要枢纽示意 |
| 计量站具体位置和编号 | 安全敏感信息 | Demo 完全模拟 |
| 各油田精确日产量时间序列 | 企业内部数据 | Demo 使用年产量量级 + 随机波动模拟 |
| 管道实时流量/压力 | 运营数据 | Demo 完全模拟 |
| 铁路装卸站完整分布 | 未系统化公开 | Demo 使用已知站点示意 |
| 国内成品油管道网络 | 信息碎片化 | 仅标注干线原油管道 |
| 各石化厂精确原料消耗量 | 企业内部数据 | Demo 使用产能反推 |

---

## 五、Demo 应用建议

### 5.1 全国态势图（节点地图）

- 以 GADM 哈国行政边界为底图
- 标注 F-01 ~ F-18 油田点位（示意坐标）
- 标注 R-01 ~ R-03 炼厂
- 标注 E-01 ~ E-06 出口终端/边境站
- 标注 P-01 ~ P-09 管道线条
- 全局标注"数据为模拟演示"

### 5.2 产业链路图（节点关系网络）

- 使用 3.1 / 3.2 的拓扑关系构建力导向图或桑基图
- 节点 = 上表中的 F/P/S/R/PC/E 编号
- 连线 = 原油/产品的上下游流向
- 支持点击节点查看详情（弹出面板）

### 5.3 场景关联

| 8 大 Demo 场景 | 可复用节点 |
|---|---|
| 实时感知 | 全部 F/P/E 节点 + 模拟流量数据 |
| 异常预警 | F 节点产量偏离 / P 节点流量压力异常 |
| 自动归因 | 节点链路回溯：异常 → 上游哪个 Field → 哪条 Pipe 受影响 |
| 全链留痕 | 每个节点的事件日志 + 状态变更审计 |
| 监管报告 | 按产区/链路汇总产量、运量、合规状态 |
| 断电停产模拟 | 参考 Interfax 报道：核电站断电 → Ozenmunaigas + MMG + Karazhanbasmunai 停产 |
| CPC 管道受损模拟 | CPC 受损 → 改道 Aktau / UAS / 中哈管道 |
| 新油田开发审批 | Kalamkas-Sea 开发 → 环评 → 设备采购 → 投产 |

---

## 六、资料来源

| 编号 | 来源 | 用途 |
|---|---|---|
| N01 | KMG 2024 年报 (ar2024.kmg.kz) | Tengiz/Kashagan/Karachaganak 产量、CPC/KazTransOil 运量 |
| N02 | KMG 官网项目页 (kmg.kz) | 油田项目参数、石化项目进展 |
| N03 | KMG PetroChem (kmgpetrochem.kz) | KPI/Silleno/TPA-PET/GSC 详细参数 |
| N04 | CPC 官网 (cpc.ru) | CPC 管道和海上终端运量、罐容、泊位 |
| N05 | KazTransOil 官网 (kaztransoil.kz) | 管网长度、泵站数、罐容、分路线运量 |
| N06 | GEM.wiki (gem.wiki) | 油田/管道技术参数（交叉验证用） |
| N07 | The Astana Times (astanatimes.com) | 2025-2026 产量和运量最新报道 |
| N08 | Interfax Kazakhstan / Kursiv | 事件报道（CPC 中断、Karachaganak GPP 谈判等） |
| N09 | BOE Report / Upstream Online | 月度产量数据、行业分析 |
| N10 | 本项目既有台账 (aktau-mangystau-energy-source-ledger.md) | Mangystau 州 5 油田 + 2 管道原始数据 |
