# 哈萨克斯坦共和国能源部 AI 监管闭环系统 Demo

Energy AI Monitoring Platform — Kazakhstan Ministry of Energy regulatory closed-loop demo system.

这是一个面向能源监管场景的前端演示系统，用 12 个互相关联的页面串起一条完整的监管闭环：全国态势发现 → 州域下钻 → 企业报警核查 → 异常检测 → 跨系统核验 → 多 Agent 归因 → 知识图谱 → 审计链 → 分级监管报告生成。

本项目使用模拟数据，不连接真实政务系统、企业系统或物理测点。页面、地图、企业、设备、事件、报告和 AI 输出均用于演示监管流程与交互方式。

## 给同事的 5 分钟快速上手

适用场景：你只是想在本地把 demo 跑起来、查看页面、切换中英文、做一次基础验收。

### 1. 准备环境

需要本机已安装：

- Node.js，建议 20.x 或更新版本
- npm，随 Node.js 一起安装
- Git

检查命令：

```bash
node --version
npm --version
git --version
```

### 2. 拉取项目

```bash
git clone https://github.com/Noah-Wu0/Energy-AI-Monitoring-Platform-Test-Demo.git
cd Energy-AI-Monitoring-Platform-Test-Demo
```

如果要查看当前 English 模式修复分支：

```bash
git fetch origin
git switch codex/english-visible-text-safari-fix
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动本地服务

```bash
npm run dev -- --host 0.0.0.0
```

Vite 会输出实际端口，例如：

```text
Local: http://localhost:5177/
```

打开浏览器访问这个地址即可。端口不一定总是 `5177`，以终端实际输出为准。

如果固定端口可用，也可以使用：

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

### 5. 页面验收入口

建议先从首页开始：

```text
http://localhost:5177/#/home
```

然后按页面路由表逐个切换。系统是 hash 路由，地址中 `#/xxx` 后面的部分就是页面路径。

### 6. 切换 English 模式

每个页面右上角都有语言按钮。进入 English 模式后，页面里不应该再出现中文可见文本。

如果浏览器保留了上次语言状态，可以在控制台执行：

```js
localStorage.setItem("lang", "en");
location.reload();
```

切回中文：

```js
localStorage.setItem("lang", "zh");
location.reload();
```

## 页面路由

| 路由 | 页面 | 说明 |
| ---- | ---- | ---- |
| `#/home` | 演示首页 | 汇总演示主线、关键事件和闭环叙事 |
| `#/overview` | 阿克套 GIS 总览大屏 | 全国/区域态势、地图节点、事件流、证据快照 |
| `#/scenario-1-1` | 全国能源设施态势 | 全国油气链路、州级风险、事件卡片和下钻入口 |
| `#/scenario-1-2` | 计量设备档案 | 设备清单、通信心跳、检定记录和 AI 提示 |
| `#/scenario-2-1` | 异常检测中心 | 阈值、统计趋势、时序模型、异常解释和处置队列 |
| `#/scenario-2-2` | 跨系统交叉验证 | 多源数据比对、监管线索、风险评分和建议动作 |
| `#/scenario-3-1` | 多 Agent 协同归因 | 多 Agent 输出、证据链、归因排序和研判依据 |
| `#/scenario-3-2` | 监管知识图谱 | 企业、设施、人员、事件、设备及关系路径 |
| `#/scenario-4-1` | 全生命周期审计链 | 事件阶段、AI/HITL 动作、审计溯源记录 |
| `#/scenario-4-2` | 分级监管报告生成 | 报告模板、数据快照、AI 生成声明和签批记录 |
| `#/drill-down-region` | 曼吉斯套州区域钻取 | 州域油田、计量、港储运、监管报送链路 |
| `#/drill-down-company` | 企业报警核查 | 企业档案、报警对象、证据包、数据源状态 |

## 日常使用说明

### 常用命令

| 命令 | 用途 |
| ---- | ---- |
| `npm install` | 首次安装依赖 |
| `npm run dev -- --host 0.0.0.0` | 启动本地开发服务 |
| `npm run build` | 生产构建，包含 TypeScript 项目构建 |
| `npx tsc --noEmit` | 只做 TypeScript 类型检查 |
| `npx vitest run` | 运行单元测试 |
| `node scripts/check-visible-chinese.mjs` | 扫描 English 模式是否还有可见中文 |

### 推荐验收流程

1. 启动服务：`npm run dev -- --host 0.0.0.0`
2. 打开浏览器：`http://localhost:<实际端口>/#/home`
3. 切换 English 模式
4. 按页面路由表逐页检查
5. 运行浏览器脚本：`BASE_URL=http://localhost:<实际端口> node scripts/check-visible-chinese.mjs`
6. 修改代码后执行：`npx tsc --noEmit && npm run build && npx vitest run`

### Safari / Chrome 打开方式

macOS 可以直接用命令打开：

```bash
open -a Safari "http://localhost:5177/#/home"
open -a "Google Chrome" "http://localhost:5177/#/home"
```

把 `5177` 换成 Vite 实际输出的端口。

## English 模式验收

English 模式的验收标准是浏览器实际渲染文本，不以源码 grep、TypeScript 编译或单元测试结果替代。

当语言切换到 English 时，所有用户可见内容都必须为英文，`document.body.innerText` 不能匹配：

```js
/[\u4e00-\u9fff]/
```

覆盖范围包括：

- 页面标题、卡片标题、正文描述、按钮和 fallback 文案
- 事件卡片、监管线索、证据链、AI 研判依据、Agent 输出
- 地区名、企业名、站点名、港口名、管线名、地图节点和 popover
- 图表 legend、tooltip、label、表格数据、运行时拼接句子

### 浏览器检测脚本

先启动 dev server：

```bash
npm run dev -- --host 0.0.0.0
```

然后在另一个终端运行：

```bash
BASE_URL=http://localhost:5177 node scripts/check-visible-chinese.mjs
```

如果 Vite 分配了其他端口，请把 `BASE_URL` 改成实际地址。

脚本会逐页打开以下路由，强制设置 `localStorage.lang = "en"`，读取 `document.body.innerText`，并检查是否存在中文字符：

```text
#/home
#/overview
#/scenario-1-1
#/scenario-1-2
#/scenario-2-1
#/scenario-2-2
#/scenario-3-1
#/scenario-3-2
#/scenario-4-1
#/scenario-4-2
#/drill-down-region
#/drill-down-company
```

输出中每个 route 都应显示：

```text
hasChinese: NO
```

如果出现 `hasChinese: YES`，脚本会打印中文片段、附近 DOM 区域和对应的可能源码文件，便于定位。

## 常见问题

### 端口不是 5173 或 5177

Vite 会自动避开已占用端口。启动后看终端里的 `Local:` 行，使用实际地址即可。

### 页面打开是空白

先确认终端里的 dev server 还在运行，再刷新浏览器。也可以重新启动：

```bash
npm run dev -- --host 0.0.0.0
```

### English 模式仍然显示中文

先运行：

```bash
BASE_URL=http://localhost:<实际端口> node scripts/check-visible-chinese.mjs
```

根据输出里的 route、中文片段和 DOM 区域定位。常见来源有：

- `src/i18n/I18nContext.tsx` 的 UI 字典缺英文
- `src/i18n/dataI18n.ts` 的 data 字符串缺映射
- `src/data/` 里的 mock data 直接渲染，没有经过 `td()`
- 组件里运行时拼接了中文字符串
- 图表、SVG、tooltip、popover 或表格单元格没有走 i18n

### `node scripts/check-visible-chinese.mjs` 连接失败

确认 dev server 已启动，并且 `BASE_URL` 使用实际端口：

```bash
BASE_URL=http://localhost:5177 node scripts/check-visible-chinese.mjs
```

### `npm install` 很慢或失败

先确认网络和 npm registry 可用。必要时清理后重装：

```bash
rm -rf node_modules package-lock.json
npm install
```

只有在确认要重装依赖时再删除 `package-lock.json`。

## i18n 维护规则

项目有两类文本：

- UI 文案：使用 `t("xxx.xxx")`
- mock data / constants / data 文件中的业务文本：使用 `td(value)` 或改成稳定 key，例如 `titleKey`、`descKey`、`labelKey`

English 模式下不要把中文作为 fallback：

```ts
// Avoid
t(key) || "中文默认值";
```

运行时判断不要依赖中文字符串：

```ts
// Avoid
item.status === "异常";
item.action === "转人工研判";
stat.trend.includes("异常");
```

应使用稳定字段，再按语言渲染：

```ts
status: "abnormal";
actionType: "manual_review";
trendType: "abnormal";
```

字符串拼接也要注意英文语序：

```ts
// Avoid
`${region} 发现异常`;

// Prefer
t("alert.regionFound", { region: td(region) });
```

当前实现里，`src/i18n/I18nContext.tsx` 对 English 模式的 `t()` fallback 做了保护，避免回退到中文；`src/i18n/dataI18n.ts` 负责数据字符串翻译，并对遗漏数据做英文兜底。新增文案时仍应优先补完整 key 或 data 映射，不应依赖兜底长期承载正式文案。

## 验证命令

提交前建议执行：

```bash
npx tsc --noEmit
npm run build
npx vitest run
BASE_URL=http://localhost:5177 node scripts/check-visible-chinese.mjs
```

说明：

- `npm run build` 会执行 `tsc -b && vite build`
- `npx vitest run` 运行现有单元测试
- `scripts/check-visible-chinese.mjs` 是 English 模式浏览器可见文本验收脚本

## 技术栈

- React 19
- TypeScript
- Vite 7
- d3-geo
- Recharts
- Lucide Icons
- Playwright，用于浏览器端 English 可见文本扫描

## 项目结构

```text
src/components/          12 个页面组件与复用子组件
src/components/map/      地图、节点、popover 等可视化组件
src/components/events/   事件卡片与事件流组件
src/data/                场景 mock data
src/i18n/                UI 字典与 data 字符串翻译
src/styles*.css          全局样式与场景专用样式
scripts/                 自动化检查脚本
docs/                    PRD、设计系统、数据架构、交接记录
assets/maps/             GeoJSON / TopoJSON 地图数据
assets/logos/            徽章与企业 logo
assets/screenshots/      历史设计与验收截图
```

## 最近一次 English 模式修复说明

本次修复的根因是：上一版虽然补了部分 `td()` / `dataI18n.ts` 映射，但浏览器实际页面仍然有大量中文来自 mock data、运行时拼接、fallback、SVG label、图表/表格、Agent 输出和证据链内容。

本次处理包括：

- 将 English 模式语言按钮从 `中文` 调整为 `Language`
- 防止 `t()` 在 English 模式回退到中文 zh 字典值
- 扩充 `dataI18n.ts`，补入浏览器扫描发现的业务文本
- 对 `td()` 未覆盖的数据增加英文兜底，避免原样显示中文
- 增加 English 模式可见文本 safeguard，覆盖运行时新增或拼接出的遗漏文本
- 新增 Playwright 扫描脚本，把 `document.body.innerText` 作为最终验收标准

最近一次验证结果：

| route | English visible Chinese |
| ---- | ---- |
| `#/home` | No Chinese visible text |
| `#/overview` | No Chinese visible text |
| `#/scenario-1-1` | No Chinese visible text |
| `#/scenario-1-2` | No Chinese visible text |
| `#/scenario-2-1` | No Chinese visible text |
| `#/scenario-2-2` | No Chinese visible text |
| `#/scenario-3-1` | No Chinese visible text |
| `#/scenario-3-2` | No Chinese visible text |
| `#/scenario-4-1` | No Chinese visible text |
| `#/scenario-4-2` | No Chinese visible text |
| `#/drill-down-region` | No Chinese visible text |
| `#/drill-down-company` | No Chinese visible text |
