import React from 'react';

import { useTranslation } from '@/i18n';
import { colors } from '@/theme';

import { IconButton } from './IconButton';

interface SpeakButtonProps {
  /** True while this content is being read aloud. */
  speaking: boolean;
  onPress: () => void;
}

/** Read-aloud toggle. Sits alongside bookmark/share in a screen's `TopBar` right slot. */
export function SpeakButton({ speaking, onPress }: SpeakButtonProps) {
  const { t } = useTranslation();

  return (
    <IconButton
      name={speaking ? 'stop-circle' : 'volume-high-outline'}
      accessibilityLabel={t(speaking ? 'answer.stopReading' : 'answer.readAloud')}
      color={speaking ? colors.primary : colors.textPrimary}
      onPress={onPress}
    />
  );
}
