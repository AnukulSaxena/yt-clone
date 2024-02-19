import React, { useState, useEffect } from 'react'
import { Videos } from '../../Components'
import videoService from '../../Express/videoConfig';
const Home = () => {
    const [videoData, setVideoData] = useState([]);
    useEffect(() => {
        videoService.getAllVideos()
            .then(res => {
                setVideoData(res)
            })
    }, [])
    return (
        <div className='h-[3000px]  w-full'>
            <Videos videoData={videoData} />
        </div>
    )
}

export default Home