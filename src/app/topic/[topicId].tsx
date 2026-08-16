import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { TopicLandingScreen } from '@/screens/topic/TopicLandingScreen';

export default function TopicRoute() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  return <TopicLandingScreen topicId={topicId} />;
}
