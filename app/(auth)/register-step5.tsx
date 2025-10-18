import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import { useRegistration } from '../../src/lib/contexts/RegistrationContext';
import { registerUser } from 'api/api';

export default function RegisterStep5Screen() {
  const { data } = useRegistration();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Функция выбора изображения остается без изменений,
  // она нужна только для отображения аватара на экране.
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Требуется разрешение', 'Пожалуйста, предоставьте доступ к вашей галерее.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  // Главное изменение здесь: отправляем JSON, а не FormData
  const onSubmit = async () => {
    setIsSubmitting(true);
    
    // Формируем простой JSON-объект для отправки на сервер.
    // Изображение здесь полностью игнорируется.
    const finalData = {
      email: data.email!,
      first_name: data.first_name!,
      last_name: data.last_name!,
      patronymic: "", // Можно добавить, если собираете это поле
      description: data.description || "",
      contact: data.contact || "",
      place_of_job: data.place_of_job || "",
      place_of_study: data.place_of_study || "",
      password: data.password!,
      skills: data.skills || [],
    };
    
    try {
      // Вызываем API-функцию, которая теперь ожидает JSON
      const response = await registerUser(finalData);

      console.log('Registration successful:', response);
      Alert.alert('Успех!', 'Вы успешно зарегистрированы.');

      // Заменяем стек навигации, чтобы пользователь не мог вернуться назад
      router.replace('/(auth)/login'); // или '/(main)/profile'

    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Ошибка регистрации', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Добавьте фото профиля"
      showBackButton>
      <View className="flex-1 items-center pt-16">
        <TouchableOpacity 
          onPress={pickImage}
          activeOpacity={0.8}
          className="relative mb-4">
          <View className="w-40 h-40 rounded-full bg-gray-200 items-center justify-center overflow-hidden border-2 border-gray-300">
            {avatarUri ? (
              <Image 
                source={{ uri: avatarUri }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-gray-400 text-7xl">📷</Text>
            )}
          </View>
          
          <View className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full items-center justify-center border-2 border-gray-200 shadow-md">
            <Text className="text-blue-500 text-3xl font-light leading-9">+</Text>
          </View>
        </TouchableOpacity>
        
        {isSubmitting && <ActivityIndicator size="large" color="#007AFF" className="mt-4" />}
      </View>
      
      <View className="px-5 py-4">
        <Button
          title={isSubmitting ? "Регистрация..." : "Завершить"}
          onPress={onSubmit}
          disabled={isSubmitting}
        />
      </View>
    </AuthLayout>
  );
}