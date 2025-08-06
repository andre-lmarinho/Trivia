import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

// Preserve native fetch so it can be restored after tests
const originalFetch = global.fetch;

let container: HTMLDivElement;
let root: Root | undefined;
let fetchMock: ReturnType<typeof vi.fn>;

afterEach(() => {
  if (root) {
    root.unmount();
  }
  container.remove();
  global.fetch = originalFetch;
});

beforeEach(() => {
  // Provide canned responses for both API endpoints
  fetchMock = vi.fn((input: RequestInfo | URL) => {
    if (typeof input === 'string' && input.includes('api_category')) {
      // Categories endpoint
      return Promise.resolve({ json: () => Promise.resolve({ trivia_categories: [] }) });
    }
    // Questions endpoint
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            {
              category: 'General',
              type: 'multiple',
              difficulty: 'easy',
              question: 'Q1',
              correct_answer: 'A',
              incorrect_answers: ['B', 'C', 'D'],
            },
          ],
        }),
    });
  });
  global.fetch = fetchMock as unknown as typeof fetch;
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

  it('restores stage after closing menu', async () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      root = createRoot(container);
      root.render(<App />);
    });

    const startBtn = container.querySelector('.start-button')!;
    await act(async () => {
      startBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const toggle = container.querySelector('nav button')!;
    await act(async () => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Gameplay Options');

    await act(async () => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Q1');
  });
});
