// app/(auth)/register.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import LabeledInput from 'components/LabeledInput';
import { registrationStep2Schema, RegistrationStep2FormData } from 'src/lib/validation/authSchemas';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationStep2FormData>({
    resolver: zodResolver(registrationStep2Schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const isFormFilled = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  const onSubmit = async (data: RegistrationStep2FormData) => {
    console.log('Данные регистрации:', data);
    // Здесь будет переход на следующий шаг или API запрос
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="создание учетной записи"
      showBackButton
      footer={
        <View className="items-center">
          <Text className="text-gray-600 font-onest-regular">Уже есть аккаунт?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="mt-1 text-blue-600 font-onest-semibold">Войти</Text>
          </TouchableOpacity>
        </View>
      }>
      <View className="gap-y-2">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Почта"
              placeholder="mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Пароль"
              placeholder="Введите пароль"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Повторите пароль"
              placeholder="Введите пароль"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.confirmPassword?.message}
              secureTextEntry
            />
          )}
        />

        <View className="mt-12 w-full gap-y-4 px-5">
          <Button 
            title="Далее" 
            outline={!isFormFilled}
            onPress={handleSubmit(onSubmit)}
          />
          <Button title="Войти" social="vk" />
          <Button title="Войти" social="gos" />
        </View>
      </View>
    </AuthLayout>
  );
}