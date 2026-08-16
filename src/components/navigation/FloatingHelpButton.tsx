import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { colors, elevation } from '@/theme';

const SIZE = 56;

/**
 * The 1-tap fast path to Help & Support from Home (PRD: "≤2 taps to help").
 * Kept in the everyday brand green, matching the uploaded design — it's a
 * general help shortcut (emergency contacts + lawyer directory), not itself
 * an alarm, so it deliberately does NOT use the reserved emergency-crimson
 * accent (that's reserved for actual emergency contact cards/errors).
 */
export function FloatingHelpButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Get help"
      style={styles.button}>
      <Ionicons name="help" size={26} color={colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.sticky,
  },
});
