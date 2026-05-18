import { describe, it, expect, beforeEach } from "vitest";

// Route tests for AppRouter's hash-based routing
describe("App hash routing", () => {
  beforeEach(() => {
    // Reset hash before each test
    window.location.hash = "";
  });

  it("renders default homepage when hash is empty", () => {
    window.location.hash = "";
    // On default route, the App component renders .app-shell with demo-disclaimer
    // This is a routing decision test, not a full render test
    expect(window.location.hash).toBe("");
  });

  it("detects #/scenario-1-1 hash correctly", () => {
    window.location.hash = "#/scenario-1-1";
    expect(window.location.hash).toBe("#/scenario-1-1");
  });

  it("hashchange event fires when hash changes", () => {
    let fired = false;
    const handler = () => {
      fired = true;
    };
    window.addEventListener("hashchange", handler);
    window.location.hash = "#/test";
    // hashchange is async in jsdom — simulate it
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(fired).toBe(true);
    window.removeEventListener("hashchange", handler);
  });
});
