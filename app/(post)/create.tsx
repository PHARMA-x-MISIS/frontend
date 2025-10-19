// app/(post)/create.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import Button from 'components/Button';
import { createPost } from 'api/api';
import { PostCreate } from 'api/types';
// Для загрузки сообществ, в которых состоит пользователь.
// Вам нужно будет создать эту API-функцию.
// import { getMyCommunities, CommunityRead } from 'api/api'; 

// Временный тип, пока у вас нет CommunityRead в api.ts
interface CommunityRead {
  id: number;
  title: string;
}

export default function CreatePostScreen() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Состояния для выбора "автора" поста
  const [myCommunities, setMyCommunities] = useState<CommunityRead[]>([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null); // null означает "от своего имени"

  // Загрузка списка сообществ пользователя при открытии экрана
  useEffect(() => {
    // TODO: Замените это на реальный вызов API, когда он будет готов.
    // getMyCommunities().then(setMyCommunities).catch(console.error);
    
    // Пока используем моковые данные для демонстрации
    const mockCommunities: CommunityRead[] = [
      { id: 12, title: 'Микрон' }, 
      { id: 25, title: 'Р-Фарм' },
      { id: 31, title: 'Лаборатория Игр' },
    ];
    setMyCommunities(mockCommunities);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Ошибка', 'Текст поста не может быть пустым.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Собираем данные для отправки в API
      const postData: PostCreate = {
        text,
        // Если ID сообщества выбран (не null), добавляем его в объект
        community_id: selectedCommunityId ?? undefined, 
      };

      await createPost(postData);

      Alert.alert('Успех!', 'Ваш пост успешно опубликован.');
      router.back(); // Возвращаемся на предыдущий экран

    } catch (error) {
      Alert.alert('Ошибка публикации', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <Text style={styles.title}>Новый пост</Text>
      </View>

      {/* Выбор сообщества */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Опубликовать в:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pillsContainer}>
            {/* Кнопка "От своего имени" */}
            <TouchableOpacity 
              onPress={() => setSelectedCommunityId(null)}
              style={[styles.pill, !selectedCommunityId && styles.pillSelected]}
            >
              <Text style={[styles.pillText, !selectedCommunityId && styles.pillTextSelected]}>
                От своего имени
              </Text>
            </TouchableOpacity>

            {/* Кнопки для каждого сообщества */}
            {myCommunities.map(community => (
              <TouchableOpacity 
                key={community.id}
                onPress={() => setSelectedCommunityId(community.id)}
                style={[styles.pill, selectedCommunityId === community.id && styles.pillSelected]}
              >
                <Text style={[styles.pillText, selectedCommunityId === community.id && styles.pillTextSelected]}>
                  {community.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Поле ввода текста */}
      <TextInput
        style={styles.textInput}
        placeholder="Что у вас нового?"
        placeholderTextColor="#9CA3AF"
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />

      {/* Кнопки действий */}
      <View style={styles.footer}>
        <Button
          title={isSubmitting ? 'Публикация...' : 'Опубликовать'}
          onPress={handleSubmit}
          disabled={isSubmitting || !text.trim()}
          outline={!text.trim()}
        />
        <View style={{ height: 12 }} />
        <Button
          title="Отмена"
          onPress={() => router.back()}
          outline
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}

// --- Стили ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60, // Отступ сверху для статус-бара
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Onest-SemiBold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Onest-Medium',
    fontSize: 16,
    marginBottom: 12,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 999, // "Круглые" края
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pillSelected: {
    backgroundColor: '#E94975',
    borderColor: '#E94975',
  },
  pillText: {
    fontFamily: 'Onest-Medium',
    color: '#374151',
  },
  pillTextSelected: {
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    height: 200, // Увеличили высоту
    fontFamily: 'Onest-Regular',
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto', // Прижимает кнопки к низу
  },
});