import { useEffect, useState } from 'react'

import StatusCapsule from '../molecules/StatusCapsule'
import DeleteModal from '../organisms/DeleteModal'
import EditModal from '../organisms/EditModal'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import { useRecoilState } from 'recoil'
import { CurrentPage, PerPage } from '@/state'
import { IsLoadingContent } from '@/state/IsLoadingContent'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PriorityCapsule from '../molecules/PriorityCapsule'
import Select from 'react-select'
import { perPageOptions } from '../molecules/Paginate'

const Dashboard = (props: any) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [editID, setEditID] = useState(0)
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPage)
  const [perPage, setPerPage] = useRecoilState(PerPage)
  const [isLoadingContentState, _] = useRecoilState(IsLoadingContent)

  const handleChangePage = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const handleChangePerPage = (perPage: number) => {
    setPerPage(perPage)
    setCurrentPage(1)
  }

  const editTodo = (id: number) => {
    setIsOpenEditModal(() => true)
    setEditID(id)

    console.log('delete todo ' + id)
  }

  const deleteTodo = (id: number) => {
    setIsOpenDeleteModal(() => true)
    setEditID(id)

    console.log('delete todo ' + id)
  }

  return (
    <>
      <div className="justify-center w-full max-w-6xl">
        <div className="overflow-hidden border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="w-1/3 py-3 px-6 text-left">Todo / Task</th>
                <th className="py-3 px-6 text-center">Due date</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Priority</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {true ? (
                props.todos.length > 0 &&
                props.todos.map((item: any, index: number) => (
                  <tr key={index} className="border-b last:border-b-0 border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span className="break-words font-mono">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-mono">{moment(item.due_date).format('YYYY/MM/DD hh:mm')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center ">
                      <StatusCapsule status={item.status} />
                    </td>
                    <td className="py-3 px-6 text-center ">
                      <PriorityCapsule status={item.status} priority={item.priority} />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            editTodo(item.id)
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
                menuGutter: 2,
              },
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
      <EditModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        id={editID}
        description="Are you sure you want to edit this product?"
      />
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
