import React from "react";
import { describe, it, expect } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App menu behavior", () => {
  it("closes menu when Escape key pressed", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    act(() => {
      createRoot(container).render(<App />);
    });

    const toggle = container.querySelector("nav button")!;
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("Gameplay Options");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(container.textContent).not.toContain("Gameplay Options");
  });
});
