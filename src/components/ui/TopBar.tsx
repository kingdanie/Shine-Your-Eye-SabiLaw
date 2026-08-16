import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { AppText } from './AppText';
import { IconButton } from './IconButton';

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  rightSlot?: React.ReactNode;
}

/** Shared screen header: optional back/close control, centered title, right-side actions. */
export function TopBar({ title, onBack, onClose, rightSlot }: TopBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBack && <IconButton name="arrow-back" accessibilityLabel="Go back" onPress={onBack} />}
        {onClose && <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />}
      </View>
      {title ? (
        <AppText variant="headlineSm" numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}
      <View style={[styles.side, styles.rightSide]}>{rightSlot}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  side: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
