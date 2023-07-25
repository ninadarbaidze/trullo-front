import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

import React, { useRef, useState } from 'react';

const TinyMCE: React.FC<{
  submitTextHandler: (data: string) => void;
  isInEditMode: boolean;
  value?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isTaskEdit?: boolean;
}> = (props) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    <div className={`${!props.value ? 'border-b' : ''}`}>
      <div
        className={`${
          isInEditMode ? 'border rounded-md border-gray400 ' : ''
        } px-4 py-1`}
      >
        {props.isLoading ? (
          <div className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-full h-16' />
        ) : (
          <Editor
            apiKey={`${process.env.NEXT_PUBLIC_TINY_API}`}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={props.value}
            disabled={props.disabled}
            init={{
              toolbar_sticky: true,
              height: 300,
              autoresize_bottom_margin: false,
              min_height: 300,
              menubar: false,
              branding: false,
              highlight_on_focus: false,
              inline: true,
              plugins: `advlist autolink lists  link paste autoresize table`,
              advlist_bullet_styles: 'disc',

              toolbar:
                'formatselect | ' +
                'bold italic forecolor | alignleft aligncenter  ' +
                'bullist numlist | link',

              content_style: props.isTaskEdit
                ? '.tox-tinymce-inline {z-index: 200 !important; top: 20% !important; left: 20% !important;   } .mce-edit-focus:focus-visible {outline: none}'
                : '.tox-tinymce-inline {z-index: 200 !important;   } .mce-edit-focus:focus-visible {outline: none}',

              smart_paste: true,
            }}
            onFocusIn={() => setIsInEditMode(true)}
            onBlur={() => {
              props.submitTextHandler(
                editorRef.current!.getContent() as string
              );
              setIsInEditMode(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TinyMCE;
