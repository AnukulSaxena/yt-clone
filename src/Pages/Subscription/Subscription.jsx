import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { Videos } from '../../Components'

const Subscription = () => {
    const [videoData, setVideoData] = useState([])
    useEffect(() => {
        videoService.getSubscriptionVideos()
            .then(res => setVideoData(res))
    }, [])
    return (
        <div className='w-full'>
            <Videos videoData={videoData} />
        </div>
    )
}

export default Subscription