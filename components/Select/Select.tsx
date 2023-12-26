'use client';
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Props } from './types';
import { AllUser } from 'types/global';
import { getFirstInitials } from 'helpers';
import Image from 'next/image';

const Select: React.FC<Props> = (props) => {
  const [list, setList] = useState<AllUser[]>([]);
  const [initialList, setInitialList] = useState<AllUser[]>([]);

  useEffect(() => {
    setList(props.list);
    setInitialList(props.list);
  }, [props.list]);

  return (
    <div className={`${props.className} absolute z-40 top-9 shadow-md`}>
      <div className='flex flex-col gap-1 relative border rounded-lg bg-white px-2 py-2'>
        <div>
          <h3 className='font-semibold'>Members</h3>
          <p className='text-gray-400 mb-2'>{props.description}</p>
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <input
            type='search'
            className='border rounded-md py-[5px] pl-2 text-sm w-full relative shadow-md'
            onChange={(e) => {
              setList((_prev) => {
                return initialList.filter((item) => {
                  let arrayItemToString = item.firstName + ' ' + item.lastName;
                  let inputValueToString = e.target.value.toString();
                  return arrayItemToString.includes(inputValueToString);
                });
              });
            }}
            placeholder='User...'
          />
          <div className=''>
            <MagnifyingGlassIcon className='absolute w-8 top-[4.3rem] right-2 bg-blue500 text-white rounded-md p-1' />
          </div>

          <ul className='flex flex-col w-full h-36 overflow-y-auto z-30 bg-white border rounded-md py-1 px-2 shadow-md text-sm'>
            {props.usersIsLoading
              ? Array.from(Array(3).keys())?.map((item) => (
                  <li
                    key={item}
                    className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-[80%] mt-2 h-8'
                  ></li>
                ))
              : list.map((user, i) => (
                  <li
                    onClick={() => {
                      setList((prev) => {
                        let newState = [...prev];
                        return newState.map((list) =>
                          list.id === user.id
                            ? { ...list, isChecked: !list.isChecked }
                            : list
                        );
                      });
                      setInitialList((prev) => {
                        let newState = [...prev];
                        return newState.map((list) =>
                          list.id === user.id
                            ? { ...list, isChecked: !list.isChecked }
                            : list
                        );
                      });
                    }}
                    key={i}
                    className='flex gap-2 justify-between items-center  py-2 font-medium cursor-pointer'
                  >
                    {!user?.avatar ? (
                      <div className='w-10 h-10 text-base rounded-md flex items-center justify-center bg-gray400 text-white'>
                        {' '}
                        {getFirstInitials(user?.firstName, user?.lastName)}
                      </div>
                    ) : (
                      <div className='w-10 h-10 overflow-clip rounded-lg relative'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
                          loader={() =>
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
                          }
                          fill
                          alt=''
                        />
                      </div>
                    )}

                    <p className='w-48 truncate'>
                      {user.firstName + ' ' + user.lastName}
                    </p>
                    {user.isChecked ? (
                      <CheckIcon className='w-4 h-4 p-[1px] bg-green-200 rounded-full text-green-700' />
                    ) : (
                      <div className='w-4' />
                    )}
                  </li>
                ))}
          </ul>
          <button
            className='bg-blue500 text-white w-24 py-1 rounded-lg my-3'
            type='button'
            onClick={() =>
              props.sendBoardInviteHandler?.(
                list.filter((user) => user.isChecked)
              )
            }
          >
            {props.btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
