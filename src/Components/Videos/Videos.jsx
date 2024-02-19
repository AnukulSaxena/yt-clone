import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig';
import VideoCard from './VideoCard';
import VideoList from './VideoList';
import VideoSkeleton from './VideoSkeleton';


const Videos = ({
    videoType = true,
    userId,
    className = 'w-full h-fit flex flex-wrap justify-center gap-5 p-5'
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
            {videoData.length ?
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
                :
                Array.from({ length: 20 }).map((_, index) => (
                    <VideoSkeleton
                        videoType={videoType}
                        key={index}
                        className={videoType ? "h-64 w-96" : "h-32 w-52 "}
                    />
                ))
            }





        </div>
    )
}

export default Videos