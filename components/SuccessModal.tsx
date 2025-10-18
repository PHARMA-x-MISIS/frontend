// components/SuccessModal.tsx (Улучшенная версия)
import React from 'react';
import { Modal, View, Text, Image, ImageSourcePropType } from 'react-native';
import Button from './Button';

// Расширяем интерфейс, чтобы принимать весь контент как props
interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void; // Делаем вторичное действие опциональным
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string; // Текст для вторичной кнопки тоже опциональный
  image: ImageSourcePropType; // Тип для изображений (require('...'))
}

export default function SuccessModal({
  isVisible,
  onClose,
  onPrimaryPress,
  onSecondaryPress,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  image,
}: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="bg-white rounded-2xl p-6 w-full items-center">
          {/* Используем изображение из props */}
          <Image
            source={image}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />

          {/* Используем заголовок из props */}
          <Text className="font-onest-semibold text-2xl text-black text-center mb-2">
            {title}
          </Text>

          {/* Используем описание из props */}
          <Text className="font-onest-regular text-base text-gray-500 text-center mb-8">
            {description}
          </Text>

          <View className="w-full gap-y-3">
            {/* Используем текст для основной кнопки из props */}
            <Button title={primaryButtonText} onPress={onPrimaryPress} />
            
            {/* Вторичная кнопка отображается только если для нее переданы текст и обработчик */}
            {secondaryButtonText && onSecondaryPress && (
              <Button
                title={secondaryButtonText}
                onPress={onSecondaryPress}
                outline
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}