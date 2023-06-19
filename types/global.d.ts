import { Dispatch, SetStateAction } from 'react';

export type Board = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
  name: string;
  users: UserProfile[];
};

export type TaskType = {
  id: string;
  taskPosition: number;
  content: string;
  columnId: number;
  boardId: number;
  image: string;
};

export type ColumnType = {
  id: string;
  title: string;
  columnPosition: number;
  taskIds: string[];
};

export type Placeholder = {
  clientHeight: number | null;
  clientWidth: number | null;
  clientX: number | null;
  clientY: number | null;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  repeat_password?: string;
  firstName: string;
  lastName: string;
};
export type LoginData = {
  username: string;
  password: string;
  remember?: boolean;
};

export type Boards = {
  id: number;
  name: string;
  image: string | null;
  userId: number;
  users: ProfileBackInfo[];
};

export type Profile = {
  username: string;
  email: string;
  new_password: string;
  image: blob | string;
  repeat_password?: string;
  firstName: string;
  lastName: string;
};

export type ProfileBackInfo = {
  avatar: string;
  email: string;
  id: number;
  isVerified: boolean;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
};

export interface UserProfile extends ProfileBackInfo {
  name?: string;
}

export interface AllUser extends UserProfile {
  isChecked: boolean;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type FormDirtyFields<T> = {
  [key: keyof T]: boolean;
};

type ValueOf<T> = T[keyof T];

export type BoardDetail = {
  id: number;
  name: string;
  image: string;
  boardOwnerId: number;
  createdAt: string;
  users: UserProfile[];
  boardOwner: UserProfile;
  description?: string;
};

export type TaskDetailForm = {
  name: string;
  image: string;
  attachments: BackAttachment[] | File[];
  comments: [];
  description: string;
};

export type BackAttachment = {
  id: number;
  file: string;
  taskId: number;
  type: number;
  createdAt: string;
};

export type TaskDetail = {
  id: number;
  taskPosition: number;
  content: string;
  image: string | null;
  columnId: number;
  boardId: number;
  difficulty: null;
  attachments: BackAttachment[];
  description: {
    id: number;
    content: string;
    taskId: number;
  };
};
