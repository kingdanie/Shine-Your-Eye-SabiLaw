import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { IconButton } from './IconButton';

interface EmergencyCardProps {
  title: string;
  description?: string;
  phone: string;
  verified: boolean;
  onCall: () => void;
}

/** "Emergency Card" — 8px solid crimson left-border, bypasses soft elevation
 * for high-contrast urgency, per spec. Reserved for Help & Support only. */
export function EmergencyCard({ title, description, phone, verified, onCall }: EmergencyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <AppText variant="labelMd">{title}</AppText>
        {description && (
          <AppText variant="caption" color={colors.textSecondary} style={styles.description}>
            {description}
          </AppText>
        )}
        <AppText variant="caption" color={colors.textMuted}>
          {phone}
          {!verified ? '  ·  unverified placeholder' : ''}
        </AppText>
      </View>
      <IconButton
        name="call"
        accessibilityLabel={`Call ${title}`}
        onPress={onCall}
        backgroundColor={colors.emergency}
        color={colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderLeftWidth: 8,
    borderLeftColor: colors.emergency,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceCard,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  description: {
    marginBottom: 2,
  },
});
