import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Button: React.FC<{
  onClick: ({ ...arg }) => void;
  text: string;
  icon?: string;
  classNme?: string;
}> = (props) => {
  return (
    <button
      className={`${props.classNme} flex gap-2 justify-between border border-gray-400 text-gray-400 rounded-lg px-4 py-1`}
      onClick={props.onClick}
      type='button'
    >
      {props.icon === 'plus' && <PlusIcon className='w-4' />}
      {props.icon === 'edit' && <PencilIcon className='w-3' />}
      {props.text}
    </button>
  );
};

export default Button;
