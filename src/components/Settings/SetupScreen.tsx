import React, { useState, useEffect } from 'react'
import type { Category, Settings } from '../../types'

/**
 * SetupScreen: full-panel UI to configure gameplay options:
 *  - Question category
 *  - Number of questions
 *  - Difficulty level
 *
 * Props:
 *  - initial: starting values for settings
 *  - onSave: callback invoked with validated options
 *  - onCancel: callback to ditch changes and return
 */
interface Props {
  initial: Settings
  onSave: (gameplay: {
    category: number
    amount: number
    difficulty: Settings['difficulty']
  }) => void
  onCancel: () => void
}

export default function SetupScreen({ initial, onSave, onCancel }: Props) {
  // Local state for each field
  const [category, setCategory] = useState<number>(initial.category)
  const [amount, setAmount] = useState<number>(initial.amount)
  const [difficulty, setDifficulty] = useState<Settings['difficulty']>(initial.difficulty)

  // Category list from API
  const [categories, setCategories] = useState<Category[]>([])

  // Validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof Settings, string>>>({})

  // Fetch available categories once on mount
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(() => {
        // If fetch fails, categories stay empty (user will see only "Any Category")
      })
  }, [])

  /**
   * Validate inputs before saving.
   * Populates `errors` and returns true if all fields are valid.
   */
  const validate = () => {
    const newErrors: Partial<Record<keyof Settings, string>> = {}

    // Number of questions must be between 1 and 50
    if (amount < 1 || amount > 50) {
      newErrors.amount = 'Select between 1 and 50 questions.'
    }

    // Category must exist in the fetched list or be zero (Any)
    const validIds = categories.map(c => c.id)
    if (category !== 0 && !validIds.includes(category)) {
      newErrors.category = 'Invalid category selected.'
    }

    // Difficulty must match allowed set
    const allowed: Settings['difficulty'][] = ['any', 'easy', 'medium', 'hard']
    if (!allowed.includes(difficulty)) {
      newErrors.difficulty = 'Invalid difficulty.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Called when user clicks "Save Options".
   * Validates inputs then invokes onSave.
   */
  const handleSubmit = () => {
    if (validate()) {
      onSave({ category, amount, difficulty })
    }
  }

  return (
    <section>
      {/* Screen title */}
      <h2 className="text-2xl font-semibold mb-4">Gameplay Options</h2>

      {/* Input grid for options */}
      <div className="grid gap-4 mb-6 md:grid-cols-2">
        {/* Category selector */}
        <label className="block">
          <span className="block mb-1 text-[var(--text-color)]">Category</span>
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
          {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
        </label>

        {/* Number of questions */}
        <label className="block">
          <span className="block mb-1 text-[var(--text-color)]">Number of Questions</span>
          <input
            type="number"
            min={1}
            max={50}
            className="w-full border p-2 rounded"
            value={amount}
            onChange={e => setAmount(Math.max(1, Math.min(50, Number(e.target.value))))}
          />
          {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
        </label>

        {/* Difficulty selector */}
        <label className="block">
          <span className="block mb-1 text-[var(--text-color)]">Difficulty</span>
          <select
            className="w-full border p-2 rounded"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value as Settings['difficulty'])}
          >
            <option value="any">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && <p className="text-red-600 text-sm">{errors.difficulty}</p>}
        </label>
      </div>

      {/* Action buttons: Cancel and Save */}
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
          Save and Re-Start the Game
        </button>
      </div>
    </section>
  )
}
