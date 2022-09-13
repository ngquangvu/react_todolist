import { useEffect, useState } from 'react'

import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import { useRecoilState } from 'recoil'

import { perPageOptions } from '../molecules/Paginate'
import PriorityCapsule from '../molecules/PriorityCapsule'
import StatusCapsule from '../molecules/StatusCapsule'
import DeleteModal from '../organisms/DeleteModal'

import { axiosTemplate } from '@/helper/axios'
import { CurrentPage, PerPage, TodoList } from '@/state'
import { IsLoadingContent } from '@/state/IsLoadingContent'
import 'react-loading-skeleton/dist/skeleton.css'

import { Todo, TodoStatus } from '@/types'

import { Avatar } from 'flowbite-react'

import EditModal from '../organisms/EditModal'

const Dashboard = (props: any) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [editTodoIndex, setTodoIndexForModal] = useState<number | null>(null)
  const [todos, setTodos] = useRecoilState(TodoList)
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPage)
  const [perPage, setPerPage] = useRecoilState(PerPage)
  const [isLoadingContentState, __] = useRecoilState(IsLoadingContent)

  const handleChangePage = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const handleChangePerPage = (perPage: number) => {
    setPerPage(perPage)
    setCurrentPage(1)
  }

  const editTodo = (index: number) => {
    setIsOpenEditModal(true)
    setTodoIndexForModal(() => index)
  }

  const deleteTodo = (index: number) => {
    setIsOpenDeleteModal(true)
    setTodoIndexForModal(index)
  }

  const restoreTodo = async (index: number) => {
    // success
    if (todos[index]) {
      const cloneTodos = structuredClone(todos)
      cloneTodos[index].deleted_at = null
      setTodos(cloneTodos)

      const res = await axiosTemplate.post('/api/todos/restore/' + cloneTodos[index].id).then((response) => response)
    }
  }

  return (
    <>
      <div className="justify-center w-full max-w-6xl">
        <div className="flex mb-5">
          <a
            className="mr-5 hover:text-blue-600 hover:cursor-pointer hover:underline text-gray-700 underline text-sm"
            href="#1"
          >
            All({props.todos_states?.all})
          </a>
          <a
            className="mr-5 hover:text-blue-600 hover:cursor-pointer hover:underline text-gray-700 underline text-sm"
            href="#2"
          >
            Scheduled({props.todos_states?.scheduled})
          </a>
          <a
            className="mr-5 hover:text-blue-600 hover:cursor-pointer hover:underline text-gray-700 underline text-sm"
            href="#3"
          >
            OnlyTrashed({props.todos_states?.onlyTrashed})
          </a>
          <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" bordered={true} />{' '}
        </div>
        <div className="overflow-hidden border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">
                  <button
                    onClick={() => {
                      console.log('id')
                    }}
                    type="button"
                    className="hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    ID
                  </button>
                </th>
                <th className="w-1/3 py-3 px-6 text-left">
                  <button
                    onClick={() => {
                      console.log('todo/task')
                    }}
                    type="button"
                    className="hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    TODO / TASK
                  </button>
                  <form action="" name="postdata1" method="post">
                    <input type="hidden" name="orderby" value="col_1" />
                  </form>
                </th>
                <th className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      console.log('due date')
                    }}
                    type="button"
                    className="hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    DUE DATE
                  </button>
                </th>
                <th className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      console.log('status')
                    }}
                    type="button"
                    className="hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    STATUS
                  </button>
                </th>
                <th className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      console.log('Priority')
                    }}
                    type="button"
                    className="hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    PRIORITY
                  </button>
                </th>
                <th className="py-3 px-6 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {true ? (
                todos.length > 0 &&
                todos.map((item: any, index: number) => (
                  <tr key={index} className="border-b last:border-b-0 border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span
                          className={`break-words font-mono  ${
                            (item.deleted_at !== null ||
                              item.status === TodoStatus.Complete ||
                              item.status === TodoStatus.Canceled) &&
                            'text-gray-300'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div
                        className={`flex items-center justify-center ${
                          (item.deleted_at !== null ||
                            item.status === TodoStatus.Complete ||
                            item.status === TodoStatus.Canceled) &&
                          'text-gray-300'
                        }`}
                      >
                        <span className="font-mono">{moment(item.due_date).format('DD/MM/YYYY HH:mm')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center ">
                      <StatusCapsule deleted_at={item.deleted_at} status={item.status} />
                    </td>
                    <td className="py-3 px-6 text-center ">
                      <PriorityCapsule deleted_at={item.deleted_at} status={item.status} priority={item.priority} />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            editTodo(index)
                          }}
                          className="w-4 mr-3 transform hover:text-blue-500 hover:scale-110"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke="currentColor">
                            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {item.deleted_at === null ? (
                          <button
                            type="button"
                            onClick={() => {
                              deleteTodo(index)
                            }}
                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 22 22"
                              stroke="currentColor"
                            >
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              restoreTodo(index)
                            }}
                            className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 22 22"
                              stroke="currentColor"
                            >
                              {' '}
                              <polyline points="1 4 1 10 7 10" /> <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <Skeleton count={5} />
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex">
          <Select
            onChange={(e: any) => {
              handleChangePerPage(e.value)
            }}
            defaultValue={perPageOptions[0]}
            options={perPageOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              spacing: {
                ...theme.spacing,
                baseUnit: 2,
                controlHeight: 2,
                menuGutter: 2
              }
            })}
          />
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handleChangePage}
            pageRangeDisplayed={5}
            pageCount={props.last_page}
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
      <EditModal isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} index={editTodoIndex} />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        index={editTodoIndex}
        description="Are you sure you want to delete this Todo?"
      />
    </>
  )
}

export default Dashboard
