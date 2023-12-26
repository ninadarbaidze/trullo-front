import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export const useFileUploader = (
  name: string,
  setCustomImage?: (file: string) => void,
  submitImage?: () => void
) => {
  const [imageIsDraggedOver, setImageIsDraggedOver] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, setValue, getValues } = useFormContext();

  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${getValues(
    'avatar'
  )}`;

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);
    setValue(name, event.target.files![0]);
    setCustomImage?.(file);
    setPreviewImage(file);
    setPreviewFileName(event.target.files![0].name);
    submitImage?.();
  };
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    setImageIsDraggedOver(false);
    e.preventDefault();
    e.stopPropagation();
    let file = e.dataTransfer.files[0];
    setValue(name, file);
    setPreviewFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
    setCustomImage?.(URL.createObjectURL(file));
  };

  const resetImage = (e: MouseEvent) => {
    e.preventDefault();
    setPreviewFileName('');
    setPreviewImage('');
    setValue(name, '');
    setCustomImage?.('');
  };

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
    imageUrl,
  };
};
