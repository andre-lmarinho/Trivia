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
    <nav className="main-width z-50 m-auto flex justify-end space-x-4 py-4">
      {/* Menu toggle button (gear / close icon) */}
      <button
        onClick={onMenuClick}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className={
          `group relative h-10 w-10 rounded-xl backdrop-blur-sm ` +
          `border border-[var(--border-color)] bg-[var(--content-bg)]` +
          `flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]` +
          `transition-transform duration-300 hover:scale-110`
        }
      >
        {/* Glow overlay on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--accent-color)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30" />
        {/* Icon switches between Settings cog and Close X */}
        {isMenuOpen ? (
          <X
            size={20}
            className="transform text-[var(--accent-color)] transition duration-300 hover:text-[var(--hover-color)] group-hover:rotate-90"
          />
        ) : (
          <Settings
            size={20}
            className="transform text-[var(--accent-color)] transition duration-300 hover:text-[var(--hover-color)] group-hover:rotate-180"
          />
        )}
      </button>
    </nav>
  );
}
