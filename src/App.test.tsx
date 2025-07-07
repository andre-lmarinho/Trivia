import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

let container: HTMLDivElement;
let root: Root;

afterEach(() => {
  root.unmount();
  container.remove();
  vi.restoreAllMocks();
});

describe('App menu behavior', () => {
  it('closes menu when Escape key pressed', async () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ results: [] }),
    } as Response);

    await act(async () => {
      root = createRoot(container);
      root.render(<App />);
    });

    await act(async () => {});

    const toggle = container.querySelector('nav button')!;
    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });


    expect(container.textContent).toContain('Gameplay Options');

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(container.textContent).not.toContain('Gameplay Options');
  });
});
