import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { describe, it, expect, vi } from 'vitest';
import useCountdown from './useCountdown';

describe('useCountdown', () => {
  let container: HTMLDivElement;
  let root: Root | undefined;
  let hookResult: ReturnType<typeof useCountdown>;

  function TestComponent({ initial, onComplete }: { initial: number; onComplete?: () => void }) {
    hookResult = useCountdown(initial, { onComplete });
    return null;
  }

  afterEach(() => {
    if (root) root.unmount();
    container.remove();
  });

  it('counts down each second and calls onComplete', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root!.render(<TestComponent initial={2} onComplete={onComplete} />);
    });

    expect(hookResult.timeLeft).toBe(2);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hookResult.timeLeft).toBe(1);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hookResult.timeLeft).toBe(0);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('resets and restarts correctly', () => {
    vi.useFakeTimers();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root!.render(<TestComponent initial={5} />);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hookResult.timeLeft).toBe(3);

    act(() => {
      hookResult.reset();
    });
    expect(hookResult.timeLeft).toBe(5);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hookResult.timeLeft).toBe(5);

    act(() => {
      hookResult.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hookResult.timeLeft).toBe(4);
    vi.useRealTimers();
  });
});
