import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

interface IconBadgeProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  iconColor?: string;
}

/** Circular tinted icon badge — topic cards, "why it matters" steps, etc. */
export function IconBadge({
  name,
  size = 48,
  iconSize,
  backgroundColor = colors.secondaryContainer,
  iconColor = colors.primary,
}: IconBadgeProps) {
  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: radius.full, backgroundColor },
      ]}>
      <Ionicons name={name} size={iconSize ?? size * 0.5} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
