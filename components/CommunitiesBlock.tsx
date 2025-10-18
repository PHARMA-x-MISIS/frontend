import React from 'react';
import { View, Text } from 'react-native';
import CommunityLink from './CommunityLink';


interface CommunitiesBlockProps {
  communities: string[];
}

export default function CommunitiesBlock({ communities }: CommunitiesBlockProps) {
  return (
    <View className="rounded-3xl bg-gray-100 p-4">
      <Text className="mb-5 text-[17px] font-onest-semibold">
        Мои сообщества
      </Text>

     
      {communities && communities.length > 0 ? (
        <View className="flex-col gap-2">
          {communities.map((communityName, index) => (
            <CommunityLink
              key={`${communityName}-${index}`} 
              name={communityName}
              onPress={() => console.log(`Navigating to ${communityName}`)}
            />
          ))}
        </View>
      ) : (
        <Text className="font-onest-regular text-gray-500">Вы пока не состоите в сообществах.</Text>
      )}
    </View>
  );
};