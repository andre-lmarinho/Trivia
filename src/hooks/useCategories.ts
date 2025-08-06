import { useState, useEffect } from 'react';
import { getCategories, type Category } from '../api/opentdb';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return { categories };
}
