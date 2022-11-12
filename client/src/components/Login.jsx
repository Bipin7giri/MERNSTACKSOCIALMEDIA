import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { authAction } from '../app/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
const Login = () => {
  const [details, setDetails] = useState({
    gmail: '',
    password: '',
  });
  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Required';
      return error;
    } else if (value.length <= 7) {
      error = 'Password must be greater or equal than 8 ';
      console.log(error);

      return error;
    } else {
      setDetails({ ...details, password: value });
    }
  }
  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
      return error;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
      return error;
    } else {
      setDetails({ ...details, gmail: value });
    }
  }

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  const [validate, setValidate] = useState();
  const dispatch = useDispatch();

  const sendToDb = () => {
    axios
      .post('http://127.0.0.1:3000/auth/login', details, { headers: {} })
      .then((response) => {
        setLoginStatus(response.data.status);
        console.log(response.data.token);
        dispatch(authAction.saveToken(response.data.token));
      });

    if (loginStatus === 'matched') {
      dispatch(authAction.login());
      dispatch(authAction.getEmail(details.gmail));
      navigate('/');
    } else if (loginStatus === 'not matched') {
      setValidate('password doesnot matched');
    } else if (loginStatus === 'not registered') {
      setValidate('Email not registered');
    }
  };

  return (
    <div class='container mt-48 flex mx-auto items-center justify-center'>
      <div class='left w-1/3 mx-14'>
        <img
          class='w-80'
          src='fb.svg'
          alt=''
        />
        <p class='text-3xl mx-8'>
          SOCIAL MEDIA helps you connect and share with the people in your life.
        </p>
      </div>

      <div class='right flex flex-col bg-white p-8 rounded-xl w-1/4 text-lg relative'>
        <h1 className='text-red-400'>{validate}</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
            sendToDb();
          }}
        >
          {({ errors, touched, isValidating }) => (
            <Form className='flex flex-col'>
              <Field
                name='email'
                validate={validateEmail}
                class='px-4 h-12 my-2 border border-1 outline-blue-600 border-gray-200 rounded-lg'
                type='text'
                placeholder='Email address or phone number'
              />
              {errors.email && touched.email && <div>{errors.email}</div>}

              <Field
                name='password'
                validate={validatePassword}
                class='px-4 h-12 my-2 border border-1 outline-blue-600 border-gray-200 rounded-lg'
                type='password'
                placeholder='Password'
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}

              <button
                type='submit'
                class='bg-blue-600 hover:bg-blue-700 text-white my-2 py-3 rounded-md font-bold'
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <span class='text-blue-600 text-center text-sm my-2 cursor-pointer hover:underline'>
          Forgotten password?
        </span>
        <hr class='my-2' />
        <button class='bg-green-600 hover:bg-green-700 text-white my-2 py-3 px-4 mx-auto rounded-md font-bold w-fit'>
          <Link to='/register'>Create New Account</Link>
        </button>
        <span class='absolute -bottom-12 text-sm'>
          <span class='font-bold hover:underline cursor-pointer'>
            Create a Page{' '}
          </span>
          for a celebrity, brand or business.
        </span>
      </div>
    </div>
  );
};

export default Login;
