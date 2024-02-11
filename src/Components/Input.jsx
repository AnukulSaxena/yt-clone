import React, { useId } from 'react'
import { store } from '../store/store'
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    rounded = "rounded-lg",
    labelClassName = "after:content-['*'] after:ml-0.5 after:text-red-500",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className={` ${labelClassName}block  mb-2 text-sm font-medium text-gray-900 dark:text-white `}
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`${type === "file" ? " file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700   hover:file:bg-violet-100" : ""} bg-gray-50 border ${rounded} border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input