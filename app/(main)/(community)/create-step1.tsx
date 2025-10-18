// app/(main)/(community)/create-step1.tsx
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';

const createCommunityStep1Schema = z.object({
  name: z.string().min(1, 'Название не может быть пустым'),
  description: z.string(), 
});

type CreateCommunityStep1FormData = z.infer<typeof createCommunityStep1Schema>;

export default function CreateCommunityStep1Screen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCommunityStep1FormData>({
    resolver: zodResolver(createCommunityStep1Schema),
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onChange', 
  });

  const onSubmit = (data: CreateCommunityStep1FormData) => {
    console.log('Название:', data.name);
    console.log('Описание:', data.description);
    router.push('/(main)/(community)/create-step2');
  };

  return (
    <AuthLayout
      title="Создание сообщества"
      subtitle="Первое знакомство"
      showBackButton
      footer={
        <View className="mb-5 px-5">
          <Button
            title="Далее"
            onPress={handleSubmit(onSubmit)}
            outline={!isValid}
          />
        </View>
      }>
      <View className="px-5">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-6">
              <Text className="font-onest-semibold text-base text-black mb-2">
                Название <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 font-onest-regular text-base ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Введите название"
                placeholderTextColor="#9CA3AF"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              {/* И ИЗМЕНЕНИЕ ЗДЕСЬ */}
              <Text className="font-onest-semibold text-base text-black mb-2">
                Описание
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 h-28 font-onest-regular text-base"
                placeholder="Расскажите о сообществе"
                placeholderTextColor="#9CA3AF"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                textAlignVertical="top"
              />
            </View>
          )}
        />
        
        <Text className="font-onest-regular text-sm text-gray-500">
          Используйте слова, которые описывают тематику сообщества и помогают быстрее его найти. Изменить описание можно в любой момент.
        </Text>
      </View>
    </AuthLayout>
  );
}