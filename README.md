# 哈萨克斯坦共和国能源部 AI 监管闭环系统 Demo

Energy AI Monitoring Platform — Kazakhstan Ministry of Energy regulatory closed-loop demo system.

12 interconnected scenario pages covering national energy surveillance → regional drill-down → enterprise investigation → anomaly detection → cross-system verification → multi-agent attribution → knowledge graph → audit chain → report generation.

## 快速开始

```bash
npm install
npm run dev -- --port 5173
```

访问 `http://localhost:5173/`

## 页面路由

| 路由 | 页面 |
| ---- | ---- |
| `#/home` | 演示首页 |
| `#/overview` | 阿克套 GIS 总览大屏 |
| `#/scenario-1-1` | 全国能源设施态势 |
| `#/drill-down-region` | 曼吉斯套州区域钻取 |
| `#/drill-down-company` | 企业报警核查 |
| `#/scenario-1-2` | 计量设备档案 |
| `#/scenario-2-1` | 异常检测中心 |
| `#/scenario-2-2` | 跨系统交叉验证 |
| `#/scenario-3-1` | 多 Agent 协同归因 |
| `#/scenario-3-2` | 监管知识图谱 |
| `#/scenario-4-1` | 全生命周期审计链 |
| `#/scenario-4-2` | 分级监管报告生成 |

## 技术栈

React 19 + TypeScript + Vite 7 + d3-geo + Recharts + Lucide Icons

## 项目结构

- `src/components/` — 12 个页面组件 + 子组件
- `src/data/` — 9 个 TypeScript 数据文件 (mock)
- `src/styles*.css` — 全局 + 8 个场景专用 CSS
- `docs/` — PRD、设计系统、数据架构、交接记录
- `assets/maps/` — GeoJSON 地图数据
