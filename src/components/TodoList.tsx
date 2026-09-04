import type { Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
}

function TodoList({ todos, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center py-8 animate-fade-up" style={{ color: 'var(--text-muted)' }}>
        No tasks here. Add one above to get started!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          staggerDelay={Math.min(i, 10) * 40}
          onToggle={onToggle}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  );
}

export default TodoList;
