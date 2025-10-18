// app/(main)/_layout.tsx
import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="feed" />
      <Stack.Screen name="(community)" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}