import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { LanguageCode } from '@/storage';

import { speak as speakText, stop as stopSpeech } from './facade';

interface UseSpeakResult {
  /** True while an utterance is playing. */
  speaking: boolean;
  /** Speak, or stop if this is already playing. */
  toggle: (text: string, language: LanguageCode) => Promise<void>;
  stop: () => Promise<void>;
}

/**
 * Read-aloud state for a screen.
 *
 * Speech is a process that outlives the component that started it, so this stops on
 * unmount *and* on navigation blur — otherwise an answer keeps being read after the
 * user has moved on, with no visible control to stop it.
 */
export function useSpeak(): UseSpeakResult {
  const [speaking, setSpeaking] = useState(false);
  // Native callbacks can fire after unmount; without this they'd set state on a
  // component that no longer exists.
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void stopSpeech();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        void stopSpeech();
        if (mounted.current) setSpeaking(false);
      };
    }, [])
  );

  const stop = useCallback(async () => {
    await stopSpeech();
    if (mounted.current) setSpeaking(false);
  }, []);

  const toggle = useCallback(
    async (text: string, language: LanguageCode) => {
      if (speaking) {
        await stop();
        return;
      }

      const settle = () => {
        if (mounted.current) setSpeaking(false);
      };

      // Set optimistically: onStart can lag by a beat on Android, and a button that
      // doesn't respond to the first tap reads as broken.
      setSpeaking(true);

      try {
        await speakText({
          text,
          language,
          onDone: settle,
          onStopped: settle,
          onError: settle,
        });
      } catch {
        settle();
      }
    },
    [speaking, stop]
  );

  return { speaking, toggle, stop };
}
