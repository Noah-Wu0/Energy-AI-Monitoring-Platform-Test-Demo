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

const resultLabels: Record<string, string> = {
  pass: "合格",
  fail: "不合格",
  conditional: "有条件合格",
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
            高级检索
          </button>
          <a href="#/scenario-2-1" className="primary-button">
            <FileSearch size={17} />
            进入异常检测
          </a>
        </div>
      </header>

      <aside className="left-sidebar floating-panel s12-left-list">
        <div className="s12-left-scroll">
          <div className="s12-search-bar">
            <Search size={14} color="var(--color-text-muted)" />
            <input
              placeholder="搜索设备编号、名称或企业..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="s12-filter-chips">
            {allTypes.map((t) => (
              <button
                key={t}
                className={`s12-filter-chip ${typeFilter === t ? "active" : ""}`}
                type="button"
                onClick={() => setTypeFilter(t)}
              >
                {t === "all" ? "全部" : deviceTypeLabels[t]}
                {t === "all"
                  ? ` ${meteringDevices.length}`
                  : ` ${meteringDevices.filter((d) => d.deviceType === t).length}`}
              </button>
            ))}
          </div>

          <div className="s12-summary-strip">
            <div className="s12-summary-item">
              <strong>{scenario12Summary.online.toLocaleString()}</strong>
              <span>在线</span>
            </div>
            <div className="s12-summary-item">
              <strong>{scenario12Summary.offline}</strong>
              <span>离线</span>
            </div>
            <div className="s12-summary-item">
              <strong>{scenario12Summary.pendingReview}</strong>
              <span>待复核</span>
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
                <span>型号</span>
                <strong>{selectedDevice.model}</strong>
              </div>
              <div className="s12-profile-field">
                <span>制造商</span>
                <strong>{selectedDevice.manufacturer}</strong>
              </div>
              <div className="s12-profile-field">
                <span>认证证书编号</span>
                <strong>{selectedDevice.certNumber}</strong>
              </div>
              <div className="s12-profile-field">
                <span>安装位置</span>
                <strong><MapPin size={12} style={{ display: "inline", marginRight: 4 }} />{selectedDevice.installLocation}</strong>
              </div>
              <div className="s12-profile-field">
                <span>所属企业</span>
                <strong><Building2 size={12} style={{ display: "inline", marginRight: 4 }} />{selectedDevice.company}</strong>
              </div>
              <div className="s12-profile-field">
                <span>校准有效期</span>
                <strong>{selectedDevice.calibrationExpiry}</strong>
              </div>
            </div>
          </div>

          <div className="s12-reading-strip">
            <div className="s12-reading-card">
              <span>当前读数</span>
              <strong>{selectedDevice.currentReading.toLocaleString()}</strong>
              <small>{selectedDevice.readingUnit}</small>
            </div>
            <div className="s12-reading-card">
              <span>通信状态</span>
              <CommIcon size={24} style={{ color:
                selectedDevice.commStatus === "online" ? "var(--status-normal)" :
                selectedDevice.commStatus === "offline" ? "var(--status-critical)" : "var(--status-watch)"
              }} />
              <small>{selectedDevice.commStatus === "online" ? "在线" : selectedDevice.commStatus === "offline" ? "离线" : "降级"}</small>
            </div>
            <div className="s12-reading-card">
              <span>最后采集时间</span>
              <strong>{selectedDevice.lastCollectionTime.slice(-5)}</strong>
              <small>{selectedDevice.lastCollectionTime.slice(0, 10)}</small>
            </div>
          </div>

          <div className="s12-heartbeat-card">
            <div className="s12-heartbeat-title">24h 通信心跳监测</div>
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
                通信诊断
              </div>
              <div className="s12-diag-value">
                {selectedDevice.commStatus === "online" ? "正常" : selectedDevice.commStatus === "offline" ? "中断" : "降级"}
              </div>
              <div className="s12-diag-sub">
                {selectedDevice.commStatus === "online" ? "信号强度良好，数据回传正常" :
                 selectedDevice.commStatus === "offline" ? "自 08:45 起无数据回传，建议现场检查" :
                 "信号衰减，偶发丢包，建议排查通信链路"}
              </div>
            </div>
            <div className={`s12-diag-card ${new Date(selectedDevice.calibrationExpiry) < new Date() ? "critical" : ""}`}>
              <div className="s12-diag-label">
                <CalendarCheck size={14} />
                校准状态
              </div>
              <div className="s12-diag-value">
                {new Date(selectedDevice.calibrationExpiry) < new Date() ? "已过期" : "有效"}
              </div>
              <div className="s12-diag-sub">有效期至 {selectedDevice.calibrationExpiry}</div>
            </div>
          </div>
        </div>
      </main>

      <aside className="right-sidebar floating-panel s12-right-records">
        <div className="s12-right-scroll">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">VERIFICATION</span>
              <h2>计量检定记录</h2>
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
                  <div className={`s12-record-result ${record.result}`}>{resultLabels[record.result]}</div>
                  <div className="s12-record-cert">证书: {record.certUrl}</div>
                  <div className="s12-record-notes">{record.inspectorNotes}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="s12-ai-tip">
            <div className="s12-ai-tip-header">
              <Bot size={14} />
              <Sparkles size={12} />
              AI 初判建议
            </div>
            <div className="s12-ai-tip-text">
              {selectedDevice.status === "critical" ? "该设备校准已过期且通信中断，建议立即安排现场检定并核查最近一次采集数据的有效性。AI 初判结果仅供人工复核参考。" :
               selectedDevice.status === "important" ? "该设备通信降级且校准即将到期，建议优先安排检定计划并监控通信恢复情况。" :
               selectedDevice.status === "watch" ? "该设备通信质量下降，建议列入观察名单并计划近期检定。" :
               "该设备运行状态正常，检定记录完整，建议按常规周期安排下次检定。"}
            </div>
          </div>
        </div>
      </aside>

      <div className="s12-disclaimer">
        <ShieldCheck size={12} />
        演示系统不接入物理真实测点
      </div>
    </div>
  );
}
