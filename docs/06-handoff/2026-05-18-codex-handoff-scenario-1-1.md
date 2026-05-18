# 多模型交接：1.1 全国能源设施实时态势图

日期：2026-05-18
接手工：Codex
交出手：Claude Code (Noah-Wu0)

## 交接目的

Claude Code 已完成 1.1 页面的 React 工程实现和独立 HTML 原型。现在由 Codex 接手，负责 **review 现有产出、根据全国产业链数据补充地图节点、完善页面细节**。

## 当前进度

### 已完成

1. **React 工程页面** — `src/components/Scenario11Page.tsx` + 12 个子组件
   - 全国地图渲染（d3-geo + GeoJSON）
   - 顶部 KPI 条、左栏（能源切换+筛选+节点列表）、右栏（事件流+AI 面板）、底部 24h 时间轴
   - hash 路由：`http://localhost:5173/#/scenario-1-1`
   - 数据文件：`src/data/scenario11Data.ts`（从 `demoData.ts` import 类型）
   - 25 个单元/组件测试通过（Vitest）
   - `npm run build` 通过
   
2. **独立 HTML 原型** — `docs/03-engineering/2026-05-18-scenario-1-1-national-energy-live-map-v1.html`
   - d3-geo CDN + 嵌入式 GeoJSON 渲染全国地图
   - 曼吉斯套州高亮、节点点击交互、管线动画
   - 使用真实国徽（`assets/logos/kazakhstan-national-emblem-header-v1.jpg`）
   - 设计 token 同步自 `docs/02-design/DESIGN.md`

3. **全国油气产业链调研** — `docs/research/2026-05-18-kazakhstan-oil-gas-industry-chain.md`
   - 上游：阿特劳州/曼吉斯套州/西哈州/阿克纠宾州/克孜勒奥尔达州 各大油田
   - 中游：CPC/UAS/KZ-China/Aktau-BTC 出口管道 + 国内集输管线 + 港口/储运节点
   - 下游：Atyrau/Pavlodar/Shymkent 三大炼厂 + Caspi Bitum/KPI/聚乙烯工厂
   - 产业链全貌示意图（ASCII）
   - 1.1 节点扩展建议（全国态势层 15+ 节点 + 阿克套下钻层）

## 输入文件（Codex 必读）

| 文件 | 用途 |
|---|---|
| `docs/01-product/PRD.md` | 产品需求、8 场景定义、协作规则 |
| `docs/01-product/scenario-cards.md` | 1.1 场景详细说明（布局/KPI/事件/讲述词/prompt） |
| `docs/02-design/DESIGN.md` | 完整设计 token（颜色/字体/间距/组件规范） |
| `docs/04-data/energy-network-data-model.md` | TypeScript 数据模型定义 |
| `docs/04-data/mock-data-strategy.md` | Mock 数据边界和标注规则 |
| `docs/05-assets/brand-asset-usage-standard.md` | 国徽/企业 Logo 使用规范 |
| `docs/00-project/file-usage-standard.md` | 文件命名和目录规范 |
| `docs/research/2026-05-18-kazakhstan-oil-gas-industry-chain.md` | **新增** 全国油气产业链全貌 |
| `docs/06-handoff/2026-05-18-scenario-1-1-national-energy-live-map.md` | 上一轮任务卡 |
| `docs/03-engineering/2026-05-18-scenario-1-1-national-energy-live-map-v1.html` | **新增** 独立 HTML 原型 |

## 允许修改

- `src/data/scenario11Data.ts` — 补充全国节点数据
- `src/components/Scenario11Page.tsx` 及子组件 — 完善交互和布局
- `src/styles.css` — 追加/调整样式
- `docs/03-engineering/2026-05-18-scenario-1-1-national-energy-live-map-v1.html` — 更新独立原型
- `docs/06-handoff/` — 新交接记录

## 禁止修改

- `src/App.tsx` 中的原 `App` 组件（保留现有首页 demo，不得删除）
- `src/data/demoData.ts` — 原 demo 数据不变
- `assets/raw/` — 原始素材禁止编辑
- `assets/logos/` — 国徽/KMG logo 不得重绘或变形
- `docs/research/aktau-mangystau-energy-source-ledger.md` — 数据边界不可变
- 不得把 mock 数据写成真实监管数据
- 不得写"AI 已确认违规"等确定性结论

## Codex 任务

### 任务 1：基于全国产业链数据补充地图节点

当前 React 页面和 HTML 原型都只有 8-9 个节点。根据 `docs/research/2026-05-18-kazakhstan-oil-gas-industry-chain.md` 补充为完整的全国油气产业链节点：

- **上游新增**：Korolevskoye、Embamunaigas 群、Zhanazhol、Kenkiyak、Kumkol、Zhetybay、Dunga
- **下游新增**：Pavlodar 石化厂、Shymkent 炼厂
- **中游新增**：CPC 管道关键泵站节点、Kuryk 港
- 所有新增节点坐标均为 mock，需合理分布在哈萨克斯坦全国版图内

### 任务 2：完善页面交互

- 能源类型切换（油气/天然气/电力/供暖）时地图节点和管线联动筛选
- 点击事件流中某条事件 → 地图定位到对应节点 + 弹窗
- 筛选器（地区/企业/等级）的下拉交互
- 地图节点 hover tooltip

### 任务 3：完善 HTML 原型

- 在 HTML 原型中同步补充节点
- 优化节点标签避让（防止重叠）
- 移动端/平板响应式不崩

### 验收标准

- `npm run build` 通过
- `npm test` 全部通过
- 默认 `localhost:5173/` 显示原首页 demo 不变
- `localhost:5173/#/scenario-1-1` 显示全国态势图，含至少 15 个节点
- 地图上的节点能看出全国油气产业链（上游→中游→下游→出口）
- 页面标注 "Demo 数据，非真实监管数据"
- 曼吉斯套州/阿克套区域在地图上高亮

## 关键上下文

- **设计方向**：浅色工业监管工作台，不是科幻大屏，不是 SaaS 营销页
- **核心用户**：部级领导 — 第一屏讲清"全国能源此刻怎么运转"
- **Mock 边界**：真实地理边界 + 公开产业背景 + 模拟监管数据，每层标注
- **技术栈**：Vite + React 19 + TypeScript + d3-geo + Recharts + motion + lucide-react
- **不引入**：Tailwind CSS、shadcn/ui、ECharts
- **延迟安装**：@xyflow/react（场景 2.2/3.1/3.2 才需要）
- **CSS 策略**：无 Tailwind，纯 CSS 变量，token 来自 DESIGN.md
- **路由**：hash-based（`#/scenario-1-1`），AppRouter 在 `src/App.tsx`

## 代码入口

```
npm install
npm run dev -- --port 5173
# 原首页: http://localhost:5173/
# 1.1页面: http://localhost:5173/#/scenario-1-1
```
