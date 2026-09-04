export type Priority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: Priority;
  category: string;
  dueDate: string | null; // ISO date (yyyy-mm-dd)
  notes: string;
  subtasks: Subtask[];
}

export interface NewTodoInput {
  text: string;
  priority: Priority;
  category: string;
  dueDate: string | null;
  notes: string;
}

export type SortOption = 'created' | 'dueDate' | 'priority' | 'name';

export const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#dc2626',
  medium: '#d97706',
  low: '#16a34a',
};
