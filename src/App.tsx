// src/App.tsx
import React from 'react';
import useQuiz from './hooks/useQuiz';
import NavBar from './components/Layouts/NavBar';
import MenuScreen from './components/Layouts/MenuScreen';
import StartScreen from './components/Quiz/StartScreen';
import QuizScreen from './components/Quiz/QuizScreen';
import ResultScreen from './components/Quiz/ResultScreen';
import type { OpenTDBQuestion } from './types';

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
  } = useQuiz();

  return (
    <div className={`body-background theme-${settings.theme}`}>
      {/* NavBar with gear/X to toggle menu */}
      <NavBar isMenuOpen={stage === 'menu'} onMenuClick={toggleMenu} />

      {loading && <div className="mt-8 text-center">Loading questions…</div>}
      {error && <div className="mt-8 text-center text-red-600">Error fetching questions</div>}

      {/* Menu overlay: dimmed backdrop + responsive drawer panel */}
      {stage === 'menu' && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
            aria-label="Close menu"
          />
          {/* Drawer panel: full-width at top on mobile; side on desktop */}
          <div
            className="inset-x-0 top-0 z-20 md:inset-y-0 md:right-0"
            role="dialog"
            aria-modal="true"
          >
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
        {stage === 'start' && <StartScreen onStart={startQuiz} />}

        {stage === 'quiz' && (
          <QuizScreen
            questions={questions as OpenTDBQuestion[]}
            onAnswered={answerQuestion}
            onComplete={completeQuiz}
          />
        )}

        {stage === 'result' && (
          <ResultScreen score={score} total={questions.length} onRestart={restartQuiz} />
        )}
      </>
    </div>
  );
}
