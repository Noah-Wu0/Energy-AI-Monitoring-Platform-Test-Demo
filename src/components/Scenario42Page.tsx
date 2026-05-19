import { useState, useMemo } from "react";
import { Search, FileClock, FileText, FileCheck, Siren, BookOpen, Download, Send, CheckCircle2, Clock, User, Bot, ShieldCheck, ArrowRight, Eye, Edit3, History, Database, BarChart3, TrendingUp, Layers, Printer, CircleDot, Globe } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import "../styles-scenario-4-2.css";
import {
  reportTemplates,
  generatedReports,
  dataSnapshots,
  getReportsForTemplate,
  getSnapshotsForReport,
  getLifecycleSteps,
  type ReportTemplate,
  type GeneratedReport,
  type DataSnapshot,
  type ReportLifecycleStep,
  type ReportStatus,
} from "../data/scenario42Data";

const templateIcons: Record<ReportTemplate["type"], typeof FileText> = {
  daily: FileText,
  weekly: FileClock,
  monthly: FileCheck,
  emergency: Siren,
  minister: BookOpen,
};

const statusLabel: Record<ReportStatus, string> = {
  draft: "起草中",
  ai_generated: "AI 已生成",
  edited: "编辑中",
  approved: "已签批",
  published: "已发布",
};

const statusOrder: ReportStatus[] = ["draft", "ai_generated", "edited", "approved", "published"];

function parseAiMarkers(content: string): { text: string; isAi: boolean }[] {
  const parts: { text: string; isAi: boolean }[] = [];
  let currentIsAi = false;
  let remaining = content;

  while (remaining.length > 0) {
    if (currentIsAi) {
      const idx = remaining.indexOf("[/AI_GENERATED]");
      if (idx === -1) {
        parts.push({ text: remaining, isAi: true });
        break;
      }
      parts.push({ text: remaining.substring(0, idx), isAi: true });
      remaining = remaining.substring(idx + "[/AI_GENERATED]".length);
      currentIsAi = false;
    } else {
      const idx = remaining.indexOf("[AI_GENERATED]");
      if (idx === -1) {
        parts.push({ text: remaining, isAi: false });
        break;
      }
      if (idx > 0) {
        parts.push({ text: remaining.substring(0, idx), isAi: false });
      }
      remaining = remaining.substring(idx + "[AI_GENERATED]".length);
      currentIsAi = true;
    }
  }

  return parts;
}

function hasMarkdownTable(lines: string[]): boolean {
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith("|") && lines[i + 1].includes("---")) {
      return true;
    }
  }
  return false;
}

function renderLinesAsElements(lines: string[]): React.ReactNode[] {
  if (hasMarkdownTable(lines)) {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      if (lines[i].startsWith("|") && i + 1 < lines.length && lines[i + 1].includes("---")) {
        const headers = lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim());
        const dataRows: string[][] = [];
        i += 2;
        while (i < lines.length && lines[i].startsWith("|")) {
          const cells = lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim());
          if (cells.length > 0) dataRows.push(cells);
          i++;
        }

        elements.push(
          <table key={`tbl-${elements.length}`} className="s42-report-table">
            <thead>
              <tr>{headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri}>{row.map((c, ci) => <td key={ci}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
        continue;
      }

      if (lines[i].startsWith("### ")) {
        elements.push(<h3 key={`ln-${i}`}>{lines[i].slice(4)}</h3>);
      } else if (lines[i].startsWith("## ")) {
        elements.push(<h2 key={`ln-${i}`}>{lines[i].slice(3)}</h2>);
      } else if (lines[i].startsWith("# ")) {
        elements.push(<h1 key={`ln-${i}`}>{lines[i].slice(2)}</h1>);
      } else if (lines[i].match(/^\d+\.\s/)) {
        elements.push(<div key={`ln-${i}`} className="s42-report-li">{lines[i]}</div>);
      } else if (lines[i].trim() === "") {
        elements.push(<div key={`ln-${i}`} className="s42-report-spacer" />);
      } else {
        elements.push(<p key={`ln-${i}`}>{lines[i]}</p>);
      }
      i++;
    }

    return elements;
  }

  return lines.map((line, li) => {
    if (line.startsWith("### ")) {
      return <h3 key={`ln-${li}`}>{line.slice(4)}</h3>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={`ln-${li}`}>{line.slice(3)}</h2>;
    }
    if (line.startsWith("# ")) {
      return <h1 key={`ln-${li}`}>{line.slice(2)}</h1>;
    }
    if (line.match(/^\d+\.\s/)) {
      return <div key={`ln-${li}`} className="s42-report-li">{line}</div>;
    }
    if (line.trim() === "") {
      return <div key={`ln-${li}`} className="s42-report-spacer" />;
    }
    return <p key={`ln-${li}`}>{line}</p>;
  });
}

function ReportContentRenderer({ content }: { content: string }) {
  const parts = parseAiMarkers(content);

  return (
    <div className="s42-report-content">
      {parts.map((part, pi) => {
        const lines = part.text.split("\n");
        const rendered = renderLinesAsElements(lines);

        if (part.isAi) {
          return (
            <div key={pi} className="s42-ai-block">
              {rendered}
            </div>
          );
        }

        return <div key={pi}>{rendered}</div>;
      })}
    </div>
  );
}

function TemplateCard({
  template,
  isActive,
  onClick,
}: {
  template: ReportTemplate;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = templateIcons[template.type];

  return (
    <button
      className={`s42-template-card ${isActive ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="s42-template-card-header">
        <div className={`s42-template-icon type-${template.type}`}>
          <Icon size={18} />
        </div>
        <div>
          <div className="s42-template-name">{template.name}</div>
          <div className="s42-template-schedule">{template.schedule}</div>
        </div>
      </div>
      <div className="s42-template-desc">{template.description}</div>
      <div className="s42-template-meta">
        <span>法规依据：{template.regulationRef.split("—")[0].trim()}</span>
        <span>上次生成：{template.lastGenerated}</span>
      </div>
    </button>
  );
}

function ReportSelector({
  reports,
  selectedReportId,
  onSelect,
}: {
  reports: GeneratedReport[];
  selectedReportId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="s42-report-selector">
      {reports.map((r) => (
        <button
          key={r.id}
          className={`s42-report-tab ${selectedReportId === r.id ? "active" : ""}`}
          onClick={() => onSelect(r.id)}
          type="button"
        >
          <span className={`s42-status-dot status-${r.status}`} />
          {r.title.split("—")[0].trim().replace("哈萨克斯坦共和国能源部", "").replace("能源监管", "") || r.title.slice(0, 12)}
        </button>
      ))}
    </div>
  );
}

function SnapshotCard({
  snapshot,
  isActive,
  onClick,
}: {
  snapshot: DataSnapshot;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`s42-snapshot-card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="s42-snapshot-header">
        <Database size={14} />
        <strong>{snapshot.name}</strong>
      </div>
      <div className="s42-snapshot-meta">
        <span>
          <Clock size={12} />
          {snapshot.timeRange}
        </span>
        <span className="s42-snapshot-version">数据版本：{snapshot.dataVersion}</span>
      </div>
      <div className="s42-metrics-grid">
        {snapshot.keyMetrics.map((m, mi) => (
          <div key={mi} className="s42-metric-item">
            <label>{m.label}</label>
            <strong>{m.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifecycleBar({ steps }: { steps: ReportLifecycleStep[] }) {
  return (
    <div className="s42-lifecycle-flow">
      {steps.map((step, i) => (
        <div key={step.id} className="s42-lifecycle-step">
          {i > 0 && (() => {
            const prevDone = steps[i - 1].status === "done";
            const currDone = step.status === "done";
            const currActive = step.status === "active";
            const connectorClass = prevDone && currDone ? "done" : prevDone && currActive ? "active" : "";
            return <div className={`s42-lifecycle-connector ${connectorClass}`} />;
          })()}
          <div className={`s42-lifecycle-node ${step.status}`}>
            {step.status === "done" ? (
              <CheckCircle2 size={16} />
            ) : step.status === "active" ? (
              <CircleDot size={16} />
            ) : (
              <span style={{ fontSize: 12, fontWeight: 800 }}>{step.order}</span>
            )}
          </div>
          <div className="s42-lifecycle-info">
            <strong>{step.name}</strong>
            <span>
              <span className={`s42-lifecycle-actor actor-${step.actor.toLowerCase()}`}>
                {step.actor === "AI" ? "AI" : step.actor === "Human" ? "人工" : "系统"}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Scenario42Page() {
  const { t, lang, setLang } = useI18n();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(reportTemplates[0].id);
  const [selectedReportId, setSelectedReportId] = useState<string>(generatedReports[0].id);
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string>(dataSnapshots[0].id);

  const selectedTemplate = reportTemplates.find((t) => t.id === selectedTemplateId) ?? reportTemplates[0];
  const selectedReport = generatedReports.find((r) => r.id === selectedReportId) ?? generatedReports[0];
  const selectedSnapshot = dataSnapshots.find((s) => s.id === selectedSnapshotId) ?? dataSnapshots[0];

  const templateReports = useMemo(() => getReportsForTemplate(selectedTemplateId), [selectedTemplateId]);
  const reportSnapshots = useMemo(() => getSnapshotsForReport(selectedReportId), [selectedReportId]);
  const lifecycleSteps = useMemo(() => getLifecycleSteps(selectedReport), [selectedReport]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const reports = getReportsForTemplate(templateId);
    if (reports.length > 0) {
      const firstReportId = reports[0].id;
      setSelectedReportId(firstReportId);
      const snapshots = getSnapshotsForReport(firstReportId);
      if (snapshots.length > 0) {
        setSelectedSnapshotId(snapshots[0].id);
      }
    }
  };

  const handleReportSelect = (reportId: string) => {
    setSelectedReportId(reportId);
    const snapshots = getSnapshotsForReport(reportId);
    if (snapshots.length > 0) {
      setSelectedSnapshotId(snapshots[0].id);
    }
  };

  const activeStep = lifecycleSteps.find((s) => s.status === "active");

  return (
    <div className="app-shell s42-shell">
      {/* ---- Header ---- */}
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s42.workspace")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <button className="ghost-button" type="button">
            <Search size={16} />
            {t("app.search")}
          </button>
          <button className="primary-button" type="button">
            <FileClock size={17} />
            {t("app.report")}
          </button>
        </div>
      </header>

      {/* ---- Left Panel: Report Templates ---- */}
      <aside className="s42-left-panel">
        <div className="s42-panel-header">
          <h2>
            <Layers size={16} />
            报告模板库
          </h2>
          <span className="s42-badge-count">{reportTemplates.length} 个模板</span>
        </div>
        <div className="s42-panel-scroll">
          {reportTemplates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isActive={tpl.id === selectedTemplateId}
              onClick={() => handleTemplateSelect(tpl.id)}
            />
          ))}
        </div>
        <button className="s42-generate-btn" type="button">
          <Send size={15} />
          基于选中模板生成报告
        </button>
      </aside>

      {/* ---- Center Panel: Report Preview ---- */}
      <main className="s42-center-panel">
        {selectedReport ? (
          <>
            <div className="s42-report-toolbar">
              <div className="s42-report-title-area">
                <h2>{selectedReport.title}</h2>
                <div className="s42-report-meta-row">
                  <span>生成时间：{selectedReport.generatedAt}</span>
                  <span className={`s42-status-label status-${selectedReport.status}`}>
                    <span className={`s42-status-dot status-${selectedReport.status}`} style={{ display: "inline-block", marginRight: 4 }} />
                    {statusLabel[selectedReport.status]}
                  </span>
                </div>
              </div>
              <div className="s42-report-actions">
                <button className="s42-action-btn" type="button">
                  <Eye size={14} />
                  预览
                </button>
                <button className="s42-action-btn" type="button">
                  <Edit3 size={14} />
                  编辑
                </button>
                <button className="s42-action-btn" type="button">
                  <Printer size={14} />
                  打印
                </button>
                <button className="s42-action-btn primary-action" type="button">
                  <Download size={14} />
                  下载
                </button>
              </div>
            </div>
            <div className="s42-report-scroll">
              <ReportContentRenderer content={selectedReport.content} />
            </div>
            {templateReports.length > 1 && (
              <ReportSelector
                reports={templateReports}
                selectedReportId={selectedReportId}
                onSelect={handleReportSelect}
              />
            )}
          </>
        ) : (
          <div className="s42-empty-state">
            <FileText size={48} />
            <strong>选择左侧模板以预览报告</strong>
            <p>从左侧模板库中选择报告类型，系统将加载最近生成的报告供您预览和编辑。</p>
          </div>
        )}
      </main>

      {/* ---- Right Panel: Data Snapshots ---- */}
      <aside className="s42-right-panel">
        <div className="s42-panel-header">
          <h2>
            <Database size={16} />
            数据快照面板
          </h2>
          <span className="s42-badge-count">{reportSnapshots.length} 个快照</span>
        </div>
        <div className="s42-panel-scroll">
          {reportSnapshots.map((snap) => (
            <SnapshotCard
              key={snap.id}
              snapshot={snap}
              isActive={snap.id === selectedSnapshotId}
              onClick={() => setSelectedSnapshotId(snap.id)}
            />
          ))}

          {selectedSnapshot && (
            <>
              <div className="s42-info-card s42-card-ai">
                <div className="s42-info-card-header">
                  <Bot size={14} />
                  AI 生成声明
                </div>
                <p>{selectedReport.aiDeclaration}</p>
              </div>

              <div className="s42-info-card s42-card-approval">
                <div className="s42-info-card-header">
                  <User size={14} />
                  人工签批记录
                </div>
                <p>{selectedReport.humanApproval}</p>
              </div>

              <div className="s42-info-card">
                <div className="s42-info-card-header">
                  <ShieldCheck size={14} />
                  数据溯源声明
                </div>
                <p>{selectedSnapshot.aiDisclaimer}</p>
              </div>
            </>
          )}

          <div className="s42-snapshot-card">
            <div className="s42-snapshot-header">
              <TrendingUp size={14} />
              <strong>引用数据概览</strong>
            </div>
            <div className="s42-metrics-grid">
              <div className="s42-metric-item">
                <label>关联报告</label>
                <strong>{selectedReport.title.split("—")[0].trim()}</strong>
              </div>
              <div className="s42-metric-item">
                <label>数据快照数</label>
                <strong>{reportSnapshots.length} 个版本</strong>
              </div>
              <div className="s42-metric-item">
                <label>报告状态</label>
                <strong style={{ color: selectedReport.status === "published" ? "var(--status-normal)" : "var(--color-primary)" }}>
                  {statusLabel[selectedReport.status]}
                </strong>
              </div>
              <div className="s42-metric-item">
                <label>模板类型</label>
                <strong>{selectedTemplate.name}</strong>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Bottom: Report Lifecycle Bar ---- */}
      <div className="s42-bottom-bar">
        <LifecycleBar steps={lifecycleSteps} />
        <div className="s42-bottom-actions">
          <div className="s42-bottom-badge">
            <Bot size={13} />
            AI 生成声明
          </div>
          <div className="s42-bottom-badge approval">
            <User size={13} />
            人工签批记录
          </div>
        </div>
      </div>

      {/* ---- Demo Disclaimer ---- */}
      <div className="s42-disclaimer">
        <ShieldCheck size={14} />
        <span>演示口径：模拟数据；AI 初判需人工复核；报告内容仅供演示，非官方文件。</span>
      </div>
    </div>
  );
}
