import React, { useState, useEffect, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
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
  const [difficulty, setDifficulty] =
    useState<Settings['difficulty']>(initial.difficulty)

  // Category list from API
  const [categories, setCategories] = useState<Category[]>([])
  const [query, setQuery] = useState<string>('')

  // Validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof Settings, string>>
  >({})

  // Fetch available categories once on mount
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(() => {
        // If fetch fails, categories stay empty (user sees only "Any Category")
      })
  }, [])

  // Filtered list for Combobox search
  const filteredCategories =
    query === ''
      ? categories
      : categories.filter(cat =>
          cat.name.toLowerCase().includes(query.toLowerCase()),
        )

  /**
   * Validate inputs before saving.
   * Populates `errors` and returns true if all fields are valid.
   */
  const validate = () => {
    const newErrors: Partial<Record<keyof Settings, string>> = {}

    if (amount < 1 || amount > 50) {
      newErrors.amount = 'Select between 1 and 50 questions.'
    }

    const validIds = categories.map(c => c.id)
    if (category !== 0 && !validIds.includes(category)) {
      newErrors.category = 'Invalid category selected.'
    }

    const allowed: Settings['difficulty'][] = [
      'any',
      'easy',
      'medium',
      'hard',
    ]
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
    <div>
      {/* Screen title */}
      <h2 className="text-2xl font-semibold mb-4">
        Gameplay Options
      </h2>

      {/* Options container */}
      <div className="space-y-6 mb-6 md:pl-4">
        {/* Category selector (Combobox + search) */}
        <div>
          <label className="block mb-1 text-sm text-[var(--text-color)]">
            Category
          </label>
          <Combobox<number>
            value={category}
            onChange={value => {
              if (value !== null) setCategory(value)
            }}
          >
            <div className="relative">
              <Combobox.Input
                className="w-full border border-[var(--border-color)] p-2 rounded bg-transparent text-[var(--text-color)] placeholder:text-gray-400"
                displayValue={cat =>
                  categories.find(c => c.id === cat)?.name || ''
                }
                onChange={e => setQuery(e.target.value)}
                placeholder="Any Category"
              />
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-20 mt-1 w-full bg-[var(--content-bg)] border border-[var(--border-color)] rounded max-h-40 overflow-auto">
                  <Combobox.Option
                    key={0}
                    value={0}
                    className={({ active, selected }) =>
                      `cursor-pointer px-3 py-2 text-sm ${
                        active ? 'bg-blue-100' : ''
                      } ${selected ? 'font-semibold' : ''}`
                    }
                  >
                    Any Category
                  </Combobox.Option>
                  {filteredCategories.map(cat => (
                    <Combobox.Option
                      key={cat.id}
                      value={cat.id}
                      className={({ active, selected }) =>
                        `cursor-pointer px-3 py-2 text-sm ${
                          active ? 'bg-blue-100' : ''
                        } ${selected ? 'font-semibold' : ''}`
                      }
                    >
                      {cat.name}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          {errors.category && (
            <p className="text-red-600 text-xs mt-1">
              {errors.category}
            </p>
          )}
        </div>

        {/* Number of questions (slider) */}
        <div>
          <label className="block mb-1 text-sm text-[var(--text-color)]">
            Number of Questions: <span>{amount}</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="w-full"
          />
          {errors.amount && (
            <p className="text-red-600 text-xs mt-1">
              {errors.amount}
            </p>
          )}
        </div>

        {/* Difficulty selector (pill buttons) */}
        <div>
          <label className="block mb-1 text-sm text-[var(--text-color)]">
            Difficulty
          </label>
          <div className="flex space-x-1 bg-[var(--border-color)] p-1 rounded-lg">
            {['any', 'easy', 'medium', 'hard'].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level as Settings['difficulty'])}
                className={`flex-1 text-sm py-2 rounded-lg ${
                  difficulty === level
                    ? 'bg-[var(--accent-color)] text-white shadow'
                    : 'bg-transparent text-[var(--text-color)] hover:bg-[var(--hover-bg)]'
                }`}
              >
                {level === 'any'
                  ? 'Any'
                  : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          {errors.difficulty && (
            <p className="text-red-600 text-xs mt-1">
              {errors.difficulty}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
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
    </div>
  )
}
