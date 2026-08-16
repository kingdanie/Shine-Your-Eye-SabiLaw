import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/theme';

interface VoiceFABProps {
  active: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}

const SIZE = 80;

/** "Voice FAB" — 80px circular mic button with a pulsating tertiary-green ring while active. */
export function VoiceFAB({ active, onPress, accessibilityLabel }: VoiceFABProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (active) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    } else {
      pulse.value = withTiming(0, { duration: 200 });
    }
  }, [active, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: active ? 1 - pulse.value : 0,
    transform: [{ scale: 1 + pulse.value * 0.6 }],
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      style={styles.wrap}>
      <Animated.View style={[styles.ring, ringStyle]} />
      <Animated.View style={[styles.button, active && styles.buttonActive]}>
        <Ionicons name="mic" size={32} color={colors.onPrimary} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.tertiaryFixedDim,
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: colors.tertiary,
  },
});
