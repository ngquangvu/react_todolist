import { useEffect, useState } from 'react'

import axios from 'axios'
import Moment from 'moment'

import { Button } from '../atoms/Button'

type TodoType = {
  author: string
  comment_text: string
  created_at: string
  created_at_i: string
  num_comments: string
  objectID: string
  parent_id: string
  points: string
  relevancy_score: string
  story_id: string
  story_text: string
  story_title: string
  story_url: string
  title: string
  url: string
}

const Main = () => {
  const [todolist, setTodolist] = useState([])
  const fetchAPI = async () => {
    const res = await axios.get('http://hn.algolia.com/api/v1/search', {
      params: {
        query: 'react'
      }
    })
    setTodolist((todolist) => res.data.hits)
  }

  const editTodo = (id: number) => {
    console.log('edit todo ' + id)
  }

  const deleteTodo = (id: number) => {
    console.log('delete todo ' + id)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <table width="100%" className="table-auto">
        <thead className="bg-gray-700 text-white h-10">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created at</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {todolist.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-100">
              <td className="py-2 px-5">{item.title}</td>
              <td className="py-2 px-5">Undo</td>
              <td className="py-2 px-5">{Moment(item.created_at).format('YYYY-MM-DD')}</td>
              <td className="py-2 px-5">
                <Button
                  type="button"
                  className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700  active:bg-blue-800 mr-4"
                  onClick={() => editTodo(item.objectID)}
                  text="Edit"
                />
                <Button
                  type="button"
                  className="bg-red-600 text-white hover:bg-red-700 focus:bg-red-700  active:bg-red-800"
                  onClick={() => deleteTodo(item.objectID)}
                  text="Delete"
                />
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
            <td>1975</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default Main
