import type { OpenTDBQuestion, Category } from '../types';

/**
 * Fetch questions from the OpenTDB API using sanitized parameters.
 *
 * @param amount Number of questions (1-50)
 * @param category Category ID (0 = any)
 * @param difficulty Difficulty level ('any'|'easy'|'medium'|'hard')
 */
export async function getQuestions(
  amount: number,
  category: number = 0,
  difficulty: 'any' | 'easy' | 'medium' | 'hard' = 'any'
): Promise<OpenTDBQuestion[]> {
  const safeAmount = Math.min(50, Math.max(1, amount));
  const allowedDifficulties = ['any', 'easy', 'medium', 'hard'] as const;
  const safeDifficulty: typeof difficulty = allowedDifficulties.includes(difficulty)
    ? difficulty
    : 'any';
  const safeCategory = Number.isInteger(category) && category > 0 ? category : 0;

  const url = new URL('https://opentdb.com/api.php');
  url.searchParams.set('amount', String(safeAmount));
  if (safeCategory !== 0) {
    url.searchParams.set('category', String(safeCategory));
  }
  if (safeDifficulty !== 'any') {
    url.searchParams.set('difficulty', safeDifficulty);
  }
  url.searchParams.set('type', 'multiple');
  url.searchParams.set('encode', 'url3986');

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data.results as OpenTDBQuestion[];
  } catch (err) {
    throw new Error('Failed to fetch questions');
  }
}

/**
 * Fetch category list from OpenTDB.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    return data.trivia_categories as Category[];
  } catch {
    return [];
  }
}

export type { OpenTDBQuestion, Category };
