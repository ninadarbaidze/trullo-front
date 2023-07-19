import { Label, SetState } from 'types/global';

export type Props = {
  setAssignedLabels: SetState<Label[]>;
  assignedLabels: Label[];
  className?: string;
  taskId?: number;
};
