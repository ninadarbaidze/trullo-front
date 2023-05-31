export type PropsTypes = {
  tasks: TaskType[];
  column: ColumnType;
  index: number;
  addMoreTasks: (arg1: string, arg2: string) => void;
  key: string;
  placeholderProps: Placeholder;
  deleteTaskHandler: (taskId: string, columnId: string) => void;
  deleteColumnHandler: (columnId: string) => void;
};