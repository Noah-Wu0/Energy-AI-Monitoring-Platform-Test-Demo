# 阿克套油田 AI 监管 Demo 设计规范

## 1. 设计方向

本项目采用“浅色高级工业监管工作台”风格。界面应克制、清晰、可信，避免黑客风、科幻大屏、营销型 SaaS 首页和过度装饰。

首页布局定为：

```text
左侧信息栏 + 中央地图与产业流转网络 + 右侧事件/详情信息栏
```

中央地图负责空间关系和产业流向，左右信息栏负责监管判断、筛选、异常事件和下钻详情。

## 2. 设计关键词

- 浅色
- 高级简约
- 工业可信
- 监管工作台
- 高信息密度
- 状态清晰
- 可下钻
- 可复核
- 可审计

## 3. 字体规范

### 3.1 字体族

优先使用系统字体，保证中文、英文、哈萨克语后续扩展稳定。

```css
--font-sans: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Inter", "Segoe UI", sans-serif;
--font-number: "DIN Alternate", "DIN Condensed", "Roboto Mono", "SFMono-Regular", monospace;
```

说明：

- 中文正文使用 `--font-sans`。
- KPI、数值、时间戳、设备编号使用 `--font-number`。
- 不使用过度装饰字体。
- 后续哈萨克语界面可优先补充 `Noto Sans` 系列。

### 3.2 字号体系

| Token | 字号 | 行高 | 用途 |
|---|---:|---:|---|
| `--text-xxs` | 11px | 16px | 坐标轴、地图微标签、极其次要说明 |
| `--text-xs` | 12px | 18px | 辅助说明、标签、表格次级信息 |
| `--text-sm` | 13px | 20px | 筛选项、状态说明、侧栏正文 |
| `--text-md` | 14px | 22px | 默认正文、表格、卡片内容 |
| `--text-lg` | 16px | 24px | 卡片标题、重要字段 |
| `--text-xl` | 20px | 28px | 页面二级标题、模块标题 |
| `--text-2xl` | 24px | 32px | 页面主标题、关键结论 |
| `--text-kpi` | 32px | 40px | 大型 KPI 数值 |
| `--text-display` | 40px | 48px | 首页核心状态数值，谨慎使用 |

### 3.3 字重

| Token | 字重 | 用途 |
|---|---:|---|
| `--font-regular` | 400 | 正文 |
| `--font-medium` | 500 | 标签、按钮、导航 |
| `--font-semibold` | 600 | 卡片标题、关键字段 |
| `--font-bold` | 700 | KPI、最高层级标题 |

## 4. 色彩规范

### 4.1 基础颜色

整体采用浅灰白底，不使用纯白大面积铺底，也不使用大面积深蓝黑。

```css
--color-bg-page: #F5F7FA;
--color-bg-canvas: #EEF3F7;
--color-bg-panel: #FFFFFF;
--color-bg-panel-soft: #F8FAFC;
--color-bg-elevated: #FFFFFF;

--color-border-subtle: #E3E8EF;
--color-border-strong: #C9D3DF;
--color-divider: #E8EDF3;

--color-text-primary: #182230;
--color-text-secondary: #475467;
--color-text-tertiary: #667085;
--color-text-muted: #98A2B3;
--color-text-inverse: #FFFFFF;
```

### 4.2 品牌与操作色

```css
--color-primary: #0F6B7A;
--color-primary-hover: #0A5966;
--color-primary-soft: #DDF3F6;

--color-accent-blue: #2F80ED;
--color-accent-cyan: #1CA7A8;
--color-accent-indigo: #5865D9;
```

主色使用偏青的能源监管蓝，避免常见紫蓝渐变。

### 4.3 行业颜色

行业颜色用于地图节点、流转线、筛选器和图例。

```css
--industry-oil: #B7791F;
--industry-oil-soft: #FFF3D6;

--industry-gas: #0D9488;
--industry-gas-soft: #DDF7F2;

--industry-power: #4F46E5;
--industry-power-soft: #E8E7FF;

--industry-heat: #E11D48;
--industry-heat-soft: #FFE4EA;

--industry-data: #64748B;
--industry-data-soft: #EEF2F6;
```

行业色必须与状态色区分。行业色表达“它是什么行业”，状态色表达“它现在是否异常”。同一个节点同时展示行业与状态时，行业色用于图标或连线，状态色用于外环、角标或标签。

### 4.4 状态颜色

状态颜色必须稳定，不随页面变化。

```css
--status-normal: #16A34A;
--status-normal-soft: #DCFCE7;

--status-watch: #CA8A04;
--status-watch-soft: #FEF3C7;

--status-important: #EA580C;
--status-important-soft: #FFEDD5;

--status-critical: #DC2626;
--status-critical-soft: #FEE2E2;

--status-ai: #0F6B7A;
--status-human: #2563EB;
--status-system: #64748B;
--status-modified: #9333EA;
```

使用语义：

| 状态 | 用途 |
|---|---|
| normal | 数据正常、设备在线 |
| watch | 轻微偏离、需要观察 |
| important | 需要人工复核 |
| critical | 高风险异常 |
| ai | AI 自动识别或解释 |
| human | 人工确认 |
| modified | 人工修改 AI 判断 |
| system | 系统生成记录 |

## 5. 间距规范

采用 4px 基础栅格。

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

使用建议：

- 卡片内边距：16px 或 20px。
- 页面主要区域间距：24px。
- 紧凑列表行距：8px 到 12px。
- 表单字段间距：16px。
- 信息栏内部模块间距：16px。

## 6. 圆角与阴影

B 端界面不使用过大的圆角。卡片圆角控制在 8px 以内。

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 999px;
```

使用规则：

- 普通卡片：8px。
- 按钮、输入框：6px。
- 状态标签：999px。
- 地图节点气泡：999px 或 8px。
- 不做层层嵌套卡片。

阴影要轻。

```css
--shadow-panel: 0 8px 24px rgba(15, 23, 42, 0.06);
--shadow-popover: 0 12px 32px rgba(15, 23, 42, 0.12);
--shadow-focus: 0 0 0 3px rgba(15, 107, 122, 0.18);
--shadow-glass: 0 18px 48px rgba(15, 23, 42, 0.10);
```

### 6.1 液态玻璃质感

本项目允许使用轻量“液态玻璃”质感，但只用于首页左右信息栏、浮层、详情抽屉和关键卡片。玻璃效果要轻盈、清澈、边界明确，不能牺牲可读性。

```css
--bg-glass-panel: rgba(255, 255, 255, 0.82);
--bg-glass-panel-strong: rgba(255, 255, 255, 0.92);
--border-glass: rgba(255, 255, 255, 0.72);
--backdrop-blur-sm: blur(8px);
--backdrop-blur-md: blur(14px);
```

玻璃卡片推荐样式：

```css
background: var(--bg-glass-panel);
backdrop-filter: var(--backdrop-blur-md);
-webkit-backdrop-filter: var(--backdrop-blur-md);
border: 1px solid var(--border-glass);
box-shadow: var(--shadow-glass);
```

使用边界：

- 正文密集区域使用 `--bg-glass-panel-strong`，保证文字可读。
- 地图上的轻量浮层可使用 `--bg-glass-panel`。
- 不把表格大面积做成透明玻璃。
- 不叠加多层玻璃卡片。
- 玻璃效果应有 fallback：不支持 `backdrop-filter` 时退回白色面板。

## 7. 首页布局规范

### 7.1 桌面布局

首页以 1440px 到 1600px 宽屏为主要演示尺寸。

```text
┌─────────────────────────────────────────────────────────────┐
│ 顶部栏：项目名 / 时间 / 数据状态 / 语言 / 用户              │
├───────────────┬─────────────────────────────┬───────────────┤
│ 左侧信息栏     │ 中央地图与产业流转网络        │ 右侧事件栏     │
│ 行业筛选       │ 国家/州/作业区下钻            │ 异常事件       │
│ KPI            │ 节点/管线/状态                │ AI 提醒        │
│ 图例           │ 地图工具栏                    │ 选中对象详情   │
└───────────────┴─────────────────────────────┴───────────────┘
```

建议尺寸：

```css
--topbar-height: 64px;
--sidebar-left-width: 300px;
--sidebar-left-collapsed-width: 64px;
--sidebar-right-width: 360px;
--page-padding: 24px;
--panel-gap: 16px;
```

中央地图宽度自适应，占剩余空间。地图区域必须是第一视觉焦点。

在 1440px 宽度下，左侧栏允许折叠为 64px 图标条，给中央地图释放空间。折叠后保留行业图标、异常数和图例入口，详细筛选以悬浮面板展开。

### 7.2 信息栏规则

左侧信息栏负责“筛选和总览”：

- 行业筛选：石油、天然气、电力、热力、数据报送。
- 区域层级：全国、州、作业区。
- KPI：异常事件数、在线计量点、数据延迟、待复核事件。
- 图例：行业线色、节点状态、异常等级。

右侧信息栏负责“当前选中对象和动作”：

- 当前异常事件。
- AI 初判摘要。
- 证据入口。
- 人工复核入口。
- 最近审计动作。

## 8. 地图与产业网络规范

### 8.1 地图视觉

地图底色应低对比，但需要与左右信息栏形成清楚层次，不能让整个屏幕糊成一片。地图可视区比普通面板略冷、略深，托住悬浮玻璃信息栏。

```css
--map-ocean: #E2E8F0;
--map-land: #F1F5F9;
--map-region: #E2E8F0;
--map-region-hover: #CBD5E1;
--map-region-active: #94A3B8;
--map-boundary: #FFFFFF;
--map-label: #64748B;
```

信息面板若悬浮于地图之上，推荐使用 `var(--bg-glass-panel)` 和 `var(--backdrop-blur-md)`。地图底色、面板底色和卡片底色必须拉开层次。

### 8.2 地图层级

地图下钻层级：

```text
全国 -> 州 -> 作业区/企业 -> 设备/计量点 -> 异常事件
```

每层只展示当前判断需要的信息，不要把所有节点同时铺满。

### 8.3 节点规范

节点类型：

- 油田/作业区
- 气田
- 管道节点
- 泵站
- 压缩站
- 计量站
- 储运基地
- 港口
- 炼化/化工企业
- 监管报送节点
- 异常事件节点

节点视觉：

```css
--node-size-sm: 8px;
--node-size-md: 12px;
--node-size-lg: 18px;
--node-ring: 0 0 0 6px rgba(15, 107, 122, 0.12);
```

规则：

- 普通节点用小点。
- 关键设施用图标 + 状态点。
- 异常节点用状态色外环。
- 选中节点显示轻量浮层，不遮挡地图核心区域。

### 8.4 流转线规范

流转线表达产业流向和数据流向。

```css
--flow-width-idle: 1px;
--flow-width-active: 2px;
--flow-width-critical: 3px;
--flow-opacity-idle: 0.38;
--flow-opacity-active: 0.82;
```

线型：

| 类型 | 线型 | 颜色 |
|---|---|---|
| 原油输送 | 实线 | `--industry-oil` |
| 天然气输送 | 实线 | `--industry-gas` |
| 电力供应 | 实线 | `--industry-power` |
| 数据报送 | 虚线 | `--industry-data` |
| 监管核验 | 点划线 | `--status-ai` |
| 异常关联 | 高亮线 | `--status-important` 或 `--status-critical` |

动画只用于表达流向，必须克制。不要让地图变成装饰动画。

## 9. 组件规范

### 9.1 卡片

```css
background: var(--bg-glass-panel-strong);
backdrop-filter: var(--backdrop-blur-sm);
-webkit-backdrop-filter: var(--backdrop-blur-sm);
border: 1px solid var(--border-glass);
border-radius: var(--radius-md);
box-shadow: var(--shadow-panel);
padding: var(--space-4);
```

规则：

- 卡片用于独立信息单元。
- 不把卡片套卡片。
- 卡片标题不超过 16px。
- 密集表格、报告正文、长段文字可以退回纯白面板，优先保证阅读。

### 9.2 按钮

按钮分三类：

- 主按钮：确认复核、进入核查、生成报告。
- 次按钮：查看证据、展开详情、切换视图。
- 风险按钮：驳回 AI 判断、标记紧急。

尺寸：

```css
--button-height-sm: 32px;
--button-height-md: 38px;
--button-height-lg: 44px;
```

按钮文案必须是动作，不写抽象名词。

### 9.3 状态标签

状态标签使用浅底色 + 深文字，不用大面积纯色。

示例：

```text
正常
待观察
需复核
高风险
AI 初判
人工确认
已修改
已归档
```

### 9.4 AI 解释面板

AI 面板必须区分事实、推断和建议。

建议结构：

```text
AI 初判
关键依据
可能原因
建议核查
需人工确认
```

禁止写法：

- “企业存在违规。”
- “AI 已确认问题。”
- “系统自动判定违法。”

推荐写法：

- “AI 初判存在异常模式，建议人工复核。”
- “该结论基于模拟数据，仅用于 demo 展示。”

### 9.5 全局滚动条

高密度 B 端面板必须重写滚动条，避免系统默认滚动条破坏轻盈质感。

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border-strong);
  border-radius: var(--radius-pill);
}

::-webkit-scrollbar-track {
  background: transparent;
}
```

规则：

- 左右信息栏允许局部滚动。
- 地图主画布不显示滚动条。
- 表格横向滚动必须有明显边界，不要让列内容被误认为裁切。

### 9.6 加载态与骨架屏

AI 计算、地图下钻、报告生成都需要可感知的加载态。

```css
--skeleton-base: #E8EDF3;
--skeleton-highlight: #F8FAFC;
--loading-ai: #0F6B7A;
```

使用规则：

- 地图下钻：显示区域骨架 + 点位淡入。
- AI 初判：显示“AI 正在分析模拟数据”状态，不超过 1.2 秒。
- 报告生成：显示分段生成骨架，随后替换为报告正文。
- 骨架屏不使用强闪烁，采用轻微横向 shimmer。

## 10. 表格与列表规范

表格适合放证据、设备、审计动作，不适合承载主要叙事。

表格字号：

- 表头：13px，500。
- 单元格：13px 或 14px。
- 行高：40px 到 48px。

列表规则：

- 事件列表最多显示 5 到 7 条。
- 审计日志按时间倒序或流程顺序，页面内必须一致。
- 证据列表每条必须有来源或数据快照说明。

## 11. 图表规范

能耗异常页核心图表：

- 实际值曲线
- AI 预测中位线
- 预测带上下界
- 异常区间高亮
- 关键时间标注

颜色：

```css
--chart-actual: #0F6B7A;
--chart-prediction: #94A3B8;
--chart-band: rgba(47, 128, 237, 0.14);
--chart-anomaly: rgba(234, 88, 12, 0.18);
--chart-grid: #E8EDF3;
```

不建议：

- 大量饼图。
- 纯装饰雷达图。
- 色彩过多的堆叠图。
- 没有解释文字的复杂图。

## 12. 交互与动效

动效服务状态变化和流向表达。

允许：

- 地图线条轻微流动。
- 节点选中外环扩散一次。
- 右侧详情抽屉滑入。
- 审计节点展开。
- 图表 hover 显示数值。

避免：

- 持续闪烁。
- 大面积粒子效果。
- 无意义的卡片漂浮。
- 影响阅读的背景动画。

动效时间：

```css
--motion-fast: 120ms;
--motion-normal: 180ms;
--motion-slow: 280ms;
--motion-ai-loading: 900ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

### 12.1 Z-index 层级

地图型系统必须统一层级，避免 tooltip、侧栏、弹窗互相覆盖。

```css
--z-index-map-base: 0;
--z-index-map-layer: 10;
--z-index-map-overlay: 100;
--z-index-layout-sidebar: 200;
--z-index-dropdown: 300;
--z-index-modal: 400;
--z-index-toast: 500;
```

使用规则：

- 地图底图和区域层使用 `map-base`、`map-layer`。
- 节点 tooltip、地图工具栏使用 `map-overlay`。
- 左右信息栏和顶部栏使用 `layout-sidebar`。
- 筛选下拉、语言菜单使用 `dropdown`。
- 确认弹窗、报告预览弹窗使用 `modal`。
- 全局消息和保存反馈使用 `toast`。

## 13. 响应式规范

第一阶段以桌面演示为主。

断点：

```css
--breakpoint-tablet: 1024px;
--breakpoint-desktop: 1280px;
--breakpoint-wide: 1536px;
```

桌面优先：

- 1280px 以下可以收起左侧栏。
- 1024px 以下不作为第一阶段重点。
- 移动端只保证不崩，不做完整体验。

## 14. 品牌标识规范

### 14.1 Header 机构标识

第一阶段使用：

```text
国徽 header 版本 + 哈萨克斯坦共和国能源部
```

可用文件：

```text
assets/logos/kazakhstan-national-emblem-header-v1.jpg
```

推荐尺寸：

```css
--logo-emblem-size: 32px;
--logo-wordmark-title: 14px;
--logo-wordmark-subtitle: 11px;
```

Header 推荐文案：

```text
哈萨克斯坦共和国能源部
Ministry of Energy of the Republic of Kazakhstan
```

要求：

- 国徽不做重绘、裁切或变形。
- 国徽不做大面积装饰背景。
- 如使用水印，透明度不高于 6%。
- 页面 footer 或关于弹窗保留 demo 免责声明。

### 14.2 企业标识

KMG 标识可用于企业节点或企业详情示意。

可用文件：

```text
assets/logos/kmg-kazmunaygas-logo-v1.svg
```

使用要求：

- 只用于内部 demo。
- 不暗示官方授权或合作。
- 不与“违规”“违法”“真实异常”等确定性结论直接绑定。
- 风险事件卡片优先显示行业图标和节点名称，企业 logo 放在详情层级。

### 14.3 推荐替代方案

对于未授权或不确定的企业标识，优先使用：

- 行业图标。
- 企业名称文字。
- 抽象节点符号。
- Demo 专属临时标识。

## 15. CSS 变量草案

后续工程可直接建立 `tokens.css`。

```css
:root {
  --font-sans: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Inter", "Segoe UI", sans-serif;
  --font-number: "DIN Alternate", "DIN Condensed", "Roboto Mono", "SFMono-Regular", monospace;

  --color-bg-page: #F5F7FA;
  --color-bg-canvas: #EEF3F7;
  --color-bg-panel: #FFFFFF;
  --color-bg-panel-soft: #F8FAFC;
  --color-border-subtle: #E3E8EF;
  --color-border-strong: #C9D3DF;

  --color-text-primary: #182230;
  --color-text-secondary: #475467;
  --color-text-tertiary: #667085;
  --color-text-muted: #98A2B3;

  --color-primary: #0F6B7A;
  --color-primary-hover: #0A5966;
  --color-primary-soft: #DDF3F6;

  --industry-oil: #B7791F;
  --industry-gas: #0D9488;
  --industry-power: #4F46E5;
  --industry-heat: #E11D48;
  --industry-data: #64748B;

  --status-normal: #16A34A;
  --status-watch: #CA8A04;
  --status-important: #EA580C;
  --status-critical: #DC2626;
  --status-ai: #0F6B7A;
  --status-human: #2563EB;
  --status-system: #64748B;
  --status-modified: #9333EA;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --shadow-panel: 0 8px 24px rgba(15, 23, 42, 0.06);
  --shadow-popover: 0 12px 32px rgba(15, 23, 42, 0.12);
  --shadow-glass: 0 18px 48px rgba(15, 23, 42, 0.10);

  --bg-glass-panel: rgba(255, 255, 255, 0.82);
  --bg-glass-panel-strong: rgba(255, 255, 255, 0.92);
  --border-glass: rgba(255, 255, 255, 0.72);
  --backdrop-blur-sm: blur(8px);
  --backdrop-blur-md: blur(14px);

  --map-ocean: #E2E8F0;
  --map-land: #F1F5F9;
  --map-region: #E2E8F0;
  --map-region-hover: #CBD5E1;
  --map-region-active: #94A3B8;
  --map-boundary: #FFFFFF;
  --map-label: #64748B;

  --skeleton-base: #E8EDF3;
  --skeleton-highlight: #F8FAFC;
  --loading-ai: #0F6B7A;

  --topbar-height: 64px;
  --sidebar-left-width: 300px;
  --sidebar-left-collapsed-width: 64px;
  --sidebar-right-width: 360px;
  --page-padding: 24px;
  --panel-gap: 16px;

  --logo-emblem-size: 32px;
  --logo-wordmark-title: 14px;
  --logo-wordmark-subtitle: 11px;

  --z-index-map-base: 0;
  --z-index-map-layer: 10;
  --z-index-map-overlay: 100;
  --z-index-layout-sidebar: 200;
  --z-index-dropdown: 300;
  --z-index-modal: 400;
  --z-index-toast: 500;
}
```

## 16. 设计验收清单

每个页面完成后检查：

- 是否符合浅色工业监管工作台方向。
- 是否能一眼看出当前状态。
- 是否有明确下一步动作。
- 是否避免卡片堆砌。
- 是否能区分 AI 判断、人工复核和系统记录。
- 状态色是否和本规范一致。
- 字号、间距、圆角是否和本规范一致。
- 地图是否服务下钻和事件定位，而不是纯装饰。
- 文案是否避免夸大 AI 能力。
- 页面在 1440px 宽度下不重叠、不溢出、不拥挤。
- 真实机构/企业标识是否只用于合适层级，并带有 demo 使用边界。
- 行业色和状态色是否没有认知冲突。
- 左侧栏是否支持折叠，保证中央地图空间。
- 玻璃质感是否轻盈且不影响可读性。
- 加载态和骨架屏是否覆盖地图下钻、AI 分析、报告生成。
- Z-index 层级是否遵守统一 token。
