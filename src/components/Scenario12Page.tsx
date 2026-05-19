import { useState, useMemo } from "react";
import {
  Gauge, Cpu, Wifi, WifiOff, CalendarCheck, Search, Filter,
  MapPin, Building2, Activity, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, Bot, Sparkles, Zap, Flame, Thermometer, Waves,
  FileSearch, Award, Globe,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { useI18n } from "../i18n/I18nContext";
import emblemUrl from "../../assets/logos/kazakhstan-national-emblem-header-v1.jpg";
import {
  meteringDevices,
  verificationRecords,
  scenario12Summary,
  deviceTypeLabels,
  deviceTypeUnits,
  type MeteringDevice,
  type MeteringDeviceType,
  type VerificationRecord,
} from "../data/scenario12Data";
import "../styles-scenario-1-2.css";

const typeIcons: Record<MeteringDeviceType, React.ComponentType<{ size?: number; color?: string }>> = {
  electricity: Zap,
  gas: Flame,
  heat: Thermometer,
  flow: Waves,
};

const typeColors: Record<MeteringDeviceType, string> = {
  electricity: "var(--industry-power)",
  gas: "var(--industry-gas)",
  heat: "var(--status-critical)",
  flow: "var(--industry-oil)",
};

const commIcons: Record<string, React.ComponentType<any>> = {
  online: Wifi,
  offline: WifiOff,
  degraded: Activity,
};

const resultKeyMap: Record<string, string> = {
  pass: "s12.resultPass",
  fail: "s12.resultFail",
  conditional: "s12.resultConditional",
};

export function Scenario12Page() {
  const { t, lang, setLang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<MeteringDeviceType | "all">("all");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(meteringDevices[0].id);

  const filteredDevices = useMemo(() => {
    return meteringDevices.filter((d) => {
      if (typeFilter !== "all" && d.deviceType !== typeFilter) return false;
      if (searchQuery && !d.name.includes(searchQuery) && !d.id.includes(searchQuery) && !d.company.includes(searchQuery)) return false;
      return true;
    });
  }, [searchQuery, typeFilter]);

  const selectedDevice = meteringDevices.find((d) => d.id === selectedDeviceId) ?? meteringDevices[0];
  const deviceRecords = verificationRecords.filter((r) => r.deviceId === selectedDeviceId);

  const CommIcon = commIcons[selectedDevice.commStatus] ?? Activity;

  const allTypes: (MeteringDeviceType | "all")[] = ["all", "electricity", "gas", "heat", "flow"];

  const commStatusLabel = (s: string) => s === "online" ? t("s12.commOnline") : s === "offline" ? t("s12.commOffline") : t("s12.commDegraded");
  const diagStatusLabel = (s: string) => s === "online" ? t("s12.diagNormal") : s === "offline" ? t("s12.diagInterrupted") : t("s12.diagDegraded");
  const diagDescText = (s: string) => s === "online" ? t("s12.diagNormalDesc") : s === "offline" ? t("s12.diagInterruptedDesc") : t("s12.diagDegradedDesc");
  const calibLabel = () => new Date(selectedDevice.calibrationExpiry) < new Date() ? t("s12.diagExpired") : t("s12.diagValid");

  return (
    <div className="app-shell s12-shell">
      <header className="app-header floating-panel">
        <div className="brand-lockup">
          <img src={emblemUrl} alt="Kazakhstan national emblem" className="brand-emblem" />
          <div>
            <div className="brand-title">{t("app.subtitle")}</div>
            <div className="brand-subtitle">{t("app.subtitle.en")}</div>
          </div>
        </div>
        <div className="header-center">
          <span className="workspace-tag">{t("s12.title")}</span>
          <strong>{t("app.title")}</strong>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} style={{ gap: 6 }}>
            <Globe size={15} />
            {t("app.lang")}
          </button>
          <button className="ghost-button" type="button">
            <Filter size={16} />
            {t("s12.advancedSearch")}
          </button>
          <a href="#/scenario-2-1" className="primary-button">
            <FileSearch size={17} />
            {t("s12.enterAnomalyDetection")}
          </a>
        </div>
      </header>

      <aside className="left-sidebar floating-panel s12-left-list">
        <div className="s12-left-scroll">
          <div className="s12-search-bar">
            <Search size={14} color="var(--color-text-muted)" />
            <input
              placeholder={t("s12.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="s12-filter-chips">
            {allTypes.map((type) => (
              <button
                key={type}
                className={`s12-filter-chip ${typeFilter === type ? "active" : ""}`}
                type="button"
                onClick={() => setTypeFilter(type)}
              >
                {type === "all" ? t("s12.filterAll") : deviceTypeLabels[type]}
                {type === "all"
                  ? ` ${meteringDevices.length}`
                  : ` ${meteringDevices.filter((d) => d.deviceType === type).length}`}
              </button>
            ))}
          </div>

          <div className="s12-summary-strip">
            <div className="s12-summary-item">
              <strong>{scenario12Summary.online.toLocaleString()}</strong>
              <span>{t("s12.summaryOnline")}</span>
            </div>
            <div className="s12-summary-item">
              <strong>{scenario12Summary.offline}</strong>
              <span>{t("s12.summaryOffline")}</span>
            </div>
            <div className="s12-summary-item">
              <strong>{scenario12Summary.pendingReview}</strong>
              <span>{t("s12.summaryPendingReview")}</span>
            </div>
          </div>

          <div className="s12-device-list">
            {filteredDevices.map((device) => {
              const Icon = typeIcons[device.deviceType];
              return (
                <button
                  key={device.id}
                  className={`s12-device-row ${selectedDeviceId === device.id ? "active" : ""}`}
                  type="button"
                  onClick={() => setSelectedDeviceId(device.id)}
                >
                  <div className={`s12-device-icon-box ${device.deviceType}`}>
                    <Icon size={14} color="#fff" />
                  </div>
                  <div>
                    <div className="s12-device-name">{device.name}</div>
                    <div className="s12-device-sub">{device.id} · {device.company}</div>
                  </div>
                  <div className={`s12-comm-dot ${device.commStatus}`} />
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="floating-panel s12-center-detail">
        <div className="s12-center-scroll">
          <div className="s12-profile-card">
            <div className="s12-profile-title">
              <div>
                <div className="s12-profile-name">{selectedDevice.name}</div>
                <div className="s12-profile-subtitle">{selectedDevice.id} · {deviceTypeLabels[selectedDevice.deviceType]}</div>
              </div>
              <div className={`s12-comm-dot ${selectedDevice.commStatus}`} style={{ width: 12, height: 12 }} />
            </div>
            <div className="s12-profile-grid">
              <div className="s12-profile-field">
                <span>{t("s12.fieldModel")}</span>
                <strong>{selectedDevice.model}</strong>
              </div>
              <div className="s12-profile-field">
                <span>{t("s12.fieldManufacturer")}</span>
                <strong>{selectedDevice.manufacturer}</strong>
              </div>
              <div className="s12-profile-field">
                <span>{t("s12.fieldCertNumber")}</span>
                <strong>{selectedDevice.certNumber}</strong>
              </div>
              <div className="s12-profile-field">
                <span>{t("s12.fieldInstallLocation")}</span>
                <strong><MapPin size={12} style={{ display: "inline", marginRight: 4 }} />{selectedDevice.installLocation}</strong>
              </div>
              <div className="s12-profile-field">
                <span>{t("s12.fieldCompany")}</span>
                <strong><Building2 size={12} style={{ display: "inline", marginRight: 4 }} />{selectedDevice.company}</strong>
              </div>
              <div className="s12-profile-field">
                <span>{t("s12.fieldCalibrationExpiry")}</span>
                <strong>{selectedDevice.calibrationExpiry}</strong>
              </div>
            </div>
          </div>

          <div className="s12-reading-strip">
            <div className="s12-reading-card">
              <span>{t("s12.readingCurrent")}</span>
              <strong>{selectedDevice.currentReading.toLocaleString()}</strong>
              <small>{selectedDevice.readingUnit}</small>
            </div>
            <div className="s12-reading-card">
              <span>{t("s12.readingCommStatus")}</span>
              <CommIcon size={24} style={{ color:
                selectedDevice.commStatus === "online" ? "var(--status-normal)" :
                selectedDevice.commStatus === "offline" ? "var(--status-critical)" : "var(--status-watch)"
              }} />
              <small>{commStatusLabel(selectedDevice.commStatus)}</small>
            </div>
            <div className="s12-reading-card">
              <span>{t("s12.readingLastCollection")}</span>
              <strong>{selectedDevice.lastCollectionTime.slice(-5)}</strong>
              <small>{selectedDevice.lastCollectionTime.slice(0, 10)}</small>
            </div>
          </div>

          <div className="s12-heartbeat-card">
            <div className="s12-heartbeat-title">{t("s12.heartbeatTitle")}</div>
            <div className="s12-heartbeat-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedDevice.heartbeatData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} interval={3} />
                  <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} />
                  <Tooltip />
                  <ReferenceLine y={0.7} stroke="var(--status-watch)" strokeDasharray="4 4" strokeWidth={1} />
                  <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="s12-diag-strip">
            <div className={`s12-diag-card ${selectedDevice.commStatus === "offline" ? "critical" : selectedDevice.commStatus === "degraded" ? "warning" : ""}`}>
              <div className="s12-diag-label">
                <Cpu size={14} />
                {t("s12.diagComm")}
              </div>
              <div className="s12-diag-value">
                {diagStatusLabel(selectedDevice.commStatus)}
              </div>
              <div className="s12-diag-sub">
                {diagDescText(selectedDevice.commStatus)}
              </div>
            </div>
            <div className={`s12-diag-card ${new Date(selectedDevice.calibrationExpiry) < new Date() ? "critical" : ""}`}>
              <div className="s12-diag-label">
                <CalendarCheck size={14} />
                {t("s12.diagCalibration")}
              </div>
              <div className="s12-diag-value">
                {calibLabel()}
              </div>
              <div className="s12-diag-sub">{t("s12.diagExpiryPrefix")}{selectedDevice.calibrationExpiry}</div>
            </div>
          </div>
        </div>
      </main>

      <aside className="right-sidebar floating-panel s12-right-records">
        <div className="s12-right-scroll">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">{t("s12.verificationEyebrow")}</span>
              <h2>{t("s12.verificationTitle")}</h2>
            </div>
            <Award size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </div>

          <div className="s12-record-timeline">
            {deviceRecords.map((record, idx) => (
              <div className="s12-record-item" key={record.id}>
                <div className="s12-record-line">
                  <div className={`s12-record-dot ${record.result}`} />
                  {idx < deviceRecords.length - 1 && <div className="s12-record-connector" />}
                </div>
                <div className="s12-record-content">
                  <div className="s12-record-date">{record.date}</div>
                  <div className="s12-record-type">{record.type}</div>
                  <div className={`s12-record-result ${record.result}`}>{t(resultKeyMap[record.result])}</div>
                  <div className="s12-record-cert">{t("s12.certPrefix")}{record.certUrl}</div>
                  <div className="s12-record-notes">{record.inspectorNotes}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="s12-ai-tip">
            <div className="s12-ai-tip-header">
              <Bot size={14} />
              <Sparkles size={12} />
              {t("s12.aiTipTitle")}
            </div>
            <div className="s12-ai-tip-text">
              {selectedDevice.status === "critical" ? t("s12.aiTipCritical") :
               selectedDevice.status === "important" ? t("s12.aiTipImportant") :
               selectedDevice.status === "watch" ? t("s12.aiTipWatch") :
               t("s12.aiTipNormal")}
            </div>
          </div>
        </div>
      </aside>

      <div className="s12-disclaimer">
        <ShieldCheck size={12} />
        {t("s12.disclaimer")}
      </div>
    </div>
  );
}
