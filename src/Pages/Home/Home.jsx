import React from 'react'
import { useDispatch } from 'react-redux'
import { Videos } from '../../Components'

const Home = () => {
    return (
        <div
            className='h-[3000px]  w-full'
        >
            <Videos />
        </div>
    )
}

export default Home