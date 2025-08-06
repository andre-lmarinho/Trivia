import React, { useEffect, useRef, useState } from 'react';
import type { OpenTDBQuestion } from '../../types';
import Question from './Question';
import ProgressBar from '../Layouts/ProgressBar';
import { FaForward } from 'react-icons/fa';
import useCountdown from '../../hooks/useCountdown';

interface Props {
  questions: OpenTDBQuestion[];
  onAnswered: (id: string, correct: boolean) => void;
  onComplete: () => void;
}

export default function QuizScreen({ questions, onAnswered, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = questions[currentIndex];
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    timeLeft,
    start: startQuestionTimer,
    reset: resetQuestionTimer,
  } = useCountdown(15, {
    onComplete: () => handleAnswer(''),
  });

  const {
    timeLeft: feedbackTime,
    start: startFeedbackTimer,
    reset: resetFeedbackTimer,
  } = useCountdown(4, {
    autoStart: false,
    onComplete: () => {
      if (currentIndex + 1 < questions.length) {
        feedbackTimeout.current = setTimeout(() => {
          goToNextQuestion();
        }, 1000);
      }
    },
  });

  useEffect(
    () => () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    },
    []
  );

  function handleAnswer(answer: string) {
    if (isAnswered) return;
    const correct = answer === question.correct_answer;
    onAnswered(question.question, correct);
    setIsAnswered(true);
    setSelectedAnswer(answer);
    resetQuestionTimer();
    startFeedbackTimer();
  }

  function goToNextQuestion() {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
      feedbackTimeout.current = null;
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      resetFeedbackTimer();
      startQuestionTimer();
    } else {
      onComplete();
    }
  }

  return (
    <section className="content-section">
      <ProgressBar current={currentIndex} total={questions.length} />

      <Question
        key={question.question}
        question={question}
        onAnswered={handleAnswer}
        showAnswer={isAnswered}
        selectedAnswer={selectedAnswer}
      />

      {/* Bottom-right corner: Countdown or Skip/Finish button */}
      <div className="absolute bottom-4 right-4">
        {!isAnswered ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--border-color)] text-lg text-gray-700">
            {timeLeft}
          </div>
        ) : (
          <button
            onClick={() => {
              if (currentIndex + 1 < questions.length) {
                goToNextQuestion();
              } else {
                onComplete(); // Finish quiz manually on last question
              }
            }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--border-color)] text-xl text-white opacity-80 transition hover:scale-110"
          >
            <svg className="absolute h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-[var(--border-color)]"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="text-[var(--accent-color)]"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset="0"
                style={{
                  strokeDashoffset: `${(feedbackTime / 4) * 100}`,
                  transition: 'stroke-dashoffset 1s linear',
                }}
              />
            </svg>
            <FaForward className="z-10 text-[var(--title-color)]" />
          </button>
        )}
      </div>
    </section>
  );
}
