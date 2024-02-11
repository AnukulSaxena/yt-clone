import React from 'react'
import { useSelector } from 'react-redux'

const SidBar = ({ isSideBarOpen }) => {
    const { userData } = useSelector(state => state.auth)
    const { sideBarStatus } = useSelector(state => state.home)

    return (
        <div className={`${isSideBarOpen ? "left-0" : "-left-[760px]"} fixed md:w-[20%]  md:left-0 w-full  h-full  bg-black transform ease-in-out duration-700 bg-opacity-30 backdrop-blur-sm z-10`}>
            {
                sideBarStatus ? <div className={`md:w-full w-2/3 h-full bg-white dark:bg-gray-800  dark:text-white absolute`}>

                </div> :
                    <div className='md:w-full w-2/3 h-full bg-white dark:bg-gray-800  dark:text-white absolute '>
                        <div
                            className=' flex flex-col items-center transform duration-700 ease-in-out'
                        >
                            <img src={userData?.avatar} className='w-1/2 h-1/2  rounded-full bg-black mt-10' alt="profile" />
                            <div
                                className='md:w-fit w-0  overflow-hidden mt-5 transform duration-1000 ease-in-out'
                            >{userData?.fullName}</div>

                            <div
                                className='flex '
                            ></div>
                        </div>
                        <div className='w-full h-10 bg-white text-black text-center mt-4'>DashBoard</div>
                    </div>
            }
        </div>
    )
}

export default SidBar