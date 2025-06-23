import React from 'react'

interface Props {
  score: number
  total: number
  onRestart: () => void
}

export default function ResultScreen({ score, total, onRestart }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Your Score</h2>
      <p className="text-xl mb-6">
        You got {score} out of {total} correct!
      </p>
      <button
        className="px-6 py-3 bg-green-500 text-white rounded"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  )
}