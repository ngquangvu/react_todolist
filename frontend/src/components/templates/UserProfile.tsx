import { axiosTemplate } from '@/helper/axios'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const UserProfile = (props: any) => {
  const {
    formState: { isDirty, isValid },
    register,
    handleSubmit
  } = useForm({ defaultValues: props.userInfo })

  // const [userInfo, setUserInfo] = useState(null)

  // if (userInfo == null) {
  //   setUserInfo(props.userInfo)
  // }

  const mutationChangeUser = useMutation(async (formData: any) => {
    return axiosTemplate.put('/api/user/' + props.userInfo.id, JSON.stringify(formData), {
      headers: {
        "content-type": "application/json",
      }
    })
  })

  const onSubmitChangeUser = (data: any) => {
    mutationChangeUser.mutate(data)
  }

  return (
    <>
      {props.userInfo && (
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmitChangeUser)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <span className="block text-sm  text-gray-400">Username</span>

                        <h3 id="user_name" className="h-9 pl-2 p-2 mt-1">
                          {props.userInfo.user_name}
                        </h3>
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <span className="block text-sm  text-gray-400">Email address</span>
                        <h3 id="email" className="h-9 pl-2 p-2 mt-1">
                          {props.userInfo.email}
                        </h3>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <span className="block text-sm  text-gray-400">First name</span>
                        <input
                          type="text"
                          {...register('first_name')}
                          id="first_name"
                          defaultValue={props.userInfo.first_name}
                          className="h-9 pl-2 pr-2 mt-1 border block w-full sm:text-sm rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <span className="block text-sm  text-gray-400">Last name</span>
                        <input
                          type="text"
                          {...register('last_name')}
                          id="last_name"
                          defaultValue={props.userInfo.last_name}
                          className="h-9 pl-2 pr-2 mt-1 border block w-full sm:text-sm rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <span className="block text-sm text-gray-400">Address</span>
                        <input
                          type="text"
                          {...register('address')}
                          id="address"
                          defaultValue={props.userInfo.address}
                          className="h-9 pl-2 pr-2 mt-1 border block w-full sm:text-sm rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={!isDirty || !isValid}
                      className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                    <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="push_everything"
                          name="push_notifications"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                          {' '}
                          Everything{' '}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push_email"
                          name="push_notifications"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="push_email" className="ml-3 block text-sm font-medium text-gray-700">
                          {' '}
                          Same as email{' '}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push_nothing"
                          name="push_notifications"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="push_nothing" className="ml-3 block text-sm font-medium text-gray-700">
                          {' '}
                          No push notifications{' '}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
