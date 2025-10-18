// components/FooterTabs.tsx
import React from 'react';
import { View, Pressable } from 'react-native';
import { Grid } from './icons';
import { Notifications } from './icons';
import { Profile } from './icons';


export type TabName = 'profile' | 'feed' | 'services';

interface FooterTabsProps {
  activeTab: TabName;
}

const FooterTabs = ({ activeTab }: FooterTabsProps) => {
  return (
    <View className="h-[56px] flex-row items-center justify-around border-t border-t-gray-200 bg-white">
      
      <Pressable className="p-3">
        <Grid/>
      </Pressable>
      <Pressable className="p-3">
        <Notifications/>
      </Pressable>

      <Pressable 
        className={`p-3 rounded-2xl ${activeTab === 'profile' ? 'bg-gray-100' : ''}`}
      >
        <Profile/>
      </Pressable>

    </View>
  );
};

export default FooterTabs;