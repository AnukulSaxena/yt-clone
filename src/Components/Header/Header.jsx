import React, { useState } from 'react'
import { Button, Input } from '../'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../Express/authConfig'
import SideBar from './SideBar'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData, status } = useSelector(state => state.auth)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    async function handleClick() {
        if (status) {
            const isLoggedOut = await authService.logoutAccount()
            if (isLoggedOut) {
                dispatch(logout())
                navigate('/')
            }
        } else {
            navigate('/login')
        }
    }
    return (

        <>
            <div
                className='w-full z-50 px-4 fixed dark:text-white top-0 h-16 bg-white dark:bg-zinc-800 flex  justify-between'
            >
                <div className='flex py-2'>
                    <Button
                        className='my-2 md:hidden'
                        onClick={() => { setIsSideBarOpen(prev => !prev) }}
                    >

                    </Button>
                    <Link to='/'>
                        <img src="/svg/youtube.svg" className='cursor-pointer h-full ' alt="" />
                    </Link>
                </div>
                <div className='flex justify-center items-center w-40 sm:w-72 lg:w-96 transform ease-in-out duration-700'>
                    <Input
                        rounded='rounded-l-lg'

                    />
                    <img src="/svg/search.svg" className='h-[42px] cursor-pointer border-gray-300 border rounded-r-lg dark:border-gray-600 p-2 dark:bg-zinc-700' alt="" />
                </div>
                <div className='sm:px-3 flex gap-1 sm:gap-6 justify-center h-full items-center'>
                    <Link className='h-10 w-10 flex items-center justify-center' to='/dashboard'>
                        +
                    </Link>
                    <div onClick={handleClick} className='h-10 w-10'>
                        <img src={userData?.avatar} className='h-full rounded-full' alt="img" />
                    </div>
                </div>


            </div>
            <SideBar
                isSideBarOpen={isSideBarOpen}
            />
        </>

    )
}

export default Header
