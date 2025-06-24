// src/components/Question.tsx
import React, { useState, useMemo } from 'react'
import type { OpenTDBQuestion } from '../../types'

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
    <section className="content-section">
      <div>
        <h2>{decode(question.category)}</h2>
        <h3>{decode(question.question)}</h3>
      </div>
      <div className="answer-container">
        {choices.map(c => (
          <button
            key={c}
            onClick={() => handleChoice(c)}
            disabled={answered}
            className={`option-button${
              answered
                ? c === decode(question.correct_answer)
                  ? 'bg-[var(--fb-correct)]'
                  : 'bg-[var(--fb-incorrect)]'
                : ''
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {answered && (
        <p className={`score-text ${
          isCorrect
            ? 'text-[var(--fb-correct)]'
            : 'text-[var(--fb-incorrect)]'
        }`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </p>
      )}
    </section>
  )
}
