import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginUser as apiLogin } from 'api/api'; // Импортируем нашу новую функцию
import { LoginFormData } from 'src/lib/validation/authSchemas';
import { apiClient } from 'api/api'; // Импортируем apiClient

const TOKEN_KEY = 'my-jwt';

interface AuthContextType {
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
  token: string | null;
  isLoading: boolean; // Этот флаг поможет избежать "мерцания" экранов при запуске
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // При запуске приложения пытаемся загрузить токен из хранилища
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
          // ВАЖНО: Устанавливаем токен в заголовки для всех будущих запросов
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (e) {
        console.error("Failed to load token", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const signIn = async (data: LoginFormData) => {
    const { access_token } = await apiLogin(data);
    await SecureStore.setItemAsync(TOKEN_KEY, access_token);
    setToken(access_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const value = { signIn, signOut, token, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};