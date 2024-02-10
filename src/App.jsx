import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Header
} from './Components'
function App() {

  return (
    <div className='min-h-screen relative flex w-full bg-neutral-300 dark:bg-gray-700'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
