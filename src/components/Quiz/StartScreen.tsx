import React from 'react'

interface Props {
  onStart: () => void
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="content-section">
      <h1>Welcome to Trivia!</h1>
      <button
        className="start-button"
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  )
}
