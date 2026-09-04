import { useEffect, useState } from 'react';
import type { NewTodoInput, Subtask, Todo } from '@/types/todo';

function normalize(raw: unknown): Todo[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const t = item as Partial<Todo> & { id: string; text: string; completed: boolean };
    return {
      id: t.id,
      text: t.text,
      completed: !!t.completed,
      createdAt: t.createdAt ?? Date.now(),
      priority: t.priority ?? 'medium',
      category: t.category ?? '',
      dueDate: t.dueDate ?? null,
      notes: t.notes ?? '',
      subtasks: Array.isArray(t.subtasks) ? t.subtasks : [],
    };
  });
}

export function useTodos(storageKey: string) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    try {
      setTodos(raw ? normalize(JSON.parse(raw)) : []);
    } catch {
      setTodos([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  function addTodo(input: NewTodoInput) {
    const trimmed = input.text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
        priority: input.priority,
        category: input.category.trim(),
        dueDate: input.dueDate,
        notes: input.notes.trim(),
        subtasks: [],
      },
    ]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, updates: Partial<Todo>) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function addSubtask(todoId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const subtask: Subtask = { id: crypto.randomUUID(), text: trimmed, completed: false };
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, subtasks: [...t.subtasks, subtask] } : t)),
    );
  }

  function toggleSubtask(todoId: string, subtaskId: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s,
              ),
            }
          : t,
      ),
    );
  }

  function deleteSubtask(todoId: string, subtaskId: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subtaskId) } : t,
      ),
    );
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  };
}
