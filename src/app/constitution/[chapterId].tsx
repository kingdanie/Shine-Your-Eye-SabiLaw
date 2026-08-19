import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { ConstitutionChapterScreen } from '@/screens/constitution/ConstitutionChapterScreen';

export default function ConstitutionChapterRoute() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  return <ConstitutionChapterScreen chapterId={chapterId} />;
}
