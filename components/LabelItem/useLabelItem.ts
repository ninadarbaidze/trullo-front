import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { deleteLabel } from 'services';
import { Label, SetState } from 'types/global';

export const useLabelItem = (
  i: number,
  setLabels: SetState<Label[]> | undefined,
  removeAssignedLabelHandler?: (label: Label) => void
) => {
  const [labelEditDialogIsOpen, setLabelEditDialogIsOpen] = useState(false);

  const token = getCookie('token') as string;

  const deleteLabelHandler = async (label: Label) => {
    try {
      setLabels?.((prev) => {
        let newState = [...prev];
        newState.splice(i, 1);
        return newState;
      });
      removeAssignedLabelHandler?.(label);
      await deleteLabel(token, label.id!);
    } catch (err: any) {
      console.error(err);
    }
  };
  return {
    deleteLabelHandler,
    labelEditDialogIsOpen,
    setLabelEditDialogIsOpen,
  };
};
