import React, { useState, useEffect } from 'react'
import useQuestions from './hooks/useQuestions'
import StartScreen   from './components/StartScreen'
import QuizScreen    from './components/QuizScreen'
import ResultScreen  from './components/ResultScreen'
import type { OpenTDBQuestion } from './types'

export default function App() {
  const { questions, loading, error } = useQuestions(10) // <<- PICK QUESTIONS AMOUNT
  const [stage, setStage]         = useState<'start' | 'quiz' | 'result'>('start')
  const [responses, setResponses] = useState<Record<string, boolean>>({})

  const handleStart = () => setStage('quiz')
  const handleAnswered = (id: string, correct: boolean) => {
    setResponses(prev => (prev[id] != null ? prev : { ...prev, [id]: correct }))
  }
  const handleComplete = () => setStage('result')
  const handleRestart = () => {
    setResponses({})
    setStage('start')
  }

  // se já estiver no quiz e as perguntas tiverem carregado
  useEffect(() => {
    if (stage === 'quiz' && questions.length === 0) {
      // garantir que não comece sem perguntas
      setStage('start')
    }
  }, [stage, questions])

  if (loading)
    return <div className="text-center mt-8">Loading questions…</div>
  if (error)
    return (
      <div className="text-center mt-8 text-red-600">
        Error loading questions
      </div>
    )

  const score = Object.values(responses).filter(Boolean).length

  return (
    <div className="container mx-auto p-4">
      {stage === 'start' && <StartScreen onStart={handleStart} />}

      {stage === 'quiz' && (
        <QuizScreen
          questions={questions as OpenTDBQuestion[]}
          onAnswered={handleAnswered}
          onComplete={handleComplete}
        />
      )}

      {stage === 'result' && (
        <ResultScreen
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
