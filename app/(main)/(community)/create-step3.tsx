// app/(main)/(community)/create-step3.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import { Lupa } from 'components/icons';

type PillColorType = 'orange' | 'blue' | 'yellow' | 'green' | 'lightgreen';

interface Competency {
  id: string;
  name: string;
  color: PillColorType;
}

const ALL_COMPETENCIES: Competency[] = [
  { id: '1', name: 'Электроника', color: 'green' }, { id: '2', name: 'Микроконтроллеры', color: 'blue' },
  { id: '3', name: 'Мехатроника', color: 'orange' }, { id: '4', name: 'CAD/3D', color: 'yellow' },
  { id: '5', name: 'Физика', color: 'lightgreen' }, { id: '6', name: '3d-печать', color: 'green' },
  { id: '7', name: 'Сварка', color: 'blue' }, { id: '8', name: 'Математика', color: 'orange' },
  { id: '9', name: 'Материаловедение', color: 'yellow' }, { id: '10', name: 'Механика', color: 'lightgreen' },
  { id: '11', name: 'Биоинформатика', color: 'green' }, { id: '12', name: 'Лазерная резка', color: 'blue' },
  { id: '13', name: 'Контроль качества', color: 'orange' }, { id: '14', name: 'Сборка', color: 'yellow' },
  { id: '15', name: 'Управление БПЛА', color: 'lightgreen' }, { id: '16', name: 'Виброанализ', color: 'green' },
  { id: '17', name: 'Метрология', color: 'blue' }, { id: '18', name: 'MES-фарма', color: 'orange' },
  { id: '19', name: 'Фотолитография', color: 'yellow' }, { id: '20', name: 'Электротест', color: 'lightgreen' },
  { id: '21', name: 'САПР-процессы', color: 'green' },
];

const schema = z.object({
  competencies: z.array(z.string()).min(3, "Выберите минимум 3 компетенции"),
});

type FormData = z.infer<typeof schema>;

export default function CreateCommunityStep3Screen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { control, handleSubmit, setValue, watch, formState: { isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { competencies: [] },
    mode: 'onChange',
  });

  const selectedCompetencies = watch('competencies');

  const filteredCompetencies = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COMPETENCIES;
    return ALL_COMPETENCIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const toggleCompetency = (id: string) => {
    const current = watch('competencies');
    const newSelection = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    setValue('competencies', newSelection, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    console.log('Выбранные компетенции:', data.competencies);
    router.push('/(main)/(community)/create-step4');
  };

  return (
    <AuthLayout
      title="Тематика"
      subtitle="Выберите ключевые компетенции, которые развивает это сообщество"
      showBackButton
      footer={
        <View className="px-5">
          <Button
            title={isValid ? "Далее" : `Далее (${selectedCompetencies.length}/3)`}
            outline={!isValid}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      }>
      <View className="px-5">
        <View className="mb-8">
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

        <Controller
          control={control}
          name="competencies"
          render={() => (
            <View className="flex-row flex-wrap gap-2 justify-center">
              {filteredCompetencies.map(comp => {
                const isSelected = selectedCompetencies.includes(comp.id);
                return (
                  <TouchableOpacity
                    key={comp.id}
                    onPress={() => toggleCompetency(comp.id)}
                    activeOpacity={1}
                    className={`rounded-full border ${
                      isSelected ? 'border-black' : 'border-black bg-white'
                    }`}>
                    {isSelected ? (
                      <View className={`rounded-full px-2.5 py-1 ${
                        comp.color === 'orange' ? 'bg-[#FFC995]' :
                        comp.color === 'blue' ? 'bg-[#ABB2FF]' :
                        comp.color === 'yellow' ? 'bg-[#F4FF96]' :
                        comp.color === 'green' ? 'bg-[#00C587]' :
                        'bg-[#79FF9F]'
                      }`}>
                        <Text className="font-onest-semibold text-[15px] text-black">
                          {comp.name}
                        </Text>
                      </View>
                    ) : (
                      <View className="rounded-full px-2.5 py-1 bg-white">
                        <Text className="font-onest-semibold text-[15px] text-black">
                          {comp.name}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
        
        {filteredCompetencies.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-400 font-onest-regular">Ничего не найдено</Text>
          </View>
        )}
      </View>
    </AuthLayout>
  );
}