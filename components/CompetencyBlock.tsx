import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import CompetencyPill from './CompetencyPill';

const MOCK_COMPETENCIES = [
  { id: 1, text: 'Devops' },
  { id: 2, text: 'CSS' },
  { id: 3, text: 'Python' },
  { id: 4, text: 'JavaScript' },
  { id: 5, text: 'Гончарное дело' },
];

const CompetencyBlock = () => {
  const COLORS: Array<'orange' | 'lightgreen' | 'yellow' | 'green' | 'blue'> = ['orange', 'lightgreen', 'yellow', 'blue', 'green'];

  const [isExpanded, setIsExpanded] = useState(false);
  const displaedCount = 2;
  const displayedCompetencies = isExpanded
    ? MOCK_COMPETENCIES
    : MOCK_COMPETENCIES.slice(0, displaedCount);

  const hasMore = MOCK_COMPETENCIES.length > displaedCount;

  return (
    <View className="rounded-3xl bg-gray-100 p-4">
      <Text className="mb-5 text-[17px] font-onest-semibold">Мои компетенции</Text>

      <View className="flex-row flex-wrap gap-2 mb-[10px]">
        {displayedCompetencies.map((competency, index) => (
          <CompetencyPill
            key={competency.id}
            text={competency.text}
            colorType={COLORS[index % COLORS.length]}
          />
        ))}
        {!isExpanded && hasMore && (
          <View className="self-start rounded-full bg-gray-300 px-4 py-2">
            <Text className="text-[16px] text-gray-600 font-onest-semibold">
              +{MOCK_COMPETENCIES.length - displaedCount} ещё
            </Text>
          </View>
        )}
      </View>

      <Pressable
        className="flex-row items-center self-start"
        onPress={() => setIsExpanded(!isExpanded)}>
        <Text className="mr-2 text-[#3464D8] font-onest-medium">
          {isExpanded ? 'Свернуть' : 'Показать все →'}
        </Text>
      </Pressable>
    </View>
  );
};

export default CompetencyBlock;
