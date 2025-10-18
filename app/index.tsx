// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Здесь позже проверишь токен авторизации
    const isAuthenticated = false; // Пока false
    
    // Небольшая задержка для красоты (опционально)
    setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(main)/profile');
      } else {
        router.replace('/(main)/create-step1');
      }
    }, 500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#E94975" />
    </View>
  );
}