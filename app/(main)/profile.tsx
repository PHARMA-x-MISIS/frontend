import React, {useState} from 'react';
import { View, StatusBar, ScrollView, Pressable, ViewStyle } from 'react-native';
import UserInfo from 'components/UserInfo';
import { LeftArrow } from 'components/icons';
import { Edit } from 'components/icons';
import CompetencyBlock from 'components/CompetencyBlock';
import AboutUserBlock from 'components/AboutUserBlock';
import CommunitiesBlock from 'components/CommunitiesBlock';
import LabeledInput from 'components/LabeledInput';
import { router } from 'expo-router';


const ProfileScreen = () => {
    const [email, setEmail] = useState('');


  return (
    <View className="flex-1 bg-white px-4 pt-4 mt-8">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="h-14 flex-row items-center justify-between">
        <Pressable onPress={() => router.push('/(auth)/login')}>
          <LeftArrow width={28} height={28} color="black" />
        </Pressable>

        <Pressable onPress={() => console.log('Edit')}>
          <Edit width={24} height={24} color="black" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <UserInfo
          avatarUrl={{ uri: 'https://globalmsk.ru/usr/person/big-person-15745201611.jpg' }}
          firstName="Анатолий"
          lastName="Константинопольский"
        />

        <View className="flex-col gap-3">
          <View className="mt-6">
            <CompetencyBlock></CompetencyBlock>
          </View>

          <View>
            <AboutUserBlock about="Привет меня зовут Паша я фронтендер на реакте люблю дез грипссссс"></AboutUserBlock>
          </View>

          <CommunitiesBlock />
        </View>


      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
