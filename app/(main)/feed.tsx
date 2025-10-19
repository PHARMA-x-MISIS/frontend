// app/(main)/feed.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { useFocusEffect } from 'expo-router';
// --- API ---
import { getPosts } from 'api/api';
// --- Компоненты ---
import PostCard from 'components/PostCard';
import { PostRead } from 'api/types';

export default function FeedScreen() {
  // --- Состояния компонента ---
  const [posts, setPosts] = useState<PostRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'events'>('feed');

  // --- Функция для загрузки данных ---
  // Оборачиваем в useCallback для использования в onRefresh и useFocusEffect
  const loadPosts = useCallback(async () => {
    try {
      // Получаем все посты без фильтрации по community_id
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Feed fetch error:", error);
      Alert.alert('Ошибка', 'Не удалось загрузить ленту.');
    }
  }, []);

  // --- Эффекты ---
  // Первоначальная загрузка
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadPosts().finally(() => setIsLoading(false));
    }, [loadPosts])
  );

  // Ручное обновление
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadPosts();
    setIsRefreshing(false);
  }, [loadPosts]);


  // --- Рендеринг ---

  // Компонент-заглушка для пустого списка
  const ListEmptyComponent = (
    <View style={styles.center}>
      <Text style={styles.emptyText}>Лента публикаций пуста</Text>
    </View>
  );

  // Пока идет первая загрузка, показываем центральный индикатор
  if (isLoading && posts.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#E94975" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* --- Шапка с переключателем вкладок --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}>
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>Лента публикаций</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}>
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>События</Text>
        </TouchableOpacity>
      </View>

      {/* --- Список постов --- */}
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }} // Отступ снизу
        // Добавляем функционал "Pull to Refresh"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        // Компонент, если список пуст
        ListEmptyComponent={!isLoading ? ListEmptyComponent : null}
      />
    </View>
  );
}

// --- Стили ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f2f5' 
  },
  center: { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    padding: 16, 
    paddingTop: 60, // Отступ для статус-бара
    gap: 8, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e5e7eb' 
  },
  tab: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8, 
    backgroundColor: '#f3f4f6' 
  },
  activeTab: { 
    backgroundColor: '#e5e7eb' // Более темный фон для активной вкладки
  },
  tabText: { 
    fontFamily: 'Onest-Medium', 
    color: '#374151' 
  },
  activeTabText: { 
    fontFamily: 'Onest-SemiBold',
    color: 'black' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    fontFamily: 'Onest-Regular', 
    color: 'gray',
    fontSize: 16,
  },
});