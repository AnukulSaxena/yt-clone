import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import videoService from '../../Express/videoConfig'

const Channel = () => {
    const { userData } = useSelector(state => state.auth)
    const [videoCount, setVideoCount] = useState(0)
    async function countVideos() {

        const response = await videoService.getAllVideosCount(userData?._id)
        console.log("Channel :: countVideos :: response", response)
        setVideoCount(response)
    }
    useEffect(() => {
        countVideos();

    }, [])
    return (
        <div>
            <div className='h-96 w-full  flex flex-col items-center border border-black'>
                <div className='h-1/2 w-3/4'></div>
                <div className='h-1/2 w-3/4 py-3 flex gap-2'>
                    <img src={userData.avatar}
                        className='h-full rounded-full' alt="avatar" />
                    <div
                        className='h-full w-full'
                    >
                        <h1
                            className='font-extrabold p-2 text-4xl dark:text-neutral-300'
                        >{userData.fullName}</h1>
                        <div className='flex p-2 gap-2 text-xl dark:text-neutral-300'>
                            <span>{userData.username} -</span>
                            <span>{videoCount} Videos</span>
                            <span></span>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}

export default Channel