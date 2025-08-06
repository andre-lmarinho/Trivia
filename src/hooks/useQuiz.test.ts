import { describe, it, expect, vi, beforeEach } from 'vitest';

// Reusable state storage for mocked React hooks
let hookState: unknown[] = [];
let hookIndex = 0;
let effectDeps: unknown[][] = [];
let effectIndex = 0;

// Mock basic React hooks
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

// Mock useQuestions to supply fixed questions
const sampleQuestions = [
  {
    category: 'general',
    type: 'multiple',
    difficulty: 'easy',
    question: 'q1',
    correct_answer: 'a1',
    incorrect_answers: [],
  },
  {
    category: 'general',
    type: 'multiple',
    difficulty: 'easy',
    question: 'q2',
    correct_answer: 'a2',
    incorrect_answers: [],
  },
];

vi.mock('./useQuestions', () => ({
  default: vi.fn(() => ({ questions: sampleQuestions, loading: false, error: false })),
}));

const useQuizImport = () => import('./useQuiz').then((m) => m.default);

let useQuiz: Awaited<ReturnType<typeof useQuizImport>>;

function renderQuiz() {
  hookIndex = 0; // reset pointer for each render
  effectIndex = 0;
  return useQuiz();
}

beforeEach(async () => {
  vi.clearAllMocks();
  hookState = [];
  hookIndex = 0;
  effectDeps = [];
  effectIndex = 0;
  localStorage.clear();
  useQuiz = await useQuizImport();
});

describe('useQuiz', () => {
  it('toggles menu open and closed', () => {
    let quiz = renderQuiz();
    expect(quiz.stage).toBe('start');

    quiz.toggleMenu();
    quiz = renderQuiz();
    expect(quiz.stage).toBe('menu');

    quiz.toggleMenu();
    quiz = renderQuiz();
    quiz = renderQuiz();
    expect(quiz.stage).toBe('start');
  });

  it('progresses from start to quiz to result', () => {
    let quiz = renderQuiz();
    quiz.startQuiz();
    quiz = renderQuiz();
    expect(quiz.stage).toBe('quiz');

    quiz.answerQuestion('q1', true);
    quiz = renderQuiz();
    expect(quiz.stage).toBe('quiz');

    quiz.answerQuestion('q2', true);
    quiz = renderQuiz();
    quiz = renderQuiz();
    expect(quiz.stage).toBe('result');
  });

  it('saves settings to localStorage', () => {
    let quiz = renderQuiz();
    quiz.saveSettings({ amount: 5, category: 3, difficulty: 'easy' });
    quiz = renderQuiz();
    quiz = renderQuiz();

    const saved = JSON.parse(localStorage.getItem('settings') || '{}');
    expect(saved.category).toBe(3);
    expect(saved.amount).toBe(5);
    expect(saved.difficulty).toBe('easy');
  });
});
