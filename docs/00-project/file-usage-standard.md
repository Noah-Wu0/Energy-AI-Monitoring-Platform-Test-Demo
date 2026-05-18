# 文件使用规范

## 1. 基本原则

本项目会由 Codex、Claude Code、Gemini/Antigravity 等多个工具接力。文件规范的目标是减少上下文丢失、避免素材误用、降低重复劳动。

原则如下：

1. 文档、素材、代码、数据分区存放。
2. 原始文件保留，不覆盖、不重命名原件。
3. 每个处理后的素材都能追溯来源。
4. 每个交付文件只承担一个明确用途。
5. 命名要让陌生协作者不打开文件也能判断内容。

## 2. 命名规则

统一使用小写英文、数字和短横线，避免空格。中文标题可以放在文件内容里，不建议出现在工程文件名中。

推荐格式：

```text
YYYY-MM-DD-topic-purpose.ext
module-name-purpose.ext
asset-source-topic-version.ext
```

示例：

```text
2026-05-18-b2b-interface-reference-cases.md
aktau-main-event-flow.md
mock-energy-timeseries-v1.ts
map-mangystau-reference-raw.png
map-aktau-dashboard-processed-v1.svg
```

## 3. 文档文件规则

| 文件类型 | 存放位置 | 说明 |
|---|---|---|
| 项目说明 | `docs/00-project/` | 项目入口、规范、决策记录 |
| 产品需求 | `docs/01-product/` | PRD、流程、演示脚本 |
| 设计规范 | `docs/02-design/` | 页面结构、视觉规范、组件说明 |
| 工程规范 | `docs/03-engineering/` | 架构、技术栈、开发约定 |
| 数据说明 | `docs/04-data/` | Mock 数据、字段字典、数据生成逻辑 |
| 素材说明 | `docs/05-assets/` | 素材清单、来源、授权、处理状态 |
| 交接记录 | `docs/06-handoff/` | 多模型任务说明和上下文压缩 |

## 4. 素材文件规则

素材必须按状态归档：

| 目录 | 可否修改 | 用途 |
|---|---:|---|
| `assets/raw/` | 不可修改 | 原始素材，保留来源和原貌 |
| `assets/processed/` | 可修改 | 已裁剪、压缩、调色、标注后的素材 |
| `assets/maps/` | 可修改 | 地图底图、区域示意、地理相关素材 |
| `assets/logos/` | 可修改 | 项目标识、机构标识、图标素材 |
| `assets/screenshots/` | 可修改 | 竞品截图、过程截图、页面验收截图 |
| `assets/references/` | 可修改 | 参考案例图、情绪板、外部视觉参考 |

原始素材命名建议：

```text
source-topic-raw-v1.ext
```

处理素材命名建议：

```text
topic-usage-processed-v1.ext
```

示例：

```text
map-mangystau-public-reference-raw-v1.png
map-aktau-monitoring-background-processed-v1.webp
```

## 5. 版本规则

小改动不新增版本，重大语义变化新增版本。

需要新增版本的情况：

- 页面主流程改变。
- 数据结构字段改变。
- 地图或素材用途改变。
- 设计方向明显改变。
- 文件将被另一个模型继续使用。

版本命名：

```text
v1, v2, v3
```

不要使用：

```text
final
final-final
new
latest
```

## 6. 禁止事项

- 不要把临时截图、未筛选素材直接放根目录。
- 不要覆盖 `assets/raw/` 下的原始素材。
- 不要把飞书导出的临时文件混进工程目录。
- 不要在不同目录放同名不同内容文件。
- 不要在没有说明的情况下删除别人或其他模型创建的文件。

## 7. 交接要求

每次让另一个模型接力前，至少提供：

1. 当前任务目标。
2. 已完成文件。
3. 不要改动的文件。
4. 需要继续处理的文件。
5. 验收标准。

交接文件放在：

```text
docs/06-handoff/
```
