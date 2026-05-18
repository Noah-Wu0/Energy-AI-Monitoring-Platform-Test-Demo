import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Scenario11Page } from "../components/Scenario11Page";

describe("Scenario11Page", () => {
  it("renders header with Ministry name", () => {
    render(<Scenario11Page />);
    expect(screen.getByText("哈萨克斯坦共和国能源部")).toBeTruthy();
  });

  it("renders Demo tag in header", () => {
    render(<Scenario11Page />);
    expect(screen.getByText("AI 监管闭环系统 (Demo)")).toBeTruthy();
  });

  it("renders KPI bar with all 5 metrics", () => {
    render(<Scenario11Page />);
    // KPI labels appear in the KPI bar — getAllByText since "异常数" also appears elsewhere
    expect(screen.getByText("在线设备数")).toBeTruthy();
    expect(screen.getByText("离线设备数")).toBeTruthy();
    expect(screen.getAllByText("异常数").length).toBeGreaterThan(0);
    expect(screen.getAllByText("数据延迟").length).toBeGreaterThan(0);
    expect(screen.getByText("最近刷新")).toBeTruthy();
  });

  it("renders demo disclaimer", () => {
    render(<Scenario11Page />);
    expect(
      screen.getByText(/演示口径：模拟数据/),
    ).toBeTruthy();
  });

  it("renders event stream with 3 events", () => {
    render(<Scenario11Page />);
    // Event titles appear both in the event cards and the AI panel
    expect(
      screen.getAllByText("曼吉斯套州港储运链路流量偏离").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("西哈州凝析气工业区数据心跳延迟").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("奇姆肯特炼厂进料波动恢复正常").length,
    ).toBeGreaterThan(0);
  });

  it("renders energy type tabs", () => {
    render(<Scenario11Page />);
    expect(screen.getByText("油气")).toBeTruthy();
    expect(screen.getByText("天然气")).toBeTruthy();
    expect(screen.getByText("电力")).toBeTruthy();
    expect(screen.getByText("供暖")).toBeTruthy();
  });

  it("renders oil nodes visible by default (oil tab active)", () => {
    render(<Scenario11Page />);
    // Default energy type is "oil" — oil/gas/port/regulatory nodes visible.
    expect(screen.getAllByText("阿特劳油气工业带").length).toBeGreaterThan(0);
    expect(screen.getAllByText("曼吉斯套里海通道").length).toBeGreaterThan(0);
    expect(screen.getAllByText("阿克托别油气工业区").length).toBeGreaterThan(0);
    expect(screen.getAllByText("克孜勒奥尔达油区").length).toBeGreaterThan(0);
    expect(screen.getAllByText("巴甫洛达尔炼厂").length).toBeGreaterThan(0);
    expect(screen.getAllByText("阿克套-库雷克港储运").length).toBeGreaterThan(0);
  });

  it("includes gas nodes in default oil-gas tab", () => {
    render(<Scenario11Page />);
    expect(screen.getAllByText("西哈州凝析气工业区").length).toBeGreaterThan(0);
    expect(screen.getAllByText("阿特劳石化集群").length).toBeGreaterThan(0);
  });
});
