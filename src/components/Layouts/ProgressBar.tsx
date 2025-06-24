import React from 'react'

interface Props {
  current: number  // zero-based index of the question
  total: number    // total number of questions
}

/**  
 * Shows a horizontal progress bar.
 * Fills from 0% → 100% as current goes from 0 → total.
 */
export default function ProgressBar({ current, total }: Props) {
  const pct = Math.min(100, Math.max(0, ((current + 1) / total) * 100))

  return (
    <div className="w-full h-2 bg-[var(--border-color)] rounded overflow-hidden mb-4">
      <div
        className="h-full bg-[var(--accent-color)] transition-width duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
