import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export const useMultipleFileUploader = (
  name: string,
  setCustomImage?: (file: string) => void
) => {
  const [imageIsDraggedOver, setImageIsDraggedOver] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const [previewData, setPreviewData] = useState([
    {
      title: '',
      file: '',
      type: '',
    },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, setValue, getValues } = useFormContext();

  const files = useWatch({ name: 'attachments' });

  console.log(files);

  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${getValues(
    'avatar'
  )}`;

  const getLocalImageObjectURL = (file: File) => {
    return URL.createObjectURL(file);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const arrayOfFiles = Array.from(event.target?.files!);
    console.log(arrayOfFiles);
    setValue('attachments', [...files, ...arrayOfFiles]);
    // setPreviewData(
    //   arrayOfFiles?.map((file) => ({
    //     title: file.name,
    //     file: URL.createObjectURL(file),
    //     type: file.type,
    //   }))
    // );
    // console.log(event.target.files);
    // const file = URL.createObjectURL(event.target.files![0]);
    // setValue(name, event.target.files![0]);
    // setCustomImage?.(file);
    // setPreviewImage(file);
    // setPreviewFileName(event.target.files![0].name);
  };

  const removeFileHandler = (index: number) => {
    try {
      files.splice(index, 1);
      setValue('attachments', [...files]);
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

  const download = async (i: number) => {
    let url;
    try {
      if (true) {
        url = window.URL.createObjectURL(files[i]);
      } else {
        // url = window.URL.createObjectURL(new Blob([res]));
      }
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', files[i].name);
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
    imageUrl,
    files,
    getLocalImageObjectURL,
    removeFileHandler,
    download,
  };
};
