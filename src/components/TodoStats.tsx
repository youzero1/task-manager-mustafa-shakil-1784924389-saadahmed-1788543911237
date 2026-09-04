interface TodoStatsProps {
  total: number;
  completed: number;
}

function TodoStats({ total, completed }: TodoStatsProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
        <span>
          {completed} of {total} task{total === 1 ? '' : 's'} completed
        </span>
        <span className="font-semibold transition-smooth" style={{ color: 'var(--accent)' }}>
          {pct}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
        <div
          key={pct}
          className="h-full rounded-full transition-all duration-700 ease-out animate-progress-fill relative overflow-hidden"
          style={{
            width: `${pct}%`,
            backgroundImage: `linear-gradient(90deg, var(--accent), var(--accent-2))`,
          }}
        >
          {pct > 0 && pct < 100 && <div className="absolute inset-0 animate-shimmer" />}
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
