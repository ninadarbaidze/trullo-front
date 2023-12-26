import { getCookie } from 'cookies-next';
import { useState, useRef, ChangeEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { deleteTaskAttachment, downloadAttachment } from 'services';
import { BackAttachment } from 'types/global';

export const useMultipleFileUploader = (
  name: string,
  setCustomImage?: (file: string) => void,
  submitImages?: (files: File[]) => void
) => {
  const { register, setValue } = useFormContext();

  const [imageIsDraggedOver, setImageIsDraggedOver] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');

  const fileRef = useRef<HTMLInputElement>(null);
  const token = getCookie('token') as string;

  const files = useWatch({ name: 'attachments' });

  const getLocalImageObjectURL = (file: File | BackAttachment) => {
    return (file as File)?.name
      ? URL.createObjectURL(file as File)
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${
          (file as BackAttachment).file
        }`;
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const arrayOfFiles = Array.from(event.target?.files!);
    setValue('attachments', [...files, ...arrayOfFiles]);
    submitImages?.(arrayOfFiles);
  };

  const removeFileHandler = async (index: number, fileId: number) => {
    try {
      files.splice(index, 1);
      setValue('attachments', [...files]);
      await deleteTaskAttachment(token, fileId);
    } catch (err: any) {
      console.error(err);
    }
  };
  const resetImage = (e: MouseEvent) => {
    e.preventDefault();
    setPreviewFileName('');
    setPreviewImage('');
    setValue(name, '');
    setCustomImage?.('');
  };

  const download = async (i: number, fileName?: string, id?: number) => {
    let url;
    try {
      if (!fileName) {
        url = window.URL.createObjectURL(files[i]);
      } else {
        const response = await downloadAttachment(token, id as number);
        url = window.URL.createObjectURL(new Blob([response]));
      }

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName ?? files[i].name);
      document.body.appendChild(link);
      link.click();
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    imageIsDraggedOver,
    changeHandler,
    previewImage,
    fileRef,
    previewFileName,
    setImageIsDraggedOver,
    register,
    resetImage,
    files,
    getLocalImageObjectURL,
    removeFileHandler,
    download,
  };
};
