import React from 'react';

const AddButton: React.FC<{
  text: string;
  onclick?: () => void;
  className?: string;
}> = (props) => {
  return (
    <button
      className={`${props.className} text-white bg-blue500 rounded-lg px-3 py-2`}
      onClick={props.onclick}
    >
      <p> + {props.text}</p>
    </button>
  );
};

export default AddButton;
