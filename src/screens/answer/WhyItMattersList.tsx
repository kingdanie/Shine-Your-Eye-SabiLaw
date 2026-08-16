import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';
import type { WhyItMattersStep } from '@/db';

interface WhyItMattersListProps {
  steps: WhyItMattersStep[];
  resolveText: (key: string) => string;
}

/** Numbered vertical list with a connecting line and a trailing icon per
 * step, matching the Answer screen mockup's "Here's why" section. */
export function WhyItMattersList({ steps, resolveText }: WhyItMattersListProps) {
  return (
    <View>
      {steps.map((step, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.numberCol}>
            <View style={styles.numberCircle}>
              <AppText variant="labelSm" color={colors.onPrimary}>
                {index + 1}
              </AppText>
            </View>
            {index < steps.length - 1 && <View style={styles.connector} />}
          </View>
          <AppText variant="bodyMd" style={styles.text}>
            {resolveText(step.textKey)}
          </AppText>
          <View style={styles.iconWrap}>
            <Ionicons name={step.icon as keyof typeof Ionicons.glyphMap} size={18} color={colors.primary} />
          </View>
        </View>
      ))}
    </View>
  );
}

const NUMBER_SIZE = 28;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  numberCol: {
    alignItems: 'center',
    width: NUMBER_SIZE,
  },
  numberCircle: {
    width: NUMBER_SIZE,
    height: NUMBER_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: spacing.md,
    backgroundColor: colors.borderSubtle,
    marginVertical: 2,
  },
  text: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
  },
});
