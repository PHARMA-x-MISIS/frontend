// app/(auth)/login.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import LabeledInput from 'components/LabeledInput';
import { loginSchema, LoginFormData } from 'src/lib/validation/authSchemas';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const isFormFilled = email.trim() !== '' && password.trim() !== '';

  const onSubmit = async (data: LoginFormData) => {
    console.log('Данные для входа:', data);
    
    router.replace('/(main)/profile'); // change
  };

  return (
    <AuthLayout
      title="Вход"
      subtitle="развивай свои компетенции вместе с предприятиями"
      footer={
        <View className="items-center">
          <Text className="text-gray-600 font-onest-regular">Ещё нет аккаунта?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="mt-1 text-blue-600 font-onest-semibold">Зарегистрироваться</Text>
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
              placeholder="example@mail.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              required={false}
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
              required={false}
            />
          )}
        />

        <View className="mt-12 w-full gap-y-4 px-5">
          <Button 
            title="Войти" 
            outline={!isFormFilled}
            onPress={handleSubmit(onSubmit)}
          />
          <Button title="Войти" social="gos" />
          <Button title="Войти" social="vk" />
        </View>
      </View>
    </AuthLayout>
  );
}