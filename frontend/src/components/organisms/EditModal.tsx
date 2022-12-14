import { useState, useEffect } from 'react'

import chroma from 'chroma-js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

import { colourOptions, todoPriorityOptions, todoStatusOptions } from '../docs/data'

import type { ColourOption } from '../docs/data'
import type { StylesConfig } from 'react-select'
import { Todo, TodoPriority, TodoStatus } from '@/types'
import moment from 'moment'
import { useRecoilState } from 'recoil'
import { TodoList } from '@/state'

const EditModal = (props: any) => {
  const { isOpen, setIsOpen, index } = props
  const [todos, setTodos] = useRecoilState(TodoList)
  const [todo, setTodo] = useState<Todo | null>(null)
  const [todoStatusOption, setTodoStatusOption] = useState<ColourOption | null>(null)
  const [due_date, setDueDate] = useState(new Date())
  const handleChangeDate = (date: any) => setDueDate(date)
  const today = new Date()

  useEffect(() => {
    if (todos[index]) {
      setTodo(todos[index])

      setDueDate(new Date(todos[index].due_date))
      setTodoStatusOption(todoStatusOptions[Object.keys(TodoStatus).indexOf(todos[index].status)])
    }
  }, [index])

  const changeTodoStatus = (e) => {
    setTodoStatusOption(todoStatusOptions[Object.keys(TodoStatus).indexOf(e.value)])

    const cloneTodos = structuredClone(todos)
    cloneTodos[index].status = e.value
    setTodos(cloneTodos)
  }

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10
    }
  })

  const colourStyles: StylesConfig<ColourOption> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined
        }
      }
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
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
                  <div className="mb-8">
                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">ID</span>
                      <span className="w-fit text-sm">{todo.id}</span>
                    </div>

                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">Title</span>
                      <input
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900
                      bg-white rounded-md border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300"
                        value={todo.title}
                      />
                    </div>

                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">Content</span>
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900
                      bg-white rounded-md border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300"
                        placeholder="Leave a content..."
                        value={todo.content}
                      ></textarea>
                    </div>

                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">Due date</span>
                      <div className="w-fit">
                        <DatePicker
                          selected={due_date}
                          onChange={handleChangeDate}
                          minDate={today}
                          showTimeSelect
                          dateFormat="d/MM/yyyy hh:mm aa"
                        />
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">Status</span>
                      <Select
                        value={todoStatusOption}
                        onChange={(e) => changeTodoStatus(e)}
                        options={todoStatusOptions}
                        styles={colourStyles}
                      />
                    </div>

                    <div className="mb-4 flex flex-col justify-start">
                      <span className="w-fit mb-2 text-sm text-gray-400">Priority</span>
                      <Select
                        defaultValue={todoPriorityOptions[Object.keys(TodoPriority).indexOf(todo.priority)]}
                        options={todoPriorityOptions}
                        styles={colourStyles}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
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
                      focus:ring-gray-200 rounded-md border
                       border-gray-200 text-sm px-5 py-2.5
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
