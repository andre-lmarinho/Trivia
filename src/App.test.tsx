import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App menu behavior', () => {
  it.skip('closes menu when Escape key pressed', () => {
    const { container } = render(<App />);
    const toggle = document.querySelector('nav button') as HTMLButtonElement;
    fireEvent.click(toggle);

    expect(container.textContent).toContain('Gameplay Options');

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(container.textContent).not.toContain('Gameplay Options');
  });
});
