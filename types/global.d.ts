export type Board = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
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
