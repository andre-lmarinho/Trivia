import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock react hooks so we can invoke useQuestions without a React environment
vi.mock('react', () => ({
  useState: <T>(init: T): [T, (val: T) => void] => [init, vi.fn()],
  useEffect: (fn: () => void) => fn(),
}));

// Dynamically import after mocking
const useQuestionsImport = () => import('./useQuestions').then((m) => m.default);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useQuestions amount clamping', () => {
  it('clamps amount below 1 to 1', async () => {
    const useQuestions = await useQuestionsImport();

    const fetchMock = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ results: [] }) })
    );
    global.fetch = fetchMock as unknown as (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => Promise<Response>;

    useQuestions(0);

    expect(fetchMock).toHaveBeenCalled();
    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.searchParams.get('amount')).toBe('1');
  });

  it('clamps amount above 50 to 50', async () => {
    const useQuestions = await useQuestionsImport();

    const fetchMock = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ results: [] }) })
    );
    global.fetch = fetchMock as unknown as (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => Promise<Response>;

    useQuestions(100);

    expect(fetchMock).toHaveBeenCalled();
    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.searchParams.get('amount')).toBe('50');
  });
});
