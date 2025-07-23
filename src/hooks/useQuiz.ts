import { useState, useEffect } from 'react';
import useQuestions from './useQuestions';
import type { Settings } from '../types';

export type Stage = 'menu' | 'start' | 'quiz' | 'result';

export default function useQuiz() {
  const defaultSettings: Settings = {
    theme: 'default',
    category: 0,
    amount: 10,
    difficulty: 'any',
  };

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        // ignore parse errors
      }
    }
    return defaultSettings;
  });

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

  const selectTheme = (theme: Settings['theme']) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const saveSettings = ({ category, amount, difficulty }: Omit<Settings, 'theme'>) => {
    setSettings((prev) => ({ ...prev, category, amount, difficulty }));
    setStage('start');
  };

  const cancel = () => {
    setStage('start');
  };

  const startQuiz = () => setStage('quiz');

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
