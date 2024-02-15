import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import videoService from '../../Express/videoConfig'
import ChannelInfo from './ChannelInfo'
import { Videos } from '../../Components'

const Channel = () => {
    const { userData } = useSelector(state => state.auth)
    const [currentOption, setCurrentOption] = useState('Videos');
    const someData = [
        {
            name: "Videos",
        },
        {
            name: "Playlists"
        },
        {
            name: "Community"
        },

    ]
    return (
        <div className='h-full '>
            <ChannelInfo />
            <div className='h-full overflow-y-scroll'>
                <div className='flex justify-start p-2 dark:text-white border-b border-white dark:border-zinc-800 text-center '>
                    {
                        someData.map((data, index) => (
                            <div
                                key={data + index}
                                className={`w-32 rounded-md ${(currentOption === data.name) ? "bg-zinc-600" : ""}`}
                            >
                                {data.name}</div>
                        ))
                    }
                </div>
                <Videos
                    userId={userData?._id}
                    className='w-full h-fit flex flex-wrap gap-5 p-5'
                />
            </div>


        </div>
    )
}

export default Channel