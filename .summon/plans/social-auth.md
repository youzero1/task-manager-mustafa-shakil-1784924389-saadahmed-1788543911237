---
status: implemented (removed)
title: Add Social Login to the To-Do App
---

1. src/lib/supabaseClient.ts — Set up a connection to Supabase, which will handle social sign-in (Google) securely. This requires the user's Supabase account to be connected before implementation.
2. src/pages/Login.tsx — Create a login screen with a "Continue with Google" button, shown to users who are not signed in.
3. src/hooks/useAuth.ts — Create a hook that tracks whether someone is signed in, keeps that state up to date, and exposes sign-in/sign-out actions.
4. src/App.tsx — Show the Login screen when no one is signed in, and show the to-do list once signed in. Add a "Sign out" button near the task list.
5. src/pages/TodoApp.tsx — Update the to-do list so each person only sees and manages their own tasks, tied to their signed-in account.
6. src/types/auth.ts — Define the shape of the signed-in user's information (name, email, avatar) used across the app.

Outcome: Visitors see a sign-in screen with a Google login button. After signing in, they see their personalized to-do list and can sign out at any time. Tasks are private to each signed-in user.
