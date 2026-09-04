import { useEffect, useState } from 'react';
import { supabase, signInWithGoogle, signOut, toAuthUser } from '@/lib/supabaseClient';
import type { AuthUser } from '@/types/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? toAuthUser(data.session.user) : null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? toAuthUser(session.user) : null);
      setLoading(false);
      if (session) setAuthError(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (e: any) {
      setAuthError(e?.message ?? 'Sign-in failed. Please try again.');
    }
  }

  async function logout() {
    try {
      await signOut();
    } catch (e: any) {
      setAuthError(e?.message ?? 'Sign-out failed.');
    }
    setUser(null);
  }

  return { user, loading, authError, signIn, logout };
}
