import React from "react";

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ResultScreen({ score, total, onRestart }: Props) {
  return (
    <div className="content-section">
      <h2>Your Score</h2>
      <p className="score-text">
        You got {score} out of {total} correct!
      </p>
      <button className="start-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}
