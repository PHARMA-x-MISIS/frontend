// app/(main)/services.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 justify-center items-center">
        <Text style={{ fontFamily: 'Onest-SemiBold', fontSize: 24 }} className="text-center text-gray-900">
          Сервисы
        </Text>
        <Text style={{ fontFamily: 'Onest-Regular', fontSize: 16 }} className="text-center text-gray-500 mt-2">
          Здесь будут отображаться доступные сервисы
        </Text>
      </View>
    </SafeAreaView>
  );
}
