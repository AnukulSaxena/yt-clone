import React from 'react'
import { useSelector } from 'react-redux'
import DashboardBar from './DashboardBar'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    const { userData } = useSelector(state => state.auth)
    const { sideBarStatus, isSideBarOpen } = useSelector(state => state.home)

    return (
        <div className={`${isSideBarOpen ? "left-0" : "-left-[760px] md:-left-72"} fixed py-2 md:w-[15%]   w-full  h-full  dark:bg-neutral-800 transform ease-in-out duration-700 bg-opacity-30 backdrop-blur-sm z-10`}>
            {
                sideBarStatus ? <div className="md:w-full space-y-2 w-2/3 h-full bg-white dark:bg-neutral-800  dark:text-white absolute">
                    <div className='w-full h-fit px-5 border-b border-neutral-400'>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "dark:bg-zinc-700 h-10 flex items-center justify-center rounded-md w-full bg-gray-300" : "h-10 flex items-center justify-center rounded-md w-full"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/subscription"
                            className={({ isActive }) =>
                                isActive ? "dark:bg-neutral-700 h-10 flex items-center justify-center rounded-md w-full bg-gray-300" : "h-10 flex items-center justify-center rounded-md w-full"
                            }
                        >
                            Subscriptions
                        </NavLink>
                    </div>
                    <div className='w-full h-fit px-5 border-b border-neutral-400'>
                        <NavLink
                            to="/channel"
                            className={({ isActive }) =>
                                isActive ? "dark:bg-zinc-700 h-10 flex items-center justify-center rounded-md w-full bg-gray-300" : "h-10 flex items-center justify-center rounded-md w-full"
                            }
                        >
                            Your Channel
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "dark:bg-zinc-700 h-10 flex items-center justify-center rounded-md w-full bg-gray-300" : "h-10 flex items-center justify-center rounded-md w-full"
                            }
                        >
                            History
                        </NavLink>
                    </div>
                </div> :
                    <DashboardBar
                        userData={userData}
                    />
            }
        </div>
    )
}

export default SideBar