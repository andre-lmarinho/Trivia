import React, { useState } from 'react'
import SetupScreen from '../Settings/SetupScreen'
import ThemeScreen from '../Settings/ThemeScreen'
import type { Settings } from '../../types'

/**
 * MenuScreen: overlay drawer for in-game navigation.
 * Displays a MenuBar with two options (Settings / Theme)
 * and renders the corresponding screen below (or beside).
 * Close (X) is handled by NavBar.
 *
 * Props:
 * - initialSettings: current Settings object
 * - onSaveSettings: callback to apply gameplay options and close menu
 * - onThemeSelect: callback to apply theme and close menu
 * - onCancel: callback to close menu without changes
 */
interface Props {
  initialSettings: Settings
  onSaveSettings: (gameplay: Omit<Settings, 'theme'>) => void
  onThemeSelect: (theme: Settings['theme']) => void
  onCancel: () => void
}

export default function MenuScreen({
  initialSettings,
  onSaveSettings,
  onThemeSelect,
  onCancel
}: Props) {
  // Local tab state: 'settings' or 'theme'
  const [tab, setTab] = useState<'settings' | 'theme'>('settings')

  return (
    <div className="menu-panel md:flex-row">
      {/* MenuBar: row on mobile, column on desktop */}
      <div className="flex md:flex-col mb-4
    space-x-4 space-y-0 md:space-x-0 md:space-y-4 md:pt-16 md:pr-4 md:border-r border-[var(--border-color)]">
        <button
          className={`config-button ${tab === 'settings' ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]' : ''}`}
          onClick={() => setTab('settings')}
        >
          Gameplay
        </button>

        <button
          className={`config-button ${tab === 'theme' ? 'bg-[var(--accent-color)] text-[var(--bt-text-color)]' : ''}`}
          onClick={() => setTab('theme')}
        >
          Theme
        </button>
      </div>

      {/* Content area: shows selected panel */}
      <div className="flex-1 overflow-auto">
        {tab === 'settings' ? (
          <SetupScreen
            initial={initialSettings}
            onSave={onSaveSettings}
            onCancel={onCancel}
          />
        ) : (
          <ThemeScreen
            initialTheme={initialSettings.theme}
            onThemeSelect={onThemeSelect}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  )
}
