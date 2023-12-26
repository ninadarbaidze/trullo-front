import React from 'react';

const X: React.FC<{
  className?: string;
  pathClassName?: string;
}> = (props) => {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      className={props.className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        className={props.pathClassName}
        d='M1.00501 1.00501C1.27838 0.731646 1.7216 0.731646 1.99496 1.00501L4.99999 4.01004L8.00501 1.00501C8.27838 0.731646 8.7216 0.731646 8.99496 1.00501C9.26833 1.27838 9.26833 1.7216 8.99496 1.99496L5.98994 4.99999L8.99496 8.00501C9.26833 8.27838 9.26833 8.7216 8.99496 8.99496C8.7216 9.26833 8.27838 9.26833 8.00501 8.99496L4.99999 5.98994L1.99496 8.99496C1.7216 9.26833 1.27838 9.26833 1.00501 8.99496C0.731646 8.7216 0.731646 8.27838 1.00501 8.00501L4.01004 4.99999L1.00501 1.99496C0.731646 1.7216 0.731646 1.27838 1.00501 1.00501Z'
        fill='#111827'
      />
    </svg>
  );
};

export default X;
