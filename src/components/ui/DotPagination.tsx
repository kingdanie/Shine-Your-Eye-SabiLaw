import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

interface DotPaginationProps {
  count: number;
  activeIndex: number;
}

export function DotPagination({ count, activeIndex }: DotPaginationProps) {
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceDim,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
});
