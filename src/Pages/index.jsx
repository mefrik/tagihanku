import React from 'react';
import { Outlet} from 'react-router-dom';
import LoginPage from './Login/LoginPage';


export default function Bar() {
  return (
    <>
        <LoginPage/>
        <Outlet />
    </>
  );
}
