# Design System: Palantir Minimalist Style

## 1. 核心设计理念 (Core Philosophy)
本系统采用类似 Palantir Foundry / Gotham 的**极简、硬核、扁平化（Brutalist/Minimalist）**美学设计。所有的设计决策均以“最大化信息密度（High Information Density）”和“提高信噪比（High Signal-to-Noise Ratio）”为核心。

- **摒弃装饰**：禁止使用“毛玻璃（Glassmorphism）”、大面积的高斯模糊、以及柔和的大圆角。
- **克制与绝对理性**：视觉风格必须保持冰冷、严谨，像军事或国家级情报系统。
- **扁平空间**：利用极细的 1px 实线边框和极致微倒角来划定区域，减少大片阴影堆叠。

## 2. 颜色规范 (Sterile Palette)

系统抛弃了常规 B 端那种活泼或柔和的色彩，改为高对比度的“手术室级”色板。

### 全局底色 (Backgrounds)
- **页面背景 (`--color-bg-page`)**: `#eef1f4` (冷峻、无菌感的灰蓝色，避免纯白刺眼)
- **面板背景 (`--color-bg-panel`)**: `#ffffff` (纯白，绝对的不透明，确保在灰蓝底色上清晰锐利)
- **卡片内底 (`--color-bg-panel-soft`)**: `#f8fafc` (极浅灰，用于卡片内部数据模块的微弱区分)

### 边框 (Borders)
- **默认边界 (`--color-border-subtle`)**: `#d0d7de` (非常锋利且细微的银灰色)
- **强边界 (`--color-border-strong`)**: `#9ca3af`

### 状态色 (Status Alerts)
状态颜色必须是高饱和、高辨识度的纯色，坚决不使用淡粉色或小清新色调。
- **Normal (`--status-normal`)**: `#059669` (克制的祖母绿)
- **Watch (`--status-watch`)**: `#d97706` (干练的琥珀色)
- **Important (`--status-important`)**: `#ea580c` (刺眼的警报橘，Burnt Orange)
- **Critical (`--status-critical`)**: `#dc2626` (绝对的纯红)

## 3. UI 元素与形状 (Shapes & Borders)

- **边框圆角 (Border Radius)**: 
  - `--radius-sm`: `0px` (完全直角，用于内部数据块)
  - `--radius-md/lg`: `2px` (极致微倒角，用于外部浮动面板，避免割手但保持硬朗)
- **阴影 (Shadows)**: 
  - 彻底抛弃大范围的 `20px` 发光阴影。
  - 使用非常短促的投影加上 1px 的模拟边框线（如 `0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)`）。

## 4. 排版排版 (Typography)

- **字体选择**:
  - 界面正文保持无衬线体 (`Inter`, `PingFang SC`)。
  - **所有数据字、统计面板的值**，强制使用等宽字体（`--font-number: "DIN Alternate", "Roboto Mono", monospace`），确保纵向对齐，传递数据精确感。
- **微排版 (Micro-typography)**:
  - 分类标签、Eyebrow（如 `24H TIMELINE`, `NATIONAL BRIEF`）需采用**全大写 (Uppercase)** + 加粗 + 增加字间距（`letter-spacing: 0.5px`）的处理手法。

## 5. 核心组件应用规范 (Component Guidelines)

### A. 浮动面板 (Floating Panels)
- 结构上，两翼控制栏（侧边栏）及顶部 KPI 应使用 `.floating-panel` 样式。
- **无透明度**：面板背景设为 100% 纯白，直接压在 `#eef1f4` 底图上。
- **强边框**：外围必须有 1px 的实线 `border`。

### B. 地图模块 (Map & Sandtable)
- 地图必须是 **2D 扁平结构**（Vector Precision），去除一切假 3D 厚度（Extrusion）和底部沙盘模糊。
- 地图容器应保持 `background: transparent; overflow: visible;`。
- 如果需要放大视觉冲击力，直接通过 CSS `transform: scale(1.1x)` 在中心放大地图，允许国境线在 UI 面板下延展，营造无界沉浸感，但不更改原始的 D3 SVG viewBox 避免破坏坐标系。

### C. 告警卡片 (Alert Cards)
- 告警卡片**不允许**通体使用大红或大橘的背景。
- 正确的告警做法是：保持白底，但在左侧加入极宽的实线色块，例如：
  `background: #ffffff; border: 1px solid var(--status-important); border-left: 4px solid var(--status-important);`

## 6. CSS 变量清单基准线
在新建页面时，务必复用以下定义的变量体系（节选自 `styles.css` `:root`）：
```css
  --color-bg-page: #eef1f4;
  --color-bg-panel: #ffffff;
  --color-border-subtle: #d0d7de;
  --font-number: "DIN Alternate", monospace;
  --radius-sm: 0px;
  --radius-md: 2px;
  --shadow-overlay: 0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(15,23,42,0.06);
```
