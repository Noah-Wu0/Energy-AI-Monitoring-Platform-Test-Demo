# 能源部 AI 监管 Demo

这是一个给哈萨克斯坦能源部项目做演示用的前端 Demo。它用一条完整故事线展示：从全国能源运行大屏发现异常，到下钻区域和企业，再到异常检测、跨系统核验、AI 归因、审计留痕和报告生成。

项目目前只使用模拟数据，不连接真实政府系统、企业系统或物理测点。

## 快速跑起来

先确认本机有 Node.js 和 npm：

```bash
node --version
npm --version
```

拉代码并安装依赖：

```bash
git clone https://github.com/Noah-Wu0/Energy-AI-Monitoring-Platform-Test-Demo.git
cd Energy-AI-Monitoring-Platform-Test-Demo
npm install
```

启动本地服务：

```bash
npm run dev -- --host 0.0.0.0
```

终端会显示实际访问地址，例如：

```text
Local: http://localhost:5177/
```

打开这个地址就能看。端口不固定，如果 `5173` 被占用，Vite 会自动换到 `5174`、`5175` 或其他端口，以终端输出为准。

macOS 上也可以直接打开：

```bash
open -a Safari "http://localhost:5177/#/home"
```

## 从哪里开始看

推荐从首页进入：

```text
http://localhost:5177/#/home
```

然后按下面顺序看完整演示：

| 路由 | 页面 |
| ---- | ---- |
| `#/home` | 演示首页 |
| `#/overview` | GIS 总览大屏 |
| `#/scenario-1-1` | 全国能源设施态势 |
| `#/drill-down-region` | 曼吉斯套州区域下钻 |
| `#/drill-down-company` | 企业报警核查 |
| `#/scenario-1-2` | 计量设备档案 |
| `#/scenario-2-1` | 异常检测中心 |
| `#/scenario-2-2` | 跨系统交叉验证 |
| `#/scenario-3-1` | 多 Agent 协同归因 |
| `#/scenario-3-2` | 监管知识图谱 |
| `#/scenario-4-1` | 全生命周期审计链 |
| `#/scenario-4-2` | 分级监管报告生成 |

## 中英文切换

页面右上角有语言切换按钮。最近修过一轮 English 模式，目标是：切到 English 后，页面里不应该再出现中文可见文本。

如果浏览器记住了上次语言，也可以在控制台手动切：

```js
localStorage.setItem("lang", "en");
location.reload();
```

切回中文：

```js
localStorage.setItem("lang", "zh");
location.reload();
```

## 常用命令

```bash
# 启动开发服务
npm run dev -- --host 0.0.0.0

# 类型检查
npx tsc --noEmit

# 打包构建
npm run build

# 跑测试
npx vitest run
```

## English 模式检查

如果改了页面文案、mock data、图表、地图节点、表格或 Agent 输出，建议跑一下这个脚本：

```bash
BASE_URL=http://localhost:5177 node scripts/check-visible-chinese.mjs
```

把 `5177` 换成你本地 Vite 实际端口。

脚本会逐页读取浏览器里的 `document.body.innerText`，检查 English 模式下是否还有中文字符。正常结果应该是每个路由都显示：

```text
hasChinese: NO
```

如果有残留，它会打印中文片段和大概出现的位置，方便回去修。

## 项目结构

```text
src/components/          页面和通用组件
src/components/map/      地图、节点、popover
src/components/events/   事件卡片和事件流
src/data/                演示用 mock data
src/i18n/                中英文文案和 data 翻译
src/styles*.css          全局和场景样式
scripts/                 检查脚本
docs/                    产品、设计、数据和交接文档
assets/                  地图、logo、截图等静态资源
```

## 改文案时注意

普通界面文案放在 `src/i18n/I18nContext.tsx`。

mock data 里的业务文本优先补到 `src/i18n/dataI18n.ts`，页面渲染时用 `td(value)`。不要在组件里直接拼中文句子，否则 English 模式容易漏。

比较推荐的写法：

```tsx
<span>{td(item.title)}</span>
```

不推荐：

```tsx
<span>{`${region} 发现异常`}</span>
```

## 技术栈

- React
- TypeScript
- Vite
- d3-geo
- Recharts
- Lucide Icons
- Playwright，用于浏览器文本检查

## 常见问题

### 页面打不开

先看 dev server 是否还在运行，再确认浏览器地址里的端口是不是终端输出的端口。

### 端口不是 5177

正常。Vite 会自动找可用端口，用终端 `Local:` 后面的地址即可。

### English 模式还有中文

先跑：

```bash
BASE_URL=http://localhost:5177 node scripts/check-visible-chinese.mjs
```

然后根据脚本输出去查对应页面。常见原因是 data 没有走 `td()`，或者新增文案没有补英文。
