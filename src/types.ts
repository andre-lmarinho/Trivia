// Types from the OpenTDB API
export interface OpenTDBQuestion {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}