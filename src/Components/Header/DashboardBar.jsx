import React from 'react'

const DashboardBar = ({ userData }) => {
    return (
        <div className='md:w-full w-2/3 h-full bg-white dark:bg-zinc-800  dark:text-white absolute '>
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
    )
}

export default DashboardBar