import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig';
import VideoCard from './VideoCard';

const Videos = ({ userId }) => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        videoService.getAllVideos(userId)
            .then(res => {
                console.log(res)
                setVideoData(res)
            })
            .finally(setLoading(false))

    }, [])
    return (
        <div
            className='w-full h-fit flex flex-wrap start gap-5 p-5'
        >
            {
                videoData.map((video, index) => {
                    return (
                        <VideoCard
                            key={video._id}
                            video={video}
                        />
                    )
                })
            }

        </div>
    )
}

export default Videos