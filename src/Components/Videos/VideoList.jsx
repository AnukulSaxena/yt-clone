import React from 'react'
import { useNavigate } from 'react-router-dom'

const VideoList = ({
    video,

}) => {
    const navigate = useNavigate();
    async function handleCardClick() {
        console.log(video?._id)
        navigate(`/video/${video?._id}`)
    }
    return (
        <div
            onClick={handleCardClick}
            className=' w-full h-32 flex gap-5 cursor-pointer'
        >
            <img
                className=' min-w-[40%] h-full object-cover rounded-xl'
                src={video.thumbnail} alt={video.title} />
            <div className=' h-1/4 flex w-full'>

                <div className=' flex flex-col h-full w-full pt-2'>
                    <div className=' text-white text-xl font-semibold'>{video.title}</div>
                    <div className='dark:text-white opacity-60 text-md'>
                        <p >{video.ownerName}</p>
                        <p><span>{video.views + ` views`}</span> </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default VideoList