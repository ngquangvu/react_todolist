import { axiosTemplate } from '@/helper/axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function Regist() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const mutation = useMutation(
    async (formData) => {
      return axiosTemplate.post('/api/register', formData)
    },
    {
      onSuccess(res) {
        navigate('/login')
      }
    }
  )

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full px-8 py-7 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 undefined">
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  {...register('username')}
                  className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
              Fullname
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  {...register('name')}
                  className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  {...register('email')}
                  className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined">
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  {...register('password')}
                  className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 undefined">
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  {...register('password_confirmation')}
                  className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <a className="mr-5 text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out" href="/login">
                Login
              </a>
              <button
                type="submit"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
