// components/SuccessModal.tsx
import React from 'react';
import { Modal, View, Text, Image } from 'react-native';
import Button from './Button';

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
}

export default function SuccessModal({
  isVisible,
  onClose,
  onPrimaryPress,
  onSecondaryPress,
}: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="bg-white rounded-2xl p-6 w-full items-center">
          <Image
            source={require('../assets/icons/happy.png')}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />

          <Text className="font-onest-semibold text-2xl text-black text-center mb-2">
            Сообщество создано
          </Text>

          <Text className="font-onest-regular text-base text-gray-500 text-center mb-8">
            Пора оформить его, пригласить первых подписчиков и начать делиться контентом
          </Text>

          <View className="w-full gap-y-3">
            <Button title="Настраивать дальше" onPress={onPrimaryPress} />
            <Button
              title="Перейти в сообщество"
              onPress={onSecondaryPress}
              outline
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}