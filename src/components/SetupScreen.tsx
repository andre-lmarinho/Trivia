import React, { useState, useEffect } from 'react'
import type { Category, Settings } from '../types'

/**
 * SetupScreen: Allows user to configure the interface theme (instant apply)
 * and gameplay options (saved on Save click).
 *
 * Sections:
 * - Interface Theme: theme cards that visually update the app theme on click
 * - Gameplay Options: dropdowns/inputs for category, number of questions, difficulty
 *
 * Props:
 * - initial: current Settings object
 * - onThemeChange: (theme) => void, called when a theme card is selected or initial mounts
 * - onSave: ({ category, amount, difficulty }) => void, called when saving gameplay options
 * - onCancel: () => void, discard changes and return
 */
interface Props {
  initial: Settings
  onThemeChange: (theme: Settings['theme']) => void
  onSave: (gameplay: {
    category: number
    amount: number
    difficulty: Settings['difficulty']
  }) => void
  onCancel: () => void
}

export default function SetupScreen({
  initial,
  onThemeChange,
  onSave,
  onCancel
}: Props) {
  // State for preview theme and gameplay options
  const [theme, setTheme] = useState<Settings['theme']>(initial.theme)
  const [category, setCategory] = useState<number>(initial.category)
  const [amount, setAmount] = useState<number>(initial.amount)
  const [difficulty, setDifficulty] = useState<Settings['difficulty']>(
    initial.difficulty
  )
  const [categories, setCategories] = useState<Category[]>([])

  // Apply initial theme on mount
  useEffect(() => {
    onThemeChange(initial.theme)
  }, [initial.theme, onThemeChange])

  // Fetch OpenTDB categories once on mount
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(() => {
        // Ignore fetch errors
      })
  }, [])

  // Available theme keys for rendering cards
  const themeOptions: Settings['theme'][] = [
    'default',
    'night',
    'matrix',
    'aquatic',
    'desert',
    'farm',
    'pink'
  ]

  // Handle theme card click: preview and global change
  const handleThemeSelect = (newTheme: Settings['theme']) => {
    setTheme(newTheme)
    onThemeChange(newTheme)
  }

  // Save gameplay settings only
  const handleSubmit = () => {
    onSave({ category, amount, difficulty })
  }

  return (
    <section className="content-section">
      {/* Interface Theme Section */}
      <h2 className="text-2xl font-semibold mb-4">Interface Theme</h2>
      
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {themeOptions.map(t => (
          <div
            key={t}
            className={
              `p-4 w-[200px] rounded-lg cursor-pointer border-2 transition-shadow duration-200 flex flex-col items-center` +
              (theme === t
                ? ` border-[var(--accent-color)] shadow-lg`
                : ` border-transparent hover:shadow-md`)
            }
            onClick={() => handleThemeSelect(t)}
          >
            {/* Preview box showing content-bg under the selected theme */}
            <div
              className={
                `w-full h-20 mb-2 rounded border border-[var(--border-color)] theme-${t}`
              }
            >
              <div className="relative w-full h-full bg-[var(--content-bg)] rounded" >
                <p className="absolute bottom-0 inset-x-0 capitalize p-2 text-center text-[var(--text-color)]">
              {t.replace('-', ' ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gameplay Options Section */}
      <h2 className="text-2xl font-semibold mb-4">Gameplay Options</h2>
      <div className="grid gap-4 mb-6 md:grid-cols-2">
        {/* Category Selector */}
        <label className="block">
          <span className="block mb-1">Category</span>
          <select
            className="w-full border p-2 rounded"
            value={category}
            onChange={e => setCategory(Number(e.target.value))}
          >
            <option value={0}>Any Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        {/* Number of Questions */}
        <label className="block">
          <span className="block mb-1">Number of Questions</span>
          <input
            type="number"
            min={1}
            max={50}
            className="w-full border p-2 rounded"
            value={amount}
            onChange={e =>
              setAmount(
                Math.max(1, Math.min(50, Number(e.target.value)))
              )
            }
          />
        </label>

        {/* Difficulty Selector */}
        <label className="block">
          <span className="block mb-1">Difficulty</span>
          <select
            className="w-full border p-2 rounded"
            value={difficulty}
            onChange={e =>
              setDifficulty(e.target.value as Settings['difficulty'])
            }
          >
            <option value="any">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="start-button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="start-button"
          onClick={handleSubmit}
        >
          Save Options
        </button>
      </div>
    </section>
  )
}
