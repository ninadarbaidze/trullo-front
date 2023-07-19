import { useCallback, useEffect, useRef, useState } from 'react';
import { Colors, Label, SetState } from 'types/global';
import { styles } from './utils';
import {
  addLabel,
  assignLabelToTask,
  getBoardLabels,
  removeLabel,
} from 'services';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { LabelItem } from 'components/LabelItem';

export const useLabels = (
  assignedLabels: Label[],
  setAssignedLabels: SetState<Label[]>,
  taskId?: number
) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [labelEditDialogIsOpen, setLabelEditDialogIsOpen] = useState(false);

  const labelRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  const boardId = +params.id;
  const token = getCookie('token') as string;

  const createLabel = async () => {
    try {
      const labelAlreadyExists = labels.some(
        (item) => item.title === labelRef.current?.value
      );

      if (!labelAlreadyExists) {
        const labelItem = {
          title: labelRef.current?.value as string,
          color: styles[selectedColor as Colors],
        };
        // console.log(labelItem);

        setLabels((prev: Label[]) => {
          return [...prev, labelItem];
        });
        await addLabel(token, boardId, labelItem);
        setSelectedColor('');
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const assignLabel = async (label: Label) => {
    try {
      const labelAlreadyExists = assignedLabels.some(
        (item) => item.title === label.title
      );
      if (!labelAlreadyExists) {
        setAssignedLabels((prev: Label[]) => {
          return [...prev, label];
        });
        await assignLabelToTask(token, taskId!, label.id!);
        setSelectedColor('');
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const removeAssignedLabelHandler = async (label: Label) => {
    try {
      setAssignedLabels((prev: Label[]) => {
        const newState = [...prev];
        const filteredState = newState.filter(
          (item) => item.title !== label.title
        );
        return filteredState;
      });
      await removeLabel(token, taskId!, label.id!);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getBoardLabelsHandler = async () => {
    try {
      const boardLabels = await getBoardLabels(token, boardId);
      console.log(boardLabels);
      setLabels(boardLabels);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBoardLabelsHandler();
  }, []);

  return {
    labelRef,
    styles,
    selectedColor,
    setSelectedColor,
    createLabel,
    labels,
    isInEditMode,
    setIsInEditMode,
    labelEditDialogIsOpen,
    setLabelEditDialogIsOpen,
    setLabels,
    assignLabel,
    removeAssignedLabelHandler,
  };
};
