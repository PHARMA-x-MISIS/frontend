// app/(main)/(community)/create-step4.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import EntityListItem from 'components/EntityListItem';
import { Lupa, Plus, CheckIcon } from 'components/icons';

const MOCK_USERS = [
  { id: '1', name: 'Екатерина Иванова', description: 'Инженер-конструктор', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Алексей Петров', description: 'Разработчик ПО', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Мария Сидорова', description: 'Менеджер проекта', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Дмитрий Кузнецов', description: 'Аналитик данных', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Ольга Васильева', description: 'UX/UI Дизайнер', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
];

const schema = z.object({
  mentors: z.array(z.string()).min(1, "Выберите хотя бы одного участника"),
});

type FormData = z.infer<typeof schema>;

export default function CreateCommunityStep4Screen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { setValue, watch, handleSubmit, formState: { isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { mentors: [] },
    mode: 'onChange',
  });

  const selectedMentors = watch('mentors');

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_USERS;
    return MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const toggleMentor = (id: string) => {
    const current = watch('mentors');
    const newSelection = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    setValue('mentors', newSelection, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    console.log('Выбранные менторы:', data.mentors);
    router.push('/(main)/(community)/create-step5');
  };

  return (
    <AuthLayout
      title="Добавить менторов"
      subtitle="Выберите менторов от организации для этого сообщества" 
      showBackButton
      disableScroll
      footer={
        <View className="px-5 mb-10">
          <Button title="Далее" onPress={handleSubmit(onSubmit)} outline={!isValid} />
        </View>
      }>
        <FlatList
            ListHeaderComponent={ 
                <View className="mb-12">
                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
                        <Lupa width={20} height={20} color="#6B7280" />
                        <TextInput
                        className="flex-1 ml-2 font-onest-regular text-base"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>
            }
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                const isSelected = selectedMentors.includes(item.id);
                return (
                    <EntityListItem
                    title={item.name}
                    subtitle={item.description}
                    imageUrl={item.avatarUrl}
                    onActionPress={() => toggleMentor(item.id)}
                    ActionIcon={isSelected ? CheckIcon : Plus   }
                    />
                );
            }}
            ListEmptyComponent={
                <View className="items-center justify-center py-10">
                    <Text className="text-gray-400 font-onest-regular">Ничего не найдено</Text>
                </View>
            }
            contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-200 ml-5" />}
        />
    </AuthLayout>
  );
}