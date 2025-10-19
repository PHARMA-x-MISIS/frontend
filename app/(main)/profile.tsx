// app/(main)/profile.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StatusBar, 
  ScrollView, 
  Pressable, 
  ActivityIndicator, 
  Alert, 
  Text,
  RefreshControl // Для обновления "потянув вниз"
} from 'react-native';
import { router } from 'expo-router';
// Ваши компоненты
import UserInfo from 'components/UserInfo';
import CompetencyBlock from 'components/CompetencyBlock';
import AboutUserBlock from 'components/AboutUserBlock';
import CommunitiesBlock from 'components/CommunitiesBlock';
// Ваши иконки
import { LeftArrow, Edit } from 'components/icons';
// Функции API и контекст
import { getCurrentUser, getMyCommunities } from 'api/api';
import { useAuth } from 'src/lib/contexts/AuthContext';
import { UserRead, CommunityRead } from 'src/lib/types/api';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const [user, setUser] = useState<UserRead | null>(null);
  const [communities, setCommunities] = useState<CommunityRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Оборачиваем загрузку данных в useCallback для использования в onRefresh
  const fetchProfileData = useCallback(async () => {
    try {
      // Запускаем оба запроса параллельно
      const [userData, communitiesData] = await Promise.all([
        getCurrentUser(),
        getMyCommunities()
      ]);
      setUser(userData);
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Profile fetch error:", error);
      Alert.alert("Ошибка", "Не удалось загрузить данные профиля.");
    }
  }, []);

  // Первоначальная загрузка данных
  useEffect(() => {
    setIsLoading(true);
    fetchProfileData().finally(() => setIsLoading(false));
  }, [fetchProfileData]);

  // Функция для ручного обновления
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchProfileData();
    setIsRefreshing(false);
  }, [fetchProfileData]);

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    signOut();
    // Перенаправление на экран логина произойдет автоматически
    // благодаря логике в вашем app/_layout.tsx
  };
  
  // --- Управление состояниями рендеринга ---

  // 1. Пока идет первая загрузка
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#E94975" />
      </View>
    );
  }

  // 2. Если данные не загрузились (ошибка)
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-5">
        <Text className="font-onest-semibold text-lg text-center">Не удалось загрузить профиль</Text>
        <Pressable onPress={handleLogout} className="mt-4">
          <Text className="font-onest-medium text-blue-600">Вернуться на экран входа</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Если все успешно, рендерим полный экран профиля
  return (
    <View className="flex-1 bg-white px-4 pt-4 mt-8">
      <StatusBar barStyle="dark-content" />

      {/* --- Header --- */}
      <View className="h-14 flex-row items-center justify-between">
        <Pressable onPress={handleLogout} className="p-2">
          <LeftArrow width={28} height={28} color="black" />
        </Pressable>
        <Text className="font-onest-semibold text-lg">Профиль</Text>
        <Pressable onPress={() => console.log('TODO: Редактирование профиля')} className="p-2">
          <Edit width={24} height={24} color="black" />
        </Pressable>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* --- User Info --- */}
        <UserInfo
          avatarUrl={user.profile_photo ? { uri: user.profile_photo } : require('assets/images/avatar-placeholder.png')}
          firstName={user.first_name}
          lastName={user.last_name}
        />

        <View className="flex-col gap-3 mt-6">
          {/* --- Блок компетенций --- */}
          <CompetencyBlock skills={user.skills} />
          
          {/* --- Блок "О себе" --- */}
          {user.description && (
            <AboutUserBlock about={user.description} />
          )}

          {/* --- Блок сообществ --- */}
          <CommunitiesBlock communities={communities} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;