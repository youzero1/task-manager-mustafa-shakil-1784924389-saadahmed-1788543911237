import { useState, FormEvent } from 'react';
import type { Todo } from '@/types/todo';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  staggerDelay?: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
}

function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function formatDate(dueDate: string): string {
  const d = new Date(dueDate);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function TodoItem({ todo, staggerDelay = 0, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }: TodoItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [subtaskText, setSubtaskText] = useState('');
  const [justToggled, setJustToggled] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const overdue = isOverdue(todo.dueDate, todo.completed);
  const completedSubtasks = todo.subtasks.filter((s) => s.completed).length;
  const hasDetails = todo.notes || todo.subtasks.length > 0;

  function handleAddSubtask(e: FormEvent) {
    e.preventDefault();
    if (!subtaskText.trim()) return;
    onAddSubtask(todo.id, subtaskText);
    setSubtaskText('');
  }

  function handleToggle() {
    setJustToggled(true);
    onToggle(todo.id);
    window.setTimeout(() => setJustToggled(false), 350);
  }

  function handleDelete() {
    setLeaving(true);
    window.setTimeout(() => onDelete(todo.id), 200);
  }

  return (
    <li
      className={`animate-slide-in rounded-2xl px-4 py-3.5 shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        leaving ? 'opacity-0 scale-95 -translate-x-2' : ''
      }`}
      style={{
        backgroundColor: 'var(--surface-solid)',
        borderColor: 'var(--border)',
        transitionDuration: leaving ? '200ms' : undefined,
        animationDelay: `${staggerDelay}ms`,
      }}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={`h-5 w-5 rounded-md shrink-0 cursor-pointer transition-transform ${justToggled ? 'animate-check-pop' : ''}`}
          style={{ accentColor: 'var(--accent)' }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={todo.completed ? 'line-through' : ''}
              style={{ color: todo.completed ? 'var(--text-muted)' : 'var(--text)' }}
            >
              {todo.text}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${PRIORITY_COLORS[todo.priority]}22`, color: PRIORITY_COLORS[todo.priority] }}
            >
              {PRIORITY_LABELS[todo.priority]}
            </span>
            {todo.category && (
              <span
                className="rounded-full px-2 py-0.5 text-xs"
                style={{ backgroundColor: 'var(--chip-hover)', color: 'var(--text-muted)' }}
              >
                {todo.category}
              </span>
            )}
            {todo.dueDate && (
              <span
                className="rounded-full px-2 py-0.5 text-xs"
                style={{
                  backgroundColor: overdue ? '#dc262622' : 'var(--chip-hover)',
                  color: overdue ? '#dc2626' : 'var(--text-muted)',
                }}
              >
                {overdue ? 'Overdue: ' : 'Due '}
                {formatDate(todo.dueDate)}
              </span>
            )}
            {todo.subtasks.length > 0 && (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {completedSubtasks}/{todo.subtasks.length} subtasks
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs shrink-0 transition-smooth hover:scale-105 active-press"
          style={{ color: 'var(--text-muted)' }}
        >
          {expanded ? 'Hide' : hasDetails ? 'Details' : 'Add details'}
        </button>
        <button
          onClick={handleDelete}
          className="hover:text-red-500 transition-smooth hover:scale-125 active-press shrink-0"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>

      {expanded && (
        <div className="mt-3 ml-8 flex flex-col gap-3 animate-fade-up" style={{ animationDuration: '0.25s' }}>
          {todo.notes && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {todo.notes}
            </p>
          )}

          {todo.subtasks.length > 0 && (
            <ul className="flex flex-col gap-1">
              {todo.subtasks.map((s) => (
                <li key={s.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={s.completed}
                    onChange={() => onToggleSubtask(todo.id, s.id)}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  <span
                    className={`flex-1 ${s.completed ? 'line-through' : ''}`}
                    style={{ color: s.completed ? 'var(--text-muted)' : 'var(--text)' }}
                  >
                    {s.text}
                  </span>
                  <button
                    onClick={() => onDeleteSubtask(todo.id, s.id)}
                    className="hover:text-red-500 transition text-xs"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Delete subtask"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddSubtask} className="flex gap-2">
            <input
              type="text"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              placeholder="Add a subtask..."
              className="flex-1 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--surface-solid)' }}
            />
            <button
              type="submit"
              className="rounded-lg px-3 py-1.5 text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              Add
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
