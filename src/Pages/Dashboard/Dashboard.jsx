import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideBar } from '../../store/homeSlice'
import { Button, Input } from '../../Components'
import UploadForm from './UploadForm'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { uploadingStatus } = useSelector(state => state.home)
    useEffect(() => {
        dispatch(toggleSideBar(false))
        return () => {
            dispatch(toggleSideBar(true))
        }
    }, [])
    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
                {
                    uploadingStatus ? <div className='h-10 w-fit p-4'>Uploading....</div> :

                        <UploadForm />
                }

            </div>
            <div className='h-full flex lg:flex-row flex-col gap-5 z-40 pt-20 px-5'>
                <div className='w-full h-1/2 border border-gray-600 flex justify-center items-center'>
                    <div
                        className='flex flex-col m-5 justify-center items-center'
                    >
                        <p>
                            Want to see metrics on your recent video?
                            Upload and publish a video to get started.
                        </p>
                        <Button>
                            Upload Videos
                        </Button>
                    </div>

                </div>
                <div className='w-full h-1/2 border border-gray-600'></div>
                <div className='w-full h-1/2 border border-gray-600'></div>
            </div>
        </>
    )
}

export default Dashboard