import React from 'react'
import { Settings, X } from 'lucide-react'

/**
 * NavBar: shows a settings cog (or close X when open) in the top-right.
 * Props:
 * - isOpen: boolean, whether the settings panel is currently open
 * - onSettingsClick: () => void, toggle open/close
 */
interface Props {
  isOpen: boolean
  onSettingsClick: () => void
}

export default function NavBar({ isOpen, onSettingsClick }: Props) {
  return (
    <nav className="flex justify-end m-auto py-4 w-[760px] max-w-[90%]">
      <button
        onClick={onSettingsClick}
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
        className={
          `group relative w-10 h-10 backdrop-blur-sm rounded-xl ` +
          `bg-[var(--content-bg)] border border-[var(--border-color)] ` +
          `flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] ` +
          `transition-transform duration-300 hover:scale-110`
        }
      >
        {/* subtle hover background glow */}
        <span
          className={
            `absolute inset-0 rounded-xl bg-[var(--accent-color)] ` +
            `opacity-0 filter blur-md group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`
          }
        />

        {/* icon switches based on isOpen */}
        {isOpen ? (
          <X
            size={20}
            className={
              `text-[var(--accent-color)] hover:text-[var(--hover-color)] ` +
              `transform transition duration-300 rotate-0 group-hover:rotate-90`
            }
          />
        ) : (
          <Settings
            size={20}
            className={
              `text-[var(--accent-color)] hover:text-[var(--hover-color)] ` +
              `transform transition duration-300 rotate-0 group-hover:rotate-180`
            }
          />
        )}
      </button>
    </nav>
  )
}
