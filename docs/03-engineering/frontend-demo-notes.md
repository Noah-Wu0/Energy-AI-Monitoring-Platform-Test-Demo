# 首页 Demo 工程说明

## 1. 技术栈

- Vite
- React
- TypeScript
- d3-geo
- lucide-react

首版不接后端，不接真实监管数据。页面使用真实公开地图边界文件和本地模拟数据。

## 2. 启动方式

```bash
npm install
npm run dev -- --port 5173
```

浏览器访问：

```text
http://localhost:5173/
```

构建检查：

```bash
npm run build
```

## 3. 关键文件

```text
src/App.tsx
src/styles.css
src/data/demoData.ts
src/components/GlassCard.tsx
src/components/StatusBadge.tsx
```

说明：

- `src/App.tsx`：首页布局、地图渲染、左右侧栏和交互状态。
- `src/styles.css`：设计 token、液态玻璃卡片、地图节点、侧栏样式。
- `src/data/demoData.ts`：全部模拟节点、连线、异常事件、审计链。
- `assets/maps/mangystau-region-v1.geojson`：曼吉斯套州边界。
- `assets/maps/mangystau-districts-v1.geojson`：曼吉斯套州区县边界。

## 4. 首版交互

- 点击左侧产业链节点，地图浮层切换到对应节点。
- 点击地图节点，左侧和地图浮层同步切换。
- 点击右侧异常事件，AI 初判面板和地图选中节点同步切换。
- 底部命令栏作为后续页面入口占位，当前不跳转。

## 5. 数据边界

必须保留页面上的 demo 声明：

```text
Demo 数据，非真实监管数据。AI 初判仅供人工复核参考。
```

不得把模拟异常与真实企业经营状态绑定，不得写成“AI 已确认违规”。

## 6. QA 记录

2026-05-18 已完成：

- `npm run build` 通过。
- Playwright 1440 × 920 截图检查通过。
- 地图节点数：7。
- 地图链路标签：5。
- 管线状态行：3。
- 证据包状态行：4。
- 异常事件卡片：2。
- 点击第二个异常事件后，AI 面板切换到“夜间能耗轨迹轻微异常”。
- 未发现控制台错误和横向溢出。

截图：

```text
assets/screenshots/home-demo-1440.png
```
