// src/App.tsx
import React, { useState, useEffect } from 'react'
import useQuestions from './hooks/useQuestions'
import NavBar from './components/Layouts/NavBar'
import MenuScreen from './components/Layouts/MenuScreen'
import SetupScreen from './components/Settings/SetupScreen'
import ThemeScreen from './components/Settings/ThemeScreen'
import StartScreen from './components/Quiz/StartScreen'
import QuizScreen from './components/Quiz/QuizScreen'
import ResultScreen from './components/Quiz/ResultScreen'
import type { OpenTDBQuestion, Settings } from './types'

/**
 * App: Root component controlling quiz flow and in-game menu drawer.
 */
export default function App() {
  // 1. Store user settings: theme, category, amount, difficulty
  const [settings, setSettings] = useState<Settings>({
    theme: 'default',
    category: 0,
    amount: 10,
    difficulty: 'any',
  })

  // 2. Fetch questions whenever gameplay settings change
  const { questions, loading, error } = useQuestions(
    settings.amount,
    settings.category,
    settings.difficulty
  )

  // 3. UI stage: controls which panel/screen is visible
  const [stage, setStage] = useState<
    'menu' | 'settings' | 'theme' | 'start' | 'quiz' | 'result'
  >('start')

  // 4. Record of user answers: question ID -> correct?
  const [responses, setResponses] = useState<Record<string, boolean>>({})

  /** Toggle the in-game menu drawer */
  const toggleMenu = () => {
    setStage(prev => (prev === 'menu' ? 'start' : 'menu'))
  }

  /** Apply a new theme and close menu */
  const handleThemeSelect = (theme: Settings['theme']) => {
    setSettings(prev => ({ ...prev, theme }))
  }

  /** Save gameplay options from SetupScreen and close menu */
  const handleSaveSettings = ({ category, amount, difficulty }: Omit<Settings, 'theme'>) => {
    setSettings(prev => ({ ...prev, category, amount, difficulty }))
    setStage('start')
  }

  /** Close menu without saving */
  const handleCancel = () => {
    setStage('start')
  }

  /** Start the quiz */
  const handleStart = () => setStage('quiz')

  /** Record a user's answer, ignoring duplicates */
  const handleAnswer = (id: string, correct: boolean) => {
    setResponses(prev => (prev[id] != null ? prev : { ...prev, [id]: correct }))
  }

  /** Auto-advance to results when all questions are answered */
  useEffect(() => {
    if (
      stage === 'quiz' &&
      questions.length > 0 &&
      Object.keys(responses).length === questions.length
    ) {
      setStage('result')
    }
  }, [stage, questions, responses])

  /** Restart quiz from the beginning */
  const handleRestart = () => {
    setResponses({})
    setStage('start')
  }

  /** Reset progress when gameplay settings change */
  useEffect(() => {
    setResponses({})
    setStage('start')
  }, [settings.category, settings.amount, settings.difficulty])

  // Compute current score: count of correct answers
  const score = Object.values(responses).filter(Boolean).length

  // Render loading or error states
  if (loading) return <div className="text-center mt-8">Loading questions…</div>
  if (error) return <div className="text-center mt-8 text-red-600">Error fetching questions</div>

  return (
    <div className={`body-background theme-${settings.theme}`}>      
      {/* NavBar with gear/X to toggle menu */}
      <NavBar isMenuOpen={stage === 'menu'} onMenuClick={toggleMenu} />

      {/* Menu overlay: dimmed backdrop + responsive drawer panel */}
      {stage === 'menu' && (
        <>
          {/* Drawer panel: full-width at top on mobile; side on desktop */}
          <div className="inset-x-0 top-0 md:inset-y-0 md:right-0 z-20">
            <MenuScreen
              initialSettings={settings}
              onSaveSettings={handleSaveSettings}
              onThemeSelect={handleThemeSelect}
              onCancel={handleCancel}
            />
          </div>
        </>
      )}

      {/* Main content section (always rendered under menu) */}
      <>
        {stage === 'settings' && (
          <SetupScreen
            initial={settings}
            onSave={handleSaveSettings}
            onCancel={handleCancel}
          />
        )}

        {stage === 'theme' && (
          <ThemeScreen
            initialTheme={settings.theme}
            onThemeSelect={handleThemeSelect}
            onCancel={handleCancel}
          />
        )}

        {stage === 'start' && <StartScreen onStart={handleStart} />}

        {stage === 'quiz' && (
          <QuizScreen
            questions={questions as OpenTDBQuestion[]}
            onAnswered={handleAnswer}
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
