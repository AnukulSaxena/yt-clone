import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const VideoCard = ({ video, }) => {
    const { isSideBarOpen } = useSelector(state => state.home)
    const navigate = useNavigate();
    async function handleCardClick() {
        navigate(`/video/${video?._id}/${video?.ownerId}`)
    }
    return (
        <div
            onClick={handleCardClick}
            className={`h-[340px] ease-in-out duration-700 flex cursor-pointer flex-col ${isSideBarOpen ? "w-[300px]" : "w-[340px]"}`}
        >
            <img
                className=' h-3/4 object-cover rounded-xl'
                src={video.thumbnail} alt={video.title} />
            <div className=' h-1/4 flex w-full'>
                <div className='h-full p-3 w-20'>
                    <img className=' rounded-full ' src={video.ownerAvatar} alt="" />
                </div>
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

export default VideoCard