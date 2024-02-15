import React, { useEffect, useState } from 'react'
import videoService from '../../Express/videoConfig'
import { useParams } from 'react-router-dom'
import { Input, Videos } from '../../Components'
import { useSelector } from 'react-redux'

const Video = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        setVideo(null)
        console.log('something', videoId)
        videoService.getVideoById(videoId)
            .then(res => {
                console.log(res.videoFile)
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

                <div
                    className=' w-full h-fit rounded-md bg-neutral-800'
                >
                    <div
                        className='h-40 w-full'
                    ></div>
                    <div
                        className='  w-full '
                    >
                        <div
                            className='w-full h-20 px-2 flex items-center'
                        >
                            <div className='h-full p-3 w-20'>
                                <img className=' rounded-full ' src={userData.avatar} alt="" />

                            </div>

                            <input
                                type="text"
                                className="w-full py-1 bg-neutral-800 border-b-2 border-neutral-900 focus:outline-none dark:text-white"
                            />
                            <button
                                className='bg-blue-600 rounded-sm mx-2 p-1'
                            >Comment</button>

                        </div>


                    </div>
                </div>
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