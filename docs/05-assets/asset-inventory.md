# 素材清单

## 1. 地图素材

| 文件 | 类型 | 来源 | 当前状态 | 前端可用性 | 建议用途 |
|---|---|---|---|---|---|
| `assets/maps/kazakhstan-all-levels-topojson-v1.json` | TopoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 高 | 首页全国地图，优先加载 |
| `assets/maps/kazakhstan-regions-v1.geojson` | GeoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 高 | 州级边界和选中高亮 |
| `assets/maps/kazakhstan-national-boundary-v1.geojson` | GeoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 中 | 全国外轮廓、背景层 |
| `assets/maps/kazakhstan-districts-v1.geojson` | GeoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 中 | 全国区级下钻，体积略大 |
| `assets/maps/mangystau-region-v1.geojson` | GeoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 高 | 曼吉斯套州特写 |
| `assets/maps/mangystau-districts-v1.geojson` | GeoJSON | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 高 | 曼吉斯套州内区级下钻 |
| `assets/maps/kazakhstan-reference-v1.svg` | SVG | open-data-kazakhstan/geo-boundaries-kz | 已处理 | 中 | 设计参考、静态占位、后续重着色 |

## 2. 原始素材

| 路径 | 内容 | 说明 |
|---|---|---|
| `assets/raw/geo-boundaries-kz/` | 原始 GitHub 仓库 | 保留上游 README、datapackage、geojson、topojson、shape、svg、csv |

注意：该目录中包含原始仓库结构，后续如需提交到 Git，需要确认是否保留完整原始仓库，或只保留上游说明和必要原始文件。

## 3. 品牌与机构标识

| 文件 | 类型 | 来源 | 当前状态 | 前端可用性 | 使用边界 |
|---|---|---|---|---|---|
| `assets/logos/kazakhstan-national-emblem-v1.jpg` | JPEG | Akorda 总统官网 | 原始高分辨率留档 | 低 | 2.7 MB，不建议直接进页面 |
| `assets/logos/kazakhstan-national-emblem-header-v1.jpg` | JPEG | 由原图压缩生成 | 已处理 | 中 | 可作能源部占位标识，需保留 demo 说明 |
| `assets/logos/kmg-kazmunaygas-logo-v1.svg` | SVG | Logotyp.us / KMG 公开品牌参考 | 已处理 | 中 | 企业商标，仅内部 demo 参考，不暗示授权 |

品牌标识的详细使用口径见：

```text
docs/05-assets/brand-asset-usage-standard.md
docs/05-assets/enterprise-logos-reference.md
```

## 4. 当前可直接用于开发的素材

优先级从高到低：

1. `kazakhstan-all-levels-topojson-v1.json`
2. `kazakhstan-regions-v1.geojson`
3. `mangystau-region-v1.geojson`
4. `mangystau-districts-v1.geojson`
5. `kazakhstan-national-emblem-header-v1.jpg`
6. `kmg-kazmunaygas-logo-v1.svg`
7. `kazakhstan-reference-v1.svg`

## 5. 飞书历史资料参考素材

| 文件 | 来源 | 当前状态 | 建议用途 |
|---|---|---|---|
| `assets/references/feishu-energy-ministry/leader-akkenzhenov-yerlan.png` | 历史飞书客户资料 | 已下载 | 客户研究，不进 demo 主界面 |
| `assets/references/feishu-energy-ministry/leader-akbarov-yerlan.png` | 历史飞书客户资料 | 已下载 | 客户研究，不进 demo 主界面 |
| `assets/references/feishu-energy-ministry/leader-ilyas-nassenuly.png` | 历史飞书客户资料 | 已下载 | 数字能源背景参考 |
| `assets/references/feishu-energy-ministry/leader-yessimkhanov-sungat.png` | 历史飞书客户资料 | 已下载 | 电力与新能源背景参考 |
| `assets/references/feishu-energy-ministry/org-korem.png` | 历史飞书客户资料 | 已下载 | KOREM 机构标识参考 |
| `assets/references/feishu-energy-ministry/org-rfc-for-res.png` | 历史飞书客户资料 | 已下载 | RFC for RES 机构标识参考 |
| `assets/references/feishu-energy-ministry/org-fec-situation-analytical-center.png` | 历史飞书客户资料 | 已下载 | SAC FEC 机构标识参考 |
| `assets/references/feishu-energy-ministry/org-sez-nipt.png` | 历史飞书客户资料 | 已下载 | SEZ NIPT 机构标识参考 |
| `assets/references/feishu-energy-ministry/org-structure-whiteboard.jpg` | 历史飞书客户资料 | 已下载 | 组织架构参考 |

## 6. 需要继续处理的素材

- 浅色主题 Kazakhstan SVG 地图。
- 首页地图节点图标。
- 行业流转线图例。
- 石油、天然气、电力、数据报送的行业图标。
- 异常等级图标。
- 审计链图标。
- Demo 专属临时标识，降低真实政府/企业标识使用频率。
- KOREM、RFC for RES、SAC FEC、SEZ NIPT 的官方来源 logo 复核版。

## 7. 使用边界

- 地图边界用于 demo 示意，不代表官方测绘。
- 油田、管道、计量站等业务节点第一阶段全部使用模拟位置。
- 真实企业 logo 仅作内部 demo 参考，不暗示授权。
- 国徽仅作能源部占位标识，不做商业化、装饰化或改造使用。
- 历史飞书资料下载的图片先作为参考素材，不直接视为官方授权素材。
- 不使用带版权水印的底图或截图。

## 8. 检查记录

2026-05-18：

- `kazakhstan-regions-v1.geojson` 可解析，为 `FeatureCollection`，包含 17 个一级 Feature。
- `mangystau-districts-v1.geojson` 可解析，为 `FeatureCollection`，包含 5 个二级 Feature：Aqtau、Beyneuskiy、Karakiyanskiy、Manghystauskiy、Tupkaraganskiy。
- `assets/maps/` 总体体积约 2.5 MB，第一阶段可接受。
- `kazakhstan-national-emblem-v1.jpg` 为 3600 × 3734 JPEG，已生成 493 × 512 的 header 版本。
- `kmg-kazmunaygas-logo-v1.svg` 未发现脚本、外链、`foreignObject` 或事件处理属性；颜色主要为 `#00adef`、`#231f20`、`#8ed8f8`。
- 历史飞书文档中 4 张领导照片、4 张机构图像和 1 张组织架构白板已下载至 `assets/references/feishu-energy-ministry/`。
