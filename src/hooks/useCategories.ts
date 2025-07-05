import { useState, useEffect } from 'react';
import type { Category } from '../types';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch(() => {
        // If fetch fails, categories stay empty (user sees only "Any Category")
      });
  }, []);

  return { categories };
}
