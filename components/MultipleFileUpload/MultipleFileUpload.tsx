import {
  PhotoIcon,
  XMarkIcon,
  PlusIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Props } from './types';
import { useMultipleFileUploader } from './useMultipleFileUpload';
import { firstTwoChars, getFirstInitials, getFormattedDate } from 'helpers';
import Image from 'next/image';

const MultipleFileUpload: React.FC<Props> = (props) => {
  const {
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
  } = useMultipleFileUploader(props.name, props.setCustomImage);

  return (
    <div className={`${props.boxClassName} flex flex-col items-center  w-44`}>
      <input
        type='file'
        {...register(props.name)}
        ref={props.fileRef}
        multiple
        accept='image/*, .pdf, .doc, .xml'
        onChange={(e) => changeHandler(e)}
        hidden
      />
      <div className='w-full'>
        <ul className='flex flex-col gap-7'>
          {files.map((file, i) => (
            <li key={i} className='flex gap-4'>
              <article>
                {file.type.includes('application') ? (
                  <div className='w-36 h-24 text-base rounded-md flex items-center justify-center bg-gray400 text-white'>
                    <DocumentTextIcon className='w-10 text-gray-700' />
                  </div>
                ) : (
                  <div className='flex overflow-clip w-36 h-24 relative rounded-lg object-cover z-10'>
                    <Image
                      src={getLocalImageObjectURL(file)}
                      loader={() => getLocalImageObjectURL(file)}
                      alt='default_profile'
                      className='rounded'
                      fill
                      objectFit='cover'
                    />
                  </div>
                )}
              </article>

              <article className='flex flex-col justify-between'>
                <p className='text-xs text-gray-400'>
                  {getFormattedDate(file.lastModified)}
                </p>
                <h3 className='text-base font-semibold w-96 truncate'>
                  {file.name}
                </h3>
                <nav className='flex gap-3'>
                  <button
                    className='border border-gray-400 text-gray-400 rounded-lg px-4 py-1'
                    onClick={() => download(i)}
                  >
                    Download
                  </button>
                  <button
                    className='border border-gray-400 text-gray-400 rounded-lg px-4 py-1'
                    onClick={() => removeFileHandler(i)}
                  >
                    Delete
                  </button>
                </nav>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
