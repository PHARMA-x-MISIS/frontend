// app/(main)/(community)/create-step1.tsx
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';

export default function CreateCommunityStep1Screen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isButtonDisabled = name.trim() === '';

  const onSubmit = () => {
    if (isButtonDisabled) return;
    
    console.log('Название:', name);
    console.log('Описание:', description);
    // Переход на следующий шаг
    // router.push('/(main)/(community)/create-step2');
  };

  return (
    <AuthLayout
      title="Создание сообщества"
      subtitle="Первое знакомство"
      showBackButton
      footer={
        <View className="px-5">
          <Button
            title="Далее"
            onPress={onSubmit}
            outline={isButtonDisabled}
          />
        </View>
      }>
      <View className="px-5">
        {/* Поле "Название" */}
        <View className="mb-6">
          <Text className="font-onest-medium text-base text-black mb-2">
            Название <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 font-onest-regular text-base"
            placeholder="Имя"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Поле "Описание" */}
        <View className="mb-4">
          <Text className="font-onest-medium text-base text-black mb-2">
            Описание
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 h-28 font-onest-regular text-base"
            placeholder="расскажите о сообществе"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Подсказка */}
        <Text className="font-onest-regular text-sm text-gray-500">
          Используйте слова, которые описывают тематику сообщества и помогают быстрее его найти/Изменить описание можно в любой момент.
        </Text>
      </View>
    </AuthLayout>
  );
}