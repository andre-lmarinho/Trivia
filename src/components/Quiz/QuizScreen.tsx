import React, { useState, useEffect } from "react";
import type { OpenTDBQuestion } from "../../types";
import Question from "./Question";
import ProgressBar from "../Layouts/ProgressBar";
import { FaForward } from "react-icons/fa";

interface Props {
  questions: OpenTDBQuestion[];
  onAnswered: (id: string, correct: boolean) => void;
  onComplete: () => void;
}

export default function QuizScreen({
  questions,
  onAnswered,
  onComplete,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [feedbackTime, setFeedbackTime] = useState(4);

  const question = questions[currentIndex];

  /**
   * Countdown timer to answer the question
   */
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft === 0) {
      handleAnswer(""); // Time expired
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, currentIndex]);

  /**
   * Feedback timer after answering
   */
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => setFeedbackTime((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [feedbackTime, isAnswered]);

  /**
   * Automatically move to the next question after feedback time,
   * but if it's the last question, wait for manual click
   */
  useEffect(() => {
    if (feedbackTime === 0 && isAnswered) {
      if (currentIndex + 1 < questions.length) {
        goToNextQuestion();
      }
      // If it's the last question, wait for manual click
    }
  }, [feedbackTime, isAnswered, currentIndex, questions.length]);

  /**
   * Handle user's answer
   */
  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const correct = answer === question.correct_answer;

    onAnswered(question.question, correct);
    setIsAnswered(true);
    setSelectedAnswer(answer);
  };

  /**
   * Go to the next question or reset state
   */
  const goToNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setTimeLeft(15);
      setFeedbackTime(4);
    } else {
      onComplete(); // Finish quiz
    }
  };

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
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--border-color)] text-gray-700 text-lg">
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
            className="relative w-12 h-12 rounded-full bg-[var(--border-color)] opacity-80 flex items-center justify-center text-white text-xl transition hover:scale-110"
          >
            <svg
              className="absolute w-12 h-12 transform -rotate-90"
              viewBox="0 0 36 36"
            >
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
                  transition: "stroke-dashoffset 1s linear",
                }}
              />
            </svg>
            <FaForward className="text-[var(--title-color)] z-10" />
          </button>
        )}
      </div>
    </section>
  );
}
