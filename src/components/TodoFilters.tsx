export type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

function TodoFilters({ filter, onFilterChange, onClearCompleted, hasCompleted }: TodoFiltersProps) {
  const options: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onFilterChange(opt)}
            className="px-3 py-1.5 rounded-lg capitalize transition-smooth font-medium active-press hover:scale-105"
            style={
              filter === opt
                ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }
                : { color: 'var(--text-muted)' }
            }
            onMouseEnter={(e) => {
              if (filter !== opt) e.currentTarget.style.backgroundColor = 'var(--chip-hover)';
            }}
            onMouseLeave={(e) => {
              if (filter !== opt) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="hover:text-red-500 transition-smooth active-press animate-fade-up"
          style={{ color: 'var(--text-muted)' }}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
