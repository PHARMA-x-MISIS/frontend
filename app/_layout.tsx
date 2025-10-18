// app/_layout.tsx (Финальная объединенная версия)
import React, { useEffect } from 'react';
import { Stack, router, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

// 1. Импортируем наш AuthProvider
import { AuthProvider, useAuth } from 'src/lib/contexts/AuthContext';

// 2. Импортируем глобальные стили (Nativewind)
import '../global.css';

// 3. Предотвращаем автоматическое скрытие сплэш-скрина, пока шрифты не загрузятся
SplashScreen.preventAutoHideAsync();

/**
 * Этот компонент отвечает за навигацию и решает, куда направить пользователя.
 * Он вызывается ПОСЛЕ загрузки шрифтов и ВНУТРИ AuthProvider.
 */
function RootNavigation() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    // Ничего не делаем, пока идет первоначальная проверка токена
    if (isLoading) {
      return;
    }

    if (token) {
      // Если токен есть, пользователь авторизован -> отправляем в приложение
      router.replace('/(main)/profile');
    } else {
      // Если токена нет -> отправляем на экран онбординга
      router.replace('/(auth)/onboarding');
    }
  }, [token, isLoading]);

  // Пока AuthContext проверяет токен, показываем индикатор загрузки.
  // Это предотвращает "мерцание" экранов.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Этот Stack будет рендерить либо (auth) layout, либо (main) layout
  return <Stack screenOptions={{ headerShown: false }} />;
}

/**
 * Это корневой Layout всего приложения.
 * Он отвечает за загрузку ресурсов и предоставление глобальных контекстов.
 */
export default function RootLayout() {
  // 4. Загружаем шрифты
  const [fontsLoaded, fontError] = useFonts({
    'Onest-Regular': require('../assets/fonts/Onest-Regular.ttf'),
    'Onest-Medium': require('../assets/fonts/Onest-Medium.ttf'),
    'Onest-SemiBold': require('../assets/fonts/Onest-SemiBold.ttf'),
    'Onest-ExtraBold': require('../assets/fonts/Onest-ExtraBold.ttf'),
  });

  // 5. Скрываем сплэш-скрин, когда шрифты загружены (или если произошла ошибка)
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Если шрифты еще не загружены, не рендерим ничего, чтобы сплэш-скрин оставался видимым
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // 6. Рендерим структуру приложения с провайдерами
  return (
    // AuthProvider должен быть одним из самых внешних, чтобы все приложение имело доступ к useAuth
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {/* RootNavigation теперь вызывается здесь, когда все готово */}
        <RootNavigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}