import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { LegalSourceScreen } from '@/screens/source/LegalSourceScreen';

export default function SourceRoute() {
  const { qaId } = useLocalSearchParams<{ qaId: string }>();
  return <LegalSourceScreen qaId={qaId} />;
}
