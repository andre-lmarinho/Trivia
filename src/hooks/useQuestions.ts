import { useState, useEffect } from 'react'
import type { OpenTDBQuestion } from '../types'

// Custom hook to fetch questions from OpenTDB API
export default function useQuestions(
  amount: number,
  category: number = 0,
  difficulty: 'any' | 'easy' | 'medium' | 'hard' = 'any'
  ) {
  const [questions, setQuestions] = useState<OpenTDBQuestion[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)
  
  // build URL with all three params
  useEffect(() => {
      const url = new URL('https://opentdb.com/api.php')
      url.searchParams.set('amount', String(amount))
      if (category !== 0) url.searchParams.set('category', String(category))
      if (difficulty !== 'any') url.searchParams.set('difficulty', difficulty)
      url.searchParams.set('type', 'multiple')
      url.searchParams.set('encode', 'url3986')

      fetch(url.toString())
        .then(res => res.json())
        .then(data => setQuestions(data.results as OpenTDBQuestion[]))
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }, [amount, category, difficulty])

  return { questions, loading, error }
}
