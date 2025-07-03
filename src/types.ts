// Types from the OpenTDB API
export interface OpenTDBQuestion {
  category: string;
  type: "multiple" | "boolean";
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/** Category object from OpenTDB */
export interface Category {
  id: number;
  name: string;
}

/** Quiz configuration settings */
export interface Settings {
  theme:
    | "default"
    | "night"
    | "matrix"
    | "aquatic"
    | "desert"
    | "farm"
    | "pink";
  category: number; // category ID (0 = any)
  amount: number; // how many questions to fetch
  difficulty: "any" | "easy" | "medium" | "hard";
}
