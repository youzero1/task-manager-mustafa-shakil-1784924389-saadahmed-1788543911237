import type { SortOption } from '@/types/todo';

interface TodoSearchSortProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'created', label: 'Date created' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'name', label: 'Name' },
];

function TodoSearchSort({
  search,
  onSearchChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}: TodoSearchSortProps) {
  const inputStyle = {
    borderColor: 'var(--border)',
    color: 'var(--text)',
    backgroundColor: 'var(--surface-solid)',
  };

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
        style={inputStyle}
      />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-lg border px-3 py-2 text-sm focus:outline-none"
        style={inputStyle}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      {categories.length > 0 && (
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm focus:outline-none"
          style={inputStyle}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default TodoSearchSort;
