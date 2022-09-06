import { axiosTemplate } from '@/helper/axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

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
                  {...register('user_name')}
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

            <div className="w-full mt-5">
              <div className="mx-auto w-full max-w-md rounded-xl bg-slate-100">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <span>Optional information</span>
                        <div className={`${open ? 'rotate-180 transform' : ''}  text-blue-500`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          </svg>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-3 pt-0 pb-4 text-sm text-gray-500">
                        <div className="mt-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
                            Fistname
                          </label>
                          <div className="flex flex-col items-start">
                            <input
                              type="text"
                              {...register('first_name')}
                              className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
                            Lastname
                          </label>
                          <div className="flex flex-col items-start">
                            <input
                              type="text"
                              {...register('last_name')}
                              className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
                            Address
                          </label>
                          <div className="flex flex-col items-start">
                            <textarea
                              rows={3}
                              {...register('address')}
                              className="block w-full mt-1 px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
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
