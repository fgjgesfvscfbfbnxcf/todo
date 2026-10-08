import { useCallback, useEffect, useRef, useState } from 'react';

import { loadTodos, saveTodos } from '../storage';
import type { Todo } from '../types';

let idCounter = 0;

/** Jednoduchý generátor ID – kombinace času a pořadí. */
function createId(): string {
  idCounter += 1;
  return `${Date.now().toString(36)}-${idCounter}`;
}

/**
 * Veškerý stav aplikace (seznam + ukládání do AsyncStorage) na jednom místě.
 * Komponenta pak jen volá addTodo / toggleTodo / deleteTodo.
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1) Při startu načteme uložené úkoly.
  useEffect(() => {
    let isActive = true;

    loadTodos().then((loaded) => {
      if (!isActive) {
        return;
      }
      setTodos(loaded);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, []);

  // 2) Kdykoli se seznam změní, uložíme ho. První běh přeskočíme,
  //    aby se hned po startu nepřepsalo prázdné pole.
  const isFirstSave = useRef(true);

  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((rawTitle: string): boolean => {
    const title = rawTitle.trim();

    // Prázdný (nebo jen whitespace) úkol nepřidáme.
    if (title.length === 0) {
      return false;
    }

    const todo: Todo = {
      id: createId(),
      title,
      done: false,
      createdAt: Date.now(),
    };

    setTodos((previous) => [todo, ...previous]);
    return true;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((previous) => previous.filter((todo) => !todo.done));
  }, []);

  return { todos, isLoading, addTodo, toggleTodo, deleteTodo, clearCompleted };
}