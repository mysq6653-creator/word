import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF8E7' },
          headerTintColor: '#2B2B2B',
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: '#FFF8E7' },
        }}
      >
        <Stack.Screen name="index" options={{ title: '아기 낱말카드' }} />
        <Stack.Screen
          name="cards/[category]"
          options={{ title: '카드', headerBackTitle: '홈' }}
        />
        <Stack.Screen name="settings" options={{ title: '설정' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
