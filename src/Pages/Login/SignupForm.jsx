import React, { useState } from 'react'
import { Input, Button } from '../../Components'
import { useForm } from 'react-hook-form'
import authService from '../../Express/authConfig'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'

function SignupForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const [mode, setMode] = useState(false);
    const navigate = useNavigate()

    const handleForm = async (data) => {
        try {
            console.log(data)
            if (mode) {
                console.log("Signup")
                const response = await authService.createAccount(data)
                console.log(response)
            }
            const session = await authService.loginAccount(data);
            if (session) {
                const userData = session.data.user
                console.log("userData", userData)
                dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error?.message)
        }
    }

    return (
        <div className='mx-auto w-full  max-w-lg bg-white dark:bg-gray-700 rounded-xl p-10 '>
            <div className=' w-full dark:text-white text-lg text-center mb-5'>
                {mode ? "Create New Account" : "Log in to your Account"}
            </div>
            {error && <div className=' w-full text-red-500 text-center'>{error}</div>}
            <div>
                <form className=' space-y-5 ' onSubmit={handleSubmit(handleForm)}>
                    {
                        mode &&
                        <>
                            <div
                                className='flex gap-2'
                            > <Input
                                    label="Full Name"
                                    placeholder="Enter Your Name : "
                                    autoComplete="fullName"
                                    {
                                    ...register("fullName", {
                                        required: true,
                                    })
                                    }
                                />
                                <Input
                                    label="Email"
                                    placeholder="Enter Your Email : "
                                    type="email"
                                    autoComplete="email"
                                    {
                                    ...register("email", {
                                        required: true,
                                    })}
                                /></div>
                            <div
                                className='flex gap-2'
                            >
                                <Input
                                    label="Avatar"
                                    type="file"
                                    {
                                    ...register("avatar", {
                                        required: true,
                                    })}
                                />
                                <Input
                                    label="CoverImage"
                                    type="file"
                                    {
                                    ...register("coverImage", {
                                    })}
                                />

                            </div>
                        </>

                    }

                    <Input
                        label="Username"
                        placeholder="Enter Your Username : "
                        type="text"
                        autoComplete="username"
                        {
                        ...register("username", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter Your Password : "
                        type="password"
                        autoComplete="current-password"
                        {
                        ...register("password", {
                            required: true,
                        })
                        }
                    />
                    <Button
                        type="submit"
                        className=' w-full'
                    >
                        {mode ? "Create Account" : "Login"}
                    </Button>
                </form>
                <p className="mt-2 text-center dark:text-white text-base  text-black/60">
                    {mode ? "Don't have an account " : "Already have an Account"} ?&nbsp;
                    <button
                        onClick={() => { setMode(prev => !prev) }}
                        className="font-medium dark:text-white text-primary  transition-all duration-200 hover:underline"
                    >
                        {mode ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SignupForm