import React from 'react'

interface Props {
  onStart: () => void
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Trivia!</h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded"
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  )
}