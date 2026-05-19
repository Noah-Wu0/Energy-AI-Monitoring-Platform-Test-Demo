import "../styles-drill-down-company.css";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bot,
  Database,
  FileClock,
  Gauge,
  GitBranch,
  Server,
  ShieldAlert, Globe,
} from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  enterpriseAlertObject,
  enterpriseDetail,
  enterpriseNextActions,
  enterpriseRelatedDevices,
} from "../data/demoData";

export function DrillDownCompanyPage() {
  const { t, lang, setLang } = useI18n();
  const timeline = [
    { time: "11:30", label: t("dc.timeline.t1"), status: "done" },
    { time: "11:32", label: t("dc.timeline.t2"), status: "done" },
    { time: "11:36", label: t("dc.timeline.t3"), status: "active" },
    { time: t("dc.timeline.t4_time"), label: t("dc.timeline.t4"), status: "pending" },
  ];

  return (
    <div className="app-shell s11-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("dc.title")}：{enterpriseAlertObject.id}</span>
          <strong>{enterpriseDetail.name}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <a href="#/drill-down-region" className="ghost-button"><ArrowLeft size={16} /> {t("dc.return")}</a>
        </div>
      </header>

      <aside className="left-sidebar floating-panel company-workbench-left">
        <div className="sidebar-content-scroll">
          <div className="company-identity-card">
             <div className="section-heading compact">
              <div><span className="eyebrow">ENTITY PROFILE</span><h2>{t("dc.entity.title")}</h2></div>
              <Database size={16} className="text-muted"/>
            </div>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12}}>
              <div>
                <span style={{fontSize: 10, color: 'var(--color-text-tertiary)', textTransform: 'uppercase'}}>{t("dc.entity.legal")}</span>
                <strong style={{display: 'block', fontSize: 13, marginTop: 4}}>{enterpriseDetail.name}</strong>
              </div>
              <div>
                <span style={{fontSize: 10, color: 'var(--color-text-tertiary)', textTransform: 'uppercase'}}>{t("dc.entity.role")}</span>
                <strong style={{display: 'block', fontSize: 13, marginTop: 4}}>{enterpriseDetail.industryRole}</strong>
              </div>
              <div>
                <span style={{fontSize: 10, color: 'var(--color-text-tertiary)', textTransform: 'uppercase'}}>{t("dc.entity.region")}</span>
                <strong style={{display: 'block', fontSize: 13, marginTop: 4}}>{enterpriseDetail.region}</strong>
              </div>
              <div>
                <span style={{fontSize: 10, color: 'var(--color-text-tertiary)', textTransform: 'uppercase'}}>{t("dc.entity.license")}</span>
                <strong style={{display: 'block', fontSize: 13, marginTop: 4}}>{enterpriseDetail.licenseStatus}</strong>
              </div>
            </div>
          </div>

          <div className="company-relation-card">
             <div className="section-heading compact">
              <div><span className="eyebrow">RELATIONSHIP</span><h2>{t("dc.relation.title")}</h2></div>
              <GitBranch size={16} className="text-muted" />
            </div>
            <div style={{marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}>
                <div style={{padding: 10, background: 'var(--color-bg-page)', borderRadius: 2}}>
                  <strong style={{display: 'block', fontSize: 18, fontFamily: 'var(--font-number)'}}>{enterpriseDetail.upstreamCount}</strong>
                  <span style={{fontSize: 11, color: 'var(--color-text-tertiary)'}}>{t("dc.relation.upstream")}</span>
                </div>
                <div style={{padding: 10, background: 'var(--color-bg-page)', borderRadius: 2}}>
                  <strong style={{display: 'block', fontSize: 18, fontFamily: 'var(--font-number)'}}>{enterpriseDetail.downstreamCount}</strong>
                  <span style={{fontSize: 11, color: 'var(--color-text-tertiary)'}}>{t("dc.relation.downstream")}</span>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                {enterpriseDetail.keyCounterparties.map((item) => (
                  <span key={item} style={{fontSize: 12, color: 'var(--color-text-secondary)'}}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="company-timeline-card">
            <span className="eyebrow">{t("dc.timeline.eyebrow")}</span>
            <h2>{t("dc.timeline.heading")}</h2>
            {timeline.map((item) => (
              <div key={item.label} className={`company-time-row ${item.status}`}>
                <span>{item.time}</span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="s11-map-container company-workbench-main">
        <div className="company-stage-card">
          <div className="section-heading compact">
            <div><span className="eyebrow">{t("dc.object.eyebrow")}</span><h2>{t("dc.object.heading")}</h2></div>
            <Server size={18} className="text-muted"/>
          </div>

          <div className="company-top-grid">
            <div className="company-alert-object">
              <div className="company-object-head">
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                    <Gauge size={16} color="var(--status-important)"/>
                    <strong style={{fontSize: 14}}>{enterpriseAlertObject.objectName}</strong>
                  </div>
                  <span style={{fontSize: 11, color: 'var(--color-text-tertiary)'}}>Device ID: {enterpriseAlertObject.deviceId}</span>
                </div>
                <div style={{textAlign: 'right'}}>
                  <strong style={{display: 'block', fontSize: 24, color: 'var(--status-important)', fontFamily: 'var(--font-number)'}}>
                    {enterpriseAlertObject.deviation}
                  </strong>
                  <span style={{fontSize: 10, color: 'var(--status-important)'}}>{enterpriseAlertObject.metric}</span>
                </div>
              </div>
              <div className="company-object-metrics">
                <div>
                  <span style={{fontSize: 10, color: 'var(--color-text-tertiary)'}}>{t("dc.object.current")}</span>
                  <strong style={{display: 'block', fontSize: 13}}>{enterpriseAlertObject.currentValue}</strong>
                </div>
                <div>
                  <span style={{fontSize: 10, color: 'var(--color-text-tertiary)'}}>{t("dc.object.baseline")}</span>
                  <strong style={{display: 'block', fontSize: 13}}>{enterpriseAlertObject.baselineValue}</strong>
                </div>
                <div>
                  <span style={{fontSize: 10, color: 'var(--color-text-tertiary)'}}>{t("dc.object.detected")}</span>
                  <strong style={{display: 'block', fontSize: 13}}>{enterpriseAlertObject.detectedAt}</strong>
                </div>
              </div>
              <div className="company-chart">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                  <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
                  <polyline points="0,54 90,58 180,50 270,62 360,44 450,106 540,112 630,118" fill="none" stroke="var(--status-important)" strokeWidth="4"/>
                  <polyline points="0,42 90,42 180,43 270,43 360,44 450,45 540,45 630,45" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7"/>
                  <line x1="430" y1="0" x2="430" y2="150" stroke="var(--status-important)" strokeDasharray="4 4" />
                </svg>
                <span>{t("dc.chart.actual")}</span>
                <em>{t("dc.chart.predicted")}</em>
              </div>
            </div>

            <div className="company-device-panel">
              <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12}}>
                <ShieldAlert size={16} color="var(--color-text-tertiary)"/>
                <strong style={{fontSize: 14}}>{t("dc.related_devices")}</strong>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                {enterpriseRelatedDevices.map((device) => (
                  <div key={device.id} style={{display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, paddingBottom: 10, borderBottom: '1px solid var(--color-border-subtle)'}}>
                    <div>
                      <strong style={{display: 'block', fontSize: 12}}>{device.name}</strong>
                      <span style={{fontSize: 10, color: 'var(--color-text-tertiary)'}}>{device.id} · {device.type}</span>
                    </div>
                    <span style={{fontSize: 11, fontWeight: 700, color: device.status === 'important' ? 'var(--status-important)' : 'var(--status-normal)'}}>{device.lastReading}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="company-next-grid">
            {enterpriseNextActions.map((action) => (
              <a key={action.id} href={action.targetRoute}>
                <span style={{display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800}}>{action.label} <ArrowRight size={13}/></span>
                <span style={{fontSize: 10, lineHeight: 1.4, color: 'var(--color-text-tertiary)'}}>{action.description}</span>
              </a>
            ))}
          </div>

          <div className="company-evidence-grid">
            <div>
              <Activity size={16} />
              <strong>{t("dc.evidence.metering_dev")}</strong>
              <span>{t("dc.evidence.metering_desc")}</span>
            </div>
            <div>
              <FileClock size={16} />
              <strong>{t("dc.evidence.snapshot")}</strong>
              <span>{t("dc.evidence.snapshot_desc")}</span>
            </div>
            <div>
              <Bot size={16} />
              <strong>{t("dc.evidence.ai_boundary")}</strong>
              <span>{t("dc.evidence.ai_boundary_desc")}</span>
            </div>
          </div>
        </div>
      </div>

      <aside className="right-sidebar floating-panel company-workbench-right">
        <div className="sidebar-content-scroll">
          <div className="company-ai-card">
            <div className="ai-panel-header">
              <span className="ai-badge-urgent" style={{background: 'var(--status-important)', color: '#fff', padding: '4px 8px', borderRadius: 2, fontSize: 11, fontWeight: 800}}>
                <Bot size={14} style={{marginRight: 4}}/> {t("dc.ai.title")}
              </span>
              <span className="confidence-urgent" style={{fontFamily: 'var(--font-number)', fontSize: 12, fontWeight: 700}}>{t("dc.ai.confidence")}: {Math.round(enterpriseDetail.confidence * 100)}%</span>
            </div>
            <h2 className="alert-title" style={{marginTop: 16, fontSize: 16}}>{t("dc.ai.summary_title")}</h2>
            <p className="alert-desc" style={{marginTop: 8, fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-secondary)'}}>
              {enterpriseDetail.aiSummary}<br/><br/>
              {t("dc.ai.summary_text").replace("{name}", enterpriseAlertObject.objectName).replace("{time}", enterpriseAlertObject.detectedAt)}
            </p>

            <div className="company-action-box">
              <strong style={{fontSize: 11, display: 'block', marginBottom: 8}}>{t("dc.ai.suggested_action")}</strong>
              <a href="#/scenario-2-1" className="primary-button" style={{width: '100%', justifyContent: 'center', background: 'var(--status-important)'}}>
                {t("dc.ai.action_btn")} <ArrowRight size={14} />
              </a>
              <div style={{fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.5, marginTop: 12}}>
                {t("dc.ai.disclaimer")}
              </div>
            </div>
          </div>

          <div className="company-side-card">
            <span className="eyebrow">DATA SOURCES</span>
            <h2>{t("dc.source.heading")}</h2>
            {[
              [t("dc.source.metering_local"), t("dc.source.frozen"), "important"],
              [t("dc.source.enterprise_local"), t("dc.source.pending_audit"), "watch"],
              [t("dc.source.port_local"), t("dc.source.connected"), "normal"],
              [t("dc.source.human_review"), t("dc.source.pending"), "watch"],
            ].map(([name, state, tone]) => (
              <div key={name as string} className={`company-source-row ${tone}`}>
                <strong>{name}</strong>
                <span>{state}</span>
              </div>
            ))}
          </div>

          <div className="company-side-card company-review-card">
            <span className="eyebrow">REVIEW QUEUE</span>
            <h2>{t("dc.review.heading")}</h2>
            <div className="company-review-ticket">
              <strong>{t("dc.review.ticket_title")}</strong>
              <span>{t("dc.review.ticket_desc")}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
