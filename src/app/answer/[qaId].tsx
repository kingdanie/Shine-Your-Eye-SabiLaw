import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { AnswerScreen } from '@/screens/answer/AnswerScreen';

export default function AnswerRoute() {
  const { qaId } = useLocalSearchParams<{ qaId: string }>();
  return <AnswerScreen qaId={qaId} />;
}
