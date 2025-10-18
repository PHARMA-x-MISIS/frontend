// layouts/AuthLayout.tsx
import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LeftArrow } from 'components/icons';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showBackButton?: boolean;
}

const AuthLayout = ({ title, subtitle, children, footer, showBackButton = false }: AuthLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            className="flex-1" 
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="flex-1 px-4 pt-9 justify-between">
              <View>
                {showBackButton && (
                  <TouchableOpacity 
                    onPress={() => router.back()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <LeftArrow />
                  </TouchableOpacity>
                )}

                <View className="mt-4 mb-8 items-center">
                  <View className="w-[70%]">
                    <Text className="font-onest-semibold text-3xl text-center mb-3 text-black">
                      {title}
                    </Text>
                    {subtitle && (
                      <Text className="font-onest-regular text-base text-center text-gray-500">
                        {subtitle}
                      </Text>
                    )}
                  </View>
                </View>

                <View>
                  {children}
                </View>
              </View>

              {footer && (
                <View className="mt-8 mb-16">
                  {footer}
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthLayout;