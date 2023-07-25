import { CommentItem, UserInfo } from 'components';
import React from 'react';
import { useCommentsSection } from './useCommentsSection';
import { UserProfile } from 'types/global';
import { Props } from './types';

const CommentsSection: React.FC<Props> = (props) => {
  const {
    user,
    textareaRef,
    addNewComment,
    editComment,
    deleteCommentHandler,
  } = useCommentsSection(props.comments, props.setComments, props.taskId);
  return (
    <div className='flex flex-col gap-8'>
      <div className='w-full relative'>
        <article>
          <textarea
            name='comment'
            className='border resize-none pt-5 pb-3 pl-12 pr-3 text-xs border-gray200 rounded-lg w-full shadow-md h-24'
            placeholder='Write a comment..'
            ref={textareaRef}
            onKeyDown={(e) => e.key === 'Enter' && addNewComment()}
          />
          <div className='absolute top-3 left-3'>
            <UserInfo
              user={user as UserProfile}
              hideName={true}
              imageSize='w-8 h-8'
            />
          </div>
          <button
            className='bg-blue500 disabled:cursor-not-allowed text-xs text-white px-3 py-1 rounded-lg cursor-pointer absolute bottom-2 right-2'
            onClick={() => addNewComment()}
            type='button'
          >
            Comment
          </button>
        </article>
      </div>
      <ul className='flex flex-col gap-4'>
        {props.comments.map((comment, i) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            i={i}
            comments={props.comments}
            textareaRef={textareaRef}
            editComment={editComment}
            deleteCommentHandler={deleteCommentHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
