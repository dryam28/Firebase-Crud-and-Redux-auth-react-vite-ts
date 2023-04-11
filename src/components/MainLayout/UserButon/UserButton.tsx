import React from 'react';
import './userButton.css';
import userIcon from '../../../assets/user-svgrepo-com.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { logout } from '../../../store/slices/authSilce';
import { useDispatch } from 'react-redux';

const UserButton = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);

  return (
    <div className=' bg-white  flex flex-col justify-center '>
      <div className='flex fixed top-5 right-0 items-center justify-center pl-0 p-10'>
        <div className='relative inline-block text-left dropdown'>
          <span className='rounded-md shadow-sm'>
            <button
              className='fixed top-5 right-5 z-10  p-3 bg-slate-500 rounded-full shadow-md  animate-bounce'
              type='button'
              aria-haspopup='true'
              aria-expanded='true'
              aria-controls='headlessui-menu-items-117'
            >
              <img src={userIcon} className='h-8' />
            </button>
          </span>
          <div className='opacity-0   invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
            <div
              className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              aria-labelledby='headlessui-menu-button-1'
              id='headlessui-menu-items-117'
              role='menu'
            >
              <div className='px-4 py-3'>
                <p className='text-sm leading-5'>Signed in as</p>
                <p className='text-sm font-bold leading-5 text-gray-900 truncate'>
                  {email}
                </p>
              </div>
              <div className='py-1'>
                <a
                  tabIndex={0}
                  className='text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                  role='menuitem'
                >
                  Account settings
                </a>
              </div>
              <div className='py-1'>
                <button
                  onClick={() => dispatch(logout())}
                  tabIndex={3}
                  className='text-gray-700 transition flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-sky-700 hover:text-white'
                  role='menuitem'
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserButton;
