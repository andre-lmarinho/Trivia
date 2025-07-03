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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [feedbackTime, setFeedbackTime] = useState(4);

  const question = questions[currentIndex];

  // Timer para responder
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft === 0) {
      handleAnswer(""); // Tempo acabou
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, currentIndex]);

  // Timer de feedback
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => setFeedbackTime((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [feedbackTime, isAnswered]);

  // Avançar automaticamente
  useEffect(() => {
    if (feedbackTime === 0 && isAnswered) {
      goToNextQuestion();
    }
  }, [feedbackTime, isAnswered]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const correct = answer === question.correct_answer;

    onAnswered(question.question, correct);
    setIsAnswered(true);
    setIsCorrect(correct);
    setSelectedAnswer(answer);
  };

  const goToNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setSelectedAnswer(null);
      setTimeLeft(15);
      setFeedbackTime(4);
    } else {
      onComplete();
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

      {/* Canto inferior direito: Time Left ou Countdown */}
      <div className="absolute bottom-4 right-4">
        {!isAnswered ? (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--border-color)] text-gray-700 text-lg">
            {timeLeft}
          </div>
        ) : (
          <button
            onClick={goToNextQuestion}
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
