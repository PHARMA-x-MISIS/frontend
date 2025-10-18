// app/(main)/_layout.tsx
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from 'src/lib/contexts/AuthContext';
// Импортируем наши новые иконки
import { ProfileIcon, CommunityIcon } from 'components/icons';

export default function MainAppLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E94975', // Цвет активной иконки и текста
        tabBarInactiveTintColor: '#9CA3AF', // Цвет неактивной иконки и текста
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Цвет фона панели вкладок
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontFamily: 'Onest-Medium', // Ваш кастомный шрифт
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          // Здесь мы используем компонент иконки.
          // Expo Tabs автоматически передает в него prop `color`.
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Лента',
          tabBarIcon: ({ color }) => <CommunityIcon color={color} size={26} />,
        }}
      />
      {/* Другие вкладки вашего приложения... */}
    </Tabs>
  );
}