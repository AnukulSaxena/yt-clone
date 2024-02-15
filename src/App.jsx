import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {
  Header
} from './Components'
import { useDispatch, useSelector } from 'react-redux'
import authService from './Express/authConfig'
import { login, logout } from './store/authSlice'
function App() {
  const { isSideBarOpen } = useSelector(state => state.home)
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
    <div className='h-screen pt-16 relative flex w-full bg-neutral-300 dark:bg-neutral-800'>
      <Header />
      <div
        className={`h-screen overflow-y-scroll no-scrollbar fixed ${isSideBarOpen ? "md:left-[15%] md:w-[85%]" : "md:w-full md:left-0"} w-full left-0  transform ease-in-out duration-700`}
      >
        <main className='h-full'>
          <Outlet />
        </main></div>
    </div>
  )
}

export default App
