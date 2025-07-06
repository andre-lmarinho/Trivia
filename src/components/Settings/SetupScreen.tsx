import React, { useState } from 'react';
import type { Settings } from '../../types';
import useCategories from '../../hooks/useCategories';
import CategorySelector from './CategorySelector';
import AmountSlider from './ElasticSlider';
import { FluidDifficultySelector } from './FluidDifficultySelector';

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
  initial: Settings;
  onSave: (gameplay: {
    category: number;
    amount: number;
    difficulty: Settings['difficulty'];
  }) => void;
  onCancel: () => void;
}

export default function SetupScreen({ initial, onSave, onCancel }: Props) {
  // Local state for each field
  const [category, setCategory] = useState<number>(initial.category);
  const [amount, setAmount] = useState<number>(initial.amount);
  const [difficulty, setDifficulty] = useState<Settings['difficulty']>(initial.difficulty);

  // Available categories from API
  const { categories } = useCategories();

  // Validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof Settings, string>>>({});

  /**
   * Validate inputs before saving.
   * Populates `errors` and returns true if all fields are valid.
   */
  const validate = () => {
    const newErrors: Partial<Record<keyof Settings, string>> = {};

    if (amount < 1 || amount > 50) {
      newErrors.amount = 'Select between 1 and 50 questions.';
    }

    const validIds = categories.map((c) => c.id);
    if (category !== 0 && !validIds.includes(category)) {
      newErrors.category = 'Invalid category selected.';
    }

    const allowed: Settings['difficulty'][] = ['any', 'easy', 'medium', 'hard'];
    if (!allowed.includes(difficulty)) {
      newErrors.difficulty = 'Invalid difficulty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Called when user clicks "Save Options".
   * Validates inputs then invokes onSave.
   */
  const handleSubmit = () => {
    if (validate()) {
      onSave({ category, amount, difficulty });
    }
  };

  return (
    <div>
      {/* Screen title */}
      <h2 className="text-2xl font-semibold mb-4">Gameplay Options</h2>

      {/* Options container */}
      <div className="space-y-6 mb-6 md:pl-4">
        <CategorySelector
          categories={categories}
          value={category}
          onChange={setCategory}
          error={errors.category}
        />

        <AmountSlider
          value={amount}
          onChange={setAmount}
          leftIcon={<button>-</button>}
          rightIcon={<button>+</button>}
          maxValue={50}
          isStepped={true}
          stepSize={1}
        />
        <FluidDifficultySelector value={difficulty} onChange={setDifficulty} />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        <button type="button" className="start-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="start-button" onClick={handleSubmit}>
          Save and Re-Start
        </button>
      </div>
    </div>
  );
}
