import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, type ValueAnimationTransition } from 'framer-motion';

type Difficulty = 'any' | 'easy' | 'medium' | 'hard';

interface Props {
  value: Difficulty;
  onChange: (v: Difficulty) => void;
}

export function FluidDifficultySelector({ value, onChange }: Props) {
  const levels: Difficulty[] = ['any', 'easy', 'medium', 'hard'];
  const containerRef = useRef<HTMLDivElement>(null);

  // MotionValues for the indicator’s x position and width
  const x = useMotionValue(0);
  const width = useMotionValue(0);

  // track whether it’s the very first render
  const isFirstRender = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // select only the buttons, ignoring the highlight div
    const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('button'));
    const idx = levels.indexOf(value);
    const btn = buttons[idx];
    if (!btn) return;

    // calculate position & size relative to container
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const newX = btnRect.left - containerRect.left;
    const newWidth = btnRect.width;

    // spring transition type
    const springConfig: ValueAnimationTransition<number> = {
      type: 'spring',
      stiffness: 200,
      damping: 25,
    };

    if (isFirstRender.current) {
      // on mount: set values immediately, no animation
      x.set(newX);
      width.set(newWidth);
      isFirstRender.current = false;
    } else {
      // on updates: animate normally
      animate(x, newX, springConfig);
      animate(width, newWidth, springConfig);
    }
  }, [value, x, width]);

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">Difficulty</label>

      <div
        ref={containerRef}
        className="relative flex bg-[var(--border-color)] p-1 rounded-lg overflow-hidden"
      >
        {/* sliding highlight */}
        <motion.div
          style={{ x, width }}
          className="absolute top-1 bottom-1 bg-[var(--accent-color)] rounded-lg"
        />

        {/* difficulty buttons */}
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`
              relative z-10 flex-1 py-2 text-sm font-medium transition-colors
              ${
                value === level
                  ? 'text-[var(--bt-text-color)]'
                  : 'text-[var(--text-color)] hover:text-[var(--hover-color)]'
              }
            `}
          >
            {level === 'any' ? 'Any' : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
