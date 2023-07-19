import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { deleteLabel } from 'services';
import { Label, SetState } from 'types/global';

export const useLabelItem = (
  i: number,
  setLabels: SetState<Label[]> | undefined
) => {
  const [labelEditDialogIsOpen, setLabelEditDialogIsOpen] = useState(false);

  const token = getCookie('token') as string;

  const deleteLabelHandler = async (labelId: number) => {
    try {
      setLabels?.((prev) => {
        let newState = [...prev];
        newState.splice(i, 1);
        return newState;
      });
      await deleteLabel(token, labelId);
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
