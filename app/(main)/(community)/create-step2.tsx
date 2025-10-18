// app/(main)/(community)/create-step2.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';

// Определяем возможные значения для радио-кнопок
const audienceOptions = ['school', 'student', 'graduate'] as const;

// Схема валидации
const createCommunityStep2Schema = z.object({
  website: z.string().url('Введите корректный URL').or(z.literal('')), // URL необязателен, но если есть, должен быть валидным
  targetAudience: z.enum(audienceOptions, {
    errorMap: () => ({ message: 'Пожалуйста, выберите для кого организация' }),
  }),
});

// Типизация данных формы
type CreateCommunityStep2FormData = z.infer<typeof createCommunityStep2Schema>;

const audienceLabels: Record<typeof audienceOptions[number], string> = {
  school: 'Школьники',
  student: 'Студенты',
  graduate: 'Выпускники',
};

export default function CreateCommunityStep2Screen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCommunityStep2FormData>({
    resolver: zodResolver(createCommunityStep2Schema),
    defaultValues: {
      website: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: CreateCommunityStep2FormData) => {
    console.log('Данные шага 2:', data);
    router.push('/(main)/(community)/create-step3');
  };

  return (
    <AuthLayout
      title="Создание сообщества"
      subtitle="Контакты"
      showBackButton
      footer={
        <View className="px-5">
          <Button
            title="Далее"
            onPress={handleSubmit(onSubmit)}
            outline={!isValid}
          />
        </View>
      }>
      <View className="px-5">
        {/* Поле "Сайт организации" */}
        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-8">
              <Text className="font-onest-semibold text-base text-black mb-2">
                Сайт организации
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 font-onest-regular text-base ${
                  errors.website ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https"
                placeholderTextColor="#9CA3AF"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="url"
                autoCapitalize="none"
              />
              {errors.website && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.website.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Группа радио-кнопок "Для кого организация" */}
        <Controller
          control={control}
          name="targetAudience"
          render={({ field: { onChange, value: selectedValue } }) => (
            <View>
              <Text className="font-onest-semibold text-base text-black mb-3">
                Для кого организация
              </Text>
              <View className="gap-y-3">
                {audienceOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    className="flex-row items-center"
                    onPress={() => onChange(option)}
                    activeOpacity={0.7}
                  >
                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                        selectedValue === option ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {selectedValue === option && (
                        <View className="w-3 h-3 rounded-full bg-red-500" />
                      )}
                    </View>
                    <Text className="ml-3 font-onest-regular text-base text-black">
                      {audienceLabels[option]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.targetAudience && (
                <Text className="text-red-500 mt-2 text-sm">
                  {errors.targetAudience.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </AuthLayout>
  );
}