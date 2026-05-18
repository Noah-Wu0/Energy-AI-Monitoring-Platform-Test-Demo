# 地图素材说明

## 1. 素材来源

- **仓库**：https://github.com/open-data-kazakhstan/geo-boundaries-kz
- **上游数据**：GADM (https://gadm.org/)
- **许可证**：Open Data Commons Public Domain Dedication and License (ODC-PDDL)，可自由使用、修改、分发
- **获取日期**：2026-05-18
- **行政边界版本**：gadm36（当前 GADM 3.6 版本）
- **数据质量说明**：GADM 是学术界广泛使用的全球行政边界数据集，适合 Demo 级交互地图和示意图，非官方测绘精度

## 2. 已获取地图文件清单

### 2.1 原始素材（assets/raw/geo-boundaries-kz/）

| 文件 | 格式 | 大小 | 内容 |
|---|---|---|---|
| `data/geojson/kz_0.json` | GeoJSON | 239 KB | 哈萨克斯坦国界（level 0） |
| `data/geojson/kz_1.json` | GeoJSON | 307 KB | 17 个一级行政区（州级/直辖市，含直辖市等一级 Feature） |
| `data/geojson/kz_2.json` | GeoJSON | 901 KB | 二级行政区（区/县级） |
| `data/topojson/kz.topojson.json` | TopoJSON | 292 KB | 全部三级行政边界（合并文件） |
| `data/svg/kz.svg` | SVG | 744 KB | 哈萨克斯坦全国简化 SVG 矢量图 |
| `data/shape/*` | Shapefile | ~2.5 MB | ESRI Shapefile 格式（含 .shp/.dbf/.prj/.shx） |
| `data/csv/gadm36_KAZ_*.csv` | CSV | 少量 | 各级行政区属性表 |

### 2.2 处理后可用素材（assets/maps/）

| 文件 | 格式 | 大小 | 内容 |
|---|---|---|---|
| `kazakhstan-national-boundary-v1.geojson` | GeoJSON | 239 KB | 全国边界 |
| `kazakhstan-regions-v1.geojson` | GeoJSON | 307 KB | 17 个一级行政区 Feature（含曼吉斯套州） |
| `kazakhstan-districts-v1.geojson` | GeoJSON | 901 KB | 全国二级行政区（含曼吉斯套州 5 个区） |
| `kazakhstan-all-levels-topojson-v1.json` | TopoJSON | 292 KB | 全级别合并 TopoJSON，适合前端交互 |
| `kazakhstan-reference-v1.svg` | SVG | 744 KB | 全国行政区划 SVG 示意图 |
| `mangystau-region-v1.geojson` | GeoJSON | < 100 KB | 曼吉斯套州单独边界（MultiPolygon） |
| `mangystau-districts-v1.geojson` | GeoJSON | < 100 KB | 曼吉斯套州 5 个二级行政区（含阿克套市） |

## 3. 每个文件的用途建议

### 3.1 前端交互地图

优先使用以下文件：

| 文件 | 推荐用途 | 原因 |
|---|---|---|
| `kazakhstan-all-levels-topojson-v1.json` | **首页全国概览地图** | TopoJSON 体积最小（292 KB），含全三级边界，适合 d3-geo / MapLibre / Leaflet 加载 |
| `kazakhstan-regions-v1.geojson` | **州级下钻地图** | 直接包含 14 个州 Feature，可高亮选中州 |
| `mangystau-region-v1.geojson` | **曼吉斯套州特写地图** | 仅曼吉斯套州边界，渲染快 |
| `mangystau-districts-v1.geojson` | **曼吉斯套州内下钻（区级）** | 阿克套市 + 4 个区，适合油田点位标注 |

### 3.2 视觉参考与 SVG 示意

| 文件 | 推荐用途 | 原因 |
|---|---|---|
| `kazakhstan-reference-v1.svg` | **浅色风格示意图参考**、**非交互页面占位** | 纯矢量图，可调色、简化、标注；744 KB，不适合直接嵌入大量交互页面 |

### 3.3 建议后续处理

- `kz_0.json` / `kz_1.json` 精度为 GADM level 0/1，适合概览；如需展示油田/管道级别精度，后续需要更细粒度的作业区边界或点位数据
- TopoJSON 文件可以用 `topojson-simplify` 进一步压缩，目标 < 150 KB
- SVG 建议重新导出为浅色配色版本，用于设计稿

## 4. 曼吉斯套州/阿克套区域处理建议

### 4.1 当前可用边界

- 曼吉斯套州（GID_1: `KAZ.6_1`，NAME_1: `Mangghystau`，HASC: `KZ.MG`）
- 下辖 5 个二级区：
  - **Aqtau**（阿克套市，GID_2: `KAZ.6.1_1`）— 行政中心、港口城市
  - **Beyneuskiy**（别伊涅乌区，GID_2: `KAZ.6.2_1`）— 北部管道走廊
  - **Karakiyanskiy**（卡拉基亚区，GID_2: `KAZ.6.3_1`）— 南部区域
  - **Manghystauskiy**（曼吉斯套区，GID_2: `KAZ.6.4_1`）— 中部区域
  - **Tupkaraganskiy**（图普卡拉甘区，GID_2: `KAZ.6.5_1`）— Dunga 油田所在地

### 4.2 Demo 地图使用建议

1. **首页概览**：Kazakhstan 全国地图 + 曼吉斯套州高亮 + 阿克套标注
2. **州级下钻**：点击曼吉斯套州 → 放大到 `mangystau-region-v1.geojson`，显示油田节点和管道连线
3. **点位标注**：阿克套港、油田位置（Uzen、Kalamkas、Karazhanbas、Zhetybay、Dunga）手动物理坐标标注，不依赖 GADM 精度
4. **管道示意**：Uzen-Zhetybay-Aktau 管道、Kalamkas-Karazhanbas-Aktau 管道以曲线示意方式叠加在地图上

## 5. 后续还缺什么素材

> **决策**：因油田精确坐标、计量站/泵站位置等无法从公开渠道获取，第一阶段全部使用模拟坐标和模拟节点位置。以下缺口均可通过模拟数据生成器解决。

### 5.1 高优先级

- [ ] 浅色风格配色的简化 SVG 地图（从 kz.svg 重新导出为浅色系配色）
- [ ] 能源设施图标（泵站、压缩站、计量站、储罐区、港口）— 矢量图标
- [ ] 异常等级/状态图标（正常/提示/重要/紧急）— 按设计规范色系

### 5.2 中优先级

- [ ] 阿克套城市简化示意图（非 GIS 精度，卡片背景用途）
- [ ] 管道网络简化路线示意（方向标注即可，无需精确路线）
- [ ] 可用于背景的低饱和工业/港口参考图

### 5.3 低优先级

- [ ] DEM 地形数据
- [ ] 商业底图服务接入（Mapbox/MapTiler）
- [ ] 油田精确边界（不公开，也不需要）

## 6. 版权与使用边界

- GADM 数据使用 ODC-PDDL 许可证，**无版权限制**，可用于商业和非商业项目
- 本 demo 的地图仅为示意，页面应标注"地图边界仅为示意，非官方测绘"
- 不要暗示地图具有法律边界效力
- 如后续需要更高精度边界，可考虑官方来源（如哈萨克斯坦数字发展部公开数据）或商业底图服务
