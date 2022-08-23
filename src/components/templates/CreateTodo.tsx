import { useState } from 'react'

import chroma from 'chroma-js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

import { colourOptions } from '../docs/data'

import type { ColourOption } from '../docs/data'
import type { StylesConfig } from 'react-select'

const CreateTodo = () => {
  const [date, setDate] = useState(new Date())
  const handleChange = (date) => setDate(date)

  const today = new Date()

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
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create Todo / Task</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm font-medium text-gray-400">Task / Todo</span>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900
                      bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-300
                       focus:border-blue-300"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm font-medium text-gray-400">Due date</span>
                      <div className="w-fit">
                        <DatePicker
                          selected={date}
                          onChange={handleChange}
                          minDate={today}
                          showTimeSelect
                          dateFormat="d/MM/yyyy hh:mm aa"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <span className="w-fit mb-2 text-sm font-medium text-gray-400">Status</span>
                      <Select defaultValue={colourOptions[2]} options={colourOptions} styles={colourStyles} />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
