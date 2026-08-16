import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

interface TextFieldProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  accessibilityLabel: string;
  rightSlot?: React.ReactNode;
}

/** 64px input field, 24px "approachable" radius; border turns primary-green on focus. */
export function TextField({
  icon,
  isPassword,
  accessibilityLabel,
  rightSlot,
  style,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(isPassword);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      {icon && <Ionicons name={icon} size={20} color={colors.textMuted} style={styles.icon} />}
      <TextInput
        {...rest}
        secureTextEntry={hidden}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={accessibilityLabel}
        allowFontScaling
        style={[styles.input, style]}
      />
      {isPassword && (
        <Pressable
          onPress={() => setHidden((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          hitSlop={12}
          style={styles.eyeToggle}>
          <Ionicons
            name={hidden ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.textMuted}
          />
        </Pressable>
      )}
      {rightSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.citationBorder,
    backgroundColor: colors.surfaceInput,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  icon: {
    marginRight: 2,
  },
  eyeToggle: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.md,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    // RN Web adds a native focus ring on top of our own border treatment.
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
});
