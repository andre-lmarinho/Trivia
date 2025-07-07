import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Avoid network calls by mocking the questions hook
vi.mock('./hooks/useQuestions', () => ({
  default: () => ({ questions: [], loading: false, error: false }),
}));

// Minimal userEvent implementation for this environment
const userEvent = {
  async click(element: Element) {
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.click(element);
  },
  async keyboard(text: string) {
    const { fireEvent } = await import('@testing-library/react');
    if (text === '{Escape}') {
      fireEvent.keyDown(window, { key: 'Escape' });
    }
  },
};

describe('App menu behavior', () => {
  it('closes menu when Escape key pressed', async () => {
    render(<App />);

    const toggle = await screen.findByRole('button', { name: /open menu/i });
    await userEvent.click(toggle);
    expect(screen.getByText('Gameplay Options')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Gameplay Options')).not.toBeInTheDocument();
  });
});