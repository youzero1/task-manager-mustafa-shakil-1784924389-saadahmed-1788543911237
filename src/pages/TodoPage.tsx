import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters, { FilterType } from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import TodoSearchSort from '@/components/TodoSearchSort';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { PRIORITY_ORDER } from '@/types/todo';
import type { SortOption } from '@/types/todo';
import type { AuthUser } from '@/types/auth';

interface TodoPageProps {
  user: AuthUser;
  onSignOut: () => Promise<void>;
}

function TodoPage({ user, onSignOut }: TodoPageProps) {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  } = useTodos(`todos_${user.id}`);
  const { theme, setTheme } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('created');
  const [category, setCategory] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(todos.map((t) => t.category).filter(Boolean))).sort(),
    [todos],
  );

  const visibleTodos = useMemo(() => {
    let result = todos;

    if (filter === 'active') result = result.filter((t) => !t.completed);
    if (filter === 'completed') result = result.filter((t) => t.completed);
    if (category) result = result.filter((t) => t.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.text.toLowerCase().includes(q) ||
          t.notes.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    const sorted = [...result];
    sorted.sort((a, b) => {
      if (sort === 'name') return a.text.localeCompare(b.text);
      if (sort === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sort === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return a.createdAt - b.createdAt;
    });
    return sorted;
  }, [todos, filter, category, search, sort]);

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-2xl rounded-3xl glass border shadow-glow p-6 sm:p-8 animate-fade-up"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <Link
              to="/"
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Home
            </Link>
            <h1 className="text-3xl font-display font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
              My Tasks
            </h1>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                {user.email}
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="text-xs hover:underline"
                style={{ color: 'var(--text-muted)' }}
              >
                Sign out
              </button>
            </div>
            <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
          </div>
        </div>

        <div className="mb-4">
          <TodoInput onAdd={addTodo} categories={categories} />
        </div>

        <TodoStats total={todos.length} completed={todos.filter((t) => t.completed).length} />

        <TodoSearchSort
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />

        <div className="mb-3 flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
          <span>{remaining} task{remaining === 1 ? '' : 's'} remaining</span>
        </div>

        <div className="mb-4">
          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
          />
        </div>

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />
      </div>
    </div>
  );
}

export default TodoPage;
