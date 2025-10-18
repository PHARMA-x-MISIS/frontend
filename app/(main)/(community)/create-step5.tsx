// app/(main)/(community)/create-step5.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import SuccessModal from 'components/SuccessModal'; 
import { Photo } from 'components/icons';


export default function CreateCommunityStep5Screen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Необходимо разрешение для доступа к галерее');
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

  const onFinalSubmit = () => {
    console.log('Аватар сообщества:', avatarUri);
    setModalVisible(true);
  };

  const handleConfigure = () => {
    setModalVisible(false);
    console.log('Переход к настройкам...');
    // router.replace('/(main)/community/settings/some-id');
  };

  const handleNavigateToCommunity = () => {
    setModalVisible(false);
    console.log('Переход к сообществу...');
    // router.replace('/(main)/community/some-id');
  };

  return (
    <>
      <AuthLayout
        title="Установите аватар"
        subtitle="Фотография делает сообщество узнаваемым и запоминающимся"
        showBackButton
        footer={
          <View className="px-5">
            <Button title="Завершить" onPress={onFinalSubmit} />
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
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPrimaryPress={handleConfigure}
        onSecondaryPress={handleNavigateToCommunity}
      />
    </>
  );
}