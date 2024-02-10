import React, { useState } from 'react'
import { Button, Input } from '../'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { headerData1, headerData2 } from '../../utils/data'

const Header = () => {
    const navigate = useNavigate()
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const { status, userData } = useSelector(state => state.auth)
    function handleLogoClick() {
        window.scroll(0, 0)
        navigate('/')
    }

    function toggleSideBar() {
        setIsSideBarOpen(prev => !prev)
    }
    return (
        <>
            <div
                className='w-full px-4 fixed dark:text-white top-0 h-16 bg-white dark:bg-gray-800 flex  justify-between'
            >
                <div className='flex py-2'>
                    <Button
                        className='my-2 sm:hidden '
                        onClick={toggleSideBar}
                    >

                    </Button>
                    <img onClick={handleLogoClick} src="/svg/youtube.svg" className='cursor-pointer h-full ' alt="" />
                </div>
                <div className='flex justify-center items-center w-40 sm:w-96'>
                    <Input
                        rounded='rounded-l-lg'
                    />
                    <img src="/svg/search.svg" className='h-[42px] cursor-pointer border-gray-300 border rounded-r-lg dark:border-gray-600 p-2 dark:bg-gray-700' alt="" />
                </div>
                <div className='sm:px-3 flex justify-center h-full items-center'>
                    <Link to='/login' className='h-10 w-10'>
                        <img src={userData?.avatar} className='h-full rounded-full' alt="img" />
                    </Link>
                </div>


            </div>
            <div className={`fixed ${isSideBarOpen ? "left-0" : "-left-[640px]"}  space-y-2  md:left-0 sm:left-0 transform ease-in-out duration-700 top-16 bottom-0 w-full sm:w-20 bg-black bg-opacity-30 backdrop-blur-sm lg:w-64  border-gray-300 border-t dark:border-gray-700`}>
                <div className=' w-3/5 h-full  sm:mt-40 sm:w-full bg-white dark:bg-gray-800'>
                    <div className='h-fit px-4 border-b dark:border-gray-700 border-gray-300'>
                        <h1 className='font-bold'>{`You ->`}</h1>
                        {
                            headerData2.map((item, index) => (
                                <div
                                    key={item.name + index}
                                    className=" px-1 truncate flex items-center justify-center sm:justify-start w-full h-10 text-center">{item.name}</div>
                            ))
                        }
                    </div>
                    <div className='h-fit px-4 border-b dark:border-gray-700 border-gray-300'>
                        <h1 className='font-bold'>{`Subscriptions ->`}</h1>

                    </div>
                </div>


            </div>
            <div className=' dark:text-white gap-2 flex sm:block border-b dark:border-gray-700 border-gray-300 dark:bg-gray-800  bg-white lg:w-64 px-4 w-full sm:w-20 sm:top-16 h-fit sm:fixed fixed bottom-0  left-0 transform ease-in-out duration-700 '>
                {
                    headerData1.map((item, index) => (
                        <div
                            key={item.name + index}
                            className=" px-1 truncate flex items-center justify-center sm:justify-start w-full h-10 text-center">{item.name}</div>
                    ))
                }
            </div>
        </>
    )
}

export default Header




{/* <div className='md:w-full bg-red-200 h-12 ' ></div>
<div className='md:w-full bg-red-200 h-12 ' ><img src="" className='h-full text-white ' alt="" /></div>
<div className='md:w-full bg-red-200 h-12 ' ></div>

<div className='md:space-y-2 gap-2 flex md:block dark:bg-gray-800 bg-white md:w-64 px-4  w-full md:top-20  fixed bottom-0  left-0'>
                <div class="flex items-center justify-center w-full h-12 bg-red-300 text-center">Home</div>
                <div className='w-full bg-red-300 h-12 ' >History</div>
                <div className='w-full bg-red-300 h-12 ' >Playlist</div>
                <div className='w-full bg-red-300 h-12 ' >Subscriptions</div>
            </div> */}