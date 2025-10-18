// app/(main)/profile.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StatusBar, 
  ScrollView, 
  Pressable, 
  ActivityIndicator, 
  Alert, 
  Text 
} from 'react-native';
import { router } from 'expo-router';
// Ваши компоненты
import UserInfo from 'components/UserInfo';
import CompetencyBlock from 'components/CompetencyBlock';
import AboutUserBlock from 'components/AboutUserBlock';
import CommunitiesBlock from 'components/CommunitiesBlock';
import FooterTabs from 'components/FooterTabs';
// Ваши иконки
import { LeftArrow, Edit } from 'components/icons';
// Функции API и контекст
import { getCurrentUser, UserProfile } from 'api/api';
import { useAuth } from 'src/lib/contexts/AuthContext';

const ProfileScreen = () => {
  const { signOut } = useAuth(); // Получаем функцию выхода из контекста
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Этот эффект запускается один раз при открытии экрана
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Profile fetch error:", error);
        Alert.alert("Ошибка", "Не удалось загрузить данные профиля.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Пустой массив зависимостей означает "запустить при монтировании"

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    signOut();
    // Перенаправление на экран логина произойдет автоматически
    // благодаря логике в вашем app/_layout.tsx
  };
  
  // --- Управление состояниями рендеринга ---

  // 1. Пока данные загружаются, показываем индикатор загрузки
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#E94975" />
      </View>
    );
  }

  // 2. Если загрузка завершилась, но данных нет (ошибка), показываем сообщение
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
        <Pressable onPress={handleLogout}>
          <LeftArrow width={28} height={28} color="black" />
        </Pressable>
        <Text className="font-onest-semibold text-lg">Профиль</Text>
        <Pressable onPress={() => console.log('Редактирование профиля')}>
          <Edit width={24} height={24} color="black" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- User Info --- */}
        <UserInfo
          // Если есть фото профиля - показываем его, если нет - заглушку
          avatarUrl={user.profile_photo ? { uri: user.profile_photo } : require('../../assets/images/avatar-placeholder.png')}
          firstName={user.first_name}
          lastName={user.last_name}
        />

        <View className="flex-col gap-3 mt-6">
          {/* --- Блок компетенций --- */}
          <CompetencyBlock skills={user.skills} />
          
          {/* --- Блок "О себе" (показывается только если есть описание) --- */}
          {user.description && (
            <AboutUserBlock about={user.description} />
          )}

          {/* --- Блок сообществ --- */}
          <CommunitiesBlock communities={user.communities} />
        </View>
      </ScrollView>

      {/* --- Нижняя панель навигации --- */}
 
    </View>
  );
};

export default ProfileScreen;