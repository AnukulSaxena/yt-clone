import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../../Components'
import videoService from '../../Express/videoConfig'
import { toggleUploadingStatus } from '../../store/homeSlice'
import { useDispatch } from 'react-redux'

const UploadForm = ({ handlePanel }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { register, handleSubmit } = useForm();
    async function handleForm(data) {
        try {
            console.log(data)
            dispatch(toggleUploadingStatus(true))
            const response = await videoService.uploadVideo(data);
            console.log(response)
            dispatch(toggleUploadingStatus(false))
            handlePanel()

        } catch (error) {
            setError(error?.message)
            dispatch(toggleUploadingStatus(false))

        }
    }
    return (<div className='mx-auto w-full h-fit  max-w-lg bg-white dark:bg-gray-700 rounded-xl p-10 '>
        <div className=' w-full flex justify-between dark:text-white text-lg text-center mb-5'>
            <div>Upload a Video</div>
            <div className='px-2 bg-black cursor-pointer' onClick={() => { handlePanel() }}>X</div>
        </div>
        {error && <div className=' w-full text-red-500 text-center'>{error}</div>}
        <div>
            <form className=' space-y-5 ' onSubmit={handleSubmit(handleForm)}>


                <Input
                    label="Video"
                    type="file"
                    {
                    ...register("videoFile", {
                        required: true,
                    })
                    }
                />
                <Input
                    label="Thumbnail"
                    type="file"
                    {
                    ...register("thumbnail", {
                        required: true,
                    })}
                />

                <Input
                    label="Title"
                    placeholder="Title of the Video"
                    {
                    ...register("title", {
                        required: true,
                    })}
                />
                <Input
                    label="Description"
                    placeholder="Try some description"
                    {
                    ...register("description", {
                        required: true
                    })}
                />
                <Button
                    type="submit"
                    className=' w-full'
                >
                    Upload
                </Button>
            </form>

        </div>
    </div>
    )
}

export default UploadForm