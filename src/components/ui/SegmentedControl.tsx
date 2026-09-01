import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface Segment {
  value: string;
  label: string;
  /** Optional leading glyph, e.g. a bookmark beside "Saved". */
  icon?: keyof typeof Ionicons.glyphMap;
}

interface SegmentedControlProps {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
}

/** Two (or more) pill-shaped tabs sharing one track — e.g. Saved / Recent. */
export function SegmentedControl({ segments, value, onChange }: SegmentedControlProps) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {segments.map((segment) => {
        const active = segment.value === value;
        return (
          <Pressable
            key={segment.value}
            onPress={() => onChange(segment.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={segment.label}
            style={[styles.segment, active && styles.activeSegment]}>
            {segment.icon && (
              <Ionicons
                name={segment.icon}
                size={18}
                color={active ? colors.onPrimary : colors.textSecondary}
              />
            )}
            <AppText variant="labelMd" color={active ? colors.onPrimary : colors.textSecondary}>
              {segment.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.full,
    padding: spacing.xs / 2,
    gap: spacing.xs / 2,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.full,
  },
  activeSegment: {
    backgroundColor: colors.primary,
  },
});
