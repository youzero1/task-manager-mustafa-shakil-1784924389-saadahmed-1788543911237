---
status: implemented
title: Simple To-Do App
---

1. src/types/todo.ts — Define a shared type for a to-do item, including an id, text/title, and a completed flag.

2. src/hooks/useTodos.ts — Create a custom hook that manages the list of to-do items in state, persists them to browser local storage, and exposes functions to add a todo, toggle its completed state, delete it, and clear completed items.

3. src/components/TodoInput.tsx — Build an input field with an "Add" button that lets the user type a new task and submit it (via button click or pressing Enter). Clears the field after adding.

4. src/components/TodoItem.tsx — Build a single row component showing a checkbox to mark complete, the task text (styled with a strikethrough when completed), and a delete button.

5. src/components/TodoList.tsx — Build a component that renders the list of TodoItem rows, plus a friendly empty-state message when there are no tasks.

6. src/components/TodoFilters.tsx — Build filter controls (All / Active / Completed) so the user can view subsets of tasks, and a "Clear completed" button.

7. src/pages/TodoPage.tsx — Compose TodoInput, TodoFilters, and TodoList together using the useTodos hook, with a page title, a counter showing remaining active tasks, and centered card-style layout using Tailwind for a clean modern look.

8. src/App.tsx — Set the app's main view to render TodoPage.

9. src/styles/global.css — Ensure Tailwind base/components/utilities directives are present; add a subtle background color and centered page layout styling for a polished appearance.

Expected outcome: A fully working to-do list app where users can add tasks, mark them complete, delete them, filter by status, clear completed tasks, and have their list remembered between visits.
