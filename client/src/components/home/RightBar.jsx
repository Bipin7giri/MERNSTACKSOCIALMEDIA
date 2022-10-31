import React from 'react';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { userAction } from '../../app/slice/userSlice';
import { Button, notification } from 'antd';
import { useState } from 'react';
function RightBar() {
  const [getUser, setUsers] = useState([]);
  const postFromRedux = useSelector((state) => state.post.post);
  const trending = postFromRedux.map((item, index) => {
    return item.tags;
  });

  const tempObjForTrending = {};
  trending.forEach((item, id) => {
    tempObjForTrending[item] =
      tempObjForTrending[item] === undefined ? 1 : tempObjForTrending[item] + 1;
  });

  const sortTrending = Object.keys(tempObjForTrending).sort((a, b) => {
    return tempObjForTrending[b] - tempObjForTrending[a];
  });

  const dispatch = useDispatch();
  const authEmail = useSelector((state) => state.auth.email);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/auth/followers/${authEmail}`)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);
  console.log(getUser);
  const users = useSelector((state) => state.user.users);

  const addFollow = (followID) => {
    axios
      .post(`http://127.0.0.1:3000/auth/followers`, {
        followID,
        authEmail,
      })
      .then((response) => {
        notification.open({
          message: 'You Have followed' + followID,

          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      });
  };
  const search = useSelector((state) => state.search.initialQuery);
  const onlyUser = getUser.map((item, id) => {
    return item;
  });
  console.log(onlyUser);
  const filtered =
    search === ''
      ? onlyUser
      : onlyUser.filter((item) => {
          if (item.gmail?.includes(search)) {
            return item;
          }
        });
  return (
    <div class='hidden md:block lg:block py-8  sticky top-6'>
      <SearchBar />
      <card class=' w-96 rounded-lg shadow-lg'>
        <header class='font-bold text-2xl px-5 py-4'>Who to follow</header>
        <main class='px-5'>
          {filtered.map((item) => {
            return (
              <content class='grid grid-cols-6'>
                <div class=''>
                  <img
                    src={require('../../assets/images/' + item.image)}
                    class='h-8 w-8 rounded-full'
                  />
                </div>
                <div class='col-span-3 px-1 font-semibold flex flex-col'>
                  <div class='text-sm'>{item.gmail}</div>
                  <div class='text-xm text-gray-700 font-light'></div>
                </div>
                <div class='col-span-2 py-2 justify-self-end'>
                  <button
                    onClick={() => addFollow(item)}
                    class=' text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4'
                  >
                    .Follow
                  </button>
                </div>
              </content>
            );
          })}
        </main>
      </card>

      <div class='max-w-sm rounded-lg overflow-hidden shadow-sm m-4 mt-5'>
        {/* <!--first trending tweet--> */}
        {sortTrending.map((tags, id) => {
          return (
            <div class='flex'>
              <div class='flex-1'>
                <p class='px-4 ml-2 mt-3 w-48 text-xs text-gray-400'>
                  {id + 1} . Trending
                </p>
                <h2 class='px-4 ml-2 w-48 font-bold '>#{tags}</h2>
                <p class='px-4 ml-2 mb-3 w-48 text-xs text-gray-400'>
                  {postFromRedux.filter((item) => {
                    if (item.tags === tags) {
                      return true;
                    }
                    return false;
                  }).length + ' posts'}
                </p>
              </div>
              <div class='flex-1 px-4 py-2 m-2'>
                <a
                  href=''
                  class=' text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right'
                >
                  <svg
                    class='m-2 h-5 w-5'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M19 9l-7 7-7-7'></path>
                  </svg>
                </a>
              </div>
            </div>
          );
        })}

        {/* <!--show more--> */}
        <div class='flex'>
          <div class='flex-1 p-4'>
            <h2 class='px-4 ml-2 w-48 font-semibold text-sm text-blue-400'>
              Show more
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
