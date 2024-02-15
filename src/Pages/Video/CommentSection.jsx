import React, { useEffect, useState } from 'react'
import commentService from '../../Express/commentConfig'
import likeService from '../../Express/likeConfig';

const CommentSection = ({ userData, videoId }) => {
    const [inputValue, setInputValue] = useState("");
    const [commentData, setCommentData] = useState([])
    function handleClick() {
        commentService.createComment(inputValue, videoId)
            .then(res => (setCommentData(prevData => ([res, ...prevData]))))
        setInputValue("")
    }

    function handleCommentLike(commentId) {
        likeService.toggleCommentLike(commentId)
    }

    useEffect(() => {
        commentService.getCommets(videoId)
            .then(res => setCommentData(res))
    }, [videoId])
    return (


        <div
            className='  w-full h-56 overflow-y-scroll no-scrollbar  md:h-fit  rounded-md '
        >
            <div
                className='w-full h-20 px-2 flex items-center'
            >
                <div className='h-full p-3 w-20'>
                    <img className=' rounded-full ' src={userData.avatar} alt="img" />

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
                className='dark:text-white w-full h-fit space-y-2'
            >
                {
                    commentData.map(item => (
                        <div
                            key={item._id}
                            className='flex h-20 w-full'
                        >
                            <div
                                className='h-full w-20 px-4'
                            >
                                <img className=' rounded-full ' src={item.owner_avatar || userData.avatar} alt="img" />
                            </div>
                            <div
                                className='h-full flex flex-col w-full '
                            >
                                <div
                                    className='h-5 w-full'
                                >
                                    @{item.owner_username || userData.username}
                                </div>
                                <div
                                    className='h-fit w-full'
                                >{item.content}</div>
                                <div
                                    className='flex h-6 w-full gap-2'
                                >
                                    <svg
                                        onClick={() => { handleCommentLike(item?._id) }}
                                        className='h-full pt-1 cursor-pointer  dark:fill-white'
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16" id="like">
                                        <path d="M14 6h-4V3c0-1.103-.897-2-2-2H6.5a.5.5 0 0 0-.5.5v2.367L4.066 7.252A.493.493 0 0 0 4 7.5v7a.5.5 0 0 0 .5.5h8.025a2 2 0 0 0 1.827-1.188l1.604-3.609A.491.491 0 0 0 16 10V8c0-1.103-.897-2-2-2zM0 7.5v7a.5.5 0 0 0 .5.5H3V7H.5a.5.5 0 0 0-.5.5z"></path></svg>
                                    <p>{item?.numberOfLikes}</p>
                                </div>
                            </div>

                        </div>
                    ))
                }

            </div>


        </div>

    )
}

export default CommentSection