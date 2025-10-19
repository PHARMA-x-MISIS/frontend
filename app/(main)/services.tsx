// app/(post)/create.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from 'components/Button';
// --- IMPORT THE NEW API FUNCTION AND TYPE ---
import { createPost, PostCreate } from 'api/api';

export default function CreatePostScreen() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Post text cannot be empty.');
      return;
    }
    setIsSubmitting(true);
    try {
      // --- USE THE API FUNCTION ---
      const postData: PostCreate = { text };
      const newPost = await createPost(postData);

      console.log('Post created:', newPost);
      Alert.alert('Success!', 'Your post has been published.');
      router.back(); // Go back to the previous screen
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-5 pt-16">
      <Text className="text-2xl font-onest-semibold mb-5">New Post</Text>
      <TextInput
        className="border border-gray-300 rounded-xl p-4 h-40 font-onest-regular text-base"
        placeholder="What's on your mind?"
        placeholderTextColor="#9CA3AF"
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />
      <View className="mt-auto">
        <Button
          title={isSubmitting ? 'Publishing...' : 'Publish'}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
        <View className="h-2" />
        <Button
          title="Cancel"
          onPress={() => router.back()}
          outline
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}