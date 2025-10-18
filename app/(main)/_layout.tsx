// app/(main)/_layout.tsx (Исправленная версия)
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from 'src/lib/contexts/AuthContext';
// Убедитесь, что иконки существуют и пути правильные
import { ProfileIcon, CommunityIcon } from 'components/icons'; 

export default function MainAppLayout() {
  const { token } = useAuth();

  // "Охранник" маршрутов: если пользователь как-то попал сюда без токена,
  // немедленно перенаправляем его на экран входа.
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
  // Возвращаем настроенный навигатор с вкладками
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E94975',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="feed" // Этот экран будет первым
        options={{
          title: 'Новости',
          tabBarIcon: ({ color }) => <CommunityIcon color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="services" // Вам нужно будет создать файл app/(main)/services.tsx
        options={{
          title: 'Сервисы',
          tabBarIcon: ({ color }) => <CommunityIcon color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}