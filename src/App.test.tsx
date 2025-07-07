import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

// Avoid network calls by mocking the questions hook
vi.mock('./hooks/useQuestions', () => ({
  default: () => ({ questions: [], loading: false, error: false }),
}));

let container: HTMLDivElement;
let root: Root;

afterEach(() => {
  root.unmount();
  container.remove();
});

describe('App menu behavior', () => {
  it('closes menu when Escape key pressed', () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      root = createRoot(container);
      root.render(<App />);
    });

    const toggle = container.querySelector('nav button')!;
    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Gameplay Options');
