import React from 'react';
import { View, Text } from 'react-native';
import CommunityLink from './CommunityLink';

const MOCK_COMMUNITIES = [
  { id: 1, name: 'Сходка плотников' },
  { id: 2, name: 'ЛЦТ 2024' },
  { id: 3, name: 'Парковка пенисов Москвы' }
];

const CommunitiesBlock = () => {
  return (
    <View className="rounded-3xl bg-gray-100 p-4">
      <Text className="mb-5 text-[17px] font-onest-semibold">
        Мои сообщества
      </Text>

      <View className="flex-col gap-2">
        {MOCK_COMMUNITIES.map((community) => (
          <CommunityLink
            key={community.id}
            name={community.name}
            onPress={() => console.log(`Navigating to ${community.name}`)}
          />
        ))}
      </View>
      
    </View>
  );
};

export default CommunitiesBlock;