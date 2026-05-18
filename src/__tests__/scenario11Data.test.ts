import { describe, it, expect } from "vitest";
import {
  scenario11Nodes,
  scenario11Edges,
  scenario11Events,
  scenario11Timeline,
  scenario11Kpis,
} from "../data/scenario11Data";

const VALID_STATUSES = ["normal", "watch", "important", "critical"] as const;

// ---- Node integrity ----
describe("scenario11Nodes", () => {
  it("has a national layer node set", () => {
    expect(scenario11Nodes.length).toBeGreaterThanOrEqual(15);
  });

  it("all nodes have unique IDs", () => {
    const ids = scenario11Nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all nodes have required fields", () => {
    for (const node of scenario11Nodes) {
      expect(node.id).toBeTruthy();
      expect(node.name).toBeTruthy();
      expect(node.type).toBeTruthy();
      expect(node.status).toBeTruthy();
      expect(VALID_STATUSES).toContain(node.status);
      expect(Array.isArray(node.coordinates)).toBe(true);
      expect(node.coordinates).toHaveLength(2);
      expect(typeof node.coordinates[0]).toBe("number");
      expect(typeof node.coordinates[1]).toBe("number");
      expect(node.complianceScore).toBeGreaterThanOrEqual(0);
      expect(node.complianceScore).toBeLessThanOrEqual(100);
      expect(node.flowRate).toBeGreaterThanOrEqual(0);
    }
  });

  it("has at least one anomaly node (important or critical)", () => {
    const anomalies = scenario11Nodes.filter(
      (n) => n.status === "important" || n.status === "critical",
    );
    expect(anomalies.length).toBeGreaterThan(0);
  });

  it("covers region, refinery, midstream/export, and regulatory nodes", () => {
    const ids = new Set(scenario11Nodes.map((n) => n.id));
    expect(ids.has("reg-atyrau-upstream")).toBe(true);
    expect(ids.has("reg-mangystau-caspian")).toBe(true);
    expect(ids.has("reg-aktobe-oil-gas")).toBe(true);
    expect(ids.has("reg-qyzylorda-oil")).toBe(true);
    expect(ids.has("ref-pavlodar")).toBe(true);
    expect(ids.has("ref-shymkent")).toBe(true);
    expect(ids.has("hub-alashankou-border")).toBe(true);
    expect(ids.has("nat-ministry")).toBe(true);
  });
});

// ---- Edge referential integrity ----
describe("scenario11Edges", () => {
  it("all edge from/to IDs reference existing nodes", () => {
    const nodeIds = new Set(scenario11Nodes.map((n) => n.id));
    for (const edge of scenario11Edges) {
      expect(nodeIds.has(edge.from)).toBe(true);
      expect(nodeIds.has(edge.to)).toBe(true);
    }
  });

  it("all edges have required fields", () => {
    for (const edge of scenario11Edges) {
      expect(edge.id).toBeTruthy();
      expect(edge.type).toBeTruthy();
      expect(VALID_STATUSES).toContain(edge.status);
    }
  });
});

// ---- Event integrity ----
describe("scenario11Events", () => {
  it("has exactly 3 events", () => {
    expect(scenario11Events).toHaveLength(3);
  });

  it("all event nodeIds reference existing nodes", () => {
    const nodeIds = new Set(scenario11Nodes.map((n) => n.id));
    for (const event of scenario11Events) {
      expect(nodeIds.has(event.nodeId)).toBe(true);
    }
  });

  it("all events have required fields", () => {
    for (const event of scenario11Events) {
      expect(event.id).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.aiSummary).toBeTruthy();
      expect(event.suggestedAction).toBeTruthy();
      expect(VALID_STATUSES).toContain(event.severity);
      expect(event.confidence).toBeGreaterThan(0);
      expect(event.confidence).toBeLessThanOrEqual(1);
    }
  });

  it("has at least one important/critical event", () => {
    const urgent = scenario11Events.filter(
      (e) => e.severity === "important" || e.severity === "critical",
    );
    expect(urgent.length).toBeGreaterThan(0);
  });
});

// ---- Timeline integrity ----
describe("scenario11Timeline", () => {
  it("has exactly 24 entries (one per hour)", () => {
    expect(scenario11Timeline).toHaveLength(24);
  });

  it("all entries have valid hour format and count", () => {
    for (const point of scenario11Timeline) {
      expect(point.hour).toMatch(/^\d{2}:\d{2}$/);
      expect(point.count).toBeGreaterThanOrEqual(0);
      expect(VALID_STATUSES).toContain(point.status);
    }
  });
});

// ---- KPI integrity ----
describe("scenario11Kpis", () => {
  it("has exactly 5 KPIs", () => {
    expect(scenario11Kpis).toHaveLength(5);
  });

  it("all KPIs have required fields", () => {
    for (const kpi of scenario11Kpis) {
      expect(kpi.label).toBeTruthy();
      expect(kpi.value).toBeTruthy();
      expect(kpi.subtitle).toBeTruthy();
    }
  });
});
