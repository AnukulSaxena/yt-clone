import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig';
import VideoCard from './VideoCard';
import VideoList from './VideoList';
import VideoSkeleton from './VideoSkeleton';


const Videos = ({
    videoType = true,
    videoData = [],
    className = 'w-full h-fit flex flex-wrap justify-center gap-5 p-5'
}) => {

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