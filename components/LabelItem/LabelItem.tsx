import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLabelItem } from './useLabelItem';
import { Props } from './types';

const LabelItem: React.FC<Props> = (props) => {
  const {
    labelEditDialogIsOpen,
    deleteLabelHandler,
    setLabelEditDialogIsOpen,
  } = useLabelItem(
    props.i,
    props.setLabels,
    props.removeAssignedLabelHandler,
    props.taskId
  );

  return (
    <li
      key={props.i}
      className={`relative ${
        props.canNotEdit ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      {labelEditDialogIsOpen && (
        <nav className='absolute top-0 right-2 text-[10px] w-24 flex flex-col bg-white border rounded-lg z-50'>
          <button
            type='button'
            className='border-b py-1'
            onClick={() => {
              props.removeAssignedLabelHandler?.(props.label);
              setLabelEditDialogIsOpen(false);
            }}
          >
            Remove
          </button>
          <button
            type='button'
            className='py-1'
            onClick={() => {
              deleteLabelHandler(props.label), setLabelEditDialogIsOpen(false);
            }}
          >
            Delete label
          </button>
        </nav>
      )}
      <div
        className={`${props.label.color} bg-opacity-20 px-2 rounded-md text-center text-xs relative`}
      >
        {props.isInEditMode && props.setLabels && (
          <button
            className='absolute -top-1 -right-1 z-40'
            type='button'
            onClick={() => setLabelEditDialogIsOpen((prev) => !prev)}
          >
            <XMarkIcon className='bg-red-300 w-[0.8rem] rounded-full text-red-600' />
          </button>
        )}

        <p
          onClick={() => !props.canNotEdit && props.assignLabel?.(props.label)}
        >
          {props.label.title}
        </p>
      </div>
    </li>
  );
};

export default LabelItem;
