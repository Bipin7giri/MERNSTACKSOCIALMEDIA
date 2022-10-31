import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modeAction } from '../../app/slice/darklightSlice';
import { searchAction } from '../../app/slice/searchBarSlice';
import { Button, Drawer } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { authAction } from '../../app/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(searchAction.searchQuery(searchQuery));
  }, [searchQuery]);
  const logout = () => {
    dispatch(authAction.logout());
    navigate('/login');
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.isMode);
  // alert(mode);
  const changeMode = () => {
    if (mode === false || mode === null) {
      dispatch(modeAction.light());
    } else if (mode === true) {
      dispatch(modeAction.dark());
    }
  };
  return (
    <div>
      {/* <Button
        type='primary'
        onClick={showDrawer}
      >
        Open
      </Button> */}
      <Drawer
        title='Basic Drawer'
        placement='right'
        onClose={onClose}
        open={open}
        height='800px'
      ></Drawer>
      <header class=' py-4  shadow-xs sticky '>
        <div class='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 light:text-purple-300'>
          {/* <!-- Mobile hamburger --> */}
          <Drawer
            title='Basic Drawer'
            placement='right'
            onClose={onClose}
            open={open}
            height='800px'
          >
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>Home</span>
              </a>
            </div>
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>
                  Notifications
                </span>
                <span class='px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full'>
                  1.2k
                </span>
              </a>
            </div>
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>
                  Messages
                </span>
              </a>
            </div>
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>Friends</span>
                <span class='px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full'>
                  (15)
                </span>
              </a>
            </div>
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>Lists</span>
              </a>
            </div>
            <div class=' p-2 flex '>
              <Link
                to='/profile'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    ></path>
                  </svg>
                </span>
                <span class='ml-2 text-sm tracking-wide truncate'>Profile</span>
              </Link>
            </div>
            <div class=' p-2 flex '>
              <a
                href='#'
                class={
                  mode === true
                    ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                    : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                }
              >
                <span class='inline-flex justify-center items-center ml-4'>
                  <svg
                    class='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    ></path>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    ></path>
                  </svg>
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  <span class='ml-2 text-sm tracking-wide truncate'>
                    Logout
                  </span>
                </button>
              </a>
            </div>
          </Drawer>
          <button
            onClick={showDrawer}
            class='p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple'
          >
            <svg
              class='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fill-rule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div className='lg:hidden'>
          <input
            onKeyUp={(e) => setSearchQuery(e.target.value)}
            type='search'
            class='ml-16 mb-5  w-3/4 py-2 pl-4  pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-gray-50 focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue'
            style={{ borderRadius: 25 }}
            placeholder='Search'
            autocomplete='off'
          />
        </div>

        <div class='flex justify-end'>
          <div className='ml-56'>
            {/* changing dark mode */}
            <li class=' list-none'>
              <button
                onClick={() => changeMode()}
                class='align-middle rounded-full border-2 border-gray-300 shadow-lg  focus:shadow-outline-purple focus:outline-none'
              >
                <img
                  class='object-cover w-10 h-10 rounded-full hover-image-1 flex-shrink-0'
                  src='https://cdn-icons-png.flaticon.com/512/8338/8338708.png'
                  alt=''
                  aria-hidden='true'
                />
              </button>
            </li>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Story;
