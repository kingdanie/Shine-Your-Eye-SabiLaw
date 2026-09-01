import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, type ColorValue } from 'react-native';

import { useTranslation } from '@/i18n';
import { colors, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

function tabIcon(active: IconName, inactive: IconName) {
  return ({ focused, color, size }: { focused: boolean; color: ColorValue; size: number }) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color as string} />
  );
}

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontFamily: typography.labelSm.fontFamily, fontSize: 12 },
        tabBarStyle: {
          backgroundColor: colors.surfaceCard,
          borderTopColor: colors.borderSubtle,
          height: Platform.select({ ios: 88, default: 64 }),
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{ title: t('tabs.home'), tabBarIcon: tabIcon('home', 'home-outline') }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('tabs.chat'),
          tabBarIcon: tabIcon('chatbubble-ellipses', 'chatbubble-ellipses-outline'),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: t('tabs.history'), tabBarIcon: tabIcon('time', 'time-outline') }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: tabIcon('person-circle', 'person-circle-outline'),
        }}
      />
    </Tabs>
  );
}
