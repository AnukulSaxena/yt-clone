import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { useParams } from 'react-router-dom'
import { Input, Videos } from '../../Components'
import { useSelector } from 'react-redux'
import CommentSection from './CommentSection'
import VideoSkeleton from '../../Components/Videos/VideoSkeleton'
import subscriptionService from '../../Express/SubsConfig'

const Video = () => {
    const { videoId, ownerId } = useParams();
    const [video, setVideo] = useState(null)
    const { userData } = useSelector(state => state.auth)
    const { isSideBarOpen } = useSelector(state => state.home)
    const [subCount, setSubCount] = useState(0)
    const [isSubscribed, setIsSubscribed] = useState(false)
    useEffect(() => {
        setVideo(null)
        videoService.getVideoById(videoId)
            .then(res => {
                setVideo(res)
            })
        subscriptionService.getSubsCount(ownerId)
            .then(res => {
                setSubCount(res?.length)
                setIsSubscribed(res?.isSubscribed)
            })

    }, [videoId])
    return (
        <div className={` ${isSideBarOpen ? "" : "xl:pl-16 "} pl-5 pr-5 md:relative gap-5 pt-5 pb-40 bg-neutral-800 lg:flex transform ease-in-out duration-700`}>
            <div
                className='md:min-w-[72%] mb-5 w-full space-y-3'
            >
                {
                    video ?
                        <>
                            <div className='w-full h-[630px] bg-black flex items-center'>
                                <video
                                    className='w-full max-h-full rounded-md'
                                    controls >
                                    <source src={video?.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <VideoInfo
                                subCount={subCount}
                                isSubscribed={isSubscribed}
                                setIsSubscribed={setIsSubscribed}
                                video={video} />
                            <div
                                className='h-40 w-full bg-neutral-700 rounded-md'
                            ></div>
                        </> : <>
                            <VideoSkeleton
                                videoType={true}
                                className=' h-[630px] w-full'
                            />
                            <div
                                className='h-40 w-full bg-neutral-700 rounded-md'
                            ></div>
                        </>
                }
                <CommentSection
                    userData={userData}
                    videoId={videoId}
                />
            </div>
            <div
                className='w-full h-fit'
            >
                <Videos
                    className=' flex flex-col gap-5'
                    videoType={false}
                />
            </div>
        </div>
    )
}

export default Video


const VideoInfo = ({ video, subCount, isSubscribed, setIsSubscribed }) => {
    const { userData } = useSelector(state => state.auth)

    function handleSubClick() {
        setIsSubscribed(prev => !prev)
        subscriptionService.toggleSubscription(video.owner._id)
            .then(res => {
                if (!res) setIsSubscribed(prev => !prev)
            })
    }
    return (
        <div className='w-full h-20 dark:text-white '>
            <div className='h-[40%] font-extrabold text-2xl'>
                {video?.title}
            </div>
            <div className='h-[60%] flex'>
                <div className='h-full p-1 w-12'>
                    <img className=' rounded-full ' src={video?.owner?.avatar} alt="img" />
                </div>
                <div className='h-full w-full flex justify-between '>


                    <div className='flex  gap-4 items-center'>
                        <div className=''>
                            <p className='truncate text-lg'>{video?.owner?.fullName}</p>
                            <p className=' text-xs truncate'>{subCount} Subscribers</p>
                        </div>
                        {
                            (video?.owner?._id !== userData?._id) &&
                            <button
                                onClick={handleSubClick}
                                className='bg-blue-600  px-2 py-1 rounded-full truncate'
                            >{isSubscribed ? "Subscribed" : "Subscribe"}</button>
                        }
                    </div>

                    <div className='py-2 flex gap-2' >
                        <div
                            className='flex px-4 cursor-pointer items-center rounded-full dark:bg-neutral-700 h-full gap-2'
                        >
                            <svg
                                className='h-full py-1   dark:fill-white'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16" id="like">
                                <path d="M14 6h-4V3c0-1.103-.897-2-2-2H6.5a.5.5 0 0 0-.5.5v2.367L4.066 7.252A.493.493 0 0 0 4 7.5v7a.5.5 0 0 0 .5.5h8.025a2 2 0 0 0 1.827-1.188l1.604-3.609A.491.491 0 0 0 16 10V8c0-1.103-.897-2-2-2zM0 7.5v7a.5.5 0 0 0 .5.5H3V7H.5a.5.5 0 0 0-.5.5z"></path>
                            </svg>
                            <p className='border-s border-neutral-800 ps-2' >12</p>
                        </div>

                        <div className='h-full bg-neutral-700 flex items-center px-4 rounded-full' > Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}