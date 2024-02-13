import React from 'react'
import { toggleSideBar } from '../../store/homeSlice'
import { useDispatch } from 'react-redux'
import { Videos } from '../../Components'

const Home = () => {
    const dispatch = useDispatch()
    return (
        <div
            className='h-[3000px]  w-full'
        >
            <Videos />

        </div>
    )
}

export default Home