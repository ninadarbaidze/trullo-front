import React from 'react';
import { SetState } from 'types/global';

const ModalWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  setModalIsOpen?: SetState<boolean>;
  modalClass?: string;
  customFunction?: () => void;
}> = (props) => {
  return (
    <>
      <div
        className={`${props.className} w-full h-full top-16 left-0 fixed bg-black  bg-opacity-10 backdrop-filter  z-[45] backdrop-blur-sm`}
        onClick={() => {
          props.setModalIsOpen?.((prev) => !prev);
          props.customFunction?.();
        }}
      ></div>
      <div
        className={`${props.modalClass} bg-white fixed overflow-auto top-[40%] left-[50%] translate-y-[-50%] z-[45] translate-x-[-50%] bg-mainDark rounded-[12px]`}
      >
        {props.children}
      </div>
    </>
  );
};

export default ModalWrapper;
