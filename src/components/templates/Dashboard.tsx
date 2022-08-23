import { useState } from 'react'

import StatusCapsule from '../molecules/StatusCapsule'
import DeleteModal from '../organisms/DeleteModal'

const Dashboard = (props: any) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [editID, setEditID] = useState(0)

  // const editTodo = (id: number) => {
  //   console.log('edit todo ' + id)
  // }

  const deleteTodo = (id: number) => {
    setIsOpenDeleteModal(() => true)
    setEditID(id)

    console.log('delete todo ' + id)
  }

  return (
    <>
      <div className="flex justify-center w-full">
        <table className="block w-full max-w-6xl table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="w-1/3 py-3 px-6 text-left">Todo / Task</th>
              <th className="py-3 px-6 text-center">Due date</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {props.todoList.map((item: any, index: number) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{item.id}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span className="break-words font-mono">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span className="font-mono">{item.due_date}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center ">
                  <StatusCapsule status={item.status} statusID={item.status_id} />
                  {/* <div className="relative inline-block">
                    <StatusCapsule status={item.status} statusID={item.status_id} />
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1" role="none">
                        Change to:
                      </div>
                      <div className="py-1" role="none">
                        <button
                          type="button"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          id="menu-item-6"
                        >
                          Active
                        </button>
                        <button
                          type="button"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          id="menu-item-1"
                        >
                          Pending
                        </button>
                      </div>
                    </div>
                  </div> */}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('showww')
                      }}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('edit')
                      }}
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteTodo(item.id)
                      }}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        id={editID}
        description="Are you sure you want to delete this product?"
      />
    </>
  )
}

export default Dashboard
