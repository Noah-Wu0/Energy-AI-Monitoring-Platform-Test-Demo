# 阿克套油田能源作业区 AI 监管闭环 Demo

本地工作区用于沉淀 demo 的产品、设计、工程、数据和素材规范。飞书文档负责对齐和评审，本地文件负责执行和多模型协作。

## 当前阶段

- 已完成飞书项目摘要和内部 PRD。
- 已完成首页 Demo 首版，可本地运行查看。
- 2026 年 5 月 18 日会议后，第一阶段路线调整为：先围绕 8 个演示场景完成静态图、页面 prompt 和协作任务卡，再集中落工程。
- 素材暂不上传飞书，先在本地按规范归档、命名和筛选。

## 首页 Demo

```bash
npm install
npm run dev -- --port 5173
```

访问：

```text
http://localhost:5173/
```

## 快速入口

- 项目总览：`docs/00-project/project-index.md`
- 产品 PRD：`docs/01-product/PRD.md`
- 文件使用规范：`docs/00-project/file-usage-standard.md`
- 目录结构规范：`docs/00-project/directory-structure-standard.md`
- B 端界面参考：`docs/research/b2b-interface-reference-cases.md`
- 设计规范草案：`docs/02-design/design-guidelines.md`
- 素材处理规范：`docs/05-assets/asset-intake-standard.md`
- 首页 Demo 工程说明：`docs/03-engineering/frontend-demo-notes.md`

## 工作原则

1. 任何新增文档先放入 `docs/` 对应分区。
2. 原始素材只放 `assets/raw/`，不要直接改动。
3. 处理后的素材放 `assets/processed/` 或更具体的子目录。
4. 页面、数据、组件开发开始前，先补齐对应设计或数据说明。
5. 多模型协作时，每次交接都在 `docs/06-handoff/` 留一份任务说明或交接记录。
