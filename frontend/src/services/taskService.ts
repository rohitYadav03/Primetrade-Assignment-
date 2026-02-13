import api from './api';

import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TasksResponse,
} from '../types';

export const getAllTasks = async (): Promise<TasksResponse> => {
  const response = await api.get<TasksResponse>('/tasks');
  return response.data;
};

// Get single task by ID
export const getTaskById = async (id: number): Promise<TaskResponse> => {
  const response = await api.get<TaskResponse>(`/tasks/${id}`);
  return response.data;
};

// Create new task
export const createTask = async (data: CreateTaskRequest): Promise<TaskResponse> => {
  const response = await api.post<TaskResponse>('/tasks', data);
  return response.data;
};

// Update task
export const updateTask = async (
  id: number,
  data: UpdateTaskRequest
): Promise<TaskResponse> => {
  const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
  return response.data;
};

// Delete task
export const deleteTask = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/tasks/${id}`);
  return response.data;
};