import { axiosTemplate } from '@/helper/axios'
import { TodoList } from '@/state'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

const DeleteModal = (props: any) => {
  const [todos, setTodos] = useRecoilState(TodoList)
  const [todo, setTodo] = useState<Todo | null>(null)
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null)
  const { isOpen, setIsOpen, index, description } = props

  useEffect(() => {
    setTodo(todos[index])
    if (todos[index]) {
      setDeleteTodoId(todos[index].id)
    }
    console.log(isOpen , index,  todo);
  }, [index])

  const deleteTodoAPI = async () => {
    // success
    if (todos[index] ) {
      const cloneTodos = structuredClone(todos)
      cloneTodos[index].deleted_at = new Date();
      setTodos(cloneTodos)

      const res = await axiosTemplate.delete('/api/todos/' + deleteTodoId).then((response) => response)
      console.log('delete modal', res)
    }
  }

  return (
    <>
      {isOpen && todo ? (
        <>
          <div
            id="popup-modal"
            className="bg-gray-800
            bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex"
            aria-modal="true"
            role="dialog"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-md shadow">
                {/* CLOSE */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                    {description}
                    <br /> {todo.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTodoAPI()
                      setIsOpen(false)
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="text-gray-500 bg-white
                     hover:bg-gray-100 focus:ring-4 focus:outline-none
                      focus:ring-gray-200 rounded-md border
                       border-gray-200 text-sm font-medium px-5 py-2.5
                        hover:text-gray-900 focus:z-10"
                  >
                    No, cancel
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

export default DeleteModal
