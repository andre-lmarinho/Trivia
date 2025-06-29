// src/App.tsx
import React from 'react'
import useQuiz from './hooks/useQuiz'
import NavBar from './components/Layouts/NavBar'
import MenuScreen from './components/Layouts/MenuScreen'
import SetupScreen from './components/Settings/SetupScreen'
import ThemeScreen from './components/Settings/ThemeScreen'
import StartScreen from './components/Quiz/StartScreen'
import QuizScreen from './components/Quiz/QuizScreen'
import ResultScreen from './components/Quiz/ResultScreen'
import type { OpenTDBQuestion } from './types'

/**
 * App: Root component controlling quiz flow and in-game menu drawer.
 */
export default function App() {
  const {
    settings,
    stage,
    questions,
    loading,
    error,
    score,
    toggleMenu,
    selectTheme,
    saveSettings,
    cancel,
    startQuiz,
    answerQuestion,
    restartQuiz,
    completeQuiz,
  } = useQuiz()

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
          <div
            className="menu-backdrop"
            onClick={toggleMenu}
            data-testid="menu-backdrop"
          />
          {/* Drawer panel: full-width at top on mobile; side on desktop */}
          <div className="inset-x-0 top-0 md:inset-y-0 md:right-0 z-20">
            <MenuScreen
              initialSettings={settings}
              onSaveSettings={saveSettings}
              onThemeSelect={selectTheme}
              onCancel={cancel}
            />
          </div>
        </>
      )}

      {/* Main content section (always rendered under menu) */}
      <>
        {stage === 'settings' && (
          <SetupScreen
            initial={settings}
            onSave={saveSettings}
            onCancel={cancel}
          />
        )}

        {stage === 'theme' && (
          <ThemeScreen
            initialTheme={settings.theme}
            onThemeSelect={selectTheme}
            onCancel={cancel}
          />
        )}

        {stage === 'start' && <StartScreen onStart={startQuiz} />}

        {stage === 'quiz' && (
          <QuizScreen
            questions={questions as OpenTDBQuestion[]}
            onAnswered={answerQuestion}
            onComplete={completeQuiz}
          />
        )}

        {stage === 'result' && (
          <ResultScreen
            score={score}
            total={questions.length}
            onRestart={restartQuiz}
          />
        )}
      </>
    </div>
  )
}
