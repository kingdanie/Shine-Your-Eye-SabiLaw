import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppGate, ProfileProvider } from '@/context';
import { LanguageProvider } from '@/i18n';
import { colors } from '@/theme';
import { appFonts } from '@/theme/fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(appFonts);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <ProfileProvider>
            <AppGate fontsLoaded={fontsLoaded}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.screenBackground },
                }}>
                <Stack.Screen name="ask" options={{ presentation: 'modal' }} />
                <Stack.Screen name="source/[qaId]" options={{ presentation: 'modal' }} />
              </Stack>
            </AppGate>
          </ProfileProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
