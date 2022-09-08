import { useState } from 'react'

import chroma from 'chroma-js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

import { colourOptions, todoPriorityOptions, todoStatusOptions } from '../docs/data'

import type { ColourOption } from '../docs/data'
import type { StylesConfig } from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { axiosTemplate } from '@/helper/axios'
import moment from 'moment'
import { Todo } from '@/types'

const CreateTodo = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const today = new Date()
  const [dueDate, setDuedate] = useState(new Date())
  const [strDueDate, setStrDuedate] = useState('')
  const [status, setStatus] = useState('')

  const handleChangeDueDate = (date: Date) => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const strDatetime = moment(date).format(format)
    console.log(strDatetime)
    setDuedate(date)
    setStrDuedate(() => strDatetime)
  }

  const handleChangeStatus = (e: any) => {
    setStatus(() => e.value)
    console.log(status)
  }

  const mutation = useMutation(
    async (formData: Todo) => {
      console.log(formData)
      return axiosTemplate.post('/api/todos', formData)
    },
    {
      onSuccess(res) {
        navigate('/dashboard')
      }
    }
  )

  const onSubmit = (data: any) => {
    mutation.mutate(data)
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
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg leading-6 text-gray-900">Create Todo / Task</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm text-gray-400">Title</span>
                      <input
                        type="text"
                        {...register('title')}
                        className="block mt-1 p-2.5 w-full text-sm text-gray-900
                      rounded-md border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm text-gray-400">Content</span>
                      <textarea
                        {...register('content')}
                        rows="4"
                        className="block mt-1 p-2.5 w-full text-sm text-gray-900
                      rounded-md border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>

                    <div className="col-span-6 sm:col-span-4 child-div-mt-1">
                      <span className="w-fit mb-2 text-sm text-gray-400">Status</span>
                      <Select
                        onChange={(e: any) => {
                          setStatus(e.value)
                          console.log(status)
                        }}
                        defaultValue={todoStatusOptions[1]}
                        options={todoStatusOptions}
                        styles={colourStyles}
                      />
                      <input type="hidden" {...register('status')} value={status} />
                    </div>

                    <div className="col-span-6 sm:col-span-4 child-div-mt-1">
                      <span className="w-fit mb-2 text-sm text-gray-400">Priority</span>
                      <Select
                        defaultValue={todoPriorityOptions[1]}
                        options={todoPriorityOptions}
                        styles={colourStyles}
                      />
                      <input type="hidden" {...register('priority')} />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm text-gray-400">Due datetime</span>
                      <div className="w-fit">
                        <DatePicker
                          selected={dueDate}
                          onChange={handleChangeDueDate}
                          minDate={today}
                          showTimeSelect
                          dateFormat="d/MM/yyyy hh:mm aa"
                        />
                        <input type="hidden" {...register('due_date')} value={strDueDate} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTodo
