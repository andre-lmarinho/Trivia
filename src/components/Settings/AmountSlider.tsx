import React from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
  error?: string;
}

export default function AmountSlider({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block mb-1 text-sm text-[var(--text-color)]">
        Number of Questions: <span>{value}</span>
      </label>
      <input
        type="range"
        min={1}
        max={50}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-[var(--accent-color)]"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
