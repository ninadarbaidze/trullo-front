import React from 'react';

const Logo: React.FC<{ logoWidth?: string }> = (props) => {
  return (
    <div className={`flex gap-1 ${props.logoWidth}`}>
      <div className='bg-blue500 w-4 h-8 rounded'></div>{' '}
      <div className='bg-blue500 w-4 h-5 rounded'></div>
    </div>
  );
};

export default Logo;
