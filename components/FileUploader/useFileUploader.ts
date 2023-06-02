import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export const useFileUploader = (
  name: string,
  setCustomImage?: (file: File) => void
) => {
  const [imageIsDraggedOver, setImageIsDraggedOver] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, setValue, getValues } = useFormContext();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);
    setCustomImage?.(event.target.files![0]);
    setPreviewImage(file);
    setPreviewFileName(event.target.files![0].name);
  };
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    setImageIsDraggedOver(false);
    e.preventDefault();
    e.stopPropagation();
    let file = e.dataTransfer.files[0];
    setCustomImage?.(file);
    setValue(name, file);
    setPreviewFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
  };

  const resetImage = (e: MouseEvent) => {
    e.preventDefault();
    setPreviewFileName('');
    setPreviewImage('');
    setValue(name, '');
  };
  console.log(getValues());

  return {
    imageIsDraggedOver,
    changeHandler,
    dropHandler,
    previewImage,
    fileRef,
    previewFileName,
    setImageIsDraggedOver,
    register,
    resetImage,
  };
};
