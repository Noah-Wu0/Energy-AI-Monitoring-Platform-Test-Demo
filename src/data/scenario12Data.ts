export type MeteringDeviceType = "electricity" | "gas" | "heat" | "flow";

export type MeteringCommStatus = "online" | "offline" | "degraded";

export type MeteringDevice = {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  certNumber: string;
  installLocation: string;
  company: string;
  deviceType: MeteringDeviceType;
  status: "normal" | "watch" | "important" | "critical";
  currentReading: number;
  readingUnit: string;
  commStatus: MeteringCommStatus;
  lastCollectionTime: string;
  calibrationExpiry: string;
  heartbeatData: { time: string; value: number }[];
};

// ---- Summary Stats (aligned with 1.1 KPIs: 1,890 total / 1,842 online / 48 offline / 17 pending) ----
export interface MeteringDeviceSummary {
  total: number;
  online: number;
  offline: number;
  watch: number;
  pendingReview: number;
  lastRefresh: string;
}

export const scenario12Summary: MeteringDeviceSummary = {
  total: 1890,
  online: 1842,
  offline: 48,
  watch: 14,
  pendingReview: 17,
  lastRefresh: "15:30",
};

export type VerificationRecord = {
  id: string;
  deviceId: string;
  date: string;
  type: string;
  result: "pass" | "fail" | "conditional";
  certUrl: string;
  inspectorNotes: string;
};

export const meteringDevices: MeteringDevice[] = [
  {
    id: "EM-MT-001",
    name: "阿克套变电站1号主变电能计量装置",
    model: "SIMEAS P 7KG7755",
    manufacturer: "西门子能源（Siemens Energy）",
    certNumber: "KZ-MET-2024-08821",
    installLocation: "曼吉斯套州阿克套市220kV变电站",
    company: "曼吉斯套州电力配网公司",
    deviceType: "electricity",
    status: "normal",
    currentReading: 128847.6,
    readingUnit: "MWh",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:28",
    calibrationExpiry: "2027-03-14",
    heartbeatData: [
      { time: "00:00", value: 0.92 }, { time: "01:00", value: 0.88 }, { time: "02:00", value: 0.85 },
      { time: "03:00", value: 0.83 }, { time: "04:00", value: 0.84 }, { time: "05:00", value: 0.90 },
      { time: "06:00", value: 0.93 }, { time: "07:00", value: 0.96 }, { time: "08:00", value: 0.98 },
      { time: "09:00", value: 0.99 }, { time: "10:00", value: 0.97 }, { time: "11:00", value: 0.98 },
      { time: "12:00", value: 0.99 }, { time: "13:00", value: 0.97 }, { time: "14:00", value: 0.96 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.97 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.96 },
      { time: "21:00", value: 0.97 }, { time: "22:00", value: 0.94 }, { time: "23:00", value: 0.91 },
    ],
  },
  {
    id: "EM-MT-002",
    name: "阿特劳炼厂110kV进线计量装置",
    model: "ABB Emax 2 E6.2/H",
    manufacturer: "ABB（阿西布朗勃法瑞）",
    certNumber: "KZ-MET-2024-09345",
    installLocation: "阿特劳州阿特劳石化工业园110kV变电站",
    company: "阿特劳石油炼化股份公司",
    deviceType: "electricity",
    status: "normal",
    currentReading: 75234.2,
    readingUnit: "MWh",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:30",
    calibrationExpiry: "2026-11-08",
    heartbeatData: [
      { time: "00:00", value: 0.95 }, { time: "01:00", value: 0.93 }, { time: "02:00", value: 0.91 },
      { time: "03:00", value: 0.90 }, { time: "04:00", value: 0.89 }, { time: "05:00", value: 0.92 },
      { time: "06:00", value: 0.95 }, { time: "07:00", value: 0.97 }, { time: "08:00", value: 0.99 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 1.00 },
      { time: "12:00", value: 0.99 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.97 },
      { time: "15:00", value: 0.99 }, { time: "16:00", value: 0.98 }, { time: "17:00", value: 0.96 },
      { time: "18:00", value: 0.95 }, { time: "19:00", value: 0.94 }, { time: "20:00", value: 0.93 },
      { time: "21:00", value: 0.95 }, { time: "22:00", value: 0.96 }, { time: "23:00", value: 0.94 },
    ],
  },
  {
    id: "GM-FL-003",
    name: "CPC管道阿克套段天然气流量计量装置",
    model: "Emerson Daniel 3418 8\"",
    manufacturer: "艾默生过程控制（Emerson）",
    certNumber: "KZ-MET-2025-00128",
    installLocation: "曼吉斯套州阿克套CPC原油管道计量站",
    company: "里海管道财团（CPC）",
    deviceType: "gas",
    status: "normal",
    currentReading: 342561.8,
    readingUnit: "kNm³",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:28",
    calibrationExpiry: "2027-06-22",
    heartbeatData: [
      { time: "00:00", value: 0.94 }, { time: "01:00", value: 0.91 }, { time: "02:00", value: 0.89 },
      { time: "03:00", value: 0.87 }, { time: "04:00", value: 0.86 }, { time: "05:00", value: 0.88 },
      { time: "06:00", value: 0.90 }, { time: "07:00", value: 0.93 }, { time: "08:00", value: 0.96 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 0.97 },
      { time: "12:00", value: 0.98 }, { time: "13:00", value: 0.99 }, { time: "14:00", value: 0.97 },
      { time: "15:00", value: 0.96 }, { time: "16:00", value: 0.97 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.93 }, { time: "19:00", value: 0.94 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.91 }, { time: "22:00", value: 0.93 }, { time: "23:00", value: 0.95 },
    ],
  },
  {
    id: "GM-FL-004",
    name: "贝内乌压缩机站天然气流量计量装置",
    model: "Sick FLOWSIC600 10\"",
    manufacturer: "西克（Sick AG）",
    certNumber: "KZ-MET-2024-10672",
    installLocation: "曼吉斯套州贝内乌天然气压缩机站",
    company: "哈萨克天然气运输公司（KazTransGas）",
    deviceType: "gas",
    status: "watch",
    currentReading: 891234.5,
    readingUnit: "kNm³",
    commStatus: "degraded",
    lastCollectionTime: "2026-05-18 15:12",
    calibrationExpiry: "2026-09-30",
    heartbeatData: [
      { time: "00:00", value: 0.91 }, { time: "01:00", value: 0.88 }, { time: "02:00", value: 0.85 },
      { time: "03:00", value: 0.82 }, { time: "04:00", value: 0.79 }, { time: "05:00", value: 0.76 },
      { time: "06:00", value: 0.74 }, { time: "07:00", value: 0.72 }, { time: "08:00", value: 0.70 },
      { time: "09:00", value: 0.68 }, { time: "10:00", value: 0.71 }, { time: "11:00", value: 0.73 },
      { time: "12:00", value: 0.69 }, { time: "13:00", value: 0.65 }, { time: "14:00", value: 0.62 },
      { time: "15:00", value: 0.60 }, { time: "16:00", value: 0.63 }, { time: "17:00", value: 0.66 },
      { time: "18:00", value: 0.64 }, { time: "19:00", value: 0.61 }, { time: "20:00", value: 0.58 },
      { time: "21:00", value: 0.55 }, { time: "22:00", value: 0.52 }, { time: "23:00", value: 0.50 },
    ],
  },
  {
    id: "HT-CL-005",
    name: "阿克套热电联产厂热能计量装置",
    model: "Kamstrup MULTICAL 603",
    manufacturer: "卡姆斯特鲁普（Kamstrup A/S）",
    certNumber: "KZ-MET-2025-01452",
    installLocation: "曼吉斯套州阿克套市热电联产厂",
    company: "阿克套热力能源公司",
    deviceType: "heat",
    status: "normal",
    currentReading: 15678.3,
    readingUnit: "GJ",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:30",
    calibrationExpiry: "2028-01-15",
    heartbeatData: [
      { time: "00:00", value: 0.96 }, { time: "01:00", value: 0.94 }, { time: "02:00", value: 0.93 },
      { time: "03:00", value: 0.92 }, { time: "04:00", value: 0.93 }, { time: "05:00", value: 0.95 },
      { time: "06:00", value: 0.97 }, { time: "07:00", value: 0.98 }, { time: "08:00", value: 0.99 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 1.00 },
      { time: "12:00", value: 0.99 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.99 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.97 }, { time: "17:00", value: 0.98 },
      { time: "18:00", value: 0.97 }, { time: "19:00", value: 0.96 }, { time: "20:00", value: 0.95 },
      { time: "21:00", value: 0.96 }, { time: "22:00", value: 0.97 }, { time: "23:00", value: 0.95 },
    ],
  },
  {
    id: "HT-CL-006",
    name: "阿特劳石化热能计量装置",
    model: "Danfoss SonoSelect 10",
    manufacturer: "丹佛斯（Danfoss）",
    certNumber: "KZ-MET-2024-07834",
    installLocation: "阿特劳州阿特劳石化工业园",
    company: "阿特劳石油炼化股份公司",
    deviceType: "heat",
    status: "critical",
    currentReading: 8921.7,
    readingUnit: "GJ",
    commStatus: "offline",
    lastCollectionTime: "2026-05-18 08:45",
    calibrationExpiry: "2026-04-02",
    heartbeatData: [
      { time: "00:00", value: 0.88 }, { time: "01:00", value: 0.85 }, { time: "02:00", value: 0.82 },
      { time: "03:00", value: 0.78 }, { time: "04:00", value: 0.74 }, { time: "05:00", value: 0.70 },
      { time: "06:00", value: 0.65 }, { time: "07:00", value: 0.60 }, { time: "08:00", value: 0.48 },
      { time: "09:00", value: 0 }, { time: "10:00", value: 0 }, { time: "11:00", value: 0 },
      { time: "12:00", value: 0 }, { time: "13:00", value: 0 }, { time: "14:00", value: 0 },
      { time: "15:00", value: 0 }, { time: "16:00", value: 0 }, { time: "17:00", value: 0 },
      { time: "18:00", value: 0 }, { time: "19:00", value: 0 }, { time: "20:00", value: 0 },
      { time: "21:00", value: 0 }, { time: "22:00", value: 0 }, { time: "23:00", value: 0 },
    ],
  },
  {
    id: "LF-CL-007",
    name: "乌津集油站液体流量计量装置",
    model: "Endress+Hauser Proline Promass F 300",
    manufacturer: "恩德斯豪斯（Endress+Hauser）",
    certNumber: "KZ-MET-2025-02215",
    installLocation: "曼吉斯套州乌津油田集油站",
    company: "乌津油气生产分公司",
    deviceType: "flow",
    status: "normal",
    currentReading: 14400.5,
    readingUnit: "t/d",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:29",
    calibrationExpiry: "2027-08-11",
    heartbeatData: [
      { time: "00:00", value: 0.93 }, { time: "01:00", value: 0.91 }, { time: "02:00", value: 0.90 },
      { time: "03:00", value: 0.89 }, { time: "04:00", value: 0.88 }, { time: "05:00", value: 0.90 },
      { time: "06:00", value: 0.93 }, { time: "07:00", value: 0.95 }, { time: "08:00", value: 0.97 },
      { time: "09:00", value: 0.99 }, { time: "10:00", value: 0.98 }, { time: "11:00", value: 0.99 },
      { time: "12:00", value: 0.97 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.96 },
      { time: "15:00", value: 0.97 }, { time: "16:00", value: 0.95 }, { time: "17:00", value: 0.94 },
      { time: "18:00", value: 0.93 }, { time: "19:00", value: 0.92 }, { time: "20:00", value: 0.91 },
      { time: "21:00", value: 0.93 }, { time: "22:00", value: 0.94 }, { time: "23:00", value: 0.92 },
    ],
  },
  {
    id: "LF-CL-008",
    name: "卡拉让巴斯计量站液体流量计量装置",
    model: "Krohne OPTIMASS 7400C",
    manufacturer: "科隆（Krohne）",
    certNumber: "KZ-MET-2024-05691",
    installLocation: "曼吉斯套州卡拉让巴斯油田计量站",
    company: "卡拉让巴斯油气生产分公司",
    deviceType: "flow",
    status: "important",
    currentReading: 6421.8,
    readingUnit: "t/d",
    commStatus: "degraded",
    lastCollectionTime: "2026-05-18 15:18",
    calibrationExpiry: "2026-07-29",
    heartbeatData: [
      { time: "00:00", value: 0.89 }, { time: "01:00", value: 0.86 }, { time: "02:00", value: 0.84 },
      { time: "03:00", value: 0.81 }, { time: "04:00", value: 0.78 }, { time: "05:00", value: 0.75 },
      { time: "06:00", value: 0.73 }, { time: "07:00", value: 0.76 }, { time: "08:00", value: 0.72 },
      { time: "09:00", value: 0.68 }, { time: "10:00", value: 0.65 }, { time: "11:00", value: 0.61 },
      { time: "12:00", value: 0.58 }, { time: "13:00", value: 0.55 }, { time: "14:00", value: 0.60 },
      { time: "15:00", value: 0.56 }, { time: "16:00", value: 0.53 }, { time: "17:00", value: 0.57 },
      { time: "18:00", value: 0.54 }, { time: "19:00", value: 0.51 }, { time: "20:00", value: 0.48 },
      { time: "21:00", value: 0.52 }, { time: "22:00", value: 0.49 }, { time: "23:00", value: 0.46 },
    ],
  },
  {
    id: "EM-MT-009",
    name: "卡拉姆卡斯油田配电站电能计量装置",
    model: "XJ-EM6000 智能电能表",
    manufacturer: "许继电气股份有限公司",
    certNumber: "KZ-MET-2025-03102",
    installLocation: "曼吉斯套州卡拉姆卡斯油田35kV配电站",
    company: "卡拉姆卡斯油气生产分公司",
    deviceType: "electricity",
    status: "normal",
    currentReading: 45210.9,
    readingUnit: "MWh",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:28",
    calibrationExpiry: "2027-12-03",
    heartbeatData: [
      { time: "00:00", value: 0.94 }, { time: "01:00", value: 0.92 }, { time: "02:00", value: 0.90 },
      { time: "03:00", value: 0.89 }, { time: "04:00", value: 0.90 }, { time: "05:00", value: 0.92 },
      { time: "06:00", value: 0.94 }, { time: "07:00", value: 0.96 }, { time: "08:00", value: 0.98 },
      { time: "09:00", value: 0.99 }, { time: "10:00", value: 0.98 }, { time: "11:00", value: 0.99 },
      { time: "12:00", value: 0.97 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.99 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.96 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },
  {
    id: "GM-FL-010",
    name: "卡沙甘陆上终端天然气流量计量装置",
    model: "RMG ERZ 2000 12\"",
    manufacturer: "RMG Messtechnik GmbH",
    certNumber: "KZ-MET-2025-00984",
    installLocation: "阿特劳州卡沙甘油田陆上处理终端",
    company: "北里海运营公司（NCOC）",
    deviceType: "gas",
    status: "normal",
    currentReading: 1284567.2,
    readingUnit: "kNm³",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:31",
    calibrationExpiry: "2027-09-18",
    heartbeatData: [
      { time: "00:00", value: 0.95 }, { time: "01:00", value: 0.93 }, { time: "02:00", value: 0.92 },
      { time: "03:00", value: 0.91 }, { time: "04:00", value: 0.90 }, { time: "05:00", value: 0.92 },
      { time: "06:00", value: 0.94 }, { time: "07:00", value: 0.96 }, { time: "08:00", value: 0.98 },
      { time: "09:00", value: 0.99 }, { time: "10:00", value: 0.98 }, { time: "11:00", value: 0.99 },
      { time: "12:00", value: 0.98 }, { time: "13:00", value: 0.97 }, { time: "14:00", value: 0.98 },
      { time: "15:00", value: 0.99 }, { time: "16:00", value: 0.97 }, { time: "17:00", value: 0.96 },
      { time: "18:00", value: 0.95 }, { time: "19:00", value: 0.94 }, { time: "20:00", value: 0.93 },
      { time: "21:00", value: 0.95 }, { time: "22:00", value: 0.96 }, { time: "23:00", value: 0.94 },
    ],
  },

  // === 第二批装置（覆盖更多地区和状态） ===

  // 巴甫洛达尔州（Pavlodar）— 电能计量
  {
    id: "EM-MT-011",
    name: "巴甫洛达尔炼厂110kV主变电能计量装置",
    model: "Siemens SIMEAS P 7KG7755",
    manufacturer: "西门子能源（Siemens Energy）",
    certNumber: "KZ-MET-2024-09912",
    installLocation: "巴甫洛达尔州巴甫洛达尔炼厂110kV变电站",
    company: "巴甫洛达尔石油化工股份公司（POCR）",
    deviceType: "electricity",
    status: "watch",
    currentReading: 62341.5,
    readingUnit: "MWh",
    commStatus: "degraded",
    lastCollectionTime: "2026-05-18 15:19",
    calibrationExpiry: "2026-08-22",
    heartbeatData: [
      { time: "00:00", value: 0.91 }, { time: "01:00", value: 0.88 }, { time: "02:00", value: 0.85 },
      { time: "03:00", value: 0.83 }, { time: "04:00", value: 0.81 }, { time: "05:00", value: 0.80 },
      { time: "06:00", value: 0.79 }, { time: "07:00", value: 0.82 }, { time: "08:00", value: 0.80 },
      { time: "09:00", value: 0.78 }, { time: "10:00", value: 0.75 }, { time: "11:00", value: 0.77 },
      { time: "12:00", value: 0.74 }, { time: "13:00", value: 0.72 }, { time: "14:00", value: 0.70 },
      { time: "15:00", value: 0.68 }, { time: "16:00", value: 0.71 }, { time: "17:00", value: 0.73 },
      { time: "18:00", value: 0.76 }, { time: "19:00", value: 0.78 }, { time: "20:00", value: 0.81 },
      { time: "21:00", value: 0.84 }, { time: "22:00", value: 0.87 }, { time: "23:00", value: 0.90 },
    ],
  },

  // 奇姆肯特市（Shymkent）— 液体流量计量
  {
    id: "LF-CL-012",
    name: "奇姆肯特炼厂成品油外输流量计量装置",
    model: "Endress+Hauser Proline Promass F 300",
    manufacturer: "恩德斯豪斯（Endress+Hauser）",
    certNumber: "KZ-MET-2025-03188",
    installLocation: "奇姆肯特市奇姆肯特炼厂成品油外输站",
    company: "中哈石油炼化股份公司（PetroKazakhstan Oil）",
    deviceType: "flow",
    status: "normal",
    currentReading: 9840.5,
    readingUnit: "t/d",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:30",
    calibrationExpiry: "2027-05-10",
    heartbeatData: [
      { time: "00:00", value: 0.92 }, { time: "01:00", value: 0.90 }, { time: "02:00", value: 0.89 },
      { time: "03:00", value: 0.88 }, { time: "04:00", value: 0.87 }, { time: "05:00", value: 0.89 },
      { time: "06:00", value: 0.91 }, { time: "07:00", value: 0.94 }, { time: "08:00", value: 0.96 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 0.97 },
      { time: "12:00", value: 0.98 }, { time: "13:00", value: 0.96 }, { time: "14:00", value: 0.97 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.96 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },

  // 阿克托别州（Aktobe）— 天然气计量
  {
    id: "GM-FL-013",
    name: "扎纳若尔油田伴生气计量装置",
    model: "Sick FLOWSIC600 8\"",
    manufacturer: "西克（Sick AG）",
    certNumber: "KZ-MET-2024-08834",
    installLocation: "阿克托别州扎纳若尔油田气体处理站",
    company: "中石油阿克托别油气股份公司（CNPC-AMG）",
    deviceType: "gas",
    status: "normal",
    currentReading: 567890.3,
    readingUnit: "kNm³",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:29",
    calibrationExpiry: "2027-03-08",
    heartbeatData: [
      { time: "00:00", value: 0.93 }, { time: "01:00", value: 0.92 }, { time: "02:00", value: 0.90 },
      { time: "03:00", value: 0.89 }, { time: "04:00", value: 0.88 }, { time: "05:00", value: 0.90 },
      { time: "06:00", value: 0.92 }, { time: "07:00", value: 0.94 }, { time: "08:00", value: 0.96 },
      { time: "09:00", value: 0.97 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 0.98 },
      { time: "12:00", value: 0.97 }, { time: "13:00", value: 0.96 }, { time: "14:00", value: 0.95 },
      { time: "15:00", value: 0.96 }, { time: "16:00", value: 0.94 }, { time: "17:00", value: 0.93 },
      { time: "18:00", value: 0.92 }, { time: "19:00", value: 0.91 }, { time: "20:00", value: 0.93 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },

  // 克孜勒奥尔达州（Kyzylorda）— 电能计量
  {
    id: "EM-MT-014",
    name: "库姆科尔油田中心变电站电能计量装置",
    model: "ABB Emax 2 E4.2",
    manufacturer: "ABB（阿西布朗勃法瑞）",
    certNumber: "KZ-MET-2025-02665",
    installLocation: "克孜勒奥尔达州库姆科尔油田110kV变电站",
    company: "中哈石油炼化股份公司（PetroKazakhstan Oil）",
    deviceType: "electricity",
    status: "normal",
    currentReading: 38450.2,
    readingUnit: "MWh",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:30",
    calibrationExpiry: "2027-06-30",
    heartbeatData: [
      { time: "00:00", value: 0.94 }, { time: "01:00", value: 0.92 }, { time: "02:00", value: 0.91 },
      { time: "03:00", value: 0.90 }, { time: "04:00", value: 0.89 }, { time: "05:00", value: 0.91 },
      { time: "06:00", value: 0.93 }, { time: "07:00", value: 0.95 }, { time: "08:00", value: 0.97 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.99 }, { time: "11:00", value: 0.98 },
      { time: "12:00", value: 0.97 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.96 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.97 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },

  // 努尔苏丹（Nur-Sultan/Astana）— 热能计量（offline 待复核）
  {
    id: "HT-CL-015",
    name: "能源部总部大楼热能计量装置",
    model: "Danfoss SonoSelect 10",
    manufacturer: "丹佛斯（Danfoss）",
    certNumber: "KZ-MET-2024-08112",
    installLocation: "努尔苏丹市能源部总部办公楼",
    company: "能源部后勤保障局",
    deviceType: "heat",
    status: "critical",
    currentReading: 2341.2,
    readingUnit: "GJ",
    commStatus: "offline",
    lastCollectionTime: "2026-05-18 06:30",
    calibrationExpiry: "2026-02-15",
    heartbeatData: [
      { time: "00:00", value: 0.82 }, { time: "01:00", value: 0.78 }, { time: "02:00", value: 0.74 },
      { time: "03:00", value: 0.68 }, { time: "04:00", value: 0.60 }, { time: "05:00", value: 0.50 },
      { time: "06:00", value: 0.35 }, { time: "07:00", value: 0 }, { time: "08:00", value: 0 },
      { time: "09:00", value: 0 }, { time: "10:00", value: 0 }, { time: "11:00", value: 0 },
      { time: "12:00", value: 0 }, { time: "13:00", value: 0 }, { time: "14:00", value: 0 },
      { time: "15:00", value: 0 }, { time: "16:00", value: 0 }, { time: "17:00", value: 0 },
      { time: "18:00", value: 0 }, { time: "19:00", value: 0 }, { time: "20:00", value: 0 },
      { time: "21:00", value: 0 }, { time: "22:00", value: 0 }, { time: "23:00", value: 0 },
    ],
  },

  // 曼吉斯套州（Mangystau）— 液体流量（待复核）
  {
    id: "LF-CL-016",
    name: "阿克套港2号泊位装船流量计量装置",
    model: "Emerson Daniel 3418 10\"",
    manufacturer: "艾默生过程控制（Emerson）",
    certNumber: "KZ-MET-2025-01872",
    installLocation: "曼吉斯套州阿克套港2号泊位",
    company: "阿克套港储运股份公司",
    deviceType: "flow",
    status: "critical",
    currentReading: 0,
    readingUnit: "t/d",
    commStatus: "offline",
    lastCollectionTime: "2026-05-17 08:42",
    calibrationExpiry: "2026-05-20",
    heartbeatData: [
      { time: "00:00", value: 0.88 }, { time: "01:00", value: 0.85 }, { time: "02:00", value: 0.82 },
      { time: "03:00", value: 0.79 }, { time: "04:00", value: 0.76 }, { time: "05:00", value: 0.73 },
      { time: "06:00", value: 0.70 }, { time: "07:00", value: 0.65 }, { time: "08:00", value: 0.50 },
      { time: "09:00", value: 0 }, { time: "10:00", value: 0 }, { time: "11:00", value: 0 },
      { time: "12:00", value: 0 }, { time: "13:00", value: 0 }, { time: "14:00", value: 0 },
      { time: "15:00", value: 0 }, { time: "16:00", value: 0 }, { time: "17:00", value: 0 },
      { time: "18:00", value: 0 }, { time: "19:00", value: 0 }, { time: "20:00", value: 0 },
      { time: "21:00", value: 0 }, { time: "22:00", value: 0 }, { time: "23:00", value: 0 },
    ],
  },

  // 阿特劳州（Atyrau）— 天然气计量（degraded 观察）
  {
    id: "GM-FL-017",
    name: "田吉兹油田伴生气回注计量装置",
    model: "Krohne OPTISONIC 7300",
    manufacturer: "科隆（Krohne）",
    certNumber: "KZ-MET-2024-10567",
    installLocation: "阿特劳州田吉兹油田气体回注站",
    company: "田吉兹雪佛龙石油合资公司（TCO）",
    deviceType: "gas",
    status: "watch",
    currentReading: 445230.8,
    readingUnit: "kNm³",
    commStatus: "degraded",
    lastCollectionTime: "2026-05-18 15:14",
    calibrationExpiry: "2026-10-25",
    heartbeatData: [
      { time: "00:00", value: 0.90 }, { time: "01:00", value: 0.87 }, { time: "02:00", value: 0.84 },
      { time: "03:00", value: 0.81 }, { time: "04:00", value: 0.78 }, { time: "05:00", value: 0.75 },
      { time: "06:00", value: 0.72 }, { time: "07:00", value: 0.70 }, { time: "08:00", value: 0.73 },
      { time: "09:00", value: 0.71 }, { time: "10:00", value: 0.68 }, { time: "11:00", value: 0.65 },
      { time: "12:00", value: 0.62 }, { time: "13:00", value: 0.60 }, { time: "14:00", value: 0.63 },
      { time: "15:00", value: 0.61 }, { time: "16:00", value: 0.58 }, { time: "17:00", value: 0.55 },
      { time: "18:00", value: 0.57 }, { time: "19:00", value: 0.60 }, { time: "20:00", value: 0.63 },
      { time: "21:00", value: 0.66 }, { time: "22:00", value: 0.69 }, { time: "23:00", value: 0.72 },
    ],
  },

  // 卡拉干达州（Karaganda）— 热能计量
  {
    id: "HT-CL-018",
    name: "卡拉干达热电联产厂2号机组热能计量装置",
    model: "Kamstrup MULTICAL 803",
    manufacturer: "卡姆斯特鲁普（Kamstrup A/S）",
    certNumber: "KZ-MET-2025-04421",
    installLocation: "卡拉干达州卡拉干达市热电联产厂",
    company: "卡拉干达热力能源股份公司",
    deviceType: "heat",
    status: "normal",
    currentReading: 45230.8,
    readingUnit: "GJ",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:30",
    calibrationExpiry: "2028-03-20",
    heartbeatData: [
      { time: "00:00", value: 0.95 }, { time: "01:00", value: 0.93 }, { time: "02:00", value: 0.92 },
      { time: "03:00", value: 0.91 }, { time: "04:00", value: 0.92 }, { time: "05:00", value: 0.94 },
      { time: "06:00", value: 0.96 }, { time: "07:00", value: 0.98 }, { time: "08:00", value: 0.97 },
      { time: "09:00", value: 0.99 }, { time: "10:00", value: 0.98 }, { time: "11:00", value: 0.99 },
      { time: "12:00", value: 0.97 }, { time: "13:00", value: 0.98 }, { time: "14:00", value: 0.96 },
      { time: "15:00", value: 0.97 }, { time: "16:00", value: 0.95 }, { time: "17:00", value: 0.96 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },

  // 阿克莫拉州（Akmola）— 电能计量
  {
    id: "EM-MT-019",
    name: "阿塔苏管输枢纽35kV配电站电能计量装置",
    model: "XJ-EM6000 智能电能表",
    manufacturer: "许继电气股份有限公司",
    certNumber: "KZ-MET-2025-03780",
    installLocation: "卡拉干达州阿塔苏管输枢纽35kV配电站",
    company: "示意管输企业 F（Demo）",
    deviceType: "electricity",
    status: "normal",
    currentReading: 28120.6,
    readingUnit: "MWh",
    commStatus: "online",
    lastCollectionTime: "2026-05-18 15:28",
    calibrationExpiry: "2027-11-12",
    heartbeatData: [
      { time: "00:00", value: 0.93 }, { time: "01:00", value: 0.91 }, { time: "02:00", value: 0.90 },
      { time: "03:00", value: 0.89 }, { time: "04:00", value: 0.88 }, { time: "05:00", value: 0.90 },
      { time: "06:00", value: 0.92 }, { time: "07:00", value: 0.94 }, { time: "08:00", value: 0.96 },
      { time: "09:00", value: 0.98 }, { time: "10:00", value: 0.97 }, { time: "11:00", value: 0.99 },
      { time: "12:00", value: 0.98 }, { time: "13:00", value: 0.96 }, { time: "14:00", value: 0.97 },
      { time: "15:00", value: 0.98 }, { time: "16:00", value: 0.96 }, { time: "17:00", value: 0.95 },
      { time: "18:00", value: 0.94 }, { time: "19:00", value: 0.93 }, { time: "20:00", value: 0.92 },
      { time: "21:00", value: 0.94 }, { time: "22:00", value: 0.95 }, { time: "23:00", value: 0.93 },
    ],
  },

  // 西哈州（West Kazakhstan）— 液体流量（offline）
  {
    id: "LF-CL-020",
    name: "卡拉恰甘纳克凝析油外输计量装置",
    model: "Emerson Daniel 3418 6\"",
    manufacturer: "艾默生过程控制（Emerson）",
    certNumber: "KZ-MET-2024-09876",
    installLocation: "西哈州卡拉恰甘纳克凝析油外输站",
    company: "卡拉恰甘纳克石油运营公司（KPO）",
    deviceType: "flow",
    status: "critical",
    currentReading: 0,
    readingUnit: "t/d",
    commStatus: "offline",
    lastCollectionTime: "2026-05-18 12:05",
    calibrationExpiry: "2026-04-30",
    heartbeatData: [
      { time: "00:00", value: 0.86 }, { time: "01:00", value: 0.83 }, { time: "02:00", value: 0.80 },
      { time: "03:00", value: 0.78 }, { time: "04:00", value: 0.75 }, { time: "05:00", value: 0.72 },
      { time: "06:00", value: 0.68 }, { time: "07:00", value: 0.64 }, { time: "08:00", value: 0.60 },
      { time: "09:00", value: 0.55 }, { time: "10:00", value: 0.48 }, { time: "11:00", value: 0.40 },
      { time: "12:00", value: 0.25 }, { time: "13:00", value: 0 }, { time: "14:00", value: 0 },
      { time: "15:00", value: 0 }, { time: "16:00", value: 0 }, { time: "17:00", value: 0 },
      { time: "18:00", value: 0 }, { time: "19:00", value: 0 }, { time: "20:00", value: 0 },
      { time: "21:00", value: 0 }, { time: "22:00", value: 0 }, { time: "23:00", value: 0 },
    ],
  },
];

export const verificationRecords: VerificationRecord[] = [
  {
    id: "VR-001", deviceId: "EM-MT-001", date: "2024-03-14", type: "首次检定",
    result: "pass", certUrl: "KZ-MET-2024-08821",
    inspectorNotes: "电能计量精度符合IEC 62053-22 0.2S级要求，误差在允许范围内。",
  },
  {
    id: "VR-002", deviceId: "EM-MT-001", date: "2025-03-10", type: "年度周期检定",
    result: "pass", certUrl: "KZ-MET-2024-08821-R1",
    inspectorNotes: "复检结果稳定，互感器变比校验正常，装置运行状态良好。",
  },
  {
    id: "VR-003", deviceId: "EM-MT-001", date: "2026-03-08", type: "年度周期检定",
    result: "pass", certUrl: "KZ-MET-2024-08821-R2",
    inspectorNotes: "本年度检定通过，建议继续执行年度检定计划，下次检定日期2027-03。",
  },
  {
    id: "VR-004", deviceId: "EM-MT-002", date: "2024-11-08", type: "安装调试检定",
    result: "pass", certUrl: "KZ-MET-2024-09345",
    inspectorNotes: "装置安装后首次检定，所有参数符合设计规范，数据远传功能正常。",
  },
  {
    id: "VR-005", deviceId: "EM-MT-002", date: "2025-11-05", type: "年度周期检定",
    result: "conditional", certUrl: "KZ-MET-2024-09345-R1",
    inspectorNotes: "温湿度传感器有轻微漂移，建议在下次检定前更换传感器模块。",
  },
  {
    id: "VR-006", deviceId: "GM-FL-003", date: "2025-01-22", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2025-00128",
    inspectorNotes: "超声波流量计声道信号正常，流态识别无误，精度等级达到0.5级。",
  },
  {
    id: "VR-007", deviceId: "GM-FL-003", date: "2025-07-20", type: "期中核查",
    result: "pass", certUrl: "KZ-MET-2025-00128-M",
    inspectorNotes: "期中核查数据与主检定一致，建议维持现定检定周期。",
  },
  {
    id: "VR-008", deviceId: "GM-FL-004", date: "2024-09-30", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2024-10672",
    inspectorNotes: "大口径超声流量计检定合格，各项指标满足AGA-9报告要求。",
  },
  {
    id: "VR-009", deviceId: "GM-FL-004", date: "2025-03-18", type: "故障后复检",
    result: "conditional", certUrl: "KZ-MET-2024-10672-R1",
    inspectorNotes: "信号处理单元更换后复检，基本正常但通信模块偶有丢包，建议跟踪。",
  },
  {
    id: "VR-010", deviceId: "HT-CL-005", date: "2025-01-15", type: "安装调试检定",
    result: "pass", certUrl: "KZ-MET-2025-01452",
    inspectorNotes: "热能表安装及配对温度传感器经检定符合OIML R75标准，精度等级2级。",
  },
  {
    id: "VR-011", deviceId: "HT-CL-005", date: "2026-01-12", type: "年度周期检定",
    result: "pass", certUrl: "KZ-MET-2025-01452-R1",
    inspectorNotes: "年检通过，配对PT500温度传感器未出现偏差，积算仪运行正常。",
  },
  {
    id: "VR-012", deviceId: "HT-CL-006", date: "2024-04-02", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2024-07834",
    inspectorNotes: "首次周期检定合格，流量传感器和配对温度传感器均满足精度要求。",
  },
  {
    id: "VR-013", deviceId: "HT-CL-006", date: "2025-04-01", type: "年度周期检定",
    result: "conditional", certUrl: "KZ-MET-2024-07834-R1",
    inspectorNotes: "积分仪电池电压偏低，已建议更换。装置本身测量功能尚可，限期整改。",
  },
  {
    id: "VR-014", deviceId: "LF-CL-007", date: "2025-08-11", type: "安装调试检定",
    result: "pass", certUrl: "KZ-MET-2025-02215",
    inspectorNotes: "科里奥利质量流量计检定通过，密度测量和温度补偿功能验证合格。",
  },
  {
    id: "VR-015", deviceId: "LF-CL-007", date: "2026-02-19", type: "随机抽查",
    result: "pass", certUrl: "KZ-MET-2025-02215-S",
    inspectorNotes: "抽查结果满足要求，重复性良好，零点稳定性在允许范围内。",
  },
  {
    id: "VR-016", deviceId: "LF-CL-008", date: "2025-07-29", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2024-05691",
    inspectorNotes: "检定合格，但因输送介质含砂量偏高，建议缩短检定间隔至9个月。",
  },
  {
    id: "VR-017", deviceId: "LF-CL-008", date: "2026-04-15", type: "期中核查",
    result: "conditional", certUrl: "KZ-MET-2024-05691-M",
    inspectorNotes: "核查发现流量计零点漂移偏大，可能与管道振动有关，已加装减振支架。",
  },
  {
    id: "VR-018", deviceId: "EM-MT-009", date: "2025-12-03", type: "首次检定",
    result: "pass", certUrl: "KZ-MET-2025-03102",
    inspectorNotes: "中国制造电能计量装置符合哈国计量法规要求，精度0.2S级。",
  },
  {
    id: "VR-019", deviceId: "GM-FL-010", date: "2025-09-18", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2025-00984",
    inspectorNotes: "大流量气体超声流量计检定合格，流场校正因子已经更新。",
  },
  {
    id: "VR-020", deviceId: "GM-FL-010", date: "2026-03-25", type: "随机抽查",
    result: "pass", certUrl: "KZ-MET-2025-00984-S",
    inspectorNotes: "抽查数据稳定，建议保持当前12个月检定周期不变。",
  },
  // 第二批装置检定记录 (EM-MT-011 ~ LF-CL-020)
  {
    id: "VR-021", deviceId: "EM-MT-011", date: "2024-08-22", type: "安装调试检定",
    result: "pass", certUrl: "KZ-MET-2024-09912",
    inspectorNotes: "巴甫洛达尔炼厂主变电能计量装置安装调试检定通过，精度等级0.2S。",
  },
  {
    id: "VR-022", deviceId: "EM-MT-011", date: "2025-08-18", type: "年度周期检定",
    result: "conditional", certUrl: "KZ-MET-2024-09912-R1",
    inspectorNotes: "通信模块存在间歇性丢包，建议在下次维护窗口更换通信卡。计量精度正常。",
  },
  {
    id: "VR-023", deviceId: "LF-CL-012", date: "2025-05-10", type: "首次检定",
    result: "pass", certUrl: "KZ-MET-2025-03188",
    inspectorNotes: "奇姆肯特成品油外输流量计首次检定合格，重复性误差0.03%，优于0.1级标准。",
  },
  {
    id: "VR-024", deviceId: "GM-FL-013", date: "2024-09-15", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2024-08834",
    inspectorNotes: "伴生气计量检定合格，气体组分补偿模型已经更新至最新气源数据。",
  },
  {
    id: "VR-025", deviceId: "EM-MT-014", date: "2025-06-30", type: "首次检定",
    result: "pass", certUrl: "KZ-MET-2025-02665",
    inspectorNotes: "库姆科尔油田中心变电站电能计量装置首检合格，远传功能正常。",
  },
  {
    id: "VR-026", deviceId: "HT-CL-015", date: "2024-08-10", type: "安装调试检定",
    result: "pass", certUrl: "KZ-MET-2024-08112",
    inspectorNotes: "能源部总部大楼热能表安装检定合格，配对温度传感器经冰点测试满足精度要求。",
  },
  {
    id: "VR-027", deviceId: "HT-CL-015", date: "2025-08-05", type: "年度周期检定",
    result: "conditional", certUrl: "KZ-MET-2024-08112-R1",
    inspectorNotes: "流量传感器有轻微结垢迹象，已建议清洗。积算仪和配对温度传感器正常。",
  },
  {
    id: "VR-028", deviceId: "LF-CL-016", date: "2025-05-20", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2025-01872",
    inspectorNotes: "阿克套港2号泊位装船流量计检定合格，建议下次检定日期2026-05-20。",
  },
  {
    id: "VR-029", deviceId: "GM-FL-017", date: "2024-10-25", type: "周期检定",
    result: "pass", certUrl: "KZ-MET-2024-10567",
    inspectorNotes: "田吉兹回注气计量装置检定合格，声道信号正常，精度等级0.5级。",
  },
  {
    id: "VR-030", deviceId: "LF-CL-020", date: "2025-10-15", type: "年度周期检定",
    result: "conditional", certUrl: "KZ-MET-2024-09876-R1",
    inspectorNotes: "凝析油流量计存在零点漂移趋势，建议在下次停产窗口进行零点标定。",
  },
];

export const deviceTypeLabels: Record<MeteringDeviceType, string> = {
  electricity: "电能计量",
  gas: "天然气计量",
  heat: "热能计量",
  flow: "液体流量计量",
};

export const deviceTypeUnits: Record<MeteringDeviceType, string> = {
  electricity: "MWh",
  gas: "kNm³",
  heat: "GJ",
  flow: "t/d",
};

// ---- Helper: filter devices by status ----
export function getDevicesByStatus(
  devices: MeteringDevice[],
  status: MeteringDevice["status"],
): MeteringDevice[] {
  return devices.filter((d) => d.status === status);
}

// ---- Helper: filter devices by type ----
export function getDevicesByType(
  devices: MeteringDevice[],
  deviceType: MeteringDeviceType,
): MeteringDevice[] {
  return devices.filter((d) => d.deviceType === deviceType);
}

// ---- Helper: filter devices by comm status ----
export function getDevicesByCommStatus(
  devices: MeteringDevice[],
  commStatus: MeteringCommStatus,
): MeteringDevice[] {
  return devices.filter((d) => d.commStatus === commStatus);
}

// ---- Helper: sort devices (anomalies first, then by status priority) ----
export function sortDevicesByPriority(
  devices: MeteringDevice[],
): MeteringDevice[] {
  const statusPriority: Record<MeteringDevice["status"], number> = {
    critical: 0,
    important: 1,
    watch: 2,
    normal: 3,
  };
  return [...devices].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status],
  );
}

// ---- Helper: get verification records for a specific device ----
export function getVerificationRecordsForDevice(
  deviceId: string,
  records: VerificationRecord[],
): VerificationRecord[] {
  return records.filter((r) => r.deviceId === deviceId);
}

// ---- Helper: count devices by status for summary ----
export function countDevicesByStatus(
  devices: MeteringDevice[],
): Record<MeteringDevice["status"], number> {
  return {
    normal: devices.filter((d) => d.status === "normal").length,
    watch: devices.filter((d) => d.status === "watch").length,
    important: devices.filter((d) => d.status === "important").length,
    critical: devices.filter((d) => d.status === "critical").length,
  };
}
