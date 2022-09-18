import React from 'react'
import Drawer from './Drawer'
import useGetUserLogin from '../../hooks/useGetUserLogin';

export default function IndexDashboard() {
  const user = useGetUserLogin()
  return (
    <>
      <Drawer
        isLoading={user.isLoading}
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        photo={user.photo}
        verified={user.verified}
        uid={user.uid}
      />
    </>
  )
}
