import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../app/slice/postSlice';
import { Button, message } from 'antd';
const AddPost = () => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.post.initialPost);
  const authEmail = useSelector((state) => state.auth.email);

  const [post, setPost] = useState({
    content: '',
    image: '',
    tags: '',
    email: authEmail,
  });

  const formData = new FormData();
  formData.append('image', post.image);
  formData.append('content', post.content);
  formData.append('tags', post.tags);
  formData.append('email', post.email);

  const token = useSelector((state) => state.auth.token);

  const addToDb = () => {
    axios
      .post('http://127.0.0.1:3000/posts', formData, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(postAction.updateNewsFeed());
        message.info(response.data);
      });
  };

  return (
    <form
      encType='multipart/form-data'
      class='bg-white shadow rounded-lg mb-6 p-4 w-full md:w-3/4 '
    >
      <textarea
        onKeyUp={(e) => {
          setPost({ ...post, content: e.target.value });
        }}
        name='message'
        placeholder='Type something...'
        class=' focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400'
      ></textarea>

      <footer class='flex justify-between mt-2'>
        <div class='flex gap-2'>
          <label>
            {/* {post.image} */}
            <input
              onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
              type='file'
              class='text-sm hidden text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          '
            />
            <span class='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                stroke='currentColor'
                stroke-width='2'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='css-i6dzq1'
              >
                <rect
                  x='3'
                  y='3'
                  width='18'
                  height='18'
                  rx='2'
                  ry='2'
                ></rect>
                <circle
                  cx='8.5'
                  cy='8.5'
                  r='1.5'
                ></circle>
                <polyline points='21 15 16 10 5 21'></polyline>
              </svg>
            </span>
          </label>

          <span class='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
            <svg
              viewBox='0 0 24 24'
              width='24'
              height='24'
              stroke='currentColor'
              stroke-width='2'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='css-i6dzq1'
            >
              <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
              <circle
                cx='12'
                cy='10'
                r='3'
              ></circle>
            </svg>
          </span>
          <span class='flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer'>
            <svg
              viewBox='0 0 24 24'
              width='24'
              height='24'
              stroke='currentColor'
              stroke-width='2'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='css-i6dzq1'
            >
              <polyline points='4 17 10 11 4 5'></polyline>
              <line
                x1='12'
                y1='19'
                x2='20'
                y2='19'
              ></line>
            </svg>
          </span>
        </div>
        <div>
          <input
            class=' focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400'
            placeholder='tags'
            onKeyUp={(e) => {
              setPost({ ...post, tags: e.target.value });
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToDb();
          }}
          class='flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg'
        >
          Post
          <svg
            class='ml-1'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            stroke='currentColor'
            stroke-width='2'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <line
              x1='22'
              y1='2'
              x2='11'
              y2='13'
            ></line>
            <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
          </svg>
        </button>
      </footer>
    </form>
  );
};

export default AddPost;
