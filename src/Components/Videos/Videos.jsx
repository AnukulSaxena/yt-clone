import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig';
import VideoCard from './VideoCard';
import VideoList from './VideoList';


const Videos = ({
    videoType = true,
    userId,
    className = 'w-full h-fit flex flex-wrap start gap-5 p-5'
}) => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        videoService.getAllVideos(userId)
            .then(res => {
                setVideoData(res)
            })
            .finally(setLoading(false))
    }, [])
    return (
        <div
            className={className}
        >
            {
                videoData.map((video, index) => {

                    return videoType ? (
                        <VideoCard
                            key={video._id}
                            video={video}
                        />
                    ) : (
                        <VideoList
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