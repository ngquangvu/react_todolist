import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditModal = (props: any) => {
  const { isOpen, setIsOpen, id, description } = props
  const [date, setDate] = useState(new Date())
  const handleChange = (date) => setDate(date)

  const today = new Date()
  const in3Days = new Date()
  in3Days.setDate(in3Days.getDate() + 3)
  return (
    <>
      {isOpen ? (
        <>
          <div
            id="popup-modal"
            className="bg-gray-800
            bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex"
            aria-modal="true"
            role="dialog"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow">
                {/* CLOSE */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <div className="mb-5">
                    <div className="mb-4">
                      <div className="flex flex-col justify-start">
                        <span className="w-fit mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Task / Todo
                        </span>
                        <textarea
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900
                      bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Leave a comment..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Due date</span>
                      <div className="border">
                        <DatePicker
                          selected={date}
                          onChange={handleChange}
                          minDate={today}
                          maxDate={in3Days}
                          showTimeSelect
                          dateFormat="d/MM/yyyy hh:mm aa"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Status</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="text-gray-500 bg-white
                     hover:bg-gray-100 focus:ring-4 focus:outline-none
                      focus:ring-gray-200 rounded-lg border
                       border-gray-200 text-sm font-medium px-5 py-2.5
                        hover:text-gray-900 focus:z-10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default EditModal
