import React, { useEffect, useState } from 'react'
import commentService from '../../Express/commentConfig'

const CommentSection = ({ userData, videoId }) => {
    const [inputValue, setInputValue] = useState("");
    const [commentData, setCommentData] = useState([])
    function handleClick() {
        commentService.createComment(inputValue, videoId)
            .then(res => (setCommentData(prevData => ([res, ...prevData]))))
        setInputValue("")
    }

    useEffect(() => {
        commentService.getCommets(videoId)
            .then(res => setCommentData(res))
    }, [videoId])
    return (
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
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value) }}
                        className="w-full py-1 bg-neutral-800 border-b-2 border-neutral-900 focus:outline-none dark:text-white"
                    />
                    <button
                        onClick={handleClick}
                        className={`bg-blue-600  rounded-sm mx-2 p-1 ${inputValue ? "" : " cursor-not-allowed"}`}
                    >Comment</button>

                </div>

                <div
                    className=' w-full h-fit space-y-2'
                >
                    {
                        commentData.map(item => (
                            <div
                                key={item._id}
                                className='h-20 flex flex-col w-full bg-white'
                            >
                                <div
                                    className='h-full w-full'
                                >{item.content}</div>
                                <div
                                    className=' h-5 w-full'
                                >
                                    <button
                                        className=' ms-10 bg-neutral-800 h-full '
                                    >like</button>
                                </div>
                            </div>
                        ))
                    }

                </div>


            </div>
        </div>
    )
}

export default CommentSection