import axios from 'axios'; 
import { RegistrationData } from '@/lib/contexts/RegistrationContext';
import { LoginFormData } from '@/lib/validation/authSchemas';

export const apiClient = axios.create({
      baseURL: 'https://mosprom.misis-team.ru',
      headers: { 'Content-Type': 'application/json' },
     }); 
     
export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  description?: string;
  contact?: string;
  place_of_job?: string;
  place_of_study?: string;
  id: number;
  created_at: string;
  profile_photo?: string;
  vk_avatar?: string;
  skills: string[];
  communities: string[];
}


const handleApiError = (error: any, customMessages: { [key: number]: string } = {}): string => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;
    if (customMessages[status]) return customMessages[status];
    if (serverMessage) return `Ошибка ${status}: ${serverMessage}`;
    return `Произошла ошибка сервера (код: ${status})`;
  } else if (axios.isAxiosError(error)) {
    return 'Ошибка сети. Не удалось подключиться к серверу.';
  }
  return 'Произошла непредвиденная ошибка.';
};

export const getSkills = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get('/users/skills/all');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const registerUser = async (userData: RegistrationData): Promise<any> => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error, { 400: 'Пользователь с такой почтой уже существует.' }));
  }
};

export const loginUser = async (credentials: LoginFormData): Promise<{ access_token: string }> => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error, {
      401: 'Неверный email или пароль.',
      404: 'Пользователь с таким email не найден.',
    }));
  }
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};