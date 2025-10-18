// components/EntityListItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface EntityListItemProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  onActionPress: () => void;
  ActionIcon: React.ElementType;
}

export default function EntityListItem({
  imageUrl,
  title,
  subtitle,
  onActionPress,
  ActionIcon,
}: EntityListItemProps) {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center flex-1">
        {/* Аватар */}
        <Image
          source={imageUrl ? { uri: imageUrl } : require('../assets/images/avatar-placeholder.png')}
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        
        {/* Информация */}
        <View className="ml-4 flex-1">
          <Text className="font-onest-semibold text-base text-black" numberOfLines={1}>
            {title}
          </Text>
          <Text className="font-onest-regular text-sm text-gray-500" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>
      
      {/* Кнопка действия */}
      <TouchableOpacity activeOpacity={1} onPress={onActionPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ActionIcon />
      </TouchableOpacity>
    </View>
  );
}