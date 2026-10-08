/** Jeden úkol v seznamu. */
export type Todo = {
  /** Unikátní identifikátor – zabraňuje tomu, aby se smíchaly dva stejné úkoly. */
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};