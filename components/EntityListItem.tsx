// components/EntityListItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { CheckIcon } from './icons';

interface EntityListItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  isVerified: boolean;
  onPress?: () => void; // Добавь это
  onActionPress: () => void;
  ActionIcon: (props: SvgProps) => React.JSX.Element;
}

export default function EntityListItem({
  title,
  subtitle,
  imageUrl,
  isVerified,
  onPress, // Добавь это
  onActionPress,
  ActionIcon,
}: EntityListItemProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} // Добавь это
      activeOpacity={0.7}
      className="flex-row items-center py-3">
      <Image source={{ uri: imageUrl }} className="w-12 h-12 rounded-full mr-3" />
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="font-onest-semibold text-base">{title}</Text>
          {isVerified && (
            <View className="ml-1">
              <CheckIcon width={16} height={16} />
            </View>
          )}
        </View>
        <Text className="font-onest-regular text-sm text-gray-500">{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onActionPress}
        className="w-8 h-8 items-center justify-center">
        <ActionIcon width={24} height={24} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}