import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { useParams } from 'react-router-dom'
import { Input, Videos } from '../../Components'
import { useSelector } from 'react-redux'
import CommentSection from './CommentSection'

const Video = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        setVideo(null)
        videoService.getVideoById(videoId)
            .then(res => {
                setVideo(res)
            })
    }, [videoId])
    return (
        <div className='md:relative gap-5 pb-40 bg-black md:flex'>
            <div
                className='md:min-w-[65%] w-full'
            >
                {
                    video &&
                    <video
                        className='w-full'
                        controls >
                        <source src={video?.videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
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