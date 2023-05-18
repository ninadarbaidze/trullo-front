export type Board = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
};

export type TaskType = {
  id: String;
  taskPosition: number;
  content: String;
  columnId: number;
  boardId: number;
};

export type ColumnType = {
  id: string;
  title: string;
  columnPosition: number;
  taskIds: string[];
};
