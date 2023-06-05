import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Props } from './types';
import { useFileUploader } from './useFileUploader';

const FileUploader: React.FC<Props> = (props) => {
  const {
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
  } = useFileUploader(props.name, props.setCustomImage);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setImageIsDraggedOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setImageIsDraggedOver(false);
      }}
      onDrop={(e) => dropHandler(e)}
      className={`flex flex-col items-center h-28 w-44 ${
        imageIsDraggedOver ? 'border-blue500' : ''
      } ${
        !props.hiddenDropBox
          ? ' border-2 border-dashed rounded-lg border-gray-300 transition-all delay-75'
          : ''
      }`}
      onClick={() =>
        (!previewImage || props.imageReseted) &&
        !props.disabled &&
        fileRef.current!.click()
      }
    >
      {!props.hiddenDropBox && (
        <div className='flex flex-col items-center justify-center h-full '>
          {previewImage ? (
            <div className='relative'>
              <div className='w-12 rounded-md overflow-clip '>
                <img src={previewImage || imageUrl} alt={'uploaded_image'} />
              </div>
              <button
                className='absolute -top-2 -right-2 z-50'
                type='button'
                onClick={(e: any) => resetImage(e)}
              >
                <XMarkIcon className='bg-red-300 w-4 rounded-full text-red-600' />
              </button>
            </div>
          ) : (
            <>
              <PhotoIcon
                className={`${
                  imageIsDraggedOver
                    ? 'text-blue500 w-12'
                    : 'text-gray-400 w-10'
                }  transition-all delay-75`}
              />
            </>
          )}

          {previewFileName ? (
            <p className='text-[10px] px-3 text-center truncate w-[80%]'>
              {previewFileName}
            </p>
          ) : (
            <p
              className={`${
                imageIsDraggedOver ? 'text-blue500' : 'text-gray-400'
              } text-[10px] px-3 text-center  transition-all delay-75`}
            >
              Drag and drop or click to upload
            </p>
          )}
        </div>
      )}

      <input
        type='file'
        {...register(props.name)}
        ref={fileRef}
        accept='image/*'
        onChange={(e) => changeHandler(e)}
        hidden
      />
      {props.uploadBtnText && !props.disabled && (
        <p className={`${props.uploadBtnStyle} cursor-pointer`}>
          {props.uploadBtnText}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
