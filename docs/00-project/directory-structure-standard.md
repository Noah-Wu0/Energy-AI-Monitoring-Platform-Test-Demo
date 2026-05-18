# 文件目录系列规范

## 1. 总体结构

项目根目录分为 `docs/`、`assets/` 和后续工程目录。当前阶段先建立文档和素材结构，工程目录等正式开始开发时再创建。

```text
能源部Ai项目/
  README.md
  docs/
    00-project/
    01-product/
    02-design/
    03-engineering/
    04-data/
    05-assets/
    06-handoff/
    research/
  assets/
    raw/
    processed/
    maps/
    logos/
    screenshots/
    references/
```

## 2. docs 目录

### `docs/00-project/`

项目管理层文件。放项目索引、文件规范、目录规范、关键决策记录。

建议文件：

```text
project-index.md
file-usage-standard.md
directory-structure-standard.md
decision-log.md
```

### `docs/01-product/`

产品需求层文件。放 PRD、本地补充 PRD、用户流程、演示脚本、范围变化。

建议文件：

```text
prd-local-outline.md
demo-storyline.md
user-flow.md
scope-change-log.md
```

### `docs/02-design/`

设计层文件。放视觉规范、布局规则、页面说明、组件规范、设计参考。

建议文件：

```text
design-guidelines.md
page-structure.md
component-guidelines.md
visual-language.md
```

### `docs/03-engineering/`

工程层文件。放技术架构、工程目录规划、接口约定、开发计划。

建议文件：

```text
architecture.md
frontend-structure.md
coding-conventions.md
implementation-plan.md
```

### `docs/04-data/`

数据层文件。放 mock 数据结构、字段字典、数据生成逻辑、状态枚举。

建议文件：

```text
mock-data-contract.md
field-dictionary.md
event-state-machine.md
timeseries-generation-rules.md
```

### `docs/05-assets/`

素材层文件。放素材清单、地图素材处理说明、版权来源、可用性判断。

建议文件：

```text
asset-intake-standard.md
asset-inventory.md
map-material-notes.md
source-attribution.md
```

### `docs/06-handoff/`

交接层文件。放每次模型接力的上下文、任务单、验收清单。

建议文件：

```text
YYYY-MM-DD-agent-handoff.md
task-card-template.md
qa-checklist.md
```

### `docs/research/`

调研层文件。放 B 端案例、竞品观察、视觉参考、设计启发。

建议文件：

```text
b2b-interface-reference-cases.md
energy-dashboard-patterns.md
audit-workflow-patterns.md
```

## 3. assets 目录

### `assets/raw/`

原始素材目录。所有下载、截图、用户提供的原始素材先放这里。禁止直接编辑。

### `assets/processed/`

处理后素材目录。包括裁剪、压缩、改色、标注、转格式后的素材。

### `assets/maps/`

地图相关素材目录。包括哈萨克斯坦、曼吉斯套州、阿克套区域、油田作业区示意等。

### `assets/logos/`

Logo 和机构标识目录。需要保留来源说明，避免混用未经授权的正式标识。

### `assets/screenshots/`

过程截图、验收截图、竞品截图目录。

### `assets/references/`

视觉参考、情绪板、外部案例截图目录。

## 4. 后续工程目录建议

正式开始开发后，建议创建：

```text
aktau-energy-ai-demo/
  app/
  components/
  data/
  domain/
  services/
  locales/
  public/
```

原则：

- 工程目录不要混放调研文档。
- `public/` 只放运行时需要访问的静态资源。
- 未确认可用的素材不要直接进入工程目录。
- `data/` 存 mock 数据，`domain/` 存类型和业务状态，`services/` 存可替换 adapter。

## 5. 多模型协作边界

不同模型接力时按目录分工：

- 产品模型只改 `docs/01-product/`。
- 设计模型只改 `docs/02-design/` 和 `assets/references/`。
- 数据模型只改 `docs/04-data/` 和未来工程 `data/`。
- 工程模型只改工程目录和 `docs/03-engineering/`。
- 素材处理模型只改 `assets/processed/`、`assets/maps/` 和 `docs/05-assets/`。

如需跨目录修改，必须在交接文件中说明原因。
