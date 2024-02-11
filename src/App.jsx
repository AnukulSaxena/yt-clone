import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {
  Header
} from './Components'
import { useDispatch, useSelector } from 'react-redux'
import authService from './Express/authConfig'
import { login, logout } from './store/authSlice'
function App() {
  const { sideBarStatus } = useSelector(state => state.home)
  const dispatch = useDispatch()

  useEffect(() => {
    (async function checkStatus() {
      const response = await authService.getCurrentUser();
      console.log(response)
      if (response) {
        dispatch(login(response.data.data))
      } else {
        dispatch(logout())
      }
    })()
  }, [])

  return (
    <div className='h-screen pt-16 relative flex w-full bg-neutral-300 dark:bg-gray-700'>
      <Header />
      <div
        className={`h-screen overflow-y-scroll w-full  fixed left-0 md:left-[20%] md:w-[80%] transform ease-in-out duration-700`}
      >
        <main className='h-full'>
          <Outlet />
        </main></div>
    </div>
  )
}

export default App
