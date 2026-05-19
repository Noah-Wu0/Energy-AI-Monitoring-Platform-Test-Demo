import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileClock,
  GitBranch,
  Globe,
  Map,
  ShieldCheck,
} from "lucide-react";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import { useI18n } from "../i18n/I18nContext";

export function HomePage() {
  const { t, lang, setLang } = useI18n();

  const storySteps = [
    { id: "01", label: t("step.1.label"), title: t("step.1.title"), route: "#/scenario-1-1", icon: Map },
    { id: "02", label: t("step.2.label"), title: t("step.2.title"), route: "#/drill-down-region", icon: GitBranch },
    { id: "03", label: t("step.3.label"), title: t("step.3.title"), route: "#/drill-down-company", icon: Database },
    { id: "04", label: t("step.4.label"), title: t("step.4.title"), route: "#/scenario-2-1", icon: Bot },
    { id: "05", label: t("step.5.label"), title: t("step.5.title"), route: "#/scenario-3-1", icon: ClipboardCheck },
  ];

  const loopItems = t("home.loop.items").split(",");

  return (
    <div className="app-shell home-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("app.home")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button
            className="ghost-button"
            type="button"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            style={{ gap: 6 }}
          >
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <a href="#/scenario-1-1" className="primary-button">
            <BarChart3 size={17} />
            {t("app.start")}
          </a>
        </div>
      </header>

      <main className="home-main">
        <section className="home-brief floating-panel">
          <div className="home-hero-copy">
            <span className="eyebrow">{t("home.eyebrow")}</span>
            <h1>{t("home.title")}</h1>
            <p>{t("home.desc")}</p>
            <div className="home-hero-actions">
              <a href="#/scenario-1-1" className="primary-button">
                {t("home.enter")} <ArrowRight size={15} />
              </a>
              <a href="#/scenario-3-1" className="ghost-button">
                {t("home.attribution")}
              </a>
            </div>
          </div>
          <div className="home-brief-metrics">
            <div><span>{t("home.metric1")}</span><strong>78%</strong></div>
            <div><span>{t("home.metric2")}</span><strong>87%</strong></div>
            <div><span>{t("home.metric3")}</span><strong>{t("home.metric3.value")}</strong></div>
            <div><span>{t("home.metric4")}</span><strong>{t("home.metric4.value")}</strong></div>
          </div>
        </section>

        <aside className="home-side-panel floating-panel">
          <div className="home-incident-card">
            <div className="home-incident-header">
              <AlertTriangle size={18} />
              <span>{t("home.incident.title")}</span>
            </div>
            <strong>{t("home.incident.name")}</strong>
            <p>{t("home.incident.desc")}</p>
            <div className="home-incident-grid">
              <div><span>{t("home.metric1")}</span><b>78%</b></div>
              <div><span>{t("home.metric2")}</span><b>87%</b></div>
              <div><span>{t("home.incident.current_stage")}</span><b>{t("home.metric3.value")}</b></div>
            </div>
          </div>

          <div className="home-side-notes">
            {[1, 2, 3].map((i) => (
              <div className="home-info-card" key={i}>
                <span>{t(`home.card${i}.title`)}</span>
                <strong>{t(`home.card${i}.value`)}</strong>
                <p>{t(`home.card${i}.note`)}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="home-story-panel floating-panel">
          <div className="home-section-title">
            <div>
              <span className="eyebrow">{t("home.flow.eyebrow")}</span>
              <h2>{t("home.flow.title")}</h2>
            </div>
            <ShieldCheck size={18} />
          </div>
          <div className="home-story-steps">
            {storySteps.map((step) => {
              const Icon = step.icon;
              return (
                <a href={step.route} className="home-story-step" key={step.id}>
                  <div className="home-step-index">{step.id}</div>
                  <div className="home-step-icon"><Icon size={16} /></div>
                  <span>{step.label}</span>
                  <strong>{step.title}</strong>
                </a>
              );
            })}
          </div>
        </section>

        <div className="home-bottom-row">
          <section className="home-close-loop floating-panel">
            <div className="home-section-title">
              <div>
                <span className="eyebrow">{t("home.loop.eyebrow")}</span>
                <h2>{t("home.loop.title")}</h2>
              </div>
              <FileCheck2 size={18} />
            </div>
            <div className="home-loop-line">
              {loopItems.map((item, index) => (
                <div className={index === 3 ? "active" : ""} key={item.trim()}>
                  <span>{index + 1}</span>
                  <strong>{item.trim()}</strong>
                </div>
              ))}
            </div>
            <div className="home-footer-note">
              <FileClock size={15} />
              <span>{t("home.loop.note")}</span>
            </div>
          </section>

          <section className="home-script-panel floating-panel">
            <div className="home-section-title">
              <div>
                <span className="eyebrow">{t("home.script.eyebrow")}</span>
                <h2>{t("home.script.title")}</h2>
              </div>
              <FileClock size={18} />
            </div>
            <div className="home-script-list">
              <p>{t("home.script.1")}</p>
              <p>{t("home.script.2")}</p>
              <p>{t("home.script.3")}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
