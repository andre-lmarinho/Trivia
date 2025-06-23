// src/components/Question.tsx
import React, { useState, useMemo } from 'react'
import type { OpenTDBQuestion } from '../types'

interface Props {
  question: OpenTDBQuestion
  onAnswered: (correct: boolean) => void
}

export default function Question({ question, onAnswered }: Props)  {
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Decode URL-encoded strings from the API
  const decode = (s: string) => decodeURIComponent(s)

  // Prepare and shuffle choices once per question
  const choices = useMemo(() => {
    const all = [
      ...question.incorrect_answers.map(decode),
      decode(question.correct_answer)
    ]
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [question])

  const handleChoice = (choice: string) => {
    if (answered) return
    const correct = choice === decode(question.correct_answer)
    setIsCorrect(correct)
    setAnswered(true)
    onAnswered(correct)
  }

  return (
    <section className="text-center mb-8">
      <h2 className="text-xl font-semibold mb-2">{decode(question.category)}</h2>
      <h3 className="mb-4">{decode(question.question)}</h3>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {choices.map(c => (
          <button
            key={c}
            onClick={() => handleChoice(c)}
            disabled={answered}
            className={`px-4 py-2 rounded ${
              answered
                ? c === decode(question.correct_answer)
                  ? 'bg-green-300'
                  : 'bg-red-300'
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {answered && (
        <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </p>
      )}
    </section>
  )
}
