import React, { useMemo } from 'react';
import type { OpenTDBQuestion } from '../../types';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Props {
  question: OpenTDBQuestion;
  onAnswered: (answer: string) => void;
  showAnswer: boolean;
  selectedAnswer: string | null;
}

export default function Question({ question, onAnswered, showAnswer, selectedAnswer }: Props) {
  const decode = (s: string) => decodeURIComponent(s);

  const choices = useMemo(() => {
    const all = [...question.incorrect_answers.map(decode), decode(question.correct_answer)];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [question]);

  return (
    <>
      <div>
        <h2>{decode(question.category)}</h2>
        <h3>{decode(question.question)}</h3>
      </div>

      <div className="answer-container">
        {choices.map((c) => {
          const isSelected = selectedAnswer === c;
          const isCorrectAnswer = c === decode(question.correct_answer);

          return (
            <button
              key={c}
              onClick={() => onAnswered(c)}
              disabled={showAnswer}
              className={`option-button mb-2 flex w-full items-center justify-between rounded border p-4 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? 'bg-[var(--hover-color)]' : ''} ${!showAnswer ? 'hover:bg-[var(--hover-color)]' : ''}`}
            >
              <span>{c}</span>

              {showAnswer && (isCorrectAnswer || isSelected) && (
                <div className="ml-2 rounded border border-[var(--border-color)] bg-[var(--content-bg)] p-1">
                  {isCorrectAnswer ? (
                    <FaCheck style={{ color: 'var(--fb-correct)' }} />
                  ) : (
                    <FaTimes style={{ color: 'var(--fb-incorrect)' }} />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
