// components/PostCard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { likePost, unlikePost, getCommunityById } from 'api/api';
import { Heart, MessageSquare, PlusCircle } from 'lucide-react-native';
import { PostRead } from 'api/types';

// Тип для информации об авторе поста (сообществе или пользователе)
interface AuthorInfo {
  name: string;
  avatarUrl?: string | null;
  details: string;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  } catch { return dateString; }
};

const formatCount = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};


export default function PostCard({ post }: { post: PostRead }) {
  // --- Состояния ---
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo | null>(null);

  // --- Загрузка данных об авторе ---
  useEffect(() => {
    // Если есть community_id, значит пост от сообщества
    if (post.community_id) {
      getCommunityById(post.community_id)
        .then(community => {
          setAuthorInfo({
            name: community.title,
            avatarUrl: community.avatar_url,
            details: `${community.skills.slice(0, 1).join(', ')}, ${community.member_count} подписчиков`,
          });
        })
        .catch(() => {
          // Если сообщество не найдено
          setAuthorInfo({ name: 'Неизвестное сообщество', details: '' });
        });
    } else {
      // TODO: Загрузить данные о пользователе по post.author_id
      setAuthorInfo({
        name: `Пользователь ${post.author_id}`,
        avatarUrl: null, // заглушка
        details: formatDate(post.created_at),
      });
    }
  }, [post.community_id, post.author_id]);

  // --- Обработчик лайка ---
  const handleLike = async () => {
    // Оптимистичное обновление UI
    const originalLiked = isLiked;
    const originalCount = likeCount;

    setIsLiked(!originalLiked);
    setLikeCount(originalLiked ? originalCount - 1 : originalCount + 1);

    try {
      const apiCall = originalLiked ? unlikePost : likePost;
      const response = await apiCall(post.id);
      // Обновляем состояние из ответа сервера для синхронизации
      setIsLiked(response.liked);
      setLikeCount(response.like_count);
    } catch (error) {
      // В случае ошибки откатываем изменения
      setIsLiked(originalLiked);
      setLikeCount(originalCount);
      console.error('Like/unlike failed:', error);
    }
  };

  if (!authorInfo) {
    return null; 
  }

  return (
    <View style={styles.card}>
  
      <View style={styles.header}>
        <Image 
          source={authorInfo.avatarUrl ? { uri: authorInfo.avatarUrl } : require('assets/images/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.authorName}>{authorInfo.name}</Text>
          <Text style={styles.authorDetails}>{authorInfo.details}</Text>
        </View>
        {post.community_id && (
          <TouchableOpacity style={styles.subscribeButton}>
            <PlusCircle size={28} color="#E94975" />
          </TouchableOpacity>
        )}
      </View>


      <Text style={styles.content}>{post.text}</Text>


      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Heart size={22} color={isLiked ? '#E94975' : '#9CA3AF'} fill={isLiked ? '#E94975' : 'none'} />
            <Text style={[styles.actionText, isLiked && { color: '#E94975' }]}>
              {formatCount(likeCount)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageSquare size={22} color="#9CA3AF" />
            <Text style={styles.actionText}>{formatCount(post.comment_count)}</Text>
          </TouchableOpacity>
        </View>
        {/* TODO: Добавить логику для кнопки "К событию" */}
        {/* <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.eventButtonText}>К событию</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  headerText: { flex: 1 },
  authorName: { fontFamily: 'Onest-SemiBold', fontSize: 18 },
  authorDetails: { fontFamily: 'Onest-Regular', fontSize: 13, color: 'gray' },
  subscribeButton: { padding: 4 },
  content: { fontFamily: 'Onest-Regular', fontSize: 16, lineHeight: 24, marginBottom: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16 },
  actionText: { fontFamily: 'Onest-Medium', marginLeft: 6, color: '#6B7280' },
  eventButton: { backgroundColor: '#E94975', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 16 },
  eventButtonText: { color: 'white', fontFamily: 'Onest-SemiBold' },
});