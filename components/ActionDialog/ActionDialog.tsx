import React from 'react';

const ActionDialog: React.FC<{
  deleteHandler: () => void;
  editHandler?: () => void;
  canRename?: boolean;
}> = (props) => {
  return (
    <div className='bg-white w-32 border border-gray200 rounded-xl text-gray300 shadow-md text-[10px] font-normal'>
      <div className='flex flex-col justify-center w-full gap-2 p-2'>
        {props.canRename && (
          <button
            className='text-left border-b pb-2 hover:text-gray-400'
            onClick={() => props.editHandler?.()}
          >
            Rename
          </button>
        )}
        <button
          className='text-left hover:text-gray-400'
          onClick={() => props.deleteHandler()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActionDialog;
