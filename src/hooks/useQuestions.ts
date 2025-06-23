import { useState, useEffect } from 'react'
import type { OpenTDBQuestion } from '../types'

// Custom hook to fetch questions from OpenTDB API
export default function useQuestions(amount: number) {
  const [questions, setQuestions] = useState<OpenTDBQuestion[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple&encode=url3986`
    fetch(url)
      .then(res => res.json())
      .then(data => setQuestions(data.results as OpenTDBQuestion[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [amount])

  return { questions, loading, error }
}
