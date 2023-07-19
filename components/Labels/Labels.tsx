'use client';
import { TagIcon } from '@heroicons/react/24/outline';
import { Props } from './types';

import { Button, LabelItem } from 'components';
import { useLabels } from './useLabels';
import { colors } from './utils';

const Labels: React.FC<Props> = (props) => {
  const {
    labelRef,
    styles,
    setSelectedColor,
    createLabel,
    labels,
    isInEditMode,
    setIsInEditMode,
    selectedColor,
    setLabels,
    assignLabel,
    removeAssignedLabelHandler,
  } = useLabels(props.assignedLabels, props.setAssignedLabels, props.taskId);
  return (
    <div
      className={`${props.className} absolute w-72 z-40 -top-2 right-[100%] shadow-md`}
    >
      <div className='flex flex-col gap-1 relative border rounded-lg bg-white px-2 py-2'>
        <div className='flex flex-col items-start'>
          <h3 className='font-semibold'>Label</h3>
          <p className='text-gray-400 mb-2'>Select a name and a color</p>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <input
            type='text'
            className='border rounded-md py-[5px] pl-2 text-sm w-full relative shadow-md placeholder:text-xs'
            placeholder='Label...'
            ref={labelRef}
          />

          <ul className='grid grid-cols-4  gap-1 mt-2 flex-col w-full h-full overflow-y-auto z-30 bg-white py-1  text-sm'>
            {colors.map((color, i) => (
              <li
                onClick={() => setSelectedColor(color)}
                key={i}
                className={`${styles[color]} ${
                  selectedColor === color ? 'border-2 border-blue-600' : ''
                } col-span-1 rounded w-full flex gap-2 justify-between items-center h-8  py-2 font-medium cursor-pointer`}
              ></li>
            ))}
          </ul>
          <article className='mt-2 w-full'>
            <div className='flex justify-between items-center w-full'>
              <div className='flex text-gray300 text-left items-center gap-2 text-sm'>
                <TagIcon className='w-4' />
                Available
              </div>
              {isInEditMode ? (
                <button
                  className='text-xs text-gray-400'
                  type='button'
                  onClick={() => setIsInEditMode(false)}
                >
                  Done
                </button>
              ) : (
                <Button
                  text={'Edit'}
                  icon={'edit'}
                  onClick={() => setIsInEditMode(true)}
                  classNme='text-xs px-1'
                />
              )}
            </div>

            <ul className='flex flex-wrap gap-2 mt-2'>
              {labels.map((label, i) => (
                <LabelItem
                  label={label}
                  i={i}
                  key={i}
                  isInEditMode={isInEditMode}
                  setLabels={setLabels}
                  assignLabel={assignLabel}
                  removeAssignedLabelHandler={removeAssignedLabelHandler}
                  taskId={props.taskId}
                />
              ))}
            </ul>
          </article>
        </div>
        <button
          className='bg-blue500 disabled:bg-opacity-30 text-center w-full  text-white py-1 rounded-lg my-3'
          type='button'
          onClick={() => labelRef.current!.value.trim() && createLabel()}
          disabled={!selectedColor && !labelRef.current?.value}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Labels;
