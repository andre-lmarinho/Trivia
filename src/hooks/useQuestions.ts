import { useState, useEffect } from 'react';
import { getQuestions, type OpenTDBQuestion } from '../api/opentdb';

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
  const [questions, setQuestions] = useState<OpenTDBQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getQuestions(amount, category, difficulty)
      .then((data) => {
        setQuestions(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [amount, category, difficulty]);

  return { questions, loading, error };
}
