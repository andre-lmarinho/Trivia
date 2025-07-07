import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

// Mock fetch to provide questions and categories without hitting the network
const originalFetch = global.fetch;
let fetchMock: ReturnType<typeof vi.fn>;

let container: HTMLDivElement;
let root: Root;

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

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(container.textContent).not.toContain('Gameplay Options');
  });
});
