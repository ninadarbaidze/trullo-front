export type Board = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
  name: string;
};

export type TaskType = {
  id: string;
  taskPosition: number;
  content: string;
  columnId: number;
  boardId: number;
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
};

export type Profile = {
  username: string;
  email: string;
  new_password: string;
  image: blob | string;
  repeat_password?: string;
};

export type ProfileBackInfo = {
  avatar: string;
  email: string;
  id: number;
  isVerified: boolean;
  password: string;
  username: string;
};
