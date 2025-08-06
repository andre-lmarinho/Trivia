import { describe, it, expect, vi, beforeEach } from 'vitest';

let hookState: unknown[] = [];
let hookIndex = 0;
let effectDeps: unknown[][] = [];
let effectIndex = 0;

vi.mock('react', () => ({
  useState: <T>(initial: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void] => {
    const index = hookIndex++;
    if (hookState[index] === undefined)
      hookState[index] = typeof initial === 'function' ? (initial as () => T)() : initial;
    const setter = (val: T | ((prev: T) => T)) => {
      hookState[index] =
        typeof val === 'function' ? (val as (prev: T) => T)(hookState[index]) : val;
    };
    return [hookState[index] as T, setter];
  },
  useEffect: (fn: () => void, deps?: unknown[]) => {
    const index = effectIndex++;
    const prev = effectDeps[index];
    const changed =
      !deps || !prev || deps.length !== prev.length || deps.some((d, i) => d !== prev[i]);
    if (changed) {
      effectDeps[index] = deps || [];
      fn();
    }
  },
}));

const hookImport = () => import('./usePersistedSettings').then((m) => m.default);
let usePersistedSettings: Awaited<ReturnType<typeof hookImport>>;

function renderHook() {
  hookIndex = 0;
  effectIndex = 0;
  return usePersistedSettings();
}

beforeEach(async () => {
  vi.clearAllMocks();
  hookState = [];
  hookIndex = 0;
  effectDeps = [];
  effectIndex = 0;
  localStorage.clear();
  usePersistedSettings = await hookImport();
});

describe('usePersistedSettings', () => {
  it('loads settings from localStorage', () => {
    localStorage.setItem(
      'settings',
      JSON.stringify({ theme: 'night', amount: 5, difficulty: 'easy', category: 3 })
    );

    const { settings } = renderHook();

    expect(settings.theme).toBe('night');
    expect(settings.amount).toBe(5);
    expect(settings.difficulty).toBe('easy');
    expect(settings.category).toBe(3);
  });

  it('saves settings to localStorage', () => {
    let hook = renderHook();
    hook.selectTheme('night');
    hook.saveSettings({ amount: 5, category: 3, difficulty: 'easy' });
    hook = renderHook();
    hook = renderHook();

    const saved = JSON.parse(localStorage.getItem('settings') || '{}');
    expect(saved.theme).toBe('night');
    expect(saved.amount).toBe(5);
    expect(saved.category).toBe(3);
    expect(saved.difficulty).toBe('easy');
  });
});
