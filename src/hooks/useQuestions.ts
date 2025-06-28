import { useState, useEffect } from 'react'
import type { OpenTDBQuestion } from '../types'

/**
 * Custom hook to fetch quiz questions from the OpenTDB API,
 * with built-in sanitization of user-supplied parameters.
 *
 * @param amount     Number of questions (clamped to 1–50)
 * @param category   Category ID (0 = any)
 * @param difficulty Difficulty level ('any'|'easy'|'medium'|'hard')
 */
export default function useQuestions(
  amount: number,
  category: number = 0,
  difficulty: 'any' | 'easy' | 'medium' | 'hard' = 'any'
) {
  const [questions, setQuestions] = useState<OpenTDBQuestion[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(false)

  useEffect(() => {
    // Whenever the parameters change, reset loading and error state
    setLoading(true)
    setError(false)

    // 1. Sanitize inputs
    const safeAmount = Math.min(50, Math.max(1, amount))
    const allowedDifficulties = ['any', 'easy', 'medium', 'hard'] as const
    const safeDifficulty: typeof difficulty =
      allowedDifficulties.includes(difficulty) ? difficulty : 'any'
    const safeCategory = Number.isInteger(category) && category > 0
      ? category
      : 0

    // 2. Build the API URL with only safe values
    const url = new URL('https://opentdb.com/api.php')
    url.searchParams.set('amount', String(safeAmount))
    if (safeCategory !== 0) {
      url.searchParams.set('category', String(safeCategory))
    }
    if (safeDifficulty !== 'any') {
      url.searchParams.set('difficulty', safeDifficulty)
    }
    url.searchParams.set('type', 'multiple')
    url.searchParams.set('encode', 'url3986')

    // 3. Fetch data
    fetch(url.toString())
      .then(res => res.json())
      .then(data => {
        // Populate questions state with API results
        setQuestions(data.results as OpenTDBQuestion[])
      })
      .catch(() => {
        // On any network / parse error, flag error state
        setError(true)
      })
      .finally(() => {
        // Loading complete (success or failure)
        setLoading(false)
      })
  }, [amount, category, difficulty])

  return { questions, loading, error }
}
