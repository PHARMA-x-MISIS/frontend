// app/(auth)/register-step3.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import LabeledInput from 'components/LabeledInput';
import { z } from 'zod';


const registrationStep3Schema = z.object({
  vkLink: z.string().optional(),
  studyPlace: z.string().optional(),
  workPlace: z.string().optional(),
  aboutYou: z.string().optional(),
});

type RegistrationStep3FormData = z.infer<typeof registrationStep3Schema>;

export default function RegisterStep3Screen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationStep3FormData>({
    resolver: zodResolver(registrationStep3Schema),
    defaultValues: {
      vkLink: '',
      studyPlace: '',
      workPlace: '',
      aboutYou: '',
    },
  });

  const onSubmit = async (data: RegistrationStep3FormData) => {
    console.log('Данные третьего шага регистрации:', data);
    router.push('/(auth)/register-step4');
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Контактные данные"
      showBackButton>
      <View className="gap-y-2">
        <Controller
          control={control}
          name="vkLink"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Ссылка на ВК"
              placeholder="vk.me/"
              required={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.vkLink?.message}
              autoCapitalize="none"
              keyboardType="url"
            />
          )}
        />

        <Controller
          control={control}
          name="studyPlace"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Место учебы"
              placeholder="Место учебы "
              onBlur={onBlur}
              required={false}
              onChangeText={onChange}
              value={value}
              error={errors.studyPlace?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="workPlace"
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Место работы"
              placeholder="Место работы"
              onBlur={onBlur}
              required={false}
              onChangeText={onChange}
              value={value}
              error={errors.workPlace?.message}
            />
          )}
        />

        
        <Controller // поле динамической высоты, расширяется если текст не влезает
          control={control}
          name="aboutYou"
          render={({ field: { onChange, onBlur, value } }) => {
            const MIN_HEIGHT = 100;
            const MAX_HEIGHT = 300;
            const [height, setHeight] = React.useState<number>(MIN_HEIGHT);

            const handleContentSizeChange = React.useCallback(
              (e: any) => {
                const newHeight = Math.ceil(e.nativeEvent.contentSize.height || 0);
                const clamped = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
                setHeight(clamped);
              },
              []
            );
            
            return (
              <LabeledInput
                label="О вас"
                placeholder="Расскажите о себе"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.aboutYou?.message}
                multiline
                required={false}
                textAlignVertical="top"
                style={{ minHeight: MIN_HEIGHT, height: Math.max(MIN_HEIGHT, height) }}
                scrollEnabled={height > MAX_HEIGHT}
                onContentSizeChange={handleContentSizeChange}
              />
            );
          }}
        />


        <View className="mt-12 w-full px-5">
          <Button 
            title="Далее"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

