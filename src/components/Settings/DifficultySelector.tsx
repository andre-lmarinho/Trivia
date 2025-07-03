import React from "react";
import type { Settings } from "../../types";

interface Props {
  value: Settings["difficulty"];
  onChange: (val: Settings["difficulty"]) => void;
  error?: string;
}

export default function DifficultySelector({ value, onChange, error }: Props) {
  const levels: Settings["difficulty"][] = ["any", "easy", "medium", "hard"];

  return (
    <div>
      <label className="block mb-1 text-sm text-[var(--text-color)]">
        Difficulty
      </label>
      <div className="flex space-x-1 bg-[var(--border-color)] p-1 rounded-lg">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`flex-1 text-sm py-2 rounded-lg ${
              value === level
                ? "bg-[var(--accent-color)] text-[var(--bt-text-color)] shadow"
                : "bg-transparent text-[var(--text-color)] hover:bg-[var(--hover-bg)]"
            }`}
          >
            {level === "any"
              ? "Any"
              : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
