import { useState, FormEvent } from 'react';
import type { NewTodoInput, Priority } from '@/types/todo';

interface TodoInputProps {
  onAdd: (input: NewTodoInput) => void;
  categories: string[];
}

const inputStyle = {
  borderColor: 'var(--border)',
  color: 'var(--text)',
  backgroundColor: 'var(--surface-solid)',
};

function TodoInput({ onAdd, categories }: TodoInputProps) {
  const [text, setText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [shake, setShake] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
      return;
    }
    onAdd({ text, priority, category, dueDate: dueDate || null, notes });
    setText('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    setNotes('');
    setShowMore(false);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 350);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className={`flex gap-2 ${shake ? 'animate-shake' : ''}`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 transition-smooth"
          style={{ ...inputStyle, boxShadow: 'none' }}
        />
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="rounded-xl border px-3 py-2.5 text-sm transition-smooth hover:-translate-y-0.5 active-press"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          {showMore ? 'Less' : 'Details'}
        </button>
        <button
          type="submit"
          className={`rounded-xl px-5 py-2.5 font-semibold shadow-md transition-smooth hover:-translate-y-0.5 hover:shadow-lg active-press ${
            justAdded ? 'animate-bounce-in' : ''
          }`}
          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
        >
          Add
        </button>
      </div>

      {showMore && (
        <div className="grid grid-cols-1 gap-2 rounded-xl border p-3 sm:grid-cols-2 animate-pop-in" style={{ borderColor: 'var(--border)' }}>
          <div>
            <label className="mb-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Work"
              list="category-options"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            />
            <datalist id="category-options">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="mb-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional details..."
              rows={2}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoInput;
