import React from 'react';
import { Settings, X } from 'lucide-react';

/**
 * NavBar: single entry point for opening the main menu panel.
 * Props:
 * - isMenuOpen: whether the menu panel is currently visible
 * - onMenuClick: toggle the menu open/close
 */
interface Props {
  isMenuOpen: boolean;
  onMenuClick: () => void;
}

export default function NavBar({ isMenuOpen, onMenuClick }: Props) {
  return (
    <nav className="flex justify-end m-auto py-4 space-x-4 main-width z-100">
      {/* Menu toggle button (gear / close icon) */}
      <button
        onClick={onMenuClick}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className={
          `group relative w-10 h-10 backdrop-blur-sm rounded-xl ` +
          `bg-[var(--content-bg)] border border-[var(--border-color)] ` +
          `flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] ` +
          `transition-transform duration-300 hover:scale-110`
        }
      >
        {/* Glow overlay on hover */}
        <span className="absolute inset-0 rounded-xl bg-[var(--accent-color)] opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
        {/* Icon switches between Settings cog and Close X */}
        {isMenuOpen ? (
          <X
            size={20}
            className="text-[var(--accent-color)] hover:text-[var(--hover-color)] transform transition duration-300 group-hover:rotate-90"
          />
        ) : (
          <Settings
            size={20}
            className="text-[var(--accent-color)] hover:text-[var(--hover-color)] transform transition duration-300 group-hover:rotate-180"
          />
        )}
      </button>
    </nav>
  );
}
