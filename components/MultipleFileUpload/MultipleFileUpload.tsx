import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Props } from './types';
import { useMultipleFileUploader } from './useMultipleFileUpload';
import { getFormattedDate } from 'helpers';
import Image from 'next/image';
import { Button } from 'components';
import { BackAttachment } from 'types/global';

const MultipleFileUpload: React.FC<Props> = (props) => {
  const {
    changeHandler,
    register,
    files,
    getLocalImageObjectURL,
    removeFileHandler,
    download,
  } = useMultipleFileUploader(
    props.name,
    props.setCustomImage,
    props.submitImages
  );

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
          {files?.map((item: File | BackAttachment, i: number) => {
            const frontFile = ((item as File).name && item) as File;
            const backFile = ((item as BackAttachment).file &&
              item) as BackAttachment;
            return (
              <li key={i} className='flex gap-4'>
                <article>
                  {(
                    backFile
                      ? backFile.type === 1
                      : frontFile?.type?.includes('application')
                  ) ? (
                    <div className='w-24 h-20 text-base rounded-md flex items-center justify-center bg-gray400 text-white'>
                      <DocumentTextIcon className='w-10 text-gray-700' />
                    </div>
                  ) : (
                    <div className='flex overflow-clip w-24 h-20 relative rounded-lg object-cover z-10'>
                      <Image
                        src={getLocalImageObjectURL(
                          frontFile ? frontFile : backFile
                        )}
                        loader={() =>
                          getLocalImageObjectURL(
                            frontFile ? frontFile : backFile
                          )
                        }
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
                    {getFormattedDate(
                      frontFile ? frontFile.lastModified : backFile?.createdAt
                    )}
                  </p>
                  <h3 className='text-xs font-semibold w-96 truncate'>
                    {frontFile?.name ?? backFile.file}
                  </h3>
                  <nav className='flex gap-3 text-xs'>
                    <Button
                      text={'Download'}
                      onClick={() => download(i, backFile.file, backFile.id)}
                    />
                    {!frontFile && (
                      <Button
                        text={'Delete'}
                        onClick={() => removeFileHandler(i, backFile?.id)}
                      />
                    )}
                  </nav>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
