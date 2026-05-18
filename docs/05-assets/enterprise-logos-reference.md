# 企业品牌与标识参考档案

> 整理日期：2026-05-18
> 用途：Demo 页面中涉及的企业/机构标识参考，不暗示官方授权或合作

## 1. 已获取标识素材

### 1.1 哈萨克斯坦共和国国徽（State Emblem）

| 字段 | 内容 |
|---|---|
| 文件名 | `kazakhstan-national-emblem-v1.jpg` |
| 位置 | `assets/logos/` |
| 格式 | JPEG |
| 尺寸 | 3600 × 3734 px（2.6 MB） |
| 来源 | 哈萨克斯坦总统官网 https://www.akorda.kz/assets/media/gerb.jpg |
| 版权/限制 | 国家标志通常不受普通著作权保护，但属于国家象征，仍需遵守官方使用边界；内部 demo 可谨慎使用，不代表官方授权 |
| Demo 用途 | 能源部标识占位（能源部无独立 logo），页面 header 或 footer |

### 1.1.1 处理后版本

| 字段 | 内容 |
|---|---|
| 文件名 | `kazakhstan-national-emblem-header-v1.jpg` |
| 位置 | `assets/logos/` |
| 格式 | JPEG |
| 尺寸 | 493 × 512 px（约 124 KB） |
| 生成方式 | 由 `kazakhstan-national-emblem-v1.jpg` 等比压缩生成 |
| Demo 用途 | 页面 header、报告页页眉、机构占位标识 |

### 1.2 KMG（KazMunayGas / 哈萨克斯坦国家石油天然气公司）

| 字段 | 内容 |
|---|---|
| 文件名 | `kmg-kazmunaygas-logo-v1.svg` |
| 位置 | `assets/logos/` |
| 格式 | SVG（矢量） |
| 尺寸 | 18 KB |
| 来源 | Logotyp.us（https://logotyp.us/logo/kazmunaygas/） |
| 版权/限制 | 企业注册商标，第三方素材库不授予商业使用权；demo 中仅作内部参考示意 |
| Demo 用途 | 企业节点卡片、监管对象列表中的企业标识 |

### 1.2.1 技术检查

- SVG 可正常作为前端矢量素材使用。
- 未发现脚本、外链、`foreignObject` 或事件处理属性。
- 主色：`#00adef`、`#231f20`、`#8ed8f8`。

### 1.3 KMG 旗下子公司（统一伞形品牌体系）

根据 2014 年 KMG 统一品牌决策，以下子公司**不再使用独立 logo**，统一使用 KMG 主标识 + 子公司名称（哈萨克语）的组合形式：

| 子公司 | 官网/信息来源 | 业务领域 | Demo 中命名建议 |
|---|---|---|---|
| **Mangistaumunaigas JSC** (Маңғыстаумұнайгаз) | www.mmg.kz | 曼吉斯套州 Kalamkas、Zhetybay 油田运营 | 曼吉斯套油气股份公司 |
| **Ozenmunaigas JSC** (Өзенмұнайгаз) | KMG 子公司名录 | 乌津油田运营 | 乌津油气股份公司 |
| **Karazhanbasmunai JSC** (Каражанбасмұнай) | KMG 子公司名录 | 卡拉让巴斯重质油田运营 | 卡拉让巴斯石油股份公司 |
| **KazTransOil JSC** (ҚазТрансОйл) | kaztransoil.kz | 原油管道运输（股票代码 KZTO） | 哈萨克斯坦石油运输股份公司 |
| **Kazmortransflot LLP** | KMG 子公司名录 | 国家海运船队（总部阿克套） | 哈萨克斯坦海上运输船队 |
| **KazGPP LLP** | KMG 子公司名录 | 曼吉斯套州天然气处理 | 哈萨克斯坦天然气处理厂 |
| **JV Caspi Bitum LLP** | KMG 合资企业 | 阿克套沥青生产 | 里海沥青合资企业 |
| **Dunga Operating GmbH** | KMG 参股 60% | Dunga 油田运营 | 敦加运营公司 |

## 2. 标识层级关系

```
哈萨克斯坦共和国国徽（能源部占位）
  │
  └─ KMG（国家石油天然气公司）── 母公司标识
       │
       ├─ Mangistaumunaigas JSC ── KMG 伞形品牌
       ├─ Ozenmunaigas JSC ── KMG 伞形品牌
       ├─ Karazhanbasmunai JSC ── KMG 伞形品牌
       ├─ KazTransOil JSC ── KMG 伞形品牌（主色 #243B74）
       ├─ Kazmortransflot LLP ── KMG 伞形品牌
       ├─ KazGPP LLP ── KMG 伞形品牌
       ├─ JV Caspi Bitum LLP ── KMG 伞形品牌
       └─ Dunga Operating GmbH ── KMG 参股（含 Oman Oil、PTTEP）
```

## 3. Demo 使用规范

### 3.1 可以使用

- **国徽 header 版本**：作为能源部占位标识，置于页面 header/footer 或报告页页眉
- **KMG logo（SVG）**：在企业节点卡片、列表、详情面板中谨慎使用
- **企业名称**：中文译名 + 英文/哈语原名

### 3.2 不能做

- 不得修改国徽设计，不做重绘、裁切变形或装饰化处理
- 不得把国徽作为大面积背景花纹
- 不得暗示与 KMG 或其子公司有官方合作
- 不得将 KMG logo 用于 demo 外的任何商业用途
- 不得在非 demo 场景使用企业真实名称或 logo
- 不得将企业 logo 与模拟异常结论直接绑定，避免误导为真实监管问题

### 3.3 Demo 页面标注建议

在 footer 或关于页面标注：

> "本演示中的所有企业名称和标识仅作行业背景参考，不暗示与相关企业存在合作或授权关系。所有数据均为模拟生成。"

## 4. 尚未获取的素材

| 标识 | 状态 | 说明 |
|---|---|---|
| 能源部标识 | 无独立 logo | 能源部使用国徽 + 部名文字组合，demo 中用国徽代替 |
| KazTransOil SVG | 未下载 | Brandfetch 有提供，后续可补充 |
| 子公司独立历史 logo | 不再需要 | 2014 年后统一使用 KMG 伞形品牌 |
| 阿克套港标识 | 未查找 | 阿克套商业港口可能有独立标识，优先级低 |
| QazaqGaz 标识 | 未下载 | 国家天然气管道运营商，如 demo 需要天然气板块可补充 |

## 4.1 能源部下属机构素材

历史飞书资料中已下载以下参考图片，详见：

```text
docs/05-assets/energy-ministry-org-assets.md
assets/references/feishu-energy-ministry/
```

| 机构 | 本地参考素材 | 正式使用建议 |
|---|---|---|
| KOREM | `org-korem.png` | 可作为机构详情参考；首页优先用名称 + 电力市场图标 |
| RFC for RES | `org-rfc-for-res.png` | 可作为机构详情参考；首页优先用名称 + 新能源结算图标 |
| SAC FEC / 燃料能源综合体形势分析中心 | `org-fec-situation-analytical-center.png` | 可作为油气数据调度节点参考 |
| SEZ NIPT | `org-sez-nipt.png` | 可作为石化工业线参考 |

正式感建议：

- 顶层只使用能源部机构标识。
- 三条业务线用统一图标系统，不在首页平铺多个真实 logo。
- 真实 logo 放在详情层或资料附录。
- 如果需要对外演示，优先使用官方站点可下载 logo 或文字标识。

## 5. 后续工作

- [ ] 从国徽 JPEG 提取简化 SVG 路径（如前端需要矢量格式）
- [ ] 从 Brandfetch 下载 KazTransOil 独立标识（如需区分管道运营商）
- [ ] 设计 demo 专属的能源部临时标识（国徽 + "哈萨克斯坦共和国能源部" 中/哈/英三语文字组合）
- [ ] 确认阿克套商业港口（Aktau Commercial Sea Port）是否有独立标识
- [ ] 如计划对外演示，确认国徽和 KMG 标识使用边界，必要时改用文字和抽象图标
