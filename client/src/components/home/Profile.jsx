import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Story from './Story';
import { userAction } from '../../app/slice/userSlice';
import { followingAction } from '../../app/slice/followingSlice';
import { Link, useParams } from 'react-router-dom';
const Profile = () => {
  const [postById, setPostById] = useState([]);
  const [authId, setAuthId] = useState();

  let { gmail } = useParams();
  console.log(gmail);
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.mode.isMode);
  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/auth/users/${gmail}`).then((response) => {
      dispatch(userAction.saveUser(response.data));
      setAuthId(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/posts/userId/${gmail}`)
      .then((response) => setPostById(response.data.postByID));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:3000/auth/followers/${gmail}`)
  //     .then((response) => {
  //       // dispatch(userAction.saveUser(response.data.allUsers));
  //       dispatch(followingAction.saveFollowing(response.data?.following));
  //     });
  // }, []);

  // const following = useSelector((state) => state);
  // console.log(following);

  // const countFollowing = following?.length;
  const countPost = postById?.length;
  return (
    <div>
      <div className='flex justify-center'>
        <Story />
      </div>

      <aside class={mode === true ? 'bg-white' : 'bg-black'}>
        <div class='bg-white shadow rounded-lg p-10'>
          <div class='flex flex-col gap-1 text-center items-center'>
            {authId?.map((item) => {
              return (
                <>
                  <img
                    class='h-32 w-32 bg-white p-2 rounded-full shadow mb-4'
                    src={item.image === undefined ? '' : item.image}
                  />
                </>
              );
            })}

            <p class='font-semibold'>
              {authId?.map((item) => {
                return item.gmail;
              })}
            </p>

            <div class='text-sm leading-normal text-gray-400 flex justify-center items-center'>
              <svg
                viewBox='0 0 24 24'
                class='mr-1'
                width='16'
                height='16'
                stroke='currentColor'
                stroke-width='2'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                <circle
                  cx='12'
                  cy='10'
                  r='3'
                ></circle>
              </svg>
              Los Angeles, California
            </div>
          </div>
          <div class='flex justify-center items-center gap-2 my-3'>
            <div class='font-semibold text-center mx-4'>
              <p class='text-black'>{countPost}</p>
              <span class='text-gray-400'>Posts</span>
            </div>
            <div class='font-semibold text-center mx-4'>
              <p class='text-black'>102</p>
              <span class='text-gray-400'>Followers</span>
            </div>
            <div class='font-semibold text-center mx-4'>
              {authId?.map((item) => {
                return <p class='text-black'>{item?.Following?.length}</p>;
              })}

              <span class='text-gray-400'>Folowing</span>
            </div>
          </div>
        </div>

        <div class='bg-white shadow mt-6  rounded-lg p-6'>
          <h3 class='text-gray-600 text-sm font-semibold mb-4'>Following</h3>
          <ul class='flex items-center justify-center space-x-2'>
            {/* <!-- Story #1 --> */}
            {authId?.map((item) => {
              return (
                <li class='flex flex-row items-center gap-5'>
                  {/* <!-- Username --> */}
                  {item.Following.map((item, id) => {
                    return (
                      <button
                        onClick={() => {
                          window.location.reload(false);
                        }}
                      >
                        <Link to={`/profile/${item.gmail}`}>
                          <span class='text-xs text-gray-500'>
                            {/* <img
                          class='w-16 rounded-full'
                          src='https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80'
                        /> */}
                            {JSON.stringify(item?.gmail)?.replaceAll('"', '')};
                          </span>
                        </Link>
                      </button>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='grid grid-cols-4 mt-8 '>
          <div className='col-span-1'>
            <SideBar />
          </div>
          <div className='col-span-3 w-[800px] mx-auto'>
            {postById.map((item) => {
              return (
                <div
                  class={
                    mode === true
                      ? 'bg-white shadow rounded-lg pb-4  mt-10'
                      : ' dark:bg-gray-900 shadow rounded-lg  pb-4  mt-10'
                  }
                >
                  <div class='flex flex-row px-2 py-3 mx-3'>
                    <div class='w-auto h-auto rounded-full border-2 border-green-500'>
                      <img
                        class='w-12 h-12 object-cover rounded-full shadow cursor-pointer'
                        alt='User avatar'
                        src={item.user.image}
                      />
                    </div>
                    <div class='flex flex-col mb-2 ml-4 mt-1'>
                      <div
                        class={
                          mode === true
                            ? 'inline flex text-gray-600 text-sm font-semibold'
                            : ' inline flex text-white text-sm font-semibold'
                        }
                      >
                        <span class='flex-1 flex-shrink-0'>{item.email}</span>
                        <span class='mx-1 flex-1 flex-shrink-0'>
                          <svg
                            viewBox='0 0 24 24'
                            style={{ width: 20, color: 'blue' }}
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g
                              data-name='21. Verified'
                              id='_21._Verified'
                            >
                              <path d='M22.51,13.76a3,3,0,0,1,0-3.52l.76-1.05a1,1,0,0,0,.14-.9,1.018,1.018,0,0,0-.64-.64l-1.23-.4A2.987,2.987,0,0,1,19.47,4.4V3.1a1,1,0,0,0-1.31-.95l-1.24.4a3,3,0,0,1-3.35-1.09L12.81.41a1.036,1.036,0,0,0-1.62,0l-.76,1.05A3,3,0,0,1,7.08,2.55l-1.24-.4a1,1,0,0,0-1.31.95V4.4A2.987,2.987,0,0,1,2.46,7.25l-1.23.4a1.018,1.018,0,0,0-.64.64,1,1,0,0,0,.14.9l.76,1.05a3,3,0,0,1,0,3.52L.73,14.81a1,1,0,0,0-.14.9,1.018,1.018,0,0,0,.64.64l1.23.4A2.987,2.987,0,0,1,4.53,19.6v1.3a1,1,0,0,0,1.31.95l1.23-.4a2.994,2.994,0,0,1,3.36,1.09l.76,1.05a1.005,1.005,0,0,0,1.62,0l.76-1.05a3,3,0,0,1,3.36-1.09l1.23.4a1,1,0,0,0,1.31-.95V19.6a2.987,2.987,0,0,1,2.07-2.85l1.23-.4a1.018,1.018,0,0,0,.64-.64,1,1,0,0,0-.14-.9Zm-5.8-3.053-5,5a1,1,0,0,1-1.414,0l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l4.293-4.293a1,1,0,0,1,1.414,1.414Z' />
                            </g>
                          </svg>
                        </span>
                      </div>
                      <div class='flex w-full mt-1'>
                        <div class='text-blue-700 font-base text-xs mr-1 cursor-pointer'>
                          JavaScript Developer
                        </div>
                        <div class='text-gray-400 font-thin text-xs'>
                          • 1 day ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='border-b border-gray-100 p-4'></div>

                  <div class='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'>
                    <img
                      class='rounded w-full'
                      // src={
                      //   'file:///F:/socialMedia/server/images/fadf6ce5-c953-491f-8d64-fee83b36241e-1666154987998.JPG'
                      // }
                      src={item.image === undefined ? '' : item.image}
                    />
                  </div>
                  <div
                    class={
                      mode === true
                        ? 'text-gray-600 font-semibold  mb-2 mx-3 px-2'
                        : ' text-white font-semibold  mb-2 mx-3 px-2'
                    }
                  >
                    {item.title}
                  </div>
                  <div
                    class={
                      mode === true
                        ? 'text-black text-xl mb-6 mx-3 px-2'
                        : ' text-white text-xl mb-6 mx-3 px-2'
                    }
                  >
                    {item.content}
                    <div
                      class={
                        mode === true
                          ? 'text-gray-600 font-semibold  text-xl'
                          : ' text-white font-semibold   text-xl  '
                      }
                    >
                      {'#' + item.tags}
                    </div>
                  </div>
                  <div class='flex justify-start mb-4 border-t border-gray-100'>
                    <div class='flex justify-end w-full mt-1 pt-2 pr-5'>
                      <span class='transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          width='14px'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                          ></path>
                        </svg>
                      </span>
                      <button class='transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer'>
                        {item['likes']?.map((item) => {
                          if (item.email === gmail) {
                            return (
                              <svg
                                class='h-4 w-4 text-red-500'
                                fill={item.like === null ? 'fill' : 'red'}
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                stroke-width='2'
                              >
                                <div>{item.like}</div>
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
                                ></path>
                              </svg>
                            );
                          }
                        })}
                      </button>
                    </div>
                  </div>
                  <div class='flex w-full border-t border-gray-100'>
                    <div class='mt-3 mx-5 flex flex-row text-xs'>
                      <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                        Comments:
                        <div class='ml-1 text-gray-400 text-ms'>
                          {' '}
                          {JSON.stringify(item['comments']?.length)}
                        </div>
                      </div>
                      <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                        Views:{' '}
                        <div class='ml-1 text-gray-400 text-ms'> 60k</div>
                      </div>
                    </div>
                    <div class='mt-3 mx-5 w-full flex justify-end text-xs'>
                      <div class='flex text-gray-700  rounded-md mb-2 mr-4 items-center'>
                        Likes:{' '}
                        <div class='ml-1 text-gray-400 text-ms'>
                          {JSON.stringify(item['likes']?.length)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>

                  <div className=''>
                    {item['comments']?.map((item, id) => {
                      if (item.email) {
                        return (
                          <div class='w-full flex flex-start overflow-y-auto'>
                            <div class='w-1/2'>
                              <div class='flex items-center'>
                                <img
                                  class='h-5 w-5 overflow-hidden rounded-full'
                                  src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500'
                                  alt=''
                                />
                                <p class='font-semibold ml-3 text-sm text-slate-600'>
                                  {item.email}
                                  <span class='text-slate-400 text-xs'>
                                    3:21 PM
                                  </span>
                                </p>
                              </div>

                              <div class='mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl'>
                                <p class=' text-sm text-slate-500'>
                                  {item.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                // <div class='bg-white shadow rounded-lg pb-4'>
                //   <img src={require('../../assets/images/' + item.image)} />
                //   <div class='flex flex-row px-2 py-3 mx-3'>
                //     <div class='w-auto h-auto rounded-full border-2 border-green-500'>
                //       <img
                //         class='w-12 h-12 object-cover rounded-full shadow cursor-pointer'
                //         alt='User avatar'
                //         src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200'
                //       />
                //     </div>
                //     <div class='flex flex-col mb-2 ml-4 mt-1'>
                //       <div class='inline flex text-gray-600 text-sm font-semibold'>
                //         <span class='flex-1 flex-shrink-0'>
                //           {item.email?.replaceAll('"', '')}
                //         </span>
                //         <span class='mx-1 flex-1 flex-shrink-0'>
                //           <svg
                //             viewBox='0 0 24 24'
                //             style={{ width: 20, color: 'blue' }}
                //             xmlns='http://www.w3.org/2000/svg'
                //           >
                //             <g
                //               data-name='21. Verified'
                //               id='_21._Verified'
                //             >
                //               <path d='M22.51,13.76a3,3,0,0,1,0-3.52l.76-1.05a1,1,0,0,0,.14-.9,1.018,1.018,0,0,0-.64-.64l-1.23-.4A2.987,2.987,0,0,1,19.47,4.4V3.1a1,1,0,0,0-1.31-.95l-1.24.4a3,3,0,0,1-3.35-1.09L12.81.41a1.036,1.036,0,0,0-1.62,0l-.76,1.05A3,3,0,0,1,7.08,2.55l-1.24-.4a1,1,0,0,0-1.31.95V4.4A2.987,2.987,0,0,1,2.46,7.25l-1.23.4a1.018,1.018,0,0,0-.64.64,1,1,0,0,0,.14.9l.76,1.05a3,3,0,0,1,0,3.52L.73,14.81a1,1,0,0,0-.14.9,1.018,1.018,0,0,0,.64.64l1.23.4A2.987,2.987,0,0,1,4.53,19.6v1.3a1,1,0,0,0,1.31.95l1.23-.4a2.994,2.994,0,0,1,3.36,1.09l.76,1.05a1.005,1.005,0,0,0,1.62,0l.76-1.05a3,3,0,0,1,3.36-1.09l1.23.4a1,1,0,0,0,1.31-.95V19.6a2.987,2.987,0,0,1,2.07-2.85l1.23-.4a1.018,1.018,0,0,0,.64-.64,1,1,0,0,0-.14-.9Zm-5.8-3.053-5,5a1,1,0,0,1-1.414,0l-3-3a1,1,0,1,1,1.414-1.414L11,13.586l4.293-4.293a1,1,0,0,1,1.414,1.414Z' />
                //             </g>
                //           </svg>
                //         </span>
                //       </div>
                //       <div class='flex w-full mt-1'>
                //         <div class='text-blue-700 font-base text-xs mr-1 cursor-pointer'>
                //           JavaScript Developer
                //         </div>
                //         <div class='text-gray-400 font-thin text-xs'>
                //           • 1 day ago
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                //   <div class='border-b border-gray-100 p-4'></div>

                //   <div class='text-gray-600 font-semibold  mb-2 mx-3 px-2'>
                //     {item.title}
                //   </div>
                //   <div class='text-gray-500 text-sm mb-6 mx-3 px-2'>
                //     {item.content}
                //   </div>
                //   <div class='flex justify-start mb-4 border-t border-gray-100'>
                //     <div class='flex w-full mt-1 pt-2 pl-5'>
                //       <span class='bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2'>
                //         <svg
                //           xmlns='http://www.w3.org/2000/svg'
                //           fill='none'
                //           width='14px'
                //           viewBox='0 0 24 24'
                //           stroke='currentColor'
                //         >
                //           <path
                //             stroke-linecap='round'
                //             stroke-linejoin='round'
                //             stroke-width='2'
                //             d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                //           ></path>
                //         </svg>
                //       </span>
                //       <img
                //         class='inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                //         src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                //         alt=''
                //       />
                //       <img
                //         class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                //         src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                //         alt=''
                //       />
                //       <img
                //         class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                //         src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80'
                //         alt=''
                //       />
                //       <img
                //         class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                //         src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80'
                //         alt=''
                //       />
                //     </div>
                //     <div class='flex justify-end w-full mt-1 pt-2 pr-5'>
                //       <span class='transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2'>
                //         <svg
                //           xmlns='http://www.w3.org/2000/svg'
                //           fill='none'
                //           width='14px'
                //           viewBox='0 0 24 24'
                //           stroke='currentColor'
                //         >
                //           <path
                //             stroke-linecap='round'
                //             stroke-linejoin='round'
                //             stroke-width='2'
                //             d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                //           ></path>
                //         </svg>
                //       </span>
                //       <span class='transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer'>
                //         <svg
                //           class='h-4 w-4 text-red-500'
                //           fill='none'
                //           viewBox='0 0 24 24'
                //           stroke='currentColor'
                //           stroke-width='2'
                //         >
                //           <path
                //             stroke-linecap='round'
                //             stroke-linejoin='round'
                //             d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
                //           ></path>
                //         </svg>
                //       </span>
                //     </div>
                //   </div>
                //   <div class='flex w-full border-t border-gray-100'>
                //     <div class='mt-3 mx-5 flex flex-row text-xs'>
                //       <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                //         Comments:
                //         <div class='ml-1 text-gray-400 text-ms'> 30</div>
                //       </div>
                //       <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                //         Views:{' '}
                //         <div class='ml-1 text-gray-400 text-ms'> 60k</div>
                //       </div>
                //     </div>
                //     <div class='mt-3 mx-5 w-full flex justify-end text-xs'>
                //       <div class='flex text-gray-700  rounded-md mb-2 mr-4 items-center'>
                //         Likes:{' '}
                //         <div class='ml-1 text-gray-400 text-ms'> 120k</div>
                //       </div>
                //     </div>
                //     <ul></ul>
                //   </div>
                //   <div>
                //     {item['comments']?.map((item, id) => {
                //       if (item.email) {
                //         return (
                //           <>
                //             <h1 className='text-xl text-black'>{item.email}</h1>
                //             <div>
                //               <h1 className='border-sky-500'>{item.comment}</h1>
                //             </div>
                //           </>
                //         );
                //       }
                //     })}
                //   </div>
                //   <div class='relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400'>
                //     <img
                //       class='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer'
                //       alt='User avatar'
                //       src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80'
                //     />
                //     <span class='absolute inset-y-0 right-0 flex items-center pr-6'>
                //       <button
                //         type='submit'
                //         class='p-1 focus:outline-none focus:shadow-none hover:text-blue-500'
                //       >
                //         <svg
                //           class='w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400'
                //           xmlns='http://www.w3.org/2000/svg'
                //           fill='none'
                //           viewBox='0 0 24 24'
                //           stroke='currentColor'
                //         >
                //           <path
                //             stroke-linecap='round'
                //             stroke-linejoin='round'
                //             stroke-width='2'
                //             d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                //           ></path>
                //         </svg>
                //       </button>
                //     </span>
                //     <input
                //       // onKeyUp={(e) =>
                //       //   setComment({ ...comment, comment: e.target.value })
                //       // }
                //       type='search'
                //       class='w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue'
                //       style={{ borderRadius: 25 }}
                //       placeholder='Post a comment...'
                //       autocomplete='off'
                //     />
                //   </div>
                //   <div className='flex justify-end px-5'>
                //     {/* <button
                //         onClick={(e) => {
                //           e.preventDefault();
                //           saveComment(item._id);
                //         }}
                //         type='button'
                //         class='inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'
                //       >
                //         Add Comment
                //       </button> */}
                //   </div>
                // </div>
              );
            })}
            <div class='bg-white shadow rounded-lg mt-10'>
              <div class='flex flex-row px-2 py-3 mx-3'>
                <div class='w-auto h-auto rounded-full border-2 border-green-500'>
                  <img
                    class='w-12 h-12 object-cover rounded-full shadow cursor-pointer'
                    alt='User avatar'
                    src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200'
                  />
                </div>
                <div class='flex flex-col mb-2 ml-4 mt-1'>
                  <div class='text-gray-600 text-sm font-semibold'>
                    Sara Lauren
                  </div>
                  <div class='flex w-full mt-1'>
                    <div class='text-blue-700 font-base text-xs mr-1 cursor-pointer'>
                      UX Design
                    </div>
                    <div class='text-gray-400 font-thin text-xs'>
                      • 1 day ago
                    </div>
                  </div>
                </div>
              </div>
              <div class='border-b border-gray-100'></div>
              <div class='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'>
                <img
                  class='rounded w-full'
                  src='https://picsum.photos/536/354'
                />
              </div>
              <div class='text-gray-600 font-semibold  mb-2 mx-3 px-2'>
                Dummy text of the printing and typesetting industry
              </div>
              <div class='text-gray-500 text-sm mb-6 mx-3 px-2'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500
              </div>
              <div class='flex justify-start mb-4 border-t border-gray-100'>
                <div class='flex w-full mt-1 pt-2 pl-5'>
                  <span class='bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      width='14px'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                      ></path>
                    </svg>
                  </span>
                  <img
                    class='inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                    src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                  />
                  <img
                    class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                    src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                  />
                  <img
                    class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80'
                    alt=''
                  />
                  <img
                    class='inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer'
                    src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                  />
                </div>
                <div class='flex justify-end w-full mt-1 pt-2 pr-5'>
                  <span class='transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      width='14px'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                      ></path>
                    </svg>
                  </span>
                  <span class='transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer'>
                    <svg
                      class='h-4 w-4 text-red-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div class='flex w-full border-t border-gray-100'>
                <div class='mt-3 mx-5 flex flex-row text-xs'>
                  <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                    Comments:
                    <div class='ml-1 text-gray-400 text-ms'> 30</div>
                  </div>
                  <div class='flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center'>
                    Views: <div class='ml-1 text-gray-400 text-ms'> 60k</div>
                  </div>
                </div>
                <div class='mt-3 mx-5 w-full flex justify-end text-xs'>
                  <div class='flex text-gray-700  rounded-md mb-2 mr-4 items-center'>
                    Likes: <div class='ml-1 text-gray-400 text-ms'> 120k</div>
                  </div>
                </div>
              </div>
              <div class='relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400'>
                <img
                  class='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer'
                  alt='User avatar'
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80'
                />
                <span class='absolute inset-y-0 right-0 flex items-center pr-6'>
                  <button
                    type='submit'
                    class='p-1 focus:outline-none focus:shadow-none hover:text-blue-500'
                  >
                    <svg
                      class='w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                  </button>
                </span>
                <input
                  type='search'
                  class='w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue'
                  style={{ borderRadius: 25 }}
                  placeholder='Post a comment...'
                  autocomplete='off'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-[800px] mx-auto mt-5 '></div>
      </aside>
    </div>
  );
};

export default Profile;
