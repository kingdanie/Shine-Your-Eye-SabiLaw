import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from './keys';
import type { MockProfile, TopicInterest } from './types';

async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function setJSON(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// ---- Onboarding ----

export async function getHasSeenOnboarding(): Promise<boolean> {
  return (await AsyncStorage.getItem(STORAGE_KEYS.hasSeenOnboarding)) === '1';
}

export async function setHasSeenOnboarding(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.hasSeenOnboarding, '1');
}

export async function getInterests(): Promise<TopicInterest[]> {
  return (await getJSON<TopicInterest[]>(STORAGE_KEYS.interests)) ?? [];
}

export async function setInterests(interests: TopicInterest[]): Promise<void> {
  await setJSON(STORAGE_KEYS.interests, interests);
}

// ---- Language ----

export type LanguageCode = 'en' | 'pcm';

export async function getStoredLanguage(): Promise<LanguageCode | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.language);
  return raw === 'en' || raw === 'pcm' ? raw : null;
}

export async function setStoredLanguage(language: LanguageCode): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.language, language);
}

// ---- Mock profile / local auth ----

export async function getProfile(): Promise<MockProfile | null> {
  return getJSON<MockProfile>(STORAGE_KEYS.profile);
}

export async function setProfile(profile: MockProfile): Promise<void> {
  await setJSON(STORAGE_KEYS.profile, profile);
}

export async function clearProfile(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEYS.profile);
}

export * from './types';
