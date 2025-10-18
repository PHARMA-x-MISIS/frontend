// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { RegistrationProvider } from '../../src/lib/contexts/RegistrationContext';

export default function AuthLayout() {
  return (
    <RegistrationProvider>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="register-step2" />
        <Stack.Screen name="register-step3" />
        <Stack.Screen name="register-step4" />
        <Stack.Screen name="register-step5" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </RegistrationProvider>
  );
}