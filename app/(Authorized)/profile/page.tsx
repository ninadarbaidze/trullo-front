'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { FileUploader } from 'components';

const Page = () => {
  const form = useForm({});
  const setCustomImage = (image: File) => {};

  return (
    <section className='mt-16 pt-12 pl-8'>
      <FormProvider {...form}>
        <form encType='multipart/form-data'>
          <FileUploader
            name='avatar'
            setCustomImage={setCustomImage}
            // hiddenDropBox={true}
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
