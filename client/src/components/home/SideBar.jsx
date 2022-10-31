import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../app/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
const SideBar = () => {
  const authEmail = useSelector((state) => state.auth.email);
  const withoutQuotesEmail = authEmail?.replaceAll('"', '');
  const [notification, setNotification] = useState([]);
  const getNotification = () => {
    axios
      .get(`http://127.0.0.1:3000/posts/notification/${withoutQuotesEmail}`)
      .then((response) => {
        setNotification(response.data.notification);
        // console.log(response.data.notification);
      });
  };

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const postFromRedux = useSelector((state) => state.post.post);
  // const notification = postFromRedux.filter((item, index) => {
  //   if (item.email === withoutQuotesEmail) {
  //     return item;
  //   }
  // });

  // let notificationStatus = false;
  // if (notification.length > 0) {
  //   notificationStatus = true;
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const notification = useSelector((state) => state.notification.notification);

  const mode = useSelector((state) => state.mode.isMode);
  const logout = () => {
    dispatch(authAction.logout());
    navigate('/login');
  };
  return (
    <div>
      <aside
        class={
          mode === true
            ? 'z-20 hidden w-80 h-full overflow-y-auto  md:block flex-shrink-0'
            : 'z-20 hidden w-80 overflow-y-auto  md:block flex-shrink-0  dark:bg-gray-900'
        }
      >
        <div class=' h-14 flex justify-center'>
          {/* <!-- <img src="./images/logo.png" class="w-32 h-24 mt-10"> --> */}
        </div>
        <div class=' mt-24 p-2 flex justify-center'>
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

        {/* <!--          <div class=" my-5 flex justify-center">
            <button class="inline-block py-2 w-4/5 px-4 text-gray-700 font-semibold text-sm no-underline border-b-1 border-gray-300 p-2 rounded-md font-medium  hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline">#Explore</button>
        </div> --> */}

        <div class=' my-2 p-2 flex justify-center'>
          <button
            onClick={() => {
              setModal1Open(true);
              getNotification();
            }}
            class={
              mode === true
                ? 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
                : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
            }
          >
            <span class='inline-flex justify-center items-center ml-4'>
              <svg
                class='w-5 h-5'
                // fill={notificationStatus === true ? 'green' : 'none'}
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
            <span
            // class={
            //   notificationStatus === true
            //     ? 'ml-2 text-sm tracking-wide truncate text-green-600'
            //     : 'ml-2 text-sm tracking-wide truncate'
            // }
            >
              Notifications
            </span>
            <span class='px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full'></span>
          </button>
        </div>

        <div class=' my-2 p-2 flex justify-center'>
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
            <span class='ml-2 text-sm tracking-wide truncate'>Messages</span>
          </a>
        </div>

        <div class=' my-2 p-2 flex justify-center'>
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

        <div class=' my-2 p-2 flex justify-center'>
          <Link
            to={`/profile/${authEmail}`}
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

        <div class=' my-2 p-2 flex justify-center'>
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
              <span class='ml-2 text-sm tracking-wide truncate'>Logout</span>
            </button>
          </a>
        </div>
      </aside>
      <Modal
        title='Notification'
        style={{
          top: 20,
        }}
        visible={modal1Open}
        onCancel={() => {
          setModal1Open(false);
        }}
        onOk={() => setModal1Open(false)}
      >
        {notification.map((item) => {
          return <h1>{item}</h1>;
        })}
      </Modal>
    </div>
  );
};

export default SideBar;
