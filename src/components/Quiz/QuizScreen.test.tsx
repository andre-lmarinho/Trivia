import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import QuizScreen from './QuizScreen';
import type { OpenTDBQuestion } from '../../types';

const sampleQuestions: OpenTDBQuestion[] = [
  {
    category: 'General',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Question 1',
    correct_answer: 'Correct',
    incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
  },
];

let container: HTMLDivElement;
let root: Root | undefined;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root) root.unmount();
  container.remove();
});

describe('QuizScreen', () => {
  it('countdown decreases each second', () => {
    vi.useFakeTimers();
    act(() => {
      root!.render(
        <QuizScreen questions={sampleQuestions} onAnswered={vi.fn()} onComplete={vi.fn()} />
      );
    });
    expect(container.textContent).toContain('15');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(container.textContent).toContain('14');
    vi.useRealTimers();
  });

  it('triggers onAnswered when option selected', () => {
    const onAnswered = vi.fn();
    act(() => {
      root!.render(
        <QuizScreen questions={sampleQuestions} onAnswered={onAnswered} onComplete={vi.fn()} />
      );
    });

    const option = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === 'Correct'
    );
    expect(option).toBeTruthy();
    option &&
      act(() => {
        option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

    expect(onAnswered).toHaveBeenCalledWith('Question 1', true);
  });

  it('calls onComplete after feedback time elapses', () => {
    const onComplete = vi.fn();
    vi.useFakeTimers();
    act(() => {
      root!.render(
        <QuizScreen questions={sampleQuestions} onAnswered={vi.fn()} onComplete={onComplete} />
      );
    });

    const option = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === 'Correct'
    );
    option &&
      act(() => {
        option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    const finishBtn = container.querySelector('.absolute button');
    expect(finishBtn).toBeTruthy();
    finishBtn &&
      act(() => {
        finishBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
