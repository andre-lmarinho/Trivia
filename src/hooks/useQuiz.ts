import { useState, useEffect } from 'react';
import useQuestions from './useQuestions';
import type { Settings } from '../types';
import usePersistedSettings from './usePersistedSettings';

export type Stage = 'menu' | 'start' | 'quiz' | 'result';

export default function useQuiz() {
  const { settings, selectTheme, saveSettings: persistSettings } = usePersistedSettings();

  const { questions, loading, error } = useQuestions(
    settings.amount,
    settings.category,
    settings.difficulty
  );

  const [stage, setStage] = useState<Stage>('start');
  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const [previousStage, setPreviousStage] = useState<Stage>('start');

  const toggleMenu = () => {
    setStage((prev) => {
      if (prev === 'menu') {
        return previousStage;
      }
      setPreviousStage(prev);
      return 'menu';
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stage === 'menu') {
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [stage]);

  const saveSettings = ({ category, amount, difficulty }: Omit<Settings, 'theme'>) => {
    persistSettings({ category, amount, difficulty });
    setStage('start');
  };

  const cancel = () => {
    setStage('start');
  };

  const startQuiz = () => setStage('quiz');

  const answerQuestion = (id: string, correct: boolean) => {
    setResponses((prev) => (prev[id] != null ? prev : { ...prev, [id]: correct }));
  };

  useEffect(() => {
    if (
      stage === 'quiz' &&
      questions.length > 0 &&
      Object.keys(responses).length === questions.length
    ) {
      setStage('result');
    }
  }, [stage, questions, responses]);

  const restartQuiz = () => {
    setResponses({});
    setStage('start');
  };

  useEffect(() => {
    setResponses({});
    setStage('start');
  }, [settings.category, settings.amount, settings.difficulty]);

  const score = Object.values(responses).filter(Boolean).length;

  const completeQuiz = () => setStage('result');

  return {
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
  };
}
