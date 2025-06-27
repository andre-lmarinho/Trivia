import React, { useState } from 'react'
import type { Settings } from '../../types'

/**
 * ThemeScreen: allows user to pick an interface theme
 * Props:
 * - initialTheme: current theme
 * - onThemeSelect: callback when a theme is clicked (immediate apply)
 * - onCancel: optional callback to exit theme selection
 */
interface Props {
  initialTheme: Settings['theme']
  onThemeSelect: (theme: Settings['theme']) => void
  onCancel?: () => void
}

export default function ThemeScreen({
  initialTheme,
  onThemeSelect,
}: Props) {
  // Available theme keys for rendering cards
  const themeOptions: Settings['theme'][] = [
    'default', 'night', 'matrix', 'aquatic', 'desert', 'farm', 'pink'
  ]
  // Local preview state (optional)
  const [selected, setSelected] = useState<Settings['theme']>(initialTheme)

  // Handler: select a theme and notify parent
  const handleSelect = (t: Settings['theme']) => {
    setSelected(t)
    onThemeSelect(t)
  }

  return (
    <>
      {/* Screen title */}
      <h2 className="text-2xl font-semibold mb-4">Choose Theme</h2>

      {/* Theme Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 justify-items-center">
        {themeOptions.map(t => (
          <div
            key={t}
            className={`theme-card flex flex-col items-center text-center ${
              selected === t ? 'border-[var(--accent-color)] shadow-lg' : ''
            }`}
            onClick={() => handleSelect(t)}
          >
            {/* Preview swatch using theme vars */}
            <div className={`relative w-full h-16 rounded border border-[var(--border-color)] theme-${t}`}>
              <div className="w-full h-full bg-[var(--content-bg)] rounded" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 capitalize text-[var(--text-color)]">{t}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
