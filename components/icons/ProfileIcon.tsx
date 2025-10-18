// components/icons/ProfileIcon.tsx
import React from 'react';
import { Feather } from '@expo/vector-icons';

// Определяем типы для props, чтобы можно было передавать цвет, размер и т.д.
interface IconProps {
  color?: string;
  size?: number;
  // Можно добавить другие props, если нужно
}

export function ProfileIcon({ color = 'black', size = 24 }: IconProps) {
  return <Feather name="user" size={size} color={color} />;
}