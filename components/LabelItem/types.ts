import { Label, SetState } from 'types/global';

export type Props = {
  isInEditMode?: boolean;
  i: number;
  label: Label;
  setLabels?: SetState<Label[]>;
  assignLabel?: (label: Label) => void;
  removeAssignedLabelHandler?: (label: Label) => void;
  canNotEdit?: boolean;
  taskId?: number;
};
