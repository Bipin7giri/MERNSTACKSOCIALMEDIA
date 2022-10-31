import './App.css';
import Home from './components/home/Home';
import Login from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './components/home/Profile';
import { useSelector, useDispatch } from 'react-redux';
import Register from './components/Register';
import Test from './components/messenger/Test';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { userAction } from './app/slice/userSlice';

const App = () => {
  return (
    <div className='App'>
      {/* <Home /> */}
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/profile/:gmail'
          element={<Profile />}
        />
        <Route
          path='/messenger'
          element={<Test />}
        />
      </Routes>
    </div>
  );
};

export default App;
