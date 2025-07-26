import React, { useState } from 'react';
import SetupScreen from '../Settings/SetupScreen';
import ThemeScreen from '../Settings/ThemeScreen';
import type { Settings } from '../../types';

interface Props {
  initialSettings: Settings;
  onSaveSettings: (gameplay: Omit<Settings, 'theme'>) => void;
  onThemeSelect: (theme: Settings['theme']) => void;
  onCancel: () => void;
}

export default function MenuScreen({
  initialSettings,
  onSaveSettings,
  onThemeSelect,
  onCancel,
}: Props) {
  const [tab, setTab] = useState<'settings' | 'theme'>('settings');

  return (
    <div className="menu-panel md:flex-row">
      {/* MenuBar: row on mobile, column on desktop */}
      <div className="mb-4 flex space-x-4 space-y-0 border-[var(--border-color)] md:flex-col md:space-x-0 md:space-y-4 md:border-r md:pr-4 md:pt-16">
        <button
          className={`w-full min-w-[146px] whitespace-normal rounded border border-[var(--border-color)] px-4 py-2 text-left ${
            tab === 'settings'
              ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]'
              : 'bg-[var(--border-color)] text-[var(--second-text)] hover:bg-[var(--accent-color)] hover:text-[var(--bt-text-color)]'
          } focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]`}
          onClick={() => setTab('settings')}
        >
          Gameplay
        </button>

        <button
          className={`w-full min-w-[146px] whitespace-normal rounded border border-[var(--border-color)] px-4 py-2 text-left ${
            tab === 'theme'
              ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]'
              : 'bg-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bt-text-color)]'
          } focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]`}
          onClick={() => setTab('theme')}
        >
          Theme
        </button>
      </div>

      {/* Content area: shows selected panel */}
      <div className="flex-1 overflow-auto">
        {tab === 'settings' ? (
          <SetupScreen initial={initialSettings} onSave={onSaveSettings} onCancel={onCancel} />
        ) : (
          <ThemeScreen
            initialTheme={initialSettings.theme}
            onThemeSelect={onThemeSelect}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
}
