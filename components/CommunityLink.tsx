import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { RightArrow } from './icons';

interface CommunityLinkProps {
  name: string;
  onPress: () => void;
}

const CommunityLink = ({ name, onPress }: CommunityLinkProps) => {


  return (

    <Pressable onPress={onPress} className="flex-row items-center justify-between rounded-2xl bg-white p-4"> 
    
      <Text className="font-onest-medium text-[16px]">
        {name}
      </Text>
      <RightArrow width={18} height={18} color="black"/>

    </Pressable>
  );
};

export default CommunityLink;