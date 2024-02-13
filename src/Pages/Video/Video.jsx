import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { useParams } from 'react-router-dom'
import { Player } from 'video-react'

const Video = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null)
    useEffect(() => {
        videoService.getVideoById(videoId)
            .then(res => {
                console.log(res.videoFile)
                setVideo(res)
            })
    }, [])
    return (
        <div className='relative bg-black py-20'>
            {
                video &&
                <video
                    className='w-full  '
                    controls autoPlay>
                    <source src={video?.videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            }
        </div>
    )
}

export default Video