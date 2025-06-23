import React, { useState } from 'react'
import type { OpenTDBQuestion } from '../types'
import Question from './Question'
import ProgressBar from './ProgressBar'

interface Props {
  questions: OpenTDBQuestion[]
  onAnswered: (id: string, correct: boolean) => void
  onComplete: () => void
}

export default function QuizScreen({ questions, onAnswered, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const question = questions[currentIndex]

  // Render the progress bar just above the question
  const handleAnswer = (correct: boolean) => {
    // registra no App
    onAnswered(question.question, correct)

    // avança para a próxima pergunta ou completa
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  return (
    <>
      <ProgressBar current={currentIndex} total={questions.length} />
      <Question
        key={question.question}
        question={question}
        onAnswered={handleAnswer}
      />
    </>
  )
}
