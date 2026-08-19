import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { ConstitutionSectionScreen } from '@/screens/constitution/ConstitutionSectionScreen';

export default function ConstitutionSectionRoute() {
  const { sectionId } = useLocalSearchParams<{ sectionId: string }>();
  return <ConstitutionSectionScreen sectionId={sectionId} />;
}
