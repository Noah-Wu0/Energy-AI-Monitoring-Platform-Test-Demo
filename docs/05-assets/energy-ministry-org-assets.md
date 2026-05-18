# 能源部机构与下属单位素材说明

## 1. 来源

本文件整合历史飞书文档中的能源部客户资料：

```text
https://01ai.feishu.cn/docx/UmDNdivaPotPiJxMXPdcwQ1UnUd
```

该文档包含能源部基础信息、领导层、组织架构白板和若干下属机构资料。已将其中图片下载到本地参考目录：

```text
assets/references/feishu-energy-ministry/
```

## 2. 已下载参考素材

| 文件 | 类型 | 尺寸 | 用途建议 |
|---|---|---:|---|
| `leader-akkenzhenov-yerlan.png` | 领导照片 | 480 × 720 | 客户资料参考，不进入 demo 主界面 |
| `leader-akbarov-yerlan.png` | 领导照片 | 480 × 720 | 客户资料参考，不进入 demo 主界面 |
| `leader-ilyas-nassenuly.png` | 领导照片 | 480 × 720 | 数字能源相关背景参考 |
| `leader-yessimkhanov-sungat.png` | 领导照片 | 480 × 720 | 电力与新能源相关背景参考 |
| `org-korem.png` | 机构图像/logo | 415 × 509 | 电力市场线参考 |
| `org-rfc-for-res.png` | 机构图像/logo | 480 × 474 | 新能源结算线参考 |
| `org-fec-situation-analytical-center.png` | 机构图像/logo | 225 × 224 | 油气数据调度线参考 |
| `org-sez-nipt.png` | 机构图像/logo | 966 × 748 | 石化工业线参考 |
| `org-structure-whiteboard.jpg` | 组织架构白板导出 | 2560 × 2560 | 组织关系参考，不直接作为页面素材 |

## 3. 能源部正式展示口径

正式感应来自清晰的机构层级，而不是堆满真实 logo。

推荐层级：

```text
哈萨克斯坦共和国能源部
  ├─ 电力市场与新能源金融基建线
  │   ├─ KOREM
  │   └─ RFC for RES
  ├─ 传统油气资源数据与调度监控线
  │   └─ SAC FEC / 燃料能源综合体形势分析中心
  └─ 石化工业线
      └─ SEZ NIPT
```

页面中建议这样表达：

- Header：国徽 + 哈萨克斯坦共和国能源部。
- 首页左栏或“机构视图”：展示三条业务线。
- 机构节点：优先使用名称 + 行业图标；logo 作为详情层参考。
- 报告页：只使用能源部机构标识，不放大量企业 logo。

## 4. 机构资料与官方来源

| 机构 | 官方/公开来源 | 可用信息 | Demo 用途 |
|---|---|---|---|
| Ministry of Energy of the Republic of Kazakhstan | `gov.kz/memleket/entities/energo/about` | 职能、方向、领导信息 | 顶层机构与监管语境 |
| KOREM | `korem.kz`、gov.kz 下属机构页 | 电力与容量市场运营商 | 电力市场交易/竞价节点 |
| RFC for RES | `rfc.kz`、gov.kz 下属机构页 | 可再生能源结算、单一买方、电力市场结算 | 新能源金融结算节点 |
| SAC FEC / 燃料能源综合体形势分析中心 | gov.kz 下属机构页、`sactek.kz` 线索 | 油气产业数据、计量、调度、分析 | 油气数据大脑/调度中心节点 |
| SEZ NIPT | `nipt.kz`、gov.kz 下属机构页 | 石化园区、投资项目、下游承载 | 石化工业链节点 |

## 5. 使用边界

- 领导照片只作为客户研究资料，不进入监管 demo 主流程。
- 下属机构 logo/截图优先作为参考，不一定进入主界面。
- 如果需要正式展示，优先使用机构名称和统一图标系统，减少未授权 logo 的显性使用。
- 所有真实机构信息不得与模拟异常数据绑定成真实监管结论。
- 对外演示前需要再次确认 logo 使用边界。

## 6. 查漏补缺建议

高优先级：

- 补 `SAC FEC / sactek.kz` 的官方 logo 或网站截图来源。
- 补 KOREM 官方站点 logo 的可下载原图或 SVG。
- 补 RFC for RES 官方站点 logo 的可下载原图或 SVG。

中优先级：

- 补 KazTransOil、QazaqGaz、Aktau Commercial Sea Port 作为产业网络节点参考。
- 补 KEGOC / Samruk-Energy，仅当电力线成为主线时使用。

低优先级：

- 补领导层照片的来源台账，主要用于客户研究，不用于 demo 主界面。
