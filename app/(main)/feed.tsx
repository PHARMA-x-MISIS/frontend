// app/(main)/feed.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FooterTabs from 'components/FooterTabs';

// --- ИСПРАВЛЕНИЕ 1: Определяем тип для объекта поста ---
interface Post {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: string;
}

// --- Указываем тип для массива ---
const mockPosts: Post[] = [
  { id: '1', author: 'Техника', date: 'дата и время публикации', content: 'Текст длинный очень длинный ываамыапмиыамиыамывамвамжршы иадмлваомтдыюалвмтывдмоиыатвдш авомтмажиомтважм отавжмоватмжаов', likes: '2,2k' },
  { id: '2', author: 'Наука', date: 'дата и время публикации', content: 'Это контент второго поста.', likes: '1,5k' },
  { id: '3', author: 'Искусство', date: 'дата и время публикации', content: 'И еще один пост для разнообразия.', likes: '3,1k' },
];

// --- ИСПРАВЛЕНИЕ 1: Указываем тип для пропса 'post' ---
const PostCard = ({ post }: { post: Post }) => (
  <View style={styles.card}>
    <Text style={styles.author}>{post.author}</Text>
    <Text style={styles.date}>{post.date}</Text>
    <Text style={styles.content}>{post.content}</Text>
    {/* Здесь будут иконки лайков/комментариев */}
  </View>
);

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
  author: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 12, color: 'gray', marginBottom: 8 },
  content: { fontSize: 16 },
});