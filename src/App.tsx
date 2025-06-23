import React, { useState, useEffect } from 'react'
import useQuestions from './hooks/useQuestions'
import NavBar from './components/Navbar'
import SetupScreen from './components/SetupScreen'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import type { OpenTDBQuestion, Settings } from './types'

export default function App() {
  // User-configurable settings
  const [settings, setSettings] = useState<Settings>({
    theme: 'default',    // Theme (Default)
    category: 0,         // Category (Any)
    amount: 10,          // Questions Amount
    difficulty: 'any',   // Difficulty Level
  })

  // Fetch questions whenever gameplay settings change
  const { questions, loading, error } = useQuestions(
    settings.amount,
    settings.category,
    settings.difficulty
  )

  // App stage: 'start' | 'settings' | 'quiz' | 'result'
  const [stage, setStage] = useState<'start' | 'settings' | 'quiz' | 'result'>('start')

  // Record of { questionId: correct? }
  const [responses, setResponses] = useState<Record<string, boolean>>({})

   // Toggle settings panel
  const toggleSettings = () => {
    setStage(prev => (prev === 'settings' ? 'start' : 'settings'))
  }
  
  // Handler: update theme immediately
  const handleThemeChange = (theme: Settings['theme']) => {
    setSettings(prev => ({ ...prev, theme }))
  }

  // Handler: save gameplay options and return to start
  const handleSaveGameplay = ({ category, amount, difficulty }: Omit<Settings, 'theme'>) => {
    setSettings(prev => ({ ...prev, category, amount, difficulty }))
    setStage('start')
  }

  // Handler: cancel settings
  const handleCancel = () => setStage('start')

  // Handler: start quiz
  const handleStart = () => setStage('quiz')

  // Handler: record answer
  const handleAnswered = (id: string, correct: boolean) => {
    setResponses(prev =>
      prev[id] != null ? prev : { ...prev, [id]: correct }
    )
  }

  // Auto-advance to results when all answered
  useEffect(() => {
    if (
      stage === 'quiz' &&
      questions.length > 0 &&
      Object.keys(responses).length === questions.length
    ) {
      setStage('result')
    }
  }, [responses, questions, stage])

  // Handler: restart quiz
  const handleRestart = () => {
    setResponses({})
    setStage('start')
  }

  // Reset responses when gameplay settings change
  useEffect(() => {
    setResponses({})
    setStage('start')
  }, [settings.category, settings.amount, settings.difficulty])

  const score = Object.values(responses).filter(Boolean).length

  // Show loading or error states
  if (loading)
    return <div className="text-center mt-8">Loading questions…</div>
  if (error)
    return <div className="text-center mt-8 text-red-600">Error loading questions</div>

  return (
    <div className={`body-background theme-${settings.theme}`}>
      {/* Pass isOpen based on stage === 'settings' */}
      <NavBar isOpen={stage === 'settings'} onSettingsClick={toggleSettings} />

      <>
        {stage === 'settings' && (
          <SetupScreen
            initial={settings}
            onThemeChange={handleThemeChange}
            onSave={handleSaveGameplay}
            onCancel={handleCancel}
          />
        )}

        {stage === 'start' && (
          <StartScreen onStart={handleStart} />
        )}

        {stage === 'quiz' && (
          <QuizScreen
            questions={questions as OpenTDBQuestion[]}
            onAnswered={handleAnswered}
            onComplete={() => setStage('result')}
          />
        )}

        {stage === 'result' && (
          <ResultScreen
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        )}
      </>
    </div>
  )
}
