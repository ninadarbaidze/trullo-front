import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

import React, { useRef, useState } from 'react';

const TinyMCE: React.FC<{
  submitTextHandler: (data: string) => void;
  isInEditMode: boolean;
  value?: string;
  disabled?: boolean;
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

            content_style:
              '.tox-tinymce-inline {z-index: 200 !important;  } .mce-edit-focus:focus-visible {outline: none;}',
            smart_paste: true,
          }}
          onFocusIn={() => setIsInEditMode(true)}
          onBlur={() => {
            props.submitTextHandler(editorRef.current!.getContent() as string);
            setIsInEditMode(false);
          }}
        />
      </div>
      {/* {isInEditMode && (
        <nav className='flex gap-3 pt-6'>
          <button
            onClick={() => {
              props.submitTextHandler(
                editorRef.current!.getContent() as string
              );
              setIsInEditMode(false);
            }}
            className='text-white bg-green-600 rounded-xl px-3 py-1'
          >
            Save
          </button>
          <button
            className='text-gray-400'
            onClick={() => setIsInEditMode(false)}
          >
            cancel
          </button>
        </nav>
      )} */}
    </div>
  );
};

export default TinyMCE;
