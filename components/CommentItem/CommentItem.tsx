import { UserInfo } from 'components/UserInfo';
import { getFormattedDateAndTime } from 'helpers';
import { Props } from './types';
import React from 'react';
import { UserProfile } from 'types/global';
import { useCommentItem } from './useCommentItem';

const CommentsSection: React.FC<Props> = (props) => {
  const { setIsInEditMode, isInEditMode, textAreaEditRef, user } =
    useCommentItem();
  return (
    <li
      key={props.comment.id}
      className={`flex flex-col gap-2 ${
        props.i === props.comments.length - 1 ? '' : 'border-b'
      }  pb-4`}
    >
      <div id='comment-header' className='flex items-center justify-between'>
        <div id='user_info' className='flex gap-2'>
          <UserInfo
            user={props.comment.user as UserProfile}
            hideName={true}
            imageSize='w-10 h-10'
          />
          <div>
            <h3 className='font-semibold capitalize'>
              {`${props.comment.user.firstName} 
        ${props.comment.user.lastName}`}
            </h3>
            <p className='text-xs text-gray400'>
              {getFormattedDateAndTime(props.comment.createdAt as string)}
            </p>
          </div>
        </div>
        {props.comment.userId === user.id && (
          <nav className='flex items-center gap-1 text-sm text-gray300'>
            <button type='button' onClick={() => setIsInEditMode(true)}>
              Edit
            </button>
            <p>-</p>
            <button
              type='button'
              onClick={() => props.deleteCommentHandler(props.comment.id!)}
            >
              Delete
            </button>
          </nav>
        )}
      </div>
      {isInEditMode ? (
        <div className='w-full relative'>
          <article>
            <textarea
              name='comment'
              className='border resize-none p-3 text-xs border-gray200 rounded-lg w-full shadow-md h-24'
              placeholder='Write a comment..'
              ref={textAreaEditRef}
              defaultValue={props.comment.content}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.editComment(
                    props.comment.id!,
                    textAreaEditRef?.current?.value!
                  );
                  setIsInEditMode(false);
                }
              }}
            />

            <nav className='absolute bottom-2 right-2'>
              <button
                className='text-xs text-gray300 bg-white px-3 py-1 rounded-lg cursor-pointer'
                onClick={() => setIsInEditMode(false)}
                type='button'
              >
                cancel
              </button>
              <button
                className='bg-blue500 disabled:cursor-not-allowed text-xs text-white px-3 py-1 rounded-lg cursor-pointer'
                onClick={() => {
                  if (textAreaEditRef?.current?.value) {
                    props.editComment(
                      props.comment.id!,
                      textAreaEditRef?.current?.value!
                    );
                    setIsInEditMode(false);
                  }
                }}
                type='button'
              >
                Save
              </button>
            </nav>
          </article>
        </div>
      ) : (
        <div id='comment_content' className='break-all'>
          {props.comment.content}
        </div>
      )}
    </li>
  );
};

export default CommentsSection;
