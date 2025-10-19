// app/(main)/_layout.tsx (Новая правильная версия)
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from 'src/lib/contexts/AuthContext';
import { 
  ProfileIcon, 
  CommunityIcon, 
  ServiceIcon,
  ChatIcon 
} from 'components/icons'; 

export default function MainAppLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E94975',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontFamily: 'Onest-Medium', fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white', borderTopColor: '#e5e7eb' },
      }}
    >
      <Tabs.Screen
        name="feed" 
        options={{ title: 'Новости', tabBarIcon: ({ color }) => <CommunityIcon color={color} size={28} /> }}
      />
      <Tabs.Screen
        name="services" 
        options={{ title: 'Сервисы', tabBarIcon: ({ color }) => <ServiceIcon color={color} size={28} /> }}
      />
      
      {/* --- НОВАЯ ВКЛАДКА "ЧАТ" --- */}
      <Tabs.Screen
        name="chat" 
        options={{ title: 'Чат', tabBarIcon: ({ color }) => <ChatIcon color={color} size={28} /> }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: 'Профиль', tabBarIcon: ({ color }) => <ProfileIcon color={color} size={28} /> }}
      />

      {/* --- СКРЫТЫЕ ЭКРАНЫ, ДОСТУПНЫЕ ДЛЯ НАВИГАЦИИ --- */}
      <Tabs.Screen name="recommendations" options={{ href: null }} />
      <Tabs.Screen name="store" options={{ href: null }} />
      <Tabs.Screen name="community/[id]" options={{ href: null }} />
    </Tabs>
  );
}