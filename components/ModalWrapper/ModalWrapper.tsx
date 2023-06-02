import React from 'react';

const ModalWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  return (
    <div
      className={`${props.className} w-full h-full top-16 left-0 fixed bg-black  bg-opacity-10 backdrop-filter  z-30 backdrop-blur-sm`}
    >
      <div className='bg-white fixed overflow-auto top-[30%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-mainDark rounded-[12px] z-40'>
        {props.children}
      </div>
    </div>
  );
};

export default ModalWrapper;
