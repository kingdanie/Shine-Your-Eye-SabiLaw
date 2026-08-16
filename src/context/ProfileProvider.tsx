import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { clearProfile, getProfile, setProfile, type MockProfile } from '@/storage';

interface ProfileContextValue {
  profile: MockProfile | null;
  isLoggedIn: boolean;
  ready: boolean;
  /** Local-only mock "auth" — see plan: any identifier is accepted, no backend involved. */
  signIn: (identifier: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<MockProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await getProfile();
      if (!cancelled) {
        setProfileState(stored);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (identifier: string, displayName?: string) => {
    const next: MockProfile = {
      identifier,
      displayName: displayName?.trim() || identifier,
      createdAt: Date.now(),
    };
    await setProfile(next);
    setProfileState(next);
  }, []);

  const signOut = useCallback(async () => {
    await clearProfile();
    setProfileState(null);
  }, []);

  const value = useMemo(
    () => ({ profile, isLoggedIn: !!profile, ready, signIn, signOut }),
    [profile, ready, signIn, signOut]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
}
