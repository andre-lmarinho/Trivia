import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

vi.mock('./hooks/useQuestions', () => ({
  default: () => ({ questions: [], loading: false, error: false }),
}));

afterEach(() => {
  cleanup();
});

describe('App menu behavior', () => {
  it('closes menu when Escape key pressed', () => {
    const { getByLabelText, queryByText } = render(<App />);

    const toggle = getByLabelText('Open menu');
    fireEvent.click(toggle);

    expect(queryByText('Gameplay Options')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(queryByText('Gameplay Options')).not.toBeInTheDocument();
  });
});
