import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Todo } from './types';

/** Klíč, pod kterým ukládáme úkoly do AsyncStorage. */
const STORAGE_KEY = 'todo-expo:items:v1';

/** Načte uložené úkoly. Když je chyba nebo data nejsou správný JSON, vrátí prázdný seznam. */
export async function loadTodos(): Promise<Todo[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Todo[]) : [];
  } catch (error) {
    console.warn('Úkoly se nepodařilo načíst:', error);
    return [];
  }
}

/** Uloží úkoly, aby přetrvaly i po zavření aplikace. */
export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn('Úkoly se nepodařilo uložit:', error);
  }
}