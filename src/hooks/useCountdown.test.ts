import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useCountdown from './useCountdown';

describe('useCountdown', () => {
  it('counts down each second and calls onComplete', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();

    const { result } = renderHook(() => useCountdown(2, { onComplete }));

    expect(result.current.timeLeft).toBe(2);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(0);
    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('resets and restarts correctly', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCountdown(5));

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.timeLeft).toBe(3);

    act(() => {
      result.current.reset();
    });
    expect(result.current.timeLeft).toBe(5);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(5);

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(4);
    vi.useRealTimers();
  });
});
