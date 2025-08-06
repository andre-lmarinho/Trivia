import { useState, useEffect } from 'react';
import type { Settings } from '../types';

const defaultSettings: Settings = {
  theme: 'default',
  category: 0,
  amount: 10,
  difficulty: 'any',
};

export default function usePersistedSettings() {
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

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const selectTheme = (theme: Settings['theme']) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const saveSettings = ({ category, amount, difficulty }: Omit<Settings, 'theme'>) => {
    setSettings((prev) => ({ ...prev, category, amount, difficulty }));
  };

  return { settings, selectTheme, saveSettings };
}
