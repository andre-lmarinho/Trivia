import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

let container: HTMLDivElement;
let root: Root;

afterEach(() => {
  root.unmount();
  container.remove();
});

beforeEach(() => {
  // Provide canned responses for both API endpoints
  fetchMock = vi.fn((input: RequestInfo | URL) => {
    if (typeof input === 'string' && input.includes('api_category')) {
      // Categories endpoint
      return Promise.resolve({ json: () => Promise.resolve({ trivia_categories: [] }) });
    }
    // Questions endpoint
    return Promise.resolve({ json: () => Promise.resolve({ results: [] }) });
  });
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  // Restore native fetch and clean DOM
  global.fetch = originalFetch;
  root.unmount();
  container.remove();
});

describe('App menu behavior', () => {
  it('closes menu when Escape key pressed', async () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      root = createRoot(container);
      root.render(<App />);
    });

    const toggle = container.querySelector('nav button')!;
    await act(async () => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Gameplay Options');

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(container.textContent).not.toContain('Gameplay Options');
  });
});
