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
      <div
        className="flex md:flex-col mb-4
        space-x-4 space-y-0 md:space-x-0 md:space-y-4 md:pt-16 md:pr-4 md:border-r border-[var(--border-color)]"
      >
        <button
          className={`px-4 py-2 rounded w-full text-left whitespace-normal min-w-[146px]
            border border-[var(--border-color)]
            ${
              tab === 'settings'
                ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]'
                : 'bg-[var(--second-bg)] text-[var(--second-text)] hover:bg-[var(--accent-color)] hover:text-[var(--bt-text-color)]'
            }
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]`}
          onClick={() => setTab('settings')}
        >
          Gameplay
        </button>

        <button
          className={`px-4 py-2 rounded w-full text-left whitespace-normal min-w-[146px]
            border border-[var(--border-color)]
            ${
              tab === 'theme'
                ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]'
                : 'bg-[var(--second-bg)] text-[var(--second-text)] hover:bg-[var(--accent-color)] hover:text-[var(--bt-text-color)]'
            }
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]`}
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
