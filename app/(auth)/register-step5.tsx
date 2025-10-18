import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import SuccessModal from 'components/SuccessModal';
import { Photo } from 'components/icons';
import { useRegistration } from '../../src/lib/contexts/RegistrationContext';
import { registerUser } from 'api/api';

export default function RegisterStep5Screen() {
  // --- Состояния компонента ---
  const { data } = useRegistration(); // Данные со всех предыдущих шагов
  const [avatarUri, setAvatarUri] = useState<string | null>(null); // URI выбранного аватара для отображения
  const [isSubmitting, setIsSubmitting] = useState(false); // Флаг для отслеживания процесса отправки
  const [showModal, setShowModal] = useState(false); // Флаг для отображения модального окна успеха

  /**
   * Открывает галерею для выбора изображения, запрашивая разрешения.
   */
  const pickImage = async () => {
    // 1. Запрашиваем разрешение
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Требуется разрешение', 'Пожалуйста, предоставьте доступ к вашей галерее, чтобы выбрать фото.');
      return;
    }

    // 2. Открываем галерею
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    // 3. Сохраняем результат, если пользователь не отменил выбор
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  /**
   * Собирает все данные и отправляет на сервер для регистрации.
   * При успехе показывает модальное окно.
   */
  const onSubmit = async () => {
    setIsSubmitting(true);
    
    // Формируем финальный объект данных для отправки на сервер
    const finalData = {
      email: data.email!,
      first_name: data.first_name!,
      last_name: data.last_name!,
      patronymic: "", // Можно добавить, если это поле собирается на предыдущих шагах
      description: data.description || "",
      contact: data.contact || "",
      place_of_job: data.place_of_job || "",
      place_of_study: data.place_of_study || "",
      password: data.password!,
      skills: data.skills || [],
    };
    
    try {
      // Отправляем запрос
      await registerUser(finalData);
      // Если запрос успешен, показываем модальное окно
      setShowModal(true);
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Ошибка регистрации', (error as Error).message);
    } finally {
      // В любом случае завершаем состояние отправки
      setIsSubmitting(false);
    }
  };

  /**
   * Обработчик для кнопки "Сообщества" в модальном окне.
   */
  const handleRecommendations = () => {
    setShowModal(false);
    router.replace('/(main)/recommendations'); // Используем replace, чтобы пользователь не мог вернуться назад
  };

  /**
   * Обработчик для кнопки "Профиль" в модальном окне.
   */
  const handleProfile = () => {
    setShowModal(false);
    router.replace('/(main)/profile'); // Используем replace
  };

  // --- Рендеринг компонента ---
  return (
    <>
      <AuthLayout
        title="Регистрация"
        subtitle="добавьте фото профиля"
        showBackButton
        footer={
          <View className="px-5">
            <Button
              title={isSubmitting ? "Регистрация..." : "Завершить"}
              onPress={onSubmit}
              disabled={isSubmitting} // Блокируем кнопку во время отправки
            />
          </View>
        }>
        <View className="items-center pt-16">
          <TouchableOpacity 
            onPress={pickImage}
            activeOpacity={0.8}
            className="relative">
            <View className="w-40 h-40 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
              {avatarUri ? (
                <Image 
                  source={{ uri: avatarUri }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center justify-center">
                  <Photo/>
                </View>
              )}
            </View>
            
            <View className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full items-center justify-center border-2 border-gray-200">
              <Text className="text-red-500 text-3xl font-light">+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </AuthLayout>

      <SuccessModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onPrimaryPress={handleRecommendations}
        onSecondaryPress={handleProfile}
        title="Аккаунт создан!"
        description="Пора вступить в сообщества по интересам. Алгоритм подберёт наиболее подходящие сообщества персонально для вас."
        primaryButtonText="Сообщества по интересу"
        secondaryButtonText="Профиль"
        image={require('assets/icons/happy.png')}
      />
    </>
  );
}