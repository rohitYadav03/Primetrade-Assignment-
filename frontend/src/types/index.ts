export interface User {
  id: number;
  name: string;
  email: string;
  role: 'User' | 'Admin';
  createdAt?: string;
  _count?: {
    tasks: number;
  };
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// API Request types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

// API Response types
export interface AuthResponse {
  message: string;
  user: User;
}

export interface TaskResponse {
  message: string;
  task: Task;
}

export interface TasksResponse {
  message: string;
  count: number;
  tasks: Task[];
}

export interface UsersResponse {
  message: string;
  count: number;
  users: User[];
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}