export interface Task {
  id: number;
  description: string;
  category: 'work' | 'personal' | 'urgent';
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export type TaskCategory = Task['category'];
export type TaskPriority = Task['priority'];
export type FilterType = 'all' | 'active' | 'completed' | 'work' | 'personal' | 'urgent';

export interface TaskFormData {
  description: string;
  category: TaskCategory;
  dueDate?: string;
  priority: TaskPriority;
}