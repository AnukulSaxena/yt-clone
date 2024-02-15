import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { useParams } from 'react-router-dom'
import { Input, Videos } from '../../Components'
import { useSelector } from 'react-redux'
import CommentSection from './CommentSection'
import VideoSkeleton from '../../Components/Videos/VideoSkeleton'

const Video = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null)
    const { userData } = useSelector(state => state.auth)
    const { isSideBarOpen } = useSelector(state => state.home)

    useEffect(() => {
        setVideo(null)
        videoService.getVideoById(videoId)
            .then(res => {
                setVideo(res)
            })
    }, [videoId])
    return (
        <div className={` ${isSideBarOpen ? "pl-5" : "lg:pl-32 pl-5"} pr-5 lg:relative gap-5 pb-40 bg-neutral-800 lg:flex transform ease-in-out duration-700`}>
            <div
                className='md:min-w-[65%] mb-5 w-full space-y-5'
            >
                {
                    video ?
                        <>
                            <video
                                className='w-full'
                                controls >
                                <source src={video?.videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div
                                className='h-40 w-full bg-neutral-700 rounded-md'
                            ></div>
                        </> : <>
                            <VideoSkeleton
                                isHidden={false}
                                className=' h-96 w-full'
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