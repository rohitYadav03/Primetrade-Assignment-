import api from './api';
import type { RegisterRequest, LoginRequest, AuthResponse, User } from '../types';

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const getCurrentUser = async (): Promise<{ user: User }> => {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  // Backend mein logout endpoint nahi hai, so just clear client state
};


export const getAllUsers = async () => {
  const response = await api.get('/auth/users');
  return response.data;
};