// components/CommunitiesBlock.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { CommunityRead } from 'api/types';


// Отдельный компонент для одной строчки
const CommunityLink = ({ community }: { community: CommunityRead }) => (
  <TouchableOpacity 
    className="flex-row items-center p-2 bg-gray-50 rounded-lg"
    onPress={() => router.push(`/(main)/community/${community.id}`)}
  >
    <Image 
      source={community.avatar_url ? { uri: community.avatar_url } : require('assets/images/avatar-placeholder.png')}
      className="w-10 h-10 rounded-full mr-3"
    />
    <View>
      <Text className="font-onest-semibold text-base">{community.title}</Text>
      <Text className="font-onest-regular text-sm text-gray-500">{community.member_count} подписчиков</Text>
    </View>
  </TouchableOpacity>
);

// Обновленный основной компонент
export default function CommunitiesBlock({ communities }: { communities: CommunityRead[] }) {
  return (
    <View className="rounded-3xl bg-gray-100 p-4">
      <Text className="mb-4 text-[17px] font-onest-semibold">
        Мои сообщества
      </Text>

      {communities && communities.length > 0 ? (
        <View className="flex-col gap-2">
          {communities.map((community) => (
            <CommunityLink key={community.id} community={community} />
          ))}
        </View>
      ) : (
        <Text className="font-onest-regular text-gray-500">Вы пока не состоите в сообществах.</Text>
      )}
    </View>
  );
};