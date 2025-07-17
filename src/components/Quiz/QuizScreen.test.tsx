import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('QuizScreen', () => {
  it('countdown decreases each second', () => {
    vi.useFakeTimers();
    render(<QuizScreen questions={sampleQuestions} onAnswered={vi.fn()} onComplete={vi.fn()} />);

    expect(screen.getByText('15')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('14')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('triggers onAnswered when option selected', async () => {
    const onAnswered = vi.fn();

    render(<QuizScreen questions={sampleQuestions} onAnswered={onAnswered} onComplete={vi.fn()} />);

    const option = screen.getByRole('button', { name: 'Correct' });
    fireEvent.click(option);

    expect(onAnswered).toHaveBeenCalledWith('Question 1', true);
  });

  it('calls onComplete after feedback time elapses', async () => {
    const onComplete = vi.fn();
    vi.useFakeTimers();

    const { container } = render(
      <QuizScreen questions={sampleQuestions} onAnswered={vi.fn()} onComplete={onComplete} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Correct' }));

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    const finishBtn = container.querySelector('.absolute button');
    expect(finishBtn).toBeTruthy();
    finishBtn && fireEvent.click(finishBtn);

    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
