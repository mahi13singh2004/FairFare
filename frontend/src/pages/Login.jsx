import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth.store.js'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login, err, user } = useAuthStore()

    useEffect(() => {
        if (user) {
            navigate("/profile")
        }
    }, [user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {err && (
                        <div className="text-red-500 text-sm text-center">
                            {err}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                                     text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                     transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login